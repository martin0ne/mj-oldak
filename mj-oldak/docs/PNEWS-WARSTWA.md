# PNEWS — warstwa newsów PL na tle EU / świata (spec, 14.10)

> Zadanie na **czw 15.10**: domknąć warstwę newsów na mjoldak.pl.
> Nazwy: **Pnews** (moj: `pnews.pl` / `pnews.dev` / `pnews.ai` — WOLNE) lub **Pi-news**
> (`pinews.pl` — wolny). Na stronie: sekcja/podstrona `/pnews/`, NIE homepage.
> Reguła stron: **build-time RSS** (mamy `rss-parser`), zero zewnętrznego runtime'u.

## 1. Czym jest Pnews (teza)

**Polski akcent jest domyślny.** Każdy news ma cztery soczewki: **AI · GEO · EU · WORLD** —
ale w każdej kolejności czytelnik dostaje najpierw: *co to znaczy dla Polski* (1–2 zdania),
dopiero potem kontekst unijny/światowy. To odwrócenie standardowego agrega­toru (tam Polska
= jeden tag na końcu). Nasz rynek: Polak, który chce wiedzieć, co się dzieje, bez
przekopywania EN.

## 2. Struktura (podstrona /pnews/)

- **4 zakładki soczewek:** AI · GEO (geopolityka) · EU · WORLD — zakładka = filtr, nie osobna strona.
- **Kolumny kafla:** (1) TYTUŁ (2) **POLSKI AKCENT** (1–2 zdania, agent-draft, przegląd Marcina
  przed publikacją — albo badge „auto" jeśli zdecydujemy inaczej) (3) źródło + data (4) link.
- **Pasmo „Polska w tle"** u góry każdej zakładki: 3 newsy **z polskich źródeł**, które
  wpisują się w soczewkę (np. AI: polski sektor, regulacje AI Act w PL).
- **Jeden licznik na górze:** „ostatnia aktualizacja: <data buildu>" — bez animate-pulse.

## 3. Źródła (RSS — do weryfikacji żywo przed pierwszym buildem)

| Soczewka | PL (polski akcent) | EU | Świat |
|---|---|---|---|
| AI | spidersweb.pl · benchmark.pl · (PAP tech) | eur-act.com (RSS) · euaiact? do sprawdzenia | The Verge AI · TechCrunch AI · arXiv cs.AI tylko jako „przegląd", nie news |
| GEO | biznesalert.pl · money.pl (geo/biznes) | — | ISW (daily map) · Reuters? (sprawdzić paywall) · DW |
| EU | PAP (pap.pl RSS) · businessinsider.pl | EUR-Lex RSS · europarl press | Politico EU · Euronews PL edition? |
| WORLD | tvn24? (sprawdzić RSS/ToS) · money.pl | — | AP RSS · BBC RSS · DW RSS |

**Legalność PL:** headline + źródło + link + krótkie streszczenie (news-agency style) =
zwykła agregacja; **bez pełnych tekstów**. Sprawdzić ToS każdego źródła (PAP: warunki
redystrybucji). Odrzucić: źródła bez RSS = scrapowanie (ryzyko) → najpierw sam RSS.

## 4. Pipeline (jak codziennie)

1. **Build (rano, automat):** pobranie ~15–20 feedów, odfiltrowanie duplikatów (tytuł
   ~80% match), przypisanie do soczewki (1 feed = 1–2 soczewki), policzenie „polskiego
   akcentu" — **draft** jednym agentem (tani model, ling-fin), 1 zdanie PL, NIE publikowane
   bez przeglądu.
2. **Przegląd Marcina (klik):** lista draftów w Hermesie — akceptuj/odrzuć/edytuj; publikacja
   = push (jak dotychczas).
3. **Cron site-scan (9:10)** pilnuje, czy /pnews/ jest żywy.

**Pytanie do jutra (Marcin):** polski akcent = przegląd Marcina przed publikacją (zgodne
z „bramka ludzka przed kanonem") — czy badge „wygenerowane, do sprawdzenia" i publikacja
od razu? Moja rekomendacja: **przegląd**, póki jest 1 strona do kliknięcia.

## 4b. ANTY-SLOP: projekt pnews (decyzja16.10 — „jak zaprojektować by nie było slopu")

Zasada: **slop może wejść TYLKO jednym otworem — polski akcent (1–2 zdania, agent-draft).
Reszta kafle to dane strukturalne, nie proza** — brak prozy = brak slopu z definicji.

1. **Kafel = tytuł (cudzy) + źródło + data + link + badge soczewki.** ZERO własnych słów
   poza akcentem. Tytuł cytujemy w całości jak agencja (news-agency style, §3) — nie
   przerabiamy, nie „ubogacamy".
2. **Pasmo „Polska w tle" = tylko źródła PL, bez komentarza** — lista, nie ocena.
3. **Akcent przechodzi DWIE bramki po kolei, brak wyjątków:**
   (a) `python3 scripts/writer-gate.py` na draqcie (exit1 = **nie publikujemy**);
   (b) przegląd Marcina (decyzja15.10: przegląd, nie badge „auto").
   Wygenerowane bez (a)+(b) = nie istnieje dla czytelnika — technicznie: `draft: true`,
   wersja z akcentem nie wchodzi do buildu.
4. **Kontrakt akcentu (nie „prompty się uczą", tylko forma zmusza):** max2 zdania,
   **pierwsze zdanie = konsekwencja dla Polski z konkretem** (nazwa ustawy, kwota,
   instytucja, termin), drugie — kontekst. Zakazane słowa (writer-gate i tak je łapie,
   ale nie wchodźmy w to): „dynamiczny świat", „przełom", „rewolucja", „w dzisiejszych
   czasach", „warto zauważyć". **Bez liczby/bez nazwy = nie ma drugiego zdania.**
5. **Bez liczników „hot", bez animate-pulse, bez „TOP10 dnia"** — pnews pokazuje strumień
   z datą, nie ranking (ranking = pokusa clickbaitu).
6. **Metryka jakości tygodniowo:** ile akcentów przeszło gate za pierwszym razem
   (jeśli <80% — prompt/formuła do zmiany, nie „jeszcze raz to samo").

1. `/pnews/` jako podstrona Astro (zakładki AI/GEO/EU/WORLD, build-time RSS).
2. 12–15 feedów **sprawdzonych żywo** (skrypt `scripts/check-feeds.sh`: curl → czy RSS,
   czy żyje, czy nie paywall).
3. Kafle: tytuł + źródło + data + link + badge soczewki; **bez polskiego akcentu w MVP**
   (kolumna pusta, bo wymaga przeglądu — albo draft z badge, decyzja wyżej).
4. Pasmo „Polska w tle" = źródła PL w tabeli.
5. Brak liczb bez źródeł; brak animate-pulse; Newsreader × Geist; canvas #FBFBFA; zero emoji.

## 6. Otwarte

- Nazwa: **Pnews** vs **Pi-news** (domyślne: Pnews — prostsze, `pnews.pl` wolny).
- Polski akcent: przegląd vs auto-badge (decyzja wyżej).
- Osobna domena? Na razie SEKCJA na mjoldak.pl; domenę zarezerwować **przed** decyzją
  o osobnym serwisie (rezerwacja = ~10 zł/rok, bez zobowiązania).
