---
title: "I built a document search that doesn't hallucinate — here's how"
slug: "document-search-that-doesnt-hallucinate"
cover: "/articles/covers/document-search-that-doesnt-hallucinate.png"
coverAlt: "I built a document search that doesn't hallucinate — here's how — MJ.OLDAK"
excerpt: "A RAG that shows the file and line it pulled an answer from, instead of making things up. How the BM25 + embeddings + RRF hybrid works, and why a single method fails."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 6
featured: true
draft: false
lang: "en"
translationKey: "docs-qa-rag"
metaTitle: "A document search that doesn't hallucinate — RAG"
metaDescription: "How I built a RAG with file:line citations: BM25 + embeddings + RRF hybrid, citations validated in code. The honest 9/9 result and why a single method fails."
keywords: ["RAG", "BM25", "embeddings", "RRF", "semantic search", "AI hallucination", "knowledge assistant"]
---

Ask an ordinary chatbot about your own documents and it will often answer with total confidence — and say something that isn't actually in them. I built the opposite: you ask a question in plain language, you get an answer, and you get **the exact file and line that answer came from**.

## What it does

Picture a **knowledge assistant** that knows your documents: regulations, internal procedures, contracts, technical docs. You ask in normal language — "what's the procedure for a complaint above 5,000?" — and it doesn't just answer, it shows you **where it knows that from**: the file name, the specific lines.

That's the difference between "trust me" and "check for yourself." In an accounting office or a bank, that isn't a nice-to-have — it's the precondition for using the tool at all. When the answer concerns a tax deadline or a clause in a contract, nobody is going to act on text they can't verify. A **file:line** citation turns a "nice-sounding answer" into something you can click and read at the source.

## Under the hood

Underneath sit two different ways of searching that people usually pit against each other. Here they work together.

- **BM25** is **lexical** search — by words. Excellent when the question contains a rare, specific token: an article number, a field name, a symbol. It struggles the moment you ask for the same thing in different words.
- **Embeddings** are **semantic** search — by meaning. A local model (`nomic-embed-text-v1.5`, run through LM Studio) turns text into a **vector of 768 numbers — coordinates of its meaning** (similar meaning → similar numbers, sitting close together), so a paraphrase still lands on the point. The trade-off: it can miss a rare, literal word it doesn't "feel" semantically.

Each method returns its own ranking. I fuse them with **RRF (Reciprocal Rank Fusion)** — a rank fusion that doesn't need comparable "scores," only positions on each list. A passage ranked high by either method ends up high in the final result.

```text
question
  ├──> BM25 (by words)     ──> ranking A
  └──> embeddings (by sense) ──> ranking B
                 │
                 └──> RRF (rank fusion) ──> top passages
                                │
                                └──> answer + file:line citation
```

The detail that keeps it from making things up: **the citation is validated in code, not promised by the model.** In assistant mode the model writes the answer in natural language, but the attached citation is checked programmatically — does that file and those lines actually exist and contain what's being cited. There's also an **extractive mode** that generates no prose at all and just returns verbatim passages.

The whole thing is built to **degrade rather than crash**: if embeddings go down, it falls back to BM25 alone; if the LLM goes down, it falls back to extractive mode — and every such fallback is **annotated**, so you know which mode produced your answer. No external dependencies (pure standard library), MIT-licensed.

## What you get out of it

The most important and most honest point: **the hybrid does not "always win."** That's not the claim. The claim is **robustness**.

On the test set, the whole thing landed **9 out of 9 queries in the top-k**. The interesting part is *why*: BM25 alone missed a paraphrase once (a question phrased differently from the document); embeddings alone missed a rare token once (a literal, unusual word). Neither single method was flawless. It was **RRF that kept both cases in the top-k** — because it only took one of the two engines to catch the passage.

The takeaway if you're building RAG for production: don't pick the "better" method. Combine **words + meaning**, keep a **test set of questions** that mirrors real queries, and **measure** the hits. Otherwise you'll hit the day when your single engine happens to miss the one question you didn't anticipate.

## The proof

The code is public: [github.com/martin0ne/docs-qa](https://github.com/martin0ne/docs-qa). It wasn't built on vibes — spec first, then an adversarial review (deliberately hunting holes in the assumptions), then a TDD-style implementation: **47 tests**, which guard, among other things, that citation validation actually rejects a citation that isn't in the source.

If you're wondering *why* chatbots make things up in the first place, and what RAG has to do with it, I explain it without the jargon in a separate piece: [why chatbots make things up](/en/articles/why-your-chatbot-makes-things-up/).
