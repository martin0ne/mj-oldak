---
title: "A document agent that decides what to search and read next (ReAct)"
slug: "a-document-agent-that-plans-its-own-steps-react"
excerpt: "Plain RAG retrieves once and answers. agent-flow runs a think→tool→observe loop: it decides for itself what to search and read next, and every claim in the report carries a file:line citation. Plus a human-approval gate."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 7
featured: false
draft: false
lang: "en"
translationKey: "agent-flow-react"
metaTitle: "A ReAct document agent that plans its own steps"
metaDescription: "agent-flow: a multi-step ReAct agent over a document folder. It plans its own search/read steps, cites file:line, and ships a human-approval gate. MIT code."
keywords: ["AI agent", "ReAct", "agentic AI", "RAG", "BM25", "file:line citations", "human-in-the-loop", "document agent"]
---

Plain RAG does one thing: it retrieves once and answers. An agentic workflow gives the model something more — it lets it **plan its own next steps**. `agent-flow` is the second thing: a ReAct loop (think→tool→observe) over a document folder, ending in a report where **every claim carries a file:line citation** — plus a gate where a human can sign off on every single tool call.

## What it is

Picture an agent that gets a question and a folder of documents, but **doesn't answer right away**. First it thinks, then it picks a tool (say, "search the documents"), looks at the result, thinks again — and repeats until it decides it has enough to write a report. That's **ReAct**: think → pick a tool → observe → repeat → report. The difference from plain RAG is that here the agent **decides for itself** what to search and what to read next, rather than running down a fixed pipeline.

This isn't an academic demo. The whole agent is **one Python file** (`agent.py`, 225 lines) plus a retrieval module (`retrieval.py`, 115 lines) — pure standard library, **no agent framework**. You can read it in ten or fifteen minutes and understand exactly what happens at each step. The LLM backend is swappable: the agent simply shells out to any CLI that reads a prompt on stdin and prints a completion (you set it with the `AGENTFLOW_LLM_CMD` env var, default `claude -p`).

The repo ships a worked example: an invoice-approval question over a 3-file corpus. The agent lists the files, searches once, finishes — and cites **two policy files at once**, because the full answer required combining two sources: the approval path from `invoicing-policy.md` and the threshold tiers from `delegation-matrix.md`. The agent decided on its own that it needed both, and showed both sources.

## Under the hood

The agent has exactly **four actions** at its disposal: `list_files`, `search_docs`, `read_file`, and `finish`. `finish` is the only way to end the loop. The contract with the model is simple: at each step the model returns **one JSON object** of the form `{"thought", "action", "args"}`, and the agent parses the first valid JSON containing an `action` key and dispatches the right tool.

```text
question + document folder
        │
        ▼
   ┌─────────────────────────────┐
   │  thought                    │ ◄──┐
   │  action (action + args)     │    │
   └──────────────┬──────────────┘    │
                  ▼                    │
   list_files / search_docs / read_file
                  │                    │
                  ▼                    │
        observation (result) ─────────┘
                  │
                  ▼  (once the agent decides it has enough)
              finish → report with file:line citations + a "## Sources" section
```

**Retrieval** is lexical **BM25** (k1=1.5, b=0.75) over an in-memory index — no embeddings, no external dependencies. With one twist for morphology-rich languages: the scorer includes a bidirectional shared-prefix match (≥5 chars) for cheap inflection tolerance — built with Polish in mind. `search_docs` returns chunks tagged as `file:start-end`, and every such citation a tool surfaces lands in a citations set — that's the foundation of grounding.

Because grounding here isn't a "promise" — it's a **rule enforced by the prompt**: cite every claim as `(file:start-end)`, never invent, say so plainly when the corpus lacks the answer, and end the report with a `## Sources` section.

On top of that, a layer of safety and robustness:

- **Sandboxed `read_file`** — it resolves the absolute path and returns `DENIED` for anything outside the corpus folder. You can't use it to escape the documents.
- **Step budget** — 8 steps by default, plus one reserved step to **force** a final report when the budget runs out. The loop can't spiral indefinitely.
- **Malformed-JSON repair** — if the model returns something unparseable, there's a single repair retry. If it still can't, the run fails with `model kept returning unparseable output`.
- **Length caps** — observations fed back to the model are truncated above 6,000 characters, and a single file read is capped at 200 lines.

And the part that turns this into a tool for real work — the **approval gate** (`--approve`). It stops the agent **before every tool call** (not before `finish`). The reviewer can approve, quit, or reject with feedback — and that feedback flows back to the agent as an observation, so it **steers the next step**. This is exactly the "AI proposes, a human signs off" pattern I use in production accounting tools.

## What you get out of it

What this project demonstrates plainly is **agentic orchestration you can actually read**: step planning, tool dispatch, grounding rules, and human-in-the-loop — all in two standard-library files. For a recruiter scanning for "agentic AI," it's visible proof I understand how an agent differs from a single call to a model. For a business, it's a pattern where the automation doesn't make the decision for the human — it prepares the work for a signature.

The most honest point: **the scope is deliberately narrow**. One agent, tools in sequence. **Multi-agent orchestration is intentionally out of scope** for this repo — and I wrote it that way. That's not a gap, it's a decision: a small, legible artifact instead of a framework nobody reviews.

It's also **testable without API access**. The repo includes a deterministic mock LLM that replays a fixed ReAct sequence (`search_docs` → `read_file` → `finish`), so the whole loop runs in CI without a single model call. Five tests cover retrieval provenance, honesty on no matches, refusal to escape the corpus, an in-corpus read, and the full agent loop on the mock.

## The proof

The code is public: [github.com/martin0ne/agent-flow](https://github.com/martin0ne/agent-flow), MIT-licensed. It needs Python 3.9+ and any LLM CLI (default is the Claude Code CLI, `claude -p`).

The fastest way to see it: reproduce the example over `examples/sample-docs` and compare against the committed `examples/sample-report.md` and the full step trace in `examples/sample-trace.json` — there you can see in black and white that the agent chose what to do at each step (step 1 `list_files`, step 2 `search_docs`, step 3 `finish`). Then run the five tests: `python3 -m unittest discover tests -v`. And you swap the backend with a single env var (`AGENTFLOW_LLM_CMD`) — to a local model or the deterministic mock.

If you'd rather understand the layer underneath first — the search-with-file:line-citations that grounding stands on — I wrote up that build step by step in a separate piece: [a document search that doesn't hallucinate](/en/articles/document-search-that-doesnt-hallucinate/). It's a separate repo; `agent-flow` sits one layer above it — planning the steps, not a single retrieval call.
