# Stack analityczny: compose vs build + scoring jako umiejętność

*raport oparty na źródłach z OSNOWA/prompts (2026-06–2026-07) + research trends (2026)*

## TL;DR

Po pierwsze, priorytet w budowie osobistego stacka analitycznego powinien paść na **SQL i warstwę domenową** (Polska finansów), a nie na automatyzację pipeline'u — framework „compose over build" wygrywa pod względem nakładu utrzymania przy budżecie zero PLN. Po drugie, systemy scoringowe działają najlepiej, gdy zaczynają się od wag teoretycznie-zależnych równych sobie plus veto gates jako hard constraints POZA score'em, ewoluując ku modelom uczenia maszynowego dopiero po zbiorze oznaczonych etykiet — literatura o improper linear models (Dawes) potwierdza, że prostsze modele liniowe regularnie bije złożone przy małych próbach i niskiej jakości danych etykietujących. Po trzecie, istnieją dwie znaczące luki: brak odpalonego Deep Research na rynek PL (brak danych o liczebności ofert, pensjach, wymaganiach konkretnych firm) oraz brak rekomendacji scaffold-level (tylko prompt-y istnieją, bez wyniku DR). Obie luki oznaczają, że wszystkie twierdzenia rekrutacyjne pozostają hipotetyczne do momentu uruchomienia Deep Research.

## 1. Kontekst — czym jest stack i dlaczego pytać o „compose vs build"

Stack analityczny to zestaw reużywalnych narzędzi pokrywających fazę przepływu pracy od pozyskania surowych danych do finalnej publikacji wniosków. W wersji roboczej autor definiuje sześć komponentów: data-acquire → data-validate → data-wrangle → data-analyze → insight-synth → analytical-report. Później rozrastą się do jedenaściou warstw z dodaniem data-versioning, source-claim-validate, stat-validate, decision-report, i monitor-and-maintain [prompts/compose-vs-build, 2026-06-13].

Trzy twarde ograniczenia stanowią filtry selekcji technologicznej:

1. **Budżet = EUR 0 / PLN 0** — żadne płatne SaaS, subskrypcje, free-trap-y, ani managed backend. Użytkownik ma Claude Max plan i Perplexity — wszystko co zewnętrzne musi być lokalnie hostowalne.
2. **Brak DevOps** — zero serwerów VPS, zero daemons/cron-to-babysit, zero always-on schedulers. Coś potrzebuje administracji ≥ raz w miesiącu = auto-disqualified.
3. **Apple Silicon arm64 native** — żaden x86-only tool z Rossetą czy Linux-container-only option.

Dodatkowy wymiar to **literacy flag**: narzędzie nie może zastępować kompetencji sprawdzanych na rozmowach rekrutacyjnych (SQL by ręki, Power BI/DAX, interpretacja testów statystycznych, pandas reasoning). Black-box tool, który robi EDA za Ciebie, jest dobrym demo ale złym nauczycielem. Glass-box transparency jest wymagane [prompts/compose-vs-build, 2026-06-13].

### 1.1 Cztery pytania badawcze pierwszego promptu

Prompt z 13 czerwca 2026 definiuje cztery kluczowe pytania dla Perplexity Deep Research:

1. **Gaps in the plan/pipeline**: czego brakuje? Co pominięto — wersjonowanie danych, walidacja statystyczna, ryzyko bias/cherry-picking, dokumentacja metodyki, etyka danych?
2. **Role gap analysis (market)**: jakie twarde skills są expected TODAY (2025–2026) od Data Analyst / BA w finansach PL/EU, których brakuje w profilu? Must-have vs nice-to-have w ofertach pracy.
3. **Concrete tools to learn**: SQL, Python data stack, wizualizacja/BI, statistyka/econometrii, bazy danych, cloud, domain/regulatory knowledge (KYC/AML, MiFID II, Basel, risk reporting) — priorytetyzowane po roturnie employability.
4. **Data fact-checking**: frameworki, metody i narzędzia do weryfikacji poprawności danych, oceny wiarygodności zrodel, wykrywania dezinformacji — zwłaszcza secondary data [prompts/compose-vs-build, 2026-06-13].

### 1.2 Dwa przebiegi Promptu Scoring

Prompt z 29 lipca został zaprojektowany na dwa przebiegi DR:

- **Prompt A (nauka)**: taksonomia metod scoringowych, pełna metodyka budowy, cold-start, walidacja, czytanie wyniku, tryby awarii, aspekty prawne. Sekcje: taxonomy, full pipeline, cold-start, validation, reading scores, failure modes, when-score-is-wrong-tool, legal-ethical-for-persons, canonical-evidence-base.
- **Prompt B v2 (implementacja)**: architektura referencyjna, biblioteki Python, LLM roles, hybrid designs, code-testing vs validity-validation, human-in-the-loop feedback, presentation layer, staged plan.

Oba odpalone, wyniki zapisane w pliku jako output summaries z tuning notes [prompts/scoring, 2026-07-29].

## 2. Stack analityczny rekomendowany — wnioski z promptów

### 2.1 Framework CLONE / COMPOSE / BUILD-CUSTOM

Prompt compose-vs-build wprowadza framework oceny każdej warstwy pipeline'u jako:

- **CLONE** — adoptuj gotowy projekt/scaffold (np. cookiecutters, end-to-end templates). Niszczy ryzyko reinwentowania szkicu, ale wymaga ostrożności literacy flag: czy narzędzie zastępuje kompetencję, która powinna być Twoja.
- **COMPOSE** — łącz kanoniczne biblioteki przez szablon glue (np. pandera + Great Expectations + statsmodels). Wymaga świadomości jakie łączenie się robi.
- **BUILD-CUSTOM** — uzasadnione TYLKO dla różnicownika: (i) warstwa orkiestracji głosowej Claude'a jako cel dydaktyczny, (ii) warstwa domenowa PL-finance (NBP/GUS/GPW connectory, definicje KYC/AML/MiFID II/Basel). Każde BUILD-CUSTOM spoza tego zakresu musi wykazać brak OSS prior-art.

Priorytet umiejętności (ustalony z góry w prompt): **SQL = #1 must-have**, potem Power BI/DAX, Excel, pandas, statystyki, domain knowledge bankowy. Każdy komponent stacka jest oznaczany `BYPASS-RISK` jeśli kradnie literaturę rekrutera [prompts/compose-vs-build, 2026].

### 2.2 Scoring — metodaologia potwierdzona z DR

Dokument scoring dostarcza solidny rdzeń metodologiczny z czterema zastrzeżeniami:

| Aspekt | Ustalenie | Źródło |
|---|---|---|
| Model v1 | theory-driven additive weighted-sum + veto gates POZA score'em | DR Output A, Dawes literature |
| Wagi początkowe | równe/wariacje expert-elicited — equal weights beats complex (improper linear models) | Dawes; Siddiqi credit-scoring tradition |
| Missing values | neutralny wkład + flaga, nigdy penalty — WOE-style | DR Output B |
| Cold-start | Bayesian shrinkage dopiero gdy przybędzie etykiet | DR Output A + B |
| Walidacja | Monte Carlo sensitivity over weight vectors + Spearman rank-stability | JRC composite-indicator methodology |

Krytyka DR: progi PSI 0.1/0.25 i IV 0.02/0.1/0.3 to konwencje branżowe bez mocnego uzasadnienia teoretycznego — muszą być flagowane jako `[industry convention]`, nie `[peer-reviewed]`. Goodhart's law transfer z credit-scoringu do scoringu ofert jest błędem domenowym (offer market nie ma agent-gaming). Reguła EPV≥10 uznana za uproszczoną przez van Smeden/riley (2019) [prompts/scoring, 2026].

### 2.3 Architektura referencyjna

Z promptu B wynika struktura modułowa:

```
scoring-core/
├── config.yaml          # indicators, weights, thresholds, vetoes
├── extractors/          # per-domain feature extraction
├── scorer.py            # deterministic core (additive weighted sum)
├── validators/          # MC sensitivity, rank stability
└── explanations/        # per-item contribution breakdown
```

Wagi i cutoff'y są versioned configuration data, nie code [prompts/scoring, 2026].

## 3. Luki i ryzyka

### 3.1 Brak Deep Research na rynek PL (finanse)

**Brak danych.** Plik „2026-06-13 — PerplexityDeepResearch — stack analityczny + luki roli (finanse).md" nie istnieje na dysku. Jest tylko jego **prompt** (4078 B) z czterema pytaniami badawczymi skierowanymi do Deep Research. Żadna liczba dotycząca rynku PL (liczebność ofert, widełki pensji, wymagania KNF/NBP, stopa zatrudniania junior BA) nie została zebrana.

Wniosek operacyjny: sekcje dotyczące („co jest expected TODAY na rynku") pozostają hipotetyczne. Należy odpalić DR z treścią tego promptu przed finalizacją jakiejkolwiek tezy rekrutacyjnej.

### 3.2 Brak konkretnych rekomendacji technologicznych

Prompt compose-vs-build pyta o **projekty scaffold-level**, nie biblioteki. Odpowiedź z DR nie jest dostarczona na dysku — mamy tylko prompt. Stąd lista „top candidates" dla każdego z 11 komponentów jest pusta. To luka knowledgowa.

### 3.3 Ryzyka metodologiczne istniejące niezależnie od DR

- **Selection bias**: etykiety są obserwowane tylko dla ofert na które Marcin odpowiedział — decydującym czynnikiem jest sam wynik skora. Tryb_missing-not-at-random klasyczny.
- **Overfitting na małej próbie**: zalecane są equal weights + Bayesian shrinkage, ale kalibracja concentration parametru w dirichlet Monte Carlo wymaga testu empirycznego.
- **Kompetencyjne BYPASS**: adopting black-box tool (np. auto-EDA, no-code dashboard) może dać demo, ale niszczy literacy potrzebne na rozmowach rekrutacyjnych.

## 4. Metodyka — co pochodzi z czego

| Element źródła | Typ | Status |
|---|---|---|
| Draft stacka 6-komponentowego | Prompt | ✅ Istnieje, użyty jako ramy |
| CLONE/COMPOSE/BUILD-CUSTOM framework | Prompt | ✅ Istnieje, użyty jako ramy |
| SQL priorytet #1 | Prompt (postanowienie) | ✅ Istnieje |
| Taksonomia metod scoringowych | Prompt A | ✅ Szczegółowy, gotowy do odpalenia |
| Verdykt DR Output A: theory-driven weighted-sum + veto gates | Prompt output note | ✅ Zapisany w pliku scoring |
| Plan 5-etapowej implementacji | Prompt B output note | ✅ Zapisany w pliku scoring |
| Lista bibliotek Python dla each step | Prompt B output note | ✅ Zapisany w pliku scoring |
| Market data PL (oferty, pensje, wymagania) | BRak DR | ❌ Tylko prompt, bez wyniku |
| Specific scaffold recommendations | Brak DR | ❌ Tylko prompt, bez wyniku |
| Research trends 2026: AI agents, local models, inference efficiency | research-trends.pdf | ✅ Used as supplementary context |

## 5. Źródła

1. `2026-06-13 — Perplexity DeepResearch — compose-vs-build stack v2 (prior-art scan)` — prompt do DR, 2026-06-13. OSNOWA/wiedza/prompts/.
2. `2026-07-29 — Perplexity DeepResearch — scoring jako umiejętność (metodyka + implementacja)` — prompt z output summary DR + tuning notes, 2026-07-29. OSNOWA/wiedza/prompts/.
3. `What are the latest research trends in technology and computer science in 2026?` — survey of 2026 literature on AI agents, small/local/on-device LMs, inference efficiency, embodied AI, post-quantum crypto, privacy/security. Compiled ~2026-10-14. Downloads/.
4. `2026-06-13 — PerplexityDeepResearch — stack analityczny + luki roli (finanse)` — Plik promptu. **Nieistniejący na dysku** (No such file). Odniesienie do promptu z 4 pytaniami badawczymi — brak DR output.
