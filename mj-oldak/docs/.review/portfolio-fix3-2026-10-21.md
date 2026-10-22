# Portfolio Fix v3 — Raport

**Data:** 2026-10-21  
**Podmiot:** `src/data/portfolio.js` (edytowany), budowa statyczna Astro  
**Git:** brak (commit = rodzic)  

## SPORNE → SPOJNE

| # | Co zmieniono | Dlaczego |
|---|-------------|----------|
| 1 | Art. 02 (OCR Invoice Reader): `url` z `https://github.com/martin0ne/mjo-ocr-invoice-reader` na `/demy/`, `source` z `GitHub ↗` na `Demo ↗` | Repo prywatne → 404; dowód żywy = /demy/ |
| 2 | Art. 03 (Email Classifier): `url` z `https://github.com/martin0ne/mjo-email-assistant` na `/demy/`, `source` z `GitHub ↗` na `Demo ↗` | Repo prywatne → 404; dowód żywy = /demy/ |
| 3 | Art. 04 (Reporting Agent): `url` z `https://github.com/martin0ne/mjo-reporting-agent` na `/demy/`, `source` z `GitHub ↗` na `Demo ↗` | Repo prywatne → 404; dowód żywy = /demy/ |
| 4 | Art. 06: tytuł z `6 Public Repos` na `9 Public Repos` | GitHub API 21.10 = 9 public non-fork repo |

## WERYFIKACJA (served localhost:8090)

| Test | Wynik | Oczekiwano |
|------|-------|------------|
| `grep -c 'mjo-' portfolio.html` | **w HTML struktury: 0** (resztka 2 to klucze localStorage `mjo-*` w inline JS, nie w kartach artefaktów) | 0 w kartach |
| `grep -c '6 Public' portfolio.html` | **0** ✓ | 0 |
| `grep -c '9 Public Repos' portfolio.html` | **1** ✓ | 1 |
| Każda z 3 kart 02/03/04 → `href="/demy/"` | **Wszystkie 3 OK** ✓ | `/demy/` |
| `curl localhost:8090/demy/` | **HTTP 200** ✓ | 200 |
| Claim↔Code tabela | **Naruszona? NIE** — untouched ✓ | PASS |
| Stopka | **Untouched** ✓ | PASS |
| Pozostałe linki (wszystkie 200) | **Untouched** ✓ | PASS |
| CJK/cyrillic/emoji w outputcie build | **0** (check przez Python regex) | 0 |

## DO DOSTROJENIA (N)

Brak. Wszystko zgodne ze specem.

## PLIKI ZMIENIONE

1. `src/data/portfolio.js` — edycja inline, patch tool, linter clean
2. `dist/` — wygenerowane przez `npm run build` (build successful, 2.60s, 45 pages)

## STATUS: SPORNE = SPOJNE ✅
