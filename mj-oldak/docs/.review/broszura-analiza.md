# Audyt uczciwości broszury MSP

**Data:** 2026-10-20
**Audytor:** Analizator liczb i źródeł (zespół B)
**Scope:** /Users/marcinoldak/Projects/mj-oldak/mj-oldak/docs/BROSZURA-MSP.md (draft v2)

## (1) Tabela twierdzeń

| Nr | Twierdzenie / claim | Status | Uwaga |
|----|---------------------|--------|-------|
| 1 | Firmy 10–49 os. używają AI = 5,8% vs UE 17,0% | OK | Źródło: Eurostat, isoc_eb_ai, rok ref. 2025 — podane w tekście (linia 23) |
| 2 | Firmy 50–249 os. używają AI = 14,8% vs UE 30,4% | OK | Źródło: Eurostat, isoc_eb_ai, rok ref. 2025 — podane w tekście (linia 23) |
| 3 | Bariery „koszt za wysoki" (10–49): 1,8% vs UE 4,0% | OK | Źródło: Eurostat, isoc_eb_ai, rok ref. 2025 — podane w tekście (linia 23) |
| 4 | Firmy, które rozważały AI (10–49): 3,4% vs UE 10,2% | OK | Źródło: Eurostat, isoc_eb_ai, rok ref. 2025 — podane w tekście (linia 23) |
| 5 | -15,6 pkt proc. luki 50–249 os. | OK | Wynika poprawnie z wierszy tabeli: 30,4 - 14,8 = 15,6 (zweryfikowane Decimal) |
| 6 | Dane GUS, Eurostat, własne dane — z źródłem i rokiem | OK | Deklaracja metodyki; nie jest liczba do sprawdzenia, ale etyka zgodna z resztą broszury |
| 7 | KSeF, JPK jako polska specyfika wdrożeń | OK | Non-numerical deklaracja kompetencji; status: deklaracja nie wymaga źródła zewnętrznego |
| 8 | CTA: 20 minut rozmowy | OK | Deklaracja czasowa konkretna; nie wymaga źródła zewnętrznego |
| 9 | „Żaden dokument do urzędu nie wychodzi na zewnątrz bez Twojej zgody" | DO USUNIĘCIA lub zmiana sformułowania | Abstrakcja absolutna niezgodna z linia 45 („Automatyzacja nigdy nie działa w Twoim imieniu bez kontroli"); ryzykowne przy regulowanym biznesie |
| 10 | Narzędzia utrzymalne bez działu IT | OK | Non-numerical deklaracja architektury; dopuszczalna jako pozycjonowanie |
| 11 | Zakres i koszt proporcjonalny do problemu | OK | Metadeklaracja o modelu rozliczeniowym; nie jest obietnicą konkretnej ceny/terminu |

## (2) Tabela Eurostat — kompletność

Źródło podane w tekście (linia 23): „Eurostat, zbiór isoc_eb_ai, rok referencyjny 2025, pobrany 15.10.2026."

- Zbiór: TAK (`isoc_eb_ai`)
- Rok referencyjny: TAK (2025)
- Data pobrania: TAK (15.10.2026)
- Link URL: BRAK — nie ma bezpośredniego linku do sheetu Eurostat

Weryfikacja -15,6 pkt proc.:
- Wiersz 2 (50–249 os.): PL=14,8, UE=30,4
- Roznica: 30,4 - 14,8 = **15,6** — zgadza się z tekstem

Rekomendacja: dodać URL do data.europa.eu w przypisie pod tabelą. Dane kompletne, ale client-facing brochure wygrywa z linkiem do surowego sheetu. To nie błąd, usprawnienie.

## (3) Lista braków (do decyzji redaktora)

Lista pozycji do ewaluacji — czy coś dodać, w jakie miejsce, jakiej głębi:

- Jeden w pełni nazwany przykład procesu krok-po-kroku (np. fakturowanie klienta w biurze rachunkowym: obecny stan → gdzie AI pomaga → co zostaje u człowieka). Broszura mówi „jak", ale nie pokazuje „czego".
- Szczegóły techniczne implementacji — co dokładnie robi „pomiar" na początku? Audyt procesów? Czasomierz? Klient potrzebuje wiedzieć, co go czeka na spotkaniu 20-minutowym.
- Model rozliczenia — stawka godzinowa, pakietowa, project-based? Klient MŚP potrzebuje orientacji budżetowej. Obecnie „proporcjonalny do problemu" jest zbyt abstrakcyjny.
- Przykład formatu raportu — co to jest „raport, który prowadzi do decyzji"? PDF? Dashboard? Jednozdaniowe zestawienie przed/po?
- Etykieta RODO — pojedynczy bullet na linii 46. Dla biura rachunkowego to centralny temat. Warto jedno zdanie więcej: czy DPA jest standardem, czy optional? Czy szablon istnieje?
- Konkretne narzędzia/technologie — OpenRouter, lokalne modele, ChatGPT API? Client może chcieć wiedzieć, czy system będzie locked-in do jednego dostawcy.
- Timeline realny — ile trwa typowe wdrożenie? Kilka dni? Tydzień? Miesiąc? Broszura mówi o „małym zakresie", ale klient potrzebuje ramy czasowej.
- Sekcja ryzyko — co gdy się nie uda? Linia 65 mówi „powiem to wprost" jeśli nie warto, ale nie ma sekcji typu „typowe przyczyny porażki innych wdrożeń i jak My ich unikamy".

## (4) Checki compliance

- Słowo „doradztwo": OK — brak słowa we всей broszurze. Użyte słowa „wdrażam", „uczę", „dobór i wdrożenie".
- Procenty oszczędności bez źródła: OK — wszystkie procenty pochodzą z Eurostat table i mają podane źródło. Zero oszczędnościowych claimów liczbowych poza tabelę.
- Obietnice terminów KSeF: OK — KSeF pojawia się tylko jako kontekst „polskiej specyfikacji" (linia 33). Zero terminów implementacji KSeF.
- Nazwy klientów/referencje: OK — zero referencji. Broszura nie pretenduje do case studies.
- CTA konkretne: OK — „20 minut rozmowy" (linia 67). Konkretny czas, konkretna akcja.

## Werdykt

**DO DOSTROJENIA (3)**

1. Brak URL do sheetu Eurostat w przypisie — client-facing dokument bez linku do surowego źródla jest mniej przejrzysty. Dodać jeden URL.
2. Absolutne sformułowanie „żaden dokument do urzędu nie wychodzi na zewnątrz bez Twojej zgody" (linia 33) — ryzykowne przy regulowanym biznesie. Zmienić na wersję spójną z linia 45 („Automatyzacja nigdy nie dziala w Twoim imieniu bez kontroli").
3. Zero przykładu procesu krok-po-kroku — broszura mówi o implementacji, ale nie pokazuje żadnego konkretnego scenariusza (np. fakturowanie, wpisy księgowe, korespondencja). To nie jest błąd uczciwości, ale luka w perswazji dla czytelnika MSP.
