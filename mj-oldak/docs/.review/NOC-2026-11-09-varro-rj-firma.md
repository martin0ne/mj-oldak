# NOC 2026-11-09 — varro: czy schemat RJ niesie firmę? TAK — w payloadzie RSC

Werdykt: **schemat niesie firmę — TAK**. Nie w JSON-LD (tam jej realnie nie ma), ale w
payloadzie RSC Next.js osadzonym w tym samym HTML-u listingowym. Zero dodatkowych
requestów — firma da się wziąć z odpowiedzi, które skaner i tak już pobiera.
Dolatka przygotowana NA KOPII (produkcja nietknięta, czeka na TAK Marcina).

## Diagnoza na zapisanym `rj-kat.html` (1.4 MB, kategoria bi-data)

### 1. JSON-LD — firma NIE niesie się (potwierdzone, hipoteza `item.hiringOrganization` martwa)
- `CollectionPage.mainEntity` = `ItemList` z 50 × `ListItem`; unia kluczy ListItem:
  `@type, position, url, name`. **`item` = 0/50** — żadnego JobPosting, żadnego
  `hiringOrganization`.
- W całym HTML: `hiringOrganization` = 0 wystąpień, `JobPosting` = 0, JSON-LD
  `Organization` = 0 (są tylko CollectionPage + BreadcrumbList).
- Meta/OG niosą tylko tytuł kategorii („Praca BI & Data - 376 ofert pracy"), nie firmy.
- `data-*` na kartach: tylko `data-testid`/UI — żadnych danych firmy.

### 2. Payload RSC — firma JEST, w 50/50
- HTML ma 2 chunki `self.__next_f.push([1,"…"])` (Next.js App Router, łącznie ~385 KB
  po dekodowaniu). W środku obiekt `{"offers":[…]}` — 50 pełnych rekordów ofert,
  każdy m.in. z: `slug`, `title`, `body`, **`companyName`**, `city`,
  `companyLogoThumbUrl`, `employmentTypes[]` (from/to/currency/type/unit),
  `workplaceType`, `experienceLevel`, `publishedAt`, `requiredSkills[]`,
  `multilocation[]`.
- **Mapowanie 1:1 po `slug`**: 50/50 slugów z `offers[]` = 50/50 URL-i z JSON-LD.
- `companyName` niepuste: **50/50**, 36 firm unikalnych (Aon ×5, State Street ×3,
  Antal Sp. z o.o. ×3, Castorama Polska Sp. z o.o. ×3, Power Media ×2, …).
- Krzyżowe potwierdzenie z renderowanym HTML: 50 kart z logo, `alt` = nazwa firmy
  („Antal Sp. z o.o.", „Neontri", …). Po dekodowaniu encji (`&amp;`→`&`) zbiory
  nazw flight vs alt = **36/36 identycznych**.

### 3. Slug jako źródło firmy — tylko awaryjny
- `--` występuje w 32/50 slugów, ale prefix przed pierwszym `--` to nie zawsze firma:
  np. `mccormick-company-senior-finance-analyst---commercial-coe-m-f--lodz-bi-data`
  — pierwsze `--` siedzi W TYTULE, prefix dałby śmieć. company („McCormick & Company")
  jest w flight bezbłędnie.
- `ListItem.name` to TYTUŁ oferty (rola), nie firma — jako fallback firmy bezużyteczne
  (tak właśnie skorygowałem propozycję z zadania: fallback = prefix sluga, nie name).

## Dolatka (KOPIA — nie aplikowana)

- Kopia produkcyjnego `sources.py` (sha zgodny z raportem vitriusa: `bc93448e…`):
  `~/.hermes/cache/scratch/varro-rj/sources.py.propozycja` (kompiluje się, py_compile OK).
- Pełny diff: `~/.hermes/cache/scratch/varro-rj/dolatka-firma.diff` (87 linii, 2 hlunki).
- Co robi:
  1. Nowy helper `_rj_flight_companies(html)` → słownik `slug -> companyName`.
     Znajduje chunki `self.__next_f.push([1,"…"])` (escape-aware skan literału),
     dekoduje je `json.loads`, skleja, z locuje `{"offers":[` i czyta tablicę
     `json.JSONDecoder().raw_decode` — pełny JSON-parse, więc `&`, `\u0026`,
     polskie znaki działają prosto z pudełka.
  2. `parse_rocketjobs`: `firma = fmap.get(slug) or (prefix sluga jeśli ma "--" else "")`.
     Rola/URL/data bez zmian (rola dalej z `ListItem.name` — porównanie prod vs
     propozycja: identyczne 50/50).
- Odporność: brak flight / uszkodzony chunk / brak `offers` / brak `companyName`
  → pusty słownik lub `""`, bez wyjątków; fallback łapie, co się da. Mikrotesty
  wszystkie zielone (w tym mini-flight z `Firma & Sp.` — encje i ampersandy OK).
- Uwaga z przebiegu (naprawione w kopii): pierwsza wersja helpera miała
  `except ValueError: continue` zamiast `pass` — pomijało przesunięcie `pos` i
  dawało nieskończoną pętlę na uszkodzonym literale. W kopii już `pass` + komentarz.

## Liczby z testu (zapisane pliki, ZERO requestów zewnętrznych)

`test-firma.py`: produkcja vs propozycja na tym samym `rj-kat.html` + daty z `rj-part0.xml`:

| miara | produkcja (po fixe vitriusa) | propozycja varro |
|---|---|---|
| ofert | 50 | 50 |
| firma niepusta | 0/50 | **50/50** (36 firm) |
| rola niepusta | 50/50 | 50/50 (identyczna lista) |
| data_publikacji z sitemapy | 50/50 | 50/50 |
| URL-e | 50/50 | 50/50 (identyczne) |

Próbki: `Aon | Senior Climate & Catastrophe Risk Analyst`, `PGD RG Motors |
Analityk Administracji Sprzedaży Renault&Dacia (k/m)`, `Sollers Consulting | Data Analyst`.

## Bonus zmierzony w flight (NIE wdrożone — do decyzji Marcina)

Te same rekordy `offers[]` niosą pola, które dziś parser ustawia na pusto:

| pole | wypełnienie (z 50) | uwagi |
|---|---|---|
| `city` | 50/50 | „Kraków", „Warszawa"… |
| `workplaceType` | 50/50 | hybrid 36 / office 8 / remote 6 |
| `experienceLevel` | 50/50 | mid 25 / senior 15 / junior 5 / manager 3 / intern 2 |
| `publishedAt` | 50/50 | absolutny ISO timestamp — pewniejszy niż lastmod z sitemapy |
| `requiredSkills` | 50/50 | listy stringów |
| `employmentTypes` (PLN widełki) | 13/50 | wszystkie 13 z zakresem from–to; reszta null |

Widełki tylko 13/50 — RJ nie pokazuje ich w każdej ofercie; mimo to to jest więcej
niż obecne 0. Skille/tryb/poziom/miasto to pełne 50/50. Jeśli Marcin powie TAK na
firmy, ten sam payload może zasilić resztę pól — dolatka firmy jest napisana tak,
że rozbudowa to kolejne 3-4 przypisania z tego samego słownika `fmap` (trzeba by
jedynie trzymać pełne rekordy, nie tylko companyName).

## Pliki

- Kopia + diff + test: `~/.hermes/cache/scratch/varro-rj/`
  (`sources.py.propozycja`, `sources_prop.py` = bliźniak do importu testowego,
  `dolatka-firma.diff`, `test-firma.py`, `rj-kat.html`, `rj-part0.xml`).
- Produkcja `~/Projects/job-fit-scorer/python/sources.py` i kopia launchdowa
  `~/mjoldak-routines/skan-ofert/sources.py`: **nietknięte** (sha1 obu
  `bc93448e590550c84b7d12f53c939ef74d3a453d`, zgodny ze stanem po vitriusie).
- Commity: brak.

## Audyt sieci

Zero requestów zewnętrznych w całym zadaniu — wszystko na zapisanych plikach
z diagnozy Tacytusa (rj-kat.html 06.11/09.11, rj-part0.xml).

## Samoskan artefaktu

- Emoji: 0
- Cyrylica (U+0400–U+04FF): 0
- CJK (U+2E80–U+9FFF, Hangul): 0
- ASCII-art: 0
