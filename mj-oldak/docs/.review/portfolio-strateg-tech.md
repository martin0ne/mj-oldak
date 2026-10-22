# Portfolio — strategia i architektura (v1)

> Read-only audyt repo `upgrade-astro7-tailwind4`. Nie edytuje plików źródłowych.

## 1. WERDYKT STRATEGICZNY

**Cel zakładki:** jednostronicowy filtr dowodowy — pokazać MARCINA JAKO BUILDERA (nie studenta), w formacie "tu działa kod", na pierwszą stronę bez skrolowania poza hero. Adresat pierwszy: rekruter AI startup (PL); wtórny: MŚP szukający konkretnego artefaktu, nie abstrakcyjnej agencji.

## 2. MVP v1 — 6 bloków treści (kolejność sztywna)

### Block 01: Hero statement (1 ekran)
- **Kicker:** `PORTFOLIO · DOWODY`
- **H1:** `Marcin J. Ołdak — co zbudowałem, co działa.`
- **Lead:** 2 zdania max. "Działam jako solo-przedsiębiorca. Buduję agentów AI, analizy danych i teksty — wszystko na GitHubie, na live demo lub w PDF. Zero słów bez kodu."
- **CTA:** link do sekcji artefaktów ("Przejrzyj artefakty").
- Wariant live: zdjęcie z home-page (ten sam rotator) albo czarne tło monochromiczne bez zdjęcia (szybsze, mniej slopu).

### Block 02: Artefakty publiczne — SIATKA KART (dowód główny)
6 kart w siatce 3x2 (desktop) / 1-col (mobile). Każda karta:
- numer mono `01–06`, tytuł, jednozdaniowy opis po ludzku, link do działającego artefaktu (GitHub / live URL / lokalny plik).

| # | Nazwa | Format | Link | Status claim-code |
|---|-------|--------|------|------------------|
| 01 | Agent Mission Control | Live demo | `demo.mjoldak.pl` | dziala |
| 02 | OCR Invoice Reader | Live demo + GitHub | `github.com/martin0ne/...` | dziala |
| 03 | Email Classifier | Live demo + GitHub | `github.com/martin0ne/...` | dziala |
| 04 | Reporting Agent | GitHub + opis | `github.com/martin0ne/...` | dziala |
| 05 | Raport GUS x Eurostat | PDF (`public/reports/ai_adoption_report.pdf`) + artykuł | `/artykuly/co-dane-mowia-o-adopcji-ai-polska-vs-ue/` | dziala |
| 06 | 6 Public Repos | GitHub profile list | `github.com/martin0ne` | dziala |

Design: flat karty z cienkim borderem `dark:border-[var(--c-line)]`, serif tytul, sans opis, hover → lekka ramka accent. ZERO emoji, ZERO gradientów, zero ikon SVG jeśli niepotrzebne (numer mono wystarczy).

### Block 03: Stack kompetencji (zwarta lista, nie kolumny)
Tylko TOP-7. Format: wiersz z linią włosową — jak w WorkAndStack, ale skrócony.
1. Agenci AI & LLMs (Claude, Gemini, Hermes)
2. Workflow orchestration (n8n, Firecrawl, MCP)
3. Python/FastAPI & data engineering
4. Dokument AI & compliance (RODO, człowiek w pętli)
5. Analiza danych publiczne (GUS, Eurostat, NBP)
6. R&D i research (BM25 vs embedding, RAG benchmark)
7. Tekst i eseja (redakcja, think-tank)

Bez tłumaczeń explicitem ("LLM = ...") — portfolio ma być krótsze niż home.

### Block 04: Raporty think-tank (download)
Trzy linki do istniejących PDF-ów w `public/reports/`:
- `Raport analityczny: stack AI w Polsce` (PDF)
- `Raport naukowy: granice AI` (PDF)
- `Broszura MSP: automatyzacja bez zastępowania ludzi` (PDF)

Format: prosta lista z nazwą i przyciskiem "Pobierz PDF". Bez podglądu, bez thumbnails.

### Block 05: Claim ↔ Code honesty table
Prosta tabela — każdy claim z linkiem do kodu/artefaktu:

| Co twierdzę | Gdzie udowodnić | Status |
|-------------|-----------------|--------|
| Piszę agenci AI | github.com/martin0ne | check |
| Znam RAG/RAG | github.com/martin0ne/bm25-vs-embedding | check |
| Działam z danymi publicznymi | artykuł + raport PDF | check |
| Rozumiem RODO/compliance | demo + dokumentacja | check |

To jest SEKCJA ROŻNICA — nic takiego nie ma na stronie głównej.

### Block 06: Kontakt / CTA końcowy
- Krótkie zdanie: "Szukasz konkretnego rozwiązania? Pisz bezpośrednio: [email]."
- Link do GitHub.
- Link powrotu na home ("Wróć na stronę główną").
- Sekcja `data-nav-theme="light"` (jak AboutSection na home).

## 3. CIETY — co NIE WDARWA DO MVP v1

### Nie wchodzi (cięcia góra):
1. **Edukacja / wykształcenie** — 3 wpisy bez dyplomu czytane jako "nie skończył". Marcin ma rację: silne portfolio ONLINE kompensuje tę lukę. Jeśli ktoś pyta o dyplom — telefon rozmowa wystarcza.
2. **Strona / oferta dla biur rachunkowych** — dla-biur w archiwum (noindex). To osobna strona produktowa, nie portfolio. Rozmywa przekaz builder-focused.
3. **Sekcja "Skills" z wykresami/skill-bar'ami** — slope'y. Zero interaktywnych pasków postępu.
4. **About Section pełny** — nie potrzebujemy biografii. Jedno zdanie w liście kompetencji wystarczy.
5. **Interactive cards / modals / lightboxy** — za dużo JS-na-strone, rozmywa wydajność. Statyczne linki wystarczą.
6. **Blog/artykuły feed** — już jest na `/artykuly/`. Nie duplikuj.
7. **English version (/en/portfolio/)** — v1 TYLKO PL. Dodanie EN = podwójna praca copy. Po akceptacji MVP v1 przez Marcina, wtedy tłumacz.
8. **Social proof / testimoniale / client loga** — brak realnych external commitments (Mom Test violation). Zero fake social proof.
9. **Video / animowane wprowadzenia** — GSAP na homepage to ciężar. Portfolio musi się ładować natychmiast.
10. **Download CV button** — nie buduj separate CV generator. Portfolio jest lepszym odpowiednikiem CV. Jeśli Marcin potrzebuje tradycyjnego CV — odrębny task.

## 4. ARCHITEKTURA TECHNICZNA

### 4.1 Nowa trasa — ścieżki

```
src/pages/portfolio/index.astro          # główna strona portfolio
src/pages/portfolio/[slug].astro         # opcjonalne: szczegol poszczegolnych projektow (future)
```

### 4.2 Wzorzec pliku (kopiuj z index.astro)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import NavbarPersonal from '../components/personal/NavbarPersonal.jsx';
import FooterSlim from '../components/personal/FooterSlim.astro';

const title = 'Portfolio — Marcin J. Ołdak (MJ.OLDAK)';
const description = 'Portfolio projektów, dem i raportów. Kod, dema na żywo, PDF-y.';
---

<BaseLayout title={title} description={description} lang="pl">
  <NavbarPersonal client:load />

  <!-- Block 01: Hero -->
  <section id="top" data-nav-theme="dark" class="min-h-[100dvh] bg-dark text-primary flex items-center px-8 md:px-16">
    <!-- content -->
  </section>

  <!-- Block 02: Artefakty siatka -->
  <section id="artefakty" data-nav-theme="light" class="min-h-screen px-8 md:px-16 py-24">
    <!-- content -->
  </section>

  <!-- Block 03: Stack kompetencji -->
  <section id="stack" data-nav-theme="light" class="px-8 md:px-16 py-24">
    <!-- content -->
  </section>

  <!-- Block 04: Raporty -->
  <section id="raporty" data-nav-theme="light" class="px-8 md:px-16 py-24">
    <!-- content -->
  </section>

  <!-- Block 05: Honesty table -->
  <section id="claim-code" data-nav-theme="light" class="px-8 md:px-16 py-24">
    <!-- content -->
  </section>

  <!-- Block 06: Kontakt -->
  <section id="kontakt" data-nav-theme="light" class="px-8 md:px-16 py-24">
    <!-- content -->
  </section>

  <FooterSlim />
</BaseLayout>
```

### 4.3 Źródło prawdy dla artefaktów (JS data file)

Jeden plik jako jedyne źródło prawdy dla Block 02:

```
src/data/portfolio.js
```

```javascript
export const artifacts = [
  {
    num: '01',
    title: 'Agent Mission Control',
    desc: 'Samodzielny agent planujący, wołający narzędzia i naprawiający błędy.',
    url: 'https://demo.mjoldak.pl',
    target: '_blank',
    note: 'live demo',
  },
  // ... więcej entry
];
```

Renderowanie w .astro: `{artifacts.map((a) => (...))}` — jeden edit pliku = cała siatka odświeżona.

### 4.4 NavbarPersonal.jsx — dodanie linku portfolio

W state `navLinks[]` (wersja PL i EN) dodać przed "Teksty":
```
{ href: `${prefix}/portfolio/`, label: 'Portfolio' }
```

Po zmianie w NavbarPersonal.jsx: aktualna domena zmienia nawigację w KAŻDEJ podstronie. Link → anchor (#work/#about) zamieniony na pełną trasę.

### 4.5 Powiązanie z public/reports/*.pdf

Bez kopiowania — bezpośredni link do ścieżek:
- `/products/reports/broszura-msp.pdf`
- `/reports/raport-analityczny-stack-ai-pl.pdf`
- `/reports/raport-naukowy-granice-ai.pdf`

Sprawdzić czy te ścieżki faktycznie działają (grep w repo path resolution). Jeśli nie — użyć `Astro.asset('/reports/...')`.

### 4.6 Styling

- Tailwind 4 CSS-first: klasy w inline `class=""` jak w WorkAndStack.
- Tokeny z global.css (`--color-background`, `--color-accent`, `--font-serif`, `--font-mono`).
- Brak custom CSS per-sekcja (wyjątek: ewentualny @keyframes jeśli Marcin zaakceptuje jedną prostą animację).
- Mobile-first grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` dla artefaktów.
- Seperatory sekcji: `<hr class="border-t border-dark/10 dark:border-[var(--c-line)]">` jak na home.

### 4.7 SEO metadane

```html
<title>Portfolio — Marcin J. Ołdak (MJ.OLDAK)</title>
<meta name="description" content="Portfolio projektów, dem i raportów.">
<meta property="og:title" content="Portfolio — Marcin J. Ołdak">
<meta property="og:description" content="Projekty, które działają. Kod + dema + PDF-y.">
```

## 5. WERDYKT BIZNESOWY: BULLET OR CANNONBALL?

**Bullet. SMaC core reguła #10.**

Zakres bezpiecznego pierwszego strzału:
- Jedna nowa trasa `/portfolio/` (PL only)
- 6 kart artefaktów ze statycznych danych
- 6 sekcji tekstu (hero + artefakty + stack + raporty + honesty + kontakt)
- 1 zmiana w NavbarPersonal.jsx (dodanie linku)
- Zero nowych komponentów (wszystko w jedynym pliku `.astro`)
- Zero JS interakcji (brak modal/lightbox/slider)

Nie-cannonball elementy świadome odrzucone:
- Animowany hero (chyba że Marcin wymaga — pytanie osobne)
- Angielska wersja (/en/portfolio/)
- Dynamiczne pobieranie danych z GitHub API
- Sub-pages dla każdego artefaktu
- Interactive code viewer / live playground

**Uzasadnienie:** bullet before cannonball. Strona ma filtrować rekruterów i MŚP na pierwszej wrażenie. Jeśli coś działa od razu (6 kart + linki) — to jest dowód. Jeśli Marcin powie "chcę więcej", dodamy iteracyjnie.

---

## OTWARTE PYTANIA DO MARCINA (max 4)

1. **Hero na portfolio:** zdjęcie z home-page (rotator) czy czarne tło bez foto? Zdjęcie = bardziej osobiste, czarne tło = szybsze ładowanie, mniej "AI-slop vibe".

2. **Sekcja edukacja:** całkowicie usunąć z portfolio (bo portfolio = dowód, nie CV) czy dać jedno zdanie "Wykształcenie: szczegół na życzenie"? Decyzja o tym, czy "Brak dyplomu" jest sygnałem który odbierałeś.

3. **Stack kompetencji:** tylko TOP-7 jak zaplanowano czy chcesz żeby była dłuższa (10-12 pozycji)? Homepage ma 7 grup — portfolio powinno być węższe.

4. **English version:** czy robimy równocześnie `/en/portfolio/` (podwójna praca) czy PL v1 jako priorytet? Rekomendacja: PL v1 first, EN potem.

---

## CHECKLISTA PRZED IMPLEMENTACJĄ

- [ ] Zatwierdzenie strategii przez Marcina
- [ ] Sprawdzenie live-URL dem (demo.mjoldak.pl i inne)
- [ ] Potwierdzenie ścieżek PDF w public/reports/
- [ ] Aktualizacja NavbarPersonal.jsx (dodanie linku)
- [ ] Wygenerowanie portfolio/index.astro z src/data/portfolio.js
- [ ] Build test (`npm run build`)
- [ ] Smoke test statycznej strony (curl po /portfolio/)
- [ ] Greppery fingerprintów (gradienty, rounded-full, emoji, animate-pulse)
- [ ] Commit na branch `upgrade-astro7-tailwind4`
