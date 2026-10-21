// Full English content of the 6 case studies — English mirror of src/data/case-studies.js.
//
// Source of truth: Atomic/AI-wiki, projects/Rekrutacja/case-studies/case-*.md
// (honesty pass 22.06) — the "Short EN" block is the `lead`; the remaining
// sections (Problem / Solution / Stack / Effect / Lessons) are translated from
// the Polish originals, not copied.
//
// Architecture mirrors the PL side: a data module (not a content collection) +
// one generic route src/pages/en/portfolio/case/[slug].astro. A new case =
// a new object in this array, with no changes to Astro or the config.
//
// num matches the numbering on the /en/portfolio/ page, so the number visible
// in the portfolio agrees with the number on the subpage.

export const caseStudiesEn = [
  {
    slug: 'agent-flow',
    num: '01',
    title: 'agent-flow',
    tagline: 'A multi-step document agent (ReAct) in one readable Python file',
    // "Short EN" variant from the vault (case-agent-flow.md → "Short EN").
    lead:
      '"Agentic AI" is the hottest keyword in job ads, yet most examples are framework black boxes. I built the opposite: a ReAct loop (think → tool → observe → report) in readable single-file Python (agent.py ~225 + retrieval.py ~115 lines), reviewable in ten minutes. The agent takes a document folder and a task, plans its own steps (list/search/read), and every claim in the final report carries file:line provenance. Human-in-the-loop gate: --approve stops each action for sign-off, and a rejection with feedback steers the agent’s next step. Backend runs through a swappable CLI command (AGENTFLOW_LLM_CMD), Claude CLI by default. The full loop is testable without an API — a deterministic mock LLM replays an action sequence (5 tests). The repo ships a real run where the agent correctly combined two policy documents.',
    desc:
      'A think → tool → observe → report loop, with no framework black box. The agent plans its own steps over a document folder, and every claim in the report carries a file:line citation. The --approve mode holds every action for sign-off, and a rejection with feedback steers the next step.',
    metric: '3 steps to an answer · 5/5 tests without an API key · ~340 lines',
    problem:
      'You have to show — to a recruiter, a client, or yourself — how an agent actually works: the decision loop, the tools, the grounding of the answer, the human control — without hiding the mechanics behind a framework.',
    solution: [
      'A standalone repo with two files: agent.py (ReAct loop + tool dispatch + approval gate + step budget + repair of malformed JSON) and retrieval.py (BM25 with provenance — the same line as my kb-rag skill).',
      'A read_file sandbox — paths never escape the document corpus.',
      'Tests driven by a mock LLM: the full agent loop is replayed deterministically, with no API key and no cost.',
      'A sample document corpus and a recording of a real run, committed to the repo.',
      'Compose-check: multi-agent orchestration is deliberately left to the tools built for it — the repo makes the reasoning of a single agent legible.',
    ],
    stack: [
      'Python (agent.py ~225 lines, retrieval.py ~115 lines)',
      'ReAct loop — think → tool → observe → report',
      'BM25 retrieval with file:line provenance',
      'Approval gate (--approve) + step budget',
      'Mock LLM as the test backend',
      'Claude CLI as the default backend (AGENTFLOW_LLM_CMD)',
    ],
    effect:
      'A real run (examples/sample-report.md plus the trace): the task "who signs off a PLN 60,000 invoice" → in 3 steps the agent combined the invoicing policy with the delegation matrix and answered correctly (CFO + a board member, joint sign-off), with citations. 5/5 tests green without API access.',
    lessons: [
      'A step budget plus a forced finish turn a research-spinning agent into a tool that always returns something.',
      'A mock LLM as the test backend = the full agent loop in CI at no cost — a pattern that transfers to any agentic project.',
    ],
    keywords: [
      'agentic AI',
      'ReAct / orchestration',
      'human-in-the-loop',
      'RAG / provenance',
      'prompt engineering',
      'testing LLM systems',
      'Python',
    ],
    statusReady: [
      'Public repository — code and tests to review.',
      '5/5 tests pass without an API key.',
      'A real agent run is recorded in the repo (sample corpus + trace).',
    ],
    statusTodo: [
      'Multi-agent orchestration is deliberately out of scope for this repo — an intentional compose-check, not an omission.',
      'The tests use a mock LLM; the real backend (Claude CLI) is verified on a real run, not in CI.',
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
    tagline: 'A knowledge base with hard file:line provenance and zero dependencies',
    lead:
      'AI roles keep asking for "knowledge bases / RAG for agents" — and the typical RAG demo is a heavy stack with a vector DB and a paid API. I built the opposite: pure-Python BM25 retrieval (zero dependencies, zero cost) that indexes a project’s or client’s document folder and returns chunks with hard file:line provenance. Generation is done by the LLM in the loop, bound by a rule: "answer only from chunks, cite sources, no hits = say so." Polish inflection handled with bidirectional prefix matching. A deliberate compose-vs-build call: embeddings rejected after a trade-off analysis for small terminology-heavy corpora — with the architecture leaving room for them. Tested on real production docs (37 files, 662 chunks).',
    desc:
      'BM25 retrieval in pure Python indexes a project’s document folder and returns chunks with a file:line citation. The LLM in the loop answers only from those chunks — "no hits = say so". Embeddings were rejected after a trade-off analysis for small, terminology-heavy corpora.',
    metric: '37 files · 662 chunks · 0 dependencies · $0 API cost',
    problem:
      'Questions about project or client documentation need answers you can trust — answers whose source you can check. An LLM without grounding invents; a full RAG stack (vector DB + API embeddings) costs and takes more maintenance than a corpus of a few hundred files justifies.',
    solution: [
      'A Claude Code skill with a kb_search.py script — BM25 in pure Python, zero dependencies.',
      'Chunking along markdown headings + an index cache with auto-refresh.',
      'A usage protocol for the LLM: hard citation rules and an honest "NO MATCHES".',
      'Polish inflection — bidirectional prefix matching (an approximation of stemming).',
      'An explicit architectural boundary: it does NOT duplicate the RAG already running over the Obsidian vault (Smart Connections handles that) — the result of a compose-check before the build.',
    ],
    stack: [
      'Python (zero external dependencies)',
      'BM25 retrieval',
      'Chunking along markdown headings',
      'Index cache with auto-refresh',
      'Bidirectional prefix matching (Polish inflection)',
      'Claude Code skill + an LLM in the agent loop',
    ],
    effect:
      'A query → top-k chunks with file:start-end, fast, local, no API. Tested on a live corpus: domain queries (JPK, tax deadlines) hit the right documents despite inflected word forms; a query outside the corpus returned an honest NO MATCHES.',
    lessons: [
      'RAG is a pattern, not a stack — retrieval with provenance plus disciplined generation delivers 90% of the value at 5% of the complexity.',
      'The compose-check before building caught a real trap (a second RAG over the vault = a wasted effort).',
    ],
    keywords: [
      'RAG',
      'knowledge bases for agents',
      'retrieval / provenance',
      'prompt engineering (grounding rules)',
      'compose-vs-build',
      'Python',
    ],
    statusReady: [
      'Tested on real production documentation: 37 files, 662 chunks.',
      'Zero external dependencies, zero API cost.',
      'Published as a skill in the claude-skills repo — code and usage protocol to read.',
    ],
    statusTodo: [
      'Embeddings were deliberately rejected for small, terminology-heavy corpora — the architecture leaves room for them, but does not use them.',
      'Polish inflection is handled by an approximation (prefix matching), not by a morphological analyser.',
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
    tagline: 'An invoice PDF or a photo → structured data in seconds',
    lead:
      'Polish accounting offices retype invoice data into their systems by hand — slow and error-prone. I built an app that turns an invoice (PDF, scan, photo) into structured data in 5–15 seconds: a two-stage pipeline of Azure Document Intelligence (OCR with confidence scores) + LLM validation via Claude (CLI on a Max subscription; Claude API / Gemini / OpenAI optional via an LLM_PROVIDER variable) — field validation, Polish character normalization, NIP (tax-ID) format normalization, with human-in-the-loop editing and an audit log (GDPR, 12-month retention). It exports JSON and Excel (.xlsx) — one PDF/scan/photo per request, multi-invoice PDF up to 20 pages, plus bulk export of results to Excel. Cost: on Max LLM ~$0 + Azure free tier → pennies; with API ~PLN 0.06–0.08 per invoice per the code estimate. Pilot-ready / deployment-ready: Docker + Caddy, client manual, deployment wizard, GDPR docs — no automated tests, before the first deployment. Compose-vs-build call: Azure’s prebuilt model over custom OCR — open-source models failed on Polish. Roadmap: JPK_FA designed in the BRD, not yet built.',
    desc:
      'A two-stage pipeline: Azure Document Intelligence (OCR with confidence scores) + LLM field validation. Polish character and NIP format normalization, human-in-the-loop editing, audit log and data retention. Exports JSON and Excel. Pilot-ready: Docker, Caddy, a deployment wizard, GDPR documentation.',
    metric: '5–15 s per invoice · multi-invoice PDF up to 20 pages · ~2.3k LoC',
    context:
      'For whom: Polish accounting offices. Role: solo founder & builder — architecture, code, documentation, deployment.',
    problem:
      'An accountant receives invoices in every shape (a PDF from the system, a scan, a photo from a phone) and retypes the data by hand into the accounting software. It is repetitive, slow and error-prone — and an error in a tax ID or a VAT amount costs money.',
    solution: [
      'Two-stage pipeline: Azure Document Intelligence (prebuilt invoice model, confidence score per field) → LLM validation via Claude (CLI on a Max subscription; Claude API / Gemini / OpenAI optional through an LLM_PROVIDER variable) — normalization of Polish characters, normalization of the NIP format (stripping dashes and spaces, 10 digits), a sanity check on the net/VAT/gross amounts.',
      'Human-in-the-loop: every field is manually editable; an audit log with 12-month retention (privacy policy + log rotation — a GDPR/audit requirement).',
      'Scale and export: one PDF/scan/photo per request, multi-invoice PDF up to 20 pages, bulk export of results to Excel; JSON and Excel (.xlsx) export.',
      'Deployment: Docker Compose + Caddy (auto-SSL), a deploy-client.sh wizard, a PDF client manual, integration with the Reporting Agent (auto-transfer of data into reports).',
      'Roadmap: JPK_FA (the control file for the tax office) designed in the BRD (epic E3), not built — Polish specifics that no foreign SaaS has.',
    ],
    stack: [
      'FastAPI (backend)',
      'Azure Document Intelligence (OCR, prebuilt invoice model)',
      'LLM validation via Claude CLI (Haiku) on a Max subscription; Claude API / Gemini / OpenAI optional via LLM_PROVIDER',
      'SQLite + SQLAlchemy',
      'Jinja2 + Tailwind + Alpine.js',
      'Docker + Caddy (auto-SSL)',
    ],
    effect:
      'Processing takes 5–15 s per invoice. Cost: on a Max LLM subscription ~$0 + Azure free tier (500 pages/month) → pennies; with the API ~PLN 0.06–0.08 per invoice per the estimate in the code. An invoice in any shape → structured data with no manual retyping.',
    lessons: [
      'Compose before build: research showed that open-source OCR (including GLM-OCR) does not handle Polish well — a ready-made Azure model plus a thin LLM layer beats building my own.',
      'The LLM as a validator, not an extractor: Claude does not read the invoice from scratch — it checks and normalizes the OCR result. Cheaper, faster and fewer hallucinations than "throw the PDF at an LLM".',
    ],
    keywords: [
      'LLM in practice',
      'prompt engineering',
      'feasibility assessment (compose-vs-build)',
      'process automation',
      'human-in-the-loop',
      'GDPR / compliance by design',
      'Polish domain (accounting, invoices)',
    ],
    statusReady: [
      'Pilot-ready: Docker Compose + Caddy, a deployment wizard, a client manual, GDPR documentation.',
      'JSON and Excel (.xlsx) export, bulk export of results.',
      'Audit log with 12-month retention and log rotation.',
    ],
    statusTodo: [
      'No automated tests.',
      'Before the first commercial deployment — the strategy: a free pilot in exchange for a reference.',
      'JPK_FA designed in the BRD (epic E3), not built.',
    ],
    links: [
      { label: 'OCR demo (PL) ↗', url: '/demy/#ocr', external: false },
    ],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'deadline-agent',
    num: '04',
    title: 'Deadline Agent',
    tagline: 'The Polish tax calendar turned into a reminder system',
    lead:
      'A Polish accounting office tracks tax deadlines for hundreds of clients — VAT, PIT, CIT, social insurance (ZUS), JPK_VAT: 30+ statutory deadlines a year, each with penalties for being late. I built a system that encodes the Polish tax calendar: a dashboard shows upcoming deadlines (30-day horizon), an employee clicks to generate personalized reminder drafts per client and legal form. Three sending modes (from "employee copies the draft" to a Gmail API (OAuth) mode), CSV client import, reminder history as an audit trail. KSeF e-invoicing status per client via the Polish ksef2 SDK is on the roadmap. Polish tax domain knowledge encoded into a product — no foreign tool has it. Working MVP, pre-pilot.',
    desc:
      'An accounting office tracks VAT-7, PIT-5, CIT-8, ZUS and JPK_VAT for hundreds of clients at once. The agent runs the deadline matrix and says it straight: "25.04 — VAT-7 applies to 15 clients". The employee clicks and the reminder draft is ready. The audit trail answers in a second whether a client was reminded.',
    metric: '30+ deadlines a year · per-client dashboard · draft in one click · ~980 LoC',
    context: 'For whom: Polish accounting offices. Role: solo founder & builder.',
    problem:
      'Hundreds of clients × different legal forms × 30+ deadlines a year = a matrix nobody can track by hand. A late VAT or ZUS filing means interest and liability — and the client blames the office.',
    solution: [
      'The Polish tax calendar as code: VAT-7/VAT-7K, PIT-5, PIT-36/37, CIT-8, ZUS (sole trader + employer), JPK_VAT — with date arithmetic and an "urgent" flag for deadlines within 5 days.',
      'Dashboard: for every deadline in a 30-day horizon it shows the upcoming obligations; the employee clicks and gets a reminder draft per client (the legal form decides which deadlines apply).',
      'Three sending modes of increasing automation: text (the employee copies the draft), smtp, gmail (Gmail API mode, OAuth) — the office picks its level of control.',
      'Audit trail: reminder history per client ("sent or not") + GDPR purge.',
      'CSV client import.',
    ],
    stack: [
      'FastAPI',
      'SQLite + SQLAlchemy',
      'Jinja2 + Tailwind + Alpine.js',
      'ksef2 SDK (integration on the roadmap)',
      'Gmail API (OAuth) as the highest sending mode',
    ],
    effect:
      'Instead of tracking the deadline matrix by hand, the dashboard says "25.04 — VAT-7 applies to 15 clients", the employee clicks and the draft is ready. The audit trail answers the question "did client X get the reminder?" in a second.',
    lessons: [
      'Domain knowledge is a moat: the Polish tax calendar encoded in a product is harder to copy than any piece of code — the OSS integrator wins where they add local domain that OSS does not have.',
      'Graduated automation: the text→smtp→gmail modes let the office start in full control and hand it over at the pace of trust — the same finding as human-in-the-loop in the Email Assistant, seen from the process side.',
    ],
    keywords: [
      'process automation',
      'process audit / feasibility assessment',
      'domain expertise (KSeF, JPK, Polish compliance)',
      'GDPR',
      'compose-vs-build (OSS SDK)',
    ],
    statusReady: [
      'A working MVP with a client manual.',
      'The Polish tax calendar encoded: VAT-7/VAT-7K, PIT-5, PIT-36/37, CIT-8, ZUS, JPK_VAT.',
      'A 30-day horizon dashboard, text/smtp/gmail sending modes, CSV import, audit trail + GDPR purge.',
    ],
    statusTodo: [
      'Pre-pilot.',
      'Per-client KSeF status integration (via ksef2) is on the roadmap — the scaffold is ready, the full integration after the first pilot.',
      'The interactive demo was withdrawn from the site (mobile); available on request.',
    ],
    links: [{ label: 'Demos (PL) ↗', url: '/demy/', external: false }],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'email-assistant',
    num: '05',
    title: 'Email Assistant',
    tagline: 'A service-design audit of my own AI product — with a go/no-go verdict',
    lead:
      'I built an email assistant for accounting offices (LLM classification + reply drafting, human-in-the-loop), then ran a service-design audit with an AI-actor layer on it — and concluded it is not client-ready as is. Strong pillar: human-on-the-trigger is real (zero auto-send; every email awaits approval). But the code audit surfaced three pre-pilot fixes: no AI confidence signal (rubber-stamp risk), full email body sent to an external LLM without PII masking or a data-processing agreement, and a send failure that can render as success. The value here is not "it works" — it is the judgment to assess AI-deployment readiness and name what is missing. Exactly what AI-adoption / BA roles look for.',
    desc:
      'I built an email assistant for accounting offices (classification + drafted replies, human-in-the-loop), then ran a service-design audit with an AI-actor layer on it and issued a verdict: not client-ready as it stands — no confidence signal on the classification (one-click approval turns it into a rubber stamp), full email content reaching an external LLM with no PII masking and no data-processing agreement, and a failure path masked as success (SMTP dies, the status still says "ready to send"). The case proves feasibility assessment, not only the ability to build.',
    metric: 'Verdict: NOT pilot-ready — 3 fixes required before any client use · 4 categories, zero sends without a human · ~3.9k LoC',
    context:
      'For whom: Polish accounting offices. Role: solo founder & builder — author of the product AND author of the critical audit of it. Method: AI-augmented service blueprint (Shostack + an AI-actor layer) + adversarial verification (three independent "sceptics" checked every claim against the code).',
    problem:
      '"A human in the loop" is not the same as "human-in-the-loop by design". The business question: can this product be deployed to an accounting office as it stands — an office that is the administrator of third parties’ tax data?',
    solution: [
      'A real pillar: zero auto-send — the IMAP worker never sends, every email sits at status pending, sending only after an explicit approval, with a guard against double-send. That is genuine human-in-the-loop.',
      'No AI confidence signal: the classification and the draft carry no confidence; the UI allows a one-click approval without reading → rubber-stamp risk (the employee accepts in the dark; trust degenerates).',
      'A GDPR gap: the full email body (possibly containing NIP, PESEL, amounts) reaches an external LLM without masking; no data-processing agreement, no designed retention (only a manual account deletion, not a 30-day policy).',
      'Failure masking: when an SMTP send fails, the status can still show "ready to send" — the system pretends to have succeeded.',
    ],
    stack: [
      'FastAPI',
      'Provider-agnostic LLM (Claude CLI / Anthropic / Gemini / OpenAI — a single env variable)',
      'IMAP + SMTP',
      'SQLite + SQLAlchemy',
      'Jinja2 + Tailwind + Alpine.js',
    ],
    effect:
      'Verdict (go/no-go): NOT pilot-ready without a compliance layer (PII masking / data-processing agreement / "AI-assisted reply" disclosure) and an AI confidence signal. The HITL skeleton is strong — but that is not enough to hand it to an office holding client data. The variant is shown publicly in the demo: 4 categories, zero sends without a human.',
    lessons: [
      '"HITL present" ≠ "HITL designed". The hard gate here is hard because nobody added auto-send — there is no invariant defending the human; without a confidence signal and with one-click approval, that is a rubber-stamp architecture.',
      'Auditing your own product is a signal of judgement. Juniors praise their product; being able to say "my own product is NOT ready, and here is why" is the maturity that AI-adoption roles look for.',
    ],
    keywords: [
      'AI deployment feasibility assessment',
      'AI process audit',
      'go/no-go decision',
      'human-in-the-loop / HITL governance',
      'GDPR / data processing',
      'AI adoption',
      'LLM in practice',
      'tech ↔ business risk translation',
    ],
    statusReady: [
      'Zero auto-send: every email sits at status pending and is sent only after an explicit approval.',
      'A guard against double-send.',
      'The full blueprint and the OCR ↔ email contrast are available in the portfolio.',
      'The variant is shown publicly in the demo.',
    ],
    statusTodo: [
      'No AI confidence signal — rubber-stamp risk.',
      'No PII masking, no data-processing agreement, no designed retention.',
      'A send failure can present as success — to be fixed before the pilot.',
      'Verdict: NOT pilot-ready as it stands.',
    ],
    links: [{ label: 'Demo (PL) ↗', url: '/demy/#email', external: false }],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },

  {
    slug: 'reporting-agent',
    num: '06',
    title: 'Reporting Agent',
    tagline: 'A monthly financial report — from the office’s cost into its product',
    lead:
      'A monthly client report at an accounting office means manually compiling revenue, costs and VAT — rarely presented well. I built a generator that takes data (CSV/TSV/JSON; the JSON format matches my OCR Invoice Reader’s output — compatibility, not an integrated pipeline) and produces a branded PDF with the key metrics: revenue, costs, VAT balance, document count, an LLM-written summary with 3–5 insights (anomalies, trends — always human-reviewed), plus a ready-to-send client email draft. Polish diacritics solved at the font level (DejaVu Sans in fpdf2). Docker, client manual. Pre-pilot.',
    desc:
      'A report generator from CSV data (Optima, InsERT) instead of manual compilation of revenue, costs and VAT. The result is a branded PDF for the end client plus a short review. The report stops being the office’s cost and becomes its product.',
    metric: 'CSV → branded PDF + review instead of manual compilation · ~770 LoC',
    context: 'For whom: Polish accounting offices. Role: solo founder & builder.',
    problem:
      'A client of the accounting office wants to know "how the company is doing", and the office answers with manual spreadsheets — time-consuming, unattractive and postponed to the end of the month. The report that could be added value for the office is, instead, its cost.',
    solution: [
      'Data sources: accepts CSV/TSV/JSON; the JSON format matches the output of the OCR Invoice Reader (compatibility, not an integrated pipeline).',
      'A PDF with an AI layer: the key metrics (revenue, costs, VAT balance, document count), a summary and insights generated by an LLM — always reviewed, because insights can hallucinate; a client email draft comes as a set.',
      'One universal PDF template with fixed MJO Systems branding.',
      'Polish diacritics solved at the font level (DejaVu Sans in fpdf2), not by transliteration.',
    ],
    stack: [
      'FastAPI',
      'fpdf2 + DejaVu Sans (Polish characters in the PDF)',
      'Claude API / provider-agnostic LLM (summaries + insights)',
      'SQLite + SQLAlchemy',
      'Docker',
    ],
    effect:
      'A generated branded PDF + a short review instead of manual compilation; the report changes from the office’s cost into its product (a PDF for the end client).',
    lessons: [
      'LLM insights need a human gate — the value is real (anomalies, trends), but without review it is a reputational risk for the office; design for "AI proposes, the human signs".',
      'Localisation details are the product: Polish characters in the generated PDF (fonts, not transliteration) is the difference between "a demo" and "something you can send to a client".',
    ],
    keywords: [
      'LLM in practice',
      'reporting automation',
      'tech → business translation (report as the office’s product)',
      'human-in-the-loop',
      'prompt engineering',
      'integrations (CSV/JSON)',
    ],
    statusReady: [
      'A generator with a client manual, Docker deployment.',
      'A branded PDF with KPIs, LLM insights and a client email draft.',
      'Polish characters in the PDF solved at the font level.',
    ],
    statusTodo: [
      'Pre-pilot.',
      'Direct API to accounting software (Optima, InsERT) is on the roadmap — for now, a CSV export.',
      'The format is compatible with the OCR Invoice Reader, but the pipeline is not integrated.',
    ],
    links: [{ label: 'Demo (PL) ↗', url: '/demy/#reporting', external: false }],
    dates: { built: '2026-06-12', updated: '2026-06-22' },
  },
];

// Previous / next navigation (same order as on the /en/portfolio/ page).
export const caseStudiesEnWithNeighbours = caseStudiesEn.map((c, i) => ({
  ...c,
  prev: i > 0 ? caseStudiesEn[i - 1] : null,
  next: i < caseStudiesEn.length - 1 ? caseStudiesEn[i + 1] : null,
}));

export function getCaseBySlugEn(slug) {
  return caseStudiesEn.find((c) => c.slug === slug) ?? null;
}
