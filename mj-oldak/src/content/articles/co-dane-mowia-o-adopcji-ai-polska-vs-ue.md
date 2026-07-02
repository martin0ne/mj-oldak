---
title: "Co dane mówią o adopcji AI: Polska vs UE — pojedynek dwóch urzędów w SQL"
slug: "co-dane-mowia-o-adopcji-ai-polska-vs-ue"
cover: "/articles/covers/co-dane-mowia-o-adopcji-ai-polska-vs-ue.png"
coverAlt: "Co dane mówią o adopcji AI: Polska vs UE — pojedynek dwóch urzędów w SQL — MJ.OLDAK"
excerpt: "Polska wdraża AI szybko, ale od tak niskiej bazy, że dystans do UE rośnie. Ręcznie pisany SQL uzgadnia ten sam wskaźnik między GUS a Eurostatem — JOIN, reconciliation, funkcje okna."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 7
featured: false
draft: false
lang: "pl"
translationKey: "sql-ai-adoption"
metaTitle: "Adopcja AI Polska vs UE — analiza w SQL (GUS × Eurostat)"
metaDescription: "Reprodukowalny pipeline SQL uzgadnia odsetek firm z AI między GUS a Eurostatem. Polska rośnie szybko, ale dystans do UE27 rośnie: −4,79 → −11,59 pp."
keywords: ["adopcja AI", "GUS", "Eurostat", "SQL", "DuckDB", "analiza danych", "Polska vs UE", "junior data analyst"]
faq:
  - q: "Ile firm w Polsce używa AI?"
    a: "Według Eurostatu 8,36% firm zatrudniających 10+ osób używa co najmniej jednej technologii AI (2025); GUS podaje 8,7%. To wzrost z 2,86% w 2021 roku — szybki, ale od bardzo niskiej bazy."
  - q: "Czy Polska nadrabia dystans do UE w adopcji AI?"
    a: "Nie — mimo szybkiego wzrostu luka do średniej UE27 rośnie: z −4,79 pp (2021) do −11,59 pp (2025). Polska rośnie od niskiej bazy, a średnia UE — z 7,65% do 19,95% — ucieka szybciej."
  - q: "Jak Polska wypada na tle innych krajów UE w adopcji AI?"
    a: "Polska spadła z 26. miejsca (2021) na 31. (2024 i 2025) na 33 kraje i jest poniżej średniej UE27 w każdej klasie wielkości firm. Największa luka dotyczy firm średnich: 14,77% vs 30,36% (−15,59 pp)."
  - q: "Skąd pochodzą dane o adopcji AI w Polsce i czy można im ufać?"
    a: "Z dwóch niezależnych urzędów: GUS (Tab.15 z publikacji „Wykorzystanie ICT w przedsiębiorstwach 2025”) i Eurostatu (zbiór isoc_eb_ai, wskaźnik E_AI_TANY). Gdy dwa urzędy mierzą to samo i wychodzi im prawie identycznie — 8,7% vs 8,36%, różnica 0,34 pp — liczbie można ufać."
  - q: "Czy te dane mówią coś o AI w polskich bankach?"
    a: "Nie — oba źródła mierzą gospodarkę z wyłączeniem sektora finansowego (NACE sekcja K), a publiczny zbiór o adopcji AI specyficznie w polskich bankach nie istnieje (stan na połowę 2026). Z tych liczb nie wolno więc wyciągać żadnej liczby o bankach."
  - q: "Czy tę analizę da się odtworzyć samemu?"
    a: "Tak — kod jest publiczny na licencji MIT (github.com/martin0ne/analytics-stack-pl), a cały raport odbudowuje się jedną komendą: uv run dvc repro analyze_ai. Testy pilnują kontraktów danych i niezmienników SQL, a każdy zbiór ma plik provenance ze źródłem i sumą SHA-256."
---

Intuicja mówi: "Polska szybko nadrabia w AI". I to prawda — odsetek firm 10+ używających AI wzrósł z 2,86% (2021) do 8,36% (2025). Twist: ten sam ręcznie napisany SQL pokazuje, że **dystans do średniej UE27 nie maleje, lecz rośnie** — z −4,79 do −11,59 pp. Rośniemy, ale od tak niskiej bazy, że średnia UE ucieka szybciej.

## O co chodzi

To reprodukowalny, lokalny (0-cost) pipeline analityczny na macOS. Flagowa analiza nazywa się "AI adoption across Polish & EU enterprises" — bierze **ten sam wskaźnik** ("firmy używające co najmniej jednej technologii AI") z **dwóch niezależnych urzędów statystycznych** i stawia je obok siebie:

- **GUS** — Tab.15 z publikacji "Wykorzystanie ICT w przedsiębiorstwach 2025",
- **Eurostat** — zbiór `isoc_eb_ai` (wskaźnik `E_AI_TANY`).

Po co dwa źródła? Bo gdy dwa niezależne urzędy mierzą to samo i wychodzi im prawie identycznie, liczbie można ufać. Dla firm 10+ w 2025: GUS raportuje 8,7%, Eurostat 8,36% — różnica 0,34 pp (4,1% względnie). To nie są nowe fakty — to **uczciwa synteza publicznych liczb**: uzgodnij, zbenchmarkuj, pokaż trend. Wartością nie jest "odkrycie", tylko audytowalny workflow: publiczne dane → policzalny pipeline → cytowany raport. Dokładne wartości (np. 8,36%, 19,95%) to bezpośredni odczyt z Eurostat Data Browser (wskaźnik `E_AI_TANY`), nie zaokrąglenia z notek prasowych — te podają zwykle 8% / 20%.

Czytelnik dostaje na końcu brandowany raport PDF/HTML (paleta mjoldak.pl) z dwoma wykresami, czterema tabelami wynikowymi SQL i zastrzeżeniem zakresu wypisanym na wierzchu. To case study pokazujące warsztat junior data/BA pod rolę w sektorze finansowym.

## Pod maską — cztery zapytania SQL

Rdzeń to cztery ręcznie napisane zapytania (DuckDB), które celowo pokrywają wymagane techniki: JOIN, reconciliation i funkcje okna.

```text
GUS (Tab.15)  ─┐
               ├─> Q1 reconciliation  (JOIN po geo/year/size)
Eurostat ──────┘        GUS 8,7%  vs  Eurostat 8,36%  → 0,34 pp

Eurostat PL ──┬─> Q2 benchmark UE27  (wieloetapowy LEFT JOIN)
Eurostat UE27 ┘        PL poniżej UE w KAŻDEJ klasie wielkości

Eurostat panel ─> Q3 trajektoria+ranking (LAG, RANK, COUNT OVER)
                       PL: 26. (2021) → 31. miejsce (2025) z 33 krajów

Eurostat panel ─> Q4 luka rosnąca (self-JOIN + AVG OVER krocząca)
                       −4,79 pp (2021) → −11,59 pp (2025)
```

**Q1 — reconciliation (JOIN).** Łączy GUS i Eurostat na `(geo, year, size_emp)` i stawia oba urzędy obok siebie. Po klasach wielkości (2025): małe firmy 6,1% vs 5,79%, średnie 15,6% vs 14,77%, duże 42,0% vs 45,81%. SME zgadzają się w granicach poniżej 1 pp; klasa 250+ rozjeżdża się mocniej — bo populacja dużych firm jest mała i statystycznie hałaśliwa.

**Q2 — benchmark UE27 (wieloetapowy LEFT JOIN).** Stawia Polskę po klasach wielkości obok średniej UE27. Polska jest **poniżej UE w każdej klasie**: total 10+ to 8,36% vs 19,95% (−11,59 pp), a największa luka jest u firm średnich: 14,77% vs 30,36% (−15,59 pp).

**Q3 — trajektoria i ranking (window).** `LAG` liczy zmianę od poprzedniej fali ankiety (rok 2022 nie był ankietowany, więc 2023 to krok dwuletni). `RANK OVER PARTITION BY` plus `COUNT OVER` dają pozycję Polski: spada z 26. (2021) na 31. miejsce (2024 i 2025) przy 33 krajach — **mimo szybkiego wzrostu adopcji**, bo średnia UE27 rośnie szybciej.

**Q4 — luka rosnąca (self-JOIN + ramowana średnia krocząca).** Panel Eurostatu złączony sam ze sobą (PL vs EU27) plus 2-letnia średnia krocząca luki (`AVG OVER ... ROWS BETWEEN 1 PRECEDING AND CURRENT ROW`). Dowód jest twardy: luka idzie −4,79 (2021) → −4,39 (2023) → −7,58 (2024) → −11,59 pp (2025). UE27 w tym czasie rośnie z 7,65% do 19,95%.

Detal rzetelności: zapytanie rankingowe **celowo wyklucza agregaty ponadnarodowe** (EU27_2020, strefa euro EA/EA12/EA19/EA20), żeby ranking był naprawdę na poziomie krajów. Pilnuje tego test jednostkowy `test_ranking_is_country_level_no_aggregate_leak` — sprawdza, że krajów jest 33, a Polska na 31. miejscu, więc żaden agregat nie "wycieka" do rankingu.

## Co z tego wynika

Puenta merytoryczna jest niewygodna, ale poprawna: **szybki wzrost od niskiej bazy to nie to samo co nadrabianie dystansu.** Patrzysz tylko na poziom — widzisz sukces. Patrzysz na trend *różnicy* — widzisz, że odjeżdżamy. Analityk musi umieć rozróżnić te dwie historie, bo opowiadają coś przeciwnego.

Drugi sygnał dojrzałości to **dyscyplina zakresu**. Oba źródła mierzą całą gospodarkę z **wyłączeniem sektora finansowego** (NACE sekcja K): GUS "Ogółem bez sekcji K" odpowiada Eurostatowemu `C10-S951_X_K`. Sprawdziłem NBP, KNF, EBA, ECB — publiczny zbiór o adopcji AI specyficznie w polskich bankach **nie istnieje** (stan na połowę 2026). Dlatego z tych liczb **nie wolno** wyciągnąć żadnej liczby "AI w bankach". Jawne "czego tu nie ma" jest tu ważniejsze niż kolejny wykres.

Stąd też świadome rozdzielenie dwóch poziomów wiarygodności: dane ilościowe (GUS/Eurostat) żyją osobno od jakościowej syntezy dowodów o AI w bankowości UE/PL (osobny raport, weryfikacja metodą SIFT) — żeby nie mieszać twardych liczb z przeglądem literatury.

I rzecz o sposobie pracy: **AI-augmented, nie AI-substituted.** Kod powstawał z Claude Code i lokalnym LM Studio (endpoint zgodny z OpenAI), nigdy z płatnym, metrowanym kluczem API. Ale każdy wygenerowany SQL czy fragment pandas jest przepisany i zrozumiany ręcznie — bo na rozmowie rekrutacyjnej SQL musi być twój, nie modelu.

## Dowód

Kod jest publiczny na licencji MIT: [github.com/martin0ne/analytics-stack-pl](https://github.com/martin0ne/analytics-stack-pl). Cały raport odbudowuje się jedną komendą — `uv run dvc repro analyze_ai` (ingest GUS + Eurostat → walidacja schematu przez pandera → cztery zapytania SQL → raport). Testy `uv run pytest tests/` pilnują kontraktów danych (schema odrzuca zły wsad) i niezmienników SQL: trajektoria monotoniczna, luka ujemna i rosnąca, brak wycieku agregatu do rankingu.

Każdy zbiór ma plik `*.provenance.json` ze źródłem, endpointem, czasem pobrania, sumą SHA-256 i licencją. Wszystkie kluczowe figury (8,7% / 8,36% / 19,95% / luka −4,79 → −11,59 pp) zostały 16.06.2026 niezależnie sprawdzone wobec źródeł pierwotnych — GUS Tab.15 i Eurostat Data Browser — i potwierdzone do podanej precyzji (`FACT_CHECK.md`). Gotowy artefakt: `reports/ai_adoption_report.pdf` (~288 KB).

Jeśli interesuje cię, jak podchodzę do mapowania procesów jako analityk — opisałem to tu: [jak zmapowałem proces automatem do BPMN](/artykuly/zmapowalem-proces-automatem-bpmn/).
