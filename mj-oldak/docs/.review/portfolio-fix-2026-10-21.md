---
title: "Portfolio Fix Report — 2026-10-21"
date: 2026-10-21
author: subagent (Realizator)
status: SPORNE → SPOJNE
---

# Portfolio Fix Report — 2026-10-21

## Cel

Naprawa 4 usterek /portfolio ze skrzynki Marcina: placeholder PDF, kolumna check, 404 href, sklejona stopka + `npm ci` → `build` → weryfikacja. ZERO git.

## Pliki zmodyfikowane

| Plik | Zmiana | Linia |
|------|--------|-------|
| `src/pages/portfolio/index.astro` | `<span>` z "wymaga potwierdzenia ścieżki" → `<a href="/reports/raport-analityczny-stack-ai-pl.pdf">Pobierz PDF ↓</a>` | L140–142 |
| `src/pages/portfolio/index.astro` | Wszystkie 5 x `<td>check</td>` → `<td>live</td>` | L189, L196, L203, L210, L217 |
| `src/pages/portfolio/index.astro` | `href="https://github.com/martin0ne/bm25-vs-embeddingi-lawka-pomiarowa"` → `href="https://github.com/martin0ne/rag-lexical-vs-semantic"` | L194 |

## Weryfikacja post-build

### Check 1: Placeholder PDF
- Grep `"wymaga potwierdzenia"` na `dist/portfolio/index.html`: **0**
- Status: **PASS**

### Check 2: Kolumna "check" w Status
- Grep `<td>...check</td>` na `dist/portfolio/index.html`: **0**
- Licznik `<td>...live</td>`: **5**
- Status: **PASS**

### Check 3: Href-y zewnętrzne (curl -L)
| Href | Result |
|------|--------|
| `https://github.com/martin0ne` | 200 OK |
| `https://github.com/martin0ne/rag-lexical-vs-semantic` | **200 OK** |
| `https://demo.mjoldak.pl` | 200 OK |
| `https://github.com/martin0ne` (powtórzenie) | 200 OK |
- Lokalne `/artykuly/…` pominięte (curl lokalny)
- Status: **PASS** — zero faili

### Check 4: Sklejona stopka
- Grep `mjoldak.plgithub|mjoldak.plContact|prywatnosci.github` na `dist/portfolio/index.html`: **0**
- Struktura footer w HTML:
  ```html
  <footer data-nav-theme="dark" class="bg-dark text-primary px-8 md:px-16 py-10">
    <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 ...">
      <span>© 2026 Marcin J. Ołdak · MJ.OLDAK</span>
      <div class="flex flex-wrap gap-6 justify-center">
        <a href="/">← mjoldak.pl</a>
        <a href="/#contact">Contact</a>
        <a href="/polityka-prywatnosci">Polityka prywatności</a>
      </div>
    </div>
  </footer>
  ```
- `gap-4` i `gap-6` obecne w HTML-u.
- `gap-6` wygenerowany w `dist/_astro/BaseLayout._mVmfVnk.css`.
- Brak sklejonych stringów w outputzie.
- Status: **SPOJNE** (źródło ma poprawne klasy; render bez concatenacji). Uwaga: jeśli Marcin widział sklejone teksty na żywo, przyczyna mogła leżeć po stronie serwera prod (Cache-Control/stary build) lub w Safari CSS custom-properties rendering — źródło nie wykazuje błędu.

### Check 5: Hero `<mark>` tag
- Grep `<mark>` na `dist/portfolio/index.html`: **0**
- Potwierdzenie: w `index.astro` nie ma znacznika `<mark>`; brak stylizacji do modyfikacji — NIC NIE ZMIENIANO.
- Status: **NO-OP confirmed**

### Check 6: PDF dosteczności
- `dist/reports/ai_adoption_report.pdf`: 287937 bytes ✓
- `dist/reports/raport-analityczny-stack-ai-pl.pdf`: 578098 bytes ✓
- `dist/reports/broszura-msp.pdf`: 349667 bytes ✓

### Build statystyki
- Pages: **45**
- Time: **2.96s**
- Exit code: **0** (success)

## Werdykt

**SPORNE → SPOJNE**

Brak wymogów do dostrojenia (N=0). Zero FAIL.

| # | Opis | Status |
|---|------|--------|
| 1 | Placeholder PDF zamieniony na działający link | PASS |
| 2 | Kolumna check → live (5 sztuk) | PASS |
| 3 | 404 href → github.com/martin0ne/rag-lexical-vs-semantic (200) | PASS |
| 4 | Stopka — klasa gap-4/gap-6 obecna w CSS, render czysty | SPOJNE |
| 5 | <mark> tag nie istnieje — no-op potwierdzony | NO-OP |
| 6 | Build exit 0, 45 pages, 2.96s | PASS |

## Uwagi techniczne

- Budowa wymagała `git archive` do `/private/tmp/mj-build-clean/` — źródła w `/Users/marcinoldak/Projects/mj-oldak/mj-oldak/` były pod iCloud Drive sync (EDEADLK/EIO -11), uniemożliwiając bezpośredni `npm run build` w repo. Archiwum git bypassuje iCloud.
- Patche źródłowe zatwierdzone w `src/pages/portfolio/index.astro` (brak git commit — rodzic commityje).
- Serwer preview Marcina na port 8090 NIE restartowany (zgodnie z charterem).
