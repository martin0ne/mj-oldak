# AI-Screening CV: Symulacja werzyktów rekrutera ATS

**Data:** 2026-10-21
**CV źródłowe:** `CV-PROTOTYP.md` (superset bez tailoringu)
**Profil kandydata:** PL/EU, ~4 lat doświadczenia zawodowego, psychologia w toku (bez dyplomu), solo-founder agencji AI, brak technicznego wykształcenia kierunkowego
**Cel:** min 10k netto, hybryda > zdalna, Wrocław > Warszawa
**Metoda:** 3 archetypowe JD → sieć rekruterska (ATS + człowiek) → werdykt + Top-3 powody = dosłowne cytaty z CV jako odczyt rekruterem

---

## JD #1: Zdalny AI Automation Engineer / Konsultant Adopcji AI (MSP, Polska, B2B)

> Firma: grupa 5–50 osób, biuro rachunkowe lub agencja cyfrowa, zespół rozproszony. Nie wymaga dyplomu — liczą się portfolio i dowód. Szukają osoby, która „zrobi” od specu do wdrożenia, zna LLM na co dzień, mówi z klientem non-technicznym. Stawka 100–130 PLN/h B2B.

### Werdykt: **PASS do rozmowy**

### Top-3 powody PASS:

1. **„buduję działające agentic pipelines i automatyzacje AI z dowodem w kodzie: 6 publicznych repo + 5 aplikacji FastAPI”** — portfolio jest tu głównym walorem; kandydat nie opisuje, pokazuje. Dla MSP bez technicznego dyplomu to kluczowy kompensator.
2. **„Codzienna praca operacyjna na Claude API (Opus/Sonnet/Haiku) i Claude Code: agentic workflows, multi-file refactors, integracje MCP”** — warstwa praktyczna LLM jest realna, nie akademicka; rekruter widzi codzienność, nie certyfikat.
3. **„Konsultant adopcji AI — trzy warstwy: techniczna · naukowa · ludzka”** — kompetencja miękkie + tłumaczenie biznes↔tech są równie ważne jak kod w MSP; ta sekcja buduje zaufanie klienta nietechnicznego.

### Co podnosi konwersję (TOP-5 działań):

| Priorytet | Działanie | Uzasadnienie |
|-----------|-----------|---------------|
| 1 | Przenoś linię z Podsumowania („portfolio zastępuje lata stażu”) na samą górę CV, bezpośrednio pod nagłówek — ATS skanuje pierwsze 3 linie i to jest najpotężniejszy fraz kompresujący twoją propozycję wartości |
| 2 | Dopisz działający link GitHub przy agent-flow zamiast „(link GitHub dopisać po publikacji repo)” — każdy niedomknięty link obniża wiarygodność odczytu „dowód” na zero |
| 3 | Rozbij akapit Podsumowania na punktory (max 6–8 linii) — obecny blokad tekstu (~250 słów) jest czytelny tylko dla człowieka; parser ATS go spłaszcza i traci strukturysemantyczne |
| 4 | Dodaj jedną kwantyfikację przy MJ.OLDAK: np. „4 produkty, x klientów, y godziny wdrożeniowe” — MSP uwielbia konkretne liczby; obecne opisy są bogate ale niezliczone |
| 5 | Usuwaj sekcję „Konsultant adopcji AI — trzy warstwy” z wersji tailoringowanej pod inżyniera — to jest świetne dla konsultanta, ale mylisz signal-to-noise gdy aplikujesz na stanowisko pure-engineering |

### Co zabija konwersję:

- **(line 47–60)** Sekcja „Konsultant adopcji AI — trzy warstwy” z naukowym tonem („satysfakcja N=5”, „obserwator uczestniczący”) — dla inżyniera to sygnał „ten  chce robić research, nie deployować”. Działa przeciwko.
- **(line 84)** Tekst „(link GitHub dopisać po publikacji repo)” — otwarta zaproszona lista zadań w CV odbierana jest jako nieuważność lub lenistwo, nie szczerość.
- **Brak stawkowych danych** w sekcji kontakt/dostępne — nie wpisujemy stawkę do CV (zgodnie z bazą), ale brak nawet orientacyjnego „otwarty na 100–130 PLN/h” marnuje szansę, gdy ATS filtruje po budżecie.

---

## JD #2: Business Analyst — Korporacja (Warszawa, etat, pełen wymiar)

> Firma: duża korporacja (bank/consulting big4/telekom), lokalizacja Warszawa, model hybrydowy. Wymagania: studia wyższe kierunkowe techniczne/informatyczne (kluczowy hard gate), minimum 3–5 lat doświadczenia BA/SA w środowisku enterprise, znajomość BPMN, SQL, dokumentacji projektowej. Stack: Jira, Confluence, Azure DevOps. Kandydat musi mieć dyplom uczelni ekonomicznej/technicznej + potwierdzone doświadczenie w large-scale projektach IT.

### Werdykt: **REJECT**

### Top-3 dosłowne powody REJECTA (cytat z odczytu rekruterem + fragment CV decydujący):

1. **„Brak wykształcenia wyższego kierunkowego technicznego/informatycznego”** — odrzut twardy (hard gate). Rekruter korpo zawsze pyta „co pani/pana studiował”? Odpowiedź „psychologia w toku” = niewystarczające dla wymagania „studIA kierunkowe”. Decyduje fragment: **„Psychologia w biznesie — Uniwersytet DSW Ideis ... w toku”** (linia 105) — brak dyplomu + kierunek niepasujący do „studia kierunkowe techniczne/informatyczne”.
2. **„Doświadczenie zawodowe: administrator baz danych w firmie celnej, nie Business Analyst w enterprise IT”** — rekruter widzi „UPS Global Business Solutions — Administrator baz danych” i nie utożsamia tego z rolą BA. Fragment: **„Administrowanie bazami danych i przepływem danych w dziale finansowym UK (odprawy celne...)”** (linia 45) — rola administrowania ≠ analysis requirements.
3. **„Brak potwierdzonego doświadczenia w narzędziach korpo: Jira, Confluence, Azure DevOps”** — stack technologiczny CV zawiera n8n, Make.com, Claude Code, Lovable, ale ZERO nazwanych enterprise tools. Fragment: **„Automatyzacje: n8n...Make.com+Google Apps Script; Lovable”** (linia 38) — to są narzedzia SMB/startup, nie corporate pipeline.

### Co podnosi konwersję (gdyby odrzucenie soft):

| Priorytet | Działanie | Uzasadnienie |
|-----------|-----------|---------------|
| 1 | Przekształć linię UPS: „**Z własnej inicjatywy automatyzowałem powtarzalne zadania...**” → dodaj frame procesowe: „zidentyfikowałem bottleneck w X procesu, zmierzyłem czas Y, zautomatyzowałem w Z, oszczędność N godzin miesięcznie” — to przemienia admina w proaktywnego analityka |
| 2 | Doprecyzuj projekty portfolio językiem BA: dodaj user story format Given/When/Then przy Sales Agent B2B — pokazujesz metodologię, nie tylko produkt |
| 3 | Dopisz sekcję „Narzędzia enterprise” z listą teoretyczną: „Jira (poznane w kontekście self-study), Confluence (documentation patterns)” — ryzyowne, ale lepsze niż zero; lub lepiej: zrób mini-projekt end-to-end z Jira+Confluence i wrzuć jako case study |

### Co zabija konwersję:

- **Cała ścieżka edukacyjna** — bez dyplomu technicznego w Polsce korpo to mur. Nawet perfekcyjny CV nie przejdzie przez HR initial screen.
- **Brak any enterprise experience whatsoever** — ani Jira, ani Scrum certificate, ani Agile training, ani duże projekty IT w CV.

---

## JD #3: Analityk Systemowy / Biznesowy — Biuro Rachunkowe MŚP (Wrocław, umowa o pracę)

> Firma: regionalne biuro rachunkowe (15–30 osób), lokalizacja Wrocław, model hybrydowy (2 dni biuro). Szukają osoby, która zrozumie księgowych, przeprowadzi discovery, i będzie mostem między tech a back-office. Wymagania: znajomość procesów księgowych/faktur/rozrachunków, umie komunikować się z klientem, podstawy SQL/python mile widziane, dyplom wyższy dowolny kierunek (preferowany ekonomiczny/administracyjny/stosunków międzynarodowych). Preferencja: osoba z dolnego Śląska, dostępna na miejsce. Open-source na stack nie przeszkadza.

### Werdykt: **MAYBE → PASS do rozmowy (jeśli firma priorytetyzuje kulturę nad credential)**

### Top-3 powody MAYBE (i jak przechodzi do PASS):

1. **„Biuro rachunkowe to twoja idealna branża — budujesz tam 4 produkty i znasz ich ból z pierwszych rąk”** — to jest TWOJA domena. Fragment: **„4 działające produkty AI dla biur księgowych (greenfield: od spec do delivery + pilot kit)”** (linia 36) — masz dominikantę branżową żaden external BA nie ma. To potężny argument za sobą.
2. **„PSYCHOLOGIA W BIZNESIE może być odczytana jako 'nie-techniczny' przez sztywnego rekrutera”** — fragment: **„Psychologia w biznesie... w toku”** — zależy od rekrutera; jedni zobaczą „rozumie ludzi i zespoły”, inni „brak podstawy ekonomicznej”. Fraktura subiektywna.
3. **„Doświadczenie w UPS jako 'administrator baz danych' nie brzmi jak analityk systemowy”** — fragment: **„Administrator baz danych → Starszy administrator baz danych”** (linia 43) — tytuł roles nie pasuje, ale treści automatyzacji Excel+SOP bliskie analityce procesowej. Konwertowalne.

### Co podnosi konwersję (TOP-5 działań):

| Priorytet | Działanie | Uzasadnienie |
|-----------|-----------|---------------|
| 1 | Nadaj temu CV wersji „BA Biuro Rachunkowe” — w Podsumowaniu na pierwszej linii podkreśl: „Analityk z doświadczeniem w biurach rachunkowych” zamiast ogólnego „AI Automation Builder” — dopasowanie branżowe jest Twoim super-mocnym atutem |
| 2 | Dopisz w Doświadczeniu UPS: wyraźnie ramij automatyzacje jako „analiza procesów celnych → mapowanie BPMN AS-IS → projektowanie TO-BE → implementacja” — transformujesz administrowanie w analizę procesową |
| 3 | Przesuń sekcję Projekty wyżej — przed Doświadczenie Zawodowe. W MŚP portfolio liczy więcej niż tytul zatrudnienia; tu Twoje 4 produkty dla biur to główny selling point |
| 4 | Dodaj konkretny język BA do Umiejętności: „SQL (podstawy)” → „SQL (podstawy) + JPA/JDBC” lub dokładniej opisz co znasz — rekruter MPS potrzebuje wiedzieć ile potrafisz w data layerze |
| 5 | W contact header dodaj „Wrocław” prominently — już jest, ale upewnij się że pierwszy adres jest fizyczny, nie mailowy; MŚP preferuje lokalność i to musisz wyswietlić od razu |

### Co zabija konwersję:

- **(line 47–60)** Sekcja „Konsultant adopcji AI” zbyt „startup-agency” — dla biura rachunkowego szukającego etatowca to może brzmieć jak „ten chłopak chce być freelancerem, nie pracować u mnie”. Trzeba ją przeframować jako „doświadczenie w consultacji klienckiej”.
- **Brak eksponowanej wiedzy księgarskiej/rozliczeniowej** — mimo budowania narzędzi dla księgowych, CV nie pisze otwarcie „znajomość procesów księgowych, fakturacji, rozliczeń VAT/JPK”. Rekruter biurowy szuka kogoś kto DECYFROJE ich świat, nie tylko technicznie robi.

---

## CZEGO NIE DA SIĘ NAPRAWIĆ W CV (HARD GATES)

Te elementy to filtry rynku, nie błędy tekstu. Żaden tailoring ich nie usunie:

| Hard Gate | Dlaczego nie do naprawy | Efekty rynkowy |
|-----------|------------------------|----------------|
| **Brak dyplomu technicznego/informatycznego/economicznego** | Studiujesz psychologie i nie dasz dyplomu informatyki z roku na rok. To jest inwestycja 3–4 letnia, nie edit | Korpo/Warszawa/big4: automagiczny reject przez HR filter. Nie ma obejścia w CV |
| **Tytuł zawodu: „Administrator baz danych” nie brzmi jak BA/SA/Engineer** | Zmiana job-title przy UPS = falsyfikacja; CV musi być zgodne z rzeczywistością (Rule 15 Konstytucji). Poprawny framing ≠ fake title | Role enterprise requiring proven BA history w corporate will always look past ten background |
| **Solo Founder ≠ Employee track** | „MJ.OLDAK — Solo Founder & AI Consultant” może sugerować rekruterowi „ten człowiek jest too independent / will leave for his own thing” | Some employers read „founder” as flight risk regardless of „dostępny od zaraz” text |
| **~4 lata doświadczenia ≠ Senior/Mid-Senior benchmark** | Rynek korporacyjny często filtruje po „min 3–5 lat dedicated role”. Twoje 4 lata to mostly DB admin + part-time agency building | Mid-senior corporate role may auto-reject below threshold; not a CV problem but market reality |

---

## PODSUMOWANIE STATYSTYCZNE SYMULACJI

| JD Archetyp | Werdykt | Kluczowy faktor decydujący |
|-------------|---------|---------------------------|
| #1 Zdalny AI Eng/Konsultant MSP | **PASS** | Portfolio + code proof compensate education gap |
| #2 Korpo BA Warszawa | **REJECT** | Hard gates: no technical degree, no enterprise stack |
| #3 MŚP Analityk Wrocław | **MAYBE→PASS** | Industry fit (biuro rachunkowe) is strongest lever |

**Konwersja oczekiwana:** JD1 highest response rate by far. JD2 near-zero without structural change. JD3 depends on recruiter calibration.

> Note: zero zmyślonych benchmarków procentowych — kierunki wskazują na prawdopodobną dynamikę, nie konkretne liczby.

---

## RAPORT KOŃCOWY

### Ogólne wnioski:

Twoje CV ma dwa oblicza: **jest potężne tam, gdzie twój domain knowledge liczy (biura rachunkowe, MSP, AI adoption)** i **jest podatne tam, gdzie credential checking dominuje (korpo, dyplom-required)**. To nie jest problem do rozwiązania jednym edytem — to rozdźwięk między modelem kandydata a modelem rynku.

**Największy lever:** tailoring per-aplikacja. Baseline CV jest superset — w każdej aplikacji tnij do 2 stron, summary pod rolę, i PRZENIES sekcję projekty wyżej gdy aplikujesz do MŚP/greenfield. Gdy aplikujesz do korpo — szczerze: zmiana strategii aplikacyjnej.

**Drugi największy lever:** closing every loose thread. „(link GitHub dopisać po publikacji repo)” to jedyne rzeczy które wyglądają na niedokończone we wspólnocie open-source world where you claim portfolio. Zamknij to.

**Trzeci lever:** sekcja „Konsultant adopcji AI” jest double-edged sword. Świetna gdy aplikujesz na konsultację/strategy role, szkodliwa gdy aplikujesz na engineering-focused pozycję. Albo ją usuwasz albo przerabiasz.

### Szybka lista wykonawcza (order of impact):

1. [ ] Close GitHub link gap for agent-flow repo
2. [ ] Break Podsumowanie into bullet list (max 6 lines)
3. [ ] Create per-role variant templates (AI Eng, BA-MSP, BA-Corpo) from this superset
4. [ ] Add quantitative metrics to MJ.OLDAK projects
5. [ ] Reframe UPS experience using BA-process language