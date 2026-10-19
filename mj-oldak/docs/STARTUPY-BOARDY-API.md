# Publiczne URL-e API — Job Board AI Startups (Ashby / Teamtailor)

**Data generowania:** 19.10.2026  
**Cel:** Agregacja ofert pracy z publicznych API job-boardów startupów AI do `job-fit-scorer` (`fetch-oferty.py`)  
**Kryterium wyboru:** Produkt AI-native, <~1000 os., Europa/Wwa/remote-friendly, Ashby lub Teamtailor  
**Pominięte:** Greenhouse/Lever (już w agregatorze); JustJoin IT / NoFluffJobs (ToS §11.3); LinkedIn (walled garden); Cloudflare-blokowane serwisy  

---

## Tabela endpoints

| # | Firma | Typ API | URL endpointu | Dowód HTTP + liczba pozycji | Role AI (przykłady z listingu) |
|---|-------|---------|---------------|-----------------------------|-------------------------------|
| 1 | ElevenLabs | Ashby | `https://api.ashbyhq.com/posting-api/job-board/elevenlabs` | HTTP 200 · 155 pozycji | Forward Deployed Engineer; Research Engineer; Research Engineer - Inference; Enterprise Solutions Engineer |
| 2 | Synthesia | Ashby | `https://api.ashbyhq.com/posting-api/job-board/synthesia` | HTTP 200 · 47 pozycji | Staff Research Engineer - Interactive Avatars; Principal ML Platform Engineer; Principal Applied Research Engineer |
| 3 | fonio.ai | Ashby | `https://api.ashbyhq.com/posting-api/job-board/fonio` | HTTP 200 · 87 pozycji | Forward Deployed Engineer; GTM Engineer; Automation Engineer; Senior Fullstack Engineer |
| 4 | Lovable | Ashby | `https://api.ashbyhq.com/posting-api/job-board/lovable` | HTTP 200 · 81 pozycji | Data Platform/Infrastructure Engineer; Research Engineering Lead; Data Scientist; Software Engineer, Platform |
| 5 | Omnea | Ashby | `https://api.ashbyhq.com/posting-api/job-board/omnea` | HTTP 200 · 60 pozycji | Senior Product Manager; Engineering Manager; Software Engineer, Engineering Acceleration; Technical Solutions Engineer |
| 6 | Suno | Ashby | `https://api.ashbyhq.com/posting-api/job-board/suno` | HTTP 200 · 69 pozycji | Staff/Senior Software Engineer, Product Teams; Staff/Senior Software Engineer, Platform Teams; iOS Engineer |
| 7 | Abridge | Ashby | `https://api.ashbyhq.com/posting-api/job-board/abridge` | HTTP 200 · 43 pozycji | Member of Technical Staff, Machine Learning; Data Science Staff; Research Science; AI/ML (Evals) |
| 8 | Camunda | Ashby | `https://api.ashbyhq.com/posting-api/job-board/camunda` | HTTP 200 · 40 pozycji | Senior Product Manager - Distributed Agentic Platform; Engineering Manager - Infrastructure; Senior Data Engineer |
| 9 | Prior Labs | Ashby | `https://api.ashbyhq.com/posting-api/job-board/prior-labs` | HTTP 200 · 23 pozycji | Research Scientist, Foundation Model; ML Engineer, Backend; Applied Scientist, Data Science; ML Engineer, Forward Deployed |
| 10 | OpenArt | Ashby | `https://api.ashbyhq.com/posting-api/job-board/openart` | HTTP 200 · 27 pozycji | Growth Data Engineer; Marketing Data Scientist; Software Engineer, Enterprise AI Platform; Agent Engineer |
| 11 | Reedsy | Ashby | `https://api.ashbyhq.com/posting-api/job-board/reedsy` | HTTP 200 · 17 pozycji | AI Engineer - Remote Europe; Quality Assurance Engineer; Senior Frontend Engineer - Remote Europe |
| 12 | Basis Research Institute | Ashby | `https://api.ashbyhq.com/posting-api/job-board/basis-research` | HTTP 200 · 13 pozycji | Research Scientist, Machine Learning/AI; Software Engineer, LLM & Automation; Research Engineer, Machine Learning |
| 13 | Preql AI | Ashby | `https://api.ashbyhq.com/posting-api/job-board/preql` | HTTP 200 · 4 pozycje | Forward Deployed Engineer, Infrastructure; Senior Software Engineer; Forward Deployed Engineer, Finance Solutions |
| 14 | Weaviate | Ashby | `https://api.ashbyhq.com/posting-api/job-board/weaviate` | HTTP 200 · 3 pozycje | Director of Product (CET/GMT timezones); Enterprise Account Executive |
| 15 | Qevlar AI | Teamtailor | `https://qevlar-1721317262.teamtailor.com/jobs.rss` | HTTP 200 · 18 itemów RSS | (RSS feed — pełny XML dostępny pod adresem endpointu) |

---

## Szczegóły po firmie

### 1. ElevenLabs
- **Opis:** AI voice platform — najpopularniejszy syntezator mowy w Europie
- **Baza:** Londyn, UK (biura w Niemczech; zatrudnianie globalne)
- **Ashby slug:** `elevenlabs`
- **Web:** https://jobs.ashbyhq.com/elevenlabs
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/elevenlabs?includeCompensation=true`
- **Pozycje:** 155 → JSON `jobs[]` z polem `title`, `location`, `compensation`

### 2. Synthesia
- **Opis:** AI video platform — generowanie wideo z awatarami AI (Fintech Fortune 100)
- **Baza:** Londyn, UK
- **Ashby slug:** `synthesia`
- **Web:** https://jobs.ashbyhq.com/synthesia
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/synthesia?includeCompensation=true`
- **Pozycje:** 47

### 3. fonio.ai
- **Opis:** AI call assistant dla SMB — interakcja głosowa z klientami
- **Baza:** Wiedeń, Austria (biura w Madrycie, Londynie, Berlinie, Barcelonie)
- **Ashby slug:** `fonio`
- **Web:** https://jobs.ashbyhq.com/fonio
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/fonio?includeCompensation=true`
- **Pozycje:** 87
- **EU relevance:** wysoka — biura AT/PL/DE/ES/UK

### 4. Lovable
- **Opis:** AI-powered coding platform — generowanie aplikacji z promptów
- **Baza:** San Francisco, ale hires remote globally
- **Ashby slug:** `lovable`
- **Web:** https://jobs.ashbyhq.com/lovable
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/lovable?includeCompensation=true`
- **Pozycje:** 81

### 5. Omnea
- **Opis:** Applied AI consulting — wdrażanie rozwiązań AI w enterprise
- **Baza:** Londyn, UK (4 najszybciej rosnący startup w Europie wg Sifted)
- **Ashby slug:** `omnea`
- **Web:** https://jobs.ashbyhq.com/omnea
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/omnea?includeCompensation=true`
- **Pozycje:** 60
- **EU relevance:** wysoka — główna siedziba w Londynie

### 6. Suno
- **Opis:** AI music generation — tworzenie muzyki i piosenek z tekstu
- **Baza:** Global, remote-first
- **Ashby slug:** `suno`
- **Web:** https://jobs.ashbyhq.com/suno
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/suno?includeCompensation=true`
- **Pozycje:** 69

### 7. Abridge
- **Opis:** AI medical transcription — automatyzacja dokumentacji medycznej
- **Baza:** USA, ale zatrudnia globalnie (zdjęcia: "AI/ML", "Forward Deployed")
- **Ashby slug:** `abridge`
- **Web:** https://jobs.ashbyhq.com/abridge
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/abridge?includeCompensation=true`
- **Pozycje:** 43

### 8. Camunda
- **Opis:** Process orchestration platform + AI agents (Workflow Engine)
- **Baza:** Berlin, DE (duży startup, ~200+ os.)
- **Ashby slug:** `camunda`
- **Web:** https://jobs.ashbyhq.com/camunda
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/camunda?includeCompensation=true`
- **Pozycje:** 40
- **EU relevance:** wysoka — Berlin + role „Remote"

### 9. Prior Labs
- **Opis:** AI drug discovery — foundation models for biomedical research
- **Baza:** Berlin, DE (eksperymenty ETH/Zurich origins)
- **Ashby slug:** `prior-labs`
- **Web:** https://jobs.ashbyhq.com/prior-labs
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/prior-labs?includeCompensation=true`
- **Pozycje:** 23
- **EU relevance:** wysoka — Berlin + Research Scientists

### 10. OpenArt
- **Opis:** AI image generation platform — generowanie obrazów AI dla twórców
- **Baza:** Remote / Global
- **Ashby slug:** `openart`
- **Web:** https://jobs.ashbyhq.com/openart
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/openart?includeCompensation=true`
- **Pozycje:** 27

### 11. Reedsy
- **Opis:** Publishing AI tools — narzędzia AI dla autorów i wydawców
- **Baza:** Remote Europe-based
- **Ashby slug:** `reedsy`
- **Web:** https://jobs.ashbyhq.com/reedsy
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/reedsy?includeCompensation=true`
- **Pozycje:** 17

### 12. Basis Research Institute
- **Opis:** Fundamental AI/ML research institute
- **Baza:** EU/UK hiring
- **Ashby slug:** `basis-research`
- **Web:** https://jobs.ashbyhq.com/basis-research
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/basis-research?includeCompensation=true`
- **Pozycje:** 13

### 13. Preql AI
- **Opis:** AI data transformation — przekształcanie danych za pomocą AI
- **Baza:** Remote/global
- **Ashby slug:** `preql`
- **Web:** https://jobs.ashbyhq.com/preql
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/preql?includeCompensation=true`
- **Pozycje:** 4 (niski licznik)

### 14. Weaviate
- **Opis:** Open-source vector database — embedding search dla AI/LLM pipeline'ów
- **Baza:** Berlin, DE (role CET/GMT timezone)
- **Ashby slug:** `weaviate`
- **Web:** https://jobs.ashbyhq.com/weaviate
- **API:** `curl https://api.ashbyhq.com/posting-api/job-board/weaviate?includeCompensation=true`
- **Pozycje:** 3 (niski licznik — tylko 3 aktywne oferty)

### 15. Qevlar AI
- **Opis:** AI Security Operations Center — B2B SaaS do automatyzacji SOC
- **Baza:** Paryż, FR
- **Teamtailor subdomain:** `qevlar-1721317262` (unikalny UUID)
- **Web:** https://qevlar-1721317262.teamtailor.com
- **API:** `curl https://qevlar-1721317262.teamtailor.com/jobs.rss` (format RSS/Atom)
- **Pozycje:** 18 itemów RSS `<item>`
- **Uwaga:** Teamtailor nie udostępnia publicznego JSON API — wyłącznie RSS feed. Format: standardowe RSS `<item><title>...</title><link>...</link><description>...</description></item>`

---

## Notatki techniczne

### Format odpowiedzi Ashby API
```json
{
  "apiVersion": "1",
  "jobs": [
    {
      "title": "...",
      "location": "...",
      "department": "...",
      "team": "...",
      "isListed": true,
      "isRemote": true,
      "employmentType": "FullTime",
      "publishedAt": "2024-XX-XXT...",
      "descriptionHtml": "<p>...</p>",
      "descriptionPlain": "...",
      "jobUrl": "https://jobs.ashbyhq.com/<company>/<slug>",
      "applyUrl": "https://jobs.ashbyhq.com/<company>/apply"
    }
  ],
  "compensation": { ... }
}
```

### Format odpowiedzi Teamtailor
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kariera — Nazwa Firmy</title>
    <item>
      <title>Tytuł oferty</title>
      <link>URL oferty</link>
      <description>Opis oferty</description>
    </item>
    <!-- ... więcej <item> -->
  </channel>
</rss>
```

### Uwagi dot. implementacji
- Ashby wymaga parametru `?includeCompensation=true` aby otrzymać dane o wynagrodzeniu
- All 14 Ashby endpoints zwracają `HTTP 200` bez klucza API — całkowicie publiczne
- Teamtailor: qevlar używa unikalnego subdomain z UUID; inne firmy mogą mieć prostsze domeny
- Do przeliczenia na format agregatora: Ashby → parsuj JSON `jobs[]`; Teamtailor → parsuj RSS `<item>`

---

## Zmiany w projekcie

Ten plik NIE edytuje kodu agregatora (`fetch-oferty.py`). Zawiera wyłącznie surowe URL-e i dowody curl. Do scalenia z agregatorem potrzebna będzie osobna PR, która:
1. Rozbuduje `fetch_oferty_ashby()` o nowe slugi (tablica `SLUGS`)
2. Doda funkcję `fetch_oferty_teamtailor_rss()` dla endpointów Teamtailor
3. Normalizuje pola RSS Teamtailor (`<title>`, `<link>`, `<description>`) do wspólnej struktury

---

*Raport wygenerowany przez subagent — sprawdzenie curl HTTP 200 + parsowanie JSON/RSS dla każdej pozycji.*
