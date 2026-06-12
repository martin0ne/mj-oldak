# Wizytówka personal-brand — spec (MVP)

**Data:** 2026-06-12
**Cel:** Przeprojektować mjoldak.pl z founder-pitchu agencji (biura rachunkowe) na wizytówkę kandydata-eksperta AI pod rekruterów. Link w aplikacjach o pracę (najbliższy: Ciklum — Agentic AI & Automation Consultant).
**Kontekst:** Strategia v2 = etat AI primary, MJ.OLDAK = portfolio. Profil idealnego kandydata: bariera = staż 3-5 lat; obejście = pokazywalne, działające rzeczy (dowód > deklaracja).

## Decyzje (brainstorm 12.06)
| Decyzja | Wybór |
|---|---|
| Język | **Angielski (MVP)**; PL wersja później; 18 artykułów zostają PL jako blog |
| Tożsamość | **Hybryda: Marcin Ołdak (front) + MJ.OLDAK (marka/dorobek)** |
| Kierunek | **Pełny personal brand** — agencyjny pitch znika z frontu, aktywa schodzą do roli dowodu (nie kasujemy plików) |
| Podejście | **B — nowy lean index + obecna strona na `/dla-biur`** |
| Dema | **Wszystkie 4 produkty jako interaktywne, client-side, sample data** |
| Estetyka | **Zachować** istniejący wygląd (design tokens, fonty, bento, GSAP) |

## Architektura (Approach B)
- Nowy `src/pages/index.astro` — lean, personal-brand, EN. Reuse: design tokens (`--accent #4F8EBA`, `--dark #0D1B32`, fonty Manrope/Fraunces/Inter/JetBrains Mono), komponenty Navbar/Footer.
- Obecny index → `src/pages/dla-biur.astro` (agencyjna strona żywa dla klientów MŚP, zejdzie z frontu; link w stopce „For accounting offices →").
- Dema jako komponenty (np. `src/components/demos/OcrDemo.jsx` itd.) — izolowane, każde testowalne osobno.
- Zero nowego backendu. Wszystko client-side na danych przykładowych.

## Struktura strony (single page, EN)
1. **Hero** — „Marcin J. Ołdak — AI & Automation Consultant" (J. = spójność z LinkedIn, decyzja 12.06); podtytuł „autonomous AI agents & n8n automation — from PoC to production"; MJ.OLDAK jako marka obok imienia; CTA: *See my work* / *Get in touch*. **UPDATE 12.06: bez publicznego „Download CV"** — CV wysyłane na kontakt przez formularz (privacy + lead capture; decyzja Marcina). Źródło generycznego CV EN: vault `Rekrutacja/aplikacje/_strona/CV-strona-generic-EN.md`.
2. **About** — AI od 2022, komercyjnie 2026 (MJ.OLDAK); LLM/n8n/agentic daily; grunt psychologia+prawo (discovery, ethical AI/RODO); UPS 3.7 r. w 100% EN. Hook: „I ship working things, not past tense."
3. **Work / Portfolio** ⭐ — 4 produkty jako **interaktywne dema** (sekcja niżej) + **live Sales Agent demo** (demo.mjoldak.pl) + **n8n pipeline jako MCP tool** = flagowy dowód agentic. Każdy z mikro-case'em (problem → rozwiązanie → efekt).
4. **Skills / Stack** — LLM (Claude/Gemini), n8n/orchestration, RAG, BA/discovery (BPMN, Given/When/Then), ethical AI/RODO, Python AI-assisted. Mapa na keywordy ogłoszeń.
5. **Writing** — „I write about AI for business" → link do 18 artykułów (PL blog = dowód eksperckości).
6. **Contact** — mail / LinkedIn / tel + formularz (reuse pipeline EmailJS+Sheets). Bez „pilota za darmo". Linia „CV on request — drop me a message" (CV idzie w odpowiedzi na kontakt, nie publiczny plik).

## 4 interaktywne dema — client-side, sample data (DoD)
Wspólne: UI/labels **EN**; dane przykładowe **realistycznie PL** (faktury/maile polskiego rynku księgowego = pokazuje vertical); zero backendu; zero uploadu obcych danych (sample-only); „demo mode" oznaczone.

| Demo | Interakcja | Sample data | Output | Baza |
|---|---|---|---|---|
| **OCR Invoice Reader** | przełącz przykładową fakturę → „Process" → animacja skanu | 2-3 faktury PL | wyciągnięte pola: NIP, sprzedawca, data, netto/VAT/brutto, pozycje | istniejący `.ocr-demo` widget w index.astro |
| **Email Assistant** | wybierz mail z listy inboxa | 4-5 maili klientów biura | kategoria (Faktura/Pytanie/Pilne/Spam) + szkic odpowiedzi PL | nowy |
| **Deadline Agent** | wybierz miesiąc + typ podatnika | kalendarz podatkowy 2026 | lista deadlinów: VAT-7, JPK_V7M, KSeF, ZUS, CIT, PIT (liczone client-side — najautentyczniejsze) | nowy |
| **Reporting Agent** | wybierz sample klient + miesiąc | 2 sample klienci | podgląd raportu PDF + „download sample" | nowy |

**Wzorzec-najpierw:** OCR jako pierwszy end-to-end → akceptacja Marcina → 3 pozostałe replikują wzorzec komponentu.

## Co znika z frontu / co zostaje
- **Znika (→ `/dla-biur`):** Pilot-za-darmo CTA, „Pomagamy biurom", newsletter-dla-biur, Proces-pilota.
- **Zostaje:** `/dla-biur` (agencyjna strona, żywa), `/artykuly` (blog PL), demo.mjoldak.pl (live).

## Technika i deploy-safety
- Praca na branchu (np. `wizytowka`) — **nie na live `main`** (deploy z main → CF Pages).
- Test: `npm run dev` + `npm run build` lokalnie → Cloudflare branch preview.
- **Merge na main dopiero po akceptacji Marcina na żywym preview.**
- Formularz kontakt: reuse istniejących CF Functions (sprawdzić działanie).
- Junk w repo (macOS „2"-duplikaty, `.legacy-operating-manual`) — NIE ruszamy w tym zadaniu.

## Out of scope (MVP)
- Live backendy dem (łamie 0 PLN/low-maintenance/RODO).
- Upload własnych plików w demach (sample-only).
- PL wersja strony (Tier 2).
- Bilingual i18n routing.
- Pełny redesign estetyki (zachowujemy wygląd).
- Redirect apex→www / SSL (osobny temat z handoff #5).

## Definition of Done
- 6 sekcji EN na branchu, personal-brand narracja.
- 4 dema interaktywne client-side działają na sample data.
- `/dla-biur` zachowuje obecną agencyjną stronę.
- `npm run build` przechodzi; branch preview wygląda OK.
- Gotowe do merge po akceptacji Marcina → wtedy link wchodzi do aplikacji (Ciklum + reszta pipeline).

## Otwarte do potwierdzenia w implementacji
- Nazwa brancha.
- Dokładny tytuł/tagline hero (zaproponuję 2-3 warianty).
- Dokładne sample data per demo (faktury/maile/klienci).
