# Weryfikacja i dedupe: Harvest OpenClaw — Tor A (Startupy AI)

**Data:** 20.10.2026
**Zrodlo:** OpenClaw harvest (2 przebiegi), model `deepseek/deepseek-v4.1-flash`, koszt ~0.023 USD, metoda: 6x web_search + 11x web_fetch JSON z Ashby API
**Weryfikacja URL-i:** 9x curl HTTP HEAD + 9x web_extract tytułow (20.10.2026 ~15:43 CEST)
**Dedupe vs:** oferty-startupy-AI-2026-10-20.md (12 ofert: Omnea, Camunda, ElevenLabs, Roamler, fonio.ai, Cohere, OpenTrain, Qevlar AI); plik oferty-2026-10-20-top50.md nie istnieje w repo (szukano docs/.review/, docs/)

---

## Tabela 9 ofert z harvestu

| # | Firma | Rola | URL | HTTP | Fit | Dedupe | Uwaga |
|---|-------|------|-----|------|-----|--------|-------|
| 1 | Neurons Lab | AI Business Analyst / Product Manager | jobs.ashbyhq.com/neurons-lab.com/...b973-c2e715a43395 | 200 | OK | nowa | Silny fit rdzeniowy: BA + AI, stakeholder workshops, LLM prompt engineering, proces mapping, B2B/part-full remote PL/EU. Tytul potwierdzony na stronie. |
| 2 | Neurons Lab | AI Tools Trainer (freelance/project-based) | jobs.ashbyhq.com/neurons-lab.com/...4335-8808-e598c2704c23 | 200 | POZA PROFILEM | nowa | Freelance projektowy — szkolenia AI dla firm bankowych. Lokalizacja UA/PL remote. Nie jest to rola kariera w stylu BA/adopcja AI (chyba Marcin chce trybu freelancer). Język wymagany: ukrainiski + angielski. |
| 3 | OneReach.ai | Technical Project Manager – Warsaw / Remote | jobs.ashbyhq.com/onereach.ai/...4213-ace4-d2ac2901d865 | 200 | OK | nowa | Hybrid PM/BA, client-facing delivery AI automation, B2B contractor. Wymagania: 4y+ business analysis/IT project management. Remote PL. Tytuł potwierdzony. |
| 4 | OneReach.ai | Technical Project Manager – Lisbon / Remote | jobs.ashbyhq.com/onereach.ai/...41f7-865e-70a72eb69774 | 200 | OK | nowa | To samo stanowisko co #3, lokalizacja w tytule Lisbon ale job spec podaje Poland/Remote jako opcje. B2B. Identiczny opis. Tytul potwierdzony. |
| 5 | SearchApi | AI Integrations Engineer (Open Source, Web Search) | jobs.ashbyhq.com/searchapi/...4daf-94c2-6fb7b53a3132 | 200 | POZA PROGIEM | nowa | Tytul ma Engineering, ale opis: 70% n8n/LangChain/MCP integrations, open-source PRs, agent ecosystem. Firm bootstrapped/profitable. Fit w automation/ecosystem — moze byc mostek do Hermesa. Brak widelek. |
| 6 | Techtorch | Business Analyst (L2C Specialization) | jobs.ashbyhq.com/techtorch/...ba04-4140-a16e-411bdf360715 | 200 | OK | nowa | Strong fit: Product Owner for custom AI-agents, CPQ/L2C transformations, stakeholder requirements -> user stories. Remote PL/Spain. Bootstrapped/profitable. Tytul confirmed. |
| 7 | Techtorch | AI Developer | jobs.ashbyhq.com/techtorch/...dc0-4e58-acbd-dcce7d211794 | 200 | POZA PROGIEM | nowa | Dev-hard: Python async, LangGraph, Bedrock, Docker, AWS CI/CD, embeddings/RAG. Title clearly developer. Outside profile scope. Tytul confirmed. |
| 8 | Foxelli Group | AI Engineer (Technical Product Owner) | jobs.ashbyhq.com/foxelligroup/...41b4-bbc0-16dfcf60f8db | 200 | POZA PROGIEM | nowa | Poza progiem: Next.js/Python FastAPI/ComfyUI/Diffusers/IP-Adapters/ControlNet/Replicate GPU. E-commerce D2C -> SaaS. Modern Developer power-user. Title has Engineering. BRK salary. |
| 9 | Fundamental | Applied AI Engineer | jobs.ashbyhq.com/fundamental/...461f-b47c-6a1b47561461 | 200 | POZA PROGIEM | nowa | Dev-hard ML: expert Python + Rust (PyO3), PyTorch internals, neural networks, performance profiling, C++ PyBind11. $275m VC funding. Not MŚP-first (well-funded lab). Deep-ML excluded by profile. |

---

## Tabela slugow ze sprawozdania OpenClaw

| Slug | HTTP | Trafien po filtrze | Status dedupe |
|------|------|-------------------|---------------|
| bjakcareer | 200 | 0 | -- (obciety board 750KB) |
| hostinger | 200 | 0 | -- |
| attio | 200 | 0 | -- |
| neurons-lab.com | 200 | 2 | #1, #2 powyzej |
| anyone-ai | 200 | 0 | -- (obciety board 750KB) |
| happyrobot.ai | 200 | 0 | -- (obciety board 750KB) |
| zafran-security | 200 | 0 | -- |
| wemolo | 200 | 0 | -- |
| nous | 200 | 0 | -- (to Ourz Hermes/Nous — samosprawdzanie) |
| onereach.ai | 200 | 2 | #3, #4 powyzej |
| axelera | 200 | 0 | -- |
| cohere | 200 | 0 | -- (obciety board 750KB) |
| plentific | 200 | 0 | -- |
| rho | 200 | 0 | -- |
| sailpeak | 200 | 0 | -- |
| searchapi | 200 | 1 | #5 powyzej |
| retell-ai | 200 | 0 | -- |
| ashby | 200 | 0 | -- (platforma, nie firma) |
| techtorch | 200 | 2 | #6, #7 powyzej |
| fundamental | 200 | 1 | #9 powyzej |
| sagelabs.ai | 200 | 0 | -- |
| foxelligroup | 200 | 1 | #8 powyzej |
| clickup | 200 | 0 | -- (obciety board 750KB) |
| deepsense | 404 | 0 | BOARD NIEDOSTEPNY |
| paid | 200 | 0 | 0 ogloszen |
| far.ai | 200 | 0 | -- |
| siena | 200 | 0 | -- |
| nightfall-ai | 200 | 0 | -- |
| onhires | 200 | 0 | -- |

**Razem slugow sprawdzonych:** 29. **Trafienia w profilu Marcina:** 9 (wszystkie wyzej w tabeli ofert).

---

## Podsumowanie

- **Znalezione:** 9 ofert (z ~909 przeskanowanych przez OpenClaw)
- **Slusznie odrzucone z profilu:** 5 (#2 freelance trainer, #7 dev-hard AI Developer, #8 dev-hard AI Engineer, #9 deep-ML Rust/PyTorch, ew. #5 borderline — poza progiem bo engineering title)
- **OK do rozważenia:** 4 (#1 BA AI, #3 TPM OneReach, #4 TPM OneReach-Lisbon, #6 BA Techtorch)
- **Pokrycie z istniejacymi listami:** 0/9 — zero duplikatow z oferty-startupy-AI-2026-10-20.md (kompletnie inne firmy)
- **Uptime URL-i:** 9/9 = HTTP 200 (zero dead linkow)
- **Tytuly potwierdzone:** 9/9 (web_extract zweryfikowal kazdy tytul na live page)

### Otwarte ryzyka

- **6 boardow obcietych na limicie 750 KB:** bjakcareer, anyone-ai, happyrobot.ai, cohere, ashby, clickup → mozliwe oferty wyladowaly poza limit i zostaly pominiete. DeepSense (deepsense.ai) to 404 — board zdjety lub slug zmieniony.
- **OneReach Lisbon (#4):** Identyczny opis co Warsaw (#3) — to prawdopodobnie ten sam job posting z innym slugiem. Traktowac jak jedna oferta.
- **Brak widelek wynagrodzenia** u 7/9 ofert (tylko SearchApi i Foxelli mogly miec equity/profit-sharing wspomniane, ale brak konkretow).

---

## Werdykt

**SPÓJNE** -- dane wiarygodne: wszystkie URL-e 200/200, tytul potwierdzony na live page dla kazdej z 9 ofert, zero duplikatow z istniejacych list, fit oceny oparte o profil twardy (AI rdzen, B2B remote PL/EU, junior-mid level). 5 ofert slusznie oznaczonych POZA PROGIEM/POZA PROFILEM po weryfikacji full opisow.

OGRANICZENIA: 6 boardow obcietych na limicie 750 KB przez OpenClaw — mozliwe oferty pominięte. Brak widelek wynagrodzenia w 7/9 ofert utrudnia ocene levelu seniority.

## Rekomendacja

**Wejsc na shortliste do paczek aplikacyjnych:**

1. **#1 Neurons Lab — AI Business Analyst / Product Manager** (TOP PICK) — Najsilniejszy fit do rdzenia Marcina: BA + AI adoption + LLM + financial services ontologies + process mapping. B2B, remote PL/EU, part/full-time (do wyboru). 3-5 lat exp (mid range).
2. **#6 Techtorch — Business Analyst** — Strong fit: Product Owner for AI agents, L2C/CPQ domain, remote PL. Startup pace, bootstrapped/profitable. Direct access to leadership.
3. **#3 OneReach.ai — Technical Project Manager – Warsaw/Remote** — Good fit: PM/BA hybrid, AI automation delivery, client-facing. Flat team, remote. Requires 4y+ (borderline senior, ale content BA-heavy).

Ewentualnie duplicate #4 (OneReach Lisbon) traktowac jako ta sama oferta co #3 — raz aplikujesz, raz dostajesz.
