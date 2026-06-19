---
title: "Why your chatbot makes things up (and what RAG has to do with it)"
slug: "why-your-chatbot-makes-things-up"
cover: "/articles/covers/why-your-chatbot-makes-things-up.png"
coverAlt: "Why your chatbot makes things up (and what RAG has to do with it) — MJ.OLDAK"
excerpt: "A chatbot doesn't lie — it generates the most likely text, not the truth. Plain-language take on hallucinations and how RAG curbs them by attaching sources before the model answers."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "edukacja"
tags: ["tutorial"]
readingTime: 5
featured: false
draft: false
lang: "en"
translationKey: "chatbot-hallucination-rag"
metaTitle: "Why your chatbot makes things up — hallucinations & RAG"
metaDescription: "Why AI chatbots make things up and what a hallucination is — no jargon. How RAG curbs it by attaching sources before the model answers. From a real build."
keywords: ["AI hallucination", "why chatbots make things up", "RAG", "what is RAG", "AI chatbot", "grounding"]
---

Anyone who has spent five minutes with a chatbot has seen the same thing: a confident, fluent answer — and complete nonsense. An invented procedure, a law section that doesn't exist, a book nobody ever wrote. This isn't a bug they'll "fix in the next version." It comes straight from **how the model actually works** — which is exactly why it can be curbed.

## Where the made-up stuff comes from

A language model doesn't carry a fact database inside that it checks against. It does one thing: it **predicts the most likely next word**, then the next, then the next. It learned this from an enormous amount of text, so those predictions usually sound reasonable. But "sounds reasonable" is not the same as "is true."

Hence the technical name: a **hallucination**. The model isn't lying in any human sense — it doesn't even know it's making things up. It simply generated text that **statistically fits**, and it happened that the content was false.

You see it most clearly with specifics. Ask for an exact section number, a date, or a quote — something you can't "guess from the style." The model will still give you something, because its job is to finish the sentence, not to say "I don't know." And that "something" looks exactly as confident as a real answer.

A concrete example: you ask for the deadline to file some return. The correct date and a made-up date sound identical — both are just "a day of the month." The model has no signal that stops it on the wrong one; it simply picks whichever fits the rest of the sentence statistically. So you can't "tell from the tone" whether the answer is true. The model's confidence says nothing about its accuracy — and that's the crux of the problem when a client's decision or a contract clause is at stake.

## What RAG does

**RAG** (retrieval-augmented generation) is a simple idea for working around this: before you ask the model to answer, **first find the relevant source passages** — in your documents, knowledge base, regulations — and **attach them to the question**. Then you tell it: answer **only based on what you were given**.

That's called **grounding** — anchoring the answer in real text instead of in the model's memory.

An analogy: it's the difference between a **closed-book** exam and an **open-book** one. From memory, a student will say anything as long as it sounds confident. With the book open, they have a specific passage in front of them and answer from it. RAG flips a chatbot from the first mode into the second.

This has two consequences that matter in practice. First, the model answers primarily from **your** documents, rather than from general internet knowledge — so it can know your own procedures, the ones that exist nowhere else. Second, since the answer comes from a specific passage, you can **show which one** — which means you can check it instead of taking it on faith.

## Why it isn't magic

One caveat — this is no magic wand. RAG **shifts** the problem, it doesn't erase it.

Because the answer is **exactly as good as the passages it found**. If the system hands the model the wrong passage — or finds nothing useful — the model will still make things up, just now "with an open but wrong book." So the whole weight moves onto **retrieval**: how you actually search those documents.

And you can search by **words** (literal matching) or by **meaning** (paraphrase, synonym). Each one alone has holes: word search misses a question phrased differently from the document, and meaning search can overlook a rare, literal term — a number, a symbol, a field name. That's why a good RAG doesn't pick one method — it combines them, and measures on real questions whether it actually finds the right thing.

In other words: RAG doesn't magic hallucinations away. What it gives you are two levers a bare chatbot doesn't have — **grounding in a source** and **the ability to verify** — provided you get the search right.

## Next

If you want to see what this looks like in practice — with answers that point to the **exact file and line** of the source, and an honest result where a single method fails — I wrote up the whole build step by step: [how I built a RAG with file:line citations](/en/articles/document-search-that-doesnt-hallucinate/).
