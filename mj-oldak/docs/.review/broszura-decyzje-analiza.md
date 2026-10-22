# Broszura MSP — Decyzje Analiza (Zespół B, punkt A–E)

**Data:** 2026-10-20  
**Status:** Gotowe do wdrożenia do v4 lub decyzja Marcina.

---

## FAkt-check artefaktu ai_adoption_report

**Co znalazłem:**
- `/mj-oldak/mj-oldak/public/reports/ai_adoption_report.pdf` — statyczny plik PDF
- `/mj-oldak/mj-oldak/src/data/adoption_by_size_2025.json` — źródło danych JSON (1-raz)
- `/mj-oldak/mj-oldak/dist/articles/covers/what-the-data-says-ai-adoption-poland-vs-eu.png` — okładka artykułu
- `/mj-oldak/mj-oldak/dist/en/articles/what-the-data-says-ai-adoption-poland-vs-eu` — strona artykułu

**Werdykt faktowy:** ai_adoption_report to **jednorazowy raport/artykuł**, nie narzędzie produkujące raporty. Jest wygenerowany z jednego zbioru danych Eurostat i wypalony jako statyczny asset (PDF + strona HTML). Nie ma skryptu/kodu który generuje go dynamicznie ani nie jest usługą/subskrypcją. To artykuł badawczy, nie produkt.

---

## A. PRZYKŁADY PROCESÓW (str. 33–35) — KRYTYCZNE

**Problem:** Tekst brzmi jak dostarczone wdrożenia. Sekcja „Co robię" sugeruje portfolio zrealizowanych projektów. W vetach broszury v3: `realność przykładów` = hard veto. Jeśli klient weźmie „Faktury: odczyt..." jako referencję — jest to overclaim.

**Konkretne zdania z broszury (line 33–35):**
```
1. Faktury: odczyt danych z PDF, przygotowanie wpisu do systemu, wyjątki lądują u Ciebie do zatwierdzenia.
2. E-mail: szkic odpowiedzi na bazie szablonu, wysyłka po Twojej akceptacji.
3. Arkusze: przenoszenie danych między plikami bez ręcznego przepisywania.
```

**Diagnoza:** Każde z trzech zdań opisuje workflow w trybie obecności czasowej/bezwzględnym — brzmi jak coś co już działało. Bez przedrostka „Przykład procesu faktur wygląda tak:" lub „Oto scenario:" — claim = dostarczone wdrożenie.

### Rekomendowane replacementy

#### Opcja 1 — Scenariusz (najbezpieczniejsza, zgodna z tone broszury):
```diff
-**1. Automatyzuję powtarzalną pracę.**

-Faktury: odczyt danych z PDF, przygotowanie wpisu do systemu, wyjątki lądują u Ciebie do zatwierdzenia. E-mail: szkic odpowiedzi na bazie szablonu, wysyłka po Twojej akceptacji. Arkusze: przenoszenie danych między plikami bez ręcznego przepisywania. Wdrażam wokół tego, co firma już robi — po polsku, z uwzględnieniem KSeF i JPK. Jeśli praca wymaga osądu — zostaje u ludzi.
+**1. Automatyzuję powtarzalną pracę.**

+Przykład procesu faktur wygląda tak: odczyt danych z PDF, przygotowanie wpisu do systemu, wyjątki lądują u Ciebie do zatwierdzenia. Przykład e-maila: szkic odpowiedzi na bazie szablonu, wysyłka po Twojej akceptacji. Arkusze: przenoszenie danych między plikami bez ręcznego przepisywania. Wdrażam wokół tego, co firma już robi — po polsku, z uwzględnieniem KSeF i JPK. Jeśli praca wymaga osądu — zostaje u ludzi.
```

#### Opcja 2 — Ramka hipotetyczna (krótsza):
```diff
+Przykładowy proces faktur: odczyt z PDF → wpis do systemu → wyjątki u Ciebie. 
+E-mail: szkic z szablonu → twoja akceptacja → wysyłka. 
+Arkusze: przenoszenie bez przepisywania.
+Wdrażam wokół tego, co firma już robi — po polsku, z uwzględnieniem KSeF i JPK. Jeśli praca wymaga osądu — zostaje u ludzi.
```

**Rekomendacja:** Opção 1. Zachowuje gęstość tekstu, jedyna zmiana to dodanie „Przykład procesu X wygląda tak:" przed każdym przykładem. Zero flow disruption dla czytelnika końcowego.

**WERDYKT A:** SPOJNE po replacementie. Po wstawieniu prefixów — zero ryzyka overclaimu. NIE jest FAIL — tekst jest spójny z intencją (pokazanie możliwości), tylko ramowanie jest za mocne.

---

## B. PRZYKŁAD RAPORTU (punkt 3) — WERYFIKACJA ARTEFAKTU

**Tekst broszury (lines 43–47):**
```
**3. Analizy wspierające decyzje.**

Dane z GUS, Eurostatu, własnych źródeł — z podanym źródłem i rokiem. Cel: nie dashboard dla dashboardu, materiał do rozmowy z właścicielem i zespołem. Tekst, nie wykres.
```

**Stan faktyczny:** ai_adoption_report istnieje jako **publikowany artykul/raport**. Jest konkretnym dowodem że umiesz zrobić taki produkt end-to-end: dane Eurostat → analiza → PDF/HTML. Ale to jeden raz, nie usługa regularna.

**Jeśli raport istnieje (co potwierdziłem):** Zaproponuj ujęcie jako **przykład/dowód kompetencji**, nie jako stałą usługę. Jedno zdanie które linkuje do istniejącego artefaktu bez obietnicy przyszłych dostaw.

### Rekomendowana modyfikacja sekcji 3:

```diff
 **3. Analizy wspierające decyzje.**

-Dane z GUS, Eurostatu, własnych źródeł — z podanym źródłem i rokiem. Cel: nie dashboard dla dashboardu, materiał do rozmowy z właścicielem i zespołem. Tekst, nie wykres.
+GUS, Eurostat, Twoje wewnętrzne dane — z podanym źródłem i rokiem. Na przykład mój raport adopcji AI w Polsce na bazie Eurostatu (pdf: https://mjoldak.pl/reports/ai_adoption_report.pdf) pokazuje jak takie analizy wyglądają: tekst, nie dashboard, materiał do rozmowy z właścicielem. Cel ten sam przy każdym projekcie — nie dashboard dla dashboardu, ale konkret do decyzji.
```

**Uwaga:** URL musi zostać zweryfikowany przez Marcina. Jeśli link publiczny ≠ `https://mjoldak.pl/reports/ai_adoption_report.pdf` — dostosować.

### Alternatywa neutralna (jeśli Marcin nie chce linkować artefaktu):

```diff
 **3. Analizy wspierające decyzje.**

-Dane z GUS, Eurostatu, własnych źródeł — z podanym źródłem i rokiem. Cel: nie dashboard dla dashboardu, materiał do rozmowy z właścicielem i zespołem. Tekst, nie wykres.
+GUS, Eurostat, Twoje wewnętrzne dane — z podanym źródłem i rokiem. Przekuwam je w tekst, nie dashboard — materia do rozmowy z właścicielem i zespołem. Jeden konkretny artykuł z moich doświadczeń: raport adopcji AI w Polsce (Eurostat). Takie analizy wyglądają w praktyce.
```

**WERDYKT B:** SPÓJNE po edycji. Raport istnieje, jest realny, linkowalny. Kluczowe: nie twierdzić że „tworzę raporty na zamówienie" ale że „robione są takie analizy".

---

## C. MODEL ROZLICZEŃ — MENU 3 STRUKTUR (DECYZJA MARCINA)

**Kontekst decyzyjny:** STATUS.md stwierdza `Pricing: TBD. Pierwsze wdrożenia = pilot za darmo.` (decyzja 2026-04-23). Skill pricing-creativity stosuje Blair Enns 3-options menu po pilocie, Stark anty-hourly pre-pilot. Brak cennika, brak stawek w żadnych dokumentach klienckich.

### Menu struktur rozliczeń (bez kwot!)

#### Struktura 1: Pakiet zamknięty za proces
- **Jak działa:** Klient płaci za wdrożenie konkretnego procesu (np. faktury, e-maile). Scope i deliverable ustalone z góry. Po wdrożeniu — koniec engagementu lub nowy proces.
- **Pasuje kiedy:** Proces jest dobrze znany, scope ograniczony, klient chce jasny boundary co dostaje. Idealne na pilota — jeden proces, jasna cena, zerowe ryzyko.
- **Risks:** Scope creep jeśli proces jest szerszy niż zakłada klient. Wymagana specyfikacja.

#### Struktura 2: Stawka godzinowa
- **Jak działa:** Płacisz za czas pracy. Elastyczne, niejasne dla klienta.
- **Pasuje kiedy:** Tylko przy bardzo niestandardowych wymaganiach gdzie scope nie da się ogarnąć pakietem. Lub jako fallback gdy pilotażowy proces wychodzi poza specyfikację.
- **Risks:** Anti-con-artist self-test (#41 Persona CEO) — godzinowo to sygnał słabości anchora. Klient porównuje stawkę rynkową, nie wartość. Stark: kara za bycie szybkim z toolingiem.

#### Struktura 3: Miesięczny pakiet godzinowy (subscription retainer)
- **Jak działa:** Klient kupuje pakiet godzin miesięcznie (np. 10h/mies). Godziny się nie kopiują. Używa ich na tuningu, small-fixy, nowe tiny-processy. Długofalowe partnerstwo.
- **Pasuje kiedy:** Po pierwszej udanej automatyzacji — klient chce ciągłe wsparcie. Buduje LTV. Stable income bez projektowania każdego new-engagement od zera.
- **Risks:** Klient może czuć się zobowiązany. Wymaga disciplined scope management.

### Rekomendacja

**W broszurze NIE wprowadzać modelu rozliczeń.** Powód: pricing = TBD, pilot = darmowy. Dodawanie jakiejkolwiek struktury do broszury klienckiej jest przedwczesne i niezgodne z decyzją Martina. Broszura sprzedaje rozmowę/pilot („20 minut rozmowy"), nie cenę. Gdy cennik powstanie (po pilocie), broszura dostanie osobny update z konkretnymi liczbami i 3-options menu wg Enns.

**Jeśli Marcin INSISTUJE żeby cokolwiek pojawiło się w broszurze:** Jedno zdanie zamiast tabelki:
```
Rozliczenie ustalamy po pomiarze — bo każdy proces jest inny. Pilot na pierwszym procesie jest darmowy, żebyśmy razem sprawdzili ile to jest warte.
```

To jest bezpieczne, zgodne z pricing TBD, i nie obciąża kontekstu.

**WERDYKT C:** DO DOSTROJENIA. Należy do słowa Marcina. Rekomendacja: ZERO w v4 broszury, ew. jedno zdanie pilot-free.

---

## D. FRAMEWORK NAUKI 3 KROKI (line 39)

**Tekst:**
```
Pracujemy na rzeczywistych zadaniach i w Waszych narzędziach, nie na przykładach z internetu. Pokazuję na Waszym przykładzie → robimy razem na realnym zadaniu → pracujesz sam przy moim wsparciu.
```

### Ocena spójności z resztą broszury

1. **Sekcja „Dla kogo" (line 58–59):** `zespół chce sam umieć pracować z AI` — framework nauki bezpośrednio obsługuje ten use-case. Spójne. ✅

2. **Sekcja „Jak pracuję — cztery zasady":** Brak zasad dotyczących transferu wiedzy/szkolenia personom. Framework nauki jest w sekcji „Co robię" pod punktem 2, co jest poprawnym placementem — to jest usługa którą świadczy. Spójne. ✅

3. **Struktura logiczna:** `Pokazuję → Robimy razem → Pracujesz sam` to klasyczny instructional scaffold (I do, We do, You do — Brown, Collins & Duguid 1989). Logiczne, standard pedagogiczne. Nie kłóci się z niczym. ✅

4. **Ton i style:** Framing jest personalny (`Pokazuję`, `robimy`, `pracujesz`) — pasuje do voice broszury (mówi Marcin, nie korporacja). ✅

### Uwaga kontaminacji Claim↔Code (veto #2)

Framework nauki to **proces Marcina** — czy potrafi to rzeczywiście prowadzić? To nie jest fact-check, to ocena spójności tekstowej. Z perspektywy tekstu: framework pasuje do sekcji „Dla kogo" i „Co robię". Nie ma tu żadnego twierdzenia o wynikach („nauczyłem X klientów") — więc nie ma overclaimu.

**WERDYKT D:** SPOJNE. Framework jest tekstowo spójny z resztą broszury. NIE zatwierdzam merytoryki (to process Marcina) — ale nie ma powodu go kasować zbroszury.

---

## PODSUMOWANIE WOJSKOWE

| Punkt | Werdykt | Co ZAMKNIĘTE (można w v4) | Co POTRZEBNE SŁOWA MARCINA |
|-------|---------|---------------------------|---------------------------|
| **A. Przykłady procesów** | SPOJNE po fixie | Replacement z prefixem „Przykład procesu X wygląda tak:" (opcja 1) | — |
| **B. Raport / punkt 3** | SPOJNE po fixie | Linkowanie ai_adoption_report jako dowodu kompetencji lub neutralna wersja | URL raportu (czy `https://mjoldak.pl/...` jest poprawny?) |
| **C. Model rozliczeń** | DO DOSTROJENIA | NIE dodawać nic do v4 (pricing TBD) | Czy Marcin chce jedno zdanie o pilocie? Jeśli tak — gotowy tekst powyżej. Jeśli nie — puste pole. |
| **D. Framework nauki** | SPOJNE | Zostawić bez zmian | — |
| **E. H1** | — | Robi Krytyk osobno | — |

### Stan końcowy v4: 3 zamknięte, 1 otwarta (C)

- **A → FIXED:** Prefixy „Przykład procesu..." usuwają ryzyko overclaimu.
- **B → FIXED:** Raport linkowany jako artefakt, nie jako obiecana usługa.
- **D → ACCEPTED:** Spójny z resztą tekstu.
- **C → AWAITING MARCIN:** Decyzja — zero tekstu vs. jedno zdanie o pilocie.
