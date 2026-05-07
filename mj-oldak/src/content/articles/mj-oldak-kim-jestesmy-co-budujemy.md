---
title: "MJ.OLDAK — kim jesteśmy, co budujemy, dla kogo polskich biur rachunkowych"
slug: "mj-oldak-kim-jestesmy-co-budujemy"
excerpt: "Mała agencja AI z Wrocławia. 4 produkty Phase 1 dla biur rachunkowych. Pilot za darmo, klient ma własność kodu, RODO compliant. Zero hype'u, Polish realities first."
publishedAt: 2026-05-11
author: "Marcin Ołdak"
category: "edukacja"
tags: ["biuro-rachunkowe", "automatyzacja", "compliance"]
cover: "/articles/covers/mj-oldak-kim-jestesmy-co-budujemy.jpg"
coverAlt: "MJ.OLDAK - agencja AI dla polskich biur rachunkowych - cover"
readingTime: 12
featured: true
draft: true
metaTitle: "MJ.OLDAK — Agencja AI dla biur rachunkowych w Polsce | Wrocław"
metaDescription: "MJ.OLDAK buduje agentów AI dla polskich biur rachunkowych. 4 produkty: OCR faktur, email assistant, deadline tracker, raporty. Pilot za darmo, RODO compliant."
keywords: ["MJ.OLDAK", "agencja AI Wrocław", "AI biuro rachunkowe", "automatyzacja księgowości Polska", "agent AI księgowość", "KSeF AI", "OCR faktur biuro rachunkowe"]
---

W Polsce działa około **70 000 biur rachunkowych**, obsługiwanych przez około 400 000 księgowych. To rynek pod ogromną presją regulacyjną — KSeF jest obowiązkowy od 1 kwietnia 2026, kary startują 1 stycznia 2027. Według Rzeczpospolitej pro **74% biur miało problemy operacyjne w pierwszym miesiącu KSeF**. Tylko 3,5% było w pełni przygotowanych.

Jednocześnie Polska jest na **przedostatnim miejscu w UE pod względem adopcji AI w firmach** (8,36% w 2025, dane Eurostat). Średnia unijna to 20%. Ta luka rośnie.

Ten artykuł to nasza odpowiedź na pytanie: **kim jesteśmy, co budujemy i dlaczego akurat dla biur rachunkowych w Polsce**.

## Marcin Ołdak — od vibe codera do agency buildera

Mam 25 lat. Studiuję zarządzanie i HR we Wrocławiu (licencjat broniony w czerwcu 2026). Wcześniej 3,5 roku w korpo na stanowiskach IT — programowanie, architektura, zarządzanie projektami. Plus 10 lat amatorskiego programowania od liceum.

Jestem **vibe coderem** — nie piszę kodu manualnie, tylko współpracuję z AI (Claude Opus 4.7 w trybie Claude Code). Moje umiejętności techniczne są umiarkowane — rozumiem architekturę, znam terminal, git, npm. Nie jestem tradycyjnym developerem.

Ale właśnie to jest atutem przy budowaniu MJ.OLDAK. **W 2026 roku każdy może zbudować software z AI** — wąskim gardłem nie jest już kod, tylko zrozumienie problemu klienta. A żeby zrozumieć problem polskiego biura rachunkowego, trzeba znać polskie realia: KSeF, JPK, Optima, Symfonia, Comarch, Wolters Kluwer, Fillup K24, RODO, AI Act.

### Dlaczego AI dla biur rachunkowych (a nie generic SaaS)?

Trzy powody:

1. **Strukturalna presja regulacyjna**. KSeF od 04.2026 wytworzył pierwszy w historii polskiego systemu podatkowego **w pełni cyfrowy, standaryzowany strumień danych**. Faktura w XML schema FA(3) to fundament, na którym agenci AI mogą działać bez budowania własnych integracji. Era post-KSeF to moment zwrotny — biura dostają jednolity input.

2. **Niedostatek narzędzi szytych na miarę**. Comarch i SaldeoSMART to **platformy** — nie wdrożyciele. autoMEE/flowMEE celuje w SaaS dla małych firm. **Mała agencja AI może wejść w lukę „wdrożyciela i integratora"** — roli, którą tradycyjnie pełniły firmy IT przy wdrożeniach ERP, ale dostosowanej do AI i KSeF.

3. **Niska adopcja AI w Polsce = niski próg wejścia**. 23% polskich firm aktywnie korzysta z AI (PARP/UJ BKL 2026). 64% pozostaje niezdecydowanych. To nie znaczy że jesteśmy zacofani — to znaczy że biura rachunkowe **wiedzą, że powinny wdrożyć AI, ale nie wiedzą jak**.

W tej luce żyje MJ.OLDAK.

## Co budujemy — 4 produkty Phase 1

W Phase 1 (maj 2026 → po pierwszych pilotach) skupiamy się na czterech konkretnych pain pointach polskiego biura rachunkowego.

### OCR Invoice Reader — faktura PDF/zdjęcie → strukturalne dane

**Problem:** typowe biuro 50-klientowe przetwarza 100-200 faktur miesięcznie. Każda zajmuje 2-3 minuty manualnego wpisywania. To 5-8 godzin tygodniowo na samo wpisywanie — bez analizy, bez kontaktu z klientem.

**Co robi nasz agent:** czyta fakturę (PDF lub zdjęcie), wyciąga dane strukturalne (sprzedawca, NIP, pozycje, VAT), waliduje NIP w GUS API, sprawdza schemat FA(3) zgodność. Jeśli wszystko OK → oznacza do zatwierdzenia. Jeśli niezgodność → eskaluje do księgowego z flagą i kontekstem.

**Skuteczność realna:** nowoczesne systemy OCR+AI osiągają 98-99,5% dokładności na polach nagłówkowych dla standardowych faktur. Dla trudnych skanów ~92-95%. Błędy na poziomie linii itemów wymagają nadzoru człowieka. **Zawsze.** To nie jest „magic black box" — to przyspieszenie z ludzką weryfikacją.

**Architektura:** ReAct + RAG (historia dekretacji) + narzędzia: OCR API, GUS API, FK API.

### Email Assistant — klasyfikacja + szkice + Gmail/Outlook

**Problem:** skrzynka `biuro@` dostaje 100-200 e-maili dziennie. Faktury, pytania klientów, potwierdzenia płatności, prośby o terminy. Sortowanie zajmuje 1-2 godziny.

**Co robi:** klasyfikuje intencję (faktura / pytanie o termin / prośba o raport / pilna sprawa). Faktury → pasuje do OCR Invoice Reader. Pytania o terminy → odpowiada automatycznie z bazy wiedzy. Pilne sprawy → eskaluje do księgowego z pełnym kontekstem.

**Ważne:** agent **nie wysyła samodzielnie** komunikatów zawierających poradę podatkową. Każda odpowiedź wymaga zatwierdzenia przez licencjonowanego księgowego. To nie tylko etyka — to obowiązek z AI Act (transparency, art. 50).

### Deadline Agent — KSeF, JPK, VAT calendar dla 100+ klientów

**Problem:** biuro obsługuje 150 klientów z różnymi formami prawnymi. JPK_V7M/K, CIT, PIT, ZUS, KSeF, nowy JPK_CIT — każdy klient ma inny zestaw obowiązków. Ręczne śledzenie = ryzyko kar.

**Co robi:** przechowuje profil każdego klienta (NIP, forma prawna, rozliczenie VAT). Na 14, 7 i 3 dni przed każdym terminem generuje listę z nadchodzącymi obowiązkami. Sprawdza, czy plik został przesłany. Jeśli brak — automatycznie przypomina klientowi (zatwierdzone szablony) i alarmuje księgowego.

**Kontekst 2026:** od 1 lutego 2026 w JPK_V7 obowiązkowy jest numer KSeF (NrKSeF). Od 2026 JPK_CIT obowiązuje podatników CIT przesyłających JPK_VAT. Deadline Agent zna te zmiany.

### Reporting Agent — raporty klientowskie z FK

**Problem:** przygotowanie miesięcznego raportu (P&L, bilans, cash flow, komentarz zarządczy) zajmuje 4-8 godzin. Klienci oczekują raportów do 10. dnia miesiąca.

**Co robi:** pobiera dane z systemu FK, oblicza wskaźniki (rentowność, płynność, rotacja należności), porównuje z poprzednim okresem, generuje narrację komentarza. **Wersja draft** trafia do weryfikacji przez starszego księgowego — nigdy bezpośrednio do klienta.

**Cykl raportowania skraca się z 5 dni do kilku godzin.** Ale narracja komentarza zarządczego wymaga obowiązkowego przeglądu człowieka — halucynacje przy wyjaśnianiu przyczyn odchyleń są realnym ryzykiem (więcej w naszym artykule [„Czym jest agent AI? Praktyczne wyjaśnienie dla księgowego"](/artykuly/czym-jest-agent-ai-dla-ksiegowego/)).

## 3 zasady, według których pracujemy

Te trzy zasady to nie marketing — to operacyjny filtr każdej decyzji w MJ.OLDAK.

### Human in the loop > full automation

Każdy z naszych agentów ma **gate decyzji ludzkiej** w ścieżce krytycznej. Faktura nie trafia do księgi bez akceptacji księgowego. Mail nie wychodzi do klienta bez weryfikacji. Raport nie trafia do zarządu bez przeglądu.

**Dlaczego:** biuro rachunkowe odpowiada za klienta — compliance, audyt, doradztwo. Full automation = transfer odpowiedzialności na AI. To NIE jest możliwe pod AI Act art. 26 (deployer responsibility) i pod RODO. Plus klient biura oczekuje, że za jego sprawami stoi człowiek z certyfikatem MF, nie black box.

To nie ogranicza efektywności. To **chroni przed katastrofą**, kiedy AI halucynuje stawkę VAT albo wymyśla nieistniejący przepis. Zdarza się — nawet najlepsze modele mają 2-13% rate halucynacji w domenach finansowych.

### Polish realities first

Generic AI tools z USA nie rozumieją:
- KSeF schema FA(3)
- Split payment (mechanizm podzielonej płatności)
- JPK_V7M/K(3) z numerem NrKSeF
- Optima / Symfonia / Comarch ERP integration realities
- RODO + AI Act łącznie (nie jako alternatywę)
- Polskie kody GTU
- Ulgę na start, mały ZUS plus, IP-Box, B+R

My budujemy z **Polish-first** mindset. Pierwsza integracja zawsze do polskiego systemu (Optima, Symfonia, Comarch). Pierwszy język to polski. Pierwsze regulacje to polskie.

To NIE jest peacetime patriotyzm. To jest pragmatyzm: **klient z biurem rachunkowym we Wrocławiu nie kupi narzędzia, które nie zna NrKSeF**. Konkurencja zna. My musimy wiedzieć więcej.

### Klient ma własność kodu

W standardowym SaaS klient płaci miesiąc za dostęp. Jeśli rezygnuje, traci wszystko — dane, configs, workflow. Lock-in jako model biznesowy.

W MJ.OLDAK kod, który wdrażamy u klienta, **jest jego własnością**. Po pilocie i okresie wdrożenia klient ma:
- Pełen dostęp do kodu (z dokumentacją)
- Konfigurację dostosowaną do jego workflow
- Możliwość zatrudnienia innego dewelopera do dalszego rozwoju
- Brak miesięcznego lock-in

Dlaczego? Bo **biuro rachunkowe operuje na wrażliwych danych klientów**. Klient nigdy nie zostaje uzależniony od pojedynczego dostawcy — kod jest jego własnością od dnia 1.

## Jak wygląda współpraca

### Pilot za darmo (4 tygodnie, bez zobowiązań)

W Phase 1 oferujemy pierwszym 5-7 biurom rachunkowym **darmowy pilot 4-tygodniowy**:

- **Tydzień 1 — Discovery.** Spotykamy się 60 minut, mapujemy workflow biura. Identyfikujemy najmocniejszy pain point. NIE pokazujemy demo. Słuchamy.
- **Tydzień 2 — Setup.** Konfigurujemy wybrany agent (OCR / Email / Deadline / Reporting) z integracją do Twojego systemu (Optima / Symfonia / Comarch). Bezpłatnie.
- **Tydzień 3 — Real use.** Twoja ekipa testuje agenta na realnych zadaniach. My monitorujemy, iterujemy, dostosowujemy.
- **Tydzień 4 — Ewaluacja.** Mierzymy konkretne metryki: zaoszczędzone godziny, wyeliminowane błędy. Decyzja: kontynuujemy → cennik. Albo: kończymy → zachowujesz konfigurację bez kosztu.

Co dostajesz, jeśli kończymy: **wszystko, co skonfigurowaliśmy**. Bez ukrytych kosztów, bez „free trial który zamienia się w subskrypcję bez ostrzeżenia".

### Co dostajesz po 3 miesiącach (jeśli kontynuujemy)

- 1 agent w pełni zintegrowany z Twoim systemem
- Dokumentacja workflow + kod
- Onboarding zespołu (2-4 godziny szkolenia)
- AI Literacy training dla pracowników (zgodnie z art. 4 AI Act — obowiązek od lutego 2025)
- Bi-weekly review call (30 min) na iteracje
- Email/Slack support `<24h` response
- Reference rights (case study, testimonial — opcjonalnie)

Cennik post-pilot ustalamy indywidualnie po ewaluacji w Twoim biurze. Modele dostosowane do skali: pakiet podstawowy, pricing per liczba klientów biura, lub results-based (godziny zaoszczędzone × stawka). Konkretny model wybiera się po pierwszych 4 tygodniach — gdy znamy realny zakres pracy.

## Pierwszy pilot — kogo szukamy

Rekrutujemy **5-7 biur partnerów pilotowych** z Wrocławia i okolic na pierwsze 4-tygodniowe wdrożenia. Profil idealnego pilota:

- Biuro 5-30 pracowników, 50-200 klientów
- Konkretny pain point (faktury / KSeF / email / raporty) — nie „chcemy AI ogólnie"
- Otwartość na iteracyjne wdrożenie + 1 godzinny call w tygodniu
- Zgoda na case study po zakończeniu pilota (anonimizacja klientów OK)

Co dostajesz w zamian: konfiguracja jednego agenta zintegrowanego z Twoim systemem, double-check security + compliance, dokumentacja kodu i konfiguracji jako Twoja własność.

## Specjalizacja, którą wybraliśmy

**Robimy:**
- Wdrożenia AI dla polskich biur rachunkowych — KSeF + Optima/Symfonia/Comarch + RODO + AI Act compliance
- Konfigurację agentów AI dostosowaną do specyfiki klientów Twojego biura
- Kod jako własność klienta — brak lock-in

**NIE robimy:**
- Licencji SaaS per user
- Obietnic „pełnej automatyzacji bez Twojego udziału"
- Konkurowania z Comarch / SaldeoSMART na polu produktu — to walka z platformą dystrybucji
- Generic AI consulting bez integracji z polskim stackiem księgowym

## Pierwszy kontakt

Jeśli jesteś z biura rachunkowego i któryś z czterech pain pointów (faktury / email / deadliny / raporty) zabija Ci tydzień — wypełnij formularz [na stronie głównej](/#kontakt) lub napisz [biuro@mjoldak.pl](mailto:biuro@mjoldak.pl).

Pierwszy call jest darmowy, 15 minut, **bez prezentacji slajdów**. Pytamy, co robisz, gdzie boli. Jeśli mamy fit → ustalamy pilot. Jeśli nie → polecamy kogoś, kto pasuje lepiej (np. SaldeoSMART, Comarch built-in, autoMEE).

Polecamy konkurencję, kiedy widzimy że pasuje lepiej. Bo **wartime = uczciwość ponad sprzedażą**. Klient, który dostaje od nas „tu lepiej pasuje X" zamiast desperackiej oferty, wraca za rok kiedy Y.

## FAQ

**Czy moje dane będą bezpieczne?**

Tak. RODO compliant od pierwszej linii kodu. Dane klientów Twojego biura zostają u Ciebie (offline-first dla OCR), API providers (Anthropic/OpenAI) mają DPA podpisane. AI Act compliance: pełen inwentarz systemów, polityka AI, AI Literacy szkolenie zespołu (więcej: nasz artykuł [„AI Act 2026 — co polskie biura rachunkowe muszą wiedzieć"](/artykuly/ai-act-2026-biuro-rachunkowe-compliance/)).

**Ile to kosztuje?**

Pilot 4-tygodniowy: **0 PLN**. Cennik post-pilot ustalamy indywidualnie po pierwszej walidacji u Ciebie.

**Jak długo trwa wdrożenie?**

Standardowy agent: 4 tygodnie pilot + 2-4 tygodnie production deployment. Custom features: indywidualnie.

**Z jakimi systemami integrujecie?**

Phase 1: Optima, Symfonia, Comarch (priorytet). Phase 2 (po pierwszych pilotach): Sage, enova365, WAPRO, custom integrations.

**Co, jeśli wybiorę pilot i pójdzie źle?**

Zachowujesz konfigurację bez kosztu. My zachowujemy honest feedback (dla nas to złoto). Kończymy z friend status — być może wrócisz za rok, gdy potrzebujesz innego agenta.

**Z jakimi modelami AI pracujecie?**

Domyślnie **Claude Sonnet 4.6** (Anthropic) — najlepszy w polskim do treści i agentów. **Claude Haiku** dla tanich zadań masowych (klasyfikacja, ekstrakcja). Gdy klient wymaga **lokalizacji danych w Polsce/EU** — generic open-source (Llama 4, Qwen 3.5, Mistral) na Ollamie lub OVH AI Endpoints (Francja, GDPR-friendly). Stawiamy na **skalowalność i sprawdzoną jakość**, NIE eksperymenty. Więcej w artykule [„LLM, RAG, Prompt Engineering — minimum techniczne dla decyzji biznesowej"](/artykuly/llm-rag-prompt-engineering-msp/).

---

**Marcin Ołdak**, MJ.OLDAK
[biuro@mjoldak.pl](mailto:biuro@mjoldak.pl) | Wrocław, Polska

[Powrót do artykułów →](/artykuly/)
