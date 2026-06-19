---
title: "LLM, RAG, prompt engineering — minimum techniczne dla decyzji biznesowej"
slug: "llm-rag-prompt-engineering-msp"
excerpt: "LLM (Claude, GPT, Gemini), RAG vs fine-tuning, koszty API 2026, lokalne open-source modele na Ollamie/OVH, 5 zasad prompt engineering dla polskich treści. Bez żargonu."
publishedAt: 2026-06-01
author: "Marcin Ołdak"
category: "edukacja"
tags: ["automatyzacja", "tutorial", "biuro-rachunkowe"]
cover: "/articles/covers/llm-rag-prompt-engineering-msp.jpg"
coverAlt: "LLM, RAG, prompt engineering — minimum techniczne dla MŚP"
readingTime: 9
featured: false
draft: true
metaTitle: "LLM, RAG, prompt engineering — minimum dla MŚP 2026"
metaDescription: "Co MŚP musi wiedzieć o AI w 2026: LLM (Claude, GPT, Gemini), RAG vs fine-tuning, lokalne modele open-source na Ollama/OVH, koszty API, 5 zasad promptu PL."
keywords: ["LLM", "RAG", "prompt engineering", "Claude API", "GPT API", "Ollama", "AI dla MŚP", "koszty API 2026"]
---

Słyszysz na konferencjach: LLM, RAG, fine-tuning, prompt engineering. Czujesz, że powinieneś rozumieć — ale konkretne wybory utykają. Ten artykuł to **minimum techniczne dla decydenta bez zaplecza IT**: właściciela biura rachunkowego, dyrektora operacyjnego, managera, który rozważa wdrożenie AI w polskim MŚP. 9 minut czytania.

## Trzy technologie, które musisz rozumieć

### Prompt engineering — fundament wszystkiego

Prompt engineering to **sztuka formułowania poleceń** do modelu LLM tak, by uzyskać oczekiwany wynik. Nie wymaga kodowania, infrastruktury ani dodatkowego kosztu — to umiejętność rozmowy z AI. Dobry prompt potrafi z przeciętnego Claude Sonnet zrobić **narzędzie klasy produkcyjnej** dla większości standardowych zadań biurowych.

**Kiedy wystarczy samo prompt engineering:**
- Pisanie maili, ofert, protokołów, podsumowań spotkań
- Klasyfikacja zgłoszeń, ekstrakcja danych z tekstu
- Pytania, na które model zna odpowiedź ze swoich danych treningowych
- Szybkie prototypowanie przed decyzją o większej inwestycji

### RAG (Retrieval-Augmented Generation) — gdy AI ma znać Twoje dane

RAG to architektura, w której model LLM jest **podłączony do bazy Twoich dokumentów** (ofert, regulaminów, procedur, historii klientów) i przeszukuje je przed odpowiedzią. Zamiast opierać się wyłącznie na wiedzy treningowej, model „czyta" odpowiedni fragment dokumentu i na tej podstawie generuje odpowiedź.

**Kluczowa zaleta:** wiedza jest **zawsze aktualna**, bo dokumenty można aktualizować bez zmiany modelu.

**Kiedy wdrożyć RAG:**
- Wewnętrzny asystent pracownika odpowiadający na pytania z bazy wiedzy firmy
- Chatbot obsługi klienta oparty na aktualnym cenniku i FAQ
- Analiza umów, regulaminów, dokumentacji technicznej
- Wszędzie tam, gdzie model musi wiedzieć to, czego nie ma w internecie

### Fine-tuning — specjalizacja, ale wysoki koszt

Fine-tuning polega na **doszkoleniu** istniejącego modelu na własnych danych. Wymaga zestawu par pytanie-odpowiedź (minimum kilkaset, lepiej kilka tysięcy), infrastruktury GPU i wiedzy inżynierskiej.

**Koszt realizacji projektu fine-tuningu w Polsce:** zazwyczaj kilkanaście-kilkadziesiąt tysięcy złotych plus czas specjalisty.

**Kiedy rozważyć fine-tuning (i nie wcześniej):**
- RAG + prompt engineering nie daje wymaganej dokładności
- Masz dobrze zdefiniowane, powtarzalne zadanie z tysiącami przykładów
- Skala użycia jest tak duża, że mniejszy, wyspecjalizowany model jest tańszy niż API

> **Złota zasada dla MŚP (2026):** Hierarchia decyzji to: **najpierw prompt engineering → potem RAG → fine-tuning tylko w ostateczności**. Większość firm wdrożeniowych, które przeskoczyły pierwsze dwa etapy, straciła czas i pieniądze na zbędne szkolenie modeli.

## Top 3 modele LLM w 2026 — jakość polskiego języka

Na podstawie polskiego benchmarku LLM 2026 (12 modeli, 20 zadań w języku polskim, ocena 11 osób):

| Model | Wynik ogólny | Mocna strona w polskim |
|---|---|---|
| **Gemini 3.1 Pro** (Google) | 23/40 🥇 | Dedukcja, fakty, humor, kontekst kulturowy |
| **Claude Sonnet 4.6** (Anthropic) | 22/40 🥈 | Zarządzanie, maile biznesowe, copywriting |
| **GPT-5.2** (OpenAI) | 21/40 🥉 | Prawo, podatki, wiedza ogólna o Polsce |
| **Llama 4** / **Qwen 3.5** (open-source) | 22/40 🥈 | Self-hosted na Ollamie/OVH, korekta PL, full data sovereignty |

### Claude Sonnet 4.6 — najlepsza równowaga jakość/cena dla treści

Wyróżnia się w zadaniach wymagających **precyzji tonu i stylu**. Badanie blind-test Lokalise 2025 przyznało Claude 3.5 najwyższy odsetek tłumaczeń ocenionych jako „dobre" (78%). W polskim benchmarku Claude zajął top-3 w: zarządzanie firmą, maile biznesowe, spot reklamowy. **Claude Opus 4.7** (premium) wykazuje wyraźną jakościową przewagę.

### GPT-5.2 / GPT-5.4 — silny w prawie i VAT

W teście PLCC z marca 2026 (benchmark Hugging Face) GPT-5 Pro plasuje się obok Gemini. **GPT-5.2 uzyskał najlepsze oceny w zadaniach związanych z prawem konsumenckim i podatkami VAT** — kategoriach kluczowych dla polskich MŚP. GPT-5.4 Thinking osiąga GPQA Diamond 92.8%.

### Gemini 3.1 Pro — lider rankingu ogólnego

Wygrał całościowy ranking polskiego testu 2026. Wyróżnia się w **dedukcji opartej na wiedzy o Polsce, humorze i zadaniach culturally-aware**. Oferuje okno kontekstu **1M tokenów** — przewaga przy analizie dużych zbiorów dokumentów.

## Lokalne modele open-source — kiedy stosować

Część polskich firm ma wymóg **lokalizacji danych w Polsce / EU** (RODO, tajemnica handlowa, branża regulowana). W takiej sytuacji rozwiązaniem są **modele open-source uruchamiane lokalnie** (Ollama / własny serwer / OVH AI Endpoints).

**Top wybór 2026 dla self-hosted:**

| Model | Rozmiar | Zastosowanie |
|---|---|---|
| **Llama 4** (Meta) | 70B / 405B | Polski język na top poziomie, multimodal, ogólny |
| **Qwen 3.5 Plus** (Alibaba) | 32B / 72B | Reasoning, code, polski OK, dobre przy długich kontekstach |
| **Mistral Small 3.2** (Mistral) | 24B | Europejski compliance, GDPR-friendly z natury |
| **gpt-oss-120b** (OpenAI open-weight) | 120B | Reasoning na poziomie zbliżonym do GPT-4 |

### Kiedy lokalny self-host ma sens dla MŚP

| Scenariusz | Self-hosted (Ollama / OVH) | Modele komercyjne API |
|---|---|---|
| Dane muszą zostać lokalnie / EU (RODO, branża regulowana) | ✅ Full data sovereignty | ❌ Chmura USA |
| Duże wolumeny (>50M tokenów/mies.) | ✅ Brak kosztu per-token (po setup) | ❌ Szybko rośnie koszt |
| Szybkie wdrożenie ogólnego asystenta | ❌ Wymaga infrastruktury | ✅ Gotowe w godziny |
| Multimodalność (obrazy, PDF OCR) | ⚠️ Llama 4 OK | ✅ Claude / GPT / Gemini |
| Najnowsze capabilities (extended thinking, agent SDK) | ⚠️ Opóźnione | ✅ Anthropic / OpenAI |

### Praktyczne setup options dla polskiego MŚP

1. **Ollama na własnym serwerze** — najprostsze. Llama 4 / Qwen / Mistral na zwykłym serwerze z GPU (np. RTX 4090). Czas setup: 1-2 dni, wymaga dewelopera.
2. **OVH AI Endpoints** (datacenter Gravelines, Francja) — zarządzane endpointy z gotowymi modelami. Mistral Small 3.2: €0,09 / 1M tokens input. **EU compliance out-of-the-box.**
3. **Hybrid** — Claude API dla zadań wymagających najlepszej jakości + lokalny model dla zadań masowych z wrażliwymi danymi.

### Ograniczenia, o których musisz wiedzieć

- **Brak wbudowanej moderacji** w open-source modelach — może generować nieodpowiednie treści bez dodatkowych guardrails
- **Jakość konwersacyjna** zwykle niższa niż top komercyjne (Claude Sonnet 4.6 / Gemini 3.1 Pro)
- **NIE jest „plug and play"** — wymaga zespołu technicznego do wdrożenia i utrzymania
- **Aktualizacje opóźnione** w stosunku do najnowszych capabilities komercyjnych

> **Polski model Bielik (SpeakLeash + Cyfronet AGH)** jest projektem badawczym wartym wzmianki, ale w 2026 ma wyniki niższe od najlepszych open-source (Llama 4, Qwen 3.5). Dla wartime MŚP rekomendujemy **generyczne open-source na Ollamie/OVH** + komercyjne API gdy potrzebna top jakość.

## Koszty API 2026 — porównanie

Ceny LLM API spadły o **ok. 80%** w porównaniu z początkiem 2025. To diametralnie zmienia rachunek ekonomiczny wdrożeń.

| Model | Input (per 1M) | Output (per 1M) | Kontekst | Zastosowanie |
|---|---|---|---|---|
| Claude Haiku 4.5 | $1.00 | $5.00 | 200K | Klasyfikacja, ekstrakcja, proste Q&A |
| **Claude Sonnet 4.6** | $3.00 | $15.00 | 1M | **Treści, RAG, agenci — rekomendowany default** |
| Claude Opus 4.7 | $5.00 | $25.00 | 1M | Złożone reasoning, analiza strategiczna |
| GPT-5 Nano | $0.05 | $0.40 | 128K | Masowe mikrozadania |
| GPT-5 | $1.25 | $10.00 | 128K | Ogólne zastosowania, prawo |
| Gemini 2.0 Flash-Lite | $0.075 | $0.30 | 1M | **Tanie prototypowanie** |
| Gemini 3.1 Pro | $2.00 | $12.00 | 1M | Najlepsza jakość PL |
| Mistral Small 3 | $0.10 | $0.30 | 128K | Europejski compliance |

### OVH AI Endpoints — opcja europejska

Dla MŚP wymagających **europejskiej lokalizacji danych** (RODO compliance), OVH Cloud oferuje endpointy z datacenter Gravelines (Francja):

| Model na OVH | Input (€/1M) | Output (€/1M) |
|---|---|---|
| Mistral-7B-Instruct-v0.3 | €0.10 | €0.10 |
| Mistral-Small-3.2-24B | €0.09 | €0.28 |
| Qwen3-Coder-30B (kod) | €0.06 | €0.22 |
| gpt-oss-20b (reasoning) | €0.04 | €0.15 |
| Meta-Llama-3.3-70B | €0.67 | €0.67 |

**Uwaga:** OVH NIE oferuje Claude'a — modele OpenAI i Anthropic dostępne wyłącznie przez ich własne API. OVH skupia się na open-source ekosystemie (Llama, Qwen, Mistral, gpt-oss) z europejskim compliance.

### Przykładowy koszt miesięczny MŚP

20-osobowe MŚP, 50 zapytań dziennie po ~500 tokenów input + ~500 output = ~50M tokenów/mies.:

- **Claude Sonnet 4.6:** $450/mies (~1 800 PLN)
- **GPT-5:** $281/mies (~1 120 PLN)
- **Gemini 2.0 Flash-Lite:** $87,50/mies (~350 PLN)
- **Mistral Small (OVH):** €5/mies

## 5 zasad prompt engineering dla polskich treści

Badania OneRuler 2025: polski osiągał 88% średniej dokładności AI na 26 językach (pierwsze miejsce). To zasługa **bogatej gramatyki**, która wymusza precyzję. Ale niejasny prompt w polskim traci sens **szybciej niż w angielskim**.

### Zasada 1: Definiuj rolę i odbiorcę na początku

❌ *„Napisz ofertę handlową."*

✅ *„Jesteś doświadczonym handlowcem B2B w firmie budowlanej. Napisz ofertę dla dyrektor ds. zakupów sieci hotelowej, podkreślając termin realizacji i gwarancję jakości. Ton: profesjonalny, konkretny. Długość: max 300 słów."*

Definicja roli **eliminuje domysły modelu**.

### Zasada 2: Podaj format wyjścia explicite

❌ *„Podsumuj spotkanie."*

✅ *„Podsumuj spotkanie w formacie: (1) Ustalenia — lista punktowa, (2) Zadania — tabela: osoba | zadanie | termin, (3) Następne spotkanie — jedna linia. Używaj polskich czasowników bezosobowych w stylu urzędowym."*

Bez wskazania formatu modele generują **swobodną prozę** trudną do dalszego przetwarzania.

### Zasada 3: Podaj przykład (few-shot) dla specyficznego stylu

✅ *„Przykład poprawnej odpowiedzi na reklamację: [wklej przykład]. Napisz podobną odpowiedź na: [treść reklamacji]."*

Few-shot prompting **dramatycznie zwiększa spójność stylu** w polskim.

### Zasada 4: Unikaj wielozadaniowości w jednym prompcie

Częsty błąd: jeden prompt z 5 zadaniami („przeanalizuj, porównaj, wyciągnij wnioski, zaproponuj zmiany i napisz podsumowanie"). Modele wykonują każde gorzej niż w osobnych promptach.

**Rozbij na sekwencję kroków**, przekazując wynik poprzedniego jako input do następnego.

### Zasada 5: Zawsze podaj ograniczenia i czerwone linie

Polskie dokumenty biznesowe mają specyficzne wymagania (NIP, RODO, formuły umów). Bez ograniczenia model może pominąć te elementy lub wstawić odpowiedniki z innego systemu prawnego.

✅ *„Odpowiadaj wyłącznie na podstawie polskiego prawa. Jeśli nie znasz aktualnego przepisu, napisz: 'Wymaga weryfikacji z prawnikiem'. Nie wymyślaj numerów paragrafów ani stawek."*

Modele halucynują fakty podatkowe i prawne — **czerwone linie w prompcie systemowym istotnie redukują to ryzyko**.

## RAG vs fine-tuning vs prompt engineering — macierz decyzji

| Kryterium | Prompt Engineering | RAG | Fine-tuning |
|---|---|---|---|
| Czas wdrożenia | Godziny–dni | Dni–tygodnie | Tygodnie–miesiące |
| Koszt | Bardzo niski | Niski–średni | Wysoki |
| Infrastruktura | Żadna | Baza wektorowa + pipeline | GPU + trening |
| Aktualność wiedzy | Statyczna | Dynamiczna | Statyczna |
| Własne dane firmowe | Nie | Tak | Częściowo |
| Kontrola stylu | Ograniczona | Umiarkowana | Wysoka |
| Najlepszy dla | Prototypy | Produkty z bazą wiedzy | Wąskie zadania w skali |

**Praktyczna zasada dla polskiego MŚP:** RAG rozwiązuje **80-90%** przypadków, gdzie model musi znać Twoje dokumenty. Inwestycja w dobrej jakości indeksowanie (chunking, embeddings, hybrid search) ma większy wpływ niż wybór droższego modelu bazowego.

## Podsumowanie dla decydenta

1. **Zacznij od prompt engineering** — zero kosztów technicznych. To edukacja zespołu, nie infrastruktura.
2. **Wdrożenie RAG** to optymalny krok 2: rozwiązuje 80% potrzeb „AI na własnych danych" przy rozsądnym budżecie.
3. **Modele 2026:** Gemini 3.1 Pro wygrywa polskie benchmarki ogólne. Claude Sonnet 4.6 dominuje w treściach. GPT-5 i GPT-5.2 — prawo i podatki.
4. **Lokalne open-source modele** (Llama 4, Qwen 3.5, Mistral) na Ollamie/OVH mają sens przy: suwerenności danych (self-hosted), dużych wolumenach (po setup brak kosztu per-token), regulacyjnym przymusie lokalizacji.
5. **Koszty API spadły 80%** — wdrożenie AI dla MŚP jest dziś dostępne finansowo nawet bez dedykowanego budżetu IT.
6. **Nie pomijaj OVH Endpoints** jeśli compliance RODO i europejska lokalizacja danych są priorytetem.

## Możemy Ci pomóc

Pomagamy MŚP wybrać właściwy stack AI dla konkretnego use case: prompt engineering jako entry point, RAG dla wiedzy firmowej, lokalne open-source gdy wymagana lokalizacja danych. 4-tygodniowy pilot z konfiguracją dopasowaną do Twojego workflow.

Email: [biuro@mjoldak.pl](mailto:biuro@mjoldak.pl) z opisem use case (np. „chcę żeby AI pomagał mi w X").

## Powiązane artykuły

- [„MJ.OLDAK — kim jesteśmy"](/artykuly/mj-oldak-kim-jestesmy-co-budujemy/) — kim jesteśmy, jak współpracujemy
- [„Czym jest agent AI? Praktyczne wyjaśnienie dla księgowego"](/artykuly/czym-jest-agent-ai-dla-ksiegowego/) — co potrafi agent (i czego nie)
- [„AI dla biur rachunkowych w 2026 — przewodnik krok po kroku"](/artykuly/ai-dla-biur-rachunkowych-2026/) — comprehensive guide
- [„AI Act 2026 — co polskie biura rachunkowe muszą wiedzieć"](/artykuly/ai-act-2026-biuro-rachunkowe-compliance/) — compliance checklist
