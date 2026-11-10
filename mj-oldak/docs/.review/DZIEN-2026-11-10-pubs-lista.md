# DZIEŃ 2026-11-10 — lista publikacyjna 20 draftów (VARRO-3)

Skan: frontmatter + pierwsze 10 linii per plik (limit zadania). Klasyfikacja wg kryteriów EVAL-DR2/DZIEŃ.
Stan potwierdzony: 35 plików w `src/content/articles/` = **15 live PL + 20 draft** (zgadza się ze skanem Augustusa); EN osobno 8/8 live; last commit contentu **2026-11-06** (`1f2535d`, notka Zimujący).

**Kryteria klas:**
- **A → PUBLIKUJ-DZIŚ**: publishedAt nowszy niż 30 dni (cutoff 2026-10-11) LUB uniwersalne tematycznie (data quality, AI, benchmark, koszt-automatyzacja — pasuje do wczorajszych case studies i benchmarku).
- **era-agencja → PARKOWAĆ-PYTANIE**: treść związana z tożsamością/launchem/klientem ery agencji (06.08.2026 zamknięta). Nie kasować — pytanie Marcina.
- **outdated (status prawny / ceny / martwe narzędzia) → PRZEPISAĆ**: publikacja "as-is" rozszerzałaby nieaktualne fakty.
- Precedencja: outdated > era-agencja > uniwersalne (martwych faktów nie publikujemy niezależnie od świeżości formy).

**Kontekst czasowy:** 18/20 draftów autorskich z okna IV–VI 2026 (era agencja); bulk-commit 10-21 to import, nie data powstania. Tylko 2 drafty są <30 dni: `solar-eu-punk` (10-12), `trzy-waskie-gardla` (10-15).

---

## 1. Tabela 20 draftów

| # | slug | tytuł | data (publishedAt) | kategorie (tags) | długość (słowa) | klasa | powód (1 zdanie) |
|---|------|-------|--------------------|------------------|-----------------|-------|------------------|
| 1 | trzy-waskie-gardla-demokratyzacji-ai | Trzy wąskie gardła demokratyzacji AI: compute, wagi, kapitał | 2026-10-15 | analiza / edukacja | 1002 | **PUBLIKUJ-DZIŚ** | Najświeższy (<30 dni), uniwersalny temat AI pod benchmark; korekta: H1 duplikuje tytuł, liczby muszą mieć źródło+rok. |
| 2 | solar-eu-punk-domowa-rynna-solarna | Solar EU punk: co naprawdę wiemy o domowej rynni słonecznej | 2026-10-12 | solar, analiza / edukacja | 1651 | **PUBLIKUJ-DZIŚ** | Świeży (<30 dni), ceny jawnie opatrzone datą 12.10.2026 — uczciwa analiza z lukami; korekta: usunąć H1 na starcie. |
| 3 | llm-rag-prompt-engineering-msp | LLM, RAG, prompt engineering — minimum techniczne dla decyzji biznesowej | 2026-06-01 | automatyzacja, tutorial, biuro-rachunkowe / edukacja | 2083 | **PUBLIKUJ-DZIŚ** | Uniwersalny primer AI bez dat granicznych — naturalny podkład pod case studies i benchmark. |
| 4 | czym-jest-agent-ai-praktyczne-wyjasnienie | Czym jest agent AI? Praktyczne wyjaśnienie dla właściciela firmy | 2026-04-15 | automatyzacja, biuro-rachunkowe, tutorial / edukacja | 1005 | **PUBLIKUJ-DZIŚ** | Uniwersalny definicyjny explainer; UWAGA: bliźniak z #5 — nie publikować obu jednego dnia. |
| 5 | czym-jest-agent-ai-dla-ksiegowego | Czym jest agent AI? Praktyczne wyjaśnienie dla księgowego | 2026-05-18 | automatyzacja, biuro-rachunkowe, tutorial / edukacja | 1582 | **PUBLIKUJ-DZIŚ** | Uniwersalny explainer pod niszę księgową; duplikat #4 — drugi dopiero po rozróżnieniu targetu. |
| 6 | 3-zadania-pracownicy-robia-recznie-a-nie-musza | 3 zadania, które Twoi pracownicy robią ręcznie — a nie muszą | 2026-04-22 | automatyzacja, biuro-rachunkowe, koszty / edukacja | 2250 | **PUBLIKUJ-DZIŚ** | Uniwersalny kosztowy tekst, liczby już ze źródłem+rokiem (PARP ROSS 2024, link); sprawdzić, czy nie wyszło nowsze Eurostat. |
| 7 | 5-pytan-przed-zakupem-automatyzacji-ai | 5 pytań przed zakupem automatyzacji AI — checklist dla MŚP | 2026-05-02 | automatyzacja, koszty, compliance, ai-act / edukacja | 3211 | **PUBLIKUJ-DZIŚ** | Evergreen checklist; korekta: teza Gartnera („80% nie wyjdzie z pilota") wymaga roku/źródła, wątek AI Act — status. |
| 8 | 7-pytan-do-dostawcy-ai-biuro-rachunkowe | 7 pytań do dostawcy AI — kompas dla biura rachunkowego | 2026-05-18 | compliance, biuro-rachunkowe, ai-act / edukacja | 2154 | **PUBLIKUJ-DZIŚ** | Checklist evergreen ze świeżym badaniem (Wolters Kluwer X–XI 2025, n=581); zweryfikować wątek AI Act. |
| 9 | ile-kosztuje-godzina-recznego-przepisywania-danych | Ile kosztuje godzina ręcznego przepisywania danych — kalkulator 2026 | 2026-04-25 | koszty, automatyzacja, biuro-rachunkowe / edukacja | 1900 | **PUBLIKUJ-DZIŚ** | Kalkulator evergreen, płace ze źródłem+rokiem (Wynagrodzenia.pl 2025); dopilnować, by „2026" w tytule nie sugerowało świeższych danych niż są. |
| 10 | biuro-rachunkowe-oszczedza-60h-miesiecznie | Biuro rachunkowe oszczędza 60 godzin miesięcznie — anatomia automatyzacji | 2026-04-29 | biuro-rachunkowe, case-study, automatyzacja, koszty | 2608 | **PUBLIKUJ-DZIŚ** | Pasuje do case studies; korekta: rok przy cenniku Finerto (2024) i datach case studies (Poltax, Meritum, autoMEE, Plona). |
| 11 | agent-ai-przetwarza-fakture-8-sekund | Jak agent AI przetwarza polską fakturę w 8 sekund — live demo pipeline | 2026-05-06 | biuro-rachunkowe, demo, n8n-claude, vat-pit / demo | 2732 | **PUBLIKUJ-DZIŚ** | Własny benchmark (8 s / ~8 gr / 93%) pasuje do benchmark-case narrative; korekta: data pomiaru + notka, że koszt modeli się zmienia. |
| 12 | stack-pod-agentow-ai-claude-n8n-azure | Stack pod agentów AI: Claude, n8n, Azure Document Intelligence | 2026-04-08 | n8n-claude, tutorial, automatyzacja, demo / demo | 1289 | **PUBLIKUJ-DZIŚ** | Narzędzia żywe i aktualne; korekta: framing „12 miesięcy wdrożeń u realnych klientów" (era agencja) zmiękczyć lub zweryfikować. |
| 13 | agent-skrzynka-mailowa-biura-rachunkowego | Agent AI dla skrzynki mailowej biura rachunkowego — architektura, koszty, compliance | 2026-04-29 | biuro-rachunkowe, automatyzacja, n8n-claude, compliance | 2514 | **PRZEPISAĆ** | Ceny API (kwiecień 2026) są w centrum artykułu i nieaktualne po ~6 mies., stat „117 maili" (Microsoft WTI) bez roku — wymagane pełne przejście z weryfikacją. |
| 14 | ai-act-2026-biuro-rachunkowe-compliance | AI Act 2026 — co polskie biura rachunkowe muszą wiedzieć | 2026-05-11 | ai-act, compliance, biuro-rachunkowe | 2320 | **PRZEPISAĆ** | Sekcja „Aktualny status implementacji" (projekt ustawy z 31.03.2026 w Sejmie, KRiBSI) po ~5 mies. niemal na pewno nieaktualna — sprawdzić losy ustawy przed publiką. |
| 15 | ai-act-co-polskie-msp-musi-wiedziec | AI Act 2026 — co polskie MŚP musi wdrożyć i jak to się ma do RODO | 2026-05-09 | ai-act, compliance, biuro-rachunkowe | 3148 | **PRZEPISAĆ** | Framing odliczania („niecałe 15 miesięcy do 2 sierpnia") zgasł; status Digital Omnibus (19.11.2025) i chronologia wymagają aktualizacji. |
| 16 | ai-dla-biur-rachunkowych-2026 | AI dla biur rachunkowych w 2026 — przewodnik krok po kroku | 2026-05-25 | biuro-rachunkowe, automatyzacja, compliance | 2180 | **PRZEPISAĆ** | Wisi na statusie KSeF („obowiązkowy od 1 kwietnia") i twardych liczbach rynkowych — przewodnik „co zrobić w 2026" wymaga audytu dat i statusów. |
| 17 | case-study-4h-dziennie-do-20-minut | Case study: 4 godziny dziennie skrócone do 20 minut | 2026-04-12 | case-study, automatyzacja, biuro-rachunkowe, demo | 1075 | **PARKOWAĆ** (pytanie) | Własny pilotaż u klienta, tekst sam mówi „nie jest jeszcze opublikowany jako referencja" — publikacja wymaga decyzji o zgodzie klienta. |
| 18 | premiera-4-demo-agentow-ai-dla-biura-rachunkowego | Premiera: 4 gotowe demo agentów AI dla biura rachunkowego — testuj za darmo | 2026-05-20 | demo, biuro-rachunkowe, automatyzacja | 2042 | **PARKOWAĆ** (pytanie) | Ogłoszenie launchowe ery agencji z kotwicami czasu („wczoraj", „od dziś") — pytanie strategiczne, czy premiera demo wciąż obowiązuje; przy GO przepisać czasy. |
| 19 | dlaczego-pierwsze-demo-pokazalem-za-darmo | Dlaczego pierwsze demo AI pokazałem za darmo — strategia sprzedaży dla solo-founderów | 2026-05-13 | automatyzacja, biuro-rachunkowe, case-study | 2019 | **PARKOWAĆ** (pytanie) | Narracja sprzedażowa ery agencji („pierwszy klient"); strategia cenowa z ery nieaktualna po zamknięciu (pytanie do Marcina); ostatnia edycja 02.11 — ktoś wracał do pliku. |
| 20 | mj-oldak-kim-jestesmy-co-budujemy | MJ.OLDAK — kim jesteśmy, co budujemy, dla kogo polskich biur rachunkowych | 2026-05-11 | biuro-rachunkowe, automatyzacja, compliance | 2030 | **PARKOWAĆ** (pytanie) | Manifest tożsamości agencji AI dla biur rachunkowych — pytanie, czy to pozycjonowanie nadal obowiązuje po zamknięciu ery; liczba „70 000 biur" niespójna z „17 181 (GUS)" z #18. |

**Bilans klas: PUBLIKUJ-DZIŚ = 12 · PRZEPISAĆ = 4 · PARKOWAĆ (pytanie) = 4.**

Ryzyko spójności danych (przy publikacji kilku tego samego dnia): „70 000 biur rachunkowych i podmiotów księgowych" (#16, #20) vs „17 181 biur rachunkowych (GUS)" (#18) — różne definicje/źródła; przed publiką ujednolicić metrykę i podać źródło+rok (EVAL-DR2).

---

## 2. TOP-3 na dziś

1. **trzy-waskie-gardla-demokratyzacji-ai** — najświeższy draft (10-15), uniwersalna analiza AI (wagi/compute/kapitał), tematycznie wprost pod benchmark i case studies. Korekty przed publikacją: (a) usunąć H1 `# Trzy wąskie gardła demokratyzacji AI` — EVAL-DR2: bez nagłówka duplikującego tytuł, (b) każdą liczbę z filmu/raportu opatrzyć źródłem+rokiem.
2. **llm-rag-prompt-engineering-msp** — uniwersalny primer AI dla decyzji biznesowych, zero dat granicznych, zaczyna od akapitu (kryterium „bez nagłówka" spełnione). Korekty: przegląd definicji pod kątem wskaźanych narzędzi (czy nie ma martwych), liczby — jeśli są — ze źródłem+rokiem.
3. **3-zadania-pracownicy-robia-recznie-a-nie-musza** — uniwersalny kosztowy tekst dokładnie w kryterium EVAL-DR2: liczby już z podaniem źródła+roku (PARP ROSS 2024 z linkiem), start od liczby, nie od nagłówka. Korekty: sprawdzić, czy nie ma nowszego wydania ROSS/Eurostat (dane za 2024); ewentualnie dopisać rok wprost przy „3,7% PL / 13,5% UE".

Kolejność dnia: 1 → 3 → 2 (świeżość i dopasowanie do benchmarku maleją). Nie publikować #4 i #5 razem (bliźniaki).

---

## 3. Auto-newsletter przy push/deploy

**Weryfikacja: NIE — push/deploy NIE wysyła newslettera. Dowody:**
- `package.json` scripts: tylko `dev/build/preview/astro` — brak hooka postdeploy/build z wysyłką.
- Brak `.github/` (deploy ręczny → Cloudflare Pages/wrangler), brak cronów w konfiguracji wrangler.
- `functions/api/newsletter/` (subscribe / confirm/[uuid] / unsubscribe/[token]): infrastruktura zapisu z double opt-in; Resend używany wyłącznie do **maila potwierdzeniowego na akcję użytkownika** — brak broadcastu do `subscribers`.
- `scripts/`: brak bulk-send; `leads-apps-script.gs` = notyfikacja leadów kontaktowych na biuro@mjoldak.pl (formularz, nie newsletter); `@emailjs/browser` = formularz kontaktowy.
- `@astrojs/rss` + `src/pages/rss.xml.js` = feed RSS (automatyczna aktualizacja przy deployu, ale to feed, nie wysyłka).

**Realne ryzyko wysyłki: brak. Ryzyko zaistnienia:** publikacja draftu natychmiast trafia do `/rss.xml` (feed główny PL) — subskrybenci RSS widzą wpis od razu; newsletter do listy `subscribers` wymaga osobnej, ręcznej akcji. `scripts/check-feeds.sh` weryfikuje feedy /pnews/ PRZED buildem (ochrona, nie wysyłka).

---

## 4. Zastrzeżenia
- Klasy nadane z frontmatteru + pierwszych 10 linii (limit zadania) — PRZEPISAĆ i TOP-3 wymagają czytania całości przy redakcji; nie czytano pełnych tekstów.
- `publishedAt` = frontmatter; mtime gita (10-21) to bulk-commit.
- ZAKAZ respektowany: zero push, zero external, zero edycji draftów/konfiguracji — jedyny zapis to ten plik.
