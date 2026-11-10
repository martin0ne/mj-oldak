# NOC 2026-11-09 — TACITUS-2: naprawy A+B skryptu analiza-taxi.py (PC)

Wykonane 09.11.2026 w nocy portfolio (subagent Hermes ← TACITUS-2). Zakres: naprawa A (walidacje jako kod) + naprawa B (argparse) w `C:\Users\biuro\analiza-taxi.py` + README do `C:\analiza\README.md`. **Pełna analiza NIE była odpalana** (parquet 1+ GB nie pobierany ponownie), **nic nie commitowano**, na PC nie zapisano niczego poza wskazanymi 3 plikami (skrypt + backup + README).

## SHA256 (przed → po)

| plik | SHA256 | nota |
|---|---|---|
| `C:\Users\biuro\analiza-taxi.py` **przed** | `4c5380aea5064dc63eb676ae3b0fccfc5db34f2c214c8fc6189acad03db9af0d` | 7 503 B; == kopia 1:1 w `noc-portfolio-input` (shasum == certutil) |
| `C:\Users\biuro\analiza-taxi.py.bak-2026-11-09-noc` | `4c5380aea5064dc63eb676ae3b0fccfc5db34f2c214c8fc6189acad03db9af0d` | backup = przed ✓ |
| `C:\Users\biuro\analiza-taxi.py` **po** | `991fc2787e35e618ec4e440b041280288c8b212a916091d66f1e1c8eadecc10e` | 15 842 B; local↔remote zgodne (scp byte-exact) |
| `C:\analiza\README.md` | `f1fe0bc580681a45c0c5f8e0f2e55a4508f44363d2f232af4158b2db87dacd13` | nowy; local↔remote zgodne |

## Przebieg

1. Weryfikacja kopii 1:1: sha remote (certutil) == sha kopii lokalnej (shasum) → `4c5380ae…` ✓
2. Backup `copy /Y` → `analiza-taxi.py.bak-2026-11-09-noc`; sha backupu == sha przed ✓
3. Patch lokalny (146 → 291 linii; cały pipeline przeniesiony do `main()`, guard `__main__`) → `py_compile` OK
4. Deploy scp na PC; sha po = `991fc278…`, zgodne local↔remote
5. Test logiki na PC: `ssh pc "python -" < test-mini-taxi.py` → **WYNIK: OK** (exit 0) — bez pobierania danych
6. README → `C:\analiza\README.md` (scp; hash zgodny 1:1)
7. Weryfikacje: `if exist` → BAK-OK, README-OK; `dir C:\analiza` = 4 PNG + raport.json (poprzedni run) + README.md — nic więcej nie dotknięte

## Co się zmieniło w kodzie

**NAPRAWA A — walidacje jako kod:**
- `waliduj_bilans(raw, clean, drop)` — suma reguł czyszczenia vs usunięte (raw−clean). Jak się zamyka → `zgodne=True`. Jak nie → liczy `odrzucone_poza_regulami` = usunięte − suma reguł oraz `odrzucone_poza_regulami_udzial_procent` (% surowych). Na danych z runu 09.11: 1 106 880 − 580 483 = **526 397 = 5,5%** — pole ląduje w raport.json w `skala` i w `walidacje.bilans_czyszczenia`.
- `policz_nulle_surowe(con)` — NULL-e w 5 kolumnach kluczowych na danych surowych, **nazwicie** (`pickup`, `dropoff`, `fare`, `dist`, `pax`, `dowolna`) → `walidacje.bilans_czyszczenia.nulls_surowe_w_kolumnach_kluczowych`. Atrybucja luki: reguły z `or`/`between` nie łapią NULL-i, widok `c` je odrzuca; reguły liczone z przecięciami, więc luka ≤ liczba wierszy z NULL (zapisane w polu `uwaga`).
- `waliduj_wyjscie(con)` — twarda asercja na danych wyjściowych (widok `c`): 0 NULL-i w `tpep_pickup_datetime`/`tpep_dropoff_datetime`/`fare_amount`, `fare_min >= 0`, `dist_min > 0`.
- Sekcja `walidacje` w raport.json (`bilans_czyszczenia` + `dane_wyjsciowe` + `status`). Twarda walidacja nieprzejścia → raport.json zawiera `skala` + `walidacje`, skrypt robi **exit 1**.
- `klasyfikuj_wiersz(...)` — lustrzane odbicie SQL widoku `c` w Pythonie (kategoria: `ok` | nazwa reguły | `null:<kolumna>`); obsługiwane None i NaN (`_jest_nullem`). Używane przez test logiki.

**NAPRAWA B — parametryzacja:**
- `--out` (domyślnie `C:\analiza`), `--months` (domyślnie `1 2 3` = pełne Q1; z tego budują się URL-e parquet = parametryzacja IN). Bez argumentów skrypt działa jak dawniej — potwierdzone testem argparse w teście logiki.

**Struktura:** pipeline w `main(argv=None)`, `if __name__ == "__main__": sys.exit(main())` — import modułu nic nie ściąga i niczego nie liczy (potwierdzone na PC). Logika czyszczenia, SQL, metryki, wykresy — **bez zmian**; klucz raportu z literówką `top_stefy_zysk` **zostawiony celowo** (poza zakresem, zmiana mogłaby zepsuć konsumentów).

## Wynik testu logiki na PC (mini-DataFrame w pamięci)

```
 etykieta                         kategoria
 poprawny                                ok
null-fare                  null:fare_amount
null-dist                null:trip_distance
   fare<0         fare_amount < 1 lub > 500
   dist=0 trip_distance < 0.1 lub > 100 mil
TEST poprawny  ... -> OK   TEST null-fare ... -> OK   TEST null-dist ... -> OK
TEST fare<0    ... -> OK   TEST dist=0    ... -> OK
KATEGORIE (5): {'ok': 1, 'null:fare_amount': 1, 'null:trip_distance': 1,
                'fare_amount < 1 lub > 500': 1, 'trip_distance < 0.1 lub > 100 mil': 1}
BILANS: {'suma_regul': 2, 'usuniete': 4, 'zgodne': False,
         'odrzucone_poza_regulami': 2, 'odrzucone_poza_regulami_udzial_procent': 40.0}
BRAMKA blad -> 1 | OK -> 0
ARGPARSE bez argumentow: out='C:\\analiza' months=[1, 2, 3]
WYNIK: OK - 5 kategorii poprawnie; NULL-e policzone nazwicie; bilans, bramka i domyslne argparse dzialaja
```

5 syntetycznych wierszy → 5 różnych kategorii; 2 NULL-wiersze nie łapią się w żadną regułę, ale wypadają w widoku `c` → luka bilansowa = 2 (analogia 1:1 do 526 397 na realnych danych). exit-1 bramka: **działa** (błąd twardy → 1, OK → 0); `sys.exit(bramka_wyjscia(...))` podpięte w `main()` — całość, nie sama funkcja, wymaga pełnego runu do sprawdzenia end-to-end (celowo nie odpalane).

## Instrukcja restartu pełnej analizy (dla Marcina)

1. `ssh pc "python C:\Users\biuro\analiza-taxi.py"` — działa jak dawniej, wyniki do `C:\analiza` (4 PNG + raport.json).
2. Opcjonalnie: `--out D:\wyniki` i/lub `--months 1 2` (mniejszy wycinek = szybszy run).
3. Oczekiwany przebieg: nowe linie `WALIDACJE OK | bilans: {...}` na końcu; w `raport.json` → `skala.odrzucone_poza_regulami` = 526 397 (5,5%) + `walidacje.bilans_czyszczenia.nulls_surowe_w_kolumnach_kluczowych` (NULL-e nazwicie) + `walidacje.dane_wyjsciowe`.
4. **Bilans się NIE zamknie** (580 483 vs 1 106 880) — to oczekiwane i NIE wywala runu (patrz decyzje niżej). exit 1 dostaniesz tylko, gdy `walidacje.dane_wyjsciowe.ok = false` (NULL-e/zakresy w danych wyjściowych) — wtedy raport.json i tak powstaje z sekcją `walidacje` do diagnozy.
5. Czas: kilka minut (czytanie ~1+ GB parquet z chmury). Rollback skryptu: `copy /Y C:\Users\biuro\analiza-taxi.py.bak-2026-11-09-noc C:\Users\biuro\analiza-taxi.py`.

## Decyzje interpretacyjne (do review)

- **exit 1 tylko na twardych walidacjach** (`dane_wyjsciowe`: NULL-e/zakresy). Bilans reguły-vs-usunięte traktowany zgodnie z treścią zadania (a): „jak NIE — policz i zapisz" → zapis luki zamiast wywalania runu; inaczej każdy pełny run kończyłby się exit 1 na znanej luce 526 397.
- Parametryzacja IN zrealizowana jako `--months` (URL-e parquet wynikają z miesięcy); `--out` = OUT. `ZONES` (CSV lookup) zostawione na sztywno.
- Klasyfikacja NULL-i w `klasyfikuj_wiersz`: pierwszy NULL wygrywa (deterministycznie, kolejność `KOLUMNY_KLUCZOWE`); wiersz może naruszać wiele reguł naraz — SQL liczy każdą regułę osobno, mirror zwraca jedną kategorię (na potrzeby testu).

## Poza zakresem (zaobserwowane, nie ruszone)

- literówka klucza `top_stefy_zysk` w raport.json (FAKTY-METODYKA pkt 8),
- docstring „~15-16 mln wierszy" vs realne 9 554 778,
- ścieżka `ZONES` i brak pinowania wersji danych (pkt 6 FAKTY).

## Diff — realne zmiany (diff -u -w; pełny diff z re-indentem w noc-taxi-test/diff-pelny.txt)

```diff
--- ../noc-portfolio-input/analiza-taxi.py	2026-11-09 18:08:38
+++ analiza-taxi.py	2026-11-09 20:50:55
@@ -1,18 +1,138 @@
-
 # ANALIZA BIG DATA: NYC Yellow Taxi 2024 Q1 (~15-16 mln wierszy, parquet w chmurze)
-# Problem decyzyjny: kiedy i gdzie kierowcy realnie zarabiają najwiecej
+# Problem decyzyjny: kiedy i gdzie kierowcy realnie zarabiaja najwiecej
 #   (przychod netto/godzine + napiwki), po odfiltrowaniu brudow danych.
-import duckdb, json, os
+#
+# TACITUS-2, noc 2026-11-09 - naprawy A+B (logika czyszczenia i metryki bez zmian):
+#   A. walidacje jako kod:
+#      - bilans: suma reguly czyszczenia vs usuniete; jak sie nie zamyka -> pole
+#        "odrzucone_poza_regulami" (+ udzial % surowych) w raport.json; luka =
+#        kandydaci NULL-e, policzeni nazwicie (reguly or/between nie lapia NULL,
+#        widok 'c' je odrzuca);
+#      - twarde asercje na danych wyjsciowych (widok 'c'): 0 NULL-i w
+#        pickup/dropoff/fare, fare >= 0, dist > 0;
+#      - sekcja "walidacje" w raport.json; twarda walidacja nieprzejscie -> exit 1.
+#   B. parametryzacja: --out (domyslnie C:\analiza), --months (domyslnie 1 2 3);
+#      bez argumentow skrypt dziala jak dawniej.
+#   Test logiki (mini-DataFrame w pamieci, bez pobierania parquet) obejmuje klasyfikacje
+#   5 kategorii wierszy, luke bilansowa i bramke exit - bez odpalania pelnej analizy.
+import argparse, duckdb, json, os, sys
 import matplotlib
 matplotlib.use("Agg")
 import matplotlib.pyplot as plt
 
-OUT = r"C:\analiza"
-os.makedirs(OUT, exist_ok=True)
-
-URLS = ["https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2024-%02d.parquet" % m for m in (1,2,3)]
+OUT_DOMYSLNY = r"C:\analiza"
+URL_SZABLON = "https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2024-%02d.parquet"
 ZONES = "https://d37ci6vzurychx.cloudfront.net/misc/taxi_zone_lookup.csv"
 
+# reguly czyszczenia (jawne, policzalne) - kolejnosc = kolejnosc klasyfikacji wierszy
+REGULY = {
+ "fare_amount < 1 lub > 500": "fare_amount < 1 or fare_amount > 500",
+ "trip_distance < 0.1 lub > 100 mil": "trip_distance < 0.1 or trip_distance > 100",
+ "passenger_count spoza 1-6": "passenger_count < 1 or passenger_count > 6",
+ "pickup spoza Q1 2024": "tpep_pickup_datetime < TIMESTAMP '2024-01-01' or tpep_pickup_datetime >= TIMESTAMP '2024-04-01'",
+ "czas trwania < 1 min lub > 6 h": "datediff('minute', tpep_pickup_datetime, tpep_dropoff_datetime) < 1 or datediff('minute', tpep_pickup_datetime, tpep_dropoff_datetime) > 360",
+}
+KOLUMNY_KLUCZOWE = ("tpep_pickup_datetime", "tpep_dropoff_datetime", "fare_amount",
+                    "trip_distance", "passenger_count")
+
+def _jest_nullem(v):
+    # None albo NaN/NaT (v != v); bezpieczne dla typow numpy/pandas i zwyklych wartosci
+    if v is None:
+        return True
+    try:
+        return v != v
+    except Exception:
+        return False
+
+def klasyfikuj_wiersz(fare_amount, trip_distance, passenger_count,
+                      tpep_pickup_datetime, tpep_dropoff_datetime):
+    """Kategoria wiersza wg reguly czyszczenia - lustrzane odbicie SQL widoku 'c'.
+    Zwraca: "ok" | nazwe reguly | "null:<kolumna>" gdy kluczowa kolumna jest NULL.
+    NULL w SQL: porownania z NULL daja NULL -> wiersz nie lapie sie w zadna regule
+    (count(*) where <regula> go nie liczy), ale WHERE w widoku 'c' go odrzuca -
+    stad luka bilansowa, liczona jawnie w walidacjach."""
+    wartosci = {"tpep_pickup_datetime": tpep_pickup_datetime,
+                "tpep_dropoff_datetime": tpep_dropoff_datetime,
+                "fare_amount": fare_amount, "trip_distance": trip_distance,
+                "passenger_count": passenger_count}
+    for kol in KOLUMNY_KLUCZOWE:
+        if _jest_nullem(wartosci[kol]):
+            return "null:" + kol
+    if not (1 <= fare_amount <= 500):
+        return "fare_amount < 1 lub > 500"
+    if not (0.1 <= trip_distance <= 100):
+        return "trip_distance < 0.1 lub > 100 mil"
+    if not (1 <= passenger_count <= 6):
+        return "passenger_count spoza 1-6"
+    if not ("2024-01-01" <= str(tpep_pickup_datetime)[:10] < "2024-04-01"):
+        return "pickup spoza Q1 2024"
+    if not (1 <= (tpep_dropoff_datetime - tpep_pickup_datetime).total_seconds() / 60 <= 360):
+        return "czas trwania < 1 min lub > 6 h"
+    return "ok"
+
+def policz_nulle_surowe(con):
+    """NULL-e w kolumnach kluczowych na danych surowych (widok t), nazwicie -
+    atrybucja luki bilansowej (reguly ich nie licza, widok 'c' je odrzuca)."""
+    pary = (("tpep_pickup_datetime", "pickup"), ("tpep_dropoff_datetime", "dropoff"),
+            ("fare_amount", "fare"), ("trip_distance", "dist"), ("passenger_count", "pax"))
+    suma_kol = ", ".join("sum(case when %s is null then 1 else 0 end) as n_%s" % (k, s) for k, s in pary)
+    dowolna = " or ".join("%s is null" % k for k, _ in pary)
+    wiersz = con.execute("select %s, sum(case when %s then 1 else 0 end) as n_dowolna from t"
+                         % (suma_kol, dowolna)).fetchone()
+    return dict(zip([s for _, s in pary] + ["dowolna"], map(int, wiersz)))
+
+def waliduj_wyjscie(con):
+    """Asercja na danych wyjsciowych (widok c): 0 NULL-i w pickup/dropoff/fare,
+    fare >= 0, dist > 0. ok=False -> bramka_wyjscia zwraca 1 (exit 1)."""
+    null_pickup, null_dropoff, null_fare, fare_min, fare_max, dist_min, dist_max = con.execute("""
+        select
+          sum(case when tpep_pickup_datetime  is null then 1 else 0 end),
+          sum(case when tpep_dropoff_datetime is null then 1 else 0 end),
+          sum(case when fare_amount           is null then 1 else 0 end),
+          min(fare_amount), max(fare_amount), min(trip_distance), max(trip_distance)
+        from c""").fetchone()
+    wynik = {"null_pickup": int(null_pickup), "null_dropoff": int(null_dropoff),
+             "null_fare": int(null_fare),
+             "fare_min": float(fare_min) if fare_min is not None else None,
+             "fare_max": float(fare_max) if fare_max is not None else None,
+             "dist_min": float(dist_min) if dist_min is not None else None,
+             "dist_max": float(dist_max) if dist_max is not None else None}
+    wynik["ok"] = (wynik["null_pickup"] == 0 and wynik["null_dropoff"] == 0
+                   and wynik["null_fare"] == 0 and wynik["fare_min"] is not None
+                   and wynik["fare_min"] >= 0 and wynik["dist_min"] is not None
+                   and wynik["dist_min"] > 0)
+    return wynik
+
+def waliduj_bilans(raw, clean, drop):
+    """Bilans czyszczenia: suma reguly vs usuniete (raw - clean).
+    Zgadza sie -> zgodne=True. Nie zgadza sie -> pole 'odrzucone_poza_regulami'
+    (+ udzial % wzgledem surowych): luka = kandydaci NULL-e."""
+    usuniete = raw - clean
+    suma_regul = sum(int(v) for v in drop.values())
+    wynik = {"suma_regul": suma_regul, "usuniete": usuniete, "zgodne": suma_regul == usuniete}
+    if not wynik["zgodne"]:
+        roznica = usuniete - suma_regul
+        wynik["odrzucone_poza_regulami"] = roznica
+        wynik["odrzucone_poza_regulami_udzial_procent"] = round(100.0 * roznica / raw, 1) if raw else None
+    return wynik
+
+def bramka_wyjscia(walidacje):
+    """0 gdy walidacje OK; 1 gdy twarda walidacja (dane_wyjsciowe) nie przeszla."""
+    return 0 if walidacje["dane_wyjsciowe"]["ok"] else 1
+
+def parsuj_argumenty(argv=None):
+    ap = argparse.ArgumentParser(description="NYC Yellow Taxi 2024 Q1 - analiza DuckDB (TACITUS-2: + walidacje)")
+    ap.add_argument("--out", default=OUT_DOMYSLNY, help="katalog wynikow (domyslnie %(default)s)")
+    ap.add_argument("--months", type=int, nargs="+", default=[1, 2, 3],
+                    help="miesiace 2024 (domyslnie 1 2 3 = pelne Q1)")
+    return ap.parse_args(argv)
+
+def main(argv=None):
+    args = parsuj_argumenty(argv)
+    OUT = args.out
+    URLS = [URL_SZABLON % m for m in args.months]
+    os.makedirs(OUT, exist_ok=True)
+
 con = duckdb.connect()
 pq = "read_parquet(%r)" % (URLS,)
 
@@ -20,15 +140,8 @@
 raw = con.execute("select count(*) from %s" % pq).fetchone()[0]
 con.execute("create or replace view t as select * from %s" % pq)
 
-# 2. reguly czyszczenia (jawne, policzalne)
-rules = {
- "fare_amount < 1 lub > 500": "fare_amount < 1 or fare_amount > 500",
- "trip_distance < 0.1 lub > 100 mil": "trip_distance < 0.1 or trip_distance > 100",
- "passenger_count spoza 1-6": "passenger_count < 1 or passenger_count > 6",
- "pickup spoza Q1 2024": "tpep_pickup_datetime < TIMESTAMP '2024-01-01' or tpep_pickup_datetime >= TIMESTAMP '2024-04-01'",
- "czas trwania < 1 min lub > 6 h": "datediff('minute', tpep_pickup_datetime, tpep_dropoff_datetime) < 1 or datediff('minute', tpep_pickup_datetime, tpep_dropoff_datetime) > 360",
-}
-drop = {k: con.execute("select count(*) from t where %s" % v).fetchone()[0] for k, v in rules.items()}
+    # 2. reguly czyszczenia (jawne, policzalne) + widok czystych danych
+    drop = {k: con.execute("select count(*) from t where %s" % v).fetchone()[0] for k, v in REGULY.items()}
 con.execute("""
 create or replace view c as select * from t
  where fare_amount between 1 and 500
@@ -40,6 +153,34 @@
 """)
 clean = con.execute("select count(*) from c").fetchone()[0]
 
+    # 2b. NAPRAWA A: walidacje jako kod
+    bilans = waliduj_bilans(raw, clean, drop)
+    walidacje = {
+        "bilans_czyszczenia": {**bilans,
+                               "nulls_surowe_w_kolumnach_kluczowych": policz_nulle_surowe(con),
+                               "uwaga": None if bilans["zgodne"] else
+                               "suma reguly < usunietych: luka = kandydaci NULL-e (reguly or/between "
+                               "nie licza NULL, widok 'c' je odrzuca); reguly liczone z przecieciami, "
+                               "wiec luka <= liczba wierszy z NULL"},
+        "dane_wyjsciowe": waliduj_wyjscie(con),
+    }
+    walidacje["status"] = "OK" if walidacje["dane_wyjsciowe"]["ok"] else "BLAD"
+
+    skala = {"wierszy_surowych": int(raw), "wierszy_po_czyszczeniu": int(clean),
+             "usunietych_procent": round(100*(raw-clean)/raw, 1),
+             "reguly_czyszczenia": {k: int(v) for k, v in drop.items()}}
+    if not bilans["zgodne"]:
+        skala["odrzucone_poza_regulami"] = bilans["odrzucone_poza_regulami"]
+        skala["odrzucone_poza_regulami_udzial_procent"] = bilans["odrzucone_poza_regulami_udzial_procent"]
+
+    # twarda bramka: walidacja nie przeszla -> raport z sekcja walidacje + exit 1
+    if not walidacje["dane_wyjsciowe"]["ok"]:
+        with open(OUT + r"\raport.json", "w", encoding="utf-8") as f:
+            json.dump({"skala": skala, "walidacje": walidacje}, f, ensure_ascii=False, indent=1)
+        print("WALIDACJA NIE PRZESZLA -> exit 1:",
+              json.dumps(walidacje["dane_wyjsciowe"], ensure_ascii=False))
+        return 1
+
 # 3. metryki
 m = con.execute("""
 with x as (
@@ -125,15 +266,14 @@
 worst_h = by_h[by_h["kursy"]>5000].sort_values("przychod_na_kurs").head(3)
 
 raport = {
- "skala": {"wierszy_surowych": int(raw), "wierszy_po_czyszczeniu": int(clean),
-           "usunietych_procent": round(100*(raw-clean)/raw,1),
-           "reguly_czyszczenia": {k:int(v) for k,v in drop.items()}},
+     "skala": skala,
  "metryki": {k:(float(v) if v==v else None) for k,v in m.items()},
  "najlepsze_godziny": [{"h":int(r.h),"kursy":int(r.kursy),"przychod_kurs":float(r.przychod_na_kurs),"tip_pct":float(r.tip_pct)} for r in best_h.itertuples()],
  "najgorsze_godziny": [{"h":int(r.h),"kursy":int(r.kursy),"przychod_kurs":float(r.przychod_na_kurs),"tip_pct":float(r.tip_pct)} for r in worst_h.itertuples()],
  "top_strefy_ilosc": [{"strefa":r.strefa,"kursy":int(r.kursy),"przychod_kurs":float(r.przychod_na_kurs)} for r in top.head(5).itertuples()],
  "top_stefy_zysk": [{"strefa":r.strefa,"kursy":int(r.kursy),"przychod_kurs":float(r.przychod_na_kurs)} for r in top2.head(5).itertuples()],
  "dni": [{"dzien":DNI[int(r.dzien)],"kursy":int(r.kursy),"przychod_kurs":float(r.przychod_na_kurs)} for r in by_dow.itertuples()],
+     "walidacje": walidacje,
 }
 with open(OUT+r"\raport.json","w",encoding="utf-8") as f:
     json.dump(raport,f,ensure_ascii=False,indent=1)
@@ -143,4 +283,9 @@
 print("TOP3 H", [(h["h"],h["przychod_kurs"]) for h in raport["najlepsze_godziny"]])
 print("DOL3 H", [(h["h"],h["przychod_kurs"]) for h in raport["najgorsze_godziny"]])
 print("TOP STREDA", [(t["strefa"],t["kursy"]) for t in raport["top_strefy_ilosc"]])
+    print("WALIDACJE", walidacje["status"], "| bilans:", json.dumps(walidacje["bilans_czyszczenia"], ensure_ascii=False))
 print("PLIKI", sorted(os.listdir(OUT)))
+    return 0
+
+if __name__ == "__main__":
+    sys.exit(main())
```

---
Artefakt towarzyszący: test-mini-taxi.py + diff-pelny.txt w `~/.hermes/cache/scratch/noc-taxi-test/` (scratch, 24 h retencji).
