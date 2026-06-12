// Agent Mission Control — skryptowana symulacja przebiegów agenta (client-side, zero API).
// Odzwierciedla architekturę produkcyjną: n8n Webhook → LLM → walidacja → Supabase EU → human approval.
// Log w stylu ReAct: THOUGHT / ACTION / OBSERVATION (+ ERROR przy kontrolowanym faili z odzyskiem).

export const scenarios = [
  {
    id: 'invoice',
    label: 'Invoice intake → ledger',
    goal: "Process an incoming invoice photo and post it to the client's ledger — without a human touching it until the final approval.",
    steps: [
      {
        node: 'Webhook intake',
        tool: 'n8n · webhook',
        log: [
          ['ACTION', 'GET /intake/doc_8412 — fetching attachment'],
          ['OBSERVATION', 'invoice photo received (JPEG, 2.1 MB)'],
        ],
      },
      {
        node: 'OCR extraction',
        tool: 'Azure DI + Claude',
        log: [
          ['THOUGHT', 'Photo, not a PDF — switching to the photo OCR profile.'],
          ['ACTION', 'extract_invoice(doc_8412, profile=photo)'],
          ['OBSERVATION', '7 fields extracted (seller, NIP, dates, amounts) · avg confidence 98.9%'],
        ],
      },
      {
        node: 'Validate tax ID',
        tool: 'checksum + registry',
        fails: true,
        log: [
          ['ACTION', 'validate_nip("899-284-71-63")'],
          ['ERROR', 'checksum mismatch — a digit was likely misread from the photo'],
          ['THOUGHT', 'Known failure mode on photos. Re-reading just the NIP region at higher resolution.'],
          ['ACTION', 'extract_region(doc_8412, field=nip, dpi=600)'],
          ['OBSERVATION', 're-read OK: 899-284-71-68 · checksum valid · registry: active VAT payer'],
        ],
      },
      {
        node: 'Post to ledger',
        tool: 'Supabase EU',
        log: [
          ['ACTION', 'INSERT invoices (client=MEBLEX, gross=5 965,50 zł)'],
          ['OBSERVATION', 'row committed · EU Frankfurt · RLS scope: client_meblex'],
        ],
      },
      {
        node: 'Draft confirmation',
        tool: 'Claude',
        log: [
          ['ACTION', 'draft_email(recipient=accountant, type=confirmation)'],
          ['OBSERVATION', 'draft ready — NOT sent; queued for human review'],
        ],
      },
    ],
  },
  {
    id: 'lead',
    label: 'B2B lead → qualified & routed',
    goal: 'Take a raw form submission, qualify the lead and route it to sales — with reasoning a human can audit.',
    steps: [
      {
        node: 'Form webhook',
        tool: 'n8n · webhook',
        log: [
          ['ACTION', 'POST /leads — new submission'],
          ['OBSERVATION', 'company: chemical distributor · need: "automate offer follow-ups" · 120 employees'],
        ],
      },
      {
        node: 'Enrich context',
        tool: 'rules + history',
        log: [
          ['THOUGHT', 'B2B, mid-size, process pain named explicitly — strong signals.'],
          ['ACTION', 'check_history(domain) · match_icp(industry=chemicals)'],
          ['OBSERVATION', 'no prior contact · ICP match: industrial B2B ✓'],
        ],
      },
      {
        node: 'Classify lead',
        tool: 'Claude (GenAI)',
        fails: true,
        log: [
          ['ACTION', 'classify_lead(payload) → expecting JSON'],
          ['ERROR', 'response missing required field "reasoning" — schema validation failed'],
          ['THOUGHT', 'Retrying with strict schema and an explicit example. Never trust unvalidated output.'],
          ['ACTION', 'classify_lead(payload, schema=strict, retry=1)'],
          ['OBSERVATION', 'HOT (0.91) — "explicit pain, budget-holder role, ICP fit" · schema valid'],
        ],
      },
      {
        node: 'Write to CRM',
        tool: 'Supabase EU',
        log: [
          ['ACTION', 'INSERT leads (status=HOT, owner=sales)'],
          ['OBSERVATION', 'row committed · GDPR Art. 22: decision logged with reasoning'],
        ],
      },
      {
        node: 'Notify sales',
        tool: 'email draft',
        log: [
          ['ACTION', 'draft_brief(owner=sales, sla=24h)'],
          ['OBSERVATION', 'meeting brief drafted — queued for human review'],
        ],
      },
    ],
  },
];
