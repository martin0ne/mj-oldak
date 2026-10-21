// Pełne treści 6 case studies (wersja PL) — źródło prawdy: vault Atomic/AI-wiki,
// projects/Rekrutacja/case-studies/case-*.md (honesty pass 22.06).
//
// Architektura: moduł danych (nie content collection) + jeden generyczny route
// src/pages/portfolio/case/[slug].astro. Nowy case = nowy obiekt w tej tablicy,
// bez dotykania Astro i bez zmian w configu.
//
// Kolejność i numeracja (num) są takie same jak na stronie /portfolio (karty),
// żeby numer widoczny w portfolio zgadzał się z numerem na podstronie.

export const caseStudies = [
  {
    slug: 'agent-flow',
    num: '01',
    title: 'agent-flow',
    tagline: 'Wieloetapowy agent dokumentowy (ReAct) w jednym pliku Pythona',
    // Krótki wariant PL z vaultu (case-agent-flow.md → „Wariant krótki PL").
    lead: '"Agentic AI" to najgorętszy keyword ofert, ale większość przykładów to czarne skrzynki na frameworkach. Zbudowałem agenta odwrotnego: pętla ReAct (myśl → narzędzie → obserwacja → raport) w czytelnym, jednoplikowym Pythonie (agent.py ~225 + retrieval.py ~115 linii), do przejrzenia w 10 minut. Agent dostaje folder dokumentów i zadanie; sam planuje kroki (list/search/read), a raport końcowy ma cytat plik:linia przy każdym twierdzeniu. Human-in-the-loop gate: tryb --approve zatrzymuje każdą akcję do zatwierdzenia, a odrzucenie z feedbackiem steruje kolejnym krokiem agenta. Backend przez wymienną komendę CLI (AGENTFLOW_LLM_CMD), domyślnie Claude CLI. Pełna pętla testowalna bez API — deterministyczny mock-LLM odtwarza sekwencję akcji (5 testów: provenance, sandbox ścieżek, pełny przebieg). W repo realny run: agent poprawnie złożył odpowiedź z dwóch dokumentów polityki firmowej.',
    desc: 'Pętla myśl → narzędzie → obserwacja → raport, bez czarnej skrzynki frameworka. Agent sam planuje kroki na folderze dokumentów, a każde twierdzenie w raporcie ma cytat plik:linia. Tryb --approve zatrzymuje każdą akcję do zatwierdzenia, a odrzucenie z feedbackiem steruje kolejnym krokiem.',
    metric: '3 kroki do odpowiedzi · 5/5 testów bez API · ~340 linii',
    problem:
      'Trzeba pokazać (rekruterowi, klientowi, sobie), jak NAPRAWDĘ działa agent — pętla decyzyjna, narzędzia, ugruntowanie odpowiedzi, kontrola człowieka — bez ukrywania mechaniki za frameworkiem.',
    solution: [
      'Samodzielne repo z dwoma plikami: agent.py (pętla ReAct + dispatch narzędzi + approval gate + budżet kroków + naprawa niepoprawnego JSON) oraz retrieval.py (BM25 z provenance).',
      'Sandbox read_file — ścieżki nie wychodzą poza korpus dokumentów.',
      'Testy z mock-LLM: pełna pętla agentowa odtwarzana deterministycznie, bez klucza API i bez kosztów.',
      'Przykładowy korpus dokumentów i zapis realnego przebiegu w repo.',
      'Compose-check: orkiestrację WIELU agentów świadomie zostawiono narzędziom do tego zbudowanym — repo czyni czytelnym rozumienie JEDNEGO agenta.',
    ],
    stack: [
      'Python (agent.py ~225 linii, retrieval.py ~115 linii)',
      'Pętla ReAct — myśl → narzędzie → obserwacja → raport',
      'Retrieval BM25 z provenance plik:linia',
      'Approval gate (--approve) + budżet kroków',
      'Mock-LLM jako backend testowy',
      'Claude CLI jako domyślny backend (AGENTFLOW_LLM_CMD)',
    ],
    effect:
      'Realny run (examples/sample-report.md + trace): zadanie „kto podpisuje fakturę 60 000 PLN” → agent w 3 krokach połączył politykę fakturowania z matrycą delegacji i odpowiedział poprawnie (CFO + członek zarządu, joint sign-off) z cytatami. 5/5 testów green bez dostępu do API.',
    lessons: [
      'Budżet kroków + wymuszony finish zmieniają „agenta-spiralę researchu” w narzędzie, które zawsze coś oddaje.',
      'Mock-LLM jako backend testowy = pełna pętla agentowa w CI bez kosztów — wzorzec przenośny na każdy projekt agentic.',
    ],
    keywords: [
      'agentic AI',
      'ReAct / orchestration',
      'human-in-the-loop',
      'RAG / provenance',
      'prompt engineering',
      'testowanie systemów LLM',
      'Python',
    ],
    statusReady: [
      'Repozytorium publiczne — kod i testy do przejrzenia.',
      '5/5 testów przechodzi bez klucza API.',
      'Realny przebieg agenta zapisany w repo (przykładowy korpus + trace).',
    ],
    statusTodo: [
      'Orkiestracja wielu agentów celowo poza zakresem tego repo — to świadomy compose-check, nie brak.',
      'Testy używają mock-LLM; realny backend (Claude CLI) sprawdzany na realnym runie, nie w CI.',
    ],
    links: [
      {
        label: 'agent-flow ↗',
        url: 'https://github.com/martin0ne/agent-flow',
        external: true,
      },
    ],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'kb-rag',
    num: '02',
    title: 'kb-rag',
    tagline: 'Baza wiedzy z twardym provenance plik:linia, zero zależności',
    lead: 'Role AI wymagają „baz wiedzy / RAG dla agentów” — a typowe demo RAG to ciężki stack z bazą wektorową i płatnym API. Zbudowałem narzędzie odwrotne: retrieval BM25 w czystym Pythonie (zero zależności, zero kosztów), które indeksuje folder dokumentów projektu lub klienta i zwraca fragmenty z twardym provenance plik:linia. Generacją zajmuje się LLM w pętli agenta, związany regułą „odpowiadaj tylko z fragmentów, cytuj źródła, brak trafień = powiedz wprost”. Polska fleksja obsłużona dwukierunkowym prefix-matchingiem (przybliżona obsługa fleksji). Świadoma decyzja compose-vs-build: embeddingi odrzucone po analizie trade-offów dla małych, terminologicznych korpusów; architektura zostawia na nie miejsce. Przetestowane na realnej dokumentacji produkcyjnej (37 plików, 662 chunki).',
    desc: 'Retrieval BM25 w czystym Pythonie indeksuje folder dokumentów projektu i zwraca fragmenty z cytatem plik:linia. Generację przejmuje LLM w pętli, związany regułą „odpowiadaj wyłącznie ze źródeł, brak trafień = powiedz wprost”. Embeddingi odrzucone po analizie trade-offów dla małych, terminologicznych korpusów.',
    metric: '37 plików · 662 chunki · 0 zależności · 0 kosztów API',
    problem:
      'Pytania do dokumentacji projektu lub klienta wymagają odpowiedzi, którym można ufać — czyli z możliwością sprawdzenia źródła. LLM bez ugruntowania zmyśla; pełny stack RAG (baza wektorowa + embeddingi w API) to koszt i utrzymanie nieproporcjonalne do korpusu wielkości setek plików.',
    solution: [
      'Skill Claude Code ze skryptem kb_search.py — BM25 w czystym Pythonie, zero zależności.',
      'Chunking po nagłówkach markdown + cache indeksu z auto-odświeżaniem.',
      'Protokół użycia dla LLM: twarde reguły cytowania i uczciwego „NO MATCHES”.',
      'Polska fleksja — dwukierunkowy prefix-matching (przybliżona obsługa fleksji).',
      'Jawna granica architektoniczna: NIE dubluje RAG nad vaultem Obsidian (tam działa Smart Connections) — wynik compose-check przed budową.',
    ],
    stack: [
      'Python (zero zależności zewnętrznych)',
      'Retrieval BM25',
      'Chunking po nagłówkach markdown',
      'Cache indeksu z auto-odświeżaniem',
      'Prefix-matching dwukierunkowy (polska fleksja)',
      'Claude Code skill + LLM w pętli agenta',
    ],
    effect:
      'Zapytanie → top-k fragmentów z plik:start-end szybko, lokalnie, bez API. Testy na żywym korpusie: zapytania domenowe (JPK, terminy podatkowe) trafiały w właściwe dokumenty z odmianami fleksyjnymi; zapytanie spoza korpusu → uczciwe NO MATCHES.',
    lessons: [
      'RAG to wzorzec, nie stack — retrieval z provenance plus zdyscyplinowana generacja dają 90% wartości przy 5% złożoności.',
      'Compose-check przed budową złapał realną pułapkę (drugi RAG nad vaultem = wydmuszka).',
    ],
    keywords: [
      'RAG',
      'bazy wiedzy dla agentów',
      'retrieval / provenance',
      'prompt engineering (grounding rules)',
      'compose-vs-build',
      'Python',
    ],
    statusReady: [
      'Przetestowany na realnej dokumentacji produkcyjnej: 37 plików, 662 chunki.',
      'Zero zależności zewnętrznych, zero kosztów API.',
      'Opublikowany jako skill w repo claude-skills — kod i protokół użycia do przeczytania.',
    ],
    statusTodo: [
      'Embeddingi celowo odrzucone dla małych, terminologicznych korpusów — architektura zostawia na nie miejsce, ale ich nie używa.',
      'Fleksja polska obsłużona przybliżeniem (prefix matching), nie analizatorem morfologicznym.',
    ],
    links: [
      {
        label: 'claude-skills/kb-rag ↗',
        url: 'https://github.com/martin0ne/claude-skills/tree/main/skills/kb-rag',
        external: true,
      },
      {
        label: 'rag-lexical-vs-semantic ↗',
        url: 'https://github.com/martin0ne/rag-lexical-vs-semantic',
        external: true,
      },
    ],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'ocr-invoice-reader',
    num: '03',
    title: 'OCR Invoice Reader',
    tagline: 'Faktura PDF lub zdjęcie → dane strukturalne w kilkanaście sekund',
    lead: 'Biura rachunkowe ręcznie przepisują dane z faktur do systemów księgowych — praca powolna i błędogenna. Zbudowałem aplikację, która zamienia fakturę (PDF, skan, zdjęcie) na dane strukturalne w 5–15 sekund: dwustopniowy pipeline Azure Document Intelligence (OCR z confidence scores) + walidacja LLM przez Claude (CLI na subskrypcji Max; opcja Claude API / Gemini / OpenAI przez zmienną LLM_PROVIDER) — walidacja pól, normalizacja polskich znaków, normalizacja formatu NIP, z ręczną edycją human-in-the-loop i audit logiem (RODO, retencja 12 miesięcy). System eksportuje JSON i Excel (.xlsx) — jeden plik PDF/skan/foto, wielofakturowy PDF do 20 stron, masowy eksport wyników do Excela. Koszt: na Max LLM ~0 + Azure free tier → grosze; przy API ~6–8 gr/faktura wg szacunku w kodzie. Gotowy do pilotażu: Docker + Caddy (SSL), manual kliencki, wizard wdrożeniowy, dokumentacja RODO — bez automatycznych testów, przed pierwszym wdrożeniem.',
    desc: 'Dwustopniowy pipeline: Azure Document Intelligence (OCR z confidence scores) + walidacja pól przez LLM. Normalizacja polskich znaków i formatu NIP, ręczna edycja human-in-the-loop, audit log i retencja danych. Eksport do JSON i Excel. Gotowy do pilotażu: Docker, Caddy, wizard wdrożeniowy, dokumentacja RODO.',
    metric: '5–15 s na fakturę · wielofakturowy PDF do 20 stron · ~2,3k LoC',
    context:
      'Dla kogo: polskie biura rachunkowe. Rola: solo founder & builder — architektura, kod, dokumentacja, deployment.',
    problem:
      'Księgowa dostaje faktury w każdej formie (PDF z systemu, skan, zdjęcie z telefonu) i przepisuje dane ręcznie do programu księgowego. To praca powtarzalna, powolna i błędogenna — a błąd w NIP czy kwocie VAT kosztuje.',
    solution: [
      'Dwustopniowy pipeline: Azure Document Intelligence (prebuilt invoice model, confidence scores per pole) → walidacja LLM przez Claude (CLI na subskrypcji Max; opcja Claude API / Gemini / OpenAI przez zmienną LLM_PROVIDER) — normalizacja polskich znaków, normalizacja formatu NIP (usuwanie myślników/spacji, 10 cyfr), sanity-check kwot netto/VAT/brutto.',
      'Human-in-the-loop: każde pole edytowalne ręcznie; audit log z retencją 12 miesięcy (polityka prywatności + rotacja logów — wymóg RODO/audytu).',
      'Skala i eksport: jeden plik PDF/skan/foto na request, wielofakturowy PDF do 20 stron, masowy eksport wyników do Excela; eksport JSON i Excel (.xlsx).',
      'Wdrożeniowo: Docker Compose + Caddy (auto-SSL), wizard deploy-client.sh, manual kliencki PDF, integracja z Reporting Agent (auto-transfer danych do raportów).',
      'Roadmapa: JPK_FA (plik kontrolny do US) zaprojektowany w BRD (epic E3), niezbudowany — polska specyfika, której nie ma w zagranicznych SaaS.',
    ],
    stack: [
      'FastAPI (backend)',
      'Azure Document Intelligence (OCR, prebuilt invoice model)',
      'Walidacja LLM przez Claude CLI (Haiku) na subskrypcji Max; opcja Claude API / Gemini / OpenAI przez LLM_PROVIDER',
      'SQLite + SQLAlchemy',
      'Jinja2 + Tailwind + Alpine.js',
      'Docker + Caddy (auto-SSL)',
    ],
    effect:
      'Przetwarzanie 5–15 s na fakturę. Koszt: na subskrypcji Max LLM ~0 + Azure free tier (500 stron/mies.) → grosze; przy API ~6–8 gr/faktura wg szacunku w kodzie. Faktura w dowolnej formie → dane strukturalne bez ręcznego przepisywania.',
    lessons: [
      'Compose przed build: research wykazał, że open-source OCR (m.in. GLM-OCR) nie radzi sobie z polskim — gotowy model Azure + cienka warstwa LLM wygrywa z budową własnego.',
      'LLM jako walidator, nie ekstraktor: Claude nie czyta faktury od zera — sprawdza i normalizuje wynik OCR. Tańsze, szybsze i mniej halucynacji niż „wrzuć PDF w LLM”.',
    ],
    keywords: [
      'LLM w praktyce',
      'prompt engineering',
      'ocena zasadności (compose-vs-build)',
      'automatyzacja procesów',
      'human-in-the-loop',
      'RODO / compliance by design',
      'domena PL (księgowość, faktury)',
    ],
    statusReady: [
      'Gotowy do pilotażu: Docker Compose + Caddy, wizard wdrożeniowy, manual kliencki, dokumentacja RODO.',
      'Eksport JSON i Excel (.xlsx), masowy eksport wyników.',
      'Audit log z retencją 12 miesięcy i rotacją logów.',
    ],
    statusTodo: [
      'Bez automatycznych testów.',
      'Przed pierwszym wdrożeniem komercyjnym — strategia: pilot za darmo jako referencja.',
      'JPK_FA zaprojektowany w BRD (epic E3), niezbudowany.',
    ],
    links: [
      { label: 'Demo OCR ↗', url: '/demy/#ocr', external: false },
    ],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'deadline-agent',
    num: '04',
    title: 'Deadline Agent',
    tagline: 'Polski kalendarz podatkowy jako system przypomnień',
    lead: 'Biuro rachunkowe pilnuje terminów podatkowych dla setek klientów naraz — VAT-7, PIT-5, CIT-8, ZUS, JPK_VAT to 30+ terminów rocznie, każdy z konsekwencjami przy spóźnieniu. Zbudowałem system, który koduje polski kalendarz podatkowy: dashboard pokazuje nadchodzące terminy (horyzont 30 dni), pracownik klika i generuje spersonalizowane szkice przypomnień per klient i per forma prawna. Trzy tryby wysyłki (od „pracownik kopiuje szkic” po tryb Gmail API (OAuth)), import klientów z CSV, historia przypomnień jako audit trail. Integrację statusu KSeF per klient przez polski SDK ksef2 mam zaplanowaną w roadmapie. Domena polskiego podatku zakodowana w produkt — tego nie ma w żadnym zagranicznym narzędziu. Działający MVP, przed pierwszym pilotem.',
    desc: 'Biura rachunkowe pilnują VAT-7, PIT-5, CIT-8, ZUS i JPK_VAT dla setek klientów naraz. Agent prowadzi matrycę terminów i mówi wprost: „25.04 — VAT-7 dotyczy 15 klientów”. Pracownik klika i szkic przypomnienia jest gotowy. Audit trail odpowiada w sekundę na pytanie, czy klient dostał przypomnienie.',
    metric: '30+ terminów rocznie · dashboard per klient · szkic w 1 klik · ~980 LoC',
    context:
      'Dla kogo: polskie biura rachunkowe. Rola: solo founder & builder.',
    problem:
      'Setki klientów × różne formy prawne × 30+ terminów rocznie = matryca, której nie da się pilnować ręcznie. Spóźniony VAT czy ZUS to odsetki i odpowiedzialność — a klient ma pretensje do biura.',
    solution: [
      'Kalendarz podatkowy PL jako kod: VAT-7/VAT-7K, PIT-5, PIT-36/37, CIT-8, ZUS (JDG + pracodawca), JPK_VAT — z arytmetyką dat i flagą „urgent” dla terminów w ciągu 5 dni.',
      'Dashboard: dla każdego terminu w horyzoncie 30 dni pokazuje nadchodzące zobowiązania; pracownik klika i generuje szkic przypomnienia per klient (forma prawna decyduje, które terminy dotyczą).',
      'Trzy tryby wysyłki o rosnącej automatyzacji: text (pracownik kopiuje szkic), smtp, gmail (tryb Gmail API, OAuth) — biuro wybiera poziom kontroli.',
      'Audit trail: historia przypomnień per klient („wysłane czy nie”) + RODO purge.',
      'Import klientów z CSV.',
    ],
    stack: [
      'FastAPI',
      'SQLite + SQLAlchemy',
      'Jinja2 + Tailwind + Alpine.js',
      'SDK ksef2 (integracja w roadmapie)',
      'Gmail API (OAuth) jako najwyższy tryb wysyłki',
    ],
    effect:
      'Zamiast ręcznego śledzenia matrycy terminów: dashboard mówi „25.04 — VAT-7 dotyczy 15 klientów”, pracownik klika i szkic gotowy. Audit trail odpowiada na pytanie „czy klient X dostał przypomnienie” w sekundę.',
    lessons: [
      'Wiedza domenowa to fosa: polski kalendarz podatkowy zakodowany w produkt jest trudniejszy do skopiowania niż jakikolwiek kod — OSS-integrator wygrywa tam, gdzie dokłada lokalną domenę, której nie ma w OSS.',
      'Automatyzacja stopniowana: tryby text→smtp→gmail pozwalają biuru zacząć od pełnej kontroli i oddawać ją w tempie zaufania — to samo odkrycie co human-in-the-loop w Email Assistant, od strony procesu.',
    ],
    keywords: [
      'automatyzacja procesów',
      'audyt procesów / ocena zasadności',
      'domain expertise (KSeF, JPK, polski compliance)',
      'RODO',
      'compose-vs-build (OSS SDK)',
    ],
    statusReady: [
      'Działający MVP z manualem klienckim.',
      'Kalendarz podatkowy PL zakodowany: VAT-7/VAT-7K, PIT-5, PIT-36/37, CIT-8, ZUS, JPK_VAT.',
      'Dashboard z horyzontem 30 dni, tryby wysyłki text/smtp/gmail, import CSV, audit trail + RODO purge.',
    ],
    statusTodo: [
      'Przed pierwszym pilotem.',
      'Integracja statusu KSeF per klient (przez ksef2) w roadmapie — scaffold gotowy, pełna integracja po pierwszym pilocie.',
      'Interaktywne demo wycofane ze strony (mobile); dostępne na rozmowę.',
    ],
    links: [{ label: 'Dema ↗', url: '/demy/', external: false }],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'email-assistant',
    num: '05',
    title: 'Email Assistant',
    tagline: 'Audyt service design własnego produktu AI — z werdyktem go/no-go',
    lead: 'Zbudowałem asystenta maili dla biur rachunkowych (klasyfikacja + szkic odpowiedzi przez LLM, human-in-the-loop), a potem zrobiłem na nim audyt service design z warstwą aktora AI — i wprost orzekłem, że w obecnym stanie NIE jest gotowy na wdrożenie u klienta. Mocny filar: człowiek-przy-spuście jest realny (zero auto-send, każdy mail czeka na zatwierdzenie). Ale audyt kodu pokazał trzy rzeczy do naprawy przed pilotem: brak sygnału pewności AI (ryzyko „rubber-stamp” — pracownik zatwierdza w ciemno), pełna treść maila trafia do zewnętrznego LLM bez maskowania PII ani umowy powierzenia, i awaria wysyłki potrafi pokazać się jako sukces. Wartość tej pracy to nie „działa, super”, lecz umiejętność oceny zasadności wdrożenia AI i powiedzenia, czego brakuje — dokładnie to, czego szukają role AI adoption / BA.',
    desc: 'Zbudowałem asystenta maili dla biur rachunkowych (klasyfikacja + szkic odpowiedzi, human-in-the-loop), a potem zrobiłem na nim audyt service design z warstwą aktora AI i wydałem werdykt: wdrożyć czy nie. Case dowodzi oceny zasadności, nie tylko umiejętności budowania.',
    metric: 'Wariant, który nie wypalił: 4 kategorie, zero wysyłki bez człowieka · ~3,9k LoC',
    context:
      'Dla kogo: polskie biura rachunkowe. Rola: solo founder & builder — autor produktu ORAZ autor krytycznego audytu nad nim. Metoda: AI-augmented service blueprint (Shostack + warstwa aktora AI) + adwersaryjna weryfikacja (3 niezależni „sceptycy” sprawdzali każde twierdzenie wobec kodu).',
    problem:
      '„Człowiek w pętli” to nie to samo co „zaprojektowany human-in-the-loop”. Pytanie biznesowe: czy ten produkt można w obecnym stanie wdrożyć u biura — które jest administratorem danych podatkowych osób trzecich?',
    solution: [
      'Filar realny: zero auto-send — worker IMAP nigdy nie wysyła, każdy mail ma status pending, wysyłka tylko po jawnym zatwierdzeniu, guard przeciw podwójnej wysyłce. To prawdziwy human-in-the-loop.',
      'Brak sygnału pewności AI: klasyfikacja i szkic nie mają confidence; UI pozwala zatwierdzić jednym klikiem bez czytania → ryzyko „rubber-stamp” (pracownik akceptuje w ciemno; degeneracja zaufania).',
      'Luka RODO: pełna treść maila (możliwe NIP/PESEL/kwoty) trafia do zewnętrznego LLM bez maskowania; brak umowy powierzenia, brak zaprojektowanej retencji (jest tylko ręczne kasowanie konta, nie polityka 30 dni).',
      'Maskowanie awarii: gdy wysyłka SMTP padnie, status potrafi pokazać „gotowy do wysyłki” — system udaje sukces.',
    ],
    stack: [
      'FastAPI',
      'LLM provider-agnostic (Claude CLI / Anthropic / Gemini / OpenAI — jedna zmienna env)',
      'IMAP + SMTP',
      'SQLite + SQLAlchemy',
      'Jinja2 + Tailwind + Alpine.js',
    ],
    effect:
      'Werdykt (go/no-go): NIE pilot-ready bez warstwy compliance (maskowanie PII / umowa powierzenia / disclosure „odpowiedź wspierana AI”) i sygnału pewności AI. Mocny szkielet HITL — ale to za mało, by oddać go biuru z danymi klientów. Wariant pokazany publicznie w demo: 4 kategorie, zero wysyłki bez człowieka.',
    lessons: [
      '„HITL obecny” ≠ „HITL zaprojektowany”. Twardy gate tu jest twardy, bo nikt nie dopisał auto-send — nie ma inwariantu broniącego człowieka; bez sygnału pewności i przy zatwierdzaniu jednym klikiem to architektura rubber-stampu.',
      'Audyt własnego produktu = sygnał osądu. Junior chwali swój produkt; potrafić powiedzieć „mój własny produkt NIE jest gotowy i oto czemu” to dojrzałość, której szukają role AI adoption.',
    ],
    keywords: [
      'ocena zasadności wdrożeń AI',
      'audyt procesów AI',
      'go/no-go wdrożenia',
      'human-in-the-loop / HITL governance',
      'RODO / przetwarzanie danych',
      'AI adoption',
      'LLM w praktyce',
      'translacja tech ↔ ryzyko biznesowe',
    ],
    statusReady: [
      'Zero auto-send: każdy mail ma status pending, wysyłka tylko po jawnym zatwierdzeniu.',
      'Guard przeciw podwójnej wysyłce.',
      'Pełny blueprint i kontrast OCR ↔ email dostępne w portfolio.',
      'Wariant publicznie pokazany w demo.',
    ],
    statusTodo: [
      'Brak sygnału pewności AI — ryzyko rubber-stamp.',
      'Brak maskowania PII, brak umowy powierzenia, brak zaprojektowanej retencji.',
      'Awaria wysyłki potrafi pokazać się jako sukces — do naprawy przed pilotem.',
      'Werdykt: NIE pilot-ready w obecnym stanie.',
    ],
    links: [{ label: 'Demo ↗', url: '/demy/#email', external: false }],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'reporting-agent',
    num: '06',
    title: 'Reporting Agent',
    tagline: 'Miesięczny raport finansowy — z kosztu biura w jego produkt',
    lead: 'Raport miesięczny dla klienta biura rachunkowego to ręczne zestawianie przychodów, kosztów i VAT — i mało kto robi to dobrze wizualnie. Zbudowałem generator, który z danych (CSV/TSV/JSON; format JSON zgodny z wyjściem mojego OCR Invoice Reader — kompatybilność, nie zintegrowany pipeline) tworzy brandowany PDF z kluczowymi wskaźnikami: przychody, koszty, bilans VAT, liczba dokumentów, podsumowanie i 3–5 insightów pisanych przez LLM (anomalie, trendy — zawsze do review przez człowieka) plus gotowy szkic maila do klienta. Polskie znaki rozwiązane na poziomie fontów (DejaVu Sans w fpdf2). Docker, manual kliencki. Przed pierwszym pilotem.',
    desc: 'Generator raportu z danych CSV (Optima, InsERT) zamiast ręcznego zestawiania przychodów, kosztów i VAT. Wynik to brandowany PDF dla klienta końcowego plus krótki review. Raport przestaje być kosztem biura, a staje się jego produktem.',
    metric: 'CSV → brandowany PDF + review zamiast ręcznego składania · ~770 LoC',
    context:
      'Dla kogo: polskie biura rachunkowe. Rola: solo founder & builder.',
    problem:
      'Klient biura chce wiedzieć „jak stoi firma”, a biuro ma na to ręczne zestawienia w Excelu — czasochłonne, nieatrakcyjne i odkładane na koniec miesiąca. Raport, który mógłby być wartością dodaną biura, jest jego kosztem.',
    solution: [
      'Źródła danych: przyjmuje CSV/TSV/JSON; format JSON jest zgodny z wyjściem OCR Invoice Reader (kompatybilność, nie zintegrowany pipeline).',
      'PDF z warstwą AI: kluczowe wskaźniki (przychody, koszty, bilans VAT, liczba dokumentów), podsumowanie i insighty generowane przez LLM — zawsze do review, bo insighty mogą halucynować; szkic maila do klienta w komplecie.',
      'Jeden uniwersalny szablon PDF ze stałym brandingiem MJO Systems.',
      'Polskie znaki rozwiązane na poziomie fontów (DejaVu Sans w fpdf2), nie transliteracją.',
    ],
    stack: [
      'FastAPI',
      'fpdf2 + DejaVu Sans (polskie znaki w PDF)',
      'Claude API / provider-agnostic LLM (podsumowania + insighty)',
      'SQLite + SQLAlchemy',
      'Docker',
    ],
    effect:
      'Wygenerowany brandowany PDF + krótki review zamiast ręcznego składania zestawień; raport zmienia się z kosztu biura w jego produkt (PDF dla klienta końcowego).',
    lessons: [
      'LLM-insighty wymagają bramki człowieka — wartość jest realna (anomalie, trendy), ale bez review to ryzyko reputacyjne dla biura; projektować „AI proponuje, człowiek firmuje”.',
      'Detale lokalizacji są produktem: polskie znaki w generowanym PDF (fonty, nie transliteracja) to różnica między „demo” a „można wysłać klientowi”.',
    ],
    keywords: [
      'LLM w praktyce',
      'automatyzacja raportowania',
      'translacja tech → biznes (raport jako produkt biura)',
      'human-in-the-loop',
      'prompt engineering',
      'integracje (CSV/JSON)',
    ],
    statusReady: [
      'Generator z manualem klienckim, wdrożenie Docker.',
      'Brandowany PDF z KPI, insightami LLM i szkicem maila do klienta.',
      'Polskie znaki w PDF rozwiązane na poziomie fontów.',
    ],
    statusTodo: [
      'Przed pierwszym pilotem.',
      'Direct API do programów księgowych (Optima, InsERT) w roadmapie — na razie export do CSV.',
      'Kompatybilność formatu z OCR Invoice Reader, ale pipeline niezintegrowany.',
    ],
    links: [{ label: 'Demo ↗', url: '/demy/#reporting', external: false }],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },
];

// Nawigacja poprzedni / następny (kolejność jak na stronie /portfolio).
export const caseStudiesWithNeighbours = caseStudies.map((c, i) => ({
  ...c,
  prev: i > 0 ? caseStudies[i - 1] : null,
  next: i < caseStudies.length - 1 ? caseStudies[i + 1] : null,
}));

export function getCaseBySlug(slug) {
  return caseStudies.find((c) => c.slug === slug) ?? null;
}
