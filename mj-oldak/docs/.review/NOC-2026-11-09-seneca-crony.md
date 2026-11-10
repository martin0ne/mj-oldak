# NOC-2026-11-09 — przegląd cronów Hermes [SENECA]

- Data: 2026-11-09, 17:29 CET. Profil: default. Tryb: READ-ONLY — zero pause/resume/remove/create/edit/run/tick/ack.
- Metoda: `hermes cron list`, `cron status`, `cron runs --limit 80`, `cron incidents list`, `cron doctor`. Surowe zrzuty: `~/.hermes/cache/scratch/NOC-cron-*.txt`.
- Doctor przed odpaleniem zweryfikowany w źródle (`hermes_cli/cron.py`, `cron_doctor()`): docstring „Run read-only cron health checks", implementacja tylko `list_jobs()` + print, brak zapisów. Odpalony bezpiecznie.

## Stan globalny

- Gateway działa: PID 1630, ticker heartbeat 9 s, 15 aktywnych jobów, scheduler zdrowy.
- OSTRZEŻENIE przy każdym wywołaniu CLI: „A previous hermes update pulled new code but did not restart running gateways". Restart gatewaya = klik Marcina (nie wykonany;.gateway może serwować zmieszany kod sprzed update).
- 12 z 15 jobów odpaliło dziś z opóźnieniem, wszystkie w jednym burstu o 09:51 (scheduled 07:00-09:10). Historia runs: olx-drukarki-monitor tykał co ok. 2 h do 01:42 w nocy, potem cisza do 09:51 — ticker nie tykał ok. 03:42-09:51. Najbardziej prawdopodobna przyczyna: Mac uśpiony w nocy. Wniosek: poranne joby realnie odpalają się po obudzeniu Maca, nie o swojej godzinie.
- Rekoncyliacja z wcześniejszym raportem „8 cronów z błędem": dziś 11 jobów ma wpis historyczny „Last failure … recovered since" (awarie 19.10-05.11, głównie provider unreachable / 429 / 402), 2 joby mają bieżący problem. Zdrowych 13/15.

## Tabela jobów

| job | schedule | stan | ostatni bieg | ostatni błąd | propozycja |
|---|---|---|---|---|---|
| daily-inbox-scan (0e70131c3028) | codziennie 08:00 | zdrowy, late | 09.11 09:56 ok | provider unreachable 02.11 (odzyskane) | bez zmian |
| weekly-consolidation (72b9a259b8f7) | pon 07:00 | zdrowy, late | 09.11 09:57 ok | provider unreachable 02.11 (odzyskane) | bez zmian |
| weekly-notebooklm-connector-watch (c5903969c31a) | pon 09:00 | zdrowy, late | 09.11 09:52 ok | HTTP 429 26.10 (odzyskane) | bez zmian |
| EU Inc. — monitoring 2026/0074(COD) (08998f2d07a3) | 1. dzień mies. 09:00 | zdrowy, late | 01.11 12:28 ok | brak w historii | bez zmian |
| Poranny briefing — skan ofert (cbe5c5910def) | codziennie 08:30 | zdrowy, late | 09.11 09:53 ok | provider unreachable 31.10 (odzyskane) | bez zmian |
| Briefing ofert — powiadomienie na Macu (08b55b98d9c0) | codziennie 08:20 | zdrowy, late | 09.11 09:51 ok | brak w historii | bez zmian |
| Microgreens — rytm dzienny (c1768668b4fe) | codziennie 07:00 | zdrowy, late | 09.11 09:51 ok | brak w historii (awaria skryptu 13.10, resolved) | bez zmian |
| Microgreens — raport tygodniowy (684e76bd5485) | niedz 18:00 | CHORY: delivery | 08.11 18:00 — wynik nie dostarczony | Telegram send failed: httpx.ConnectError Errno 8 (DNS) | obserwować do biegu 15.11; jeśli powtórka — zmiana deliver (mutacja, Marcin) |
| Źródła danych — tygodniowy probierz (49be5c8a6c35) | pon 07:30 | CHORY: 5 fail z rzędu | 09.11 09:51 FAILED | skrypt exit 1: GUS BDL 200 do 429, Open Food Facts 200 do 503, Overpass 200 do 406 | do decyzji Marcina: diagnostyka ~/bin/zrodla.sh (Overpass 406 = query/UA, GUS 429 = rate limit, OFF 503 = chwilowe); job działa jako alarm — czy stan akceptowalny |
| mix-modeli-check (39f92221cde9) | pon 09:00 | zdrowy, late | 09.11 09:52 ok | provider unreachable 19.10 (odzyskane) | bez zmian |
| redakcja-meldunek-poranny (ba20d4008d79) | codziennie 08:00 | zdrowy, late | 09.11 09:52 ok | provider unreachable 02.11 (odzyskane) | bez zmian |
| Dziennik CEO (PRYWATNY) (a94815288f79) | codziennie 21:15 | zdrowy, on time | 08.11 21:21 ok | tool-budget wyczerpany 04.11 (odzyskane) | bez zmian |
| Świeżość mjoldak.pl — audyt tygodniowy (fcef06eb8930) | pon 09:00 | zdrowy, late | 09.11 10:01 ok | provider unreachable 19.10 (odzyskane) | bez zmian |
| Zespół stron — codzienny skan MJ.OLDAK (dcbc85f55850) | codziennie 09:10 | zdrowy, late | 09.11 09:52 ok | RuntimeStoreError invalid_params 05.11 (odzyskane) | bez zmian |
| olx-drukarki-monitor (9eabb1e26328) | co 120 min | zdrowy, on time | 09.11 15:54 ok | provider unreachable 01.11 (odzyskane) | bez zmian; uwaga: nocne luki 2-8 h w tickach gdy Mac śpi |

## Doctor (odpalony, read-only)

- Wynik: 14 issue(s) across 13 job(s), exit 1 (znaleziska = kod 1, nie awaria).
- Struktura: 12 ostrzeżeń „last fire was late / catch-up" (kasują się przy najbliższym on-time fire), 1 błąd dostarczenia (684e76bd5485), 1 nieudany ostatni bieg (49be5c8a6c35).
- Doctor niczego nie naprawia — tylko raportuje.

## Incidents (32 łącznie, otwarte 4)

- 49be5c_f130f9a29047 — ALERTED — job 49be5c8a6c35 (probierz), 09.11 09:51 — aktywny alert, aktualny.
- 49be5c_dafa4ddf93a2 — DETECTED — job 49be5c8a6c35, 02.11 — poprzednia odsłona tego samego problemu.
- 8e6098_aebf3b66cdb1 — DETECTED — job 8e6098b4d51b nie istnieje w liście jobów (orphan po usuniętym jobie, 22.09) — nigdy nie zostanie domknięty sam.
- b05ba3_4b3f98e697fa — DETECTED — job b05ba36b0a9d nie istnieje (orphan, 21.09) — j.w.
- Pozostałe 28: resolved lub closed. Ack incidentów = mutacja — nie wykonany.

## TOP propozycje

1. SYSTEMOWE — restart gatewaya po `hermes update` (ostrzeżenie przy każdym wywołaniu CLI): `hermes gateway restart` — klik Marcina, nie wykonane.
2. SYSTEMOWE — nocny downtime tickera (Mac śpi ok. 03:42-09:51): poranne joby 07:00-09:10 odpalają się po obudzeniu. Decyzja Marcina: ustawić energię/pmset tak, by gateway tykał w nocy, zaakceptować opóźnienia, albo przesunąć poranne godziny. Żadnej zmiany z mojej strony.
3. FIX kandydat — 49be5c8a6c35 (probierz źródeł): 5 fail z rzędu to alarm o degradacji źródeł zewnętrznych (GUS 429, OFF 503, Overpass 406), nie o usterce joba. Propozycja: przejrzeć `~/bin/zrodla.sh` i rejestr `~/OSNOWA/zrodla-danych.json`, zdecydować czy exit 1 przy degradacji źródeł ma dalej liczyć się jako fail (wpada do incidents), czy stan „alarm, ok".
4. OBSERWACJA — 684e76bd5485 (microgreens tygodniowy): jednorazowy błąd DNS przy dostarczeniu na Telegram 08.11 18:00. Kolejny bieg 15.11 18:00 — jeśli powtórka, `hermes cron edit 684e76bd5485 --deliver <target>` (mutacja, Marcin).
5. PORZĄDKI — 2 orphan incidents po usuniętych jobach: `hermes cron incidents ack <id>` czyści listę (mutacja, Marcin).
6. Bez zmian: 13/15 jobów — ostatnie biegi OK, awarie historyczne odzyskane, schemat „awaria nocna/poranna, recover tego samego dnia" powtarzalny i samoograniczający.

## Ślady

- Surowe zrzuty (pełne, z ostrzeżeniem CLI): `~/.hermes/cache/scratch/NOC-cron-help.txt`, `NOC-cron-list.txt`, `NOC-cron-doctor-help.txt`, `NOC-cron-doctor.txt`, `NOC-cron-runs-help.txt`, `NOC-cron-runs.txt`, `NOC-cron-incidents.txt`.
- Mutacje wykonane: ZERO. Joby, schedule'y, deliver targets, incydenty — nietknięte.
