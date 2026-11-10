# DZIEŃ 2026-11-10 — plan review (Augustus-3) — partnerski, nie wykład

Wejście (skan, oszczędny): `PRZEGLAD-2026-11-10.md` (15 wierszy, wszystkie SPÓJNE, rekomendacje TAK — czeka na Twoje TAK/NIE/KOREKTA) · `hot.md` tail 40 (stan po nocy) · skan pubs w repo + Atomic: **tylko nazwy, mtimy i frontmatter, bez pełnych tekstów**.

## Status publikacji (fakty ze skanu)
- PL: 35 artykułów w `src/content/articles/` — **15 opublikowanych** (`draft: false`), **20 w kolejce** (`draft: true`).
- EN: 8/8 opublikowanych.
- Ostatni commit contentu: 11-06 15:00 (RSS fix). Od 11-06 nic nowego nie weszło.
- Kolejka 20 draftów = większość to era agencja (AI dla biur rachunkowych / agent-faktury / compliance), kilka nowszych kolumnowych (`trzy-waskie-gardla`, `solar-eu-punk`). „Dokańczamy publikację" kryje więc decyzję strategiczną, nie techniczną.
- Pułapka operacyjna: push = **auto-newsletter** (wysyłka nowych tekstów do odbiorców) + codzienny rebuild (pnews). Publikacja to nie preview — to wysyłka.
- Drobiazg: 12 plików `.review`/`reports` niecommitowanych — wejdą w najbliższy commit repo.

## (1) Kolejność 4 torów — z powodem
1. **Job-hunt: werdykty PRZEGLĄD (rano, pierwszy).** Odblokowuje wszystko: commit `job-fit-scorer`, ręczny start skanera, wysyłkę 8 paczek, pracę wykonawczą zespołu na resztę dnia. Kolejność wewnątrz toru: **paczki → start skanera → commit**. Paczki stoją od 05-06.11 — Lingaro/MMDSmart wprost mogą wygasnąć; to jedyny element dnia, który realnie kurczy się z każdą godziną.
2. **PC run taxi (południe).** Okno fizyczne: pełny run = ręka na PC (Tor A run = ręcznie, wg wiersza 15; SQL walidacji zweryfikuje się dopiero przy nim). Start w południe, bije w tle — masz ręce wolne na werdykt pubs-listy. Nie rano (paczki nie mogą czekać) i nie wieczorem (książka = tryb głęboki, run by Cię wciągnie).
3. **Publikacja artykułów (południe, równolegle z runem).** Werdykt na liście rekomendacyjnej zespołu → `draft: false` na wybranych → push. Decyzja zostaje u Ciebie, bo push = newsletter.
4. **Książka (wieczór).** Tryb głęboki; dzień powinien być domknięty do ~17:00, żeby wieczór nie wciągnął paczek/cronów. Zespół nie dotyka książki bez Twojego tekstu.

## (2) Zespół bez Ciebie vs zostaje u Ciebie
**Zespół (sam, dziś):**
- lista rekomendacyjna 20 draftów (publikuj / odśwież / archiwizuj) ze statusem era,
- korekty kart case studies A/B/C wg EVAL-DR2 (11,6% bez implikacji jakości; fundament B = GUS 64428 + oferty; `updated` ≠ data pobrania),
- domknięcie 4 luk case C (m.in. powtórka `test_e2e_live`),
- pomiar mirroru overpass (kumi) o zdrowej porze — bez mutacji rejestru,
- draft podtoru data do profilu (z Plinius-2) — gotowy pod decyzję,
- propozycja datasetu PREP-WIN (dvdrental/sakila/synthetic) z uzasadnieniem,
- commit lokalny `job-fit-scorer` + `~/bin` po Twoim TAK (push = Twój).

**U Ciebie (external / decyzje):**
- werdykty PRZEGLĄD (15 wierszy, 2 min),
- ręczny start skanera (`~/bin/fetch-oferty.py`),
- wysyłka 8 paczek (klik external),
- push/deploy pubs = newsletter (external),
- pełny run taxi,
- decyzje: tor data vs AI-core, mirror do rejestru, downtime tickera, restart gatewaya,
- run DR stawek (master-1 nie wrócił; master-2 = nowy czat Perplexity).

## (3) Ryzyka (top 3)
1. **Paczki 05-06.11 zwisują 4-5 dni.** Każdy dzień zmniejsza trafność aplikacji; Lingaro/MMDSmart mogą wygasnąć. Wysyłka musi być rano, przed cokolwiek innego.
2. **Push pubs = auto-newsletter.** Publikacja odpali wysyłkę do odbiorców bez drugiego etapu kontroli — lista zespołu przed pushem jest obowiązkowa, nie opcjonalna. Zespół tego nie cofnie.
3. **Kolejka decyzyjna pożera dzień.** 15 wierszy + tor data + mirror + ticker + gateway + pubs-lista = ~7 decyzji. Bez batcha rano (PRZEGLĄD w 2 min) wykonawstwo się nie zacznie, a wieczorem książka straci czas na zaległości.

## (4) Pytania (max 3, z rekomendacją)
1. **20 draftów pubs — co wypuszczamy?** A) tylko nowsze/uniwersalne (~8, lista zespołu dziś), B) pełna fala 20 na żywo, C) archiwizacja era-agencja + pub 3-5 wybranych. → **Rekomendacja A** (era zamknięta 06.08; stare teksty osłabiają kontekst jobowy toru data).
2. **Tor data w profilu — podtor OBOK AI-core?** A) TAK wg Plinius-2 (N=133: CI-CD 32,3%, dashboardy 27,8%; uczciwe zera: DuckDB/Spark), B) zostajemy czyste AI-core, C) decyzja po runie taxi (run jako dowód toru). → **Rekomendacja A** — briefy już pytają o dane; podtor nie kasuje AI-core.
3. **PC run a pubs — równolegle?** A) run bije w tle, Ty w tym czasie werdyktujesz pubs-listę, B) run pierwszy, pubs po zakończeniu, C) pubs rano zamiast równoległości. → **Rekomendacja A** — run nie wymaga patrzenia co sekundę, a okno fizyczne i tak jest przy PC.

## Plan dnia wg bloków
| Blok | Marcin | Zespół |
|---|---|---|
| **Rano 09-12** | PRZEGLĄD 15×TAK/NIE → **wysyłka 8 paczek** → start skanera (ręcznie) → restart gatewaya; dotykaj DECYZJI 81/86/92d tylko jeśli starczy słów | commit lokalny po TAK; pomiar mirroru overpass; **lista rekomendacyjna 20 draftów**; korekty kart wg DR2 |
| **Południe 12-17** | **PC run taxi** (pełny, ręczny, instrukcja+rollback w wierszu 15) → w tle werdykt pubs-listy → `draft: false` → **push** | montaż finalny kart A/B/C; domknięcie 4 luk case C; draft podtoru data; propozycja PREP-WIN datasetu |
| **Wieczór 17+** | **książka** — pisanie/redagowanie, tryb głęboki | nocna zmiana: eval dnia, prep follow-upów 13.11 (9 paczek) |

## Werdykt
**DO DOSTROJENIA (2)** — plan jest spójny z danymi nocnymi (follow-upy faktycznie wycięte: triggery 13/16/24.11; PC run ręczny zgodnie z wierszem 15; pubs ma realną kolejkę), ale:
1. „Job-hunt" trzeba rozłożyć na kolejność werdykty→paczki→skaner — inaczej paczki (najbardziej czasowe) zlecą na koniec dnia.
2. „Dokańczamy publikację" to nie zadanie techniczne — ukryta decyzja strategiczna o 20 draftach (większość z zamkniętej ery) + ryzyko auto-newslettera przy push.

*(Zero external; skan ograniczony do nazw, mtimów i frontmatter.)*
