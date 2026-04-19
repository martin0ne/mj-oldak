---
title: "Case study: 4 godziny dziennie skrócone do 20 minut"
excerpt: "Realne pomiary z pilotażu agenta AI w obsłudze maili klienta. Co dokładnie się zmieniło, jakie liczby, jaki koszt, jakie pułapki."
publishedAt: 2026-04-12
author: "Marcin Ołdak"
category: "case-study"
tags: ["case-study", "automatyzacja", "biuro-rachunkowe", "demo"]
cover: "/articles/covers/case-study-4h-dziennie-do-20-minut.jpg"
coverAlt: "Cover artykułu: 4 godziny dziennie do 20 minut"
readingTime: 8
featured: false
draft: false
metaTitle: "4h obsługi klienta dziennie skrócone do 20 min — case study"
metaDescription: "Pilotaż agenta AI dla obsługi maili w MŚP. Konkretne liczby przed/po, koszt, ROI, pułapki i co zrobiłem inaczej w drugiej iteracji."
keywords: ["case study agent ai", "automatyzacja obsługi klienta", "ai dla msp", "claude api workflow", "redukcja czasu pracy"]
---

4 godziny dziennie → 20 minut.

To nie jest marketing. To liczba zmierzona na realnych danych podczas 6-tygodniowego pilotażu agenta AI w niewielkiej firmie usługowej (5 osób, ~80 maili klienckich dziennie).

W tym artykule rozkładam to na czynniki: co dokładnie zostało zautomatyzowane, ile kosztowało wdrożenie, jaki był ROI, i — najważniejsze — co poszło **nie tak** w pierwszej iteracji.

## Kontekst: dlaczego w ogóle to robiliśmy

Klient (nazwiska nie podaję — pilotaż nie jest jeszcze opublikowany jako referencja) prowadził pięcioosobowy zespół obsługujący korespondencję od ~150 stałych klientów B2B.

Stan zerowy:

- **3.5–4 godziny dziennie** każda osoba spędzała na pierwszej połowie skrzynki
- 40-60 maili rano, 20-40 popołudniem
- 70% maili to powtarzające się pytania ("kiedy płatność?", "status zamówienia", "dostarczcie kopię faktury", "czy macie...")
- 15% wymagało prawdziwego myślenia (negocjacje, reklamacje, eskalacje)
- 15% to spam / niskoważne (newslettery, oferty)

Problem nie był "trudny" — był nudny i pochłaniał czas, który można było wykorzystać na pracę wymagającą kompetencji człowieka.

## Co dokładnie zbudowałem

### Architektura

```
Skrzynka IMAP (Gmail Workspace)
        ↓
Cron worker (n8n, co 15 min)
        ↓
Agent klasyfikujący (Claude Sonnet)
   → Decyzja: PILNE / RUTYNOWE / SPAM
   → Dla rutynowych: czytanie historii klienta z CRM (PipeDrive API)
        ↓
Agent generujący draft (Claude Sonnet)
   → Pisze odpowiedź w tonie zespołu (8 example'ów w prompcie)
   → Format: Markdown, z placeholderami (data, kwota, link)
        ↓
Dashboard webowy (FastAPI + Tailwind)
   → Lista draftów do akceptacji
   → 1 klik = wysyłka, 1 klik = edycja, 1 klik = odrzucenie
        ↓
SMTP (po akceptacji) lub eskalacja do osoby
```

Stack:

- **Claude Sonnet 4.5** — klasyfikacja + generacja
- **n8n** — orkiestracja workflow + cron
- **PipeDrive API** — kontekst klienta (historia, deal stage, ostatnie maile)
- **FastAPI + SQLite** — dashboard zatwierdzania
- **Postmark** — SMTP wysyłki

### Co dokładnie robi człowiek

**Przed:**
- Otwiera Gmail → 60 maili
- Czyta każdy → klasyfikuje w głowie
- Pisze odpowiedź lub kopiuje template
- Personalizuje template
- Wysyła
- 3.5-4h, codziennie

**Po:**
- Otwiera dashboard MJ.OLDAK → 60 draftów gotowych
- Skanuje listę (status: zielony = OK, żółty = do edycji, czerwony = wymaga uwagi)
- Dla zielonych: 1 klik "Wyślij" (45 maili)
- Dla żółtych: krótka edycja + wyślij (10 maili)
- Dla czerwonych: pisze ręcznie z pomocą agenta (5 maili)
- 20 minut, codziennie

## Liczby

### Czas pracy

| Etap | Przed (min/dzień) | Po (min/dzień) | Oszczędność |
|------|-------------------|----------------|-------------|
| Przegląd skrzynki | 45 | 5 | -89% |
| Klasyfikacja | 20 | 0 | -100% |
| Pisanie odpowiedzi rutynowych | 90 | 8 | -91% |
| Pisanie odpowiedzi nietypowych | 45 | 35 | -22% |
| Raport dzienny dla managera | 30 | 0 | -100% |
| **Razem** | **230 min** | **48 min** | **-79%** |

### Jakość

- Odpowiedzi wysyłane szybciej (średnio 2.3h vs 5.7h przed)
- Spadek "zapomnianych" maili (z 8% do 0%)
- Wzrost satysfakcji klientów (NPS +12 po 8 tygodniach)

### Koszty

| Pozycja | Kwota |
|---------|-------|
| Wdrożenie jednorazowe (mój czas, 3 tygodnie) | 12 000 zł |
| Claude API (Sonnet, ~80 maili × 30 dni × 2 wywołania) | ~120 zł / mies |
| n8n cloud + Postmark | ~80 zł / mies |
| Hosting dashboardu (Hetzner Cloud CX21) | 25 zł / mies |
| **Miesięczny koszt utrzymania** | **~225 zł** |

### ROI

Człowiek-pracownik to ~7 000 zł/miesiąc kosztu pracodawcy. Oszczędność 3 godzin dziennie × 21 dni = 63h miesięcznie ≈ **2 800 zł** wartości pracy uwolnionej miesięcznie.

Zwrot wdrożenia: **~5 miesięcy**. Po tym koszt ~225 zł zwraca się 12-krotnie.

## Co poszło nie tak (pierwsza iteracja)

To jest najważniejsza część — pomijana w 95% case studies "wdrożeń AI". Pierwsza wersja agenta była zła. Tu są 3 błędy.

### Błąd 1: Za szeroki prompt klasyfikacji

W pierwszym tygodniu kazałem Claude "ocenić czy mail jest pilny". Wynik: model uznawał za pilne wszystko co zawierało słowa "termin", "do dziś", "asap". Konserwatywny, ale 70% maili oznaczonych jako PILNE = bez sensu, człowiek i tak musiał przeglądać.

**Fix:** dodanie definicji "pilne = wymaga akcji w ciągu 4h I dotyczy umowy, faktury, reklamacji, urzędu". Spadek false-positive z 70% do 12%.

### Błąd 2: Drafty bez kontekstu historii klienta

Agent pisał poprawne gramatycznie, profesjonalne odpowiedzi — które jednak wyglądały jak od bota. Brakowało nawiązania do poprzednich rozmów, do otwartego deala, do specyfiki klienta.

**Fix:** dodanie kroku "weź ostatnie 5 maili z tym klientem + status w CRM" przed generacją draftu. Drafty od razu nabrały personalności.

### Błąd 3: Brak feedback loop

Pierwsze 2 tygodnie człowiek edytował drafty, ale poprawki nigdzie nie wracały. Agent nie uczył się z korekt.

**Fix:** dodanie panelu "powód odrzucenia" przy każdym odrzuconym draftcie. Co 2 tygodnie analiza wzorców → aktualizacja systemowego prompta. Od 4. tygodnia jakość draftów wzrosła o 35% (mierzone procentem akceptacji bez edycji).

## Czy zadziała u Ciebie

To zależy od 3 zmiennych:

1. **Wolumen.** Poniżej ~30 maili dziennie nie ma sensu — koszt wdrożenia nie zwróci się szybko.
2. **Powtarzalność.** Jeśli Twoje maile to głównie negocjacje 1-na-1 z każdorazowo unikalnymi warunkami, agent nie pomoże. Jeśli 60%+ to "powtarzalne pytania" — pomoże znacznie.
3. **Gotowość zespołu.** Pierwsze 2 tygodnie to **więcej** pracy, nie mniej (uczenie się systemu, weryfikacja draftów). Trzeba przejść przez tę dolinę.

Jeśli te trzy są na ✅ — porozmawiajmy.

## Co dalej

Aktualnie wdrażam tę samą architekturę u 2 kolejnych klientów (oba biura rachunkowe — przypadek użycia jeszcze lepiej dopasowany niż firma usługowa, bo maile są jeszcze bardziej powtarzalne).

Jeśli prowadzisz biuro lub MŚP z dużą skrzynką — [napisz na contact@mjoldak.com](/#kontakt) i pokażę demo na Twojej (zanonimizowanej) próbce maili.

> Najlepsza inwestycja w automatyzację to ta, która zwraca się w mniej niż 6 miesięcy. Wszystko powyżej to spekulacja.

[Czytaj dalej: Stack pod agentów AI — Claude, n8n, Azure Document Intelligence](/artykuly/stack-pod-agentow-ai-claude-n8n-azure/)
