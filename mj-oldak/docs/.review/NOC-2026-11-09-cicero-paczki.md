---
date: 2026-11-09 17:32 CET
type: nocna-zmiana-raport
project: Rekrutacja
agent: Cicero (subagent, wylacznie odczyt)
task: status wysylki paczek aplikacyjnych z 05-06.11.2026
---

# NOC 2026-11-09 — status wysyłki paczek aplikacyjnych 05-06.11

## Werdykt w trzech liniach
- **WYSŁANE-POTWIERDZONE: 9** — wszystkie z 05.11 (8 z nich ma dodatkowo auto-potwierdzenie mailowe na biuro@mjoldak.pl; Follow-up 13.11 uzasadniony).
- **NIE-WIDOCZNE: 17** — w tym **8 paczek gotowych czekających na klik** (6 z 06.11 + Capco DA + Lingaro RGM) i 9 skipów/wygasłych/oczekujących na decyzję.
- **NIEJASNE: 0** — cztery niezależne źródła (pipeline.md, KLIKI-2026-11-09.md, notka sweepu 06.11, Apple Mail) są w 100 procentach spójne. Wątpliwość „paczki z 06.11 status niejasny" rozstrzygnięta: **nie zostały wysłane**, leżą gotowe.

## Klasy
- **WYSŁANE-POTWIERDZONE** = wpis w pipeline.md z datą wysyłki, kanałem i potwierdzeniem ekranowym LUB auto-potwierdzenie mailowe.
- **NIEJASNE** = ślady sprzeczne albo częściowe.
- **NIE-WIDOCZNE** = brak jakiegokolwiek dowodu wysyłki; powód w kolumnie status (skip / oferta wygasła / czeka na klik).

## Źródła (Tor A + Tor B, tylko odczyt)
- `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Atomic/AI-wiki/projects/Rekrutacja/pipeline.md` (mtime 09.11 14:53)
- `~/Desktop/Aplikacje-CV/KLIKI-2026-11-09.md` (mtime 09.11 14:52)
- `~/Desktop/Aplikacje-CV/2026-11-05-SCORING/00-README.md`, `2026-11-05-LINKEDIN/`, `2026-11-06/*/DANE.txt`
- Atomic `oferty/2026-11-06 — human-in-the-loop AI sweep.md`, `oferty/natek-system-analyst-ai.md`
- Apple Mail read-only (osascript): inbox + spam + Sent, okno 03-09.11. Prośby o zgodę na automatyzację nie wystąpiły; niczego nie potwierdzano, nic nie wysłano.

## Tabela 1 — wysyłki z 05.11 (9 paczek, wszystkie potwierdzone)

| # | paczka | dzień | kanał wysyłki | dowód statusu | status |
|---|--------|-------|---------------|---------------|--------|
| 1 | Atos — Analityk Biznesowy (EN) | 05.11 | SuccessFactors (career5) | pipeline l.31: potwierdzenie ekranowe „application has been sent"; mail 05.11 11:45 „Thank You for Your Application to Atos" | WYSŁANE-POTWIERDZONE |
| 2 | Sii Poland — Business-System Analyst (job 38416) | 05.11 | si.pl formularz | pipeline l.32: potwierdzenie ekranowe „application has been submitted"; mail 05.11 11:34 „Sii - Thank you for your application!"; 06.11 16:08 „Sii - Your application has been registered" | WYSŁANE-POTWIERDZONE |
| 3 | Hays — B2B Project: AI Analyst | 05.11 | LinkedIn | pipeline l.33: potwierdzenie ekranowe; mail 05.11 11:36 „Twoja aplikacja została wysłana do Hays" | WYSŁANE-POTWIERDZONE |
| 4 | act digital (Alter Solutions) — AI Analyst | 05.11 | LinkedIn | pipeline l.34: potwierdzenie ekranowe; mail 05.11 11:37 „Twoja aplikacja została wysłana do act digital EMEA - Alter Solutions" | WYSŁANE-POTWIERDZONE |
| 5 | Xebia CEE — Data Governance / BA Consultant | 05.11 | Greenhouse | pipeline l.35: „wysłał Marcin ręcznie 05.11"; mail 05.11 10:07 „Thank you for applying to Poland and Central-Eastern Europe" (no-reply@xebia.com) | WYSŁANE-POTWIERDZONE |
| 6 | SmartLunch — Data Engineer | 05.11 | Traffit / Smart Tracker (thesmartjobs) | pipeline l.36: potwierdzenie ekranowe; mail 05.11 10:13 „Twój Smart Tracker dla Data Engineer"; mail 06.11 14:42 „SmartLunch - dziękujemy za aplikację do SmartLunch" (wanessa.mayer@smartlunch.pl) | WYSŁANE-POTWIERDZONE |
| 7 | Wavelength — Freelance AI Specialist (Claude) | 05.11 | Dover form | pipeline l.37: potwierdzenie ekranowe; brak auto-potwierdzenia mailowego (Dover go nie wysyła) | WYSŁANE-POTWIERDZONE |
| 8 | ITFS — AI Engineer (formularz spontaniczny) | 05.11 | elevato, 2-etapowy | pipeline l.38: potwierdzenie ekranowe „CV entered into our database"; mail 05.11 10:17 „ITFS sp. z o.o. - application" (system@elevato.net) | WYSŁANE-POTWIERDZONE |
| 9 | British Council — Business Analyst (Marketing Automation / CRM) | 05.11 | careers.britishcouncil.org | pipeline l.40: potwierdzenie ekranowe; mail 05.11 11:57 „British Council Careers - Application received" | WYSŁANE-POTWIERDZONE |

Zgodność z KLIKI-09.11 sekcja F: „13.11 — oferty z 05.11 (9 paczek)" — liczba pasuje 1:1.

Kontekst (nie paczka aplikacyjna): Connectis_ — mail strategiczny 05.11 12:03 do office.pl@connectis.pl, Sent+SMTP potwierdzone w pipeline l.39. Sent-box 03-09.11 zawiera dokładnie jeden mail: „Aplikacja: AI Engineer (B2B)" z 04.11 17:53 (ITFS). Zero maili wychodzących 05-06.11.

## Tabela 2 — paczki z 05.11 bez dowodu wysyłki (11)

| # | paczka | dzień | kanał wysyłki | dowód statusu | status |
|---|--------|-------|---------------|---------------|--------|
| 10 | NATEK — System Analyst - AI | 05.11 | strona NATEK (poza LinkedIn) | oferty/natek-system-analyst-ai.md: „status: PACZKA GOTOWA — czeka na klik Marcina"; zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 11 | Crisalix — AI Automation & Prototyping Intern | 05.11 | Personio | README 05.11 ~10:15: „OFERTA WYGASŁA: Personio zwraca 404 (...) Nie aplikować; folder = archiwum" | NIE-WIDOCZNE (oferta wygasła) |
| 12 | Portcast — Data Analyst Intern | 05.11 | Lever | README 05.11: „SKIP (twardy bloker lokalizacji)" — dropdown formularza tylko biura APAC | NIE-WIDOCZNE (skip) |
| 13 | MEDvidi — Marketing Data Analyst | 05.11 | himalayas/ATS | README 05.11: „SKIP (JD przeczytany w całości 05.11): must-have »Fluent Russian«, 5+ lat marketing analytics" | NIE-WIDOCZNE (skip) |
| 14 | Sophie.camp — GTM Engineer (n8n/Clay) | 05.11 | join.com | README 06.11: „C — decyzja Marcina (...) GO tylko na słowo Marcina"; flaga DE, zlecenie kończy się w listopadzie | NIE-WIDOCZNE (czeka na decyzję) |
| 15 | HeyContact — Data Analyst & Automation Engineer (n8n) | 05.11 | StepStone (Werkstudent) | README 06.11: „SKIP — Deutsch C1/C2/native wymagany + model Werkstudent" | NIE-WIDOCZNE (skip) |
| 16 | BancoPlata — Risk Data Analyst | 05.11 | formularz ATS | README 06.11: „SKIP — jawne »minimum 3 years risk and data analysis« + domena credit risk (CNBV/Banxico), hubsy MX/CY/ES/RS" | NIE-WIDOCZNE (skip) |
| 17 | Lingaro — RGM Data Analyst | 05.11 | Lever | sweep 06.11: „GO (2) — paczki gotowe, klik = Marcin"; KLIKI-09.11 A.8: „wysyłka = Twój klik"; zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 18 | YonderMedia — Business Intelligence Analyst | 05.11 | BambooHR | README 06.11: „SKIP — 12 tyg stara (posted 14.08) (...) = martwa" | NIE-WIDOCZNE (skip) |
| 19 | Capco — Data Analyst Python/SQL/PySpark (req 8349196) | 05.11 | Greenhouse | sweep 06.11: „GO — Greenhouse API: live, first_published 03.11"; KLIKI-09.11 A.7: „wysyłka = Twój klik"; zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 20 | ITFS — Analityk Biznesowo-Systemowy | 05.11 | solid.jobs | README 06.11: „SKIP — PUŁAPKA (reguła 11.06/12.06): twarde UML + Enterprise Architect w wymaganiach" | NIE-WIDOCZNE (skip; inna rola niż ITFS AI Engineer wysłana 05.11) |

## Tabela 3 — paczki z 06.11 (6, wszystkie gotowe i nietknięte)

| # | paczka | dzień | kanał wysyłki | dowód statusu | status |
|---|--------|-------|---------------|---------------|--------|
| 21 | Antal — AI Adoption & Enablement Lead (PL) | 06.11 | justjoin.it, przycisk Aplikuj do ATS Antal | KLIKI-09.11 A.1: „wysyłka = Twój klik", deadline 24.11; zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 22 | Ness Solution — AI Adoption Lead (PL) | 06.11 | justjoin.it, przycisk Aplikuj do ATS Ness | KLIKI-09.11 A.2: „wysyłka = Twój klik", deadline 24.11; zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 23 | Optiveum — Senior AI Adoption & Enablement Lead (EN) | 06.11 | career.optiveum.com (przycisk Apply) | KLIKI-09.11 A.3: „wysyłka = Twój klik"; zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 24 | Digital Forms — Business Analyst (EN) | 06.11 | Recruitee (publiczny, bez logowania) | KLIKI-09.11 A.4: „wysyłka = Twój klik"; paczka gotowa 06.11 13:58 (README); zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 25 | MMDSmart — AI Adoption Officer (EN, remote PL) | 06.11 | Workable | KLIKI-09.11 A.5: „wysyłka = Twój klik"; zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik) |
| 26 | Antheap — Konsultant AI i M365 dla MŚP (PL) | 06.11 | justjoin.it | KLIKI-09.11 A.6: „wysyłka = Twój klik" (C-flaga: luka M365/Power Platform); zero w pipeline, zero maila | NIE-WIDOCZNE (czeka na klik po decyzji) |

## Poza zakresem (05-06.11), ale ważne dla follow-upów
- 09.11 wysłane 4: apreel (13:26), Revvity, Trimble/Transporeon, Spyrosoft (~14:43) — auto-potwierdzenia mailowe 09.11 14:02-14:39 (myworkday.com x2, teamtailor-mail.com); follow-up 16.11. Potwierdza, że mechanizm mailowych auto-potwierdzeń działa i że jego brak dla paczek 05-06.11 jest wymowny.
- Sweep 06.11, sekcja Back-prop: „Pipeline brakuje wierszy: Fundacja Lekarze (04.11, traffit), DCG Analityk IT + Systemowy (04.11). DCG Data Engineer 7050 — status nieznany (pytanie do Marcina)" — to paczki z 04.11, osobny wątek.
- Mail 09.11 16:08 „Sii - Status of your application" (rekrutacja-wroclaw@sii.pl) = notyfikacja istniejącej aplikacji Sii z 05.11, nie nowa wysyłka.
- Spam: 20 wiadomości z okna 6 dni, zero potwierdzeń ATS.
- Screenshot „Screenshot 2026-11-06 at 9.55.42 AM.png" z Desktopu = zdjęcie prywatne (sala terapii, zero treści rekrutacyjnych; sprawdzone wizualnie). Zresztą czas 09:55 poprzedza budowę paczek 06.11 (13:58-14:44), więc nie mógłby być ich potwierdzeniem.

## Wnioski operacyjne
1. **Follow-up 13.11 jest uzasadniony**: wszystkie 9 paczek z 05.11 realnie wysłane i potwierdzone.
2. **8 paczek gotowych czeka na klik Marcina**: 6 z 06.11 + Capco DA (Greenhouse) + Lingaro RGM (Lever). Najwyższy priorytet czasowy: Antal i Ness (deadline 24.11); Lingaro (Lever) i MMDSmart (Workable, ~2 mies stara) — ryzyko wygaśnięcia.
3. Pytanie nocne „paczki z 06.11 status niejasny" — zamknięte: cztery źródła zgodne, paczki nie wysłane.
4. Gdzie szukać po kliku: pipeline.md + przekreślenie w KLIKI dnia (procedura rekrutacja, krok 7).

## Ograniczenia i uczciwość zapisu
- Wyłącznie odczyt: nic nie wysłano, nie odpowiadano, nie klikano formularzy, nie potwierdzano okien systemowych.
- Klasyfikacja WYSŁANE-POTWIERDZONE dla Wavelength opiera się wyłącznie na wpisie pipeline (potwierdzenie ekranowe z dnia wysyłki) — brak niezależnego śladu mailowego, bo Dover auto-potwierdzeń nie wysyła.
- Kanał SmartLunch: pipeline pisze „Traffit (Smart Tracker live)", mailowa ścieżka idzie przez thesmartjobs.com (Smart Tracker) + human-mail smartlunch.pl — rozbieżność nazwy narzędzia, nie statusu.
- Wysyłki 05.11 z folderu 2026-11-04-WYSYLKA (Xebia, SmartLunch, ITFS AI Engineer) i z puli CV-DO-UPLOADU (Atos, Sii, Hays, act digital) są przypisane do dnia wysyłki 05.11, nie do dnia zbudowania paczki.
- Stan danych: pipeline.md 09.11 14:53, KLIKI-09.11 14:52, skrzynka odczytana 09.11 ~17:30 CET. Wysyłka po tych godzinach byłaby widoczna dopiero w kolejnym odczycie.
