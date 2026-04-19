---
title: "Premiera: 4 gotowe demo agentów AI dla biura rachunkowego — testuj za darmo"
excerpt: "Cztery gotowe agenty AI dla biur rachunkowych — OCR faktur, klasyfikacja maili, kalendarz podatkowy, raporty PDF. Pokazuję co działa, ile kosztuje i dlaczego nie musisz zwalniać księgowej."
publishedAt: 2026-05-20
author: "Marcin Ołdak"
category: "demo"
tags: ["demo", "biuro-rachunkowe", "automatyzacja"]
cover: "/articles/covers/premiera-4-demo-agentow-ai-dla-biura-rachunkowego.jpg"
coverAlt: "Cover artykułu: Premiera 4 demo agentów AI dla biura rachunkowego"
readingTime: 8
featured: true
draft: false
metaTitle: "Premiera: 4 demo agentów AI dla biura rachunkowego 2026"
metaDescription: "Cztery demo agentów AI dla biur rachunkowych: faktury, maile, terminy, raporty. Testuj za darmo. Stack n8n + Claude + Azure. Integracja Comarch Optima / wFirma."
keywords: ["agent ai biuro rachunkowe", "automatyzacja biura rachunkowego", "ocr faktur", "ai dla księgowych", "demo agent ai", "ksef 2026"]
---

Wczoraj dostałem maila o 22:47 od właścicielki biura rachunkowego z Wielkopolski. Treść: "Panie Marcinie, mam 80 faktur do wprowadzenia jutro rano, dziecko chore, mąż w delegacji. Za co ja biorę te pieniądze?"

Odpowiedziałem jej o 7:15 rano. Nie miałem dla niej magicznego rozwiązania na wczoraj. Ale od dziś mam cztery demo, które na takie noce odpowiadają wprost — możesz je przetestować na własnych plikach, bez karty kredytowej, bez rozmowy ze mną (chyba że sama chcesz).

## Ból, o którym nikt w branży głośno nie mówi

Polska ma 17 181 biur rachunkowych (dane GUS). Rozmawiałem przez ostatnie pół roku z kilkunastoma właścicielami — od jednoosobowych działalności po 12-osobowe zespoły. Pytałem o jedną rzecz: gdzie codziennie tracicie czas.

Odpowiedzi były zaskakująco zbieżne:

- **Przepisywanie faktur** z PDF/JPG do Optimy/wFirmy. Każda pozycja, każdy NIP, każda stawka VAT — ręcznie.
- **Powtarzalne maile** od klientów. "Czy dostał Pan moją fakturę?", "Kiedy JPK za maj?", "Ile wyszło VATu?". Godziny tygodniowo.
- **Pilnowanie terminów** za klientów. VAT-7 do 25-go, ZUS do 15-go albo 20-go (zależy od formy), CIT-8, PIT-37, JPK_VAT. Każdy klient ma swój zestaw. Nie pomylić się.
- **Raporty miesięczne** dla klientów. Każdy chce trochę inaczej, większość dostaje niezrozumiały eksport z systemu księgowego i potem dzwoni z pytaniami.

To nie jest "przyszłość pracy". To środa, godzina 16:30, ostatni dzień na JPK i znowu kliencie wysłał zdjęcie faktury z telefonu, krzywo, zawinięte w róg.

## Ile to realnie kosztuje

Nie chcę sprzedawać AI strachem, więc robię jedną prostą matematykę.

Biuro, które obsługuje 30 klientów, przetwarza średnio 400-600 faktur miesięcznie. Jedna faktura = 2-3 minuty ręcznego przepisania (plus kontrola). Przyjmijmy środek: 2,5 minuty × 500 faktur = **20 godzin miesięcznie** tylko na fakturach.

Stawka księgowej w biurze (nie właścicielki — pracownika) to w 2026 realnie 50-70 zł/h brutto. 20h × 60 zł = **1200 zł miesięcznie kosztu pracy** na samym przepisywaniu. Bez myślenia, bez obsługi klienta, bez konsultacji. Tylko wpisywanie.

Według [badania pracownicy.ai i Deloitte 2025](https://pracownicy.ai/ai-w-obsludze-faktur), AI skraca czas obsługi faktury o około 80%. Czyli te 20 godzin spada do ~4. Uwolnione 16 godzin to nie teoretyczna oszczędność — to czas, w którym ta sama księgowa może zadzwonić do klienta, zrobić analizę kosztów, obsłużyć nową umowę.

Pierwszy biuro, które wdrożyło u mnie moduł faktur w formie pilotażu, przetworzył **400 faktur w pierwszym miesiącu bez ani jednego błędu wymagającego poprawki**. To jedna liczba, jedno biuro. Nie "setki wdrożeń". Nie będę ściemniał.

## Dlaczego właśnie teraz — KSeF w kalendarzu

KSeF wchodzi obowiązkowo w 2026 (duzi podatnicy luty, reszta kwiecień). Faktury będą ustrukturyzowane, integracja przez API przestanie być opcjonalna. Biura z warstwą automatyzacji przejdą tę zmianę miękko. Biura bez niej — nadrobią pod presją.

Według [raportu PIE 2025](https://www.pb.pl/sztuczna-inteligencja-w-msp-mniej-entuzjazmu-wiecej-kalkulacji-1258533), 77% polskich firm niekorzystających z AI nie zamierza wdrażać jej, "dopóki nie muszą". Tym razem moment "muszą" jest w kalendarzu. I nie jest odległy.

## Premiera: 4 demo, które możesz odpalić dziś

Każdy z poniższych agentów ma publiczne demo. Wrzucasz swoje pliki, widzisz output, decydujesz sama.

### 1. MJ.OLDAK Invoice — agent OCR faktur

Wrzucasz PDF, JPG albo zdjęcie faktury (nawet krzywe, z telefonu). Agent:

1. Rozpoznaje tekst przez Azure Document Intelligence
2. Wyciąga: sprzedawcę, nabywcę, NIP-y, datę, numer, pozycje, stawki VAT, kwoty netto/brutto
3. Kategoryzuje koszt (paliwo, materiały, usługi obce, wyposażenie) przez Claude Sonnet
4. Eksportuje do formatu Comarch Optima XML / wFirma / Insert — gotowe do importu

Średni czas przetworzenia: **8 sekund na fakturę**. Szczegóły stacku i porównanie z ręcznym workflow opisałem w [Live demo: agent AI przetwarza fakturę w 8 sekund](/artykuly/agent-ai-przetwarza-fakture-8-sekund/).

### 2. MJ.OLDAK Email — agent klasyfikacji i odpowiedzi

Podłączasz skrzynkę IMAP biura (tylko odczyt na start). Agent w nocy:

1. Czyta wiadomości z ostatnich 12 godzin
2. Klasyfikuje: pilne / normalne / FYI / spam
3. Dla typowych pytań ("czy dostali państwo fakturę?", "ile wyszło VATu?", "kiedy termin?") generuje **draft odpowiedzi w tonie Twojego biura** — uczony na próbce 50 Twoich wcześniejszych maili
4. Rano dostajesz zestawienie: kliknij "wyślij", "popraw", "odrzuć"

Nie wysyła sam. Nigdy. To świadoma decyzja — odpowiedzialność za wiadomość do klienta zostaje u człowieka. Więcej o filozofii tego agenta w [Agent AI, który obsługuje skrzynkę mailową biura rachunkowego](/artykuly/agent-skrzynka-mailowa-biura-rachunkowego/).

### 3. MJ.OLDAK Deadline — kalendarz podatkowy

Agent trzyma bazę Twoich klientów (NIP, forma opodatkowania, formy rozliczeń ZUS, VAT miesięczny/kwartalny, czy mają CIT-8, czy PIT-36). Na podstawie tego generuje kalendarz terminów i:

- **7 dni przed terminem** wysyła klientowi przypomnienie mailem (spersonalizowane — "Pani Anno, VAT-7 za maj do 25.06, proszę dosłać dokumenty do 20.06")
- **Po przekroczeniu terminu przez klienta** (brak dokumentów) pingu je z eskalacją
- **Tobie generuje poranny raport** — co dziś, co w tym tygodniu, kto się spóźnia

Stack: SQLite + cron + Claude do pisania maili. Działa w tle, Ty patrzysz rano.

### 4. MJ.OLDAK Reports — raporty miesięczne PDF

Większość systemów księgowych daje eksport. Mało który generuje raport, który klient rozumie.

Ten agent na koniec miesiąca:

1. Pobiera dane z Twojego systemu (API Optimy / wFirmy / eksport CSV)
2. Składa PDF z wykresami przychód/koszty/VAT, top kategorii kosztowych, porównaniem miesiąc do miesiąca
3. Dodaje krótkie **podsumowanie tekstowe** w ludzkim języku ("w maju Twoje koszty paliwa wzrosły o 18% względem kwietnia, głównie pozycje tankowań w dniach 14-22")
4. Wysyła klientowi mailem z Twojego biura

Klient dostaje coś, co rozumie. Ty nie musisz składać tego w Wordzie po godzinach.

## Cztery obiekcje, które słyszę najczęściej

Pokazałem te demo kilkunastu właścicielom biur. Te cztery pytania wracają za każdym razem.

### "A dane klientów? RODO?"

Dobre pytanie — i pierwsze, które sam zadaję klientom **zanim** pokażę demo.

Stack jest oparty na n8n (self-hosted na Azure) + Claude API + Azure Document Intelligence. Dane Twoich klientów:

- nie trafiają do żadnego "chmurowego SaaS-a agentowego" trzeciej firmy
- przechodzą przez infrastrukturę dedykowaną Tobie (własny tenant Azure albo dostępu Twój subscription)
- są obsługiwane przez Claude API **bez treningu modelu** (Anthropic kontraktowo nie trenuje na danych klientów API)

Podpisujemy DPA — jak z Comarch, jak z Microsoftem, jak z każdym innym dostawcą technologii, z którego już korzystasz. RODO Art. 28 stosujemy wprost: biuro jest procesorem wobec swoich klientów, ja jestem subprocesorem wobec biura. Jest opcja on-prem, jeśli zerowa chmura jest wymogiem.

**Dane Twoich klientów nie opuszczają Twojej infrastruktury. Kropka.**

### "Czy to znaczy, że zwolnię księgową?"

Nie. I nie dlatego, że jestem miły — tylko dlatego, że dane mówią co innego.

[McKinsey State of AI 2024](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) pokazał, że 78% firm używa AI w trybie **augmentacji** (wspomaga pracownika) a nie **wymiany**. [Randstad Polska 2025](https://www.randstad.pl/en/career-advice/trendy-rynku-pracy/fintechs-ai-revolution-how-machine-learning-shaping-future-finance/) w raporcie o AI w finansach pisze wprost: "AI handles data entry, invoicing, reconciliation — freeing professionals for strategic work".

Moje pytanie do właścicielki biura: kim chcesz, żeby była Twoja księgowa za 5 lat? Osobą, która przepisuje faktury szybciej od robota (nie da rady)? Czy osobą, która rozmawia z klientem, doradza w optymalizacji podatkowej, obsługuje nowe umowy, rozumie branżę klienta?

Ta druga rola jest bardziej wartościowa — dla klienta, dla biura, dla samej księgowej. AI robi pierwszą, żeby człowiek mógł robić drugą.

### "To za drogie dla mojego biura"

Policzmy konkretnie na Twoim biurze. Weź kartkę.

- Ile osób ma dostęp do faktur? _(np. 2)_
- Ile godzin tygodniowo każda z nich spędza na obsłudze faktur? _(szczerze — 15, 20?)_
- Jaka jest stawka godzinowa (brutto+ZUS pracodawcy)? _(60 zł?)_

2 × 18 × 60 zł = 2160 zł/tydzień. × 4 tygodnie = **8640 zł miesięcznie**.

Pakiet Starter MJ.OLDAK: 8 000 zł wdrożenia (raz) + 1 200 zł/mc (Claude API + n8n hosting + utrzymanie). Pakiet Pro (2-3 agenty): 18 000 zł + 2 500 zł/mc.

Nawet przy konserwatywnym założeniu (AI bierze 50% tej pracy, nie 80%) — ROI na samym module faktur to **pierwsze 2-3 miesiące**. Reszta to czysty zysk czasu i jakości.

Jeśli to wciąż za drogo, mam [Audyt AI za 3 500 zł](/cennik) — dostajesz analizę procesów + jedną działającą automatyzację w 2 tygodnie, bez zobowiązania do reszty.

### "Nie umiem IT, boję się że mi się zepsuje"

Czy rozumiesz technicznie, jak działa JPK_VAT w środku? Jak SOAP endpoint KSeF gada z Twoim systemem? Nie musisz. Wysyłasz i działa. To samo tutaj — ja konfiguruję, Ty klikasz "zatwierdź".

To model "fully managed". Utrzymuję stack, monitoruję integracje, aktualizuję gdy Claude wypuści nową wersję modelu. Masz jedno konto kontaktowe (moje), jedno SLA, jedną fakturę miesięcznie. Jeśli po 3 miesiącach nie siądzie — rozchodzimy się bez kary, dane i kod są Twoje (otwarty format n8n + Azure).

## Gdzie jesteśmy jako rynek

Kontekst liczbowy, bo lubię wiedzieć gdzie stoję:

- **GUS 2025:** 8,7% polskich firm deklaruje wykorzystanie AI
- **PARP 2024:** 94,1% wszystkich firm **nie** korzysta z AI
- **pracownicy.ai:** tylko 3,7-4% firm używa AI w fakturach
- **AI Chamber 2024:** 20% polskich MŚP widzi AI jako zagrożenie (Estonia: 6%)
- **Sharp Europe XII 2025** (N=250 polskich MŚP): 72,4% większe zaufanie do AI YoY

Polska jest sceptyczna, ale trend jest jednoznaczny. Biura rachunkowe są w tej konserwatywnej 94%, która nic nie wdrożyła. To nie zarzut — to opis. I okno, w którym wczesne biuro zyskuje realną przewagę, bo konkurencja śpi.

## Jak testować

Każde demo jest do odpalenia. Masz trzy ścieżki.

**1. Test sama, za darmo, dzisiaj.**
Wchodzisz na [mj-oldak.com/demo](https://mj-oldak.com/demo), wybierasz agenta, wrzucasz swój plik (faktura PDF, fragment skrzynki .mbox, lista terminów CSV — jak wygodnie). Widzisz output w przeglądarce. Nic nie instalujesz. Dane z demo są usuwane po 24h.

**2. Spotkanie 30 minut online.**
Pokażę live na Twoich danych (możesz przynieść 5 faktur z ostatniego miesiąca). Zero prezentacji slajdowej. [Umów przez kalendarz](/#kontakt) albo napisz na [contact@mj-oldak.com](mailto:contact@mj-oldak.com).

**3. Pilotaż 30 dni.**
Wdrażamy jeden moduł (najczęściej Invoice) na Twoim realnym volume. Po 30 dniach decydujesz: zostaje, rozbudowujemy do pełnego pakietu, albo się rozchodzimy. Koszt pilotażu: 1 500 zł, liczy się na poczet wdrożenia jeśli zostajesz.

## Najczęściej zadawane pytania

### Czy agent integruje się z moim systemem księgowym?

Tak, domyślnie obsługuję Comarch Optima (XML import), wFirma, Insert GT, Symfonia. Dla innych systemów (Saldeo, iFirma, Rachmistrz) robimy integrację indywidualnie — zwykle 2-5 dni roboczych dodatkowo.

### Co jeśli Claude/OpenAI podniesie ceny API?

Stack jest "model-agnostic". Mogę zmienić Claude Sonnet na GPT-4.1 albo lokalny Llama w tydzień. Koszt LLM to dziś 50-200 zł/mc dla typowego biura — nawet 3x wzrost nie wywraca ROI. Ale monitoruję ten rynek i Ty nie musisz.

### Ile trwa wdrożenie?

Audyt: 2 tygodnie. Starter (1 agent): 2-4 tygodnie od zatwierdzenia. Pro (2-3 agenty): 4-6 tygodni. Nie obiecuję "24h" — bo to kłamstwo w moim segmencie.

### Czy mogę zobaczyć referencje?

Tak, ale na razie mam **jedno wdrożenie produkcyjne** i kilka pilotaży. Jeśli chcesz porozmawiać z pierwszą klientką (biuro pod Poznaniem, 8 osób zespołu), umawiam bezpośredni telefon — za jej zgodą. Nie mam "setek case studies". Mam jedno, które działa.

### Co się stanie jak zrezygnuję?

Eksportujemy Twoje dane (CSV + backup bazy), oddajemy kod workflow (n8n open format) i konfigurację Azure. Nie ma "lock-in". Twoje dane są Twoje, nawet gdybym jutro zamknął firmę.

## Podsumowanie — i prośba

To jest premiera. Pierwsze cztery demo publiczne. Kilka tygodni testów z pierwszym biurem, tydzień polerowania, dzisiaj wychodzą na świat.

Wiem, że nie jest idealnie. Pierwsze osoby, które testują, są najcenniejsze — każdy feedback od prawdziwego użytkownika wart jest więcej niż godzina polerowania w odosobnieniu.

Jeśli prowadzisz biuro rachunkowe i czytasz to do końca — wejdź na demo. Wrzuć jedną fakturę. Powiedz mi co działa, a co nie. Zero presji. Jeśli nie wyjdzie — straciłaś 10 minut. Jeśli wyjdzie — porozmawiamy jak zbudować coś sensownego dla Twojego biura.

> Nie chcę sprzedać AI każdemu biuru w Polsce. Chcę, żeby 10 biur, które zdecydują się wcześnie, miało za rok spokojniejsze wieczory i więcej czasu na klientów.

[Testuj demo za darmo](https://mj-oldak.com/demo) albo [napisz bezpośrednio](/#kontakt). Jeśli potrzebujesz najpierw kontekstu, zacznij od [Czym jest agent AI — praktyczne wyjaśnienie](/artykuly/czym-jest-agent-ai-praktyczne-wyjasnienie/) albo [Case study: 4h dziennie do 20 minut](/artykuly/case-study-4h-dziennie-do-20-minut/).

Do usłyszenia.
