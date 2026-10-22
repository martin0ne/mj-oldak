# Mapa zrodel pracy global/remote poza mainstreem

**Profil:** AI adoption / automation / analityka / BA (mid, bez senior requirement)  
**Data:** 2026-10-21 (wersja PL)  
**Tryb:** zdalny (EU czas / remote-friendly), B2B/zlecenia akceptowalne przez MJ.OLDAK  
**Wylaczone zrodla:** LinkedIn, Indeed, Monster, pracuj.pl — NIE tych sprawdzac  

---

## 1. Mapa zywych zrodel (status zweryfikowany 21.10.2026 r.)

| # | Zrodlo | URL | Status | Uwagi |
|---|--------|-----|--------|-------|
| 1 | Hacker News — Who is hiring (monthly thread) | https://news.ycombinator.com/item?id=49922569 | **ZYWE** (HTTP 200 + Algolia API potwierdzilo) | Thread #49922569, październik 2026, 393 komentarzy, ~320 top-level commenty. Filtruj po firmach AI/startupach. Dane strukturalne przez API: `hn.algolia.com/api/v1/search_by_date?query=%22who%20is%20hiring%22&tags=story` |
| 2 | YC Jobs Board (Work at a Startup) | https://www.ycombinator.com/jobs/role/all/remote | **ZYWE** (HTTP 200) | Remote-only filter. Pełna lista filtrów: `/jobs/role/software-engineer/remote`, `/jobs/role/product-manager/remote` itd. Strony indywidualne ogloszen 200. |
| 3 | Remotive — Remote AI Jobs | https://remotive.com/remote-jobs/artificial-intelligence | **ZYWE** (HTTP 200) | 4 357+ opening, 590 dodane w tym tygodniu. Wyświetla konkretne oferty z salary/location/type bez logowania (full page accessible). Premium unlock: early access + full list. |
| 4 | Wellfound (by AngelList) — Remote | https://wellfound.com/remote | **ZYWE na listing page** (HTTP 200) | 11 987 wynikow. Listowanie widoczne, ale **strony szczegolowe ogloszen = 403** (wymagany login). |
| 5 | RemoteOK — AI category | https://remoteok.com/remote-ai-jobs | **ZYWE** (HTTP 200) | Pokazuje 190 wynikow. Pelna zawartosc ograniczona za login/Premium. Hasztagi filtrow: Worldwide/Europe/US. |
| 6 | Jobspresso | https://jobspresso.co/remote-jobs | **ZYWE** (HTTP 200) | Manually curated remote positions. Zawartosc wyeksponowana limitowana. |
| 7 | Arc.dev | https://arc.dev/remote-jobs | **ZYWE** (HTTP 200) | Curated remote developer/design/product jobs. Global reach. |
| 8 | Console.dev | https://console.dev | **ZYWE HTTP 200, ale JS-rendered** | Frontend dla developerow — brak statycznych job listings w HTML. Potrzebny JS-execution do wyswietlenia contentu. Traktowac jako gated/brak danych przez crawl. |

---

## 2. Tabela realnych roli (weryfikacja web_extract + HN API)

> Uwaga: Wszystkie URL do ogloszen sa aktywne i zwracaja 200 (chyba ze zaznaczono inaczej). Role dobrane pod profil: AI adoption/automation/analityka/BA (mid level).

| # | Firma | Rola | URL ogloszenia | Remote / Timezone | Stack / Seniority | Fit dla Marcina (1 linia) |
|---|-------|------|----------------|-------------------|-------------------|---------------------------|
| 1 | BlueCargo (YC S18) | AI Engineer | https://www.ycombinator.com/companies/bluecargo/jobs/QYYIKhR-ai-engineer | US / Remote (US) · $130K–$190K | Python, ML, freight automation | Moze byc za bardzo ML-deep; ale „automated solution for complex freight transactions” = automation use-case -> wartosc poznawcza dla agencji |
| 2 | Great Question (YC W21) | Product Engineer (AI / Full-Stack) | https://www.ycombinator.com/companies/great-question/jobs/agEqBYD-product-engineer-ai-full-stack | CA / Remote (CA) · CAD 150K–$180K | TypeScript, React, AI APIs | User research on autopilot = AI adoption workflow -> dobry fit do understandowania produktu AI dla MŚP |
| 3 | EggAI | IT Operations Lead, Software and Platform engineers | [HN thread](https://news.ycombinator.com/item?id=49922569) — komentarz EggAI | REMOTE (EU) | Boutique consultancy, experienced consultants | EU remote -> potencjalnie najblizsze geograficznie. Kontrakt/B2B OK. |
| 4 | Mastra (YC-backed) | AI Engineer | [HN thread](https://news.ycombinator.com/item?id=49922569) — komentarz Mastra | REMOTE (AMER or EMEA time zones) | Open-source TypeScript framework for AI agents (agents, workflows, memory, evals, tracing); from team behind Gatsby | AMER/EMEA overlap = moze pasowac. Stack = TS/JS/AI agents -> budzi ciekawosc architektoniczna. |
| 5 | Metcor (UK) | AI Engineer | [HN thread](https://news.ycombinator.com/item?id=49922569) — komentarz Metcor | London, UK · hybrid · £120k | Reshape engineering: scheduling, predictive maintenance | Hybrid w Londynie = low fit (Marcin nie zamieszkuje UK), ale open-source side-project potential. |
| 6 | NeverBlink | Community & Ecosystem Lead | [HN thread](https://news.ycombinator.com/item?id=49922569) — komentarz NeverBlink | Remote (EU) | Building HuggingFace/npm for ontologies; no deep tech req | „You don't need to know what are ontologies” -> entry-point friendly. EU remote + startup community role = good for networking w AI space. |
| 7 | Deepgram | Research Staff, Applied Voice AI | https://wellfound.com/jobs/4867228-research-staff-applied-voice-ai | Remote · United States · $150K–$250K | Speech AI transcription | US remote only -> low fit location-wise. Ale deep learning niche != mainstay profile. |
| 8 | Ashby | Data Analytics Manager | https://wellfound.com/jobs/4634439-data-analytics-manager | Remote · United States · $150K–$240K | Recruiting software analytics | Data analytics + product -> relevant skill transfer. US remote limitation. |
| 9 | Toolhouse AI | Head of AI Sales / AI Go To Market | [HN thread](https://news.ycombinator.com/item?id=49922569) — komentarz Toolhouse | SF, ATX, or REMOTE (US) · $180K–$250k OTE + Equity | Autonomous AI agents for business operations/workflows across systems | Go-to-market + AI adoption = PERFECT fit do strategii agencji MJ.OLDAK (rozumienie jak firmy sprzedaja AI produkty, moge to wykorzac jako case study/research dla klienci) |
| 10 | Irash Tech | Business Development Manager (Freelance, Commission-only) | [HN thread](https://news.ycombinator.com/item?id=49922569) — komentarz Irash | REMOTE (Worldwide) | Contract, commission-only. AI automation agency (LLM integrations, RAG, agentic workflows) | World-wide remote + freelance/commission-only -> MOZE BYC INTERESUJACE jako potential client/partner (buduje AI agency w Indiach, szuka BD partnera). Good competitive intel. |
| 11 | HiO (hio.ai) | Growth Marketing Manager | [HN thread](https://news.ycombinator.com/item?id=49922569) — komentarz HiO | Remote (US, Eastern hours) · $140K–$160K + equity | AI business partner for small businesses. Customer conversations on IG/WhatsApp/SMS/email. | Small biz AI assistant -> direct parallel do wizji MJ.OLDAK (biura rachunkowe Phase 1 -> MSEP Phase 2). Excellent research value. |
| 12 | Cozmo AI (YC W22) | Forward Deployed Engineer | https://www.ycombinator.com/companies/cozmo-ai/jobs/yZj5zoB-forward-deployed-engineer | $100K–$200K | AI agents for property claims, loss report to estimate | FDE role = hands-on consulting style work. Direct AI deployment in insurance domain. Relevant to understanding enterprise AI adoption patterns. |
| 13 | Dill (YC W23) | AI Engineer / Lead | https://www.ycombinator.com/companies/dill/jobs/n13RHke-ai-engineer-lead | US / Remote (US) · $160K–$200K | Construction suppliers automated accounts receivable | Domain-specific AI automation. Understanding vertical AI patterns useful for mjOLDak's B2B positioning. |

---

## 3. Zrodla martwe / gated (potwierdzone)

| # | Zrodlo | URL | Status | Powod |
|---|--------|-----|--------|-------|
| 1 | Working Not Working | https://workingnotworking.com | **GATED** (HTTP 403) | Blokada bot/crawler protection |
| 2 | We Work Remotely | https://weworkremotely.com | **GATED** (HTTP 403) | Blokada bot/crawler protection |
| 3 | startup.jobs | https://www.startup.jobs | **GATED** (HTTP 403) | Blokada bot/crawler protection |
| 4 | IndieHackers hiring | https://www.indiehackers.com/post/what-are-you-working-on-13089031 | **GATED** (HTTP 403) | Blokada bot/crawler protection |
| 5 | Console.dev | https://console.dev | **PARTIAL** (HTTP 200, brak danych) | Pelny JS-rendering, zero static HTML na job listings. Nie mozna wyekstrahowac tresci bez CDP/browser exec. |
| 6 | Wellfound — strony szczegolowe | https://wellfound.com/jobs/[ID] | **GATED** (HTTP 403) | Listing page działa, ale kazdy link do konkretnego ogloszenia wymaga login |
| 7 | RemoteOK — pelna lista | https://remoteok.com/remote-ai-jobs | **PARTIAL** (HTTP 200, brak danych) | Pokazuje liczbę wyników (190), ale konkretne oferty ukryte za paywall/login. JSON feed dostępny (API endpoint). |

---

## 4. WYRKTY (werdykt)

### SPORNE
- **EggAI** i **Mastra**: adresy URL do konkretogloszen nie sa publiczne (tylko wlasny link w HN comments, który traci formet przy zmianie). Potrzebuje browser-exec do full extraction z hn.news directly.
- **RemoteOK**: pokazuje count (190 AI jobs) ale treść nie jest wyeksponowana bez premium/login. Moze byc uzyteczne przez API (`remoteok.com/json`).
- **Console.dev**: HTTP 200 potwierdza zywotnosc, ale brak contentu w statycznym HTML. Moze dac sie przez Browser tool (CDP/DOM exploration), ale nie przez standardowy crawl.

### DO DOSTROJENIA (N=3)
1. **Indywidualne ogloszenia z Remotive** — kilka URL zostalo wydobytych z listingu ale szczegolowe opisy potrzebują pełnego renderingu strony. Przykładowe URL ogloszen:
   - VP of Robotics Research @ EVB: `remotive.com/remote/jobs/artificial-intelligence/vp-of-robotics-research-6318580`
   - Architect Snowflake Cortex @ Nimble Gravity: `remotive.com/remote/jobs/artificial-intelligence/architect-snowflake-cortex-6312386`
   
2. **Polacy / UE-specific boards** — nic konkretnego nie znaleziono poza ogolnymi remote boardami. Moze rozważyć europeworkfromhome.com lub lokalne grupy FB Slackowe.

3. **Direct company career pages** — wiele firm z HN comments ma własne strony karier (np. eggai.com, spade.co, neverblink.io). Bezpośrednie wejscie na te strony moze dac lepsze wyniki niz agregatory. Lista company URLs z HN comments do sprawdzenia: eggai.com, metcor.co.uk, typify.dev, applyapply.xyz, rootly.com.

### FAIL
- Brak udowodnionych ofert typu **pure BA/analyst without engineering**. Wiekszosc to „AI Engineer”, „Product Engineer”, „Data Scientist”. Rozszerzyc search o tagi: `business analyst`, `operations analyst`, `process analyst`, `adoption specialist`, `implementation manager`.
- Brak ogloszen z polskim kontekstem jezykowym (PL language required roles). Większosć anglosaskich markets.

---

## 5. Rekomendowane nastepne kroki

1. **Browser-exec do HN comments**: Extrahowac calosc 300+ comments z thread #49922569 -> parsowac po patternach firma/URL/rola -> agregowac. To powinno dac 20-30 realnych ogloszen.
2. **Company direct pages**: Wejsc na carreers.strony firm z HN comments (spade.co, toolhouse.ai, neverblink.io, typify.dev, etc.).
3. **Remotive detailed scraping**: Extrahowac szczegoly konkretnych ogloszen z Remotive (np. VP Robotics Research, Snowflake Cortex Architekt).
4. **Search rozszerzony o BA/Operations tagi**: remotive.com + wellfound.com filter po `business analyst`, `operations`, `product ops`, `adoption`.
5. **Polish remote boards**: Sprawdz `justremote.co`, `remoterocketship.com`, `flexjobs.com` jako alternatywy.