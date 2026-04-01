# MJ.OLDAK — Brand Style Guide

> Single source of truth dla identyfikacji wizualnej marki.
> Dokument oparty na stronie internetowej mj-oldak.com.

---

## 1. Paleta kolorów

### Kolory główne

| Rola | Nazwa | HEX | RGB | Opis |
|------|-------|-----|-----|------|
| Tło | **Warm Stone** | `#F5F3EE` | `245, 243, 238` | Ciepłe jasne tło. Główna powierzchnia strony, jasne sekcje. |
| Powierzchnia | **Chalk** | `#E8E4DD` | `232, 228, 221` | Tekst na ciemnym tle, jasne karty, inputy formularzy. |
| Akcent | **Signal Red** | `#E63B2E` | `230, 59, 46` | Kolor akcji — przyciski CTA, focus states, pulsujące wskaźniki, hover glows. |
| Fundament | **Ink** | `#111111` | `17, 17, 17` | Ciemne tło (hero, navbar, footer), tekst na jasnym tle. |

### Zasady użycia kolorów głównych

- **Ink + Warm Stone** — podstawowy kontrast. Tekst `Ink` na tle `Warm Stone` (contrast ratio ~16:1).
- **Chalk na Ink** — tekst na ciemnych sekcjach. Nigdy nie używaj czystego białego (#FFF).
- **Signal Red** — zarezerwowany wyłącznie dla elementów interaktywnych i wyróżnień. Max 10–15% powierzchni widoku.
- **Warm Stone vs Chalk** — `Warm Stone` to tło strony, `Chalk` to powierzchnie elementów (karty, inputy). Nie zamieniaj ról.

### Warianty opacity

Kolory używane z Tailwind opacity modifiers (`color/opacity`):

| Opacity | Zastosowanie |
|---------|-------------|
| `/70` | Tekst drugorzędny (opisy, podpisy) |
| `/60` | Tekst trzeciorzędny |
| `/40–/50` | Placeholdery, disabled states |
| `/20–/30` | Subtelne bordery, separatory |
| `/10` | Tła kart, hover states na ciemnym |
| `/5` | Micro-tła, subtelne powierzchnie |

### Kolory statusów (semantyczne)

| Status | HEX | Tailwind | Użycie |
|--------|-----|----------|--------|
| Aktywny / Online | `#22c55e` | `green-500` | Wskaźniki live, statusy aktywne |
| Syncing / Info | `#3b82f6` | `blue-500` | Stany przetwarzania |
| Premium / Special | `#a855f7` | `purple-500` | Wyróżnienia, statusy specjalne |

Kolory statusów zawsze z glow shadow: `0 0 8px {kolor}80`.

### Accent Glow (signature effect)

```
Hover glow:   box-shadow: 0 8px 40px rgba(230, 59, 46, 0.15)
Pulse glow:   box-shadow: 0 0 12px rgba(230, 59, 46, 0.6)
Focus ring:   outline: 2px solid #E63B2E; outline-offset: 2px
```

---

## 2. Typografia

### Rodziny fontów

| Rola | Font | Wagi | Styl |
|------|------|------|------|
| **Display** | DM Serif Display | 400 | Regular + *Italic* |
| **UI / Nagłówki** | Space Grotesk | 400, 500, 700 | Regular, Medium, Bold |
| **Mono / System** | Space Mono | 400, 700 | Regular, Bold (+ italic) |

### Kiedy używać którego fontu

- **DM Serif Display (italic)** — duże hasła, cytaty, nazwy sekcji o charakterze ekspresyjnym. Zawsze italic. Nigdy do paragrafów tekstu.
- **Space Grotesk** — nagłówki sekcji (bold, uppercase, tight tracking), przyciski, nawigacja, UI labels. Domyślny font marki.
- **Space Mono** — opisy, podpisy, tekst techniczny, etykiety, kod, dane liczbowe. Buduje "tech" charakter marki.

### Hierarchia rozmiarów

| Element | Mobile | Desktop | Font | Waga | Dodatkowe |
|---------|--------|---------|------|------|-----------|
| Hero H1 | 3rem (48px) | 4.5–6rem (72–96px) | Space Grotesk | Bold | uppercase, tracking-tight |
| Display (hasło) | 2.25rem (36px) | 3.75–8rem (60–128px) | DM Serif Display | 400 | italic |
| Section H2 | 2.25rem (36px) | 3rem (48px) | Space Grotesk | Bold | uppercase, tracking-tight |
| Card H3 | 1.5rem (24px) | 1.5rem (24px) | Space Grotesk | Bold | — |
| Body / Opis | 0.875rem (14px) | 1rem (16px) | Space Mono | 400 | — |
| Label / Tag | 0.625–0.75rem (10–12px) | 0.75rem (12px) | Space Mono | 400/700 | uppercase opcjonalnie |
| Button | 1.125rem (18px) | 1.125rem (18px) | Space Grotesk | Bold | — |
| Nav link | 0.875rem (14px) | 0.875rem (14px) | Space Mono | 400 | — |

### Tracking (letter-spacing)

| Token | Wartość | Użycie |
|-------|---------|--------|
| `tracking-tight` | -0.025em | Nagłówki H1, H2 |
| `tracking-tighter` | -0.05em | Extra-large display text |
| `tracking-wider` | 0.05em | Labele mono |
| `tracking-widest` | 0.1em | Spacjowane etykiety |
| `tracking-[0.3em]` | 0.3em | Dekoracyjne elementy mono |

### Leading (line-height)

| Token | Wartość | Użycie |
|-------|---------|--------|
| `leading-[0.85]` | 0.85 | Duże display headings |
| `leading-[0.9]` | 0.9 | H1 headings |
| `leading-none` | 1.0 | Hero text |
| `leading-relaxed` | 1.625 | Body text (mono) |

---

## 3. Zaokrąglenia (Border Radius)

### System

| Token | Wartość | Użycie |
|-------|---------|--------|
| `rounded-sm` | 2px | Micro elementy (grid cells, badges) |
| `rounded-md` | 6px | Ikony, małe kafelki |
| `rounded-lg` | 8px | — |
| `rounded-xl` | 12px | Inputy formularzy |
| `rounded-2rem` | 32px | Przyciski, feature cards, wewnętrzne panele |
| `rounded-3rem` | 48px | Navbar, protocol cards (duże powierzchnie) |
| `rounded-4rem` | 64px | Footer top radius |
| `rounded-full` | pill | Status dots, avatary |

### Zasada

Marka preferuje **duże zaokrąglenia** (2rem+). Ostre rogi (`rounded-none`) nie powinny pojawiać się na widocznych elementach UI. Im większy element, tym większy radius.

---

## 4. Cienie i głębia

### Standardowe cienie

| Wariant | Użycie |
|---------|--------|
| `shadow-lg` | Feature cards (default) |
| `shadow-2xl` | Protocol cards, hero elementy |

### Accent glow (on hover / focus)

```css
/* Hover na kartach */
box-shadow: 0 8px 40px rgba(230, 59, 46, 0.15);

/* Pulsujące elementy (status, hero dot) */
box-shadow: 0 0 12px rgba(230, 59, 46, 0.6);

/* Status glow (zielony) */
box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
```

### Drop shadow (ikony, kursory)

```css
drop-shadow(0 2px 8px rgba(232, 228, 221, 0.3))
```

### Zasada

Cienie są subtelne na jasnym tle. Na ciemnym tle używamy **glow effects** (kolorowe box-shadow) zamiast klasycznych cieni.

---

## 5. Efekty specjalne (Signature Elements)

### Noise Overlay
- SVG fractal noise na fixed overlay
- Opacity: **5%** (`opacity: 0.05`)
- Z-index: najwyższy (9999)
- Cel: dodaje analogowy, "filmowy" charakter. Zawsze obecny.

### Glassmorphism (Navbar)
- `backdrop-blur-xl` + półprzezroczyste tło
- Tryb jasny: `bg-background/70`
- Tryb ciemny: `bg-dark/60`
- Border: `border-primary/10` (jasny) / `border-primary/10` (ciemny)

### 3D Tilt (Feature Cards)
- Perspective: `800px`
- Rotacja: `±6deg` na osi X i Y
- Easing: `power2.out` (ruch), `elastic.out(1, 0.5)` (powrót)

### Terminal Scanlines
- Repeating linear gradient: 2px transparent, 2px primary color
- Opacity: **3%**
- Cel: efekt CRT/terminal na widgetach technicznych

### Typewriter Effect
- Prędkość: 35ms/znak (normalny), 8ms (hover)
- Kursor: 6px x 3px, `bg-accent`, pulsujący

---

## 6. Ruch i animacje

### Domyślne wartości

| Parametr | Wartość | Kiedy |
|----------|---------|-------|
| **Easing** | `power3.out` | Wejścia elementów, scroll reveals |
| **Duration** | 0.8–1.2s | Wejścia (scroll reveals, page load) |
| **Duration** | 0.3s | Hover, focus, micro-interakcje |
| **Duration** | 0.4–0.6s | Interakcje (tilt, click feedback) |
| **Stagger** | 0.08–0.15s | Sekwencyjne wejścia grup elementów |

### Scroll Animations (GSAP ScrollTrigger)
- Wzorzec wejścia: `y: 40 → 0`, `opacity: 0 → 1`
- Start triggera: `top 75%` viewport
- Scrub: `true` dla efektów parallax

### Transition easings (CSS)
- Standard: `ease-out`
- Custom smooth: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Elastic (GSAP): `elastic.out(1, 0.5)` — powrót karty 3D

### Zasady

- Każdy element wchodzący w viewport powinien mieć animację wejścia (fade + translate Y).
- Hover effects: natychmiastowe (0.3s max). Nigdy nie blokuj interakcji.
- Preferuj `transform` i `opacity` — unikaj animowania `width`, `height`, `margin`.

---

## 7. Layout & Spacing

### Siatka

| Parametr | Wartość |
|----------|---------|
| Max-width kontentu | `max-w-7xl` (1280px) |
| Padding horyzontalny | `px-6 md:px-12` |
| Padding wertykalny sekcji | `py-32` (128px) |
| Gap (grid) | `gap-8` (32px) |
| Grid kolumny (desktop) | `lg:grid-cols-3` |

### Spacing Scale (najczęstsze)

| Wartość | rem | px | Użycie |
|---------|-----|----|--------|
| `4` | 1rem | 16px | Wewnętrzny padding małych elementów |
| `6` | 1.5rem | 24px | Padding mobile |
| `8` | 2rem | 32px | Standard padding, gaps |
| `12` | 3rem | 48px | Padding desktop |
| `16` | 4rem | 64px | Separacja sekcji |
| `32` | 8rem | 128px | Górny/dolny padding sekcji |

---

## 8. Tryby kolorystyczne

### Jasny (Warm Stone Background)
- Tło: `#F5F3EE` (Warm Stone)
- Tekst: `#111111` (Ink)
- Tekst drugorzędny: `#111111` z opacity /70
- Karty: `bg-dark/5` border `border-dark/10`
- Akcent: `#E63B2E` (Signal Red)

### Ciemny (Ink Background)
- Tło: `#111111` (Ink)
- Tekst: `#E8E4DD` (Chalk)
- Tekst drugorzędny: `#E8E4DD` z opacity /70
- Karty/inputy: `bg-primary/[0.05]` border `border-primary/10`
- Akcent: `#E63B2E` (Signal Red) — bez zmian

### Kiedy używać
- **Hero, Navbar (scroll), Footer** → ciemny tryb (Ink)
- **Features, Protocol, Philosophy** → jasny tryb (Warm Stone)
- Akcent (`Signal Red`) jest identyczny w obu trybach.

---

## 9. Favicon & Logo

### Favicon
- Format: SVG
- Kształt: zaokrąglony kwadrat (`rx="6"`)
- Tło: `#111111` (Ink)
- Tekst: "MJ" w `#E8E4DD` (Chalk), Arial Bold, 14px
- Nie używaj Signal Red w favicon — zachowaj neutralność.

### Logotyp tekstowy
- Font: **Space Grotesk Bold**
- Format: `MJ.OLDAK` (z kropką)
- Kolor: Chalk na ciemnym tle / Ink na jasnym tle
- Tracking: tight
- Nie używaj serif ani mono do logotypu.

---

## 10. Do's & Don'ts

### DO
- Używaj dużych zaokrągleń (2rem+) na kartach i przyciskach
- Tekst mono (Space Mono) na opisy techniczne
- Serif italic (DM Serif Display) na duże hasła
- Noise overlay na całej stronie
- Signal Red tylko na interaktywne elementy
- Subtelne glow effects zamiast twardych cieni na ciemnym tle

### DON'T
- Nie używaj czystego białego (#FFFFFF) — zawsze Chalk (#E8E4DD) lub Warm Stone (#F5F3EE)
- Nie używaj czystego czarnego (#000000) — zawsze Ink (#111111)
- Nie stosuj Signal Red na dużych powierzchniach (tła sekcji, karty)
- Nie mieszaj fontów w jednym elemencie (np. serif + mono w tym samym zdaniu)
- Nie używaj ostrych rogów (rounded-none) na widocznych elementach UI
- Nie animuj layout properties (width, height, margin) — tylko transform i opacity

---

## Tailwind Config Reference

```js
// tailwind.config.js
colors: {
  background: '#F5F3EE',  // Warm Stone
  primary: '#E8E4DD',     // Chalk
  accent: '#E63B2E',      // Signal Red
  dark: '#111111',        // Ink
},
fontFamily: {
  sans: ['"Space Grotesk"', 'sans-serif'],
  serif: ['"DM Serif Display"', 'serif'],
  mono: ['"Space Mono"', 'monospace'],
},
borderRadius: {
  '2rem': '2rem',
  '3rem': '3rem',
  '4rem': '4rem',
}
```

---

*Dokument wygenerowany na podstawie strony mj-oldak.com — luty 2026*
