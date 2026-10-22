# Use-case'y AI w polskim sporcie — research pod skille implementacyjne

**Data:** 2026-10-20  
**Autor researchu:** Hermes Agent (subagent)  
**Cel:** materiały pod skille implementacyjne AI w sporcie MŚP — FAKTY z URL + rok  
**Metoda:** web_search (8 zapytań), web_extract (3 strony), konsolidacja

---

## WERDYKT

W polskim sporcie AI weszło w fazę **praktyczną**, ale skupia się głównie na wielkich ligach (Ekstraklasa, NBA, NFL) i dużych klubach (Wisła Kraków). Dla małego klubu MŚP-owego rynek narzędzi powoli dojrzewa — Sportigio i Klubownik to pierwsze polskie SaaS-y z wbudowaną AI. Kluczowa luka: brak rozwiązań AI specyficznie zaprojektowanych dla klubów amatorskich/MŚP-owych poniżej 3 ligi. Większość „AI” sprowadza się do generowania postów/newsletterów — głęboka analityka jest domeną tylko największych struktur.

---

## 1. CO JUŻ DZIAŁA W POLSKIM SPORCIE

### Tabela: Działające przykłady

| Co | Kto / Gdzie | Źródło + Rok |
|----|-------------|--------------|
| STATSCORE jako oficjalny dostawca danych dla kobiecej Ekstraligi i męskiej II Ligi | Polskie Związki Piłkarskie / Ekstraliga Kobiet / II Liga | [STATSCORE News](https://www.statscore.com/news-center/statscore-news/statscore-becomes-official-data-provider-for-polish-ekstraliga-and-2-liga/) — data publikacji niejawna; kontekst 2024–2025 |
| Ekstraklasa SA: Analytics Data Package + Opta Live Premium od Stats Perform | PKO Bank Polski Ekstraklasa SA | [Raport Ekstraklasa 2024/25 ENG](https://cms.ekstraklasa.org/documents/14/Raport_Ekstraklasa_2024_25_wersja_angielska.pdf) — s. 6, sekcja partnerzy — rok 2025 |
| Wisła Kraków: AI Agent — konwersacyjny asystent na stronie klubu odpowiadający na pytania kibiców o wyniki, harmonogram, historię, sklep | TS Wisła Kraków SA | [wislakrakow.com/en/pages/wisla-krakow-ai-agent](https://wislakrakow.com/en/pages/wisla-krakow-ai-agent) — testowany >1 rok przed launchem; rok 2025/2026 |
| Wisła Kraków: Lucky Fan Index — algorytm AI analizujący ~250k kibiców, ich frekwencję i formację zespołu (>200 wymiarów analitycznych) korelujące z frekwencją na stadionie | TS Wisła Kraków SA | [wislakrakow.com/en/blogs/news](https://wislakrakow.com/en/blogs/news/wisla-krakow-policzyla-szczescie-przynoszone-jej-przez-kibicow-startuje-lucky-fan-index) — rok 2025/2026 |
| Sportigio AI Assistant — polska platforma SaaS z wbudowaną AI do pisania preview/meadow/reports/newsletterów na podstawie danych klubu (skład, terminarz, historia) | Sportigio (bracia Zwierzychowscy); inwestorzy: Zbigniew Jagiełło, WP2 Investments | [get.sportigio.com/en/ai-assistant](https://get.sportigio.com/en/ai-assistant) + [o-nas](https://get.sportigio.com/pl/o-nas) — rok 2024–2026 |
| Klubownik AI Assistant — polski CRM dla klubów (martial arts/shooting/universal) z natywnym AI do pytań typu „ile zaległych płatności”, raporty kwartalne, push-notyfikacje automagiczne | Klubownik (Michał Szymanowski, MMA/A&R Academy, 220+ zawodników) | [klubownik.pl/en/features](https://klubownik.pl/en/features) — cennik od PLN 49/mies; lata 2025–2026 |
| PZPN Innovation Hub — szuka rozwiązań AI/tech do fan engagement na platformie PZPN+ (gamification, personalization, content creation) | Polski Związek Piłki Nożnej | [laczynaspilka.pl/innovation-hub](https://laczynaspilka.pl/innovation-hub) + GSIC/TISA reports — rok 2025–2026 |
| AI w Premier League / CFG (wzorzec do cytowania): City Football Group Data Insights Team zbiera i analizuje dane meczowe, sprzedaży biletów, marketingu, interakcji z fanami; InStat Scout do scoutingu; Catapult/Kitman Labs do monitorowania zdrowia i ryzyka kontuzji | Manchester City / CFG / FIFA agents | [weszlo.com](https://weszlo.com/2023/04/18/ai-sztuczna-inteligencja-premier-league-analiza-podsumowanie/) — rok 2023; [fifa.sportsagentinstitute.com/en/blog/instat](https://fifa.sportsagentinstitute.com/en/blog/instat) |

### UWAGI DO SEKCJI 1:
- **Brak danych** o systemach AI działających bezpośrednio w/amatorskich klubach MŚP-owych (poza Sportigio/Klubownik, które to obsługują).
- **Brak danych** o publicznych przykładów użycia AI w akademii klubowych poza Big 3 (Wisła, Ekstraklasa SA, Legia/Lechia — nieznane publicznie).
- Wszystkie przykłady Ekstraklasy = dane dostarczane przez ligę, nie implementowane samodzielnie przez małe kluby.

---

## 2. USE-CASE'Y MŚP-OWE — co da się zrobić na REALNYCH danych małego klubu

Klient ma: skład (lista zawodników), terminarz, frekwencję (liczby z wejściówek/kontrol), media społecznościowe (FB/IG), zgłoszenia (rekrutacja, problemy administracyjne).

### Tabela: Use-case'y

| Use-case | Jakie dane potrzebne | Trudność | Źródło / Uwagi |
|----------|---------------------|----------|----------------|
| **Automatyzacja komunikacji z kibicami** (preview przed meczem, po meczu, newsletter, push-notyfikacje) | Skład, terminarz, wynik/meadow, baza email/kibic | Niska | Sportigio AI Assistant robi to już (2026); Klubownik CRM z automations (2026). Pattern: szablon → AI enriches z kontekstu klubu → publikacja na kanałach. |
| **Raporty frekwencyjno-finansowe** (weekly/monthly dashboard: bilety vs wydatki, sponsorship performance) | Frekwencja po meczach, przychody, wydatki | Niska | To można zrobić z dostępnych danych — AI summarizer nad tabelą Excel/CSV. Brak gotowego narzędzia dedykowanego, ale prosty workflow LLM + CSV. |
| **Skan/OCR dokumentów i zgłoszeń** (zgłoszenia szkoleniowe, umowy, faktury, wnioski sponsorów) | PDF/obrazy dokumentów | Średnia | Standardowy pipeline OCR (Tesseract/PDFplumber) + LLM klasifikacja. NIE dotyczy RODO-sensitive bez human-in-the-loop. |
| **Media clipping / social listening** (co piszą o klubie: newsy, blogi, FB comments, X posts) | URL-e źródeł lub RSS | Niska | Web search + LLM sumarizer. Can be done weekly as cron job. |
| **Wsparcie administracyjne akademii** (harmonogram treningów, przypomnienia o płatnościach, ewidencja uczestników, powiadomienia rodziców) | Lista zawodników, grupy wiekowe/klas, płatności, terminarz | Niska | Klubownik CRM to robi natywnie (segregation, reminders, pushes). To gotowy produkt do polecania. |
| **Generowanie raportów sponsorskich** (jak wygląda ekspozycja brandowa po meczach, ile zasięgów mają posty ze sponsorami) | Posty FB/IG, wyniki meczów, logi sponsorów | Średnia | AI może aggregować engagement metrics + match results w ładnym raporcie. Brak dedykowanego narzędzia. |
| **Liga tablice / zgłoszenia ligowe** (automatyczne wypełnianie formularzy ligowych na podstawie wyników) | Wyniki meczów, klasyfikacja | Niska | Prosty crawler/sumarizer tabel ligowych + generowanie dokumentów. Mogą być wymagania formatowe różne (PZPN, liga okręgowa itp.) |
| **Scouting lokalny / talent identification** (analiza zawodników z niższych lig regionu) | Dane meczowe, statystyki podstawowe | Średnia | STATSCORE SportsAPI start = €1000+/mies — drogie dla MŚP. Alternative: manual video analysis + AI tagging (przepływ pracy, nie produkt). |
| **Personalizacja oferty dla kibica** (proponowanie konkretnych biletów/packów osobom na podstawie historii zakupów) | Historia zakupów, demografia kibiców, preferencje | Średnia | Potrzebna segmentacja + recommendation engine. Sportigio buduje „intelligent suggestions” (2026), ale to roadmap, nie production feature yet. |

---

## 3. CZEGO NIE TYKAĆ (linie bezpieczności)

| Obszar zakazu | Dlaczego | Podstawa |
|---------------|----------|----------|
| **Decyzje trenerskie / dobór składu** (AI rekomendująca who plays, tactics) | Wyrok sportowy = wyłączna strefa trenera. AI-only recommendation without human = liability risk. Reguła wewnętrzna MJ.OLDAK — zero black box w sport decision-making. | Zasada: AI as decision-support ONLY, never decision-maker in sports context. Analogia: Catapult/Kitman Labs MONITORUją, decyduje człowiek. |
| **Dane medyczne i zdrowotne zawodników** (HR monitoring, injury prediction without medical professional) | RODO Art. 9 = special category data (health). Kluby amatorskie NIE mają infrastruktury RODO-compliant do przetwarzania health data. | [RODO w sporcie](https://prawopilkarskie.pl/rodo-czyli-ochrona-danych-osobowych-w-sporcie/) — ogólny framework; klauzule informacyjne akademi piłkarskich wymagają DPIA. |
| **Dane niepełnoletnich** (młodzieżowe sekcje klubów, akademia) | RODO Art. 8 = age of consent 16 (w PL parent/guardian consent required for <16). Kluby amatorskie rzadko posiadają proper consent mechanisms. | [Klauzula informacyjna Akademia Piłkarska Miedź Legnica](http://pliki.miedzlegnica.eu/files/Klauzula_informacyjna_Akademia_Pilkarska_07-20211628670153.pdf) — przykładowy model RODO compliance. |
| **Scraping danych bukmacherów** (kursy, odds movements, betting patterns) | Towar chroniony Opta / Stats Perform (ToS dostawcy) — terms of service zabraniają scrapingu. Risk: legal action from data providers + reputational damage. | Reguła wewnętrzna: NIE scrapujemy danych komercyjnych bukmacherów. Publiczne kursy (np. totalizator) — borderline, oznaczyć jako ryzyko prawne. |
| **Automatyczna komunikacja z kibicami BEZ nadzoru człowieka** (posty publikowane autonomicznie bez review) | Risk: AI może generować treści kontrowersyjne/offensive. Przykład: ChatGPT w 2023 generował błędne info o wojnie. W sporcie: faux pas może kosztować sponsorów. | Reguła wewnętrzna: every AI output goes through human review before publishing. |

---

## 4. DOSTAWCY DANYCH W POLSCE DLA KLUBÓW

| Dostawca | Co oferuje | Poziom klubu | Cena | Źródło |
|----------|-----------|-------------|------|--------|
| **STATSCORE** (Katowice, nabyty przez LSports za kilka mln EUR) | SportsAPI (REST JSON, 40+ sportów, 14k+ comp, real-time live feed + pre/post-match data, xG, Player Ratings) | Od Amaterskiej po Top League | STARTER/EDGE/ELITE/LEGEND tier — ceny od ~€1,000/mies | [statscore.com/products/sportsapi](https://statscore.com/products/sportsapi) + [forbes.pl](https://www.forbes.pl/biznes/statscore-dostawca-danych-sportowych-z-katowic-rzuca-wyzwanie-najwiekszym-graczom-w/fqhwb38) — rok przejęcia niejawny, kontekst 2024/2025 |
| **Sportigio** | Platforma all-in-one: website + tickets + store + newsletters + club app + AI Assistant. Sports data built-in (fixtures, tables, squads). | MŚP-amatorskie po Ekstraksę | ~PLN 100–500/mies (standard plans); Champion plan = customized | [get.sportigio.com/en](https://get.sportigio.com/en) — rok 2024–2026 |
| **Klubownik** | CRM dla klubów: registrations, payments, docs, comms, mobile app (PWA), website builder, AI assistant, KSeF integration, Stripe. | Martial arts / shooting / universal (football coming soon) | od PLN 49/mies | [klubownik.pl/en](https://klubownik.pl/en) — lata 2025–2026 |
| **Ekstraklasa SA / Stats Perform (Opta)** | Match events data, analytics metrics, Live Premium platform | Eksclusively dla klubów Ekstraklasy (via league partnership) | Included in league deal (not direct purchase by individual clubs) | [Ekstraklasa Report 2024/25](https://cms.ekstraklasa.org/documents/14/Raport_Ekstraklasa_2024_25_wersja_angielska.pdf) — s. 6 — rok 2025 |
| **InStat Sport** (Irlandia/Szwecja, acquired by Hudl 2018) | Video + stats analysis, Scout platform, statistical reports | Professional clubs, FIFA agents | Pricing not public; premium product | [Hudl blog](https://www.hudl.com/blog/hudl-instat) — 2018 acquisition; [fifa.sportsagentinstitute.com](https://fifa.sportsagentinstitute.com/en/blog/instat) |

---

## 5. LUKN (czego nie znalazłem)

| Czego szukałem | Wynik |
|---------------|-------|
| AI w AMATORSKICH/III-IV lidze polskich klubach piłkarskich | **Brak danych.** Żaden publiczny przykład AI wdrożenia w klubie amatorskim poniżej Ekstraklasy. |
| Open-source'owe modele/trendy AI dla małych klubów | **Brak danych.** Nie znalazłem żadnych open-source'owych projektów skierowanych do klubów amatorskich. |
| Darmowe/niskokosztowe AI tools dla klubów (open source, grants) | **Brak danych.** Wszystkie_found solutions requiring paid subscriptions (Sportigio, Klubownik, STATSCORE). |
| Case study: jak konkretne małe wdrożenie AI wpłynęło na budżet/frekwencję klubu | **Brak danych.** Tyko aspiracje i roadmapy (Sportigio „intelligent suggestions coming”), nie real-world results z małych klubów. |
| Integracje API między klubowymi systemami (CRM ↔ ticketing ↔ social media) | **Brak danych.** Club integrations ecosystem is nascent — no unified „club OS” connector market in Poland yet. |
| Dane o efektywności AI w zmniejszeniu work/admin burden klubów | **Brak danych.** Zero metrics on time/cost savings for clubs using AI tools. |

---

## STRUKTURA SYSTEMU DO IMPLEMENTACJI SKILLI

```
SPORT-AI-SYSTEM (modułowy, layered):

Layer 0 — Infrastructure (RUCHOMA BASE)
├── SportsAPI (STATSCORE) ← if budget allows
├── Website CMS (Sportigio/WordPress)
├── CRM (Klubownik/Sportigio own CRM)
└── Social Media Channels (FB/IG/X)

Layer 1 — Automated Communication Engine
├── Template Library (match previews, post-match reports, newsletters)
├── Context Enrichment (pull from CRM/fixtures/social)
├── Multi-channel Publisher (FB/IG/email/SMS)
└── Human Review Gate (before publish)

Layer 2 — Data Dashboard & Reporting
├── Weekly Reports (attendance + revenue summary)
├── Sponsorship Performance Dashboards
├── Media Clipping Aggregator
└── League Table Auto-fetcher

Layer 3 — Admin Support (Academy)
├── Attendance Tracking (mobile PWA)
├── Payment Reminders (auto-push/email)
├── Document Management (upload/classify/OCR)
└── Parent Communication Portal

Layer 4 — Intelligence (Advanced / Future)
├── Fan Segmentation + Recommendation
├── Local Scouting Analysis (video + AI tagging)
└── Predictive Models (injury risk — MEDICAL REVIEW REQUIRED)
```