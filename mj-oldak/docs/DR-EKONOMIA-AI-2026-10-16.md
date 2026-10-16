---
date: 2026-10-16
type: master prompt — Deep Research (Perplexity, format 1 Report PDF)
zlecenie: Marcin — „hot raport na web, DR musi być, styl: trudne prosto bez uproszczeń"
soczewka trendowa: @bycloudAI (inspiracja merytoryczna)
wykonanie: Marcin — nowy czat → Deep Research → format „1 Report (PDF)" → wklej → raport wrzuć do mnie
---

# DR — Ile kosztuje zbudowanie AI w 2026: trening, inferencja, kto za to płaci

> **Kolejność:** ten prompt jest DO WKLEJENIA w Perplexity Deep Research (1 polecenie = 1 czat).
> Po powrocie raportu: kopia do drzewa projektu + spot-check liczb u źródła + ocena wg
> `external-report-eval` — zanim cokolwiek wejdzie na stronę.
> **Materiał na artykuł (styl: Houellebecq — trudne rzeczy prosto, bez uproszczeń)
> piszę JA z raportu, nie Perplexity.**

---

## 1. Parametry systemu (realia, nie pamięć narzędzia)

Kotwica: **Xiaomi ujawniła rachunek za trening wzmocnienia (RL) modelu MiMo v2.6** —
ok. **3,47 mln USD za zaledwie 30 kroków treningu** (dashboard: mimo.xiaomi.com/rl/,
paper MiMo v2.6, arXiv:2609.26368 — HySparse 2, śledztwo Vals AI ws. reward hacking;
film bycloud z 15.10.2026,61 tys. wyświetleń — TYLKO jako źródło pytań, nie jako źródło faktów).

**Ustalone — NIE wyprowadzaj ponownie, buduj na tym:**
- Trzy wąskie gardła adopcji AI wyliczone u nas z nazwanymi źródłami (2025–2026): **compute** (1 GW planów Microsoft na ~2026, NVIDIA ~10 mld USD zamówień, budżety hyperscalerów rzędu5 mld USD na centra), **wagi** (25 firm podpisało otwarte wagi, Anthropic nie podpisał — CNBC 24.07.2026), **kapitał** (fale IPO AI >2 bln USD, listopad — Reuters 28.09.2026). Te liczb NIE przeliczaj i nie sprawdzaj — pochodzą z naszych audytowanych źródeł.
- Polska: adopcja AI5,8% małych firm vs UE17,0% (Eurostat isoc_eb_ai,2025) — kontekst, nie temat raportu.
- Nie interesuje nas ogólny przegląd „czym jest AI”. Interesuje nas **ekonomia**: kto ile wydaje, ile na tym zarabia i gdzie pęka rachunek.

**Hipotezy do POTWIERDZENIA albo OBCIĘCIA (nie potwierdzaj w ciemno):**
- H1: **3,47 mln USD /30 kroków** to cena jednego „odcinka” treningu, a nie całego projektu — czy pełny koszt cyklu (dane+inżynieria+eval+ponowienia) jest 10× wyższy? Podaj liczby, nie opinie.
- H2: ekonomia inferencji (marże inference-as-a-service, ceny tokenów2026) **nie wyrabia się** z rachunkiem za trening — tzn. koszt treningu musi się zwrócić na inferencji, a ta jest wyceniana z bieżącego rynku, nie z modelu kosztowego.
- H3: „neoclouds” (colocation/infrastruktura specjalnie pod AI) to **bańka kapitałowa** w stylu2000 — jeśli tak: pokaż na czym polega różnica (lub brak różnicy) między dotychczasowymi wskaźnikami bańek a dzisiejszymi wartościami.
- H5: **decision models** — czy model, który orzeka bez łańcucha uzasadnień (samotne słowo
  „decyzja" zamiast rozumowania), jest realnie tańszy w eksploatacji przy tej samej
  skutności? Jeśli tak: ile tokenów oszczędza typowy proces biznesowy i jaka jest granica,
  przy której brak „głosu wewnętrznego" psuje jakość decyzji.
- H4: **reward hacking** (Vals AI vs Xiaomi) — jeśli zarzut się potwierdza, to raport Xiaomi opisuje wydatek na optymalizację wskaźnika, nie na umiejętności — to zmienia odczyt kosztów.

**Drugi materiał z puli (bycloud,02.10.2026,73 664 wyświetleń):** „Decision Models:
How Can A Model Be Better Without Generating Words?" — teza: model podejmujący decyzję
**bez generowania tekstu** bywa lepszy i tańszy niż model piszący rozumowanie słowami
(wątek „Jev"; źródła autora: arXiv:2203.02155 — InstructGPT/RLHF jako punkt odniesienia,
arXiv:2605.07982 — klasyfikacja warunkowana schematem, HF convaiinnovations/laya,
GitHub sgoedecke/system-one, TheoLeeCJ/SemIf). **Rola w raporcie: hipoteza H5** —
koszt inferencji da się ciąć nie tylko ceną infrastruktury, ale ilością słów, które model
musi wypowiedzieć. To spin oba filmy: trening (Xiaomi) vs rachunek za token (decision models).

## 2. Pytania numerowane (klasyfikacyjne na pierwszym miejscu)

1. **[KLASYFIKACJA]** W jakiej klasie jest dzisiaj trening frontier modeli: (a) przemysł masowy z rachunkiem do zamknięcia w cenie usługi, (b) wyścig zwracany dopiero na inferencji, (c) bańka wydatku, która pęka przy pierwszej recesji popytu? Podaj orzeczenie z liczbami: kto ile wydał w2026 na trening, kto ile zarobił na inferencji w tym samym okresie.
2. **Xiaomi MiMo v2.6:** co dokładnie ujawnia dashboard i paper — co jest w koszcie3,47 mln USD (sprzęt, dane, algorytm, ludzie, powtórzenia), a czego tam nie ma? Czy liczba30 kroków jest pełnym treningiem, czy wycinkiem? (Źródła: mimo.xiaomi.com/rl/, paper, HySparse 2 — arXiv:2609.26368.)
3. **Reward hacking:** czy Vals AI wykazał, że MiMo optymalizował nagrodę zamiast umiejętności? Stan sporu na dzień publikacji, cytaty obu stron, werdykt niezależnych zespołów.
4. **Ekonomia inferencji 2026:** ceny za1 mln tokenów (in/out) w czołowych modelach — tabelka źródłowa z datą i linkiem; marże inference-as-a-service; realne CAPEX neocloudów vs ich przychody — co wskazuje na bańkę, a co na model biznesowy.
5. **Robotyka jako punkt odniesienia:** czy „GPT-3 moment” robotów (721 tys. wyświetleń bycloud = najgłośniejszy temat kanału) jest zdarzeniem technicznym, czy narracyjnym — jakie są twarde wskaźniki (wdrożenia, kapitał, ceny) na2026?
6. **Dla czytelnika w Polsce / UE:** co z tej ekonomii jest realnie w zasięgu (koszt wejścia, hosting w UE, rachunek za działający agent), a co jest zarezerwowane dla graczy z GPU-skarbcem? (Nie „jak zacząć z AI” — wyłącznie liczby i progi wejścia.)

7. **Decision models vs generowanie:** które procesy realnie da się zamknąć samą decyzją
   (klasyfikacja/orkiestracja) zamiast generowanego rozumowania — z pomiarem: koszt decyzji
   w tokenach USD vs koszt tego samego w chain-of-thought, przy źródłach z2025–2026 i jawnym
   oznaczeniu, gdzie model bez „głosu wewnętrznego" traci na jakości (granica, nie propaganda).

## 3. Kontrakt wyjściowy (bez negocjacji)

- **Wynik po polsku**, ale cytaty źródłowe w oryginale + polskie tłumaczenie.
- **Każde twierdzenie liczbowe lub regulacyjne = cytat dosłowny** ze źródłem (wydawca, tytuł, data, link). Liczby rynkowe (ceny, marże, CAPEX) = wartości ze źródłowym linkiem i datą.
- **Wartości progów „na wskazanie”**: gdzie liczba jest progiem decydującym (np. próg rentowności, limit skali) — podaj akt/źródło i sam WEŹ źRÓDŁO, wartość zweryfikuję samodzielnie. Nigdy nie zgaduj progu — brak progu lepszy od zmyślonego.
- Wszystko niepotwierdzone z tekstem źródłowym = oznacz **[NIEPOTWIERDZONE]** wprost; zero zgadywanek.
- **Płaszczyzna recencyjna: źródła nie starsze niż styczeń 2025** (chyba że historia sama w sobie jest przedmiotem pytania).
- **Priorytet źródeł:** oficjalne rejestry/urzędy i strony wydawców najpierw. Ze stron komercyjnych korzystaj zależnie od typu twierdzenia: strona producenta jest źródłem dla WŁASNYCH cen i specyfikacji, nie dla tez o rynku.
- **Dwie sekcje autodeklaracji, jawnie:**
  a) „które z Twoich odpowiedzi podważają coś z moich USTALEŃ (sekcja 1)”
  b) „Twoja największa niepewność i dlaczego” — najważniejsza linia raportu; przeczytam ją jako pierwszą.
- Na końcu: **5–7 twierdzeń gotowych do artykułu** — każde w wersji „zdanie + liczba + źródło”, które da się przełożyć na prozy bez żargonu.

## 4. Pytania follow-up (w tym samym czacie, po raporcie — nie przed)

Do najsłabszej sekcji z raportu (sam wskażę, która). Budżet: max3, każdy krótki i wąski:
najsłabsza klasyfikacja → najbardziej wymijany próg → realne spółki (kto konkretnie kupuje
infrastrukturę i po jakiej cenie).
