<!-- PROTOTYP v2 — wygenerowane 20.10.2026 z CV-bazy.md (korekta zatrudnienia UPS 08.2026). Bez tailoringu. -->

# Marcin Ołdak

+48 453 583 635 | biuro@mjoldak.pl | www.mjoldak.pl | linkedin.com/in/mjoldak | Wrocław (remote-ready PL/EU) | dostępny od zaraz

**AI Automation Builder / AI Business Analyst — buduję działające agentic pipelines i automatyzacje AI z dowodem w kodzie: 6 publicznych repo + 5 aplikacji FastAPI**

## Podsumowanie

Buduję agentic pipelines i automatyzacje AI end-to-end — nie opisuję ich, pokazuję działający kod do otwarcia i sprawdzenia. Wspólny rdzeń wszystkiego, co zbudowałem, to warstwa LLM model-agnostic (cztery wymienne providery — claude-cli / Haiku / Gemini / OpenAI — za jednym interfejsem, zmiana dostawcy bez refactoru), human-in-the-loop i audit log pod RODO, na polskim kontekście regulacyjnym (KSeF / JPK / PKE art. 398). Dowód: 5 aplikacji FastAPI dla małych firm (4 dla biur rachunkowych + pilot Sales Agent B2B) spiętych od wejścia do wyjścia (OCR faktur na Azure Document Intelligence z walidatorem sumy kontrolnej NIP, asystent e-mail IMAP/SMTP z klasyfikacją i wysyłką dopiero po zatwierdzeniu człowieka, deterministyczny agent terminów podatkowych, agent raportujący, pilot Sales Agent B2B) plus 6 publicznych repozytoriów (github.com/martin0ne), które bronią się przy otwarciu — m.in. agent dokumentowy ReAct w czystym Pythonie, hybrydowy RAG z egzekwowaną w kodzie walidacją cytatów i pipeline danych z provenance SHA-256. Każdy claim w tym CV linkuje do działającego artefaktu (repo lub produktu) — portfolio zastępuje lata stażu. Z psychologii w biznesie korzystam w discovery i inżynierii wymagań (user stories Given/When/Then, BPMN 2.0 AS-IS→TO-BE); grunt prawniczy = RODO i security projektowane od początku. Dojrzałość uczciwie: cztery produkty na poziomie pilot-ready/MVP, jeden w demo, z pokryciem testowym (30 testów) — celowo nie nazywam tego produkcyjnym. Tło zawodowe: 09.2022–08.2026 administrator baz danych w dziale finansowym (UK, odprawy celne), gdzie z własnej inicjatywy automatyzowałem procesy w zablokowanym środowisku korporacyjnym; dostępny od zaraz.

**Wyróżnik:** architektura LLM model-agnostic (4 wymienne providery za jednym interfejsem, zero vendor lock-in) + human-in-the-loop + audit log pod RODO, w polskim kontekście (KSeF / JPK / PKE art. 398) — widoczne w działającym, publicznym kodzie, nie na slajdzie.

## Konsultant adopcji AI — trzy warstwy

Pomagam profesjonalistom z **firm jednoosobowych** podjąć decyzję o wdrożeniu AI
i je przeprowadzić — **sprzedaję decyzję i jej skutek, nie model.**

Robię to w trzech warstwach naraz: **techniczna** (6 publicznych repo,
github.com/martin0ne, 5 aplikacji FastAPI, agentic pipelines, n8n MCP) ·
**naukowa** (praca empiryczna: autorski kwestionariusz, 5 wywiadów, rola
obserwatora uczestniczącego, jawne ograniczenie badania — saturacja N=5) ·
**ludzka** (psychologia pracy: JD-R, komunikacja organizacyjna — co wdrożenie
robi z zespołem, nie tylko z procesem).

Realizuję to **z siecią specjalistów z różnych branż**, którzy wspólnie tworzą
rozwiązania — moja rola to trzymać całość w kupie i tłumaczyć między biznesem
a technologią. Dowód w działaniu: demo.mjoldak.pl · www.mjoldak.pl ·
github.com/martin0ne.

## Doświadczenie zawodowe

### MJ.OLDAK — Solo Founder & AI Consultant | 2026 — obecnie

- Zbudowałem 4 działające produkty AI dla biur księgowych (greenfield: od spec do delivery + pilot kit; przed pierwszym wdrożeniem): OCR Invoice Reader (FastAPI + Azure Document Intelligence + normalizacja/ocena przez konfigurowalny LLM — domyślnie Claude Haiku przez CLI, opcjonalnie Gemini/OpenAI; faktura PDF/foto → dane strukturalne NIP/kwoty/pozycje), Email Assistant (IMAP/SMTP + klasyfikacja Claude do 4 kategorii (PILNE/NORMALNE/SPOTKANIE/SPAM) + auto-szkice odpowiedzi po polsku, human-in-the-loop — nigdy nie wysyła sam), Deadline Agent (deterministyczny monitor terminów podatkowych: JPK_VAT / ZUS / CIT / PIT — 9 terminów z poprawną matematyką dat; integracja KSeF zaplanowana — ksef2 SDK zaadoptowany jako scaffold), Reporting Agent (raporty PDF z kluczowymi wskaźnikami + proza generowana LLM).
- Codzienna praca operacyjna na Claude API (Opus/Sonnet/Haiku) i Claude Code: agentic workflows, multi-file refactors, integracje MCP; prompt engineering z explicit assumptions / testable success criteria / surgical scope (Karpathy/Chang).
- Automatyzacje: n8n (działający pipeline produkcyjny Webhook → Gemini → Supabase EU Frankfurt, workflow wystawiony jako MCP tool; framework decyzyjny workflow vs agent) + Make.com + Google Apps Script; Lovable (full-stack MVP demo ze świadomym podziałem demo/prod).
- Customer discovery z rygorem Mom Test: 4 wywiady jakościowe z biurami księgowymi (I-III 2026) + async-wywiad pilot (maj 2026); walidacja na zachowaniach przeszłych, nie deklaracjach.
- Compliance w praktyce: RODO art. 22 i 28 (AI jako rekomendacja human-in-the-loop, DPA procesorów, dane w EU), PKE art. 398 (zgody w formularzach), wdrożenia on-premise Docker dla scenariuszy enterprise.
- Własna rutyna monitoringu ekosystemu AI: 26 źródeł co 3 dni (scraping + klasyfikacja Claude) → decyzje TERAZ/LATER/SKIP; baza wiedzy Zettelkasten 270+ konceptów.

### UPS Global Business Solutions Polska — Administrator baz danych → Starszy administrator baz danych (dział finansowy UK — odprawy celne / brokerage) | 09.2022 – 08.2026, Wrocław

- Administrowanie bazami danych i przepływem danych w dziale finansowym UK (odprawy celne / brokerage, import do Wielkiej Brytanii), środowisko w pełni anglojęzyczne; progresja do starszego administratora w ~2 lata.
- ~100 deklaracji celnych dziennie (import do UK z rynków na wszystkich kontynentach); codzienna dokumentacja i komunikacja operacyjna po angielsku.
- Z własnej inicjatywy automatyzowałem powtarzalne zadania w zablokowanym środowisku korporacyjnym (zero praw administratora): kalkulatory makro w MS Excel + instrukcje SOP dla procedur celnych — szybsza, powtarzalna, mniej błędna praca.

## Projekty (portfolio)

- Sales Agent B2B (live demo): demo.mjoldak.pl — formularz → klasyfikacja leada Gemini (JSON HOT/WARM/COLD + score + uzasadnienie PL) → Supabase z RLS; zgodność RODO art. 22 + PKE art. 398.
- Pipeline produkcyjny n8n: Webhook → Gemini → Parse → Supabase EU Frankfurt; zielony end-to-end, wystawiony jako MCP tool (instance-level MCP).
- Sales Agent — pilot dla klienta B2B (chemia przemysłowa): spec, onboarding, działający agent klasyfikacji leadów; szablony metodyczne PRD/ROI/BPMN.
- agent-flow — przejrzysty wieloetapowy agent dokumentowy (ReAct) w czystym Pythonie: sam planuje kroki (search/read), raport końcowy z cytatami plik:linia; human-approval gate (odrzucenie z feedbackiem steruje agentem); testy pełnej pętli z deterministycznym mock-LLM (bez API); backend provider-agnostic (Claude CLI domyślnie). *(link GitHub dopisać po publikacji repo)*
- kb-rag — „baza wiedzy z cytatami źródeł": retrieval BM25 z provenance plik:linia nad dokumentami projektu/klienta; zero zależności, obsługa polskiej fleksji; generacja LLM związana regułą „odpowiadaj wyłącznie ze źródeł, brak trafień = powiedz wprost".
- Biblioteka 20+ własnych skilli Claude Code (m.in. case-study-builder, ai-workshop, kb-rag, agent-flow, rekrutacja) — reużywalne narzędzia operacyjne z auto-triggerami; productized warsztat pracy, nie jednorazówki.
- www.mjoldak.pl — personal portfolio (EN): interaktywne dema produktów client-side + flagowe demo agentic „Agent Mission Control" (pipeline ReAct na żywo, kontrolowany fail z odzyskiem, human-approval gate); oferta dla biur rachunkowych z manualami klienta (PDF) pod /dla-biur.
- Audyt service design 5 własnych produktów AI (AI-augmented service blueprint: warstwa aktora AI + eskalacja/recovery + metryki HITL + can-vs-should): **ocena zasadności wdrożenia / go-no-go** — które produkty gotowe na pilota i czego brakuje. Uczciwe orzeczenia, nie laurki (np. „NIE pilot-ready" dla asystenta maili: brak warstwy RODO + ryzyko rubber-stamp). Spektrum AI-centrality (AI-central ↔ deterministyczny — kiedy AI świadomie NIE) + tryb green-field (usługa B2B zaprojektowana od discovery JTBD). Reużywalny skill `ai-service-blueprint`.

## Umiejętności

- Modele AI (codzienna praca): Claude (Opus/Sonnet/Haiku), Gemini API; multi-LLM routing; prompt engineering; RAG / bazy wiedzy z provenance (grounding, cytowanie źródeł); abstrakcja modelu (zmiana dostawcy LLM bez refactoru)
- AI app builders i dev: Claude Code CLI, Cursor Pro, Lovable + n8n MCP; AI-assisted development (spec → generacja → review/test); agentic workflows (ReAct, human-approval gates) testowane z mock-LLM
- Automatyzacje: n8n (instance-level MCP), Make.com, Google Apps Script; integracje REST API
- Build i hosting: FastAPI/Python (AI-assisted), Supabase (RLS, EU), Cloudflare Pages/Workers, Vercel, Docker on-premise; git, terminal, npm
- Metodyka BA/discovery: Mom Test, PRD (Rachitsky), INVEST user stories, Given/When/Then (BDD), BPMN 2.0 AS-IS→TO-BE, RICE, ROI/payback modeling, SQL (podstawy); service design / AI Service Design Audit (service blueprint Shostacka + warstwa aktora AI, HITL governance, can-vs-should, ocena gotowości go/no-go)
- Polski stack regulacyjny: KSeF (ksef2 SDK), JPK_V7M/JPK_FA, RODO/UODO/PKE art. 398, JDG B2B/reverse charge VAT EU

## Certyfikaty

- „Wykorzystanie AI w rozwoju firmy" — program Umiejętności Jutra: AI (Google / SGH), 2026

## Wykształcenie

- Psychologia w biznesie — Uniwersytet DSW Ideis (dawny DSW), Wrocław | 2023–2026 · studia I stopnia, profil praktyczny — **w toku, bez dyplomu** *(patrz uwaga niżej)* — praca empiryczna: psychologia pracy, framework JD-R, wywiady jakościowe + analiza tematyczna (MAXQDA)
- Prawo — Uczelnia Łazarskiego, Warszawa | 2020–2022 (fundamenty kierunkowe)
- Informatyka — Warszawska Wyższa Szkoła Informatyki | 2019–2020 (fundamenty kierunkowe)

## Języki

- Polski — ojczysty
- Angielski — B2 (biegłość operacyjna: 3,7 roku codziennej pracy po angielsku w UPS GBS)
