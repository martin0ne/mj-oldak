---
date: 2026-10-21
type: audit
project: Rekrutacja
status: wykonany — do realizacji tego samego dnia
zakres: /portfolio na mjoldak.pl (src/pages/portfolio/index.astro + src/data/portfolio.js)
metoda: porównanie strony z profil-idealnego-kandydata.md (sekcja 2 + 4) + weryfikacja linków HTTP + porównanie z case-studies w vaultcie
---

# AUDYT PORTFOLIO 21.10 — co rekruter zobaczy, czego brakuje, co budujemy

## Werdykt w jednym zdaniu

Strona jest **poprawna i uczciwa, ale niekompletna rekrutacyjnie**: dowody istnieją, lecz portfolio pokazuje je jako hasła, nie jako case studies — a 6 gotowych, przepuszczonych przez honesty-pass case studies leży w vaultcie i **nie jest pokazane w ogóle**.

## Stan faktyczny (zweryfikowany, nie z relacji)

| Element | Stan | Dowód |
|---|---|---|
| Route `/portfolio/` | działa | HTTP 200 |
| 6 kart artefaktów | działa | 3 × `/demy/`, 3 × PDF, 2 × GitHub, 1 × live demo |
| Wszystkie 11 linków wewnętrznych | 200 | curl na dist + live |
| Sekcja „Co twierdzę — gdzie udowodnić" | jest | claim-code table, 5 wierszy, wszystkie `live` |
| Sekcja Stack TOP-7 | jest | lista kompetencji |
| Sekcja Publikacje (3 raporty) | jest | 3 PDF, HTTP 200 |
| Case studies w vaultcie | **6 PL+EN, 2 poprawne warianty każdy** | `Rekrutacja/case-studies/` |
| Case studies na stronie | **0** | brak sekcji, brak linków |
| Wariant EN portfolio | **brak** | route `/en/` ma tylko `index.astro` + `articles/` |
| Timeline / narracja „AI od 2022, komercyjnie od 2026" | **brak** | — |
| Sekcja „dla kogo to jest" (rekruter vs klient) | **brak** | — |
| Metryka efektu w kartach | **brak** | karty mają 1-zdaniowy opis, bez liczby |

## Braki — podzielone na: zamykam dziś budowaniem / nie zamykam

### ZAMYKAM DZIŚ BUDOWANIEM (priorytet 1 — największy zwrot)

**B1. Zero case studies na stronie.** 6 case'ów (agent-flow, kb-rag, OCR Invoice Reader, Email Assistant, Deadline Agent, Reporting Agent) ma wariant PL ~130 słów + EN ~110 słów, sekcje Problem → Rozwiązanie → Efekt → Lekcje → Keywordy, i przeszło honesty-pass. Rekruter tego nie widzi. **Naprawa:** sekcja „Case studies" — 6 kart z krótkim wariantem PL + link do repo/demo + tag keywordu ATS.

**B2. Brak metryki efektu.** Karty artefaktów mają opis bez liczby („Klasyfikacja maili na 4 kategorie"), a profil-idealnego-kandydata mówi wprost: rynek chce **efektu, nie listy technologii**. Rekruter nie ma powodu zatrzymać się na karcie. **Naprawa:** metryka w każdej karcie (5-15 s na fakturę · 37 plików / 662 chunki · 3 kroki · 5 testów · 4 kategorie).

**B3. Brak sekcji „dla kogo".** Portfolio dziś odpowiada na pytanie „co zbudowałem", nie „czy to dla mnie". Przy staraniu o rolę BA/AI to pytanie nr 1. **Naprawa:** jedna sekcja z dwoma kolumnami: *dla rekrutera* (co chcesz zobaczyć / gdzie kliknąć) i *dla właściciela MŚP* (co dostajesz / ile to kosztuje).

**B4. Brak timeline'u „AI od 2022, komercyjnie od 2026".** Profil mówi: bariery 3-5 lat **nie zamkniesz budowaniem** — obchodzisz ją narracją. Narracji na stronie nie ma. Rekruter widzi brak stażu bez wyjaśnienia. **Naprawa:** pasek timeline z datami i etapami (UPS 2022-2026 → MJ.OLDAK 05.2026 → 9 repo / 4 produkty → portfolio).

**B5. `kb-rag` w CV nie istnieje jako repo.** `github.com/martin0ne/kb-rag` → **404**. Realnie: `claude-skills/skills/kb-rag` (200) i `rag-lexical-vs-semantic` (200). Rekrutera, który kliknie, czeka 404 — wygląda to jak niedorobka, choć produkt istnieje i działa. **Naprawa:** poprawić nazwę/URL w CV (dziś) i użyć istniejącej ścieżki w portfolio.

### NIE ZAMYKAM (świadome decyzje, nie bugi)

- **EN portfolio** — route `/en/` istnieje, ale pełna wersja EN = przepisanie 6 sekcji + 6 case'ów po angielsku. Realne, ale nie dziś. **Decyzja:** dodać EN do roadmapy; na dziś link z wersji EN strony głównej na PL portfolio nie istnieje i to jest świadoma luka, nie błąd.
- **Luka „doświadczenie 3-5 lat"** — strukturalna, nie zamykasz jej budowaniem. Portfolio ją obchodzi (dowód zamiast lat), ale jej nie usuwa.
- **EN C1** — trening, nie portfolio.

## Co budujemy DZISIAJ (kolejność)

1. **Sekcja Case studies** w `/portfolio` — 6 kart, wariant PL z case'ów, link do repo/demo, tag keywordu ATS (RAG · agentic · n8n · adoption · BPMN). Źródło prawdy: `Rekrutacja/case-studies/*.md`.
2. **Metryki w kartach artefaktów** — każda karta dostaje jedną twardą liczbę z case'a (nie zmyślona — z istniejącego tekstu).
3. **Sekcja „dla kogo"** — dwie kolumny: rekruter / właściciel MŚP.
4. **Timeline** — pasek chronologiczny z narracją obejścia bariery stażu.
5. **Poprawka `kb-rag` → poprawna ścieżka** w CV-bazie i CV-paczkach (6 plików).
6. **Weryfikacja** — build + wszystkie linki HTTP 200 + brak regresji na 45 stronach.

## Mapa: co gdzie trafia

| Brak | Gdzie naprawa | Plik |
|---|---|---|
| B1 case studies | `/portfolio` nowa sekcja + dane | `src/data/portfolio.js` (nowy export `caseStudies`) + `src/pages/portfolio/index.astro` |
| B2 metryki | karty artefaktów | `src/data/portfolio.js` (pole `metric`) |
| B3 dla kogo | `/portfolio` nowa sekcja | `src/pages/portfolio/index.astro` |
| B4 timeline | `/portfolio` nowa sekcja | `src/pages/portfolio/index.astro` |
| B5 kb-rag | CV-baza + 6 paczek | `Atomic/AI-wiki/projects/Rekrutacja/CV-baza.md` + `~/Desktop/Aplikacje-CV/2026-10-21/PRE-*/CV-*.md` |

## Bramy (do decyzji Marcina, nie zgadywam)

1. **Czy 6 case'ów na stronie to za dużo?** Rekruter czyta 30 sekund. Propozycja: 6 kart z jednym zdaniem + link „przeczytaj case", a pełne case'y jako osobne podstrony `/portfolio/case/<nazwa>` (SEO + głębokość).
2. **Czy poprawiam `kb-rag` w CV na `rag-lexical-vs-semantic`?** (inne repo, tożsame DNA, 200 zamiast 404) — czy zostawiam nazwę `kb-rag` i dodaję link do `claude-skills/skills/kb-rag`?
3. **EN portfolio** — czy w kolejnych dniach, czy czeka do następnego tygodnia?

## Powiązane

- `Rekrutacja/profil-idealnego-kandydata.md` — sekcja 2 (must-have z częstotliwością) i 4 (luki A/B/C)
- `Rekrutacja/case-studies/` — 6 case'ów źródłowych
- `Rekrutacja/CV-baza.md` — linia CV do spójności
- Skill `case-study-builder` — reguły destylatu i honesty pass
- PRZEGLĄD-2026-10-21 → decyzja „push /portfolio (opcja B po preflight)" — ten audyt jest preflightem
