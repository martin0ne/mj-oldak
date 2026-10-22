# Decyzja H1 — broszura MSP v3

**Data:** 2026-10-20
**Rola:** Krytyk (zespół B)
**Cel:** Wybór H1 i ocena spójności pierwszej strony

---

## Historia wariantów

| Wersja | H1 | Źródło |
|---|---|---|
| v0 | Nie zastępuję ludzi. Automatyzuję powtarzalną pracę. | commit 0904ad7 |
| v2 | Nie zastępuję ludzi. Wdrażam i uczę AI w Twojej firmie. | commit d95b0fc |
| v3 / HEAD | Nie zastępuję ludzie. Wdrażam i uczę AI w Twojej firmie. | obecny stan |

W v2 „automatyzuję powtarzalną pracę" zastąpiono „wdrażam i uczę", co przesuwa H1 z narzędzia na metodę. v3 zachowuje tę linię.

---

## Analiza alternatyw (perspektywa czytelnika)

Właściciel MŚP 20-50 osób, przeglądając ofertę AI, porównuje ją do:

1. **Freelancer / wykonawca** — zrobi za Ciebie i zniknie → klient zostaje zależny
2. **Kurs / szkolenie grupowe** — teoria dla każdego, a nie jego zespół i zadania
3. **Konsultant audytowy** — powie co robić, ale nie ruszy rękami do roboty
4. **DIY z ChatGPT / YouTube** — działa okazji, nie skaluje się w codziennej pracy
5. **Status quo** — nadal ręcznie, albo najem dodatkowej osoby

H1 musi rozbić którąś z tych alternatyw — najlepiej od razu.

---

## Warianty H1

### V3 (obecny)

> Nie zastępuję ludzie. Wdrażam i uczę AI w Twojej firmie.

**Kontrast vs alternatywy:**
- Vs freelancer: „uczę" = transfer wiedzy, nie jednorazowa usługa
- Vs konsultant: „wdrażam" = ruszam rękami do realnej implementacji
- Vs DIY: brak slotu — H1 nie adresuje oszustwa gotowymi promptami

**Spójność z broszurą:** lead („Buduję rozwiązania wokół Twojego procesu, nie sprzedaję gotowca.") potwierdza custom-build; sekcja „Co robię" daje 3 filary (automatyzacja jako efekt uboczny, nauka zespołu, analizy); CTA („pokażesz jeden proces") matchuje promise wdrożenia. Wszystkie obietnice H1 są pokryte.

**Zrozumiałość:** słowo „wdrażam" może być niejasne dla nietechnicznego właściciela (kojarzy się z IT/deployment), ale context natychmiast rozjaśnia standfirst i dalszą treść. Max 2 zdania — OK.

---

### V1 (wariant z v0)

> Nie zastępuję ludzie. Automatyzuję powtarzalną pracę.

**Kontrast vs alternatywy:**
- Vs freelancer: klient widzi automatyzację, nie „zrobione za mnie"
- Vs kurs: żaden sygnał edukacyjny — klient myśli „to jest jak gotowy skrypt?"
- Vs DIY: silniejszy kontrast — „robię to JA, nie Ty sam"

**Spójność z broszurą:** H1 obiecuje automatyzację i tyle. Nauka zespołu (podpunkt 2 w „Co robię") wygląda jako dodatek, nie równorzędna obietnica. Standfirst wspomina „nie sprzedaję gotowca", ale nie补偿uje brak edukacji w H1. Redukuje ofertę 3-filarową do jednego filara.

**Zrozumiałość:** bardzo wysokie. Każde słowo znane. Max 2 zdania — OK.

**Problem fundamentalny:** H1 obiecuje mniej niż reszta broszury. Czytelnik dostaje automatyzację w tytule, a potem odkrywają, że kluczowym elementem jest nauka zespoła. To niespójność promys->delivery.

---

### E — mój propozycja: pełna obietnica

> Nie zastępuję ludzie. Automtizuję powtarzalną pracę i uczę Twój zespół.

**Kontrast vs alternatywy:**
- Vs freelancer: +nauka = nie zostajesz zależny
- Vs kurs: +wdrożenie = nie ma teorii bez Twoich danych
- Vs DIY: jasny przekaz „robimy TO RAZEM na Twoich zadaniach"

**Spójność z broszurą:** H1 obejmuje podpunkty 1 i 2 z „Co robię". Analizy (podpunkt 3) nie są w H1 — akceptowalne, bo to service add-on, nie core promise. CTA matchuje obie obietnice.

**Zrozumiałość:** wszystkie słowa proste. Dwie obietnice w jednym H1 — ryzyko info overload na pierwszej stronie PDF. Czytelnik musi przetworzyć dwie rzeczy naraz. Może skanować i zapamiętać tylko jedno.

**Ryzyko:** dłuższy H1 = trudniejszy do zeskanowania wzrokiem na first page PDF. Właściciel MŚP przegląda broszurę szybko — dwa promises naraz mogą obniżyć recall.

---

### F — mój propozycja: benefit-first

> Twoja firma pracuje wydajniej — wdrażam i uczę AI.

**Kontrast vs alternatywy:**
- Vs wynajem dodatkowej osoby: wynik („pracy wydajniej") przed kosztownym hire
- Vs kurse/audyty: konkretna metoda (wdrożenie + nauka)

**Spójność z broszurą:** lead („Nie buduję sztywnych systemów...") potwierdza custom-build; CTA matchuje promise. Ale „produktywność" w H1 jest zbyt abstrakcyjny — każda agencja obiecuje „lepszą produktywność". Zero unique differentiation.

**Zrozumiałość:** „produktywność" to korporacyjne słowo. Właściciel MŚP skojarzy je z KPI lub raportem, nie z realnym skutkiem (mniej godzin na faktury). Brakuje konkretu.

**Problem:** H1 pozycjonuje MJ.OLDAK head-to-head z każdą inną firmą oferującą produktywność. To dryf od niche positioningu.

---

## Tabela oceny kryteriów

| Kryterium | V3 | V1 | E | F |
|---|---|---|---|---|
| Rozbija realną alternatywę | ⚠️ częściowo | ✅ tak | ✅ tak | ❌ słabo |
| Spójność H1↔lead↔CTA | ✅ pełna | ⚠️ H1 < treści | ✅ pełna | ✅ pełna |
| Zrozumiałe (bez słownika) | ⚠️ „wdrażam" | ✅ pełne | ✅ pełne | ⚠️ „produktywność" |
| Czytelne na PDF (max 2 zdania) | ✅ tak | ✅ tak | ✅ tak (ale długi) | ✅ tak |
| Głos Marcina (na ty, konkret) | ✅ tak | ✅ tak | ✅ tak | ✅ tak |
| Pozycjonowanie (vs AI-replacement hype) | ✅ najlepsze | ✅ dobre | ✅ dobre | ❌ brak |

---

## REKOMENDACJA

### Primary: V3 — „Nie zastępuję ludzi. Wdrażam i uczę AI w Twojej firmie."

**Dlaczego:** Najlepsze strategiczne pozycjonowanie wobec AI-hype („nie zastępuję"), pełna spójność z delivery (wszystkie obietnice H1 pokryte w broszurze), zero nadmiaru informacji na first page, głos Marcina rozpoznawalny (krótkie zdania, anty-narrative otwarcie). Jedyna niedoskonałość to „wdrażam" — ale kontekst broszury go natychmiast rozjaśnia.

### Fallback: E — „Nie zastępuję ludzi. Automatyzuję powtarzalną pracę i uczę Twój zespół."

**Dlaczego fallback:** Pełna obietnica (automatyzacja + nauka), lepszy kontrast vs freelancer+kurs. Ryzyko: dłuższy H1 + info overload na PDF. Używać tylko jeśli Marcin uzna, że automatyzacja MUSI być w H1 mimo że tekst mówi „efekt uboczny".

### Dlaczego odrzuca pozostałe

- **V1:** H1 redukuje ofertę do jednej obietnicy (automatyzacja), podczas gdy nauka zespołu to równorzędny filar — niespójność promise→delivery.
- **F:** H1 pozycjonuje head-to-head z każdą firmą produktowościową — zero unikalnego kontrastu, „produktwność" za abstrakcyjne dla właściciela MŚP.

---

## OCENA SPOJNOŚCI H1 ↔ lead ↔ CTA

**Lead (pierwszy paragraf):** „Buduję rozwiązania wokół Twojego procesu, nie sprzedaję gotowca." — potwierdza custom-build z H1 „wdrażam". Standfirst doprecyzuje: „automatyzacja = efekt uboczny". ✅ Pasuje do V3.

**CTA (koniec broszury):** „Pierwszy krok: 20 minut rozmowy. Pokazujesz jeden powtarzalny proces, dostajesz ocenę: co wdrożyć, czego nauczyć zespół, a co zostawić ludziom." — obiecuje wdrożenie + naukę. ✅ Full match z V3 H1.

Żadna obietnica H1 nie wykracza poza to, co broszura faktycznie oferuje ani nie zawiera. ✅

---

## WERDYKT: SPOJNE

- H1 ≠ zapowiada coś, czego reszta nie daje — wszystkie obietnice pokryte w body i CTA
- Alternatywa (AI-replacement hype) rozbita w pierwszym zdaniu
- Język zrozumiały dla właściciela 20-50 osób (poza jednym słowem: „wdrażam")
- Maksimum 2 zdania ✅

### Punkty do dostrojenia (minimally invasive)

1. **„Wdrażam" → ewentualnie „Buduję rozwiązania"** — jeśli Marcin czuje, że „wdrażam" brzmi jak IT jargon dla jego klientów. Standfirst już mówi „Buduję rozwiązania...", więc zamiana na spójne słowo zmniejszyłaby认知 friction. Opcjonalne — kontekst broszury rozjaśnia.
2. **Standfirst doprecyzowany:** aktualny standfirst mówi o „automatyzacji jako efekcie ubocznym" i „nie sprzedaję kursu". Warto dodać jedno słowo typu „i uczę" żeby standfirst mapował się na drugie zdanie H1. Obecnie standfirst coveruje H1 częściowo.
