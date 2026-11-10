# DRAFT case study C — AI-engineering: docs-qa (SENECA-2, noc 2026-11-09)

**Status:** DRAFT — kandydat do zatwierdzenia przez Marcina rano. Publikacja external dopiero po zatwierdzeniu. Zero wysyłek w tej sesji.

**Standard:** `EVAL-DR2-metodyka-dowod.md` — dowód AI-engineering = **działający komponent AI + ocena jego zachowania (ewaluacja)**, nie opis technologii; negatywne wyniki pokazane wprost. DR2 werdykt z 09.11: „żadna z dwóch analiz nie wykazuje kompetencji AI engineering — brak działającego komponentu AI + jego ewaluacji"; AI engineering = oddzielny case, nie dopisek do A/B.

**Źródło prawdy liczb:** `~/Documents/docs-qa/reports/hybryda-vs-pojedyncza.md` (raport z realnych embeddingów nomic), `~/Documents/docs-qa/README.md`, `~/Documents/docs-qa/tests/`, git log repo, uruchomienie testów 09.11.2026 w tej sesji. Żadna liczba w tym dokumencie nie pochodzi z pamięci.

**Format:** skille `case-study-builder` (szablon + zasady + honesty pass). Dwa warianty długości: krótki ~120-150 słów pod kartę, pełny pod rozmowę/portfolio. Reguła spójności: karta i podstrona mówią to samo (ta sama metryka, ten sam werdykt).

---

# SELEKCJA KANDYDATA — inspekcja 09.11 (dlaczego docs-qa)

| Kandydat | Działa | Ewaluacja zachowania AI | Werdykt selekcji |
|---|---|---|---|
| **docs-qa** (repo publiczne) | TAK — hybrydowy RAG, realne runy | TAK — pomiar porównawczy na realnych embeddingach + walidacja cytatów w kodzie + test e2e_live jako dowód tezy + ograniczenia wprost | **WYBRANY** — jedyne repo, które łączy działający komponent AI z jawną, zmierzoną ewaluacją jego zachowania; NIE ma jeszcze case'a w portfolio |
| rag-lexical-vs-semantic (publiczne) | TAK — ławka pomiarowa | Częściowo — raport zapisany na dysku jest z trybu MOCK (nagłówek pliku: „wynik NIE oddaje semantyki"); realny przebieg opisany narracyjnie w README, bez zapisanego artefaktu pomiaru | Przodek dowodowy docs-qa; sam nie przechodzi honesty pass na pliku raportu |
| agent-flow (publiczne) | TAK — realny run + trace | TAK — 5/5 testów mock-LLM (provenance, sandbox, pełna pętla) | Mocny, ale JUŻ case 01 w portfolio (framing: przejrzystość agenta) — duplikat, nie nowy dowód |
| kb-rag (publiczne jako skill) | TAK — testy na realnym korpusie | Częściowo — zapytania domenowe + uczciwe NO MATCHES, bez sformalizowanego pomiaru | JUŻ case 02 w portfolio — duplikat |
| email-assistant (prywatne) | Działał (~3,9k LoC) | Audyt service design z JAWNYM negatywnym werdyktem (NIE pilot-ready) — wg DR2 to atut | JUŻ case 05 w portfolio; ewaluacja to audyt governance, nie pomiar zachowania komponentu AI |
| ocr-invoice-reader (prywatne) | TAK (pilot-ready) | BRAK — bez automatycznych testów, bez pomiaru jakości ekstrakcji | Odpada wg DR2: komponent bez ewaluacji zachowania |
| reporting-agent (prywatne) | Przed pilotem | BRAK | Odpada |
| team-agentow (OSNOWA) | Spec + SOUL, brak zapisanych przebiegów | BRAK | Framework bez dowodów przebiegów — odpada |
| zespol-agentow-oss (OSNOWA) | n/d | n/d | Projekt książkowy, publikacja NIE — odpada |

**Decyzja:** case C = **docs-qa**. Linia dowodowa: kb-rag (retrieval leksykalny) -> rag-lexical-vs-semantic (ławka: BM25 vs embeddingi) -> docs-qa (synteza: hybryda + warstwa odpowiedzi + walidacja cytatów + pomiar). Case nie duplikuje żadnego z 6 case'ów portfolio.

---

# CASE C — docs-qa: hybrydowy RAG z walidacją cytatów w kodzie i pomiarem, który pokazuje też słabości hybrydy

> Hak jednowierszowy: pytanie po polsku nad folderem dokumentów -> odpowiedź z cytatami plik:linie walidowanymi w kodzie — hybryda BM25 + lokalne embeddingi (RRF), z pomiarem na realnych embeddingach, który pokazuje gdzie hybryda ratuje pojedyncze metody i gdzie bywa od nich gorsza.

## WARIANT KRÓTKI — karta (cel 120-150 słów)

Role AI wymagają „baz wiedzy / RAG dla agentów", a typowe demo kończy się na „działa". Zbudowałem docs-qa: hybrydowy retrieval (BM25 plus lokalne embeddingi przez LM Studio, fuzja RRF), który odpowiada na pytania o dokumenty cytatami plik:linie walidowanymi w kodzie — nie proszonymi w prompcie; bez ważnego cytatu system mówi wprost „nie znalazłem". Ewaluacja zachowania jest tu pierwszoplanowa: pomiar na realnych embeddingach (9 zapytań exact i parafrazy, korpus 23 chunków) pokazał, że hybryda utrzymuje cel w top-5 we wszystkich 9 zapytaniach, podczas gdy BM25 sam gubi parafrazę bez wspólnych słów, a embeddingi ledwo łapią rzadki token (ranga 5). Raport pokazuje też wprost, gdzie hybryda jest gorsza od BM25 (WIS: ranga 2 wobec 1) — to kupno odporności najgorszego przypadku, nie darmowa wygrana. 47 testów offline przechodzi; awarie degradują się zamiast padać. Repo publiczne.

### Koniec wariantu krótkiego

## WARIANT PEŁNY — portfolio / rozmowa

### Kontekst

- **Dla kogo / gdzie:** własne środowisko; komponent RAG do odpowiadania na pytania naturalnym językiem nad folderem dokumentów. Korpus demo: polskie przepisy podatkowo-księgowe (JPK, KSeF, VAT, ZUS, CIT — 12 plików, 23 chunki), bo twarda terminologia PL jest realnym testem retrievalu.
- **Rola:** solo builder — architektura, kod, ewaluacja, raport pomiarowy.
- **Linia dowodowa:** trzecie repo z serii — kb-rag (retrieval BM25 w skillu) -> rag-lexical-vs-semantic (ławka porównawcza jednej metody na raz) -> docs-qa (produkcyjna synteza z walidacją cytatów i pomiarem hybrydy).
- **Repo:** github.com/martin0ne/docs-qa (publiczne, MIT, czerwiec 2026).

### Problem

Dwa realne tryby awarii retrievalu: (1) pytanie użytkownika nie dzieli słów kluczowych z dokumentem (parafraza — „pismo zmieniające wartość transakcji gdy klient oddał produkt" to faktura korygująca) — BM25 nie ma czego dopasować; (2) rzadki, twardy token (WIS, JPK_V7M) tonie w gęstym klastrze tematycznym — embeddingi rozmywają similarity po całym klastrze. Żadna pojedyncza metoda nie wystarcza. Do tego LLM bez ugruntowania zmyśla: cytat „proszony w prompcie" nie jest gwarancją — musi być sprawdzony mechanicznie.

### Rozwiązanie

1. **Hybrydowy retrieval:** BM25 (pure Python stdlib) plus embeddingi lokalne (nomic-embed-text-v1.5 przez LM Studio — 0 PLN, dane nie opuszczają maszyny), pula kandydatów 4·k, fuzja reciprocal rank fusion (rrf_k=60, parametr kalibrowalny).
2. **Honest RAG — walidacja cytatów w kodzie:** każdy inline cytat `plik:linie` jest sprawdzany względem fragmentów faktycznie podanych do LLM (nie tylko proszony w prompcie). Odpowiedź bez ważnego cytatu -> jawnie „Nie znalazłem odpowiedzi w dokumentach". Cytaty per-twierdzenie, nie zbiorcza sekcja na końcu.
3. **Degradacja awaryjna zamiast crasha:** embeddingi padają -> fallback do BM25 z adnotacją; LLM pada -> tryb `--extractive` (deterministyczny, zero LLM).
4. **Ewaluacja jako komponent:** testy offline na mocku (mechanika, CI) + `test_e2e_live` jako test dowodzący tezy robustness na realnych embeddingach + raport `hybryda-vs-pojedyncza.md` z pełną tabelą rzeczywistych rang „bez cherry-picku".
5. **Gotcha udokumentowany:** nomic wymaga prefiksów `search_document:` / `search_query:` — bez nich jakość retrievalu spada; zapisane w README obu repo (realna pułapka z budowy).

### Stack

Python (pure stdlib, zero zależności) · BM25 · nomic-embed-text-v1.5 lokalnie (LM Studio) · RRF · unittest · ~513 linii w 7 modułach (pomiar wc -l 09.11.2026).

### Efekt

- **Pomiar robustness (realne embeddingi nomic, top-k=5, 9 zapytań: 5 exact + 4 parafrazy):** RRF utrzymuje cel w top-5 we wszystkich 9 zapytaniach — rangi 1,1,1,1,2,1,1,4,1; najgorsza ranga 4.
- **BM25 sam:** 8/9 — parafraza o korekcie faktury wylatuje poza pulę top-5 (brak wspólnych tokenów z dokumentem).
- **Embeddingi sam:** na rzadkim tokenie WIS ranga 5 — graniczna, bo gęsty klaster tematyczny rozmywa similarity; hybryda podnosi do rangi 2.
- **Negatywny wynik wprost (z raportu, nie ukrywany):** hybryda bywa neutralna lub lekko gorsza od lepszej pojedynczej metody — WIS: RRF ranga 2 wobec BM25 ranga 1. Fuzja kupuje odporność najgorszego przypadku, nie wygrane w każdej strefie.
- **Walidacja cytatów:** odpowiedź bez ważnego cytatu -> uczciwe „nie znalazłem"; zachowanie pokryte testami.
- **Testy:** 47 testów offline — OK (3 skipped: wymagają działającego LM Studio); uruchomione w tej sesji 09.11.2026.
- **Koszt i prywatność:** 0 PLN (lokalne embeddingi), dane nie wychodzą z maszyny.

### Lekcje

1. **Ewaluacja to komponent, nie dodatek.** Teza robustness żyje dzięki trzem niezależnym warstwom: raport z pomiaru (realne embeddingi), test live (`test_e2e_live`: parafraza #8 — zysk, rzadki token #5 — brak regresji) i walidacja cytatów w runtime. Mock-mode testuje mechanikę, nie tezę — rozróżnienie wpisane w README i w kod testów.
2. **Fuzja to zarządzanie najgorszym przypadkiem.** RRF nie wygrywa z najlepszą metodą w jej mocnej strefie (WIS: 2 wobec 1), ale usuwa tryb katastrofy (BM25: None na parafrazie). To właściwa rama sprzedażowa hybrydy: „nigdy katastrofa", nie „zawsze najlepszy".
3. **Zakres gwarancji trzeba nazwać.** Walidacja potwierdza, że cytat wskazuje fragment podany do LLM — NIE gwarantuje, że zdanie wokół cytatu jest wierne treści fragmentu. Granica nazwana w README (pełna weryfikacja semantyczna = v1).

### Status i werdykt (honesty pass)

**Werdykt: TAK jako dowód AI-engineering (działający komponent + ewaluacja zachowania) — NIE jako produkt kliencki.** Po stronie dowodu: repo publiczne z kodem, testami i raportem z pomiaru na realnych embeddingach; 47 testów offline przechodzi (zweryfikowane 09.11.2026). Po stronie wad, wprost: (1) brak progu odcięcia — embeddingi zawsze zwracają k kandydatów, więc „nie wiem" opiera się wyłącznie na braku ważnego cytatu w trybie NL; (2) walidacja cytatu nie weryfikuje wierności zdania wobec treści fragmentu (v1); (3) fallback łapie tylko `ConnectionError` — inne wyjątki adaptera LLM nieobsłużone; (4) korpus demo syntetyczny (12 plików) — nie korpus klienta; (5) `examples/sample-answer.md` to run trybu extractive (bez LLM) — brak zapisanego runu trybu NL z realnym LLM; (6) `test_e2e_live` w tej sesji nieuruchomiony (LM Studio nieaktywne — 3 skipped); powtórka live przed publikacją case'a.

### Keywordy (ATS / rekrutera)

**Z profilu idealnego kandydata (sekcja 2):** bazy wiedzy / RAG dla agentów · LLM/GenAI w praktyce · prompt engineering (grounding rules).

**Z standardu DR2 (AI-engineering):** komponent AI · ewaluacja zachowania systemu AI · testy systemów LLM · robustness.

**Techniczne, drugorzędne (z treści case'a, nie z profilu):** hybrid search · RRF · BM25 · embeddings · provenance plik:linie · graceful degradation · Python.

**Link / demo:** https://github.com/martin0ne/docs-qa (publiczne, MIT).

---

# HONESTY PASS — rejestr metryk (każda liczba ma źródło)

| Metryka | Wartość | Źródło |
|---|---|---|
| korpus demo | 12 plików, 23 chunki | `ls corpus/ \| wc -l` + nagłówek raportu `hybryda-vs-pojedyncza.md` |
| zapytania w pomiarze | 9 (5 exact + 4 paraphrase), top-k=5, realne embeddingi nomic | `hybryda-vs-pojedyncza.md`, nagłówek |
| rangi RRF | 1,1,1,1,2,1,1,4,1 — 9/9 w top-5, najgorsza ranga 4 | `hybryda-vs-pojedyncza.md`, kolumna RRF |
| BM25 sam | 8/9; zapytanie #8 (parafraza korekty faktury) = None (poza pulą top-5) | `hybryda-vs-pojedyncza.md`, kolumna BM25 |
| embeddingi sam | 9/9 formalnie w top-5, ale WIS = ranga 5 (graniczna) | `hybryda-vs-pojedyncza.md`, kolumna EMB |
| hybryda gorsza od BM25 | WIS: RRF 2 vs BM25 1 | `hybryda-vs-pojedyncza.md`, wiersz 5 |
| testy | 47 testów, OK, 3 skipped | uruchomienie `EMBED_MOCK=1 python3 -m unittest discover -s tests` w tej sesji 09.11.2026 |
| LoC | ~513 w 7 modułach | `wc -l` 09.11.2026 |
| rrf_k | 60 (parametr kalibrowalny) | README sekcja Ograniczenia |
| model embeddingowy | nomic-embed-text-v1.5 przez LM Studio, 0 PLN | README |
| dowód tezy jako test | `test_e2e_live`: #8 zysk, #5 brak regresji | commit 664971a + `tests/test_e2e_live.py` |
| publikacja repo | czerwiec 2026, MIT | github.com/martin0ne/docs-qa |

**Rozgraniczenie mock vs real (DR2):** raport `docs-qa/reports/hybryda-vs-pojedyncza.md` powstał z REALNYCH embeddingów (nagłówek raportu + commit „tabela portfolio"). Raport siostrzanego repo `rag-lexical-vs-semantic` jest z trybu MOCK — jego liczb NIE używam w tym case'ie; realny przebieg rvs opisany jest tylko narracyjnie w README tamtego repo (luka nr 1 poniżej). Wszystkie liczby efektu w case C pochodzą z raportu docs-qa.

**Czego NIE twierdzę:** brak metryk jakości generacji LLM (wierność odpowiedzi) — walidowana jest tylko obecność i ważność cytatu; brak pomiaru latencji; efekt rekrutacyjny case'a NIEPOTWIERDZONY (DR2: nie obiecywać „to podnosi szansę").

---

# LUKI DO ZAMKNIĘCIA PRZED PUBLIKACJĄ CASE'A

1. **rvs: brak zapisanego raportu z realnego przebiegu.** `rag-lexical-vs-semantic/reports/porownanie-bm25-vs-embeddings.md` jest z trybu MOCK; README opisuje realny run (mocne embeddingi na izolowanych kodach, wygrane BM25 w gęstym klastrze) bez artefaktu pomiaru. Naprawa: uruchomić `compare.py` z realnym LM Studio i zapisać raport — albo w materiałach publicznych polegać wyłącznie na docs-qa.
2. **Brak zapisanego runu trybu NL.** `examples/sample-answer.md` = run extractive. Dograć sample z realnym LLM (tryb domyślny, z walidacją cytatów).
3. **Powtórka `test_e2e_live`.** W tej sesji LM Studio nieaktywne (3 testy skipped). Dowód teży żyje w zapisanym raporcie, ale przed publikacją case'a warto powtórzyć run live i potwierdzić rangi.
4. **Decyzja Marcina:** keywordy techniczne (hybrid search, RRF, ewaluacja) są poza profilem AI-core (adoption/BA) — DR2 zalecał AI-engineering jako oddzielny dowód; do decyzji, czy case C idzie na stronę pod profile AI-core jako drugorzędny, czy wymaga aktualizacji profilu (tor techniczny).

---

# SPÓJNOŚĆ KARTA-PODSTRONA

- Werdykt w obu wariantach: TAK jako dowód AI-engineering (komponent + ewaluacja), NIE jako produkt kliencki (lista wad w pełnym wariancie).
- Metryka wiodąca karty: 9/9 zapytań w top-5 (RRF, realne embeddingi) + walidacja cytatów w kodzie + 47 testów.
- Negatywne wyniki widoczne w obu wariantach: hybryda gorsza od BM25 na WIS (2 wobec 1); BM25 gubi parafrazę; embeddingi graniczne na rzadkim tokenie.
- Karta i podstrona nie używają różnych liczb ani różnych werdyktów.
