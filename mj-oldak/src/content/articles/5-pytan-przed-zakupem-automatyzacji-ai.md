---
title: "5 pytań, które musisz zadać przed zakupem automatyzacji AI — checklist dla MŚP"
excerpt: "Gartner szacuje, że 80% projektów AI nie wyjdzie z pilota. Zanim podpiszesz umowę z vendorem, przejdź przez te 5 pytań — plus red flags i checklist compliance."
publishedAt: 2026-05-02
author: "Marcin Ołdak"
category: "edukacja"
tags: ["automatyzacja", "koszty", "compliance", "ai-act"]
cover: "/articles/covers/5-pytan-przed-zakupem-automatyzacji-ai.jpg"
coverAlt: "Cover artykułu: 5 pytań przed zakupem automatyzacji AI"
readingTime: 12
featured: true
draft: false
metaTitle: "5 pytań przed zakupem automatyzacji AI — checklist MŚP 2026"
metaDescription: "Kompletny checklist przed zakupem AI: problem, dane, champion, TCO 3 lata, exit clause. Plus red flags, RODO, AI Act i przykładowe SLA."
keywords: ["zakup ai", "tco automatyzacji", "ai act msp", "rodo ai", "dpa sub-processors", "soc 2 iso 27001", "due diligence ai vendor", "automatyzacja dla msp"]
---

Gartner szacuje, że **80% projektów AI nie wyjdzie z pilota**. Nie dlatego, że technologia nie działa — dlatego, że została kupiona pod złe pytanie.

Ten artykuł to checklist, który przerabiam z każdym klientem przed podpisaniem umowy na automatyzację. 5 pytań do siebie, 5 do vendora, plus red flagi które powinny zakończyć rozmowę w 10 minut. Piszę go po roku wdrożeń w polskich biurach rachunkowych i MŚP — czyli po kilku projektach, które się zwróciły i kilku, które zostawiłem bez podpisu umowy, bo liczby się nie spinały.

Jeśli rozważasz zakup jakiegokolwiek narzędzia AI w najbliższych miesiącach — przeczytaj do końca. Jedno źle zadane pytanie na początku kosztuje potem 6-12 miesięcy i budżet, który mógł zostać w firmie.

## Pytanie 1: Jaki konkretny problem ma rozwiązać AI?

Najczęstszy błąd, który widzę u właścicieli MŚP: **"chcemy być bardziej efektywni"**, **"chcemy wdrożyć AI"**, **"konkurencja już ma, to my też musimy"**.

To nie są problemy. To są hasła.

Problem brzmi tak:

> *"Trzech pracowników w dziale księgowym spędza po 4 godziny dziennie przepisując dane z faktur do Comarch Optima. 12 roboczogodzin × 21 dni × 80 zł/h = 20 160 zł miesięcznie tracone na czynność, która nie wymaga człowieka."*

Zauważ co się zmieniło. Mamy:

- **Kogo** dotyczy (3 pracowników, dział księgowy)
- **Co** robią (przepisywanie danych)
- **Ile czasu** zajmuje (4h/dzień)
- **Ile kosztuje** (20 160 zł/mies)
- **Jaki system** docelowy (Comarch Optima)

Dopiero tak sformułowany problem pozwala ocenić, czy automatyzacja AI ma sens, a jeśli tak — jakiej dokładnie. Napisałem o metodologii liczenia tego kosztu osobny artykuł: [ile kosztuje godzina ręcznego przepisywania danych](/artykuly/ile-kosztuje-godzina-recznego-przepisywania-danych/).

### Test "mierzalnego kosztu"

Zanim pójdziesz na rozmowę z jakimkolwiek vendorem AI, odpowiedz sobie na 4 pytania o proces, który chcesz zautomatyzować:

1. Ile osób się nim zajmuje?
2. Ile godzin miesięcznie łącznie?
3. Jaki jest koszt tych godzin (stawka × czas + narzut pracodawcy ~30%)?
4. Jaki jest koszt **błędów** (pomyłki w fakturach, opóźnione deadliny, niezadowoleni klienci)?

Jeśli suma tych kosztów nie przekracza **~30 000 zł rocznie** — nie ma sensu uruchamiać projektu AI. Wdrożenie nie zwróci się w 12 miesiącach, a to jest minimalny próg rozsądku.

## Pytanie 2: Jakie dane mam i jakiej jakości?

AI karmi się danymi. Jeśli masz fakturowanie w zeszytach, umowy skanowane w jakości 200 dpi z artefaktami JPG, a historia klientów siedzi w głowie recepcjonistki — nie jesteś jeszcze gotowy na AI. Musisz najpierw cyfryzować.

Pertama Partners publikuje framework readiness dla MŚP, który stosuję u klientów. Pytania do sprawdzenia:

- **Cyfrowa historia**: czy masz **minimum 12 miesięcy** danych w formacie cyfrowym (baza, CRM, system księgowy — nie PDF-y i nie skany)?
- **Format**: czy dane są w jakiś standaryzowanym formacie? Eksportuje się je bez ręcznej obróbki?
- **Dostęp**: czy masz API, eksport CSV, albo przynajmniej bazę SQL, do której można się podłączyć?
- **Rzetelność**: czy dane są aktualne i poprawne, czy też jest 30% "brudnych" rekordów wymagających czyszczenia?

Brzmi restrykcyjnie — ale bez tych warunków każda automatyzacja będzie drogim eksperymentem.

### Przykład: biuro rachunkowe, które nie było gotowe

W 2025 rozmawiałem z biurem 8-osobowym z Małopolski. Chcieli agenta OCR do faktur. Wszystko brzmiało dobrze — do momentu, aż spytałem o to, jak archiwizują faktury klientów. Okazało się, że:

- Każdy klient wysyła faktury mailem w formacie, jaki chce (PDF, JPG, skany telefonem)
- Nikt nie nadaje im struktury folderów
- 40% jest niskiej jakości (zdjęcia pod kątem, rozmazane)
- Nie ma archiwum starszego niż 3 miesiące — wszystko w skrzynkach mailowych pracowników

Zaproponowałem najpierw 6 tygodni porządkowania digital workflow (standard upload portal, wymaganie minimalnej jakości, centralne archiwum). Dopiero potem OCR. Klient nie był gotowy na to mentalnie — chciał "AI od razu". Zrezygnowałem z projektu, bo wiedziałem, że się nie zwróci.

Dwa miesiące później inni wdrożyli u nich tanie narzędzie SaaS. Dokładnie tak jak przewidywałem — po 8 tygodniach projekt został zawieszony, bo "OCR nie działa". OCR działał. Dane były złe.

## Pytanie 3: Kto będzie championem wdrożenia?

**Champion** to osoba z firmy, która:

- Rozumie proces, który automatyzujesz (lub jest gotowa się nauczyć)
- Ma autorytet żeby podejmować decyzje (nie musi pytać prezesa o każdą zmianę)
- Ma **minimum 4 godziny tygodniowo** przez pierwsze 3 miesiące na projekt
- Traktuje to jak swój sukces, nie jako obowiązek "z góry"

Bez championa każda automatyzacja zostaje **shelfware** — narzędziem kupionym, zainstalowanym, nigdy niezaadoptowanym. Gartner szacuje, że 37% licencji SaaS w enterprise to shelfware. W MŚP bywa gorzej, bo mniej osób = mniej dyfuzji know-how.

### Test championa

Zadaj kandydatowi na championa 3 pytania:

1. "Co byś zmienił w tym procesie, gdybyś mógł?"
2. "Czy możesz poświęcić 4h/tydz przez 3 miesiące, jeśli zmniejszymy Twoje inne obowiązki?"
3. "Kogo w zespole przekonasz jako pierwszego, jak to zadziała?"

Jeśli odpowiedzi są mgliste ("no, ja się nie znam na IT", "muszę spytać prezesa", "nie wiem, każdy robi swoje") — nie masz championa. Odłóż projekt albo znajdź kogoś innego.

## Pytanie 4: Jaki jest realny TCO przez 3 lata?

TCO (Total Cost of Ownership) to nie "cena z cennika × 12 × 3". To cena z cennika **plus wszystko, co vendor woli ukryć**, bo nie wygląda to dobrze na slajdzie.

Oto co realnie płacisz:

### Wdrożenie (rok 1)

| Pozycja | Typowy koszt |
|---------|--------------|
| Licencja / subskrypcja | 100% ceny z cennika |
| Professional services / onboarding | 15-30% kosztu licencji rocznej |
| Szkolenia zespołu | 5-15% kosztu licencji |
| Customizacja / konfiguracja | 10-25% |
| Integracje z istniejącymi systemami | **40% wyższe niż zakładano** (HBR) |
| **Łącznie rok 1** | **~170-220% ceny z cennika** |

### Koszty operacyjne (miesięcznie, lata 1-3)

- **Data egress** — $0,08–0,12 za GB (AWS CloudFront). 50 GB/dzień = ~180 USD/mies (720 zł)
- **API overages** — gdy przekraczasz limity (często nieuniknione przy automatyzacji)
- **Storage** — historia transakcji, logów, backupów. Rośnie liniowo.
- **Support tier** — standardowy często nie wystarcza; enterprise tier = +30-50%

### Co vendor przemilczy

- Zmiana pricingu po renewal (średnio +12% rocznie w SaaS)
- Nowe moduły potrzebne za 6 mies, nie wliczone w pierwotny kontrakt
- Dedicated TAM (Technical Account Manager) wymagany dla szybkiego supportu
- Koszt custom'ów, gdy Twoje dane nie pasują idealnie do ich modelu

### Przykład liczenia realnego TCO

Klient (biuro rachunkowe, 15 osób) dostał ofertę od dostawcy AI za **2 500 zł/mies**. "Tanio" — pomyślał. Rozbiłem ofertę:

| Rok | Licencja | Implementacja | Szkolenia | Integracje | Egress/API | Support | Razem |
|-----|----------|---------------|-----------|------------|------------|---------|-------|
| 1 | 30 000 | 9 000 | 4 000 | 18 000 | 2 400 | 0 | **63 400 zł** |
| 2 | 33 600 (+12%) | — | 2 000 | — | 3 200 | 6 000 | **44 800 zł** |
| 3 | 37 600 | — | — | 6 000 (nowy moduł) | 4 000 | 6 500 | **54 100 zł** |

Realne 3-letnie TCO: **~162 300 zł**. Cennikowe: 90 000 zł. Różnica: 72 tys. zł czyli +80%.

Flexera 2024 podaje, że **29% budżetu SaaS w firmach jest tracone** przez brak widoczności cen. Liczba zgadza się z moją praktyką.

## Pytanie 5: Jak wygląda exit clause?

To jest pytanie, którego **nikt nie zadaje** na początku — i każdy żałuje, że nie zadał, kiedy przychodzi do zmiany dostawcy.

Exit clause to sekcja umowy, która opisuje:

- **W jakim terminie** możesz wypowiedzieć umowę (standardowo 30-60 dni, negocjuj 2 miesiące)
- **Jakie są opłaty** za wcześniejsze zakończenie (cap na 2-3 miesiące opłat — nie więcej)
- **W jakim formacie** dostaniesz swoje dane (CSV, JSON, SQL dump — konkretnie)
- **Czy vendor "odumiezi"** (model unlearning) — usuwa Twoje dane ze swoich modeli
- **Kto płaci** za migrację (w Data Act 2025 od stycznia 2027 — vendor nie może pobierać opłat za switching)

### EU Data Act 2025 — co Cię obejmuje

Rozporządzenie (UE) 2023/2854 weszło w życie we wrześniu 2025. Kluczowe punkty:

- **Prawo do portowalności danych** — vendor musi dostarczyć Twoje dane w formacie strukturalnym
- **Zakaz pobierania "switching charges"** — od 12 stycznia 2027 vendor nie może pobierać opłat za zmianę dostawcy (obecnie opłaty muszą być "reasonable" i kosztochłonne)
- **Termin wypowiedzenia** — maksymalnie 2 miesiące
- **Ciągłość serwisu** podczas transferu — vendor ma obowiązek nie przerwać usługi

To twarde prawo UE. Polscy vendorzy często jeszcze o tym nie wiedzą — ale dla Ciebie to pole do negocjacji już dziś.

### Co wpisać do umowy

Minimum to:

1. **Data portability clause** — vendor dostarcza Twoje dane w ustandaryzowanym formacie (CSV/JSON) w 30 dni od wypowiedzenia
2. **Model unlearning** — vendor potwierdza usunięcie Twoich danych (także z modeli wytrenowanych) w 60 dni
3. **Transition support** — minimum 40 godzin supportu przy migracji do nowego dostawcy, wliczone w umowę
4. **SLA credits scaling** — kredyty za naruszenie uptime rosną z liczbą naruszeń; prawo wypowiedzenia po 3 naruszeniach w 12 miesiącach bez opłat

## Red flags — kiedy wyjść z rozmowy

Są rzeczy, które powinny zakończyć rozmowę z vendorem natychmiast. Nie "przemyślmy to" — tylko "dziękuję, do widzenia".

### Dyskwalifikujące (koniec rozmowy)

- **Unik przy pytaniach o dane**. "Nasze dane są bezpieczne" to nie odpowiedź. Odpowiedź to: *"Szyfrujemy AES-256 at rest, TLS 1.2+ in transit, hosting w regionie Frankfurt, DPA i lista sub-processorów wysłana w 24h"*. IBM raportuje, że średni koszt wycieku danych w 2024 to **4,88 mln USD**. To nie jest temat do "przemyślenia".
- **Brak SOC 2 Type II / ISO 27001 / pentest w ostatnich 12 miesiącach**. Jeśli vendor ma tylko SOC 2 Type I ("point-in-time") zamiast Type II ("6-12 mies ciągły audyt") — to red flag.
- **Brak podpisanej DPA** (Data Processing Agreement, art. 28 RODO). Bez tego **Ty** łamiesz RODO.

### Wysokie ryzyko (pytaj głębiej, zwykle lepiej odpuścić)

- **"99% accuracy"** bez kontekstu. 99% czego? Na jakim datasecie? W jakim tempie? CB Insights pokazuje, że **50% startupów AI z Series A 2021 zamkniętych do 2024**. "99% accuracy" w pitchu zazwyczaj oznacza cherry-picked test set.
- **Brak referencji produkcyjnych >6 mies**. Jeśli najstarszy klient używa ich rozwiązania 3 miesiące — jesteś early-adopter. Z tego wynikają konsekwencje.
- **Ukryty pricing** — "skontaktuj się z sprzedażą o cenę". To zwykle znak, że cena zależy od Twojej szacowanej "gotowości do zapłaty", nie od kosztów vendora.
- **Mgliste harmonogramy** — "powinno być gotowe w kilka tygodni". McKinsey raportuje **35-50% przekroczeń timeline'u** w projektach AI. Oczekuj konkretnej daty z karami umownymi.

### Inne czerwone flagi

- "AI" jest hasłem marketingowym, nie konkretną funkcjonalnością (vendor nie potrafi wytłumaczyć, jaki model używa)
- Brak opcji on-premise / private cloud / data residency w EU
- Słaby support już w fazie sprzedaży (nie odpisują 24h, spotkanie przesuwane 3x)

## Checklist compliance — co sprawdzić przed podpisaniem

Tu nie ma pola do negocjacji. Te rzeczy muszą być.

### Certyfikaty i audyty

- [ ] **SOC 2 Type II** (nie Type I — różnica fundamentalna)
- [ ] **ISO 27001** (lub odpowiednik ISO 27701 dla danych osobowych)
- [ ] **Pentest** w ostatnich 12 miesiącach (raport dostępny do wglądu pod NDA)
- [ ] **EU AI Act readiness** — vendor wie, w jakiej kategorii ryzyka jest jego system

### RODO (art. 28 — przetwarzanie w imieniu administratora)

- [ ] **DPA podpisana** przed rozpoczęciem przetwarzania
- [ ] **Lista sub-processorów** (vendor musi powiadamiać o zmianach)
- [ ] **Data residency w UE** — minimum SCC (Standard Contractual Clauses) jeśli poza UE
- [ ] **Polityka retencji** — jak długo trzymają Twoje dane, kiedy kasują
- [ ] **Twoje dane NIE do trenowania modelu** — explicit wyłączenie w umowie
- [ ] **Procedura DSR** (Data Subject Rights) — prawo do bycia zapomnianym, dostępu, sprostowania

### Audyt i bezpieczeństwo techniczne

- [ ] **DPIA** przeprowadzona (Data Protection Impact Assessment — dla wysokiego ryzyka)
- [ ] **Prawo do niezależnego audytu** — Ty możesz zlecić audyt vendora (zwykle raz/rok, na Twój koszt)
- [ ] **Szyfrowanie** — AES-256 at rest, TLS 1.2+ in transit, minimum
- [ ] **MFA** dla wszystkich kont administracyjnych po stronie vendora

### Polski kontekst i AI Act

- **UODO** (Urząd Ochrony Danych Osobowych) aktywnie monitoruje wdrożenia AI. Kary RODO do **20 mln EUR lub 4% globalnego obrotu**.
- **AI Act** (Rozporządzenie 2024/1689) — kary do **35 mln EUR lub 7% globalnego obrotu**. Dotyczy Cię, jeśli używasz AI.
- Klasyfikacja systemu AI: niskiego, ograniczonego, wysokiego ryzyka lub niedopuszczalne. Automatyzacja księgowa zazwyczaj = **ograniczone ryzyko** (obowiązek transparentności). Ocena zdolności kredytowej = **wysokie ryzyko** (pełen compliance framework).

## Custom vs off-the-shelf — matryca decyzyjna

Największy dylemat: kupić gotowe narzędzie SaaS czy zamówić custom development?

### Liczby, które warto znać (2026)

- **SaaS off-the-shelf** ma **56% niższe 3-letnie TCO** niż custom build (M Accelerator 2026)
- Koszty integracji SaaS są **40% wyższe** niż firmy zakładają (HBR)
- **31% projektów AI w mid-market** osiąga pełną produkcję (McKinsey — reszta ląduje w pilocie)
- **67% hybrydowych rozwiązań** kończy się sukcesem vs **33% wewnętrznych buildów** (go-globe.com)
- Maintenance: **15-20%/rok** dla SaaS, **20-35%/rok** dla custom

### Kiedy off-the-shelf wygrywa

- Potrzebujesz szybko (2-8 tygodni do działania)
- Proces jest typowy dla branży (fakturowanie, CRM, dokumenty)
- Integrujesz się z popularnymi systemami (HubSpot, Salesforce, QuickBooks)
- Budżet **< 100 000 zł**

### Kiedy custom ma sens

- Specyfika polskiego prawa lub systemów (Comarch Optima, wFirma, Insert, Symfonia)
- Compliance sektorowy (np. medyczny, finansowy)
- AI ma być **przewagą konkurencyjną** (to Twoje IP, nie cudze)
- Budżet **> 200 000 – 500 000 zł**

### Podejście hybrydowe (moje rekomendowane dla MŚP)

SaaS tam gdzie standardowe (Slack, HubSpot, Notion) + custom agenci AI tam gdzie specyfika (OCR pod Twoje faktury, integracja z Comarch, przypomnienia podatkowe w Twoim tonie). 67% success rate wg go-globe.com. To właśnie robię dla klientów.

## Pricing models — co oznacza "cena"

Cena "1 200 zł/mies" może znaczyć 5 różnych rzeczy. Sprawdź **jak** vendor liczy:

| Model | Jak działa | Pułapka |
|-------|-----------|---------|
| **Per-seat** | Stała cena × liczba użytkowników | AI agent liczony jako 1 seat, ale daje wartość 5 użytkowników. Licencje przepłacone. |
| **Usage-based** | Per transakcja / request / token | Zmienny budżet, trudne prognozowanie; spike = nagły rachunek |
| **Flat monthly** | Stała kwota za wszystko | Ukryte "fair use policy" — po przekroczeniu nagle usage-based |
| **Credit-based hybrid** | Kupujesz kredyty, zużywasz | Stosuje **68% produktów AI** (OpenView 2024); najtrudniejszy do porównania |
| **Outcome-based** | Płacisz za wynik (rozwiązany ticket, przetworzona faktura) | Gartner przewiduje 30% enterprise SaaS w tym modelu do 2025. Wymaga zaufania do pomiaru. |

Pytanie do vendora: *"Pokaż mi 3 scenariusze — mały, średni, duży volume — z realnymi liczbami dla firmy mojej wielkości."*

Jeśli nie pokazuje, to znaczy, że liczby nie wyjdą Ci korzystnie.

## SLA — czego wymagać

Service Level Agreement to kontrakt, w którym vendor gwarantuje **uptime** i **czasy reakcji**. TermScout publikuje benchmarki:

### Uptime

- **Standard**: 99,5% (43,8h downtime/rok — jak jeden dzień pracy w miesiąc)
- **Enterprise**: 99,9% (8,7h downtime/rok — kilka minut miesięcznie)
- **Mission-critical**: 99,99% (52 min/rok)

Dla automatyzacji AI w MŚP minimum to **99,5%**. Dla systemów, od których zależy obsługa klientów codziennie — **99,9%**.

### Czasy reakcji i rozwiązania

- **Critical issue** (system nie działa): response 15 min – 1h, rozwiązanie 4-6h
- **High priority**: response 2-4h, rozwiązanie 24h
- **Normal**: response 8-24h, rozwiązanie 3-5 dni

### SLA credits

Jeśli vendor naruszy SLA, dostajesz zwrot części opłat. Standard:

- Poniżej gwarantowanego uptime → 10% zwrotu miesięcznej opłaty
- Negocjuj: **skalujące kredyty** (im dłuższy downtime, tym większy procent), **automatyczne naliczanie** (bez wniosku) oraz **prawo wypowiedzenia** po 3 naruszeniach w 12 mies.

## Ile to kosztuje u mnie

Konkrety z mojej oferty (maj 2026), żeby dać Ci benchmark rynku:

| Pakiet | Koszt wdrożenia | Utrzymanie miesięczne | Obejmuje |
|--------|-----------------|----------------------|----------|
| Audyt AI | 3 500 zł | — | Analiza procesów + 1 prosta automatyzacja w 2 tygodnie |
| Agent Starter | 8 000 zł | 1 200 zł | 1 agent + 1 integracja |
| Automation Pro | 18 000 zł | 2 500 zł | 2-3 agenty, pełna automatyzacja, dedykowane SLA |

Do tego koszt LLM API (Claude/GPT) — średnio 50-200 zł/mies dla biura rachunkowego z ~10 klientami. Bez ukrytych opłat, bez egress, bez "fair use". Stawka godzinowa za custom development: 350-500 zł/h, przewidywalnie.

## Najczęściej zadawane pytania

### Ile trwa realistycznie wdrożenie automatyzacji AI w MŚP?

Dla prostego agenta (OCR, klasyfikacja maili, przypomnienia): **2-4 tygodnie** od audytu do działającego systemu. Dla pełnego workflow z integracjami (CRM + system księgowy + dashboard): **6-12 tygodni**. McKinsey raportuje 35-50% przekroczeń tych terminów w projektach enterprise — w MŚP bywa szybciej, bo mniej interesariuszy.

### Czy mogę sam zbudować agenta AI bez vendora?

Technicznie tak — są narzędzia low-code (n8n, Make, Zapier + Claude API), które pozwalają to zrobić wewnętrznie. Ale: **67% hybrydowych rozwiązań** kończy się sukcesem vs **33% wewnętrznych buildów** (go-globe.com). Bez doświadczonej osoby, która zrobi to 2-3 raz, łatwo wylądować w shelfware.

### Co zrobić jeśli vendor nie ma DPA?

Zakończ rozmowę. Bez DPA (Data Processing Agreement, art. 28 RODO) **Ty** łamiesz RODO jako administrator danych. Nie ma od tego wyjątków dla "małych firm" ani "krótkich pilotów".

### Czy AI Act dotyczy każdej automatyzacji AI?

Tak, ale w różnym stopniu. Klasyfikacja zależy od zastosowania. Większość automatyzacji MŚP (OCR faktur, klasyfikacja maili, przypomnienia) to **ograniczone ryzyko** — obowiązek transparentności (informacja, że używasz AI). Systemy biometryczne, ocena kredytowa, decyzje HR = **wysokie ryzyko** = pełen framework compliance. Zapytaj vendora, jak klasyfikuje swoje rozwiązanie.

### Co jeśli vendor odmawia dostępu do raportu pentest?

Raport pod NDA jest standardem. Odmowa "bo poufność" to red flag. W ostateczności poproś o **letter of attestation** — krótką formalną notę od firmy audytującej potwierdzającą datę, zakres i brak krytycznych znalezisk.

### Jak obliczyć realny ROI przed zakupem?

Wzór: *(oszczędzony czas × stawka godzinowa × 12) + (wartość uniknionych błędów) − (TCO rok 1)*. Jeśli zwrot jest **< 12 miesięcy** — inwestuj. **12-18 mies** — negocjuj dalej. **>18 mies** — zostaw to na później, bo prawdopodobnie złe pytanie pierwsze.

## Co dalej

Jeśli doczytałeś do końca — jesteś w 5% właścicieli MŚP, którzy podchodzą do AI serio. Gratuluję. Reszta kupi najpierw, zastanowi się potem.

Masz dwie ścieżki:

1. **Audyt AI u mnie**. 3 500 zł, 2 tygodnie, konkretny raport z mapą procesów + rekomendacja wdrożenia (lub rekomendacja żeby NIE wdrażać — czasem to jest właściwa odpowiedź). [Napisz na contact@mjoldak.com](/#kontakt).

2. **Samoocena najpierw**. Przejdź przez 5 pytań tego artykułu z kartką i długopisem. Jeśli na 4 z 5 masz konkretne odpowiedzi — jesteś gotowy na rozmowę z vendorem.

> Najtańsza automatyzacja to ta, której nie zrobisz dla złego problemu. Druga w kolejności — ta, która zwraca się w mniej niż 6 miesięcy. Wszystko powyżej to spekulacja.

[Czytaj dalej: ile kosztuje godzina ręcznego przepisywania danych](/artykuly/ile-kosztuje-godzina-recznego-przepisywania-danych/)
