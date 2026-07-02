---
title: "From a described process to a ready .bpmn file: a BA skill in Claude Code"
slug: "mapping-a-business-process-automatically-bpmn"
cover: "/articles/covers/mapping-a-business-process-automatically-bpmn.png"
coverAlt: "From a described process to a ready .bpmn file: a BA skill in Claude Code — MJ.OLDAK"
excerpt: "You describe a process in plain words and get an AS-IS/TO-BE model in ASCII, gateway rules, edge cases, and a real .bpmn file with auto-layout that opens straight in bpmn.io. No hand-clicking XML coordinates."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 6
featured: false
draft: false
lang: "en"
translationKey: "process-mapper-bpmn"
metaTitle: "A BA skill in Claude Code: described process → .bpmn file"
metaDescription: "How I built a business-analyst skill that turns a described process into an AS-IS/TO-BE model, gateway rules, edge cases, and a ready .bpmn file for bpmn.io."
keywords: ["business analyst", "BPMN", "process mapping", "Claude Code", "bpmn.io", "AS-IS TO-BE", "BA skill", "automation"]
faq:
  - q: "What is process-mapper — a BA skill in Claude Code?"
    a: "It is a Claude Code skill that turns a process described in words into a full set of business-analyst (BA) artifacts: an AS-IS and TO-BE model in ASCII, rules for every gateway, edge cases, actors with swimlanes, and a ready .bpmn file with auto-layout that opens straight in bpmn.io. The core is generated every time as text — no hand-clicking XML coordinates."
  - q: "How do you generate a .bpmn file automatically, without hand-writing XML?"
    a: "In this skill a script, build_bpmn.py, does it: you feed it a simple JSON spec with two keys — elements and flows — and it assembles valid BPMN 2.0 XML with auto-layout. A longest-path ranking algorithm computes each node's column and emits the entire visual layer (BPMNShape and BPMNEdge) that bpmn.io needs to draw anything at all."
  - q: "Why do the process diagrams come out as ASCII instead of mermaid?"
    a: "The reason is practical: rendered diagrams don't load in my environment — they show up blank. ASCII always loads, and .bpmn is the hard, editable artifact."
  - q: "Does this kind of automation replace learning BPMN modelling?"
    a: "No — it's an accelerator for bigger processes, not a replacement for learning. Lanes and pools are deliberately not generated; I draw them in by hand in bpmn.io, because that's a BA exercise too — the script only takes over what a machine does better: correct coordinates and waypoints."
  - q: "How do you make sure the process model doesn't stop at the happy path?"
    a: "Every gateway must have at least two named exit paths — a gateway without labels I treat as an error, because it signals a process that hasn't been thought through. On top of that, for every TO-BE I walk a fixed edge-case checklist: error and retry, missing data, low confidence with human correction (human-in-the-loop), rejection, duplicate, timeout, and compliance (GDPR art. 22)."
  - q: "Does the generated .bpmn file really open in bpmn.io?"
    a: "On a sample spec (7 elements and 7 flows) the generator produced well-formed BPMN 2.0 XML — confirmed with a parser — with the BPMNShape and BPMNEdge visual layer, meaning a file ready to open in bpmn.io. An honest caveat: I didn't open it visually, so this is a valid, openable artifact, not a claim of a perfect layout."
---

Understanding a larger, unfamiliar process usually means hours of clicking inside a modelling tool — or hand-writing BPMN XML with correct coordinates, which is error-prone and gets rewritten from scratch every single time. I built a skill that cuts that short: you describe the process in words, and you get an AS-IS/TO-BE model in ASCII, the rules for every gateway, the edge cases — and a **real `.bpmn` file with auto-layout that opens straight in bpmn.io**.

## What it actually is

`process-mapper` is a Claude Code skill that turns a described process into a full set of business-analyst (BA) artifacts. I frame it deliberately: it's an **accelerator for bigger processes, not a replacement** for learning to model by hand. Doing it manually in bpmn.io stays my BA learning path — the skill only scales the analysis itself.

The core is generated every time, as text:

- **AS-IS** — the current state, with bottlenecks and rework loops.
- **TO-BE** — the target state, with an explicit split: ⚙️ service task (automation/AI) versus 👤 user task (a human).
- **Rules for every gateway** — the condition, plus a label on each exit path.
- **Edge cases** — what breaks, and how the process catches it.
- **Actors + swimlanes** — who performs which step (one lane per actor/system).

Everything comes out as **ASCII plus a `.bpmn` file — never mermaid or a rendered widget**, on purpose. The reason is practical: rendered diagrams don't load in my environment — they show up blank. ASCII always loads, and `.bpmn` is the hard, editable artifact. The whole thing points one way: learning and a portfolio aimed at a junior BA / AI BA role.

## Under the hood

The `.bpmn` file is produced by a script, `build_bpmn.py`. You feed it a simple, declarative JSON spec — two keys, `elements` and `flows` — and the script assembles valid BPMN 2.0 XML with auto-layout (DI). It supports 6 element types, each mapped to a BPMN element:

```text
start    → startEvent
end      → endEvent
task     → task
service  → serviceTask
user     → userTask
gateway  → exclusiveGateway
```

The interesting part is the **auto-layout**, because that's what removes the manual coordinate math. A longest-path ranking algorithm (Kahn's topological order with longest-path propagation) computes each node's column as its distance from the start. Nodes that share a rank are spread vertically around a baseline, with fixed spacing: 160 px horizontally, 120 px vertically. From that it emits `BPMNShape` (with `dc:Bounds`) and `BPMNEdge` (with `di:waypoint`) — the entire visual layer bpmn.io needs to draw anything at all.

Two design decisions are deliberate. First, **lanes and pools are not generated** — I draw them in by hand in bpmn.io, because that's a BA exercise too. Second, the script **validates its input**: a missing `elements` or `flows` key ends it with a hard error instead of spitting out garbage.

A second layer of discipline lives in the analysis, not the code. Every gateway must have **at least two named exit paths** — a gateway without labels I treat as an error, because it signals a process that hasn't been thought through. And there's a fixed edge-case checklist I walk for every TO-BE:

```text
- error / exception   → retry, error path, escalation
- missing data        → validation
- low confidence      → gateway on confidence → human correction (human-in-the-loop)
- rejection           → loop back
- duplicate           → deduplication
- timeout             → no response
- compliance          → where a human should sign off (a compliance practice tied to GDPR art. 22)
```

## What you get

The most important thing this skill shows is **BA maturity, not a pretty picture**. The model doesn't stop at the happy path: every gateway branch is named, the edge cases are worked through, and human-in-the-loop is built in wherever a person has to stay in the loop (low confidence, compliance). That's the difference between "I drew a diagram" and "I thought the process through."

Second, the bridge to real tools. On request the skill adds optional modules: **UML as ASCII** (sequence and/or class), **Jira-ready user stories** in the "As a [role] I want [goal] so that [value]" format with "Given / When / Then" acceptance criteria, and **API field mapping** (source → target → transformation rule + handling for missing values). The stories are designed for the Atlassian connector (ready to create as issues), and the field-mapping pattern points straight at my OCR product's pipeline (Azure DI → schema → export, e.g. tax ID, date, amount).

Third, it's **deterministic automation where the work used to be tedious and manual** (generating XML), while consciously keeping the manual learning. The script does what a machine does better (correct coordinates and waypoints), and I keep what builds the skill (modelling, lanes). The result is showable: a BRD + `.bpmn` + stories for one product is a "BA folder" — material to bring straight into an interview.

## Proof

No public repo yet — the skill lives locally as a Claude Code skill (`~/.claude/skills/process-mapper`), so the proof here is the technique and a working artifact, not a GitHub link.

I checked that the generator actually runs. On a sample spec, "Invoice handling" (7 elements + 7 flows), it produced a `.bpmn` file that is well-formed BPMN 2.0 XML — confirmed with a parser — with `sequenceFlow`, `BPMNShape` (`dc:Bounds`) and `BPMNEdge` (`di:waypoint`) elements. In other words, ready to open in bpmn.io. Here's the input and output for a single gateway:

```text
spec (JSON):
  {"id": "gw", "type": "gateway", "name": "Confidence high?"}
  {"from": "gw", "to": "fix", "label": "No"}
  {"from": "gw", "to": "ok",  "label": "Yes"}

.bpmn (excerpt):
  <bpmn:exclusiveGateway id="gw" name="Confidence high?" .../>
  <bpmn:sequenceFlow ... sourceRef="gw" targetRef="fix" name="No" />
  <bpmn:sequenceFlow ... sourceRef="gw" targetRef="ok"  name="Yes" />
  <bpmndi:BPMNShape ...><dc:Bounds x="..." y="..." width="50" height="50" /></bpmndi:BPMNShape>
```

An honest caveat: I verified the XML's well-formedness and the presence of the DI layer, but I didn't open the file visually in bpmn.io — so I'm not claiming a "perfect layout," only a valid, openable artifact.

If you're curious how skills and tools like this fit the bigger picture of AI adoption, I wrote about it from the data side: [what the data says about AI adoption — Poland vs the EU](/en/articles/what-the-data-says-ai-adoption-poland-vs-eu/).
