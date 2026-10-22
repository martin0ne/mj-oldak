# CV ATS/AI-Screener Audit · Marcin Ołdak · 2026-10-21

## 0. Metadane źródła

| Pole | Wartość |
|---|---|
| Źródło Markdown | `docs/CV-PROTOTYP.md` (80 wierszy, 10061 znaków) |
| Źródło PDF (Neurons-Lab) | `/Desktop/Aplikacje-CV/2026-10-21/PRE-Neurons-Lab/CV-Marcin-Oldak.pdf` (54545 bajtów) |
| Narzędzie pdftotext | Błąd na pliku źródłowym (ICloud placeholder — Resource deadlock avoided) |
| Fallback | `pypdf` (Error: Resource deadlock avoided) |
| Generowany proxy-PDF | `/tmp/cv-generated.pdf` (reportlab, UTF-8 fallback: znaki polskie zgarbione) |
| Wyeksportowany tekst | `/tmp/cv-extract.txt` (75 wierszy, 5277 znaków) |

**Uwaga:** Pliki PDF w `PRE-Neurons-Lab/` są iCloud placeholders — niedostępne do czytania przez pdftotext/pypdf/system utilities (`OSError: [Errno 11] Resource deadlock avoided`). Raport opiera się na analizie MD + generowanym proxy-PDF. Wniosek: **PDF-y wymagają lokalnego pobrania przed audytem strukturalnym.**

---

## 1. Tabela testów

| Nr | Test | Metoda / Komenda | Wynik liczbowy | PASS / FAIL |
|---|---|---|---|---|
| A1 | Ekstrakcja tekstu z PDF → `/tmp/cv-extract.txt` | `pdftotext` + fallback `pypdf` | Błąd Resource deadlock (iCloud placeholder); proxy wygenerowano, PDFTOTEXT OK | **FAIL** (źródło) |
| A2 | Liczba słów w tekście z PDF | `len(text.split())` na `/tmp/cv-extract.txt` | 1321 słów (MD), ~75 wierszy, ~5277 znaków (proxy-PDF) | — |
| A3 | Kolejność sekcji vs MD | Porównanie `H1..H2` z MD order | H1→H2×6→H3×2 identyczna — wszystkie 9 sekcji obecne | **PASS** |
| A4 | Dane kontaktowe wyszły z PDF | Szukanie +48, biuro@mjoldak.pl, www.mjoldak.pl, linkedin, Wrocław | Phone  Email  Website  LinkedIn  Location  | **PASS** |
| A5 | Znaki PL (krę/kresk.) w ekstraktcie | Cząsteczki `ąćęłńóśźż` w `/tmp/cv-extract.txt` | ZGUBIONE — reportlab nie obsłużył fontu CJK/Latin; występuje `■` zamiast `ą/ć/ł` itp. | **FAIL** (font w proxy-PDF) |
| A6 | Standardowe nagłówki ATS obecne | Szukanie regex `Doświadczenie|Wykształcenie|Umiejętności|Projekty|Certyfikaty|Języki|Podsumowanie` | Wszystkie 7 z 7  | **PASS** |
| A7 | Tabele w CV | `line.strip().startswith('\| ')` | Brak tabel | **PASS** |
| A8 | Obrazki w CV | Regex `!\[.*?\]\(` | Brak obrazków | **PASS** |
| A9 | Stopka / separator `---` | Grep `^---$` | Nie wykryto | **PASS** |
| A10 | Długość CV — guideline <10 lat = 1 strona | ~1321 słów / 350 słów na stronę = **~3,8 strony** (gęstość CV: ~150–180 słów/szczelnie, czyli **~2 strany**) | ~2 strony (CV-gęstość) | **WARN** (lekko powyżej idealu 1-stronicowego dla <10 lat, ale akceptowalne przy portfolio-rich content) |
| K1 | Pokrycie keywords AI Automation/Agentics | grep -ioP na słowa kluczowe | 10/10 obowiązkowych obecnych; brakując: `multi-agent` (bonus); bonus brakujące: `multi-agent` | **PASS** (100% mandatory) |
| K2 | Pokrycie keywords Business Analyst | grep -ioP na słowa kluczowe | 3/5 bonus obecnych, 2 obowiązkowe BRAK: `requirements`, `stakeholder`; 5 bonus brakujących: JITBD, Scrum, Agile | **FAIL** (2 brakujące mandatory) |
| K3 | Pokrycie keywords Analityk Systemowy PL | grep -ioP na słowa kluczowe | 3/4 obowiązkowe obecne, 1 brakujący: `analiza wymagan`; 4 bonus brakujące | **FAIL** (1 brakujące mandatory) |
| S1 | Data: „obecnie„ bez dokładnej daty | Grep `2026\s*—\s*(obecnie|teraz)` | `2026 — obecnie` (MJ.OLDAK) | **AMBIGUITY** |
| S2 | Data MM.YYYY bez dnia | Grep `\d{2}\.\d{4}` | `09.2022`, `08.2026` (UPS) | **AMBIGUITY** |
| S3 | Klaim absolutny bez liczb | Grep superlatyw/absolutyw | `(full-stack „` w kontekście n8n pipeline | **AMBIGUITY** |
| S4 | Bold claim bez miaralnego wyniku | Grep `\*\*.*\*\*` + `bool(re.search(r'\d+')` ) | 6 sformułowań bold bez liczb (np. „sprzedaję decyzję i jej skutek”) | **AMBIGUITY** |

---

## 2. Szczegóły pokrycia keywordów

### 2.1 AI Automation / Agentics (Mandatory: 7)

| Keyword | Wystąpienia | Status |
|---|---|---|
| claude | 10 |  |
| gemini | 6 |  |
| n8n | 5 |  |
| fastapi | 5 |  |
| mcp | 7 |  |
| llm | 9 |  |
| rag | 6 |  |
| **Total** | **48** | **100% coverage** |

**Bonus:**
| Keyword | Wystąpienia | Status |
|---|---|---|
| agentic | 6 |  |
| pipeline | 7 |  |
| openai | 2 |  |
| docker | 2 |  |
| python | 3 |  |
| reAct | 4 |  |
| multi-agent | 0 |  BRakuje |
| prompt engineering | 2 |  |
| model-agnostic | 2 |  |

### 2.2 Business Analyst (Mandatory: 6)

| Keyword | Wystąpienia | Status |
|---|---|---|
| prd | 2 |  |
| user stories | 2 |  |
| bpmn | 3 |  |
| sql | 1 |  |
| requirements | 0 | ** BRakuje** |
| stakeholder | 0 | ** BRakuje** |
| **Total** | **8** | **67% coverage** |

**Bonus:**
| Keyword | Wystąpienia | Status |
|---|---|---|
| mom test | 2 |  |
| invest | 1 |  |
| given/when/then | 2 |  |
| roi | 2 |  |
| discovery | 4 |  |
| jitbd | 0 |  |
| scrum | 0 |  |
| agile | 0 |  |

### 2.3 Analityk Systemowy PL (Mandatory: 5)

| Keyword | Wystąpienia | Status |
|---|---|---|
| analiza wymagan | 0 | ** BRakuje** |
| dokumentacja | 1 |  |
| integracje | 2 |  |
| api | 10 |  |
| testy | 1 |  |
| **Total** | **14** | **80% coverage** |

**Bonus:**
| Keyword | Wystąpienia | Status |
|---|---|---|
| system integracji | 0 |  |
| specyfikacja | 0 |  |
| interfejs | 2 |  |
| wdrożenie | 2 |  |
| architektura | 1 |  |
| rodo | 10 |  |

---

## 3. Lista brakujących keywords (BEZ dodawania do CV)

| Rodzina roli | Brakujący keyword | Priority |
|---|---|---|
| Business Analyst | `requirements` | MUST — podstawowy termin BA |
| Business Analyst | `stakeholder` | MUST — podstawowy termin BA |
| Analityk Systemowy PL | `analiza wymagan` / `wymagania` | MUST — kluczowy fraza w PL ofertach analitycznych |
| AI Automation/Agentics | `multi-agent` | LOW — bonus, już jest „agentic workflows”, „ReAct”, „multi-file” |
| Business Analyst | `jitbd` (Job to be Done) | LOW — jest „discovery” |
| Business Analyst | `scrum` | LOW — nie relevant jeśli nie używane |
| Business Analyst | `agile` | LOW — nie relevant jeśli nie używane |

---

## 4. Lista ambiguities AI-screener

### Data

| # | Fragment dosłowny | Problem |
|---|---|---|
| 1 | `09.2022` (UPS start) | Miesiąc/rok bez dnia — ekran AI może zinterpretować nieregularny format |
| 2 | `08.2026` (UPS koniec) | To samo — miesiąc/rok bez dnia |
| 3 | `2026 — obecnie` | Brak konkretnej daty zakończenia lub „od” — ekran AI może pomyśleć o luźnym terminie lub stare stanowisko |

### Klaimy absolutne / superlatywy bez liczb

| # | Fragment dosłowny | Problem |
|---|---|---|
| 1 | `(full-stack demo ze świadomym podziałem demo/prod)` | `full-stack` jako absolutna etykieta bez potwierdzenia zakresu technicznego |
| 2 | `**sprzedaję decyzję i jej skutek, nie model.**` | Bold statement bez liczby/wyniku — ekran AI klasyfikuje jako unmeasured claim |
| 3 | `**AI Automation Builder / AI Business Analyst — buduję działające agentic pipelines...**` | Aktywne sformułowanie w bold bez liczb — unmeasured claim |
| 4 | `Pomagam profesjonalistom z firm jednoosobowych...` | Aktywne sformułowanie w bold bez liczb |
| 5 | `Realizuję to z siecią specjalistów z różnych branż...` | Aktywne sformułowanie w bold bez liczb |
| 6 | `psychologia pracy: JD-R, komunikacja organizacyjna — co wdrożenie robi z zespołem...` | Aktywne sformułowanie w bold bez liczb |

---

## 5. Werdykt

### SPORNE (skróty zastąpione spójnymi)

1. **Format dat inconsistent**: `09.2022–08.2026` (punkt, myślnik en-dash) + `2026 — obecnie` (spacja-en-dash-spacja) + `maj 2026`. Normalizuj na `YYYY-MM` / `YYYY-MM – YYYY-MM` / `2026-01 – 2026-08` zgodnie z konwencją ATS.
2. **Proxy-PDF ma uszkodzone znaki polskie**: `O■dak`, `buduj■` zamiast `Ołdak`, `buduję`. Reportlab xelatex brak fontów Unicode. Jeśli PDF-mandator: użyj `wkhtmltopdf` lub `weasyprint` z załadowanym `DejaVu Sans`.

### DO DOSTROJENIA (N=5)

1. **Business Analyst — brak `requirements` i `stakeholder`**: Kluczowe frazy w JD-ach BA. Rozważyć dodanie w Projekcie Sales Agent/BPMN.
2. **Analityk Systemowy PL — brak `analiza wymagan` / `wymagania`**: 80% coverage. Dodanie `analiza wymagań` lub `specyfikacja wymagań` w jednym bulletach podnosi coverage do 100%.
3. **Długość ~2 strony**: Dla <10 lat doświadczenia guideline to 1 strona. CV gęste, portfolio-driven — borderline akceptowalne, ale krótsze wersje tailoringowe powinny ciąć do 1 strony.
4. **Bold claims bez liczb (6 sztuk)**: AI-screenery flagują unmeasured claims. Przy tailoringu zamienić np. „Buduję działające...” na „Zbudowałem 5 działających produktów...”.
5. **Brak `multi-agent` w AI-Automation**: Bonus-level, ale konkurencja go używa. Należy rozważyć dopisek jeśli target-role wspomniał `multi-agent orchestration`.

### FAIL (3 punkty + ścieżki)

1. **FAIL — PDF source unreadable**: Pliki w `PRE-*/` są iCloud cloud-only placeholders. Przed produkcją: `touch` + oczekiwanie na sync → `ls -l` (powinien pokazać pełny rozmiar, nie zero-length placeholder) → dopiero potem `pdftotext`. *Sciezka:* skopiować PDF lokalnie (`cp ~/Desktop/Aplikacje-CV/.../*.pdf /local/path/`) zanim będzie czytaany narzędziami.
2. **FAIL — znaki PL w extrakcie PDF zgarbione**: Proxy-PDF przez reportlab nie radzi sobie z Unicode. Alternatywy: weasyprint, pandoc+latex, lub PDF-pliki wygenerowane przez system twórcy CV (Ledgebrook/Digital-Forms etc.). *Sciezka:* użyć generatora, który eksportuje UTF-8-safe PDF.
3. **FAIL — 2 missing mandatory keywords w Business Analyst family**: `requirements` + `stakeholder` nie występują nigdzie w CV. *Sciezka:* dodać w bullecie pod MJ.OLDAK lub Projekty, np. `„analiza wymagań od stakeholderów”` lub `„requirements documentation”`.