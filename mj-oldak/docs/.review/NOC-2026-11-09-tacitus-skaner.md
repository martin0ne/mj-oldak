# NOC 2026-11-09 — tacitus: diagnoza skanera (rocketjobs + pracapl = 0)

Skaner: `~/bin/fetch-oferty.py` → launcher na `~/Projects/job-fit-scorer/python/aggregator.py`;
kod źródeł w `~/Projects/job-fit-scorer/python/sources.py` (kopia launchdowa `~/mjoldak-routines/skan-ofert/sources.py`, ten sam plik). `fetch-oferty-legacy.py` nie dotyczy (stare JJI/NFJ, nie ma tu rocketjobs/pracapl).

## Diagnoza z logów (przed requestami)

Dzienny log `skan-ofert/logs/2026-11-09_11-28-47.log`:
`per źródło: {'solidjobs': 67, 'jobicy': 88, 'himalayas': 60, 'greenhouse': 111, 'lever': 1, 'pracuj-alert': 12, 'linkedin-alert': 27}; errors: brak`

- rocketjobs i pracapl **wcale nie występują** w słowniku (nie „0" — brak klucza), a `errors: brak` i zero `[WARN]`.
- Wniosek wstępny: fetch zwraca 200 bez wyjątku, parser dostaje HTML, w którym jego wzorce nie pasują → **ciche 0**, nie bot-wall.
- W całym oknie logów (63 pliki) żadne z dwóch źródeł nie dało nigdy >0 ofert — awaria starsza niż okno logów.

## Requesty na żywo (kulturalnie: 2 × rocketjobs, 2 × praca.pl, UA = ten co produkcja)

| # | URL | wynik |
|---|-----|-------|
| rj 1 | `…/wszystkie-lokalizacje/bi-data` | 200, 1.4 MB, realna strona („376 ofert pracy"), 2 × ld+json, **CollectionPage jest, `hasPart` = 0** |
| rj 2 | `sitemaps/active-jobs.xml` → `part0.xml` | 200, index → 1 part; part0: **14 734** wpisów `<url><loc><lastmod>`, ścieżka `/oferta-pracy/` |
| pp 1 | `www.praca.pl/oferty-pracy.html` | 200, 590 KB, realna strona; `listing__title` = **0**, `listing-v2__*` = 52 karty |
| pp 2 | skonstruowany URL karty multi-region | 404 → rezygnacja z konstruowania URL-i (patrz niżej) |

**Verdict per źródło: nie bot-wall (żadnych 403/429/Cloudflare-challenge), nie pusta lista z serwera — zmiana struktury HTML/JSON-LD.**

## Root cause

### rocketjobs — zmiana schematu JSON-LD
Strona listingowa nadal serwuje `<script type="application/ld+json">` z `CollectionPage` — **stary regex `_RJ_LDJSON` dalej matchuje, JSON dalej się dekoduje** — ale w środku:
- BYŁO: `hasPart: [{url}, …]` → `parse_rocketjobs` bierze `block.get("hasPart")` → **teraz None → 0 ofert, cicho**.
- JEST: `mainEntity: {ItemList { itemListElement: [ListItem {position, url, name}] }}` (standard schema.org), 50 pozycji/kategorię.
- Bonus: `ListItem.name` = pełny tytuł oferty (lepszy niż rekonstrukcja ze sluga); slugi nie mają już separatorego `--`, więc stary `_rocketjobs_slug_to_fields` nie wyciągnie firmy → firma = `""`.
- Sitemap dat: index zwraca 1 part, part0 (redirect 307 na `public.justjoin.com` — urllib podąży sam; RJ to backend JustJoin) ma format `<url><loc><lastmod>` bez zmian i URL-e pasują do JSON-LD jako klucze → `data_publikacji` działa bez zmian kodu (test: 50/50 z datą).

### pracapl (praca.pl) — redesign layoutu listing-v2
- Klasy kart `listing__*` → **`listing-v2__*`**; `_PRACAPL_TITLE` (`<a class="listing__title…">`) → 0 trafień → 0 ofert, cicho.
- Nowa karta: `<li class="listing-v2__item" data-ad-id=… data-ad-title=…>` z:
  - tytuł+URL: `<a class="listing-v2__title" href="https://www.praca.pl/{slug}_{id}.html">`
  - firma: `<a class="listing-v2__employer">…` (fallback: `listing-v2__logo-image` alt „Praca X")
  - tryb: `<li class="listing-v2__tag--mode"><span class="listing-v2__tag-text">Zdalna|Hybrydowa|Stacjonarna|Mobilna</span>`
  - pensja: `<span class="listing-v2__tag-text">6 000 - 7 500 zł brutto/mies.</span>` (stary wzorzec wymagał „zł</span> brutto" — teraz „zł brutto/mies." wewnątrz spana; są też stawki godzinowe „69,00 zł brutto/godz." → filtr wymaga `/mies`)
  - data: `<span class="listing-v2__published">N dni temu</span>` (tylko część kart; „Wygasa za N dni" trzeba pominąć → kotwica na `__published`)
- Paginacja bez zmian: `oferty-pracy_2.html`… istnieją.
- Ograniczenie: **karty multi-region (14/52 na str. 1)** mają tytuł jako `<button class="listing-v2__title--toggle">` i linki per-region dopiero w JS — URL-a nie da się wziąć z HTML, a konstruowany `slug_id.html` daje 404 (sprawdzone). Te karty są pomijane; to wyłącznie limit danych, nie playwright (nic nie wymaga JS).

## Proponowany diff (do `sources.py` — NIE aplikowany, produkcja nietknięta)

```diff
--- a/python/sources.py
+++ b/python/sources.py
@@ -372,7 +372,8 @@
-_RJ_LDJSON = re.compile(r'<script type="application/ld\+json">(\{.*?"@type":"CollectionPage".*?\})</script>', re.S)
+_RJ_LDJSON = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.S)
+# 09.11.2026: RJ przeniósł oferty z hasPart[] do mainEntity.itemListElement[] (ListItem ma url+name);
+# nowy regex bierze cały blok i filtruje po @type — odporny na kolejność/atrybuty.

@@ -417,15 +418,22 @@
 def parse_rocketjobs(data):
     pages, dates = data.get("pages") or [], data.get("dates") or {}
     seen, offers = set(), []
     for html in pages:
-        m = _RJ_LDJSON.search(html)
-        if not m:
-            continue
-        try:
-            block = json.loads(m.group(1))
-        except (ValueError, TypeError):
-            continue
-        for part in block.get("hasPart") or []:
-            url = (part or {}).get("url") or ""
+        for m in _RJ_LDJSON.finditer(html):
+            try:
+                block = json.loads(m.group(1))
+            except (ValueError, TypeError):
+                continue
+            if not isinstance(block, dict) or block.get("@type") != "CollectionPage":
+                continue
+            me = block.get("mainEntity") or {}
+            for part in me.get("itemListElement") or []:
+                url = (part or {}).get("url") or ""
                 if not url or url in seen:
                     continue
                 seen.add(url)
-                company, rola = _rocketjobs_slug_to_fields(url)
+                _, slug_rola = _rocketjobs_slug_to_fields(url)
                 offers.append({
-                    "zrodlo": "rocketjobs", "firma": company, "rola": rola, "url": url,
+                    # 09.11.2026: ListItem nie niesie firmy, slug nie ma juz "--" -> firma pusta
+                    "zrodlo": "rocketjobs", "firma": "",
+                    "rola": (part or {}).get("name") or slug_rola, "url": url,
                     "widelki_od": None, "widelki_do": None, "umowa": "", "tryb": "",
                     "poziom": "", "skille": [], "data_publikacji": dates.get(url, ""),
                 })
     return offers

@@ -456,10 +462,20 @@  # pracapl: nowe selektory listing-v2 (redesign 09.11.2026)
-_PRACAPL_TITLE = re.compile(r'<a class="listing__title[^"]*" href="([^"]+)"[^>]*>\s*(?:<span>)?([^<]+)')
-_PRACAPL_LOGO_ALT = re.compile(r'<img class="listing__logo"[^>]*alt="([^"]*)"')
-_PRACAPL_SALARY = re.compile(r'<span>\s*([\d\s\xa0]+(?:[-–]\s*[\d\s\xa0]+)?)\s*zł</span>\s*(?:brutto|netto)')
-_PRACAPL_MODE = re.compile(r'praca (zdalna|hybrydowa|stacjonarna|mobilna)')
-_PRACAPL_RELTIME = re.compile(r'<span>\s*(\d+)\s*(godz|dni|min)\.?\s*</span>')
+_PP_CARD = re.compile(r'<li class="listing-v2__item.*?(?=<li class="listing-v2__item|\Z)', re.S)
+_PP_TITLE = re.compile(r'<a class="listing-v2__title" href="([^"]+)"[^>]*>\s*([^<]+)')
+_PP_EMPLOYER = re.compile(r'<a class="listing-v2__employer"[^>]*>\s*([^<]+?)\s*<')
+_PP_LOGO_ALT = re.compile(r'<img class="listing-v2__logo-image"[^>]*alt="Praca ([^"]*)"')
+_PP_SALARY = re.compile(r'listing-v2__tag-text">\s*([\d\s\xa0]+(?:\s*[-–]\s*[\d\s\xa0]+)?)\s*zł\s*(?:brutto|netto)?\s*/\s*mies')
+_PP_MODE = re.compile(r'tag--mode">\s*<span class="listing-v2__tag-text">\s*([^<]+?)\s*<')
+_PP_RELTIME = re.compile(r'listing-v2__published">\s*(\d+)\s*(godz\.?|dni|min)\.?\s*temu')
+# (_PRACAPL_LOOKBACK/_LOOKFWD_CAP i okienkowanie wokol tytulu niepotrzebne: karta = <li> blok)

 (oraz parse_pracapl przepisana na iteracje po _PP_CARD z wyciaganiem pol powyzej;
  url dzielony od "#"; firma z employer, fallback logo-alt; data z _PP_RELTIME,
  godz/min -> dzisiaj, brak -> "" jak dotychczas)
```

Uwagi do diffu:
- `tryb` nowy format „praca zdalna" itd. — `location_ok` w aggregatorze łapie „zdaln" bez zmian; pusty tryb rocketjobs = keep (jak stary).
- Karty multi-region praca.pl (bez serwerowego URL-a) są pomijane — ~27% karty str. 1; jeśli kiedyś trzeba, tylko przeglądarka/JS.
- Nie trzeba nic zmieniać w fetch_* (URL-e, paginacja, sitemap, UA — wszystko żyje).

## Status testu na kopii

Kopia i test: `~/.hermes/cache/scratch/tacitus-skaner/` (`diag.py`, `fix-test.py`, zapisane HTML/XML).
Test = oba parsery (stary 1:1 z sources.py + nowy) na tych samych zapisanych odpowiedziach, zero dodatkowych requestów:

- rocketjobs: stary → **0** (regex matchuje, JSON OK, `hasPart` = None); nowy → **50 ofert** z jednej kategorii, daty 50/50 z sitemapy, tytuły z `ListItem.name` (np. „Senior Climate & Catastrophe Risk Analyst", „Reinsurance Business Analyst").
- pracapl: stary → **0**; nowy → **38 ofert** (52 karty − 14 multi-region bez URL-a w HTML), firma 38/38, tryb 38/38 (zdalna/hybrydowa/stacjonarna/mobilna), widełki mies. 8/38 (tyle kart je pokazuje), daty 2/38 (reszta bez znacznika — jak dotychczas zostawiane przez `--since`).

**Fix wykonalny nocą: TAK** — czysto tekstowe regexy, stdlib, bez playwright, bez zmian w fetch. Proponowany diff wyżej gotowy do aplikacji (produkcja `sources.py` + kopia w `~/mjoldak-routines/skan-ofert/` muszą dostać TO SAMO, bo rutyna używa kopii).

## Wykonane requesty (audyt)

- rocketjobs.pl: 3 GET (kategoria, sitemap index, part0.xml po redirectzie) — tyle co jeden zwykły przebieg rutyny.
- praca.pl: 2 GET (listing, 1 × 404 na skonstruowanym URL-u multi-region).
- Nikt nie został zablokowany, brak challenge'ów; produkcja nietknięta, commitów brak.
