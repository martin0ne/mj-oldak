# DZIEŃ 2026-11-10 — krytyka planu dnia (CATO-3)

Mandat: Marcin zlecił wprost — zespół sprawdza plan. Źródła (3): `hot.md` (stan nocny 10.11), `PRZEGLAD-2026-11-10.md` (15 wierszy, **kolumna werdyktów PUSTA**), `STATUS.md` §09.11. Zero external.

## Plan (jego słowa) → tory
1. Follow-upy — WYCIĘTE z dnia (13.11 fu9 · 16.11 fu4 · 24.11 Antal/Ness)
2. Job-hunt aktywny
3. Dokańczenie publikacji artykułów
4. PC z Windowsem = kombajn do analizy danych
5. Książka (pisanie/redagowanie)

## Krytyka per tor

| # | Tor | Konflikt (A) | Zaległość (B) | Rekomendacja kolejności | Zespół execuje | Zostaje u Marcina |
|---|---|---|---|---|---|---|
| 1 | Follow-upy | Żadnego realnego — terminy 13/16/24.11, wycięcie SŁUSZNE. **Pułapka słowna:** 8 paczek gotowych-NIEwysłanych to NIE follow-upy — nie wolno ich wyciąć pod ten parasol (Lingaro, MMDSmart wygaszają) | 6 paczek do kliku dziś (Optiveum, MMDSmart, Antheap, Digital Forms, Capco, Lingaro); Antal/Ness = 24.11 zgodnie z planem | Rano jako pierwsze, ~15 min kliku | nic — external | wysyłki ×6 (klik) |
| 2 | Job-hunt aktywny | Skaner naprawiony, ale **start = ręczny po TAK**. Bez startu „aktywny job-hunt" pracuje na skanie 09.11 (166 scraped → 1 hit) | Commit `job-fit-scorer` nieodbyty (15 wierszy bez werdyktu); dolatka RJ 0→50 nieaplikowana (firmy RJ puste w 100% ofert); start `fetch-oferty.py` ręczny | Rano: werdykty (2 min) → commit + dolatka → start skanera → **dopiero wtedy** praca z ofertami | commit, aplikacja dolatki RJ, smoke-test skanera | 15 werdyktów TAK/NIE, start skanera (klik), mirror overpass — decyzja |
| 3 | Artykuły | **Bramka publikacji = Marcin** (klik external, wiersze 8 i 12: TAK jako DRAFT). Przed publikacją: korekty wg EVAL-DR2 + 4 luki case C. Publikacja case studies data-quality wyciąga decyzję **tor data** — bez niej nie wiadomo, pod jaki profil je przypiąć | Korekty wiersza 8 (11,6% bez implikacji jakości; fundament B = GUS 64428 + oferty); 4 luki case C (m.in. powtórka test_e2e_live); DR master-1 (stawki) czeka na run Perplexity — wg PRZEGLĄD najpierw master-2, jeśli portfolio > stawki | Przedpołudnie: zespół zamyka korekty+luki. Popołudnie: Marcin — decyzja tor data → redakcja → klik | korekty A/B wg EVAL-DR2, 4 luki case C, samoskan artefaktów | decyzja tor data, run DR master-1 (Perplexity), final read, klik publikacji |
| 4 | PC kombajn | „Przygotowanie" ≠ zrobione: **pierwszy pełny run taxi = ręcznie, Marcin przy PC**; SQL walidacji zweryfikuje się dopiero przy runie; dataset PREP-WIN niewybrany (dvdrental/sakila/synthetic); Jupyter na PC nieodpalany | Pozycje 3-5 listy napraw niezrobione (requirements/lockfile, snapshot danych parquet+pin, replay-check jednym poleceniem) | Decyzja dataset (1 min) → start runu → **run idzie sam = pasywne okno** na resztę dnia | pozycje 3-5 napraw na PC (po TAK), monitoring runu | decyzja dataset, odpalenie runu, weryfikacja exit-0 + liczb (526 397) |
| 5 | Książka | **Drugi tor treści w dniu** — kolizja z torem 3. „Książka" niesprecyzowana (4 projekty: ksiazka-ktorej-nie-ma, kultura-europejska, edukacja-kultury, dba-knowledge) → ryzyko dwóch półtorów | 0/5 sekcji wizji w tygodniu (weekly A); obok wisi trzeci tor treści: 3 odcinki kanału w produkcji / 0 opublikowanych | Pasywne okno runu taxi: redagowanie. Wieczór: JEDEN projekt, blok 60-90 min. Priorytet toru treści dziś: artykuły > książka (bliżej bramki) | research/destylaty do `wiedza/` | pisanie/redagowanie — głos nie do delegacji |

## C — spadło z radaru planu
1. **DECYZJE karty 3-5: 81-92d overdue** — TOP 3 (1) z 09.11, 0 decyzji w tygodniu, 4 bramki >80d. Plan bez slotu. Minimum: jedna karta dziś (15-20 min) albo świadomy zapis „jutro" — nie milczenie.
2. **Pytanie tor data** (poz. 14) — otwarte, a blokuje trzy tory naraz: profil idealnego kandydata, przypięcie case studies, kształt kolejnych paczek. Paczki wysłane dziś = ostatnie wg profilu v1 (12.06 — AI-core, zero DuckDB/data-quality w keywordach).
3. **Restart gatewaya po hermes update** — 30 s, klik; bez niego środowisko delegacji może paść w środku dnia zespołu.
4. **Zdrowie infrastruktury:** zrodla-probierz 07:30 nie zaliczony (Mac spał 03:42→09:51 — pierwszy bieg po łatce przepadł) → rerun ręczny + decyzja o godzinach vs burst; materialize-atomic 35d przeterminowane; dysk 17 GB wolne (trend spadkowy); ai-pulse stale 46d; mac-cleanup 4,5d/32d.
5. **Downtime tickera** (03:42→09:51) — decyzja (akceptacja burst vs przesunięcie godzin) niepodjęta.

## D — rozkład energii
- **Rano (start z burstu po 09:51):** decyzje i kliki — werdykty 2 min, 6 wysyłek, gateway, decyzja dataset, start skanera. Krótkie, wysoka gęstość decyzyjna — przy świeżej głowie.
- **Przedpołudnie:** Marcin przy PC — start pełnego runu taxi. Run idzie sam → pasywne okno.
- **W oknie runu:** zespół: korekty artykułów wg EVAL, luki case C, naprawy PC 3-5. Marcin: redagowanie książki (lekkie, przenośne — nie pisanie od zera).
- **Popołudnie:** decyzja tor data + redakcja finalna artykułów + klik publikacji. Artykuły wygrywają z książką — bliżej bramki.
- **Wieczór:** książka, JEDEN projekt, 60-90 min.
- Zasada: **jeden tor treści dziennie**. Dziś artykuły; książka dostaje okno pasywne + wieczór. Nigdy oba „na głównym".

## Werdykt
**WERDYKT: DO DOSTROJENIA (N)**

Plan jest dobry w warstwie wycięć (follow-upy) i priorytetów (job-hunt #1), ale zakłada gotowości, których nie ma: 15 werdyktów niepadłych (blokują 3 z 5 torów), run taxi ręczny, dataset niewybrany, korekty EVAL nieaplikowane. I wycina „follow-upy" razem z 8 wygaszającymi wysyłkami, które są osobnym, pilnym klikiem.

---
Samoskan: liczby przeniesione 1:1 ze źródeł (526 397 · 11,6% · 166→1 · 0→50 · 81-92d · 03:42→09:51 · 17 GB · 35d) — zero innowacji faktów; zero external. test -f: wykonany w meldunku. Wiersz 8 PRZEGLĄD = case studies A/B, wiersz 12 = case C, wiersz 15 = naprawy taxi, poz. 14 = tor data — mapowanie wierszy zgodne z PRZEGLĄD.
