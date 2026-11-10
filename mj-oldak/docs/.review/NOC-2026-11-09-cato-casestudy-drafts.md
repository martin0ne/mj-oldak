# DRAFT case studies do portfolio — noc 2026-11-09 (CATO-2)

**Status:** DRAFT — kandydaci do zatwierdzenia przez Marcina rano. Publikacja external dopiero po zatwierdzeniu. Zero wysyłek w tej sesji.

**Źródło prawdy liczb:** `~/.hermes/cache/scratch/noc-portfolio-input/FAKTY-METODYKA.md` + surowe artefakty (raport.json, stan.json, rejestr-zrodel.json, bdl-64428/29.json, oba skrypty). Żadna liczba w tym dokumencie nie pochodzi z pamięci.

**Format:** skille `case-study-builder` (szablon + zasady + honesty pass). Dwa warianty długości per case: krótki ~120-150 słów pod kartę, pełny pod rozmowę/portfolio. Reguła spójności: karta i podstrona mówią to samo (ta sama metryka, ten sam werdykt).

---

# CASE A — NYC Yellow Taxi Q1 2024: analiza 9,55 mln kursów w DuckDB

> Hak jednowierszowy: analiza 9,5 mln kursów taxi czytanych prosto z chmury w DuckDB — od jawnego czyszczenia danych do rekomendacji "kiedy i gdzie zarabiać".

## WARIANT KRÓTKI — karta (cel 120-150 słów)

Analiza 9 554 778 kursów NYC Yellow Taxi (Q1 2024) w DuckDB — parquet czytany bezpośrednio z chmury, bez pobierania na dysk. Problem decyzyjny: kiedy i gdzie kierowca realnie zarabia najwięcej (przychód na kurs plus napiwki). Zbudowałem jeden przebieg: 5 jawnych, osobno policzonych reguł czyszczenia (kwota, dystans, pasażerowie, okno czasowe, czas trwania), po których zostało 8 447 898 kursów — odrzucone 11,6%. Dalej przekroje wg godziny, dnia tygodnia i strefy oraz ranking okien z progiem 5000 kursów. Wynik: najlepsza godzina 5:00 — 31,75 USD/kurs, JFK Airport 73,09 USD/kurs przy 400 tys. kursów, poniedziałek 23,31 USD/kurs. Audyt wykazał, że 526 397 wierszy odrzucono poza 5 formalnymi regułami (NULL-e niełapane przez reguły) — różnicę policzyłem dopiero w audycie, nie w skrypcie; stąd twardy warunek przed publikacją repo: bilansem odrzutów trzeba się spiąć jawnie.

### Koniec wariantu krótkiego

## WARIANT PEŁNY — portfolio / rozmowa

### Kontekst

- **Dla kogo / gdzie:** analiza własna na danych publicznych NYC TLC (Yellow Taxi, Q1 2024); środowisko własne (PC, Python 3.14, DuckDB 2.0).
- **Rola:** solo builder — pytanie decyzyjne, skrypt, czyszczenie, wizualizacje, raport JSON.

### Problem

Dane publiczne TLC są pełne odrzutów: kwoty poza skalą, dystanse zerowe i absurdalne, czasy trwania nierealne, kursy poza oknem. Bez jawnego, policzalnego czyszczenia każda średnia kłamie, a "czyszczenieMagicznie" ukrywa, ile i co dokładnie wyleciało. Pytanie decyzyjne: kiedy i gdzie kierowca realnie zarabia najwięcej — przychód na kurs plus napiwki.

### Rozwiązanie

1. **Zero pobierania na dysk:** 3 pliki parquet (2024-01/02/03) plus taxi_zone_lookup.csv czytane wprost z CDN przez `read_parquet()` w DuckDB in-memory.
2. **Czyszczenie jako 5 jawnych reguł, każda policzona osobno:** fare_amount poza 1-500 USD; trip_distance poza 0,1-100 mil; passenger_count poza 1-6; pickup poza Q1 2024; czas trwania poza 1 min - 6 h. Widok czysty to koniunkcja dopełnień — reguła i filtr nigdy się nie rozjadą.
3. **Przekroje na widoku czystym:** wg godziny, wg dnia tygodnia, top strefy po liczbie i po przychodzie na kurs (join na lookup po PULocationID), heatmapa dzień x godzina, top/bottom okien z progiem minimum 5000 kursów — żeby małe próbki nie wygrywały rankingu.
4. **Wyjście:** raport.json plus 4 wykresy PNG (godziny, przychod i napiwki, strefy, heatmapa).

### Stack

DuckDB (SQL in-memory bezpośrednio na parquet z chmury) · Python (pandas do odczytu wyników) · matplotlib · dane publiczne NYC TLC.

### Efekt

- **Skala:** 9 554 778 wierszy surowych; 8 447 898 po czyszczeniu; odrzucone 11,6% (1 106 880 wierszy).
- **Metryki ogólne:** średnia opłata 18,63 USD; napiwki 18,9%; kurs 3,31 mi i 15,5 min; łączny przychód Q1 (fare plus tip) 187 209 628 USD.
- **Okna czasowe:** najlepsza godzina 5:00 — 45 827 kursów po 31,75 USD/kurs (tip 15,1%); kolejne: 4:00 — 26,86, 6:00 — 26,19. Najgorsza: 2:00 — 19,02 USD/kurs.
- **Strefy:** JFK Airport 400 409 kursów po 73,09 USD/kurs (najwyższy wynik przy progu 5000+); LaGuardia 274 049 po 51,73; Midtown Center ma najwięcej kursów (417 171) ale tylko 19,06 USD/kurs — ruch to nie zysk.
- **Dni:** poniedziałek 23,31 USD/kurs (1 029 633 kursów) przeciw sobocie 20,60; najwięcej kursów w czwartek — 1 363 151.
- **Uwaga z audytu (uczciwie, wprost):** suma 5 reguł czyszczenia to 580 483 odrzuty, a faktycznie usunięto 1 106 880 — **526 397 wierszy odrzucono poza formalnymi regułami**. Kandydat na wyjaśnienie: NULL-e — reguły z OR/BETWEEN nie liczą NULL-i, a widok czysty je odrzuca; skrypt tego rozróżnienia nie robi. Liczbę wykryłem dopiero w audycie po fakcie, nie przy pisaniu skryptu.

### Lekcje

1. **Bilans odrzutów musi się spinać.** Suma odrzutów per reguła kontra różnica liczb surowe-minus-czyste — dopóki się nie spinają, istnieje ukryta kategoria odrzutu (tu: NULL-e), większa niż połowa reguł razem wziętych. Reguły bez bilansu to iluzja kontroli jakości.
2. **Opis nie jest danymi.** Docstring skryptu mówił "~15-16 mln wierszy"; faktyczny `count(*)` na surowych to 9 554 778. Jedyne źródło skali to policzenie, nie komentarz.

### Status i werdykt (honesty pass)

Analiza własna na danych publicznych (NYC TLC). Skrypt i wyniki przed publikacją repo — repo nieopublikowane w chwili pisania, link pojawi się po publikacji. **Werdykt: NIE gotowy do publikacji jako referencja bez poprawek.** Wady: (1) dziura 526 397 wierszy nie jest wykrywana ani raportowana automatycznie — trzeba policzyć NULL-e nazwicu i dodać asercję bilansu; (2) ścieżki wyjścia na sztywno (C:\analiza), brak requirements/lockfile, brak README; (3) dane czytane live z CDN bez snapshotu — powtórka za miesiąc może dać inne liczby; brak wersjonowania wyników (każdy run nadpisuje wyjście).

### Keywordy (ATS / rekrutera)

Data Engineering · data quality · DuckDB · SQL · big data analysis · data cleaning · reproducibility

**Link / demo:** brak na dziś — repo przed publikacją (zatwierdzone przez Marcina dopiero wtedy idzie na stronę).

---

# CASE B — Benchmark rynku pracy PL/UE: GUS BDL + Eurostat + NBP

> Hak jednowierszowy: benchmark stawek i rynku pracy PL/UE z trzech API (GUS BDL, Eurostat, NBP) — każda liczba z URL-em, datą aktualizacji i rejestrem źródeł.

## WARIANT KRÓTKI — karta (cel 120-150 słów)

Benchmark rynku pracy PL/UE dla analityka danych: czy stawki 135-150 PLN/h z ofert są rynkowe i gdzie realnie opłaca się pracować. Zbudowałem skrypt, który jednym przebiegiem pobiera GUS BDL (wynagrodzenia, zmienne 64428/64429, po 495 rekordów), cztery zbiory Eurostat (bezrobocie, koszt pracy, zatrudnienie ICT, mediany dochodów) i kurs NBP — każdy request rejestrowany w manifeście źródeł z URL-em, statusem HTTP, datą aktualizacji i rozmiarem. Pułapki obsłużone w kodzie: BDL przy page-size powyżej 100 zwraca zero rekordów przy HTTP 200 (stąd paginacja), nazwy jednostek w BDL różnią się od potocznych, JSON-stat czytany ręcznie przez stride po wymiarach, null to brak publikacji, nie zero. Wynik: 9 endpointów, wszystkie odpowiedzi 200; 135-150 PLN/h to 2,30-2,56x średniej GUS 2025 (9 371,11 zł); Warszawa płaci 15,1% więcej niż Wrocław. Audyt wykazał możliwe pomieszanie tabel Eurostat (mediany gospodarstw domowych kontra wynagrodzenia; indeks kontra poziom kosztu pracy) — naprawa trwa.

### Koniec wariantu krótkiego

## WARIANT PEŁNY — portfolio / rozmowa

### Kontekst

- **Dla kogo / gdzie:** decyzja własna — walidacja stawek z ofert (135-150 PLN/h) przed negocjacją oraz decyzja o lokalizacji (Wrocław kontra Warszawa kontra DE/CZ). Dane publiczne, poziom źródeł 1-2.
- **Rola:** solo builder i analityk — od projektu zapytań API po wniosek decyzyjny.

### Problem

Stawka z oferty bez zaplecza w danych to negocjacja w ciemno, a decyzja "gdzie mieszkać, żeby zarabiać" na anegdotach. Źródła są rozproszone w trzech różnych API o różnych umowach i pułapkach: GUS BDL (keyless, paginacja), Eurostat (JSON-stat 2.0), NBP (kurs na dzień). Do tego każde źródło inaczej nazywa te same jednostki i inaczej oznacza brak danych.

### Rozwiązanie

1. **Manifest źródeł:** każde zapytanie rejestrowane w locie — URL, status HTTP, pole `updated` z treści odpowiedzi (jeśli jest), liczba bajtów. Wynik: rejestr-zrodel.json, 9 endpointów, wszystkie status 200, pobrano 2026-11-09.
2. **GUS BDL:** najpierw metadane zmiennych (`/variables/{id}`), potem dane z `page-size=100` i paginacją po `links.next` — bo page-size powyżej 100 zwraca zero rekordów przy HTTP 200. Mapowanie nazw: BDL mówi "WARMIŃSKO-MAZURSKIE", "POWIAT M. WROCŁAW", "POWIAT M. ST. WARSZAWA" (level 5 = powiat), nie tak jak potocznie; kontrola braków wyszła czysto (`braki_jednostek: []`).
3. **Eurostat JSON-stat 2.0:** odczyt komórki przez stride liczony od ostatniego wymiaru; brak publikacji to null, nie zero; wiele wartości wymiaru (np. dwie jednostki) przez powtórzone parametry URL.
4. **NBP:** tabela A na dzień pobrania. Benchmark stawek liczony w kodzie (nie brany z API): 135-150 PLN/h razy 160 h, stosunki do średnich GUS.

### Stack

Python (requests) · GUS BDL API · Eurostat API (JSON-stat 2.0) · NBP API · matplotlib · manifesty JSON jako ślad audytowy (rejestr-zrodel.json, stan.json).

### Efekt

- **GUS 2025:** Polska 9 371,11 zł brutto; Warszawa 11 677,57 (indeks 124,6); Wrocław 10 147,90 (108,3); Mazowieckie 10 914,07. Dynamika 2015-2025: Polska plus 125,8%, Wrocław plus 122,1%, Warszawa plus 108,8%. **Warszawa vs Wrocław 2025: plus 15,1%** — przenosiny pod Warszawę mają pokrycie w danych.
- **Benchmark:** 135-150 PLN/h = 21 600-24 000 PLN/mies. B2B brutto = **2,30-2,56x średniej krajowej GUS 2025** (1,85-2,06x Warszawy; 2,13-2,37x Wrocławia). Wniosek decyzyjny: stawki są rynkowe, negocjacja ma zaplecze w liczbach.
- **Eurostat 2025:** bezrobocie PL 3,1% przeciw UE-27 6,0% (DE 3,8, CZ 2,8); koszt pracy (2020=100): PL 167,1 przeciw UE 122,4 — rośnie najszybciej z porównywanych; zatrudnienie ICT: PL 4,5% (778,8 tys.) przeciw UE 5,0% — deficyt specjalistów, strukturalny popyt.
- **Mediany dochodów 2024 (Eurostat ilc_di03):** PL 11 921 EUR/os./rok = 55,2% UE (21 582); w PPS 18 064 = 85,0% UE — realny standard życia bliższy UE, niż sugeruje kurs NBP 4,3873 zł/EUR (2026-11-09).
- **Zastrzeżenia zapisane w raporcie:** benchmark to B2B bez składek kontra etat "ogółem" — nie 1:1; zmienna 64428 jest zdefiniowana tylko jako "ogółem" (temat P2497) — nie dopisuję jej znaczenia; mediany to gospodarstwa domowe, nie wynagrodzenia — osobna etykieta; LFS to nie rejestrowane bezrobocie GUS — nie sumować.
- **Uwaga z audytu (uczciwie, wprost):** audyt wykazał **możliwe pomieszanie tabel Eurostat**: (1) mediany dochodów gospodarstw domowych (ilc_di03) wystają obok wynagrodzeń — ryzyko czytania ich jako "płac"; (2) koszt pracy użyty jako indeks wzrostu (lc_lci_r2_a, 2020=100), podczas gdy wniosek o poziomie kosztów między krajami wymagałby poziomu, nie indeksu. Naprawa trwa (DR-prompt wysłany). Do wyjaśnienia te dwie relacje nie trafiają do kart publicznych jako jeden argument.

### Lekcje

1. **Null to nie zero.** W JSON-stat brak publikacji i zera to różne stany; pomyłka tu fałszuje szeregi niepostrzeżenie. Zasada wpisana w kod, nie tylko w notatkę.
2. **Rejestr źródeł zwrócił się przy audycie.** Log sesji twierdził "Eurostat updated 11-10.2026", a rejestr pokazuje dla ICT 2026-04-17 — ręczna transkrypcja liczb dryfuje. Raport powinien generować się z JSON-ów, nie być przepisywany.

### Status i werdykt (honesty pass)

Analiza własna na danych publicznych (GUS BDL, Eurostat, NBP), przed publikacją repo — repo nieopublikowane w chwili pisania. **Werdykt: częściowo.** Rdzeń (GUS, benchmark stawek, bezrobocie, ICT) broni się i może iść na kartę; całość NIE jest gotowa do publikacji jako referencja, bo: (1) wiszą dwie możliwe pomieszane relacje Eurostat (mediany gospodarstw kontra wynagrodzenia; indeks kontra poziom kosztu pracy) — naprawa trwa; (2) brak requirements/lockfile, ścieżki wyjścia na sztywno, brak README i testów; (3) brak snapshotów odpowiedzi HTTP — rejestr notuje bajty i updated, ale nie treść; powtórka "na dziś" nie jest odtwarzalna wstecz.

### Keywordy (ATS / rekrutera)

API integration · data quality · reproducibility · benchmarking · Data Engineering · REST API · data-driven decision

**Link / demo:** brak na dziś — repo przed publikacją.

---

# HONESTY PASS — rejestr metryk (każda liczba ma źródło)

Case A (wszystkie z `raport.json`, metodyka z FAKTY-METODYKA.md ANALIZA 1):

| Metryka | Wartość | Źródło |
|---|---|---|
| wiersze surowe | 9 554 778 | raport.json - skala.wierszy_surowych |
| wiersze po czyszczeniu | 8 447 898 | raport.json - skala.wierszy_po_czyszczeniu |
| odrzucone | 11,6% (1 106 880) | raport.json - skala.usunietych_procent (arytmetyka sprawdzona w FAKTY) |
| 5 reguł (suma 580 483) | 145 689 / 246 913 / 106 030 / 21 / 81 830 | raport.json - skala.reguly_czyszczenia |
| dziura audytowa | 526 397 | FAKTY-METODYKA.md (obliczone: 1 106 880 minus 580 483) |
| średnia opłata / tip% / dystans / czas | 18,63 USD / 18,9% / 3,31 mi / 15,5 min | raport.json - metryki |
| suma przychodu Q1 | 187 209 628 USD | raport.json - metryki.suma_przychodu |
| h5 | 45 827 kursów, 31,75 USD/kurs, tip 15,1% | raport.json - najlepsze_godziny |
| JFK | 400 409 kursów, 73,09 USD/kurs | raport.json - top_strefy_ilosc / top_stefy_zysk |
| poniedziałek | 23,31 USD/kurs, 1 029 633 kursów | raport.json - dni |
| czwartek | 1 363 151 kursów | raport.json - dni |
| LaGuardia / East Elmhurst | 274 049 @ 51,73 / 35 927 @ 51,02 | raport.json - top_stefy_zysk |
| Midtown Center | 417 171 @ 19,06 | raport.json - top_strefy_ilosc |

Case B (wszystkie z `stan.json` / `rejestr-zrodel.json` / RAPORT-RYNEK-PRACY-2026-11-09.md, metodyka FAKTY ANALIZA 2):

| Metryka | Wartość | Źródło |
|---|---|---|
| endpointy | 9, wszystkie 200, pobrano 2026-11-09 | rejestr-zrodel.json |
| rekordy BDL | po 495 na zmienną (64428, 64429) | bdl-64428/29.json (policzone programowo 09.11) |
| GUS 2025 Polska / Warszawa / Wrocław | 9 371,11 / 11 677,57 / 10 147,90 | stan.json - poziom |
| indeks 2025 Wwa / Wrocław | 124,6 / 108,3 | stan.json - indeks |
| dynamika 2015-2025 | PL plus 125,8%; Wwa plus 108,8%; Wrocław plus 122,1% | FAKTY (obliczone ze stan.json) |
| benchmark | 21 600-24 000 PLN/mies.; 2,30-2,56x GUS; 1,85-2,06x Wwa; 2,13-2,37x Wrocław | stan.json - benchmark |
| bezrobocie 2025 | PL 3,1 / DE 3,8 / CZ 2,8 / UE 6,0 | stan.json - bezrobocie |
| koszt pracy 2025 (2020=100) | PL 167,1 / CZ 124,9 / UE 122,4 / DE 121,7 | stan.json - koszt_pracy |
| ICT 2025 | PL 4,5% (778,8 tys.) / UE 5,0% (10 450,8 tys.) | stan.json - ict_pc / ict_ths |
| mediana 2024 | PL 11 921 EUR = 55,2% UE; PPS 18 064 = 85,0% UE | stan.json - mediana_eur / mediana_pps |
| NBP | EUR 4,3873, effectiveDate 2026-11-09 | stan.json - nbp |
| updated Eurostat | bezrobocie 2026-11-06; koszt 2026-09-16; ICT 2026-04-17; mediana 2026-10-20 | rejestr-zrodel.json |

Nie użyto żadnej liczby, której nie ma w powyższych plikach. Efekty jakościowe (np. "negocjacja ma zaplecze") są wnioskami raportu, oznaczone jako wniosek, nie metryka.

---

# KEYWORDY — pochodzenie (uczciwie)

- **Sprawdzone w profilu** (`Atomic/AI-wiki/projects/Rekrutacja/profil-idealnego-kandydata.md`, v1 z 12.06.2026, sekcja 2 — must-have z częstotliwością w ogłoszeniach): LLM/GenAI w praktyce, automatyzacja/n8n, audyt procesów plus ocena zasadności wdrożeń, translacja biznes-tech, bazy wiedzy/RAG, warsztaty i adopcja, stakeholder mgmt, EN C1, governance/EU AI Act, staż 3-5 lat.
- **Profil NIE zawiera** keywordów: Data Engineering, data quality, DuckDB, API integration, reproducibility. Te cztery-kilkanaście fraz podanych w briefie zadania są zgodne z treścią obu case'ów i idą do kart z briefu, nie z profilu.
- **Z profilu wplecione tam, gdzie case realnie pokrywa:** Case B — "ocena zasadności" (benchmark decyzji o stawce i lokalizacji na danych), "translacja dane-decyzja". Case A — audyt jakości jako praktyka. Nie upychałem LLM/RAG/n8n — case'y ich nie pokrywają, wkładanie by zabiło wiarygodność na rozmowie.
- **Do decyzji Marcina:** oba case'y są data-engineeringowe, a profil celuje w role AI-core (adoption/BA). Jeśli karty mają trafić na stronę pod profil AI-core, keywordy techniczne (DuckDB, API integration) warto zostawić jako drugorzędne, a na pierwszy plan wysunąć "audyt i ocena na danych" — albo dopisać do profilu tor data/analityk.

---

# KOREKTA wg EVAL-DR2 (noc+, v2 — sekcja nadrzędna wobec powyższego)

Źródło: `Atomic/AI-wiki/projects/Agencja AI/research/2026-11-09 — EVAL-DR2-metodyka-dowod.md`. Wersje kart NIE są przepisywane — zmiany punktowe przy publikacji:

1. Case A — pełny, Lekcje: dopisać wprost „wielkość odrzuceń to skala pracy, nie dowód jakości" (DR2 obaliło utożsamienie 11,6% = jakość; karta tego nie twierdzi, ale rozmowa może na to zjechać).
2. Case A — wady (2): do „brak requirements/lockfile" dopisać „brak wersjonowania środowiska (Python/narzędzia)".
3. Case B — wady (3): do „rejestr notuje bajty i updated" dopisać „i BRAK data pobrania jako odrębne zdarzenie od `updated`" (DR2: updated ≠ pobrane) — naprawa manifestu = pole `pobrano` per źródło.
4. Case B — Efekt, bullet „koszt pracy": dopisać jawnie „to indeks wzrostu względem 2020, NIE poziomy kosztów między krajami" (obronne, bo rekruter może pytać).
5. Obie karty: status „repo nieopublikowane" rozszerzyć o „artefakty oznaczone jako deklarowane przez autora przed niepodpisaną weryfikacją kodu" (DR2 rozgraniczał); werdykty bez zmian (A: NIE, B: częściowo).

# RÓŻNICE WERSJÓW I SPÓJNOŚĆ KARTA-PODSTRONA

- Werdykt Case A w obu wariantach: NIE gotowy do publikacji bez poprawek (karta: przez dziurę 526 397; podstrona: pełna lista 3 wad).
- Werdykt Case B w obu wariantach: częściowo (rdzeń OK, całość wstrzymana przez pomieszanie tabel Eurostat, naprawa trwa).
- Metryka wiodąca karty A: 9 554 778 / 8 447 898 / 11,6% plus 526 397 z audytu. Metryka wiodąca karty B: 2,30-2,56x GUS 2025 (9 371,11) plus 9 endpointów / 495 rekordów.
- Karta i podstrona nie używają różnych liczb ani różnych werdyktów.
