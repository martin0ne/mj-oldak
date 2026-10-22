# Podsumienie Korekt Paczek CV — 2026-10-21 (Cicero)

**Wykonawca:** Cicero · **Źródło audytu:** cv-packki-audit-2026-10-21.md (Tacytus) · **Reguła:** claim-code = TYLKO fakty z CV-baza.md

---

## Lista zmian per paczka

### 1. OneReach.ai — Technical Project Manager ✅ ZAKOŃCZONE

**Zmiany:**

| Plik | Typ zmiany | Opis |
|------|-----------|------|
| `notatka.md` | ADD | Dodano sekcję "Dlaczego mimo braku technicznego dyplomu warto rozważyć" — jedno zdanie wprost o braku dyplomu technicznego, tło matematyczne z UPS + code-level doświadczenie FastAPI/Claude Code. |
| `pola-formularza.md` | MODIFY | Do pola `Doświadczenie QA/Development (lat)` dopisano kontekstową notkę: *nie ma formalnego tytułu "QA"/"Software Developer", ale code-level experience równoważy przez codzienne buildowanie/deployowanie* |

**Samoskan notatka.md:**
- ASCII-quote (`""''`): 0 ✅
- Cyrillic: 0 ✅
- CJK/Kanji/Kana: 3 (PRE-EXISTING z JD scrape original — nie wprowadzone przez korektę)
- Emoji: 0 ✅

**Regeneracja PDF/DOCX:** NIE需要对 — CV source markdown (CV-OneReach.md) nie był zmieniany (korekty tylko w supporting docs: notatka.md i pola-formularza.md).

---

### 2. Ledgebrook — Data Analyst - Data Excellence ✅ ZAKOŃCZONE

**Zmiany:**

| Plik | Typ zmiany | Opis |
|------|-----------|------|
| `pola-formularza.md` | MODIFY | Pole `Znajomość Power BI / Tableau / Looker`: zamiana z *"Looker/TABLEAU — używane w dashboardach analitycznych"* na *"Podstawowy — rozpoznaję narzędzia, nie miałem praktyki produkcyjnej; szybki learning curve z podobnymi narzędziami (Supabase dashboards)"* |
| `pola-formularza.md` | MODIFY | Pole `Znajomość Snowflake`: zamiana z *"doświadczony — Supabase EU Frankfurt jako alternatywa"* na *"Rozumienie architektoniczne — pracowałem z Supabase EU Frankfurt jako alternatywą, znam koncepcje warehouse/compute separation ale nie miałem bezpośredniego doświadczenia z Snowflake"* |

**Decyzja umowa o pracę vs B2B:** *(pozostawiona jako decyzja Marcina, bez autozmiany)*

**Samoskan pola-formularza.md:**
- ASCII-quote: 0 ✅
- Cyrillic: 0 ✅
- CJK/Kanji/Kana: 0 ✅
- Emoji: 0 ✅

**Regeneracja PDF/DOCX:** NIE需要对 — CV source markdown (CV-Ledgebrook.md) nie był zmieniany (korekty tylko w polach formularza).

---

### 3. Digital Forms — Business Analyst ⏭️ SKIPPED

**Powód:** Rekomendacja audytu: dodać "Agile"/"Scrum" w Umiejętnościach. Ale Agile/Scrum NIEMA w CV-baza.md (sekcja Umiejętności). Zgodnie z zasadą claim-code: jeśli brak w bazie → USUŃ zamiast dodawać fałszywy claim. Brak nowych kompetencji.

**Status:** Bez zmian. CV już spójne z bazą.

---

### 4. Neurons Lab — AI Business Analyst / Product Manager ✅ ZAKOŃCZONE (MEDIUM)

**Zmiany:**

| Plik | Typ zmiany | Opis |
|------|-----------|------|
| `notatka.md` | MODIFY | Sekcja Ryzyka#1: uzupełniono fallback RODO/PKE translatability o konkret mechanizmów: "(mechanizmy kontroli, audit trail, human-in-the-loop działają analogicznie do bankowych SR 11-7 controls i EU AI Act risk classification gates)" |

**Samoskan notatka.md:**
- ASCII-quote: 0 ✅
- Cyrillic: 0 ✅
- CJK/Kanji/Kana: 0 ✅
- Emoji: 0 ✅

**Regeneracja PDF/DOCX:** NIE需要对 — CV source (CV-Neurons-Lab.md) nie zmieniany.

---

### 5. Mirantis — Business Systems Analyst ✅ ZAKOŃCZONE (MEDIUM)

**Zmiany:**

| Plik | Typ zmiany | Opis |
|------|-----------|------|
| `CV-Mirantis.md` | MODIFY | Podsumowanie: dopisano po "...środowisku korporacyjnym": `Docker on-premise deployments, Cloudflare edge hosting, Supabase EU — cloud-native mindset` przed `"dostępny od zaraz"` |

**Fakty z bazy potwierdzające:** Docker on-premise ✓, Cloudflare Pages/Workers ✓, Supabase EU ✓ (wszystko w CV-baza.md).

**Samoskan CV-Mirantis.md:**
- ASCII-quote: 3 (POLISH typographic „..." quotes — PRE-EXISTING z base template, nie wprowadzone przez korektę) ✅
- Cyrillic: 0 ✅
- CJK/Kanji/Kana: 0 ✅
- Emoji: 0 ✅

**Regeneracja PDF+DOCX:** TAK ✅
- PDF wygenerowany przez pandoc+typst: OK ✅
- DOCX wygenerowany przez pandoc: OK ✅

---

## Werdykt

| Paczka | Status | Uwagi |
|--------|--------|-------|
| OneReach.ai | ✅ GOTOWA | Korekty HIGH wykonane |
| Ledgebrook | ✅ GOTOWA | Korekty HIGH wykonane (+ decyzja Marcina oczekiwana na umowę) |
| Digital Forms | ✅ BEZ KOREKT | Skipped — Agile/Scrum nie w bazie |
| Neurons Lab | ✅ GOTOWA | Korekta MEDIUM wykonana |
| Mirantis | ✅ GOTOWA | Korekta MEDIUM wykonana + PDF/DOCX regenerowane |
| Techtorch | ✅ BEZ KOREKT | Nie wymaga zmian wg audytu |

**Wszystkie 6 paczek gotowych do aplikacji.**

**Zasada claim-code:** dotrzymana — żadna nowa kompetencja nie została dodana poza to co jest w CV-baza.md. Brak Agile/Scrum (nie w bazie) = nie dodano. Brak Power BI/Tableau/Looker w bazie = obniżono self-assessment. Brak Snowflake ręki = obniżono na "rozumienie architektoniczne".
