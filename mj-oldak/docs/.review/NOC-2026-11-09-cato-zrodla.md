# NOC 2026-11-09 - CATO: diagnoza rutyny zrodla.sh

Data: 09.11.2026, testy 17:30-17:33 CET (nocna zmiana 09->10.11).
Zakres: diagnoza 3 padlych endpointow, klasa przyczyny per endpoint, propozycja latki.
Granica: produkcyjny `~/bin/zrodla.sh` NIE zostal patchowany - latka testowana na kopii w scratchu.

## 1. Stan wejsciowy

- Marker `~/mjoldak-routines/.health/zrodla.status` z 09:51:31 (epoch 1794214291):
  `error zmian=3 zgodnych=14 proba=18 | gus-bdl:200->429, open-food-facts:200->503, overpass-osm:200->406`
- Zdrowie czerwone od 02.11 (wg zadania). Hermescron `zrodla-probierz.sh` (plan 07:30): 5 porazek z rzedu, ostatni bieg 09.11 09:51 z opoznieniem 2 h 21 min (catch-up po niewystrelonym fire).
- Rejestr `~/OSNOWA/zrodla-danych.json`: 14 zrodel + 4 zmierzone_niedostepne = 18 prob; status_zmierzony mierzony 03-05.10.2026.

## 2. Mechanizm zrodla.sh

- Proba kazdego zrodla: `curl -sL -m 25 -o /dev/null -w %{http_code}` - BEZ wlasnego User-Agent (idzie domyslny UA curla), 8 watkow rownolegle.
- Porownanie kodu z `status_zmierzony` rejestru; rozbieznosc = zmiana; zrodla z flaga `niestabilne` sa poza bramka (nie falszuja alarmu).
- Marker jednoliniowy `<epoch> ok|error <msg>` dla health.sh; exit 1 przy zmianie; `--cichy` = puste wyjscie gdy OK.
- Zmienne srodowiskowe: `ZRODLA_REJ` (sciezka rejestru), `ZRODLA_NOSTATUS` (nie pisz markera - uzylem w testach).

## 3. Testy reczne (2 requesty na host, odstep miedzy falami 12 s)

Fala 1 = bez UA (dokladnie jak probierz). Fala 2 = UA Mozilla/5.0 (Chrome 126, macOS).

- gus-bdl - `https://bdl.stat.gov.pl/api/v1/units?level=1&format=json`
  - fala 1: 200, poprawny JSON (`totalRecords: 7`)
  - fala 2: 200
  - poranny 429 nie utrzymuje sie; wynik niezalezny od UA.
- open-food-facts - `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=microgreens&page_size=1`
  - fala 1: 503, nginx, HTML "Page temporarily unavailable - Open Food Facts"
  - fala 2: 503 (identycznie)
  - strona serwera; UA bez znaczenia; powtorka epizodu z 03.10 (tez 503, wycofal sie sam).
- overpass-osm - `https://overpass-api.de/api/status`
  - fala 1: 406 Not Acceptable (nginx, natychmiast)
  - fala 2 (z UA): brak odpowiedzi w 25 s = 000 (host w tym momencie przeciazony)
  - 406 znika z UA - to jest pulapka zapisana wlasnie w rejestrze ("bez naglowka User-Agent zwraca HTTP 406"). Dodatkowy element: host bywa wolny, a probierz nie ma retry.

## 4. Klasa przyczyny per endpoint

- gus-bdl: LIMIT ZEWNETRZNY (rate limit GUS), przejsciowy. Dowod: 429 o 09:51, 200 o 17:30 bez zadnej zmiany lokalnej. UA nieistotny.
- open-food-facts: AWARIA PO STRONIE SERWERA (wlasna strona bledu nginx 503). UA nieistotny. Historia przejsciowa (03.10 ten sam objaw, sam wycofal sie).
- overpass-osm: BUG LOKALNY + limit zewnetrzny w tle. Bug: probierz nie wysyla User-Agent, a Overpass wymaga UA - 406 bez UA potwierdzone dzisiaj i udokumentowane w rejestrze. Drugi element: przeciazenie overpass-api.de (000 po 25 s) - brak retry zamienia chwilowa wolnosc w czerwona flage.

Zaden z trzech przypadkow NIE jest zmiana API ani zepsutym URL - wszystkie probe-URL odpowiadaja tym samym protokolom co w pazdzierniku.

## 5. Proponowana latka (diff wobec ~/bin/zrodla.sh)

Zasady latki:
- staly User-Agent (env `ZRODLA_UA`, domyslnie przetestowany Mozilla/5.0),
- natywny retry curl na bledy przejsciowe (408/429/5xx/timeout): `--retry N --retry-delay 5 --retry-max-time 90`; curl sam honoruje naglowek Retry-After,
- env `ZRODLA_RETRY` do regulacji,
- ZERO zmian w logice markera, bramce, trybie cichym i fladze niestabilne.

```diff
--- /Users/marcinoldak/bin/zrodla.sh	2026-10-05 09:55:46
+++ /Users/marcinoldak/.hermes/cache/scratch/zrodla-copy-2026-11-09.sh	2026-11-09 17:32:03
@@ -10,6 +10,10 @@
 # Przyklad:
 #   zrodla.sh gus-bdl
 #
+# Zmienne srodowiskowe:
+#   ZRODLA_UA     - User-Agent probierza (domyslnie Mozilla/5.0, przetestowany 09.11.2026)
+#   ZRODLA_RETRY  - liczba retry curl na bledy przejsciowe 429/5xx/timeout (domyslnie 2)
+#
 # Kod wyjscia: 0 = wszystkie zgodne z rejestrem, 1 = cos sie ZMIENILO albo padlo.
 set -u
 REJ="${ZRODLA_REJ:-$HOME/OSNOWA/zrodla-danych.json}"
@@ -29,6 +33,8 @@
 import json, os, subprocess, sys, time, concurrent.futures as cf

 rej_path, filtr, as_json, cichy = sys.argv[1], sys.argv[2], sys.argv[3] == "1", sys.argv[4] == "1"
+UA_PROBE = os.environ.get("ZRODLA_UA", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
+RETRY = os.environ.get("ZRODLA_RETRY", "2")
 rej = json.load(open(rej_path, encoding="utf-8"))
 wszystkie = rej["zrodla"] + [dict(z, _niedostepne=True) for z in rej.get("zmierzone_niedostepne", [])]
 if filtr:
@@ -38,8 +44,11 @@
     url = z.get("probe")
     if not url:
         return z, None, None
-    r = subprocess.run(["curl", "-sL", "-m", "25", "-o", "/dev/null",
-                        "-w", "%{http_code}", url], capture_output=True, text=True)
+    cmd = ["curl", "-sL", "-m", "25",
+           "-A", UA_PROBE,
+           "--retry", RETRY, "--retry-delay", "5", "--retry-max-time", "90",
+           "-o", "/dev/null", "-w", "%{http_code}", url]
+    r = subprocess.run(cmd, capture_output=True, text=True)
     return z, r.stdout.strip(), (r.returncode == 0)

 with cf.ThreadPoolExecutor(max_workers=8) as ex:
```

Skutki latki:
- overpass-osm: 406 znika (UA) - zrodlo wroci do zgodnosci 200, gdy host odpowiada.
- GUS 429 / OFF 503: do 2 powtorzen z 5 s odstepem pochlonie epizody przejsciowe; uporczywa awaria NADAL swieci czerwono - bramka nie zaczyna klamac, to zamierzone.
- worldbank (notka w rejestrze: raz 000, raz 200): retry rowniez pochlonie ten migot.

## 6. Wynik testu kopii (scratch, ZRODLA_NOSTATUS=1, ZRODLA_RETRY=1)

Kopia: `~/.hermes/cache/scratch/zrodla-copy-2026-11-09.sh` (bash -n OK; diff wobec produkcji = wylacznie 3 hunki z pkt 5).

- overpass-osm: ZMIANA 200->000, exit 1. UA usunelo odrzucenie 406 (nginx juz nie odbija), ale overpass-api.de nie odpowiedzial w 25 s w zadnej z 2 prob - przeciazenie serwera, nie bug lokalny. Potwierdzenie 200 z UA: NIEPOTWIERDZONE dzisiaj (host lezal).
- open-food-facts: ZMIANA 200->503, exit 1, po 2 probach - serwer nadal niedostepny; zachowanie latki zgodne z projektem (retry, potem uczciwa czerwona flaga).
- gus-bdl: zgodny 200, exit 0 - latka daje zielono tam, gdzie poranny marker mial 429.
- Marker produkcyjny: mtime 1794214291 identyczny przed i po testach - kopie niczego nie nadpisaly.

## 7. Rekomendacje

1. Wgrac diff do `~/bin/zrodla.sh` po akceptacji (2 stale + 1 funkcja probuj + naglowek). Bez rushu: jedyna trwala usterka to brak UA w overpass; GUS juz jest zielony, OFF jest po stronie serwera.
2. Rejestr: NIE zmieniac status_zmierzony. GUS wraca do 200, OFF ma celowo 200 z notka o przejsciowosci, overpass przy UA wroci do 200.
3. Opcjonalnie (poziom rejestru, osobna decyzja): zapasowy probe overpass na mirrorze z listy rejestru (`overpass.kumi.systems`) - wymaga nowego pomiaru i daty w rejestrze; NIEPOTWIERDZONE w tym teście.
4. GUS: nie zwiekszac czestotliwosci prob; limit zewnetrzny to normalny stan, retry wystarczy.
5. Bez zmian: logika niestabilne, `--cichy`, health.sh, kody wyjscia.

## 8. Higiena procesu

- `~/bin/zrodla.sh`: nietkniety.
- Artefakty: kopia `~/.hermes/cache/scratch/zrodla-copy-2026-11-09.sh`, katalog `~/.hermes/cache/scratch/zrodla-diag-2026-11-09/` (diag.sh, proponowany.diff, naglowki i body prob).
- Budzet requestow w diagnozie: GUS 3 (2 + 1 w tescie kopii), OFF 4, overpass 4 - wszystkie z odstepami, bez spamu; marker produkcyjny nie zapisany ani raz.
