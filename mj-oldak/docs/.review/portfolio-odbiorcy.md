# Portfolio — głos odbiorcy

**Data:** 2026-10-20
**Status:** WERDYKT · v1
**Cel:** Decyzja co pokazuje `/portfolio` dla rekrutera startupów AI (PL/EN) i właściciela MŚP 10–50, oraz jak portfolio wpływa na sekcję Wykształcenie w CV.

---

## WERDYKT

Portfolio NIE zastępuje dyplomu — ale **redukuje wagę dyplomu do zerowej** jeśli jest zbudowane według tych zasad:

1. **Rekruter (30 s):** widzi dowód zamiast deklaracji → 6 publicznych repo z kodem + 5 działających FastAPI produkt + live demo = natychmiastowe "potrafi pisać i wdrażać". Nie czyta wszystkiego — skanuje po strukturze repo, README, commit history, testy. Buduje zaufanie: `agent.py` (stdlib, ~150 linii, jeden plik), `writer-gate.py` z testami (5 passing), commit z honesty pass ("fix README inflection claim to match retrieval code"). Szum: brak liczników starszych, zero forków, zero gwiazdek — NIE ZNACZY nic; OpenSource w niszowych repo to normalka, nie sygnał słabości.

2. **Właściciel MŚP (PL):** nie widzi technicznego stacka — widzi problem->rozwiązanie->konkretny efekt. Buduje zaufanie: interaktywne dema (OCR faktury, deadline agent, reporting agent), case'y z liczbami (8 sekund na fakturę, ~100 deklaracji dziennie w UPS), broszura MŚP w języku korzyści, nie technologii. Kit: opisy techniczne bez odniesienia do biznesowego problemu klienta, linki do github bez tłumaczenia "co to robi dla Ciebie".

3. **Język EN na stronie głównej + PL na raportach/biznesie:** NIE jest problemem — to zaleta. Rekruter globalny/startupowy oczekuje EN jako domyślnego. Właściciel MŚP trafia na `/dla-biur` (PL). Rozdzielenie torów jest zamierzone w wizytowka-spec.md (Approach B). Ale: portfolio musi mieć PL-wersję lub przynajmniej PL-komunikat "dlaczego ta praca ma sens dla polskiego rynku" — inaczej MŚP nie wie, czy mówisz do niego, czy do kogoś innego.

4. **Raport rekruterski PROTOTYP:** publiczny NA STRONIE KLIENCKIEJ (`/dla-biur`) = błąd. To artefakt do zalążnika CV — zawiera informacje wrażliwe (dane kontaktowe, dokładne daty zatrudnienia, wewnętrzne frameworki decyzyjne). Jeśli pokazujesz go publicznie — tracisz kontrolę nad tym, kto go czyta i jak interpretuje. **Rekomendacja:** raport rekruterski IDZIE DO PAKIETU APLIKACYJNEGO (załącznik do maila/kontaktu przez formularz strony). Na stronie publicznej tylko cytaty/zrzuty anonymized (np. "wygenerowałem ten raport z moich danych — 3 sekundy, gotowy do wysłania").

5. **Portfolio vs Wykształcenie (warianty A/B/C):**
   - **A — sama psychologia bez statusu (ukrycie):** portfolio silne, ale ukrycie studiów = czerwona flaga dla ATS/harward flow HR. Przy filtrze "wykształcenie: wymagane" — CV automatycznie odrzucone przed ludzkim okiem. **Ryzyko: high.**
   - **B — jawne bez dyplomu:** "Psychologia w biznesie — Uniwersytet DSW, 2023–2026, w toku, bez dyplomu" + portfolio na górze Selected Work. Recrutera startupowego — zero problemu. Recrutera korpo z twardym wymogiem wykszt. — filter nie przepuści, niezależnie od portfolio. **Wygrywa: buduje zaufanie u docelowej grupy, szkodę minimalizuje filtrowanie ATS.**
   - **C — wycięta:** usunięcie sekcji Wykształcenie całkowicie. Dla startupu AI = fine. Dla każdego firmowego ATS = automagiczne odrzucenie. Ryzyko utraty szansy na rolę, która wygląda na startupową ale ma korporacyjny filtr wewnętrzny, jest realne i kosztowne.

**Werdykt końcowy:** Wariant B — jawne bez dyplomu. Portfolio na górze Selected Work. Filtr korpo "wykształcenie: wymagane" i tak odpali ATS bez Twojej kontroli — lepiej wiedzieć, że to filtr systemowy niż myśleć, że "nie chcieli zobaczyć". I tak: startupy z filtrem "don't tick all boxes" zobaczą portfolio i pójdą dalej — tam właśnie celujesz.

---

## 5 REGUŁ PORTFOLIO PER ODBIORCA

### (A) Rekruter startupów AI — co musi zobaczyć w pierwszym ekranie

1. **Linki do działającego kodu** — github.com/martin0ne z opisami repo (co robi, jakie technologie, dowód).
2. **Live demo** — demo.mjoldak.pl (interaktywny Sales Agent B2B) + demo w samych portfolia (4 interaktywne widgety client-side).
3. **Honesty pass w akcji** — commit message "docs: fix README inflection claim to match retrieval code" = dowód uczciwości dokumentacji (CLAIM-CODE HONESTY).
4. **Test coverage** — 5 passing tests w agent-flow, 5 passing w writer-gate; to pokazuje dojrzałość, którą wiele "full-stack devów" z 3 letnim doświadczeniem pomija.
5. **Jasna rola w 1 zdaniu** — AI Automation Builder / AI Business Analyst, nie "AI consultant who does stuff", nie "integrator of synergies".

### (B) Właściciel MŚP (biuro rachunkowe / firma 10-50 osób) — co musi zobaczyć

1. **Problem -> rozwiązanie -> konkret** — nie "FastAPI + RAG", ale "faktura przetwarza się w 8 sekund bez człowieka", "terminy podatkowe obliczane automatycznie z 9 entry-pointami".
2. **Demo interaktywne** — klient MŚP chce kliknąć, nie czytać specyfikacji. OCR demo, Deadline Agent — oba client-side, sample data PL.
3. **Język korzyści, nie technologii** — broszura MSP już to robi. Raport analityczny PL też. Strona główna EN musi albo przekierować na `/dla-biur` (PL) albo mieć wersję PL.
4. **Zero ryzyka compliance** — HITL human-in-the-loop w każdym produkcie, dane w EU, on-premise Docker — to odpowiada na jedyne pytanie właściciela MŚP, które naprawdę liczy: "czy to mnie nie zablokuje?".
5. **Cena = transparentna lub niewyspecifikowana** — cennika brak, pre-pilot darmowy. Właściciel MŚP boi się ukrytych kosztów; uczciwość tu = przewaga konkurencyjna.

### Co buduje zaufanie — vs co jest kit/szum

| Buduje zaufanie | Kit / szum |
|---|---|
| GitHub z commitami i honesty pass | Liczniki starszych / gwiazdek (brak ≠ bezwartość) |
| Testy w kodzie (5 passing per repo) | "Full-stack" bez linku do czegoś działającego |
| Demo interaktywne z sample data | Screen-shot app store z 3 miesiące temu |
| Raporty z cytowanymi źródłami | Ogólniki "AI-powered transformation" |
| MODEL-agnostic architecture | Vendor lock-in ukryty jako "najlepsze rozwiązanie" |
| PL+EN rozdzielone torami | Angielskie demo dla polskiego klienta |
| Pre-pilot gratis, cennika brak | Cena "do ustalenia" bez kontekstu scope |
| Wynik pracy: 79% szybciej w UPS, 8s/faktura | "Zautomatyzowałem wszystkie procesy" (bez liczby) |

---

## JEZYK: EN GLOWNA + RAPORTY PL = problem?

**Nie, to działa — ale z jednym warunkiem:**

Główna strona (EN) musi wyraźnie kierować polskich klientów na `/dla-biur` (PL). Jeśli przyjazd na mjoldak.pl daje anglojęzyczny pitch bez widocznego przycisku "Strona dla firm polskich" / "For Polish businesses", MŚP odeszle zanim zrozumie, że ta treść dotyczy jego rynku. Sytuacja odwrotna — rekruter globowy na EN stronie — jest idealna. EN to standard w tech/AI recruitment, PL content pozostaje w blogu (/artykuly) i `/dla-biur`.

---

## RAPORT REKRUTERSKI: PUBLICZNÝ CZY ZALĄCZNIK?

### Argumenty ZA publicznym umieszczeniem na stronie klientowskiej
- Pokazuje kompetencję analityczną w praktyce — to Twój artykuł/research output.
- Ciekawostka dla właścicieli biór, którzy chcą widzieć rynek z perspektywy BA.

### Argumenty PRZECIW
- **Zawiera dane osobowe:** imię, nazwisko, adres email, numer telefonu, LinkedIn, dokładne daty zatrudnienia. Nawet gdy celowo je usuwasz z wersji publicznej, wersja "pół-publiczna" wciąż niesie ryzyko.
- **Zawiera wewnętrzną metodologię:** CV-baza.md → report mapping to Twój prywatny workflow. Publiczność oznacza konkurencja może kopiować schemat aplikacyjny.
- **Sugeruje, że portfolio klientowskie i portfolio rekruckie mogą się mieszać.** To tworzy dezorientację u obu grup.

### Rekomendacja
Raport rekruterski **IDZIE DO PAKIETU APLIKACYJNEGO**, nie na stronę publiczną. Na stronie publicznej: cytowanie/anonimizowany screenshot z notatką "ten typ raportu generuję do każdej aplikacji o pracę — 3 sekundy, dowód zamiast twierdzeń".

---

## OTWARTE PYTANIA (max 4)

1. Czy wariant B (jawne bez dyplomu) akceptujesz jako default, czy chcesz przetestować najpierw wariant A (ukrycie) na jednej-aplikacji-testowej i porównać response rate?
2. Czy masz gotową wersję PL strony głównej (lub хотябы landing redirect na `/dla-biur`) — czy EN-only strona główna jest gotowa do deploymentu, czy wymaga modyfikacji przed pushem?
3. Czy rapo rt rekruterski będzie miał wariant EN obok PL (spec mówi "audience: rekruter / hiring manager (PL; wariant EN osobno)") — czy EN version już istnieje, czy wymaga stworzenia?
4. Czy demo.mjoldak.pl jest live i dostępne publicznie, czy wymaga jeszcze konfiguracji DNS/deployu? (Potwierdzenie needed.)

---

*Źródło danych: 9 repo (github.com/martin0ne, API fetch 20.10.2026), MJO-Systems/products (5 FastAPI apps), RAPPORT-REKRUTER-PROTOTYP.md, wizytowka-personal-brand-spec.md, RAPPORT-ANALITYCZNY-STACK-AI-PL.md, RAPPORT-NAUKOWY-GRANICE-AI.md, BROSZURA-MSP.md, agent-flow README, daily-tools README.*
