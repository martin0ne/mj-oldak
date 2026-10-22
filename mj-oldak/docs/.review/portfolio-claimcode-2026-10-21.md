# Portfolio -- audyt claim-code i linków

**Data:** 2026-10-21
**Zrodlo:** src/pages/portfolio/index.astro
**Wyjscie:** dist/portfolio/index.html (27 411 B; zbudowano przez Astro v7 po stripowaniu iCloud xattr na katalogu public/)
**Cel:** Niezalezny audyt spójnosci twierdzen ↔ dowodów, statusów, PDF-ów, placeholderów, stopki, licznika GitHub.

---

## (a) Tabela Co twierdze / gdzie udowodnic

```
[1] Pisze agenci AI                       | github.com/martin0ne              | live
[2] Znam RAG / BM25 / embeddingi          | github.com/martin0ne/rag-lexical-vs-semantic  | live
[3] Dzialam z danymi publicznymi           | /artykuly/co-dane-mowia-o-adopcji-ai-polska-vs-ue/  | live
[4] Rozumiem RODO / compliance            | demo.mjoldak.pl                  | live
[5] Buduje workflow orchestration         | github.com/martin0ne              | live
```

Wszystkie 5 wierszy wyliczone automatycznie z `<tbody>` dist HTML (python re).

---

## (b) Curl zewnętrznych hrefów (-L -A Mozilla)

| URL                                           | HTTP | Uwagi                    |
|-----------------------------------------------|------|--------------------------|
| https://github.com/martin0ne                   | 200  | OK                      |
| https://demo.mjoldak.pl                        | 200  | OK                      |
| https://www.mjoldak.pl/portfolio/              | 200  | canonical               |

---

## (c) Uczciwosc statusów

### Kluczowe ustalenia

* Artefakt 01 (Agent Mission Control): `url: https://demo.mjoldak.pl` -- curl = **200**. STATUS match: YES.
* Artefakt 06 (6 Public Repos): `url: https://github.com/martin0ne` -- curl = **200**. STATUS match: YES.
* Artefakt 02 (OCR Invoice Reader): `url: https://github.com/martin0ne/mjo-ocr-invoice-reader` -- curl = **404**. STATUS = live, ale repo nie istnieje. **SPORNE.**
* Artefakt 03 (Email Classifier): `url: https://github.com/martin0ne/mjo-email-assistant` -- curl = **404**. STATUS = live, ale repo nie istnieje. **SPORNE.**
* Artefakt 04 (Reporting Agent): `url: https://github.com/martin0ne/mjo-reporting-agent` -- curl = **404**. STATUS = live, ale repo nie istnieje. **SPORNE.**

Rowy claim-code table: wszystkie 5 hrefów zewnetrznych = 200. Status live uzasadniony. Wewnetrzny `/artykuly/...` = 200 (localhost).

**Uwaga do Art. 05 (Raport GUS x Eurostat):** url = `/reports/ai_adoption_report.pdf`. Na dist HTML ten plik jest obecny (287 937 B, valid %PDF), ale odwoanie wystepuje w sekcji Raporty (dwukrotnie -- jako art. 05 i jako link w bloku raportow think-tank). Link poprawny.

---

## (d) Placeholder-y i slowa robocze

Grep na dist HTML wg wzorca `(wymaga potwierdzenia|TODO|FIXME|placeholder|roboczy|w przygotowaniu)` -- **zero trafien**. 0/0/0. PASS.

---

## (e) PDF-y w sekcji Raporty

| Path                                      | localhost:8090 | Content-Type        | Valid PDF? |
|-------------------------------------------|---------------|---------------------|------------|
| /reports/ai_adoption_report.pdf           | 200           | application/pdf     | TAK        |
| /reports/raport-analityczny-stack-ai-pl.pdf | 200         | application/pdf     | TAK        |
| /reports/broszura-msp.pdf                 | 200           | application/pdf     | TAK        |

Wszystkie 3 linki PDF sa spójne: istnieja na dysku, sa prawdziwymi plikami PDF, serwer odpowie 200 z correct content-type.

---

## (f) Stopka -- sklejone stringi

Szukano wzorców `biuro@mjoldak.plgithub`, `mjoldak.plContact` na dist HTML. **Zero trafien.** PASS.

---

## (g) Licznik publicznych repo GitHub

API: `https://api.github.com/users/martin0ne/repos?type=owner&per_page=100`

```
Total returned: 9
Forked: 0
Non-fork (own): 9
```

Repoza non-fork:
1. agent-flow (Python)
2. ai-ba-decision-frameworks (None)
3. ai-bez-strachu (HTML)
4. analytics-stack-pl (HTML)
5. claude-skills (Python)
6. daily-tools (Python)
7. docs-qa (Python)
8. mj-oldak (Astro)
9. rag-lexical-vs-semantic (Python)

Art. 06 twierdzi "6 Public Repos". Rzeczywistosc API = **9**.
Licznik na stronie jest zanizony o 3 repoza. **SPORNE** -- liczba sie rozchodzi, ale link `github.com/martin0ne` prowadzacy do listy wszystkich repo jest poprawny i 200.

---

## Testy podsumowujace

| Nr | Test                           | Metoda                                     | Wynik             | PASS/FAIL |
|----|--------------------------------|--------------------------------------------|-------------------|-----------|
| T1 | Tabela claim-code -- wyciagniecie kregich danych | python re po dist tbody               | 5 wierszy         | PASS      |
| T2 | curl -L -A Mozilla (github.com/martin0ne) | external curl                          | 200               | PASS      |
| T3 | curl -L -A Mozilla (demo.mjoldak.pl)       | external curl                          | 200               | PASS      |
| T4 | curl -L -A Mozilla (art. 02 mjo-ocr)       | external curl                          | 404               | FAIL      |
| T5 | curl -L -A Mozilla (art. 03 mjo-email)     | external curl                          | 404               | FAIL      |
| T6 | curl -L -A Mozilla (art. 04 mjo-reporting) | external curl                          | 404               | FAIL      |
| T7 | curl -L -A Mozilla (rag-lexical-vs-semantic)| external curl                         | 200               | PASS      |
| T8 | Internal article /artykuly/...              | localhost:8090 curl                    | 200               | PASS      |
| T9 | Statusy claim-code -- czy livedowadzona | porownanie href 200 z status="live"    | 5/5 live=true     | PASS      |
| T10| Art. 01 link -> live demo                | curl demo.mjoldak.pl = 200             | live confirmed    | PASS      |
| T11| Art. 02, 03, 04 link -> live reality       | curl = 404                             | status LIVE false | FAIL      |
| T12| Placeholder y (TODO/FIXME/etc.)            | python re grep dist HTML               | 0 trafien         | PASS      |
| T13| PDF 1: ai_adoption_report.pdf             | localhost:8090 + valid %PDF           | 200, app/pdf      | PASS      |
| T14| PDF 2: raport-analityczny-stack-ai-pl.pdf | localhost:8090 + valid %PDF           | 200, app/pdf      | PASS      |
| T15| PDF 3: broszura-msp.pdf                   | localhost:8090 + valid %PDF           | 200, app/pdf      | PASS      |
| T16| Stopka -- sklejone stringi               | regex biuro@mjoldak.plgithub          | 0 trafien         | PASS      |
| T17| Stopka -- sklejone stringi               | regex mjoldak.plContact               | 0 trafien         | PASS      |
| T18| Licznik 9 GitHub repos (non-fork)        | api.github.com GET /repos             | 9/9 true          | PASS      |
| T19| Art. 06 "6 Public Repos" vs API=9        | porownanie claim 6 vs real 9          | claim < real      | SPORENE   |
| T20| Canonical + og:url spójne                  | meta tags w dist HTML                 | og:url = canonical| PASS      |
| T21| GA4 config present                         | script tag G-VRBCTJ6RNB              | found             | INFO      |

---

## Werdykt

| Kategoria | Wartosc |
|-----------|---------|
| SPORNE    | Art. 02, 03, 04 (linki GitHub -> 404, status na stronie "live") |
| DO DOSTROJENIA | Art. 06 "6 Public Repos" -> API zwraca 9 (licznik zanizony) |
| FAIL      | 3 testy (T4, T5, T6 -- art. 02/03/04 brakujace repoza); T11 (status live nieprawdziwy dla 3 art.) |

### Szczegolowy komentarz

1. **Art. 02, 03, 04**: Trzy z szesciu kart artefaktów powozuja na repoza GitHub, ktore nie istniejaja (curl = 404). Status "live" jest bezpodstawny dla tych trzech konkretnych kart. Należy albo usunac te pozycje ze strony, albo stworzyc repoza przed publikacja. To jest najwazniejszy problem tej wersji portfolio.

2. **Art. 06 "6 Public Repos"**: Strona twierdzi 6 repo, GitHub API zwraca 9 (dzisiaj, zero forkow). Twierdzenie nie jest "fake" (wszystkie 9 rzeczywiscie istnieja, link do profilu dziala), ale jest niepelne/zanizone. Minimalna poprawka = zmienic tekst z "6" na "9".

3. **Reszta strony**: Stabilna. Wszystkie external linki 200, PDF-y spójne, zerowe placeholder-y, stopka czysta, internal article URL dziala.
