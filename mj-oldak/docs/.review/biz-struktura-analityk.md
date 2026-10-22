# Ranking struktur rozliczen MJ.OLDAK — analityka rynku

Data: 2026-10-20
Rola: Analityk transakcji i cash-flow
Odbiorca wlasny: wlasciciel firmy 10–50 osob w PL (nie korporacja)

---

## 1 TARCIE TRANSAKCYJNE — co łatwiej domknąć na 20-min rozmowie

| Struktura | Bariera psychiczna | Szansa zamkniecia | Uwagi |
|-----------|-------------------|-------------------|-------|
| S1 PAKIET ZAMKNIETY ZA PROCES | Niska — jedna liczba, jeden zakres robocze, koniec po wyplatowaniu pakietu | Wysoka (przy jasnym scopeniu) | Klient wie ile zapłaci od pierwszego wezbrania; brak zmiennych do negocjacji |
| S3 MIESIĘCZNY PAKIET GODZINOWY | Srednia — klient musi zaakceptowac "abonament" bez widzialnego konca procesu | Srednia/niska | Wymaga zmiany myślenia z "projektu na koniec" na "ciągłą usługe" |
| S2 STAWKA GODZINOWA | Wysoka — klient nie wie gdzie jest granicą kosztu | Niska | Brak kotwicy budgetowej = zwłoka podjęciem decyzji ("musze sie zastanowic") |

Wniosek: S1 wygrywa tarcie transakcyjne. Jedna liczba + jeden datowy koniec to najmniej punktów oporu dla wlasciciela SME.

Źródło: general industry practice (Schmidt Consulting 2026, FunctionFox 2025, WP SuperHelp 2026); B2B close rate w jednej rozmowie jest generalnie niska dla wszystkich modeli (LinkedIn / SimplyTerms), ale najwyzsza przy oferach o zamkniętym scope+cena.

---

## 2 RYZYKO SCOPE CREEP VS CHURN

| Struktura | Kto ponosi ryzyko scope creep | Kto ponosi ryzyko churn | Mechanizm ochronny |
|-----------|------------------------------|------------------------|-------------------|
| S1 PAKIET ZAMKNIETY | **MJ.OLDAK (dostawca)** — scope creep zjada marze, chyba ze change-request chroni | Client churn tylko na start (po wdrozeniu nie ma okresowego renowalu) | Change-order proces jako jedyny buffer |
| S3 MIESIĘCZNY PAKIET | Shared — godziny się "rozmywają"; niejasności scope w kazdym miesiacu | MJ.OLDAK (client odchodzy, gdy uzna ze abonament nie przynosi wartosci) | Staly scope + hour cap + renew review kwartalny |
| S2 STAWKA GODZINOWA | Client — placi za każdą nadgodzine | Client (jeśli projekt się kończy lub przerwa) | Timesheet transparency + alert na overage |

Uwaga: S2 przenosi ryzyko cost overrun na klienta, ale to nie jest "scope creep" — to jest "ile roboty bylo, tyle zaplacisz". Nie moze tego porownac ani do etata, ani do pakietu.

---

## 3 CASH-FLOW SOLO (stan: 0 klientów)

| Struktura | Profile cash-flow | Przewaga przy 0 klientach |
|-----------|-------------------|--------------------------|
| S1 PAKIET ZAMKNIETY | Szczyty/doliny — jeden projekt to np. 15-25k PLN, potem 2 miesiace nic | Duza — jeden pilot = gotowka na stack + 2 miesiace buffera |
| S3 MIESIĘCZNY PAKIET GODZINOWY | Powtarzalnosc — ale wymaga czasu na budowanie bazy subskrybentow | Malo przy 0 klientach — trzeba czekac 2-3 klienci x 2-3 miesiace az bedzie jakis MRR |
| S2 STAWKA GODZINOWA | Nieregularne — placa po fakcie, trudniej prognozowac | Zero przewagi — brak both predictability i upfront commitment |

Przewaga cash-flow jednoznacznie po S1 na etapie pre-pilot. Pakiet zamknety daje upfront deposit (standard branzy: milestone payments przed praca). S3 przy 0 klientach = waiting game.

---

## 4 ODPORTNOSC NA POROWNYWANIE Z ETATOWYM KONSULTANTE/M

| Struktura | Moznosc porownania | Kotwiczenie ceny | Komentarz |
|-----------|-------------------|------------------|-----------|
| S1 PAKIET ZAMKNIETY | Nizsza — klient nie moze porownac jednego projektu do etatu (co innego projekt, co innego stanowisko) | Kotwiczy "cena za proces/efekt", nie czas | Najlepsza odpornosc — sprzedajesz wynik, nie godziny |
| S3 MIESIĘCZNY PAKIET GODZINOWY | Srednia — moze zostac porownany do części etatu (ile kosztuje pracownik w ciagu miesiaca) | Kotwiczy "cena za dostep/hodzien" | Ryzyko: klient myśli "czy to nie jest to samo co half-timer?" |
| S2 STAWKA GODZINOWA | Bardzo wysoka — doslownie ta sama waluta co etat | Kotwiczy "cena za godzine" — to samo co konsultant etatowy | Najslabsza pozycja |

S2 = zła struktura precisely dlatego, ze jest najbardziej podatna na comparison shopping z etatem. Jeden dzieli przez rok, drugi przez 160h miesiecznie i wychodzi to samo.

---

## 5 OPOR POLSKIEGO MŚP PRZED ABONAMENTEM/SUBSKRYPCJA

Hipoteza do testu — brak cytowalnych danych specificznie dla polskiego kontekstu B2B MŚP.

Dane globalne/EU:
- Eurostat (2025): 52.7% firm EU uzywa paid cloud computing; 30.36% srednich firm EU adopted AI technology — przewaznie przez subskrypcje SaaS
- OECD (Dec 2025): AI adoption u firm 10-49 employes = 11.9%; professional services adoptancja AI = 30.3% (UK ONS data 2025)
- JP Morgan Chase Institute (2025): median monthly spend na AI = ~$28-30/mies; 63% firm w dolnym tierze ($1-$40/mies)
- Subscription fatigue jest realna, ale na poziomie CONSUMER (Deloitte Digital Media Trends 2025: 41% consumption satisfaction drop); B2B retainers rosną — 78% agencji cyfrowych uzywa retainers primary model (Forge/Predictable Profits 2026 benchmark, up z 64% w 2023)

Wnioski z danych:
1. B2B retainers/subskrypcje sa standardem agencjaym (78%)
2. Consumer subscription fatigue nie przekłada sie automatycznie na B2B MŚP
3. Brak danych o specyficznym oporze polskich księgarni/biur rachunkowych przed modele abonamentowe

HIPOTEZA DO TESTU PILOTY (Mom Test):
Pytanie sprawdzajace zamiast domyslu:
"Niestety poprzedni partner techniczny nie kontynuowal współpracy po projekcie X. Co by Cie zablokowalo w przedlugowaniu wspolpracy na 'pakiety godzinne' w nastepnych miesiacach? Czy sam fakt regularnej platnosci bez widocznego projektu na koniec, czy cos innego?"

Nie pytaj: "Czy byłoby Ci trudno placic abonamentowo?" (to Mom Test violation — future intent).

---

## RANKING FINALNY (TOP 3)

### #1 S1 — PAKIET ZAMKNIETY ZA PROCES (scope+cena z góry, koniec po wdrozeniu)

| Kryterium | Ocena | Komentarz |
|-----------|-------|-----------|
| Tarcie transakcyjne | Wyssze (Łatwo domknac) | Jedna liczba + scope docelowy |
| Scope creep | Środki (ryzyko dla dostawcy) | Change order = must-have |
| Cash-flow (0 klientów) | Wyssze (Szczyt na starcie) | Upfront deposit + duzy payment |
| Kotwica vs etat | Wyssze | Porównujesz efekt, nie czas |
| Skalowanie (>=3 klientow) | Średnia | Musisz znajdowac nowe projekty po kazdym wdrozeniu |

### #2 S3 — MIESIĘCZNY PAKIET GODZINOWY (10h/mies, bez kumulacji)

| Kryterium | Ocena | Komentarz |
|-----------|-------|-----------|
| Tarcie transakcyjne | Srednia | Wymaga zmiany myślenia kupujacego |
| Churn | Środki (ryzyko dla dostawcy) | Klient może odejsc po każdym miesiacu |
| Cash-flow (0 klientów) | Nizsze | Trzeba czekac na MRR, długi ramp-up |
| Kotwica vs etat | Srednia | Niektóre porownanie mozliwe |
| Skalowanie (>=3 klientow) | Wyssze | Recurring revenue base |

### #3 S2 — STAWKA GODZINOWA (płacisz za czas)

| Kryterium | Ocena | Komentarz |
|-----------|-------|-----------|
| Tarcie transakcyjne | Nizsze (Trudno domknac) | Klient nie widzi granicy |
| Scope creep | Nizejsze (ryzyko dla klienta) | Ale to nie chroni Ciebie |
| Cash-flow (0 klientów) | Nizsze | Opóźniona platnosc, brak predictability |
| Kotwica vs etat | Nizsze | To samo co etatowy konsultant |
| Skalowanie (>=3 klientow) | Nizsze | Efficiency = Twój penalizer (szybciej = mniej zarobku) |

---

## REKOMENDACJA STRATEGICZNA

Faza PRE-PILOT: S1 jedyna opcja racjonalna.
- Zero klientów = potrzebujesz upfront cash na stack
- Pilot jest free — ale musisz miec scope, żeby wiedziec ile pracy to bedzie (nawet jesli nie plate)
- S1 pozwala zmierzyć sie z realnym problemem klienta + dostarczyc wynik + zbudowac case study

Faza POST-PILOT (jeśli klient chce dalej):
- Przełącz na S3 jako naturalny next step — "teraz kiedy mamy wdrozone X, moge dac Ci Y godzin miesiecznie na dopiski i mikroprocesy"
- To naturalna ewolucja: project -> retainer jest patternem branżowym (FunctionFox 2025: "Fixed-fee works as great entry point...transition to retainers after seeing value")

S2 wykluczyc calkowicie. Nie wnosi przewagi konkurencyjnej ani dla Ciebie, ani dla klienta.

---

## HIPOTEZY DO WALIDACJI W PILOCIE (3 punkty)

### H1: Polski MŚP (biuro rachunkowe/firma 10-50os.) akceptruje "pakiet godzinny" jko formę continuing engagement, JEŻELI jest prezentowany jako "dodatke po projekcie", nie jako main product

Pytanie Mom Test: "Gdyby ten pilot powiodł sie i chcialbys kontynuowac pomoc techniczna — co by Cie zatrzymalo: sam fakt ze to nie byloby juz jednym projektem z koncem, czy cos innego?"
(Walidacja/invalidacja oporu wobec modelu ciągłego)

### H2: Priorytet decyzyjny wlasciciela MŚP to "przewidywalnosc kosztu całkowitego" > "cena najniższa"

Badanie: Po pokazaniu scope proponowanego pakietu (np. 3k PLN za proces), zapytaj: "Jak porównalbyś to do alternatywy — znalezienia kogos kto by zrobil to taniej, albo zatrudnienia kogos na pełen etat?"
(Walidacja czy premium efficiency s1 jest warta, czy cena driveuje decyzje)

### H3: Scope creep jest realnym ryzykiem przy usługach AI/automatyzacji (a nie teoretycznym)

Metoda: track actual hours delivered vs estimated hours during pilot. Jeśli偏差 > 25%, S1 potrzebuje change-order protection. Jeśli偏差 < 10%, S1 moze bezpiecznie istniec bez skomplikowanych klauzul.
(Walidacja scope risk profilu dla usługi AI-agentycznej w MŚP)

---

## VERDYKT (max 5 punktów)

1. S1 pakiet zamknity za proces = najlepsza struktura na fazie pre-pilot (zero klientów, potrzebujesz upfront commit + deliverable + case study).
2. S3 monthly retainer = naturalny next-step po pilocie, ale nie startowa struktura (trway MRR requires 2-3 miesięcy minimum build-out).
3. S2 stawka godzinna = wykluczyc bo jest najbardziej podatna na porownanie z etatowym konsultantem i penalizuje Twoja efektywnosc.
4. Polskie MŚP prawdopodobnie ma nizszy opor wobec "pakietu" (jedna liczba) niz wobec "abonamentu" (regularna platnosc bez konca) — ale to hipoteza wymagająca testu Mom Test w trakcie pilotu.
5. Transition path S1→S3 jest potwierdzony jako best-practice agencjowy (78% agencji uzywa retainers primary model wg Forge 2026); nie próbuj skoczyc prosto do S3 bez udowodnionej wartosci w S1.
