---
title: "AI Act 2026 — co polskie biura rachunkowe muszą wiedzieć"
slug: "ai-act-2026-biuro-rachunkowe-compliance"
excerpt: "AI Act od 2 sierpnia 2026 — pełne stosowanie. Klasyfikacja ryzyka biur rachunkowych, 18-pozycyjny compliance checklist, obowiązki przy używaniu Claude/GPT API, kary do 35M EUR."
publishedAt: 2026-05-07
author: "Marcin Ołdak"
category: "edukacja"
tags: ["ai-act", "compliance", "biuro-rachunkowe"]
cover: "/articles/covers/ai-act-2026-biuro-rachunkowe-compliance.jpg"
coverAlt: "AI Act 2026 - compliance dla polskich biur rachunkowych"
readingTime: 10
featured: false
draft: false
metaTitle: "AI Act 2026 — co biuro rachunkowe musi wiedzieć"
metaDescription: "AI Act dla biur rachunkowych: klasyfikacja ryzyka, 18 punktów compliance, obowiązki przy Claude/GPT API, KRiBSI, kary. Krytyczny termin: 2 sierpnia 2026."
keywords: ["AI Act 2026", "AI Act biuro rachunkowe", "AI Act Polska compliance", "KRiBSI", "AI compliance MŚP", "AI Act deployer", "AI Literacy"]
---

Rozporządzenie UE 2024/1689 (AI Act) weszło w życie **1 sierpnia 2024**. Obowiązuje bezpośrednio w Polsce — bez potrzeby krajowej implementacji. Dla typowego polskiego biura rachunkowego używającego AI (asystenci, OCR, chatboty), kluczowy termin to **2 sierpnia 2026 r.** — pełne stosowanie obowiązków transparentności i systemów wysokiego ryzyka.

Ten artykuł to **18-pozycyjny compliance checklist + timeline + jedna pułapka, której unikać**. 10 minut czytania. Dane research May 2026.

## Aktualny status implementacji w Polsce

### Organ nadzoru: KRiBSI (nie UODO)

**31 marca 2026** Rada Ministrów przyjęła projekt ustawy o systemach AI i skierowała do Sejmu. Ustawa powołuje **Komisję Rozwoju i Bezpieczeństwa Sztucznej Inteligencji (KRiBSI)** jako główny organ nadzoru. Kompetencje: postępowania administracyjne, decyzje, sankcje.

W kierownictwie KRiBSI: przedstawiciele UOKiK, KNF, KRRiT i UKE.

**UODO zachowuje kompetencje** w zakresie przetwarzania danych osobowych przez AI. W praktyce biuro może podlegać dwóm organom: KRiBSI (AI Act) + UODO (RODO + dane osobowe w AI).

### Co ważne: AI Act działa bezpośrednio

Jako rozporządzenie UE — **NIE wymaga krajowej implementacji** żeby zacząć obowiązywać. Krajowa ustawa (projekt w Sejmie, maj 2026) uzupełnia tylko **infrastrukturę nadzorczą** — nie tworzy nowych obowiązków materialnych dla firm.

## Klasyfikacja ryzyka dla biur rachunkowych

Biuro rachunkowe nie jest jednorodne pod AI Act — różne narzędzia wpadają w różne kategorie.

| Zastosowanie AI w biurze | Kategoria ryzyka | Podstawa |
|---|---|---|
| Chatbot na stronie / asystent klienta | **Ograniczone (Limited)** | Art. 50 — obowiązki transparency |
| OCR + automatyczne księgowanie faktur | **Minimalne / brak ryzyka** | Narzędzie pomocnicze |
| Asystent do redagowania pism (GPT/Claude) | **Minimalne / ograniczone** | Generowanie tekstu |
| Analiza finansowa wspierająca doradztwo | **Zależy** — zazwyczaj minimalne | Jeśli nie decyzje o zdolności kredytowej osób |
| **Scoring kredytowy / ocena zdolności płatniczej osób fizycznych** | **WYSOKIE RYZYKO (High Risk)** | Załącznik III pkt 5b — credit scoring |
| System rekrutacyjny AI (CV scoring) | **WYSOKIE RYZYKO** | Załącznik III pkt 4 — zarządzanie zatrudnieniem |
| Automatyczne alerty do ZUS/US bez weryfikacji | **Do oceny** — potencjalnie wysokie | Decyzje wpływające na prawa |

> **Kluczowy wniosek:** typowe biuro rachunkowe używające AI do automatyzacji faktur, asystentów tekstowych i chatbotów **mieści się w kategorii ograniczonego lub minimalnego ryzyka**. Wyjątek: **scoring kredytowy / ocena zdolności płatniczej osób fizycznych** = **automatycznie high risk**.

## Obowiązki transparency (Art. 50) — disclosure dla klientów

Art. 50 AI Act dla systemów ograniczonego ryzyka:

1. **Chatbot / wirtualny asystent:** klient musi zostać poinformowany, że rozmawia z AI — najpóźniej przy pierwszej interakcji, w sposób jasny.
2. **Treści generowane przez AI:** dokumenty publikowane jako informacja dla klienta muszą być oznaczone jako AI-generated, jeśli **publikowane publicznie w interesie publicznym**. Wewnętrzna komunikacja: brak wyraźnego wymogu, ale dobrą praktyką jest przejrzystość.
3. **Deepfake / modyfikacje audio-video:** obowiązek ujawnienia.
4. **Systemy rozpoznawania emocji / biometria:** zakaz bez informowania (w biurze rachunkowym nie powinny być stosowane).

Informacja musi być przekazana **przed lub najpóźniej przy pierwszej interakcji**.

## Wymagana dokumentacja procesów AI

### Dla systemów ograniczonego / minimalnego ryzyka (typowe biuro)

- **Rejestr systemów AI** (wewnętrzny inwentarz) — lista narzędzi, dostawcy, cel, wersja, rola biura (deployer)
- **Polityka AI** zatwierdzona przez kierownictwo
- **Procedura AI Literacy** — dokumentacja szkoleń pracowników (art. 4)
- **Procedura zgłaszania incydentów** — co zrobić przy błędzie AI, halucynacji, wycieku danych
- **Aktualizacje umów powierzenia danych (RODO)** — jeśli dane klientów trafiają do zewnętrznych API (OpenAI, Anthropic) → klauzula powierzenia / DPA

### Dla systemów wysokiego ryzyka (jeśli biuro je stosuje)

- Pełna dokumentacja techniczna (Annex IV)
- System zarządzania ryzykiem (risk management lifecycle)
- Rejestry zdarzeń / logi przechowywane min. 6 miesięcy
- Ocena zgodności + rejestracja w EU AI database
- Nadzór ludzki (human oversight)
- Algorithmic Impact Assessment

## Krytyczne: obowiązki przy Claude / GPT API

**Najczęstszy i najgroźniejszy błąd polskich biur:** zakładanie, że compliance leży po stronie OpenAI/Anthropic.

**TO NIEPRAWDA.**

Podział odpowiedzialności wg AI Act:

| Strona | Rola | Obowiązki |
|---|---|---|
| **OpenAI, Anthropic, Google** | GPAI Provider (Art. 53) | Dokumentacja techniczna modelu, polityki użycia, transparentność danych treningowych |
| **Biuro rachunkowe** | **Deployer (Art. 26)** | Odpowiedzialność za aplikację, use case, konfigurację, wpływ na klientów |

### Konkretne obowiązki biura jako deployera API

1. **Używać API zgodnie z dokumentacją dostawcy** — używanie GPT/Claude poza intended use przenosi obowiązki providera na biuro
2. **Weryfikować dokumentację Art. 53 dostawcy** — biuro ma obowiązek sprawdzić, że OpenAI/Anthropic spełnia obowiązki GPAI
3. **Wewnętrzny inwentarz API** — lista modeli, wersji, dostawców
4. **Monitoring incydentów** — logowanie interakcji wystarczające do rekonstrukcji błędów
5. **Umowa DPA z dostawcą API** — dane osobowe klientów do API muszą być chronione umową powierzenia
6. **Ograniczenie danych wejściowych** — minimalizacja danych osobowych przesyłanych do API (privacy by design z RODO)

## Kary — struktura penalty 2026-2027

Art. 99 AI Act — trójstopniowy system sankcji administracyjnych:

| Naruszenie | Kara maksymalna |
|---|---|
| Stosowanie zakazanych systemów AI (art. 5) — social scoring, manipulacja behawioralna, biometria masowa | **35 mln EUR lub 7% globalnego obrotu** (wyższe z dwóch) |
| Naruszenia obowiązków high-risk + GPAI + transparency | **15 mln EUR lub 3% obrotu** |
| Nieprawdziwe informacje organom nadzoru | **7,5 mln EUR lub 1% obrotu** |

**Ważne dla MŚP:** stosuje się **niższy z dwóch progów** (kwota stała lub % obrotu). Dla biura o obrocie 500 000 PLN rocznie kary są znacznie niższe od limitów nominalnych — ale wciąż dotkliwe.

**Kary za AI Act są wyższe niż za RODO** (RODO: 20 mln EUR / 4% vs AI Act: 35 mln EUR / 7%).

Enforcement: KRiBSI prowadzi kontrole od II połowy 2026. UODO równolegle nadzoruje aspekty RODO.

## 18-pozycyjny compliance checklist

### Obowiązki już obowiązujące (od 2 lutego 2025)

- [ ] **1. AI Literacy — szkolenia personelu (art. 4):** wszyscy pracownicy używający AI muszą mieć udokumentowane szkolenie z zasad działania AI, ryzyk (halucynacje, błędy, bias), przepisów. Zakres proporcjonalny do roli.
- [ ] **2. Weryfikacja zakazanych praktyk:** upewnienie się, że biuro NIE używa AI do social scoringu klientów, manipulacji behawioralnej, rozpoznawania emocji pracowników.
- [ ] **3. Dokumentacja szkoleń:** rejestr szkoleń AI dla pracowników (kto, kiedy, z czego).

### Obowiązki wchodzące 2 sierpnia 2026

- [ ] **4. Inwentarz systemów AI:** rejestr wszystkich narzędzi — nazwa, dostawca, wersja, cel, rola biura, level ryzyka.
- [ ] **5. Klasyfikacja ryzyka:** dla każdego systemu z rejestru określ kategorię (minimalne / ograniczone / wysokie).
- [ ] **6. Polityka AI zatwierdzona przez zarząd:** pisemna polityka z zakresem zastosowań, zasadami akceptowalnego użycia, odpowiedzialnością.
- [ ] **7. Disclosure chatbotów i asystentów AI:** klient musi wiedzieć że rozmawia z AI.
- [ ] **8. Procedura oznaczania treści AI:** polityka wewnętrzna kiedy oznaczać dokumenty jako AI-generated.
- [ ] **9. Weryfikacja dostawców API:** sprawdzić że OpenAI/Anthropic/Google opublikowali dokumentację Art. 53.
- [ ] **10. Umowy DPA z dostawcami API:** podpisz/zaktualizuj Data Processing Agreement.
- [ ] **11. Ograniczenie danych w promptach:** minimalizacja — nie wysyłaj NIP, PESEL, pełnych imion do API bez potrzeby.
- [ ] **12. Procedura monitorowania i incydentów.**
- [ ] **13. Nadzór ludzki nad wyjściami AI:** udokumentuj że każda decyzja AI jest weryfikowana przez człowieka.
- [ ] **14. Wyznaczenie AI Officera:** odpowiedzialność konkretnej osobie (może być DPO).
- [ ] **15. Regularny przegląd rejestru AI.**

### Dodatkowe przy systemach wysokiego ryzyka

- [ ] **16. Dokumentacja techniczna systemu HR AI:** jeśli AI ocenia pracowników/rekrutację — pełna Annex IV + EU AI database.
- [ ] **17. Ocena kredytowa / scoring finansowy:** zewnętrzny audyt + risk management documentation.
- [ ] **18. Logi zdarzeń 6 miesięcy:** przechowywanie logów systemów wysokiego ryzyka.

## Timeline obowiązków 2026-2027

| Data | Obowiązek |
|---|---|
| **2 lutego 2025** ✅ | Zakazy niedopuszczalnych praktyk + AI Literacy |
| **2 sierpnia 2025** ✅ | Obowiązki GPAI providers + AI Office aktywny |
| **II połowa 2026** | Uchwalenie polskiej ustawy + start KRiBSI |
| **2 sierpnia 2026** ⚠️ | **Pełne stosowanie AI Act** — high-risk systems, transparency (art. 50), deployer obligations (art. 26) |
| **Ciągłe od 02.08.2026** | Kontrole KRiBSI + UODO |
| **2 sierpnia 2027** | Przepisy dla high-risk w produktach regulowanych |

## 5 quick wins — działań dla biura zaczynającego z AI

### 🥇 Quick Win #1: Inwentarz AI w ciągu tygodnia

Stwórz arkusz ze wszystkimi narzędziami AI (ChatGPT, Claude, OCR, chatbot). Per narzędzie: dostawca, cel, rola biura, klasyfikacja ryzyka. **Czas: 2-4 godziny.** To fundament całego compliance.

### 🥇 Quick Win #2: Szkolenie AI Literacy w jeden dzień

2-3 godzinne szkolenie dla zespołu: co to AI, jak działa, jakie ryzyka, zasady biurowe. **Udokumentuj listą obecności.** Obowiązek z art. 4 jest aktywny od 2025.

### 🥇 Quick Win #3: Klauzula DPA z OpenAI/Anthropic

Sprawdź warunki API — czy podpisałeś Data Processing Agreement? OpenAI i Anthropic oferują standardowe DPA. Aktualizacja umów powierzenia z klientami (art. 28 RODO) o sub-procesorach AI. **Czas: kilka godzin.**

### 🥇 Quick Win #4: Komunikat AI na stronie / w stopce

Jeśli używasz chatbota lub AI-assisted odpowiedzi — dodaj zdanie: *„Biuro używa narzędzi AI wspierających obsługę klientów. Wszystkie odpowiedzi weryfikowane są przez naszych specjalistów."* Spełnia wymóg art. 50. **Czas: 30 minut.**

### 🥇 Quick Win #5: Polityka „AI nie decyduje samodzielnie"

Zasada: żadne pismo, deklaracja, raport dla klienta nie opuszcza biura bez weryfikacji człowieka. Zapisz jednostronicowy dokument „Polityka AI Biura XYZ". Spełnia wymóg nadzoru ludzkiego + chroni przed odpowiedzialnością zawodową.

## Pułapka, której unikać

### ⚠️ „Compliance leży po stronie OpenAI/Anthropic"

**Najczęstszy i najgroźniejszy błąd.**

**Błędne przekonanie:** „Używamy gotowego produktu od OpenAI/Anthropic. To ich problem, żeby był zgodny z AI Act."

**Rzeczywistość prawna:** Biuro rachunkowe jako **deployer (podmiot stosujący)** na mocy Art. 26 AI Act ponosi **samodzielną, równoległą odpowiedzialność** za:
- use case (cel i kontekst, w którym AI jest używane)
- konfigurację systemu i jego wpływ na klientów
- zgodność zastosowania z instrukcjami dostawcy
- monitoring i zgłaszanie incydentów

Jeśli biuro zbuduje na bazie GPT/Claude **system automatycznie oceniający ryzyko klienta** bez weryfikacji ludzkiej i bez dokumentacji — to system **wysokiego ryzyka**, za który **biuro odpowiada jako deployer**, niezależnie że model pochodzi od OpenAI. Karę może nałożyć KRiBSI lub UODO.

**Jak uniknąć:** zachowaj dokumentację roli biura jako deployera, weryfikuj dokumentację dostawcy (Art. 53), utrzymuj nadzór ludzki nad każdą decyzją AI wobec klientów.

## Podsumowanie: gdzie stoi typowe polskie biuro

Typowe biuro używające AI do automatyzacji, asystentów tekstowych i chatbotów:

- Mieści się w **ograniczonym lub minimalnym ryzyku**
- Główne obowiązki: AI Literacy (już od 2025), inwentarz AI, polityka AI, disclosure chatbotów, DPA z API
- High-risk dotyczy **tylko gdy AI ocenia zdolność kredytową osób lub zarządza zatrudnieniem**
- Kary są proporcjonalne — MŚP stosuje niższy próg — ale nawet 1% obrotu może boleć
- **Czas na dostosowanie mija 2 sierpnia 2026 r.**

## Co dalej

- [„MJ.OLDAK — kim jesteśmy"](/artykuly/mj-oldak-kim-jestesmy-co-budujemy/) — kim jesteśmy, jak pomagamy w compliance
- [„AI dla biur rachunkowych w 2026 — przewodnik krok po kroku"](/artykuly/ai-dla-biur-rachunkowych-2026/) — comprehensive guide
- [„Czym jest agent AI?"](/artykuly/czym-jest-agent-ai-dla-ksiegowego/) — co potrafi, czego nie

[Kontakt → biuro@mjoldak.pl](mailto:biuro@mjoldak.pl)

---

> **Disclaimer:** ten artykuł nie stanowi porady prawnej. Status prawny AI Act w Polsce zmienia się dynamicznie (uchwalanie ustawy maj 2026). Konkretne implikacje dla Twojego biura wymagają konsultacji z prawnikiem specjalizującym się w prawie technologicznym.
