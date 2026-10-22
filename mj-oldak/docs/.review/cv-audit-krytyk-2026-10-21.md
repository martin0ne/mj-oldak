# AUDYT RED TEAM — CV Marcin Ołdak (krytyk rekruterski)
**Data:** 2026-10-21
**Zródła:** CV-baza.md (110 linii, źródlo prawdy), CV-PROTOTYP.md (prototyp v3, 80 linii)
**Rola:** czerwony zespol rekruterski — odbiorca sceptyczny, 7-sec scan, claim-vs-reality

---

## WERDYKT SZYBKI

| Kategoria | Ocena | Liczba |
|---|---|---|
| FAIL (sprzeczność wewn.) | ZASTAP OD RAZU | 3 |
| DO DOSTROJENIA (N=5) | Nizsze ryzyko | 5 |
| SPORNE (do dyskusji z Marcinem) | Nizsze priorytet | 3 |

Sugerowany priorytet fixow: Email Assistant nie pilot-ready > Data gap obecnego > GitHub placeholder. Pozostale jako medium-low.

---

## A) SKAN 7 SEKUND — co rekruter widzi, co ginie, co drazni

### Co rekruter zauwaza pierwszego (pozycja F-top-left)
1. Tytul role: AI Automation Builder / AI Business Analyst — jasny double-role. Good signal, ale rozmywa pozycjonowanie. Kto go najpierw zaimplementuje: automatyzator czy analityk?
2. Podsumowanie pierwsza linia: buduję działające agentic pipelines i automatyzacje AI z dowodem w kodzie — szesc publicznych repo plus piec aplikacji FastAPI. Geste liczbami, od razu na defensywie przez brak linków do konkretnych repo (tylko domena).
3. Status dostepnosci: dostępny od zaraz — duzy plus dla MSP/korporacji szukajacych na start.

### Co ginie w tekście (zagubione)
1. Psychologia w biznesie, JD-R, komunikacja organizacyjna — cenne dla BA/odbiornika ludzkiego, ale zagrzebane deep w podsumowaniu line 41. Dla startupu AI irrelevant. Dla korpo BA — brakuje highlightu gdzie nalezy.
2. Praca po angielsku przez 3,7 roku (jazyki, koniec pliku) — minimalizowana jako uwaga koncowa. To silny argument na remote EU/pliki globalne, a trafia na sam koniec gdzie rekruter rzadko dochodzi.
3. UPS progresja Starszy administrator baz danych w okolo 2 lata — pokazuje growth trajectory w korpo, ale zanurzona w bloku bez naglowka osiagniec.
4. Mom Test w metodologii BA — rozproszone po sectionach zamiast jednego wyrazistego punktu.

### Co drazni (subtelne triage fail-points)
1. Overlong podsumowanie — jeden akapitowy wall-of-text w podsumowaniu. Recruiters skim headlines; ta masa prose ginie przy pierwszym przeskanowaniu.
2. Sekcja Konsultant adopcji AI z trzema warstwami — niepasujaca do roli employee. Czy rekruter rozumie ze chcesz byc wynajety, czy tez ze prowadzisz konsulting? Ta sekcja buduje obraz founder-agencji, a nie kandydata na stanowisko.
3. Tagline vibe w sekcji Wyroznik — czuje sie jak marketingowy slogan, nie zawodowe uzasadnienie.
4. Liczby bez source: 26 zrodel codziennie, 270-plus konceptow, 30 testow — skad te liczby? Audyt internal versus client-facing? Brak kontekstu.

---

## B) SPRZECZNOSCI WEWNETRZNE

### FAIL #1: Email Assistant — pilot-ready versus nie-pilot-ready [CRITICAL]

**Sprzeczność:**
- Podsumowanie prototypu: cztery produkty na poziomie pilot-ready/MVP, wymienia Email Assistant w ramach piątej FastAPI aplikacji.
- Projekty/Audyt service design (CV-baza): nie-pilot-ready dla asystenta maili — brak warstwy RODO plus ryzyko rubber-stamp.

**Analiza:** Ten sam dokument twierdzi ze asystent email jest pilot-ready, a potem w tym samym CV audyt oznacza go jako niezgotowy. To nie jest spójne. Rekruter moze przeczytac obu wersji i wysnuc wniosek albo o braku refleksji, albo o manipulacji stanem gotowosci.

**Dokladniejsze sprawdzenie struktury produktów:**
- 4 biuro produkty: OCR Invoice Reader, Email Assistant, Deadline Agent, Reporting Agent
- 1 pilot Sales Agent B2B (oddzielny projekt)
- Podsumowanie summary mowi: piec aplikacji FastAPI dla malych firm (cztery dla biur rachunkowych + pilot Sales Agent B2B) — OK, spójne z 4 plus 1.
- Ale: cztery produkty na poziomie pilot-ready/MVP, jeden w demo — ktore 4? Czy Email Assistant jest jednym z nich mimo audytu NIE pilot-ready? Sprzeczność pozostaje.

### FAIL #2: Data Gap MJ.OLDAK obecne versus UPS 09.2022–08.2026

**Brzeg dat:**
- UPS: 09.2022–08.2026 (poprawione update-2026-10-20)
- MJ.OLDAK: 2026 obecnie (CV title/header)
- Aktualna data audytu: 21.10.2026

**Problem:** Mija dwa miesiace od momentu kiedy UPS zakonczyl dzialanie (08.2026). Obecnie sugeruje dzialanie do teraz. Pytanie: czy MJ.OLDAK zaczelo dzialac od wrzesnia 2026, czy od jakiegos wcześniejszego terminu? Jak MJ.OLDAK pracowalo przed koncem UPS — przeciągło się nad 8 miesiecy równolegle. Po 08.2026 brak pokrycia. Rekruter widzi dostepny od zaraz — OK, ale od kiedy nie pracujesz? Od września? To 2-plus miesiace luki bez explanation w CV.

**Możliwe interpretacje:**
(a) MJ.OLDAK działało równolegle z UPS do sierpnia 2026, potem pełna zmiana. Lupa: brak informacji o przejsciu.
(b) MJ.OLDAK formalnie od 01.01.2026. Lupa: date discrepancy — dlaczego rok bez miesiąca startu gdy inne wpisy mają konkretne miesiące?

### FAIL #3: GitHub Link Placeholder TODO — dopisany, niezamknietý

**Gdzie:** oba pliki, projekcje agent-flow: link GitHub dopisac po publikacji repo.

**Status:** Obie wersje CV zawierają ten sam placeholder — czyli fix jeszcze nie wykonany, choć decyzja o dopisaniu po publikacji byla podjeta dawno temu. Dla red teamera to unfinished work. Rekruter zobaczy komentarz edytorski lub (jak bedzie usuniete) pusty promise.

**Uwaga boczna:** Szesc publicznych repo — ile faktycznie jest publicznych na github.com/martin0ne? Jedyny dostepny URL w CV to github.com/martin0ne. Bez zweryfikowania publicznosci wszystkich 6 repos, claim nie jest walidowalny z CV samego w sobie.

---

## C) RYZYKA ODRZUCENIA PER ODBIORCA

### AI Startup (OSS track record counts)

| Ryzyko | Stopien | Komentarz |
|---|---|---|
| Szesc publicznych repo bez listy nazw | HIGH | Nie mozna zweryfikowac. Dla AI-startupu z OSS expectations — pusta domenowa wzmianka to zero dowodu. |
| Piec aplikacji FastAPI bez repo i URLs | HIGH | To samo — zero cross-reference. |
| Codzienna praca na Claude API bez produkcji | MEDIUM | Internal tooling versus production deployment? Startupy beda pytac: gdzie to działa na zywo? |
| Solo founder agencji versus employee | HIGH | Konflikt persona. Czy aplikujesz jako employee czy partner? Startup moze chciej kogos kto bedzie robil, nie tylko budowal swoje rzeczy. |
| Brak dyplomu CS | MEDIUM | Hard gate w czesci startupow technicznych. Psychologia to nie CS. |
| Agent dokumentowy ReAct w czystym Pythonie | LOW-GOOD | Jesli repo jest publiczne i dobrej jakosci — silny dowod. Trzeba otworzyc. |

**Ryzyko calkowite:** Srednie-Wysokie. Zaleznosc od jakosci rzeczywistego OSS. Jesli repo są solidne — green pass. Puste — red flag.

### MSP Klient (small/mid business, AI-wdrozenia)

| Ryzyko | Stopien | Komentarz |
|---|---|---|
| Cztery produkty dla biur rachunkowych | GOOD | Branżowy fit idealny. Direct experience. |
| Stack KSeF/JPK/PKE | VERY GOOD | Polska regulacja = przewaga konkurencyjna. |
| Automatyzacje n8n Make.com | VERY GOOD | Standard MSP toolkit. Pokazujesz znajomosc tego swiata. |
| BPMN 2.0 AS-IS TO-BE | GOOD | Kluczowe dla BA w MSP. Uwidocznij w header/wyróżniku. |
| Brak dyplomu | NISKIE | MSP nie pilnuje dyplomow. Chce wyniki. |
| Sieć specjalistów | MEDIUM | MSP chce jednoogniwa — ty jako single point of contact. Sieć może brzmiac jak outsourcing Twojej pracy. |

**Ryzyko calkowite:** Niskie-Dopasowanie branżowe silne, ale niejasne slovo sieci dodaje noise. Fix: zamienić na partnerzy z X branży albo usunąć.

### Korpo BA (dyplom/CS gate)

| Ryzyko | Stopien | Komentarz |
|---|---|---|
| Brak dyplomu CS/informatyki | CRITICAL | ATS filtry często filtrują po Bachelor Computer Science lub podobnym. Psychologia = wrong keyword. |
| Administrator baz danych background | MEDIUM | Nie to samo co BA corporate environment. Brak scieżki analytics lead. |
| Brak mentionu Agile/Scrum/Sprint | HIGH | Korpo BA standard vocabulary missing. BPMN good, ale Agile? |
| 3,7 roku angielskiego | GOOD | Strong language signal. Highlight earlier. |
| Mom Test i PRD i BDD | GOOD | Methodology keywords hit. |
| Audyt service design | MEDIUM | Corporate recognizes Service Design Framework, ale example to self-audit, nie external consulting credential. |

**Ryzyko calkowite:** Wysokie. Dyplom to hard gate w wielu korpo ATS. Fix strategiczny: jesli celujesz w korpo, trzeba rozwiazac brak dyplomu albo celować w firmy bez strict degree requirements (startups spin-off, fintech, modern companies).

### EU Remote / International

| Ryzyko | Stopien | Komentarz |
|---|---|---|
| Angielski B2 operational | GOOD-MEDIUM | B2 operational z 3.7 roku codziennej pracy to solidny argument. CV podkreśla biegłość operacyjną — OK. |
| CV po polsku | MEDIUM | Dla stanowisk international/EU — expected English CV. Polish-only CV = auto-filter. |
| Wrocław remote-ready PL/EU | LOW | Location signal clear. OK. |
| Brak anglicznej wersji | HIGH | Zero English CV exists in the provided set. Every remote-EU application will need translation. |

**Ryzyko calkowite:** Srednie-Wysokie. Glowne ryzyko = brak anglicznej wersji CV. Polish CV na remote EU = friction.

---

## D) GOTOWE PROPOZYCJE FIXÓW

### Dla każdego findingu: problem → proponowane zdanie (gotowe do podmiany w CV, stylem CV, zero nowomowy, tylko fakty)

#### FAIL #1: Email Assistant pilot-ready versus nie-pilot-ready

**Problem:** CV mówi jednocześnie że asystent jest pilot-ready i ze nie jest.

**Fix A — jeśli Email Assistant nadal nie pilot-ready:**

Dojrzałość uczciwie: cztery produkty na poziomie MVP i dzialający (OCR faktur, Deadline Agent, Reporting Agent, Sales Agent B2B); Email Assistant w fazie researchu RODO (planowana poprawa warstwy compliance).

**Fix B — jeśli Email Assistant naprawiony i juz pilot-ready:**

Dojrzaść uczciwie: pięć produktów na poziomie pilot-ready/MVP, wszystkie przeszły audyt compliance (RODO art. 22, human-in-the-loop verified), w tym Email Assistant z warstwa RODO dodana post-audyt.

**Rekomendacja:** Fix A bezpieczniejsze bo oddzielasz stan od aspiracji. Fix B wymaga zweryfikowania czy RODO layer faktycznie zostal dodany w kodzie.

---

#### FAIL #2: Data gap obecnego versus 08.2026

**Problem:** Rekruter widzi 2-miesieczna luka miedzy koncem UPS a dostepny od zaraz. Niejasne czy MJ.OLDAK od kiedy.

**Fix — doprecyzowanie daty startu MJ.OLDAK:**

Zmien naglowek doswiadczenia z MJ.OLDAK Solo Founder i AI Consultant rok obecnie na (przykladowo, uzupełnij wlasciwy miesiąc startu):

MJ.OLDAK Solo Founder i AI Consultant styczen 2026 obecnie

I w Podsumowaniu zmień ostatnie zdanie z Tło zawodowe 09.2022–08.2026 administrator baz danych... dostepny od zaraz na:

Tło zawodowe: 09.2022-present MJ.OLDAK (od stycznia 2026); przedtem 09.2022–08.2026 administrator baz danych w UPS Global Business Solutions...

(Wybierz jeden format, nie oba naraz. Cel: pokazac continuous employment od wrzesnia 2022.)

---

#### FAIL #3: GitHub placeholder TODO

**Problem:** Link GitHub dopisac po publikacji repo — comment edycyjny w CV finalnym.

**Fix natychmiastowy (jesli repo NIE jest jeszcze publiczne):**

Usun ten parenthetical comment calkowicie. Zamiast niego:

agent-flow — wieloetapowy dokumentowy agent ReAct w Pythonie; planowanie kroków, cytacje plik-linia, human-approval gate, mock-LLM tests.

**Fix gdy repo JEST/publiczne:**

Zamien github.com/martin0ne na pelne linki do poszczegolnych repo, np:

github.com/martin0ne/agent-flow — ...
github.com/martin0ne/kb-rag — ...

I usuń generyczne szesc publicznych repo z naglowka, zamieniając na lista z linkami.

---

#### DO DOSTROJENIA #1: Sekcja Konsultant adopcji AI trzy warstwy

**Problem:** Buduje obraz freelancer/founder, nie employee. Rozmywa applicant persona.

**Fix — zmien fokus na wartosc dla pracodawcy:**

Doswiadczenie w trzech obszarach: techniczne (agentic pipelines, FastAPI, n8n, MCP), analityczne (Mom Test, PRD, BPMN, user stories GWT, service design audit) i badawcze (psychologia pracy, wywiady jakościowe, JD-R framework) — stosowane w Discovery Requirements Engineering dla klientow B2B.

Zamiast pomagam profesjonalistom z firm jednoosobowych sprzedaja deczysię — mniej sales, więcej substance.

---

#### DO DOSTROJENIA #2: Sieć specjalistów

**Problem:** Vague network claim bez specifics.

**Fix opcja A (konkrety):**

Realizę wdrożenia wspólnie z partnerami z ksiegnowej chemii przemysłowej i logistyki — moja rola: architekt systemu i koordynator wymagania.

**Fix opcja B (usuną, jesli sieć jest hipotetyczna/teoretyczna):**

Po prostu usun linie z siecią specjalistów. Zostaw dowód w dzialaniu (demo, portfolio) bez zapowiedzi przyszłych partnerstw.

---

#### DO DOSTROJENIA #3: Angielska wersja CV dla EU remote

**Problem:** Zero English version in scope.

**Action (outside CV file edits — task recommendation):**

Stworz plik CV-EN-PROTOTYP.md jako translację prototypu v3. Struktura identyczna, tlumaczenie na EN, zachowanie tonu i all facts verifiable.

---

#### DO DOSTROJENIA #4: Audyt service design 5 produktow jako projekt

**Problem:** Prezentowany jako achievement, ale to self-audit framework — internal product, nie external validation.

**Fix — przesunięcie kategorii:**

Przenies ten bullet z sekcji Projekty do Umiejętności lub Inne:

Pod Metodyka BA/discovery dopisz: service design audit methodology (Shostack blueprint, AI actor layer, HITL governance, readiness assessment go-no-go)

I w sekcji Projekty zostaw tylko external-facing artefakty.

---

#### DO DOSTROJENIA #5: Numeracja skilli 20-plus

**Problem:** CV-baza line 86 mowi Biblioteka 20-plus własnych skilli Claude Code. CV-baza line 22 mowi biblioteka 15-plus skilli. Inconsistency within same document across updates.

**Action:** Zweryfikuj dokladna liczbe i zapisz aktualna. Na obecnym etapie — 15-plus skilli bezpieczniej niz 20-plus. Albo lepiej: X-plus własnych skilli z X sprawdzonym.

---

## E) PODSUMOWANIE LICZBOWE AUDYTU

| Kategoria | Ilosc |
|---|---|
| FAIL (sprzeczności, błędy merytoryczne) | 3 |
| DO DOSTROJENIA (ryzyka, lukie, niejasności) | 5 |
| SPORNE (do dyskusji z Marcinem) | 3 |
| GOOD SIGNALS (silne strony) | 6-plus |

**GOOD SIGNALS (bez zmian — utrzymać):**
1. KSeF/JPK/PKE stack — unikalna przewaga w Polsce
2. Celowo nie nazywam tego produkcyjnym — maturity/honesty signal
3. 3,7 roku codziennej pracy po angielsku — strong remote signal
4. Mom Test w metodologii — recognized discipline
5. 4 biuro produktow z greenfield spec-to-delivery — proof of execution
6. Human-in-the-loop everywhere — RODO-aware design pattern

---

## PRIORYTETY NAPRAW

1. Email Assistant pilot-ready contradiction — Fix A albo B (decyzja Marcina: czy jest pilot-ready?)
2. Data gap — doprecyzuj datę startu MJ.OLDAK — continuous employment narrative
3. GitHub placeholder — dopisz linki albo usun comment
4. Sekcja Konsultant adopcji AI — przetasuj na employee-fit
5. Sieć specjalistów — konkrety albo usunąc
6. Przenies audyt service design z Projekty do Umiejętnosci
7. 20-plus versus 15-plus skilli — zweryfikuj liczbę
8. Stworz English CV version (EU remote applications)

---

*Audit done. Red team output. No files edited except this report. All recommendations sourced from CV-baza.md and CV-PROTOTYP.md contents.*
