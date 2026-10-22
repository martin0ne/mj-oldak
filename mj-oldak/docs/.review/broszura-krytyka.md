# Audyt generyczności broszury MSP — wersja v2
**Rola:** Krytyk głosu, zespół B
**Data:** 2026-10-20
**Źródła audytu:** mj-oldak/docs/BROSZURA-MSP.md (v2), HEAD~1 (v1), katalogi wzorców z `avoid-ai-writing` + `humanizer`
**Rejestr:** na ty, krótkie zdania, zero korpo-żargonu

---

## 1. INVENTORY: fragmenty ogólnikowe

Tabela niżej. Sekcja = numer sekcji broszury w v2; linia odnosi się do v2.

| # | Sekcja / Linia | Fragment | Dlaczego generyczne / które reguły łamie |
|---|---|---|---|
| 1 | Intro / L10 | "Każda firma ma innych ludzi, więc nie sprzedaję kursu ani gotowca" | Prawda oczywista. Każdy tak mówi. Reguła P2 (banalne prawdy), humanizer #5 (vague generalizations). To brzmi jak filler, nie pozycjonowanie. |
| 2 | Intro / L10 | "Automatyzacja powtarzalnej pracy jest tu efektem ubocznym wyższej produktywności" | Teza filozoficzna, która nic nie konkretyzuje. Działa dla każdej agencji AI. Nie mówi CZEGO ani JAK. Pattern avoid-ai-writing P1 (template phrase / slot-fill). |
| 3 | Dlaczego / L25 | "czy ktokolwiek w firmie zadał sobie pytanie: do czego to moglibyśmy użyć — i czy ktoś ten zespół tego nauczył" | Zbyt abstrakcyjne. Kto? Jakie pytanie? Brak konkretu procesowego. W v1 było: "do czego to moglibyśmy użyć." — krótsze i bez zbędnego rozlewu. |
| 4 | Co robię / L31–33 | "**1. Implementacja narzędzi AI pod Twój proces.**\n\nDobór i wdrożenie wokół tego, co firma już robi — po polsku, z uwzględnieniem polskiej specyfiki (KSeF, JPK)." | Nagłówek pointuje mniej niż treść. "Dobór i wdrożenie wokół tego, co firma już robi" = kanoniczny agency-speak: mógłby napisać każdy. Nie nazwano procesu, nie pokazano przepływu. V1 miał: "Faktury i dokumenty: odczyt danych → przygotowanie wpisu → wyjątki lądują u Ciebie do zatwierdzenia." — cztery linijki zamiast akapitu, ale zero wątpliwości co do treści. |
| 5 | Co robię / L33 | "Nie wdrażam gotowców z pudełka, których nikt po tygodniu nie otwiera." | Typowy objection-preemption (odpowiadanie na zastrzeżenie, które klient prawdopodobnie nie ma). Brak dowodu. Czy ktokolwiek kupował taki gotowiec u Marcina? Jeśli tak — nazwa i lekcja. Jeśli nie — usunąć jako puste ostrzeżenie. Pattern avoid-ai-writing P1 (formulaic objection handling). |
| 6 | Co robię / L37 | "Nie sprzedaję kursu, bo kurs jest ten sam dla wszystkich, a każda firma ma innych ludzi i inne procesy — gotowy pakiet i tak by się nie przydał." | Powtórzona teza z intro, jeszcze dłuższa. Reguła P2 (repeated empty concessions / filler). V1 w tej samej sekcji nie powtarzał -- tam punkt 1 był procesem (faktury), punkt 2 narzeczeniem (narzędzia dopasowane), a Nauka zespołu była implicit przez opisy. V2 wymyślił osobny punkt 2 (Nauka), ale go nie opisał żadnym przykładem -- tylko meta-discourse o tym, dlaczego nie sprzedaje kursu. |
| 7 | Co robię / L37 | "Po wdrożeniu zespół umie pracować sam — bez ciągłego wynajmowania mnie." | Obietnica bez miernika. Jak mierzyć "umie pracować sam"? Po ilu zadaniach? Za ile tygodni? To jest klasyczny marketingowy slogan bez operacjonalizacji. avoid-ai-writing P2 (generic conclusion / judgment-only). |
| 8 | Co robię / L39 | "**3. Raporty, które prowadzą do decyzji.**" | Nagłówek okraszony słowami "prowadzą do decyzji". Sam nagłówek nie wnosi ничего -- to samo mogłaby napisać księgowa o regularnych sprawozdaniach. Konkretyzacja powinna być w tytule lub obok niego (np. "Raport kosztów projektów z Eurostat: ile Ci się opłaca, a ile traci"). |
| 9 | Cztery zasady / L45 | "Automatyzacja nigdy nie działa w Twoim imieniu bez kontroli." | Tautologia w formie zapewnienia. Każde rozsądne rozwiązanie "działa bez kontroli" jest ryzykowne. To nie jest kontrargument, to jest deklaracja intencji. Humanizer #22 (sycophantic/servile reassurance). |
| 10 | Cztery zasady / L46 | "RODO, umowa powierzenia przetwarzania (DPA), dane nie trafiają do przypadkowych usług." | Słowo "przypadkowych" jest niewyraźne. Co to znaczy? Nieprzypadkowych? Kto decyduje? W v1 brzmiało to samo -- ta zasada istnieje od pierwszej wersji i NIE jest poprawiona. Problem structuralny, nie v2-specific, ale warto odnotować. |
| 11 | Dla kogo / L52 | **Tak, jeśli:** lista czterech bulletów | Bullet 1 ("powtarzalna praca zabiera godziny") = truizm kasowy. Każdy kto szuka automatyki ma powtarzalną pracę -- to nie filtr, to warunek wejścia. Bullet 2 ("firma rośnie ilością zadań, a nie ilością ludzi") = biznesowy patos, nie konkretny sygnał. Bullet 3 ("zespół chce sam umieć pracować z AI") = good-intent marker, ale niewalidowalny. Bullet 4 ("już próbowałeś gotowych narzędzi i się nie przyjęły") = najlepszy bullet w sekcji, bo walidowalny (sprawdzalne doświadczenie). |
| 12 | Dla kogo / L59 | "**Nie, jeśli:** ...szukasz gotowego kursu..." | Powtórzenie z punktu 6 powyżej -- trzy razy w dokumencie mówisz, że nie sprzedajesz kursu. Po raz drugi wystarczyło. |
| 13 | Jak zaczynamy / L65 | "Decyzja o rozszerzeniu zapada na faktach, nie na obietnicach" | Meta-frasa. "Na faktach, nie na obietnicach" = slogan bez operacjonalizacji. Co jest faktem? Jak zmierzysz przed/po? Gdzie są metryki? V1 miał to samo -- też niezrealizowane. |
| 14 | Jak zaczynamy / L65 | "Nawet jeśli odpowiedź brzmi 'nie ruszaj tego teraz'." | Reassurance kicker w stylu humanizer #34. Czy naprawdę potrzebujesz powiedzieć klientowi "powiem wprost, jakiego bym nie chciał usłyszeć"? To sugeruje, że to rzadkość -- co jest przeciwne do twojej strategii. |

### Summary inventory

Razem: **14 fragmentów**. Rozkład severity:

| Severity | Liczba | Przykłady |
|---|---|---|
| P0 (credibility killer) | 0 | -- |
| P1 (obvious AI smell) | 4 | #1, #3, #4, #13 -- banalne prawdy podane jako insight; template phrases; slogan bez miernika |
| P2 (stylistic polish) | 10 | powtórzenia (#6, #12), tautologie (#9), reassurance (#14), nieprecyzyjne określenia (#10) |

Największy problem strukturalny: **punkty 1 i 2 sekcji "Co robię" straciły konkret w przejściu z v1→v2**. To jest rdzeń wartości proposition -- nie powinieneś pisać o "dobrej implementacji", ale pokazać PRZEPŁYW PRACY na realnym procesie.

---

## 2. REWRITE-Y: propozycje konkretyzacji

Priorytet 1 = krytyczne (wpływają na odbiór kompetencji). Priorytet N = cosmetic.

### PRIORYTET 1: punkt 1 sekcji "Co robię" -- brak opisu procesu

**BYŁO (v2, L31–33):**
> **1. Implementacja narzędzi AI pod Twój proces.**
> Dobór i wdrożenie wokół tego, co firma już robi -- po polsku, z uwzględnieniem polskiej specyfiki (KSeF, JPK). Nie wdrażam gotowców z pudełka...

**PROBLEM:** To jest 100% agency-speak. "Dobór i wdrożenie" to rzeczownikowe tłumaczenie "selection and implementation". Polak tak nie pisze. Proces jest ukryty pod dwoma rzeczownikami. Żaden czytelnik nie wie, CO dokładnie robisz.

**MIALO BYC (v1, HEAD~1):**
> **1. Automatyzuję powtarzalną pracę.**
> Faktury i dokumenty: odczyt danych → przygotowanie wpisu → wyjątki lądują u Ciebie do zatwierdzenia. Maile i zestawienia: przygotowanie szkicu i danych, wysyłka po Twojej akceptacji. Przenoszenie danych między arkuszami i systemami: bez ręcznego przepisywania.

**POWINNO (propozycja v3, scalenie konkretu v1 z tonem v2):**
> **1. Automatyzuję powtarzalną pracę.**
> Faktury: odczyt danych z PDF, przygotowanie wpisu do systemu, wyjątki lądują u Ciebie do zatwierdzenia. E-mail: szkic odpisi na bazie szablonu, wysyłka po Twojej akceptacji. Arkusze: przenoszenie danych między plikami bez ręcznego przepisywania. Jeśli praca wymaga osądu -- zostaje u ludzi.
>
> (Opcjonalnie dokończenie w duchu v2): Wdrażam wokół tego, co firma już robi -- po polsku, z uwzględnieniem KSeF i JPK.

**Uzasadnienie:** v1 miał ten sam format -- nazwany proces krok po kroku, trzy konkretne przypadki użycia, zero fluffu. To jest właśnie to, co odróżnia ciebie od każdej innej agencji AI, która powie "implementujemy rozwiązania AI dostosowane do Twojego biznesu". Trzy linie v1 vs trzy akapity v2 = większy wpływ na czytelnika.

### PRIORYTET 2: punkt 2 sekcji "Co robię" -- Nauka zespołu bez konkretyzacji

**BYŁO (v2, L35–37):**
> **2. Nauka Twojego zespołu — na Waszych zadaniach, nie na cudzych przykładach.**
> Nie sprzedaję kursu, bo kurs jest ten sam dla wszystkich, a każda firma ma innych ludzi i inne procesy -- gotowy pakiet i tak by się nie przydał. Uczę na realnych zadaniach Twojej firmy i na Waszych narzędziach, krok po kroku, w tempie zespołu. Po wdrożeniu zespół umie pracować sam.

**PROBLEM:** Punkt jest całkowicie self-referencyjny -- mówi TYLKO o tym, czym NIE jest (nie jest to kurs). Nie zawiera żadnego opisu tego, CZYM Jest. Co oznacza "krok po kroku"? Ile sesji? Czy to happening, czy cykliczne spotkania? Co znaczy "po wdrożeniu zespół umie"? Skąd to wiemy?

**POWINNO (propozycja v3):**
> **2. Szkolenie Twojego zespołu na waszych zadaniach.**
> Pracujemy na rzeczywistych zadaniach i w waszych narzędziach, nie na przykładach z internetu. Pierwsze zadanie: robimy razem, krok po kroku. Następne: Ty robisz, ja pilnuję. Kolejne: ty robisz sama, sprawdzamy efekt. Po serii takich zadań zespół potrafi obsłużyć analogiczne zadania bez mojego udziału.
>
> (Usuń całe zdanie o "nie sprzedaję kursu" -- to powtórzenie z intro, v2 ma to już trzy razy).

**Uzasadnienie:** Format "razem → pod nadzorem → samodzielnie" to realny pedagogiczny framework, który klient może zweryfikować. Zero ogólników.

### PRIORYTET 3: punkt 3 sekcji "Co robię" -- raporty bez miernika

**BYŁO (v2, L39–41):**
> **3. Raporty, które prowadzą do decyzji.**
> Liczby z zamówionych źródeł (GUS, Eurostat, Twoje własne dane) z podanym źródłem i rokiem -- nie dashboard dla dashboardu. Wynik: wiadomo, co się opłaca, a co nie.

**PROBLEM:** "Wiadomo, co się opłaca, a co nie" -- jakich danych? O czym konkretnie raportuje? Z kontekstu broszury wynika, że Marcin produkuje raporty analityczne (porównania regionalne, badanie granic AI). To powinien być konkretny przykładowy temat raportu, nie obietnica ogólnej kompetencji.

**POWINNO (propozycja v3):**
> **3. Analizy wspierające decyzje.**
> Przykładowy raport: porównanie wyników gospodarczych regionu X wobec średniej UE na podstawie Eurostat -- ze źródłem, rokiem i komentarzem. Cel: nie dashboard dla dashboardu, lecz materiał do rozmowy z zarządem/inwestorem/deweloperem.
>
> Alternatywa (krótsza): Analiza: pobieram dane z GUS/Eurostat/własnych źródeł, łączę je i komentuję -- dostajesz jeden dokument do wykorzystania w negocjacjach lub planowaniu. Nie dashboard, tekst.

**Uzasadnienie:** Zastosowanie "Eurostat" zbroi się z tym, co jest już w broszurze (sekcja "Dlaczego większość firm..."). Ten sam zbiór danych pojawia się w punkcie 3 -- zrób z tego świadomy link brandingowy, nie powtórzenie przypadkowe.

### PRIORYTET 4: intro -- skrócenie powtórzeń

**BYŁO (v2, L10):**
> *Każda firma ma innych ludzi, więc nie sprzedaję kursu ani gotowca -- narzędzia powstają wokół Twojego procesu. Automatyzacja powtarzalnej pracy jest tu efektem ubocznym wyższej produktywności, nie celem samym w sobie.*

**POWINNO (propozycja):**
> *Buduję rozwiązania wokół Twojego procesu, nie sprzedaję gotowca. Automatyzacja jest efektem ubocznym produktywności, nie celem samym w sobie.*

**Uzasadnienie:** Usunięcie "każda firma ma innych ludzi" (prawda oczywista, flaga #1 z inventory). Pozostałe dwa zdania zostały bez zmian -- to jest jedyny moment w broszurze, gdzie teza ma sens jako differentiation.

### PRIORYTET 5: sekcja "Jak zaczynamy" -- usunięcie reassurance

**BYŁO (v2, L65):**
> "...Decyzja o rozszerzeniu zapada na faktach, nie na obietnicach -- jeśli po pomiarze okaże się, że nie warto ruszać procesu, powiem to wprost. A jeśli warto -- zostajesz z zespołem, który umie robić to sam."

**Dodano (fragment L67):** "Nawet jeśli odpowiedź brzmi 'nie ruszaj tego teraz'."

**PROBLEM:** L67 jest reassurance kicker w stylu humanizer #34. Autor pewnie chce pokazać uczciwość, ale forma "nawet jeśli odpowiedź brzmi X, powiem ją wprost" sugeruje, że powiedzenie "nie" jest nietypowe. W rzeczywistości powinno być standardem -- jeśli proces nie się opłaca automatyzować, to powinna być defaultowa rekomendacja.

**POWINNO:**
> Jeden proces, nie cała firma. Najpierw pomiar: ile czasu zajmuje dziś. Potem wdrożenie i nauka w małym zakresie i pomiar po zmianie. Decyzja o rozszerzeniu zapada na faktach -- jeśli po pomiarze okaże się, że proces nie opłaca się automatyzować, powiem to wprost.

**Uzasadnienie:** Usunięcie redundantnego "nawet jeśli" i "Nawet jeśli odpowiedź..." z L67. Usunięcie "A jeśli warto -- zostajesz z zespołem, który umie robić to sam" (nadmiar entuzjazmu, brak miernika). Zostawienie mechanizmu przed/po pomiar jako głównego argumentu.

### PRIORYTET N: pozostałe drobne clean-upy

| # | Fragment (v2) | Propozycja |
|---|---|---|
| N1 | L46: "dane nie trafiają do przypadkowych usług" | "dane nie trafiają do usług bez umowy" |
| N2 | L45: "Automatyzacja nigdy nie działa w Twoim imieniu bez kontroli." | "Żadna automatyzacja nie działa bez Twojej zgody." |
| N3 | L59: "szukasz gotowego kursu lub szkolenia grupowego -- uczę indywidualnie na Twoich zadaniach; pakiet dla wszystkich nie powstanie, bo nie ma takiego, który pasuje do każdej firmy;" | "szukasz gotowego kursu -- uczę indywidualnie na Twoich zadaniach." |
| N4 | L61: "proceso jest w pełni opanowany i nie ma czego poprawiać -- nie ma czego sprzedać." | "proceso jest w pełni opanowany i nie ma czego poprawiać." |
| N5 | L18–19: pogrubienie liczb 5,8% / 14,8% | zachować pogrubienie -- to jest uzasadnione (kluczowe liczby) |

---

## 3. DELTA v2 vs v1: co utracono

### Porównanie blokowe

| Element | v1 (HEAD~1) | v2 (current) | Status |
|---|---|---|---|
| **Tytuł** | "Nie zastępuję ludzi. Automatyzuję powtarzalną pracę." | "Nie zastępuję ludzi. Wdrażam i uczę AI w Twojej firmie." | v2 szerszy (AI ≠ automatyzacja), ale "wdrażam i uczę" to agency-speak. v1 "automatyzuję powtarzalną pracę" = konkretny czasownik. |
| **Podtytuł** | "AI jako narzędzie w małej i średniej firmie -- co warto zautomatyzować, a co zostawić ludziom." | Bez podtytułu. | v1 miał 1 linijkę orientacyjną. |
| **Punkt 1** | "Automatyzuję powtarzalną pracę." + **konkretne procesy** (faktury, maile, arkusze z symbolami strzałek) | "Implementacja narzędzi AI pod Twój proces." + **meta-opis** (brak procesu) | ⚠️ v2 UTWIERDZIŁ konkty. Najważniejsza zmiana. |
| **Punkt 2** | "Buduję narzędzia dopasowane do procesu." + opis techniczny (KSeF/JPK, loop człowieka) | "Nauka Twojego zespołu" + opis PEDAGOGICZNY (ale bez frameworku) | ⚠️ v2 PRZEMIANOWAŁ: z "buduję narzędzia" na "uczę zespołu". Stracił kontekst techniczny -- teraz brzmi jak typowe HR-szkolenie. |
| **Sekcja "Dla kogo Tak"** | 3 bullety | 4 bullety | v2 dodał "zespół chce sam umieć pracować z AI" (flaga #11 - niewalidowalny sygnał) |
| **Sekcja "Dla kogo Nie"** | 3 bullety | 3 bullety (jednak inny skład) | v2 dodał "szukasz gotowego kursu" (duplikat z intro) |
| **"Bez uzależnienia"** | Identyczne | Identyczne | Niezmienione od v1 |
| **Intro/lead** | 1 zdanie | Rozwiniete do 2 zdań z powtórzeniami | v2 rozlał ten sam content |

### Kluczowa utrata: bloki procesowe z v1

v1 sekcja 1 (punkt 1) zawierała **trzy konkretne przykłady procesów**:
```
Faktury i dokumenty: odczyt danych → przygotowanie wpisu → wyjątki lądują u Ciebie do zatwierdzenia.
Maile i zestawienia: przygotowanie szkicu i danych, wysyłka po Twojej akceptacji.
Przenoszenie danych między arkuszami i systemami: bez ręcznego przepisywania.
```

To były cztery zdania, zero meta-discourse, zero obietnic o "wyższej produktywności". Przeciętny czytelnik (właściciel biura rachunkowego lub MŚP) czytał to i NATYCHMIAST wiedział, CZEGO można się spodziewać.

v2 zamienił to na:
```
Dobór i wdrożenie wokół tego, co firma już robi -- po polsku, z uwzględnieniem polskiej specyfiki (KSeF, JPK).
```

JEDNO zdanie rzeczownikowe, które mogło podpisać KAŻDY consultant AI.

### Dlaczego to się stało

W commit d95b0fc autor zmienił frazę "automatyzuję powtarzalną pracę" na "wdrażam i uczę AI" i jednocześnie "rozwinął" opis punktu 1 dodając meta-rassurances ("nie wdrażam gotowców z pudełka", "człowiek w pętli"). Zamiast dodać tych informacji DO opisu procesu, usunięto sam opis procesu.

Efekt: v2 jest dłuższy o ~15% (4922 vs ~4200 znaków), ale zawiera MNIJE informacji o tym, CO TAK NAPRAWDĘ robisz.

### Rekomendacja delta

Scalić back procesy z v1 do v2, zachowując nowy kier tematyczny v2 (wdrożenie + nauka). Proponowana struktura:

```
1. Automatyzuję powtarzalną pracę. [procesy z v1]
2. Szkolenie zespołu na Twoich zadaniach. [framework: razem → nadzór → samodzielnie]
3. Analizy wspierające decyzje. [Eurostat konkret]
```

Usunąć: wszystkie powtórzenia o "nie sprzedaję kursu", reassurance kickery, agentyspeak ("dobór i wdrożenie").

---

## 4. CHECKLISTA avoid-ai-writing / humanizer -- zastosowanie

### avoid-ai-writing patterns detected:

| Pattern ID | Name | Where found | Severity |
|---|---|---|---|
| P1 | Template phrase / slot-fill | L10 (intro), L45 (zasady) | P1 |
| P1 | Formulaic opening | L25 (abstrakcyjne pytanie) | P1 |
| P1 | Generic future-narrative closer | L37, L65 | P1 |
| P2 | Repeated setup/reversal | L39, L45 (AI proponuje, Ty zatwierdzasz x2) | P2 |
| P2 | Compulsive rule of three | L43–48 (4 zasady - borderline, context-dependent) | P2 |
| P2 | Judgment-only clarity checks | L45 (tautologia o kontroli) | P2 |
| P2 | Unnecessary hyphenation compound words | brak | -- |
| P2 | Tier 3 phrase repetition | "gotowce z pudełka" w różnych formach (L33, L59) | P2 |

### humanizer patterns detected:

| Pattern # | Name | Where found |
|---|---|---|
| #1 | Undue emphasis on significance | L37 ("bez ciągłego wynajmowania mnie") |
| #5 | Vague attributions | L25 ("czy ktokolwiek w firmie") - nie autor, ale abstrakcja |
| #7 | Overused AI vocabulary | brak wyraźnych anglicyzmów -- dobrze |
| #8 | Copula avoidance | L31 ("Dobór i wdrożenie" jako rzeczowniki zamiast czasowników) |
| #9 | Negative parallelism | L10 ("nie kursu, nie gotowca"), L45 ("AI proponuje, Ty zatwierdzasz") |
| #10 | Rule of three overuse | L43–48 (4 elementy) -- OK w tym przypadku, context-dependent |
| #18 | Emojis | brak -- dobre |
| #22 | Sycophantic/servile tone | L46 (zapewnienia o RODO) |
| #25 | Generic positive conclusions | L37 ("zespół umie pracować sam") |
| #29 | Fragmented headers | L31, L35, L39 (nagłówki + 1-liner intro) -- borderline |
| #31 | Punchy kickers | L37 ("bez ciągłego wynajmowania mnie") |
| #34 | Reassurance kickers | L67 ("Nawet jeśli odpowiedź brzmi...") |
| #6 | Outline-like challenges section | brak |

### Positive findings (co działa dobrze):

- Tabelka Eurostat (L14–23): konkretna, źródłowa, unikalna. To jest najwartościowszy fragment broszury.
- Zasada "Człowiek decyduje" (L45): prosta, zrozumiała, repeatable.
- Punkt "Dla kogo to ma sens -- i dla kogo nie": dobra idea, potrzebuje tylko precyzyjsniejszych filtrów.
- Ton "na ty" -- spójny przez cały dokument.
- Zero emoji -- dobrze.
- Brak typowych angielskich AI-isms (delve, leverage, harness) -- zgodnie z językiem polskim.

---

## 5. WERDYKT

**WERDYKT: DO DOSTROJENIA (N=3)**

Broszura v2 nie jest FAIL -- ma solidny szkielet, dobre dane (Eurostat), spójny rejestr i realną różnicację (wdrożenie + nauka + analizy). Ale trzy miejsca wymagają natychmiastowej poprawy:

1. **Sekcja "Co robię", punkt 1:** powrót konkretnych procesów z v1 (faktury→maile→arkusze) to must-have. To jest TWÓJ USP, nie "dobór i wdrożenie wokół tego, co firma już robi".
2. **Sekcja "Co robię", punkt 2:** framework pedagogiczny ("razem → nadzór → samodzielnie") zamiast meta-discourse o tym, co NIE jest kurs.
3. **Powtórzenia:** "nie sprzedaję kursu" występuje 3x (intro, punkt 2, "Nie jeśli"). Raz wystarczy.

### Czego nie dotykać (lub dotknąć później):

- Tabelka Eurostat: OK, solidna.
- "Człowiek decyduje" / "Dane pod kontrolą" / "Bez uzależnienia": OK.
- Call-to-action "20 minut rozmowy": OK, prosty.

### Otwarte pytania do Marcina:

1. Czy masz REALNE przykłady procesów, które wdrożyłeś? (faktury, maile, arkusze -- czy to sprawdzone przypadki, czy hipotetyczne?)
2. Jak wygląda proces "Nauka zespołu" w praktyce? Ile sesji? Jak mierzymy sukces ("zespół potrafi sam")?
3. Czy chcesz usunąć obiekcję "nie wdrażam gotowców z pudełka" -- czy to真实 concern klientów, whom you've actually encountered?
4. Raport Eurostat w punkcie 3: czy to artefakt, który juz stworzyłeś, czy plan przyszłościowy? (Jeśli realny -- nazwij to konkretnie. Jeśli nie -- usuń z broszury.)
5. Czy tytul "Nie zastępuję ludzi" jest nadal właściwy, czy lepiej wrócić do "Nie zastępuję ludzi. Automatyzuję powtarzalną pracę."?

---

*Audyt wykonany automatycznie. Wszystkie cytaty z v1 pochodzą z `git show HEAD~1`. Katalogi wzorców z avoid-ai-writing (v3.35.0) i humanizer (v2.5.1). Zero wymyślonych faktów -- wszystkie propozycje oparte wyłącznie na tekście v2, v1 i powszechnie znanych procesach MSP.*
