# NOC 2026-11-09 — vitruvius: fix skanera wgrany (rocketjobs + pracapl)

Wykonanie diagnozy: `NOC-2026-11-09-tacitus-skaner.md` (root cause + diff RJ + regexy PP).
Status: fix wgrany do pliku produkcyjnego i do kopii launchdowej (pliki identyczne).
Commit: BRAK (po werdykcie Marcina rano). Pełny skaner: NIEODPALANY (start rano, ręcznie).
Requesty zewnętrzne podczas tej pracy: 0 (wszystkie testy na zapisanych odpowiedziach z diagnozy).

## Co wgrano

Do `~/Projects/job-fit-scorer/python/sources.py` oraz identycznie do `~/mjoldak-routines/skan-ofert/sources.py`:

1. `_RJ_LDJSON` rozszerzony (bierze cały blok ld+json), `parse_rocketjobs` filtruje po
   `@type == CollectionPage`, czyta `mainEntity.itemListElement` (ListItem: url + name),
   firma celowo pusta (slugi RJ nie mają już `--`), rola z `ListItem.name`
   (fallback: rekonstrukcja ze sluga). Daty bez zmian z sitemapy (14734 wpisów w part0).
2. Kompletnie nowy `parse_pracapl` + regexy `_PP_*` (stare `_PRACAPL_*` usunięte):
   karty = bloki `<li class="listing-v2__item...`; tytuł+URL z `listing-v2__title`
   (URL kanoniczny: podział od `#`); firma z `listing-v2__employer`, fallback
   `listing-v2__logo-image` alt `Praca X`; tryb z `tag--mode` (lowercase, prefix `praca `);
   pensja TYLKO przy `/mies` (`(?:brutto|netto)?` opcjonalne — łapie też format
   `zł / mies.`), stawki godzinowe `brutto/godz.` odrzucone; data z
   `listing-v2__published` („przed chwilą"/„N godzinę temu" → dzisiaj, „N dni temu" →
   dzisiaj-N, „Wygasa za N dni" odrzucone); karty multi-region (button zamiast `<a>`,
   URL tylko w JS) pomijane.
3. Zaktualizowane komentarze sekcji RJ i PP (opisują nowy schemat, nie stary).

## Wyniki testów (zapisane pliki z diagnozy, zero requestów)

Hermes- środowisko: python3, import modułów z pliku (produkcyjny + backup), parsowanie
`rj-kat.html` / `rj-part0.xml` / `pp-glowna.html` z `~/.hermes/cache/scratch/tacitus-skaner/`.

### rocketjobs — `rj-kat.html`, daty z `rj-part0.xml`

| miara | stary parser | nowy parser |
|---|---|---|
| ofert | 0 | 50 |
| rola niepusta | - | 50/50 (z ListItem.name) |
| firma | - | 0/50 (celowo pusta) |
| data_publikacji z sitemapy | - | 50/50 |
| URL-e z /oferta-pracy/ | - | 50/50 |

Przykłady ról z ListItem.name: „Senior Climate & Catastrophe Risk Analyst",
„Reinsurance Business Analyst" — zgadza się z diagnozą 1:1.

### praca.pl — `pp-glowna.html`

| miara | stary parser | nowy parser | diagnoza |
|---|---|---|---|
| ofert | 0 | 38 (52 karty minus 14 multi-region) | 38 |
| firma niepusta | - | 38/38 | 38/38 |
| tryb niepusty | - | 29/38 | 38/38 (niepotwierdzone, patrz delty) |
| widełki miesięczne | - | 10/38 | 8/38 (patrz delty) |
| data_publikacji | - | 38/38 | 2/38 (patrz delty) |
| stawki godzinowe odrzucone | - | 4/4 | tak |

Widełki (od, do): (6000,7500), (4000,8000), (8500,10000), (5500,5500), (5700,5700),
(4806,4806), (5003,5507), (4377,5098), (9050,10520), (8000,24000). Minimum 4000 zł
miesięcznie — żadna stawka godzinowa (69/71/31.40/39.70 zł) nie przeszła.
URL-e: 36/38 hrefów z trackingowym `#...` → po podziale 38/38 unikalnych, kanonicznych.

### Delty vs diagnoza (3, wszystkie wyjaśnione na zapisanym HTML)

1. Tryb 29/38 zamiast 38/38. 9 kart realnie NIE MA w HTML żadnego tagu trybu
   (ad-id: 7988967, 7961461, 7961464, 7965244, 7965268, 7971721, 7891618, 7949005,
   7952410; substring `tag--mode` nie występuje w tych blokach). Twierdzenie z diagnozy
   nie miało pokrycia nawet w jej własnym harnessie — `fix-test.py` nie wypisuje
   fill-rate trybu (tylko zbiór wartości; u niego 4 tryby, u mnie te same 4).
   Parser zachowuje się poprawnie: brak tagu → `tryb = ""` (jak u innych źródeł).
2. Widełki 10/38 zamiast 8/38. Strona ma 10 stawek miesięcznych: 8 × `zł brutto/mies.`
   plus 2 × `zł / mies. (w zal. od umowy)` (spacje wokół ukośnika, bez słowa brutto).
   Regex diagnozy wymagał `(?:brutto|netto)` → gubił te 2; w moim jest opcjonalne.
   Zweryfikowane: każde dopasowanie mieści się w jednym spanie (`</span>` nie występuje
   w żadnym matchu), więc nie ma fałszywych przechwyceń przez granicę tagu.
3. Daty 38/38 zamiast 2/38. Realny słownik `listing-v2__published`: 44 × „przed chwilą",
   6 × „N godzinę temu", 2 × „N dni temu". Regex diagnozy łapał wyłącznie „N dni temu".
   Zgodnie ze słownym opisem diagnozy („godz/min -> dzisiaj") rozszerzyłem słownik
   regexu: „przed chwilą"/„N godzin* temu" → dzisiaj, „N dni temu" → dzisiaj-N.
   „Wygasa za N dni" dalej odrzucane (inny span, bez klasy published; kotwica
   `listing-v2__published">` + wymagane „temu").

### Harness diagnozy (kontrola krzyżowa)

`fix-test.py` Tacytusa na tych samych plikach: RJ stary 0 / nowy 50 / daty 50/50;
PP stary 0 / nowy 38 / firma 38/38 / widełki 8/38 / daty 2/38. Czyli jego własny kod
też daje 8/38 i 2/38 — moje liczby są nadzbiorem jego wyników (2 dodatkowe stawki
miesięczne i 36 dodatkowych dat), nie rozjazdem.

### Mikrotesty brzegowe (nowy kod, syntetyczne bloki)

Wszystko OK: puste strony/listy → 0 ofert; uszkodzony JSON-LD → pominięty, bez wyjątku;
sam BreadcrumbList → 0 ofert (filtr @type działa); „Wygasa za 2 dni" → data „";
URL z `#` → kanoniczny; brak employer → firma z logo-alt (strip `Praca `); karta
multi-region (button) → pominięta, sąsiednia normalna → wzięta.

## Weryfikacja wgrania

- `python3 -m py_compile` na obu plikach: OK (produkcja + kopia launchdowa).
- `diff` produkcji vs kopii launchdowej: identyczne; sha1 obu: `bc93448e590550c84b7d12f53c939ef74d3a453d`.
- Grep: żadnych referencji do usuniętych `_PRACAPL_*` w całym repo; `hasPart` tylko w komentarzach.
- `SOURCES` registry nietknięty (aggregator.py dalej widzi `rocketjobs` i `pracapl`).

## Backupy

| plik | rozmiar | sha1 |
|---|---|---|
| `~/Projects/job-fit-scorer/python/sources.py.bak-2026-11-09-noc` | 23130 B | `0d702b9243cb8be0cbeac4cee43e4c361c1ab26e` |
| `~/mjoldak-routines/skan-ofert/sources.py.bak-2026-11-09-noc` | 23130 B | `0d702b9243cb8be0cbeac4cee43e4c361c1ab26e` |

Oba backupy = identyczny stan sprzed fixu (sha obu plików produkcyjnych przed zmianą był taki sam).

## Diff finalny

Pełny diff `sources.py.bak-2026-11-09-noc` → `sources.py` (197 linii, 5 hlunków):

```diff
--- /Users/marcinoldak/Projects/job-fit-scorer/python/sources.py.bak-2026-11-09-noc	2026-11-09 17:38:59
+++ /Users/marcinoldak/Projects/job-fit-scorer/python/sources.py	2026-11-09 17:39:56
@@ -361,15 +361,21 @@
 # --------------------------------------------------------------------------- #
 # RocketJobs.pl — non-tech/BA sister of JustJoin.it. robots.txt Disallow: /api/
 # only; we fetch category listing pages (in their own sitemap) and read the
-# CollectionPage JSON-LD (offer URLs only — no title/salary in it, so both are
-# reconstructed from the URL slug). Lower field fidelity than an API source;
-# good enough for a discovery pass, human opens the link to verify.
+# CollectionPage JSON-LD: offer URL + title from mainEntity.itemListElement
+# (ListItem.name; schema change 09.11.2026 — hasPart[] is gone). Company is no
+# longer recoverable (slugs lost the "--" separator) -> firma = "". Lower field
+# fidelity than an API source; good enough for a discovery pass, human opens
+# the link to verify.
 # --------------------------------------------------------------------------- #
 ROCKETJOBS_CATEGORIES = [
     "finanse/analiza", "consulting/biznes-strategia", "bi-data",
     "bankowosc/analiza-ryzyko", "praca-biurowa/przetwarzanie-danych",
 ]
-_RJ_LDJSON = re.compile(r'<script type="application/ld\+json">(\{.*?"@type":"CollectionPage".*?\})</script>', re.S)
+# 09.11.2026: RJ przeniósł oferty z hasPart[] do mainEntity.itemListElement[]
+# (ListItem ma url+name). Szeroki regex bierze CAŁY blok ld+json, parse filtruje
+# po @type == CollectionPage — odporny na kolejność/atrybuty bloków (obok
+# CollectionPage na stronie jest też BreadcrumbList).
+_RJ_LDJSON = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.S)
 _RJ_SITEMAP_LOC = re.compile(r"<loc>([^<]+)</loc>")
 _RJ_SITEMAP_URL = re.compile(r"<url>\s*<loc>([^<]+)</loc>\s*<lastmod>([^<]+)</lastmod>")

@@ -418,24 +424,29 @@
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
-            if not url or url in seen:
+        for m in _RJ_LDJSON.finditer(html):
+            try:
+                block = json.loads(m.group(1))
+            except (ValueError, TypeError):
                 continue
-            seen.add(url)
-            company, rola = _rocketjobs_slug_to_fields(url)
-            offers.append({
-                "zrodlo": "rocketjobs", "firma": company, "rola": rola, "url": url,
-                "widelki_od": None, "widelki_do": None, "umowa": "", "tryb": "",
-                "poziom": "", "skille": [], "data_publikacji": dates.get(url, ""),
-            })
+            if not isinstance(block, dict) or block.get("@type") != "CollectionPage":
+                continue
+            me = block.get("mainEntity") or {}
+            for part in me.get("itemListElement") or []:
+                url = (part or {}).get("url") or ""
+                if not url or url in seen:
+                    continue
+                seen.add(url)
+                _, slug_rola = _rocketjobs_slug_to_fields(url)
+                offers.append({
+                    # 09.11.2026: ListItem nie niesie firmy, a slugi RJ nie mają już
+                    # separatora "--" -> firmy z sluga nie wyciągniemy; firma pusta,
+                    # rola z ListItem.name (fallback: rekonstrukcja ze sluga).
+                    "zrodlo": "rocketjobs", "firma": "",
+                    "rola": (part or {}).get("name") or slug_rola, "url": url,
+                    "widelki_od": None, "widelki_do": None, "umowa": "", "tryb": "",
+                    "poziom": "", "skille": [], "data_publikacji": dates.get(url, ""),
+                })
     return offers


@@ -448,29 +459,41 @@
 # (this one) are allowed and are plain server-rendered HTML, no JS needed.
 # --------------------------------------------------------------------------- #
 PRACAPL_MAX_PAGES = 6
-# Card layout per item: <img class="listing__logo" ... alt="Praca X"> (~100-250
-# chars before) -> <a class="listing__title" href="URL">Text</a> -> salary/mode
-# text (after). We anchor on the title link and look around it rather than
-# splitting on <li>...</li>, which breaks on multi-region cards that nest their
-# own <li> per city.
-_PRACAPL_TITLE = re.compile(r'<a class="listing__title[^"]*" href="([^"]+)"[^>]*>\s*(?:<span>)?([^<]+)')
-_PRACAPL_LOGO_ALT = re.compile(r'<img class="listing__logo"[^>]*alt="([^"]*)"')
-_PRACAPL_SALARY = re.compile(r'<span>\s*([\d\s\xa0]+(?:[-–]\s*[\d\s\xa0]+)?)\s*zł</span>\s*(?:brutto|netto)')
-_PRACAPL_MODE = re.compile(r'praca (zdalna|hybrydowa|stacjonarna|mobilna)')
-_PRACAPL_RELTIME = re.compile(r'<span>\s*(\d+)\s*(godz|dni|min)\.?\s*</span>')
-_PRACAPL_LOOKBACK = 400
-_PRACAPL_LOOKFWD_CAP = 3000
+# Karta (redesign "listing-v2", 09.11.2026): <li class="listing-v2__item ..."
+# data-ad-id=... data-ad-title=...> ... </li>. Wszystko wyciągane wewnątrz bloku
+# karty (żadnego okienkowania wokół tytułu):
+#   tytuł+URL: <a class="listing-v2__title" href="URL">Tytuł</a>
+#   firma:     <a class="listing-v2__employer">Nazwa</a> (fallback: alt logo "Praca X")
+#   tryb:      <li class="listing-v2__tag listing-v2__tag--mode"><span
+#              class="listing-v2__tag-text">Zdalna|Hybrydowa|Stacjonarna|Mobilna</span>
+#   pensja:    tag-text "6 000 - 7 500 zł brutto/mies." — TYLKO /mies; stawki
+#              godzinowe ("69,00 zł brutto/godz.") nie przechodzą przez /mies
+#   data:      <span class="listing-v2__published">N dni temu|N godzinę temu|
+#              przed chwilą</span> ("Wygasa za N dni" to inny span — nie łapiemy)
+# Karty multi-region mają <button class="listing-v2__title listing-v2__title--toggle">
+# zamiast <a> — URL-a nie ma w HTML (linki per region dopiero w JS) — pomijane.
+_PP_CARD = re.compile(r'<li class="listing-v2__item.*?(?=<li class="listing-v2__item|\Z)', re.S)
+_PP_TITLE = re.compile(r'<a class="listing-v2__title" href="([^"]+)"[^>]*>\s*([^<]+)')
+_PP_EMPLOYER = re.compile(r'<a class="listing-v2__employer"[^>]*>\s*([^<]+?)\s*<')
+_PP_LOGO_ALT = re.compile(r'<img class="listing-v2__logo-image"[^>]*alt="Praca ([^"]*)"')
+_PP_SALARY = re.compile(r'listing-v2__tag-text">\s*([\d\s\xa0]+(?:\s*[-–]\s*[\d\s\xa0]+)?)\s*zł\s*(?:brutto|netto)?\s*/\s*mies')
+_PP_MODE = re.compile(r'tag--mode">\s*<span class="listing-v2__tag-text">\s*([^<]+?)\s*<')
+_PP_RELTIME = re.compile(r'listing-v2__published">\s*(?:przed chwilą|(\d+)\s*(dzień|dnia|dni|godzin\w*|min)\.?\s*temu)')


-def _pracapl_reltime_to_date(window):
-    """'<span>2 dni</span>' etc -> 'YYYY-MM-DD', day-level (good enough for
-    --since filtering; praca.pl doesn't expose an absolute timestamp)."""
+def _pracapl_reltime_to_date(card):
+    """Zawartość <span class="listing-v2__published"> -> 'YYYY-MM-DD', day-level
+    (good enough for --since filtering; praca.pl doesn't expose an absolute
+    timestamp). 'przed chwilą'/'N godzinę temu' -> dzisiaj (jak dawniej godz/min),
+    'N dni temu' -> dzisiaj-N, brak znacznika -> ''."""
     import datetime
-    m = _PRACAPL_RELTIME.search(window)
+    m = _PP_RELTIME.search(card)
     if not m:
         return ""
+    if not m.group(1):  # 'przed chwilą'
+        return datetime.date.today().strftime("%Y-%m-%d")
     n, unit = int(m.group(1)), m.group(2)
-    days_ago = n if unit == "dni" else 0
+    days_ago = n if unit in ("dzień", "dnia", "dni") else 0
     return (datetime.date.today() - datetime.timedelta(days=days_ago)).strftime("%Y-%m-%d")


@@ -491,39 +514,43 @@
     import html as _html
     seen, offers = set(), []
     for page_html in pages:
-        matches = list(_PRACAPL_TITLE.finditer(page_html))
-        for i, tm in enumerate(matches):
-            url, rola = tm.group(1), _html.unescape(tm.group(2)).strip()
-            if url in seen:
+        for cm in _PP_CARD.finditer(page_html):
+            card = cm.group(0)
+            tm = _PP_TITLE.search(card)
+            if not tm:
+                # multi-region: <button class="listing-v2__title--toggle"> zamiast
+                # <a> — URL tylko w JS; konstruowany slug_id.html daje 404 -> pomijamy
                 continue
-            seen.add(url)
+            # hrefy niosą trackingowy fragment "#..." — dzielimy, żeby dedupe i
+            # seen.json działały na kanonicznym URL-u oferty
+            url = tm.group(1).split("#", 1)[0]
+            if not url or url in seen:
+                continue
+            rola = _html.unescape(tm.group(2)).strip()

-            back_start = max(0, tm.start() - _PRACAPL_LOOKBACK)
-            if i > 0:
-                back_start = max(back_start, matches[i - 1].end())
-            logo = _PRACAPL_LOGO_ALT.search(page_html[back_start:tm.start()])
-            company = _html.unescape(logo.group(1)).strip() if logo else ""
-            company = re.sub(r"^Praca\s+", "", company)
+            emp = _PP_EMPLOYER.search(card)
+            if emp:
+                firma = _html.unescape(emp.group(1)).strip()
+            else:
+                logo = _PP_LOGO_ALT.search(card)
+                firma = _html.unescape(logo.group(1)).strip() if logo else ""

-            fwd_end = matches[i + 1].start() if i + 1 < len(matches) else min(len(page_html), tm.end() + _PRACAPL_LOOKFWD_CAP)
-            window = page_html[tm.end():fwd_end]
-
             widelki_od = widelki_do = None
-            sm = _PRACAPL_SALARY.search(window)
+            sm = _PP_SALARY.search(card)
             if sm:
-                nums = [int(re.sub(r"\s", "", n)) for n in re.findall(r"\d[\d\s\xa0]*\d|\d", sm.group(1).replace("\xa0", " "))]
+                nums = [int(re.sub(r"[\s\xa0]", "", n)) for n in re.findall(r"\d[\d\s\xa0]*\d|\d", sm.group(1))]
                 if len(nums) >= 2:
                     widelki_od, widelki_do = nums[0], nums[1]
                 elif nums:
                     widelki_od = widelki_do = nums[0]

-            mm = _PRACAPL_MODE.search(window)
-            tryb = ("praca " + mm.group(1)) if mm else ""
+            mm = _PP_MODE.search(card)
+            tryb = ("praca " + mm.group(1).strip().lower()) if mm else ""

             offers.append({
-                "zrodlo": "pracapl", "firma": company, "rola": rola, "url": url,
+                "zrodlo": "pracapl", "firma": firma, "rola": rola, "url": url,
                 "widelki_od": widelki_od, "widelki_do": widelki_do, "umowa": "",
-                "tryb": tryb, "poziom": "", "skille": [], "data_publikacji": _pracapl_reltime_to_date(window),
+                "tryb": tryb, "poziom": "", "skille": [], "data_publikacji": _pracapl_reltime_to_date(card),
             })
     return offers
```

## Samoskan artefaktu

- Emoji: 0
- Cyrylica (U+0400–U+04FF): 0
- CJK (U+2E80–U+9FFF, Hangul): 0
- ASCII-art (poza blokiem diffu, który jest dosłowną treścią pliku): 0

## Pozostało (na rano, po werdykcie Marcina)

- Commit obu plików (job-fit-scorer + mjoldak-routines osobno, wg zwyczaju).
- Ręczne uruchomienie pełnego skanera (produkcja czeka; seen.json i logi pójdą normalnie).
