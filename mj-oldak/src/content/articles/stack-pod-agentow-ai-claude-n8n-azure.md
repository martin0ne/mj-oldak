---
title: "Stack pod agentów AI: Claude, n8n, Azure Document Intelligence"
excerpt: "Konkretne narzędzia którymi buduję agentów AI dla polskich firm. Dlaczego ten stack, jakie są alternatywy i ile to kosztuje miesięcznie."
publishedAt: 2026-04-08
author: "Marcin Ołdak"
category: "demo"
tags: ["n8n-claude", "tutorial", "automatyzacja", "demo"]
cover: "/articles/covers/stack-pod-agentow-ai-claude-n8n-azure.jpg"
coverAlt: "Cover artykułu: Stack pod agentów AI — Claude, n8n, Azure"
readingTime: 10
featured: false
draft: false
metaTitle: "Stack technologiczny do budowy agentów AI w 2026"
metaDescription: "Claude API, n8n, Azure Document Intelligence — konkretne narzędzia do produkcyjnych agentów AI. Koszty, alternatywy, kiedy co wybierać."
keywords: ["claude api", "n8n workflow", "azure document intelligence", "stack ai 2026", "build ai agents"]
---

Kiedy zaczynałem budować agentów AI rok temu, każdy tutorial polecał inny stack. LangChain. AutoGPT. CrewAI. Llama. OpenAI Functions.

Po 12 miesiącach produkcyjnych wdrożeń u realnych klientów wiem już, co działa. W tym artykule rozkładam mój aktualny stack — z uzasadnieniem, kosztami, alternatywami i kiedy warto coś podmienić.

## Stack w skrócie

```
┌─────────────────────────────────────────────┐
│              FRONTEND / TRIGGER             │
│  FastAPI + Tailwind  ·  cron  ·  webhooks   │
└─────────────────────┬───────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│              ORKIESTRACJA                   │
│              n8n self-hosted                │
└─────────────────────┬───────────────────────┘
                      ↓
┌──────────────┬──────────────┬──────────────┐
│     LLM      │     OCR      │   STORAGE    │
│   Claude     │    Azure     │   SQLite /   │
│   Sonnet     │  Document    │   Postgres   │
│   4.5/Opus   │ Intelligence │              │
└──────────────┴──────────────┴──────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│              INTEGRACJE                     │
│ Comarch Optima · wFirma · Gmail · IMAP API  │
└─────────────────────────────────────────────┘
```

Teraz przejdziemy przez każdy element.

## LLM: dlaczego Claude (a nie GPT)

Po wszystkich produkcyjnych wdrożeniach **Claude Sonnet 4.5** jest moim domyślnym wyborem dla 90% przypadków. Dlaczego:

### 1. Lepsze instruction following

Claude Sonnet rzadziej "halucynuje akcje". Jeśli proszę go o wybór jednej z 3 kategorii — wybiera dokładnie jedną z trzech. GPT-4o czasem dorzuca czwartą "OTHER" mimo że nie ma jej w prompcie.

### 2. Lepsze rozumienie polskiego

Konkretnie dla biur rachunkowych: Claude rozumie pojęcia jak "VAT-7K kwartalny", "JPK_VAT", "PIT-36L" i nie myli ich z innymi. GPT-4o i Gemini częściej generalizują.

### 3. Tańszy przy długim kontekście

200 000 tokenów kontekstu w Claude Sonnet 4.5 = $3/M input, $15/M output (kwiecień 2026). To 2-3x taniej niż GPT-4 Turbo przy podobnej jakości dla zadań typu agent.

### 4. Niezawodność API

W ostatnich 6 miesiącach Claude API miał ~99.5% uptime mierzony przez moje monitoringi. OpenAI miał 3 większe outage'y (z których 1 trwał 4 godziny). To wpływa bezpośrednio na SLA wobec klienta.

### Kiedy NIE Claude

- **Multimodalność z video/audio** → GPT-4o (Claude jeszcze słabszy)
- **Embedding** → OpenAI text-embedding-3 (Claude nie ma natywnych embeddingów)
- **Self-hosted (compliance)** → Llama 3.1 70B na własnej infrastrukturze

## Orkiestracja: n8n vs Make vs custom

Agent to nie pojedynczy LLM call. To workflow: pobierz dane → wywołaj LLM → zwaliduj wynik → wywołaj API → zapisz → powiadom.

Trzy opcje:

### Opcja A: n8n (mój wybór)

**Plusy:**
- Self-hosted (compliance + brak vendor lock-in)
- 400+ gotowych integracji (Gmail, Slack, Comarch, PostgreSQL...)
- Wizualny edytor (klient może sam zmienić proste rzeczy)
- Kod custom w nodes (Function nodes z JS)
- Darmowy do self-hostingu

**Minusy:**
- Trzeba sami hostować (mały dodatkowy koszt: ~25 zł/miesiąc na Hetzner)
- Krzywa uczenia ~3-5 dni

### Opcja B: Make (dawniej Integromat)

**Plusy:**
- Zero hostingu
- Bardzo polerowany UX

**Minusy:**
- Płatne od pierwszego workflow (~70 zł/miesiąc baseline)
- Vendor lock-in (trudno migrować do innej platformy)
- Brak self-hostingu = problem dla compliance niektórych klientów (RODO)

### Opcja C: Custom kod (FastAPI + Celery)

**Plusy:**
- Maksymalna kontrola
- Wszystko w Pythonie/TS

**Minusy:**
- 5-10x dłuższe wdrożenie
- Więcej maintenance (każda zmiana = deploy)
- Gorsze obserwowalne (logi, retry, monitoring trzeba budować od zera)

**Werdykt:** n8n self-hosted, chyba że klient ma istniejący stack DevOps i preferuje custom.

## OCR: Azure Document Intelligence

Do faktur i dokumentów księgowych testowałem (i odrzuciłem):

- **Tesseract** — open-source, ale jakość fatalna na polskich dokumentach. Pas.
- **Google Document AI** — dobre, ale drogie ($1.50/100 stron) i compliance trudniejsze (data residency).
- **AWS Textract** — przyzwoite, ale słabe na polskich faktura (gorsze rozumienie struktury).
- **Mindee** — dedykowane do faktur, świetna jakość, ale $99/miesiąc minimum + 0.10€/page.

**Azure Document Intelligence** wygrało z 4 powodów:

1. **Polskie znaki natywnie** (ć, ż, ą — bez problemu)
2. **Pre-built model "Invoice"** wyciąga 30+ pól bez trenowania
3. **$1.50 / 1000 stron** (~5 zł / miesiąc dla biura z 1000 faktur)
4. **EU data residency** (Azure West Europe = compliance OK dla MŚP w PL)

Jakość na polskich fakturach: ~95% extracted fields correct without manual review. Dla biur rachunkowych to game-changer.

## Storage: SQLite czy Postgres

Dla większości moich projektów: **SQLite** wystarcza.

Brzmi kontrowersyjnie? Nie powinno. Modern SQLite (z WAL mode) obsługuje 100k+ writes dziennie. Większość biur rachunkowych ma 100-1000 transakcji dziennie. Komfortowo.

**Wybieram Postgres gdy:**
- Multi-tenant (kilku klientów na tej samej instancji)
- Wymagany backup w czasie rzeczywistym
- Skala 10k+ users
- Klient już ma Postgres infrastructure

**Inaczej SQLite.** Backup = kopia pliku. Migracja = `cp database.db backup.db`. Hosting = dowolny serwer z dyskiem. Maintenance = zero.

## Frontend: FastAPI + Tailwind (a nie React)

Moje produkty (MJ.OLDAK INVOICE, EMAIL, DEADLINE, REPORTS) używają FastAPI + Jinja2 + Tailwind CDN — bez Reacta.

Powody:

1. **Stack jednolity** — backend i UI w tym samym Pythonie
2. **Zero build step** — `python main.py` i już
3. **SEO** — server-side rendered HTML
4. **Mniej zależności** — łatwiej audytować i utrzymać przez 5 lat

React/Vue mają sens gdy interfejs jest aplikacją (real-time dashboardy, drag&drop, complex state). Dla CRUD typu "lista faktur, formularz upload, detail page" — FastAPI + Jinja jest szybsze do napisania i tańsze w utrzymaniu.

## Koszty stack'u — realistyczny budżet

Dla biura rachunkowego z 10 klientami i ~1000 faktur/miesiąc + obsługą maili:

| Pozycja | Koszt miesięczny |
|---------|------------------|
| Claude API (Sonnet, ~80k requestów) | 150-250 zł |
| Azure Document Intelligence (1k faktur) | 5-8 zł |
| n8n self-hosted (Hetzner CX21) | 25 zł |
| Postmark (transactional emails, 10k/mies) | 50 zł |
| Domena + SSL (Cloudflare) | 0 zł |
| Backup (Backblaze B2, 100GB) | 5 zł |
| **Razem** | **~235-340 zł** |

Plus jednorazowe koszty wdrożenia (mój czas, 2-4 tygodnie): 8 000 — 18 000 zł zależnie od pakietu.

## Czego nie używam (i dlaczego)

### LangChain / LangGraph

**Powód:** za dużo abstrakcji nad prostą rzeczą. Pisanie agenta to często **30 linii Pythona** robiących `client.messages.create()`. LangChain dodaje 5 warstw, które trzeba debugować przy każdym błędzie. Plus częste breaking changes w API.

**Wyjątek:** RAG nad dużą bazą dokumentów (>1000) — wtedy LangChain ma sensowne moduły do retrieval.

### CrewAI / AutoGen / AgentScope

**Powód:** "multi-agent collaboration" brzmi cool, ale w 95% biznesowych przypadków wystarcza pojedynczy LLM call z dobrym promptem + 1-2 tool calls. Multi-agent dodaje koszt (każda iteracja = kolejny LLM call) i nieprzewidywalność.

**Wyjątek:** zadania kreatywne (research, pisanie długich raportów) gdzie różne perspektywy faktycznie pomagają.

### Vector DB (Pinecone, Weaviate, Qdrant)

**Powód:** dla biur rachunkowych nie ma znaczącej bazy "wiedzy" do RAG. Klienci, faktury, deadliny to dane strukturalne — SQL załatwia sprawę.

**Wyjątek:** klient ma archiwum dokumentów (umowy, regulaminy) i agent musi z nich cytować — wtedy pgvector w Postgres wystarcza, nie trzeba osobnej bazy.

## Następne kroki

Jeśli chcesz zobaczyć ten stack w akcji:

- **Demo na żywo** — pokazuję jak agent przetwarza Twoją prawdziwą fakturę w Azure DI + Claude Sonnet w czasie rzeczywistym. 30 minut, bezpłatnie. [Napisz na contact@mjoldak.com](/#kontakt).
- **Tutoriale** — w przygotowaniu seria pod hood (architektura agenta od zera, n8n setup od podstaw, integracja z Comarch Optima). [Zapisz się na newsletter](#newsletter), żeby nie przegapić.

> Najlepszy stack to ten, który przetrwa zmianę requirements za 6 miesięcy bez przepisywania od zera. n8n + Claude + SQLite spełnia ten test od roku.

[Czytaj dalej: Czym jest agent AI? Praktyczne wyjaśnienie](/artykuly/czym-jest-agent-ai-praktyczne-wyjasnienie/)
