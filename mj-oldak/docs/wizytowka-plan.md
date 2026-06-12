# Wizytówka personal-brand — Implementation Plan

> **For agentic workers:** plan do wykonania task-by-task. Workflow = Ścieżka B: Claude koduje przez Edit/Write/Bash, Marcin dyktuje + akceptuje na żywym preview. Checkpointy wizualne oznaczone 🔵.

**Goal:** Przekształcić mjoldak.pl z founder-pitchu (biura rachunkowe) w EN wizytówkę kandydata-eksperta AI z 4 interaktywnymi demami, bez psucia istniejących aktywów.

**Architecture:** Approach B — nowy lean `index.astro` (EN personal-brand) + obecny index przeniesiony na `/dla-biur` (PL agencyjny, żywy). Reuse design tokens + BaseLayout. Izolowane komponenty wizytówki (osobne od współdzielonych Navbar/Footer, by nie psuć /dla-biur i /artykuly). 4 dema = client-side React na danych przykładowych, zero backendu.

**Tech Stack:** Astro 5 static, React 19 (`client:visible`), GSAP, Tailwind 3, lucide-react. Brak test runnera → weryfikacja = `npm run build` + `npm run dev` preview.

**Deploy safety:** całość na branchu `wizytowka`. Merge na `main` (= live CF Pages) DOPIERO po akceptacji Marcina na preview.

---

## File Structure

**Nowe:**
- `src/pages/index.astro` — NOWY personal-brand (zastępuje obecny)
- `src/pages/dla-biur.astro` — przeniesiony obecny index (agencyjny PL)
- `src/components/personal/NavbarPersonal.jsx` — nav EN (Work/About/Skills/Writing/Contact), brand „Marcin Ołdak", CTA „Download CV"
- `src/components/personal/HeroPersonal.jsx` — hero EN (reuse GSAP wzorzec z Hero.jsx)
- `src/components/personal/About.astro` — sekcja About (statyczna)
- `src/components/personal/Skills.astro` — stack/skills (statyczna)
- `src/components/personal/Work.astro` — portfolio: osadza 4 dema + live Sales demo + n8n
- `src/components/personal/Writing.astro` — link do /artykuly
- `src/components/personal/ContactPersonal.jsx` — kontakt EN + formularz (reuse pipeline EmailJS+Sheets z Footer.jsx)
- `src/components/demos/OcrDemo.jsx`, `EmailDemo.jsx`, `DeadlineDemo.jsx`, `ReportingDemo.jsx`
- `src/data/demos/ocr.js`, `email.js`, `deadline.js`, `reporting.js` — sample data
- `public/cv/Marcin-Oldak-CV-EN.pdf` — CV do pobrania (z aplikacji Ciklum)

**Modyfikowane:**
- `src/layouts/BaseLayout.astro` — dodać prop `lang` (default 'pl')

**Nietknięte:** `src/pages/artykuly/*`, `src/content/*`, współdzielone `Navbar.jsx`/`Footer.jsx` (używa ich /dla-biur), wszystkie style global.css.

**Interfejsy sample data (spójność):**
- ocr: `[{ id, label, thumbnailEmoji, fields: { nip, seller, issueDate, net, vat, gross, items: [{name, qty, unitPrice}] } }]`
- email: `[{ id, subject, from, snippet, body, category, draftReply }]` (category ∈ Invoice/Question/Urgent/Spam)
- deadline: `{ taxpayerTypes: [...], deadlines: [{ date, name, type, appliesTo: [...] }] }`
- reporting: `[{ clientName, month, metrics: {...}, previewRows: [...] }]`

---

## Task 0: Branch + szkielet bezpieczeństwa

**Files:** branch `wizytowka`; copy index→dla-biur; modify BaseLayout.

- [ ] Krok 1: `cd` do repo, `git checkout -b wizytowka` (z `main`).
- [ ] Krok 2: `git mv src/pages/index.astro src/pages/dla-biur.astro` — obecny agencyjny pod /dla-biur.
- [ ] Krok 3: W `dla-biur.astro` zmienić `title`/`description` (zostają PL agencyjne — bez zmian treści, to żywa strona klientów).
- [ ] Krok 4: `BaseLayout.astro` — dodać `lang` do Props i `<html lang={lang}>`, default `'pl'` (linia 82).
- [ ] Krok 5: Tymczasowy minimalny `src/pages/index.astro` (placeholder „Wizytówka WIP") by build przeszedł.
- [ ] Krok 6: `npm run build` — Expected: PASS, 0 errors. `npm run dev` — /dla-biur renderuje starą stronę, / renderuje placeholder.
- [ ] Krok 7: Commit: `feat(wizytowka): branch + przenieś agencyjną na /dla-biur + lang prop`.

---

## Task 1: NavbarPersonal + HeroPersonal (EN) 🔵 CHECKPOINT

**Files:** Create `NavbarPersonal.jsx`, `HeroPersonal.jsx`; wire do index.astro.

- [ ] Krok 1: `NavbarPersonal.jsx` — kopia struktury Navbar.jsx, linki EN: Work/About/Skills/Writing/Contact (anchory #work itd.), brand „Marcin Ołdak", CTA „Download CV" → `/cv/Marcin-Oldak-CV-EN.pdf`.
- [ ] Krok 2: `HeroPersonal.jsx` — reuse GSAP reveal z Hero.jsx; treść EN: H1 „Marcin Ołdak", H2 „AI & Automation Consultant", lede „autonomous AI agents & n8n automation — from PoC to production", „MJ.OLDAK" jako mała marka/eyebrow; CTA: See my work / Download CV / Contact.
- [ ] Krok 3: `index.astro` — BaseLayout (lang="en", includeOrganizationSchema={false}, title/desc EN), osadzić NavbarPersonal + HeroPersonal (`client:load`).
- [ ] Krok 4: `npm run dev` — 🔵 **Checkpoint z Marcinem na preview:** hero wygląda OK? tagline/CTA? Dyktuje korekty → iteruję.
- [ ] Krok 5: Po akceptacji commit: `feat(wizytowka): hero + nav personal-brand EN`.

---

## Task 2: About + Skills

**Files:** Create `About.astro`, `Skills.astro`; wire do index.

- [ ] Krok 1: `About.astro` — treść EN wg specu (AI od 2022/komercyjnie 2026, LLM/n8n/agentic, grunt psych+prawo, UPS 3.7r EN, hook „I ship working things"). Reuse klasy sekcji (eyebrow/section-title/lede z global.css).
- [ ] Krok 2: `Skills.astro` — pogrupowany stack (LLM, n8n/orchestration, RAG, BA/discovery, ethical AI, Python). Mapa na keywordy ogłoszeń.
- [ ] Krok 3: Wire do index (po Hero). `npm run build` PASS. Preview.
- [ ] Krok 4: Commit: `feat(wizytowka): about + skills`.

---

## Task 3: OCR demo — WZORZEC 🔵 CHECKPOINT

**Files:** Create `demos/OcrDemo.jsx`, `data/demos/ocr.js`.

- [ ] Krok 1: `ocr.js` — 2-3 sample faktury PL (realistyczne: NIP, sprzedawca, data, netto/VAT/brutto, pozycje).
- [ ] Krok 2: `OcrDemo.jsx` — UI: przełącznik faktur, „Process" button → animacja skanu (reuse estetyki `.ocr-demo` z dawnego index, ale jako sterowalny komponent) → pola pojawiają się sekwencyjnie. Stan React, zero fetch. „Demo · sample data" badge.
- [ ] Krok 3: Osadzić tymczasowo w index (`client:visible`) do podglądu. `npm run dev`.
- [ ] Krok 4: 🔵 **Checkpoint z Marcinem:** to jest WZORZEC dla pozostałych 3. Akceptuje look&feel interakcji? Dyktuje → iteruję.
- [ ] Krok 5: Po akceptacji commit: `feat(wizytowka): OCR interactive demo (wzorzec)`.

---

## Task 4: Email demo (replikuje wzorzec)

**Files:** Create `demos/EmailDemo.jsx`, `data/demos/email.js`.

- [ ] Krok 1: `email.js` — 4-5 sample maili klientów biura (PL): subject/from/body + category + draftReply.
- [ ] Krok 2: `EmailDemo.jsx` — lista maili (inbox), klik → pokazuje kategorię (badge) + wygenerowany szkic odpowiedzi. Wzorzec UI z OcrDemo.
- [ ] Krok 3: build PASS, preview. Commit: `feat(wizytowka): email assistant demo`.

---

## Task 5: Deadline demo (najautentyczniejszy — liczone client-side)

**Files:** Create `demos/DeadlineDemo.jsx`, `data/demos/deadline.js`.

- [ ] Krok 1: `deadline.js` — kalendarz podatkowy 2026 (VAT-7, JPK_V7M, KSeF, ZUS, CIT, PIT) z datami + appliesTo (typ podatnika).
- [ ] Krok 2: `DeadlineDemo.jsx` — wybór miesiąca + typ podatnika → filtruje i pokazuje nadchodzące deadliny (realna logika dat). Highlight „najbliższy".
- [ ] Krok 3: build PASS, preview. Commit: `feat(wizytowka): deadline agent demo`.

---

## Task 6: Reporting demo

**Files:** Create `demos/ReportingDemo.jsx`, `data/demos/reporting.js`.

- [ ] Krok 1: `reporting.js` — 2 sample klienci + miesięczne metryki (przychód/koszty/VAT/wynik).
- [ ] Krok 2: `ReportingDemo.jsx` — wybór klient+miesiąc → podgląd raportu (tabela metryk + sekcje). Opcja „download sample PDF" jeśli prosty (statyczny plik w public) — inaczej tylko podgląd.
- [ ] Krok 3: build PASS, preview. Commit: `feat(wizytowka): reporting agent demo`.

---

## Task 7: Work section (spina dema + live demo + n8n)

**Files:** Create `Work.astro`; wire 4 dema.

- [ ] Krok 1: `Work.astro` — sekcja portfolio: każdy z 4 produktów = karta z mikro-case'em (problem→rozwiązanie→efekt, 1-2 zdania EN) + osadzone demo (`client:visible`).
- [ ] Krok 2: Dodać flagowy blok: **live Sales Agent demo** (link demo.mjoldak.pl) + **n8n pipeline as MCP tool** (opis dowodu agentic).
- [ ] Krok 3: Wire Work do index (po Skills). build PASS, preview.
- [ ] Krok 4: 🔵 Checkpoint: cała sekcja Work z 4 demami działa? Commit: `feat(wizytowka): work/portfolio section`.

---

## Task 8: Writing + ContactPersonal + CV

**Files:** Create `Writing.astro`, `ContactPersonal.jsx`; add `public/cv/Marcin-Oldak-CV-EN.pdf`.

- [ ] ~~Krok 1: CV do public/~~ **ZMIANA 12.06: bez publicznego CV** — CV na kontakt (formularz); źródło w vault `aplikacje/_strona/`.
- [ ] Krok 2: `Writing.astro` — „I write about AI for business" + link do /artykuly (PL blog jako dowód).
- [ ] Krok 3: `ContactPersonal.jsx` — EN kontakt + formularz; reuse pipeline (EmailJS + Sheets webhook) z Footer.jsx; linki mail/LinkedIn/tel + linia „CV on request"; bez „pilota".
- [ ] Krok 4: Wire do index. build PASS, preview. Commit: `feat(wizytowka): writing + contact + CV`.

---

## Task 9: Polish + responsywność + finał 🔵 CHECKPOINT

- [ ] Krok 1: Przegląd mobile (≤480px) — nav, hero, dema (czy interakcje działają na touch).
- [ ] Krok 2: Stopka /dla-biur — dodać dyskretny link „For accounting offices →" do /dla-biur z wizytówki (np. w ContactPersonal lub footerze).
- [ ] Krok 3: `npm run build` finalny PASS. Sprawdzić że /dla-biur i /artykuly nietknięte.
- [ ] Krok 4: Push brancha → Cloudflare branch preview URL.
- [ ] Krok 5: 🔵 **Akceptacja Marcina na żywym preview (desktop+mobile).**
- [ ] Krok 6: Po OK: merge `wizytowka` → `main` → deploy live. Wtedy link wchodzi do aplikacji.

---

## Out of scope (MVP)
Live backendy dem · upload plików · PL wersja strony · bilingual i18n · redesign estetyki · redirect apex→www.

## Definition of Done
6 sekcji EN + 4 działające dema na branchu; /dla-biur i /artykuly nietknięte; build PASS; preview zaakceptowany; gotowe do merge.
