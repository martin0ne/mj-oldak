---
title: "BM25 vs Embeddings: a tiny benchmark showing semantic search is brittle"
slug: "bm25-vs-embeddings-a-retrieval-benchmark"
cover: "/articles/covers/bm25-vs-embeddings-a-retrieval-benchmark.png"
coverAlt: "BM25 vs Embeddings: a tiny benchmark showing semantic search is brittle — MJ.OLDAK"
excerpt: "Embeddings understand meaning, so they always beat keyword search — right? I built a small benchmark that proves otherwise, and shows exactly when semantic search falls apart."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 6
featured: false
draft: false
lang: "en"
translationKey: "bm25-vs-embeddings"
metaTitle: "BM25 vs embeddings — a retrieval benchmark for RAG"
metaDescription: "I built a BM25 vs embeddings benchmark on one corpus. The result: semantic search is brittle — it missed a rare code. Production = hybrid + measurement."
keywords: ["BM25", "embeddings", "RAG", "semantic search", "retrieval", "nomic-embed", "retrieval benchmark", "hybrid retrieval"]
---

The common myth goes: "embeddings understand meaning, so they always beat keyword search." I built a small benchmark that pits BM25 (words) against embeddings (meaning) on one shared corpus — and on a query about a rare tax code, the embeddings missed completely while BM25 nailed it on the first try.

## What it is

This isn't a product — it's a **comparison bench**. It takes two retrieval methods, one shared corpus, and 9 test questions, then for each question it returns a verdict: who scored better — BM25, embeddings, or a tie.

Two methods that usually get framed as rivals:

- **BM25** — **lexical** search, by words. Great for a rare, specific token: a code, a symbol, a field name.
- **Embeddings** — **semantic** search, by meaning. Text becomes vectors, so a paraphrase still lands on target.

The whole thing is plain Python (standard library), zero dependencies — no numpy, no SDK. Embeddings are computed **locally** through LM Studio (over `urllib`), so data never leaves the machine and the cost is nothing. The corpus is synthetic and contains no personal data: 12 short documents on Polish accounting topics (JPK_V7, KSeF, VAT, social security, corporate tax, invoice corrections, binding rate rulings, tax rates), split into 23 chunks. The eval set is 9 queries — 5 with hard terms ("exact") and 4 paraphrases — each tied to an expected target file.

To keep the comparison **fair**, both retrievers chunk the corpus identically: the same chunking module, splitting on headings with a 50-line / 450-word cap and provenance (file + line range). If you don't equalize the input, you're measuring noise, not the method.

## Under the hood

**BM25** is a from-scratch implementation (k1=1.5, b=0.75) with one shortcut for Polish inflection: term expansion on a shared prefix of at least 5 characters. It's deliberately not a real stemmer — a cheap heuristic, flagged in the code as exactly that.

**Embeddings** come from a local `nomic-embed-text-v1.5` model (768 dimensions). I wrote cosine similarity from scratch in plain Python, no numpy. There's a trap here that's easy to miss: nomic requires **task prefixes** — documents must be embedded with the `search_document: ` prefix, and queries with `search_query: `. Skip them and retrieval quality drops; the code handles this and calls it out as a gotcha.

Vectors are cached to disk with a manifest keyed on each chunk's content hash — any change to the corpus (boundaries or content) invalidates the cache and forces a re-embed. There's also an offline mode (`EMBED_MOCK=1`): deterministic pseudo-vectors from a SHA1 hash, **explicitly marked as NON-semantic**, only there to exercise the pipeline without LM Studio — and a report generated in that mode carries a loud warning not to mistake it for a real result.

The harness measures, for each question, the **rank** of the expected document in each method's top-k, then issues a verdict:

```text
query ──┬──> BM25 (by words)      ──> rank of the expected document
        └──> embeddings (by meaning) ──> rank of the expected document
                       │
                       └──> verdict: BM25 / embeddings / tie / both miss
```

## What it teaches

A real run (top-k=3, `nomic-embed-text-v1.5`) over the 9 queries: **6 ties, 1 BM25 win, 2 embedding wins**. So most of the time the two methods perform the same — it's the edges that get interesting.

**When embeddings fail.** The query "WIS [binding rate ruling] tax rate for a good or service": embeddings didn't pull the right document even into the top 3 (rank = None), while BM25 ranked it first. The failure is diagnosed in the open: a rare, high-IDF code (WIS) drowns in a dense cluster of several documents about tax rates. Embeddings spread similarity across the whole cluster and lose the target — BM25 catches the rare token without blinking.

**When embeddings win.** A paraphrase that shares no keywords with the document: "a document changing the value of a transaction after the customer returned a product" → a document about correction invoices. Here BM25 has rank None (no shared words means no hit), while embeddings catch the intent and surface the document in the top 3.

That's the whole point of the bench: embeddings are powerful, but **brittle and phrasing-dependent**. Semantics pay off where users speak in varied language — not where a hard, unique code is what matters. So the production takeaway isn't "bolt on embeddings," it's: **a hybrid (words + meaning) + a set of test questions + measurement on a real corpus**. The bench trains exactly that judgment — when semantics are worth the trouble, and when BM25 is enough.

There's also a scaling signal written straight into the code: I compute cosine brute-force across all vectors, which is trivially fast at a few hundred chunks. A real vector store with an ANN index (FAISS / Chroma / sqlite-vec) starts to pay off from tens of thousands of vectors upward, and becomes essential at hundreds of thousands — and the interface is carved out cleanly enough that swapping the store doesn't touch the rest. That's a design recommendation, not a measured benchmark.

## The proof

The code is public, MIT-licensed: [github.com/martin0ne/rag-lexical-vs-semantic](https://github.com/martin0ne/rag-lexical-vs-semantic). It wasn't built on vibes — the repo has **19 tests** (unittest) covering chunking, BM25, embeddings (unit + index + a live smoke test), the corpus, and the harness itself; the live test is skipped automatically when LM Studio is offline. The corpus carries no personal data, commits come from a noreply address, and `.gitignore` strips caches and junk.

You can run it two ways: `EMBED_MOCK=1 python3 compare.py` works offline (but that's a NON-semantic mock result), while the real thesis only shows up with LM Studio running.

This bench is a lens, not a product. If you want to see the "combine words and meaning" conclusion already shipped inside a working assistant that returns file:line citations, I wrote up that whole build separately: [how I built a document search that doesn't hallucinate](/en/articles/document-search-that-doesnt-hallucinate/). And if you're curious *why* grounding a model in its sources matters at all: [why your chatbot makes things up, and what RAG has to do with it](/en/articles/why-your-chatbot-makes-things-up/).
