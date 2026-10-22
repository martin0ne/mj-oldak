# Ranking struktur rozliczeń MJ.OLDAK — pierwsze wdrożenia MŚP (biura rachunkowe)

**Data:** 2026-10-20
**Rola:** CEO (wartime) z użyciem filtra strategicznego `wartime-filter`
**Cel:** Znajdź strukturę, która najszybciej prowadzi do 3 płatnych klientów z retencja >= 6 mies i przewidywalnego cash flow 12-mies.
**Kontekst:** 0/3 płatnych klientów, pilot za darmo bez cennika, Phase 1 = biura rachunkowe 10-50 os., company-of-one, max 30h/tydz, UoP bridge konczy sie VIII.2026 (hard deadline), STAN: broszura MSP v4 gotowa, CTA = rozmowa 20 min.

---

## S1: Pakiet zamkniety za proces (scope i deliverable z gory, cena stala)

Struktura: jeden scope (np. \"wdrozenie OCR dokumentow\"), jeden deliverable jasny na poczatku, jedna cena stala. Koniec po dostarczeniu lub przywroce do stanu wyjsciowego.

### Filtr 5 pytań

| # | Pytanie | Ocena S1 | Uzasadnienie |
|---|---------|----------|-------------|
| 1 | Survival (peacetime conditions) | **chroni survival 3/3** | Jasny scope = klient od razu wie co kupuje. Jednorazowa cena = szybka decyzja zakupowa. Po wdrozeniu nowy proces = powrot klienta z nastepnym pakietem (retencja przez rozbijanie wdrozen w pakiety). Fastest path do pierwszego platnego kontraktu bo NIE wymaga dyskusji o wartosci, tylko prezentacji gotowego produktu. |
| 2 | Growth limit | **miesz sie w pelni** | Max 1 projekt jednoczesnie -> <= 2 tyg na wdrozenie prostego procesu -> <= 20h w tym tygodniu. Company-of-one OK. Maks 1 kontraktowy pomocnik na skomplikowane wdrozenie - OK. |
| 3 | Bullet vs cannonball | **bullet** | Scope z gory, jasny deliverable, 1 klient, niska cena. Metryka trafienia: czy wdrozono i czy klient jest zadowolony. Idealnie pasuje do SMaC rule #2. |
| 4 | Phase 3 dryf | **nie dotyczy** | To jest twardy produkt, nie koncepcja organizacyjna. Nie ma tu elementu \"drugi mózg\" ani organizacji uczacej sie. |
| 5 | F*cków rule | **swiadome TAK** | Jeden cel, jedna cena, jasne granice - mieści się w limicie 10 f'cków/tydz. |

**Werdykt filtra: GO - przechodzi wszystkie 5 pytań.**

### Zalety strukturalne
- Najnizszy barier wejścia dla klienta MSP: jedno zdanie \"x PLN za wdrozenie y\" zamiast dyskusji o wartosci.
- Zero ryzyka godzinowego przekroczenia: masz scope, robisz do końca, liczysz fikse.
- Client-facing dokument bez jawnej stawki godzinowej - zgodne z regula Stark.
- Latwy do opakowania w broszurze (scope + cena = gotowy artefakt marketingowy).
- Pilot jako darmowe \"mini-S1\" daje referencje, potem klient kupuje kolejny pakiet.

### Wady strukturalne
- Ryzyko scope creep: klient chce \"jeszcze troche\" poza zakresem -> NIE mozesz powiedziec \"doładuj\" bo S1 sie skonczyl.
- Po zakoczeniu wdrozenia client odchodzi do konkurencji lub robi sam -> brak naturalnego mechanizmu retencji miedzy projektami.
- Przy braku benchmarków rynkowych trudniej anchorowac cene - mozesz przecenić wdrozenie jesli dasz zbyt sztywny scope.

---

## S2: Stawka godzinowa

Struktura: klient płaci za kazda przepracowana godzine. Bez scope limitu, bez fixed price. Płaca za czas realnie wydatkowany na uslugi.

### Filtr 5 pytań

| # | Pytanie | Ocena S2 | Uzasadnienie |
|---|---------|----------|-------------|
| 1 | Survival (peacetime conditions) | **zero impact / aktywnie szkodliwe** | Godzinowo == kara za bycie szybkim z toolingiem AI (Stark manifest). Im lepszy Claude Code / automatyzacja, im mniej godzin potrzebujesz -> tym mniejszy przychod. Perwersyjna motywacja: wolniej robic aby zarobic wiecej. Klient bedzie widzial Twoje godziny i presjonowal Cie przyspieszeniem. Przewidywalny cash-flow niemozliwy: nie wiesz ile godzin zuzyjesz, klient nie wie ile zapłaci. Retencja: jak koniec projektu? Godzinowo NIE tworzy naturalnego momentu \"koniec\" = brak triggera do nastepnego kontraktu. |
| 2 | Growth limit | **miesz sie, ale...** | Teoretycznie 30h/tydz OK, ale praktycznie: jesli klient oczekuje dostepu \"tu i teraz\", godzina czesto oznacza stan ciagowej dostepnosci. Rozmywa granice company-of-one poprzez oczekiwanie kontynuowalnej ulgi. |
| 3 | Bullet vs cannonball | **cannonball w zlym kierunku** | Brak scope limitu -> otwarty work, mozliwosc scope creep, koniecznosc monitoringu czasu, klient presjonuje speed -> wszystko razem to ogromny koszt umyslowy i operacyjny. Brak metryki trafienia. |
| 4 | Phase 3 dryf | **nie dotyczy** | Nie ma elementu Phase 3, ale strukturalskie implikacje sa jeszcze gorsze. |
| 5 | F*cków rule | **nie, definitywnie NIE** | W wartime FUNDAMENT: nigdy jawna stawka godzinowa w dokumencie klienckim. Enns: 3-options menu jako default. Stark: hourly billing = penalty for speed. To nie jest f'ck wartym rezerwowania slotu. |

**Werdykt filtra: NO GO ❌ - odrzucic od razu.**

### Wady strukturalne
- **Fundamentalny konflikt z wartime identity:** AI makes you fast, but hourly billing punishes speed. Masz wybrac: albo byc efektywnym i zarobic malo, albo byc wolnym i zarobic wiecej. Wybor nie lezy po Twojej stronie.
- **Zero clarity dla klienta:** \"ile to bbedzie kosztowac?\" -> odpowiedz \"nie wiem, zalezy ile czasu zajmie\" = natychmiastowa utrata zaufania przy MSP (ktorzy nie znaja AI pricing modeli).
- **Brak end-of-engagement triggera:** po ilu godzinach konczysz? Klient chce wiecej, Ty chcesz wiecej, ale bez boundary jest chaos.
- **Nie nadaje sie do marketingu:** broszura z \"godzinowo\" to martwy temat. Nie da sie opakowac w konkretna propozycje.
- **Narusza Konstytucje #9 (OSS integrator + comose-before-build):** hourly pricing implies bespoke hand-coding engagement model, which is exactly what Konstytucja zakazuje (NIE software house).

---

## S3: Miesieczny pakiet godzinowy (np. 10h/mies, godziny nie kopiują się, tuning + mikro-procesy, partnerstwo dlugofalowe)

Struktura: stała kwota miesięczna za pulę godzin (np. 10h), niewykorzystane godziny przepada. Tuning istniejących wdrozeń + realizacja nowych mikro-procesów. Relacja długoterminowa.

### Filtr 5 pytań

| # | Pytanie | Ocena S3 | Uzasadnienie |
|---|---------|----------|-------------|
| 1 | Survival (peecetime conditions) | **chroni survival 2/3** | Przypomina recurring revenue (MRR analog): mala, regularna plata co miesiac. Buduje relacje dlugoterminowa. Ale: godziny nie kopiują sie -> klient traci motywację zgłaszać prace pod koniec miesiaca. Rowniez: \"partnerstwo\" brzmi atrakcyjnie, ale w wartime przy 0 klientów to obietnica przyszłości, nie cashflow teraźniejszy.客户 moze anulować co miesiac (retencja >=6 mies jest wyzwaniem). Przewidywalny cash-flow: TAK po 2-3 miesiacach, ale nie od startu. |
| 2 | Growth limit | **miesz sie** | 10h/mies teoretycznie < 30h/tydz. Ale: jesli klient zgłosi 10h pracy w jednym dniu -> musisz byc dostepny -> rozmywa firewall Habit 7. Monthly retainers bez strict time-blocking = constant context switching. Company-of-one with monthly hours = potential scope expansion without trigger. |
| 3 | Bullet vs cannonball | **bullet z ostrzezeniami** | Scope per mikro-proces jest ograniczony. Cena stala miesieczna = niski próg wejscia. Ale: \"partnerstwo\" budzi oczekiwania service-level, które mogą przekształcić bullet w cannonball jesli klient zacznie traktowac Ciebie jako dedykowanego czlonka zespou. Potrzebujemy strict SLA (response time, working hours) aby zatrzymac bullet shape. |
| 4 | Phase 3 dryf | **czesciowo, do notki** | Concept \"tuning + nowe mikroprocesy\" brzmi blizsko Senge \"organizacje uczące sie\" -> notuj w Phase 3 backlog jezeli faktycznie jest to sluzba doskonalenia, nie tylko service desk. Ale na potrzeby pierwszej wersji S3: to normalny retainer, nie Phase 3. |
| 5 | F*cków rule | **świadome TAK, ale uzasadniaj** |每个月签约需要更多的沟通和跟进，占用你的10次"f'cks"额度。每个客户都需要持续的关系管理。Warto zwazyc: czy lepiej 3 miesieczne relacje z 3 klientami, czy 3 pojedyncze projekty? Obydwa sa realistyczne, ale S3 wymaga wiecej soft skills (relationship management). |

**Werdykt filtra: GO Z OSTRZEŻENIAMI ⚠️ - przechodzi z modyfikacjami.**

### Zalety strukturalne
- **Naturalna retencja:** co miesiac klient decyduje czy przedluzyc. To tworzy pipeline decision points do budowy KPI retention >= 6 mies.
- **Recurring revenue pattern:** najbardziej zblizona struktura do MRR, ktory jest warunkiem peacetime. Analog do SaaS subskrypcji -> klient przyzwyczajony do cyklicznosci.
- **Tuning istnieje:** po pierwszym wdrozeniu klient bedzie chcial poprawek, optymalizacji, nowych funkcjonalnosci -> naturalny flow od S1 do S3.
- **Client-facing friendly:** \"X PLN za 10h wsparcia miesicznie\" jest latwe do zrozumienia przez MSP.

### Wady strukturalne
- **Godziny nie kopi się:** to double-edged sword. Klient traci motywację wykorzystac pełną pulse na koncu miesiaca -> Ty dostajesz mniej pracy w ostatnie dni -> frustracja obie stron. Alternatywa: godziny się kopią do 1 mies (limit 1 rollover).
- **Ambiguitas scope per miesiac:** klient moze oczekiwac jednego duzego wdrozenia za 10h, podczas gdy ty planowales 5 mikro-procesow. Trzeba jasno komunikowac: \"to są mikro-uslugi, nie full-feature development\".
- **Anulowanie co miesiac:** client może odejść po 2 miesiącach jeśli nie widzi wartosci. Musisz miec mechanism value-showcase (raporty, metryki, review meetingi) przed anulacją.

---

## Ranking: 3+2+1

### Miejsce 1: S3 Miesięczny pakiet godzinowy (GO Z OSTRZEŻENIAMI)

**Dlaczego S3 jest numerem 1:**
- Buduje recurrring revenue pattern (closest to MRR condition of peacetime).
- Naturalny mechanizm retencji: co miesiac decyzja przedluzyc/nie przedluzyc.
- Po pierwszym pilocie (S1-style) naturalnie przechodzi w S3: \"robimy juz update i nowe rzeczy\".
- Client-facing: prosta oferta, nizsze psychiczne barrier wejscia.
- Zgodna z enns: to jest fakturyjeta za paczek usluga (pakiet), nie hourly rate.
- Pozwala testowac retencyjne prediktorow zanim przejdziesz do wiekszych kontrakтов.

**WARUNKI ABY S3 DZIALALO (ostrzezenia do eliminacji):**
1. Strict SLA: response time max 24h, praca only w ustalone hours (np. pon-pt 9-17). Zero weekendy.
2. Clear scope communication: \"10h to mikro-prace, nie wdrozenia calosciowych systemów.\"
3. Value-reporting monthly: raport co dostales vs co placiles. Client musi widziec wartosc przed refendum przedłużenia.
4. Rollover optional: godziny się kopiuja do 1 mies (lub nie kopiuja, ale komunikuj to wyraźnie upfront).
5. Time-blockowanie: 10h to max pracodawca, nie obowiązek wywiązania się ze wszystkich zgłoszeń.

### Miejsce 2: S1 Pakiet zamknięty za proces (GO)

**Dlaczego S1 jest numerem 2:**
- Najprostsza sprzedaż: scope + cena, koniec. Zero dyskusji.
- Idealny do pilotów: \"zdarmowy mini-S1\" = portfolio dane, potem klient kupuje kolejna usluge za fikse.
- Perfect client-facing artefact: one-pager \"co robimy, ile kosztuje\" idealnie pasuje do broszury.
- Zero risk scope creep if boundaries are explicit (co S1 powinien mieć).

**CO TRZEBA ZROBIC ABY S1 BYŁO LEPRE:**
1. Boundaries: kazdy paket MUSI miec \"Co NIE jest zawarte\" sekcje.
2. Upsell-trigger: po kazdym S1 klient dostaje \"co next\" propozycje (np. \"po wdrozeniu OCR proponujemy Email Assistant jako osobny pakiet\").
3. Price anchoring: nie dajemy jednej ceny! Always present 3 options (Enns Min/Target/Premium). Even within fixed-price model, you offer 3 levels of deliverable depth at different prices.

### Miejsce 3: S2 Stawka godzinowa (NO GO)

**Dlaczego S2 jest numerem 3 (ostatnim):**
- Fundamentalny sprzeczność z AI-speed philosophy (Stark: hourly = kare za szybkosc).
- Zero sales clarity dla klienta MSP.
- Narusza Konstytucje #9 (NIE software house).
- Zero retention trigger (bez naturalnego \"konca\" engagementu).
- Non-negotiable: NIGDY jawna stawka godzinowa w dokumencie klienckim.

---

## Scenariusze przełączania między strukturami

### S1 → S3 (gdy przełączyć?)

**Sygnały do switcha:**
1. Klient po S1 mówi: \"chcialbym cos regularly, nie tylko raz\".
2. Klient zglosil > 5 micro-requestów po zakonczeniu S1.
3. Retencyjne metryki: klient korzysta z usługi > 8 tygodni, potrzebuje ongoing support.
4. Client face-to-face: \"jak mogę miec Cię jako resource na bieżace zmiany?\"

**Protokól przejscia:**
- Nie zerwij S1. Zamiast tego: przedstaw S3 jako \"naturalny next step\".
- Start S3 z tym samym scope, ale rozbitym na micro-tasks z czasem realizacji.
- Keep first month of S3 as trial: \"sprawdz 1 miesiac, jak bedzie OK - przedluzamy\".
- NEVER ask client \"czy chcialbys przejsc na godzinową?\" - always frame S3 jako pakiet usluga (not hourly).

### S3 → S1 (co kiedy)

**Sygnały do switcha:**
1. Klient ma konkretne, isolated wdrozenie do zrobienia (np. \"potrzebuję wdrozyc KSeF integration\").
2. S3 utilization < 50% (klient nie wykorzystuje puli godzin) -> to sygnał że S3 nie jest wartoscia.
3. Klient externalnie stwierdził: \"chetialbym miec to done, a nie paid-by-the-hour\".

### S1/S3 → S2 (NIGDY)

Poza sytuacjami gdzie klient PROSI formalnie o custom engagement model (rzadkie w PL MSP), S2 NIE JEST opcja. Zamiast S2 oferuj:
- Wiacyej godzin w S3 (15h instead of 10h/month)
- New S1 package for additional process automation
- Escalation to S3 with higher tier

---

## NO-GO listy (absolutne czerwone flagi)

1. **JAWNA STAWKA GODZINOWA** w jakimkolwiek dokumencie klienckim. Regula Stark permanent.
2. **S2 bez S1 pilot** - nigdy nie sprzedawaj godzin na pusto. Zawsz najpierw jeden konkretny deliverable.
3. **S3 bez SLA** - nie podpisz monthly retainer bez jasnych zasad dostępu i response times.
4. **Scope creep tolerance** - S1 MUST have exit criteria. If client wants \"jeszcze troche\", its a new S1.
5. **Premature pricing** - no fixed prices before first pilot validated value. Present S1/S3 as \"scope-based pricing\", not specific numbers. The WHAT is priced; the HOW MUCH TBD after pilot.
6. **Hourly anchor during negotiation** - gdy klient mówi \"jest drogo\", never respond \"może dam taniej godzinowo\". Always pivot to \"what scope can we remove to fit budget?\"

---

## KONTRAKT

Werdykt: **SPOJNE**

S3 jest najlepsza struktura primary (recuring revenue, natural retencyja, low barrier).
S1 jest najlepsza secondary (quick-close pilots, clear scope, upsell engine).
S2 jest NIGDY (fundamental conflict with AI-speed paradigm).

Mechanizm dzialania:
1. Pierwsze wdrozenia = S1-format (darmowy pilot w scope, potem paid S1 package).
2. Po 2-3 paid S1 engagements = launch S3 jako \"ongoing optimization\" offer.
3. S1->S3 transition triggered by client demand (micro-requests accumulation, not artificial timeline).
4. S3 SLA and boundaries defined BEFORE any client signs (pon-pt 9-17, 24h response, max 1 micro-task concurrent).

Uzasadnienie przez filtar wartime:
- Survival: S3 closest to MRR target (monthly recurring). S1 fastest path to first paying clients (clear scope). Together = 2/3 peacetime conditions addressed.
- Growth limit: both structures respect max 30h/w, single operator, no hire need.
- Bullet: S1 pure bullet, S3 bullet-with-SLA. Neither becomes cannonball if boundaries maintained.
- Phase 3 dryf: no interference. Both are tactical, not Phase 3 conceptual.
- F*cks rule: low cognitive overhead per structure. Focus on execution, not structural complexity.

**DO DOSTROJENIA (2):**
1. Precyzyjna definicja \"micro-process\" w S3 scope (co sie wlicza, co nie - przykladowe lista).
2. Value-reporting template dla S3 monthly review (client must see ROI before renewal decision).

**FAIL: S2 stawkе godzinowa (NO GO)** - odrzucona przez wszystkie 5 pytan filtru.
