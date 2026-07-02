---
title: "What the data says on AI adoption: Poland vs the EU — a two-office SQL duel"
slug: "what-the-data-says-ai-adoption-poland-vs-eu"
cover: "/articles/covers/what-the-data-says-ai-adoption-poland-vs-eu.png"
coverAlt: "What the data says on AI adoption: Poland vs the EU — a two-office SQL duel — MJ.OLDAK"
excerpt: "Poland adopts AI fast, but from such a low base that the gap to the EU is widening. Hand-written SQL reconciles the same metric across GUS and Eurostat — JOIN, reconciliation, window functions."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 7
featured: false
draft: false
lang: "en"
translationKey: "sql-ai-adoption"
metaTitle: "AI adoption Poland vs EU — a SQL analysis (GUS × Eurostat)"
metaDescription: "A reproducible SQL pipeline reconciles AI adoption across GUS and Eurostat. Poland grows fast, but the gap to the EU27 widens: −4.79 → −11.59 pp."
keywords: ["AI adoption", "GUS", "Eurostat", "SQL", "DuckDB", "data analysis", "Poland vs EU", "junior data analyst"]
faq:
  - q: "How many companies in Poland use AI?"
    a: "According to Eurostat, 8.36% of firms with 10+ employees use at least one AI technology (2025); GUS reports 8.7%. That's up from 2.86% in 2021 — fast growth, but from a very low base."
  - q: "Is Poland closing the AI adoption gap with the EU?"
    a: "No — despite fast growth, the gap to the EU27 average is not closing but widening: from −4.79 pp (2021) to −11.59 pp (2025). Poland grows from a low base while the EU27 average — up from 7.65% to 19.95% — pulls away faster."
  - q: "How does Poland compare with other EU countries on AI adoption?"
    a: "Poland slipped from 26th (2021) to 31st (2024 and 2025) out of 33 countries and sits below the EU27 average in every size class. The largest gap is among medium firms: 14.77% vs 30.36% (−15.59 pp)."
  - q: "Where does the data on AI adoption in Poland come from, and can you trust it?"
    a: "From two independent statistics offices: GUS (Table 15 from the ICT usage in enterprises 2025 publication) and Eurostat (the isoc_eb_ai dataset, indicator E_AI_TANY). When two independent offices measure the same thing and land almost on top of each other — 8.7% vs 8.36%, a 0.34 pp difference — you can trust the number."
  - q: "Does this data say anything about AI in Polish banks?"
    a: "No — both sources measure the whole economy excluding the financial sector (NACE section K), and a public dataset on AI adoption specific to Polish banks does not exist (as of mid-2026). So you cannot pull any figure about AI in banks out of these numbers."
  - q: "Can I reproduce this analysis myself?"
    a: "Yes — the code is public under the MIT license (github.com/martin0ne/analytics-stack-pl), and the whole report rebuilds with one command: uv run dvc repro analyze_ai. Tests guard the data contracts and SQL invariants, and every dataset ships a provenance file with source and SHA-256."
---

The intuition says Poland is catching up fast on AI. And it's true — the share of firms with 10+ employees using AI rose from 2.86% (2021) to 8.36% (2025). The twist: the same hand-written SQL shows that **the gap to the EU27 average is not closing — it's widening**, from −4.79 to −11.59 pp. We're growing, but from such a low base that the EU average is pulling away faster.

## What it is

A reproducible, local (zero-cost) analytics pipeline on macOS. The flagship analysis is "AI adoption across Polish & EU enterprises" — it takes **the same metric** ("enterprises using at least one AI technology") from **two independent statistics offices** and lines them up side by side:

- **GUS** — Table 15 from "ICT usage in enterprises 2025" (Poland's statistics office),
- **Eurostat** — the `isoc_eb_ai` dataset (indicator `E_AI_TANY`).

Why two sources? Because when two independent offices measure the same thing and land almost on top of each other, you can trust the number. For firms with 10+ employees in 2025: GUS reports 8.7%, Eurostat 8.36% — a 0.34 pp difference (4.1% in relative terms). These aren't new facts — it's an **honest synthesis of public numbers**: reconcile, benchmark, show the trend. The value isn't a "discovery"; it's an auditable workflow: public data → a runnable pipeline → a cited report. The exact figures (e.g. 8.36%, 19.95%) are read directly from the Eurostat Data Browser (indicator `E_AI_TANY`), not the rounded 8% / 20% you'll see in press summaries.

What the reader gets at the end is a branded PDF/HTML report (mjoldak.pl palette) with two charts, four SQL result tables, and the scope caveat spelled out up front. It's a case study of the junior data/BA craft, aimed at a role in the financial sector.

## Under the hood — four SQL queries

The core is four hand-written queries (DuckDB), deliberately covering the required techniques: JOIN, reconciliation, and window functions.

```text
GUS (Table 15)  ─┐
                 ├─> Q1 reconciliation  (JOIN on geo/year/size)
Eurostat ────────┘        GUS 8.7%  vs  Eurostat 8.36%  → 0.34 pp

Eurostat PL ──┬─> Q2 EU27 benchmark   (multi-step LEFT JOIN)
Eurostat EU27 ┘        PL below the EU in EVERY size class

Eurostat panel ─> Q3 trajectory+rank  (LAG, RANK, COUNT OVER)
                       PL: 26th (2021) → 31st (2025) of 33 countries

Eurostat panel ─> Q4 widening gap     (self-JOIN + rolling AVG OVER)
                       −4.79 pp (2021) → −11.59 pp (2025)
```

**Q1 — reconciliation (JOIN).** Joins GUS and Eurostat on `(geo, year, size_emp)` and puts both offices next to each other. By size class (2025): small firms 6.1% vs 5.79%, medium 15.6% vs 14.77%, large 42.0% vs 45.81%. The SME classes agree to within 1 pp; the 250+ class diverges more — because the population of large firms is small and statistically noisy.

**Q2 — EU27 benchmark (multi-step LEFT JOIN).** Lines Poland up by size class against the EU27 average. Poland is **below the EU in every class**: total 10+ is 8.36% vs 19.95% (−11.59 pp), and the largest gap is among medium firms: 14.77% vs 30.36% (−15.59 pp).

**Q3 — trajectory and ranking (window).** `LAG` computes the change since the previous survey wave (2022 wasn't surveyed, so 2023 is a two-year step). `RANK OVER PARTITION BY` plus `COUNT OVER` produce Poland's position: it slips from 26th (2021) to 31st (2024 and 2025) out of 33 countries — **despite fast adoption growth**, because the EU27 average climbs faster.

**Q4 — widening gap (self-JOIN + framed rolling average).** The Eurostat panel joined to itself (PL vs EU27), plus a 2-year rolling average of the gap (`AVG OVER ... ROWS BETWEEN 1 PRECEDING AND CURRENT ROW`). The evidence is blunt: the gap goes −4.79 (2021) → −4.39 (2023) → −7.58 (2024) → −11.59 pp (2025). Over the same span the EU27 rises from 7.65% to 19.95%.

A rigor detail: the ranking query **deliberately excludes supranational aggregates** (EU27_2020, euro-area EA/EA12/EA19/EA20), so the ranking is genuinely at the country level. A unit test, `test_ranking_is_country_level_no_aggregate_leak`, guards this — it checks that the country count is 33 and Poland sits at 31st, so no aggregate "leaks" into the ranking.

## What it tells you

The substantive punchline is uncomfortable but correct: **fast growth from a low base is not the same as closing a gap.** Look only at the level and you see a success story. Look at the trend of the *difference* and you see us falling behind. An analyst has to tell those two stories apart, because they say opposite things.

The second sign of maturity is **scope discipline.** Both sources measure the whole economy **excluding the financial sector** (NACE section K): GUS's "Total excluding section K" maps to Eurostat's `C10-S951_X_K`. I checked NBP, KNF, EBA, and the ECB — a public dataset on AI adoption specific to Polish banks **does not exist** (as of mid-2026). So you simply **cannot** pull any "AI in banks" figure out of these numbers. Stating plainly what *isn't* here matters more than one more chart.

That's also why I keep two levels of confidence apart: the quantitative data (GUS/Eurostat) lives separately from a qualitative synthesis of evidence on AI in EU/PL banking (a separate report, verified with the SIFT method) — so hard numbers never get blended with a literature review.

And a word on how the work happened: **AI-augmented, not AI-substituted.** The code was written with Claude Code and a local LM Studio (OpenAI-compatible endpoint), never a paid, metered API key. But every generated SQL statement or pandas snippet is rewritten and understood by hand — because in an interview, the SQL has to be yours, not the model's.

## Proof

The code is public under the MIT license: [github.com/martin0ne/analytics-stack-pl](https://github.com/martin0ne/analytics-stack-pl). The whole report rebuilds with one command — `uv run dvc repro analyze_ai` (ingest GUS + Eurostat → schema validation via pandera → four SQL queries → report). The tests, `uv run pytest tests/`, guard the data contracts (the schema rejects bad input) and the SQL invariants: a monotonic trajectory, a negative and growing gap, no aggregate leaking into the ranking.

Every dataset ships a `*.provenance.json` file with source, endpoint, access time, SHA-256, and license. All the key figures (8.7% / 8.36% / 19.95% / the −4.79 → −11.59 pp gap) were independently checked on 2026-06-16 against the primary sources — GUS Table 15 and the Eurostat Data Browser — and confirmed to the stated precision (`FACT_CHECK.md`). The finished artifact: `reports/ai_adoption_report.pdf` (~288 KB).

If you're curious how I approach process mapping as an analyst, I wrote it up here: [how I mapped a business process automatically into BPMN](/en/articles/mapping-a-business-process-automatically-bpmn/).
