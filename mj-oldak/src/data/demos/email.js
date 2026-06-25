// Sample data — Email Assistant demo (client-side only, fikcyjne maile klientów biura).
// Treść EN (czytelna dla rekrutera); polskość = nazwy własne (JPK, US, VAT, zł).
// W produkcie szkice odpowiedzi są PO POLSKU — odnotowane w stopce dema.

// 4 realne kategorie produktu (PILNE / NORMALNE / SPOTKANIE / SPAM).
export const categories = {
  urgent: { label: 'Urgent', color: 'sunset' },
  normal: { label: 'Normal', color: 'green' },
  meeting: { label: 'Meeting', color: 'violet' },
  spam: { label: 'Spam', color: 'gray' },
};

export const emails = [
  {
    id: 'm1',
    from: 'k.nowicka@meblex-wroclaw.pl',
    sender: 'Katarzyna Nowicka — MEBLEX',
    subject: 'Correction invoice for May — request',
    snippet: 'Hello, could you issue a correction to invoice FV 2026/05/118…',
    body: 'Hello,\n\ncould you issue a correction to invoice FV 2026/05/118? The customer returned part of the goods (2 of 5 pallets) and we need the amount corrected.\n\nBest regards,\nKatarzyna Nowicka',
    category: 'normal',
    confidence: '97.4%',
    draft: 'Hello Ms. Nowicka,\n\nthank you for the message. I will prepare a correction invoice for FV 2026/05/118 — please just send the return document (delivery note or protocol) for the 2 pallets, so the correction is properly reflected in the VAT register.\n\nI will issue the correction the same day I receive the document.\n\nKind regards,',
  },
  {
    id: 'm2',
    from: 'biuro@instal-bud.com.pl',
    sender: 'Tomasz Wierzbicki — INSTAL-BUD',
    subject: 'URGENT: tax office summons re JPK_V7M for April',
    snippet: 'We received a summons to explain discrepancies in our April JPK_V7M filing…',
    body: 'Hello,\n\nwe received a summons from the tax office (US) today to explain discrepancies in our April JPK_V7M filing — 7 days to respond! Scan attached. What do we do?\n\nTomasz Wierzbicki',
    category: 'urgent',
    confidence: '99.1%',
    draft: 'Hello Mr. Wierzbicki,\n\nreceived — treating this as priority. Please send the original letter (PDF from your ePUAP inbox, not a scan); I will verify the discrepancy against our records today.\n\nMost likely cause: a mismatched contractor tax ID (NIP) or the booking date of a correction. I will prepare a draft response for your approval by noon tomorrow — well within the deadline.\n\nKind regards,',
  },
  {
    id: 'm3',
    from: 'm.adamski@gmail.com',
    sender: 'Michał Adamski (sole trader)',
    subject: 'Question about the VAT exemption limit in 2026',
    snippet: 'Hello, I am approaching 200k PLN of revenue and wondering what happens…',
    body: 'Hello,\n\nI am approaching 200,000 zł of revenue this year and wondering what happens when I cross the limit. Do I have to register for VAT immediately? How does it work in practice?\n\nBest,\nMichał Adamski',
    category: 'normal',
    confidence: '95.8%',
    draft: 'Hello Mr. Adamski,\n\ngood that you are asking ahead of time. In short: once you exceed 200,000 zł, VAT registration (form VAT-R) is mandatory BEFORE the transaction that crosses the limit — and that transaction is already taxable.\n\nI suggest a short call this week: we will project your revenue and check whether voluntary registration earlier could actually work in your favour (input VAT deductions). Does Thursday 10:00 work?\n\nKind regards,',
  },
  {
    id: 'm4',
    from: 'a.lis@transpedkom.pl',
    sender: 'Anna Lis — TRANSPEDKOM',
    subject: 'Meeting about the half-year closing',
    snippet: 'Hello, we would like to schedule a meeting about H1 results…',
    body: 'Hello,\n\nwe would like to schedule a meeting (online is fine) about our H1 results and tax planning for H2. Would next week suit you?\n\nAnna Lis',
    category: 'meeting',
    confidence: '96.3%',
    draft: 'Hello Ms. Lis,\n\ngladly. I propose Tuesday 23 June at 11:00 or Wednesday 24 June at 14:00 (Teams or at our office — whichever is more convenient).\n\nBefore the meeting I will send over a preliminary H1 summary, so we can jump straight to conclusions.\n\nKind regards,',
  },
  {
    id: 'm5',
    from: 'promo@super-deals-online.click',
    sender: 'Super Deals Online',
    subject: '🎁 Win an iPhone 17 Pro — today only!',
    snippet: 'Congratulations! Your address has been selected. Click to claim your prize…',
    body: 'CONGRATULATIONS!!!\n\nYour email address has been SELECTED in our lottery. Claim your iPhone 17 Pro by clicking the link below within 24h!\n\n>>> CLAIM-YOUR-PRIZE-NOW.click <<<',
    category: 'spam',
    confidence: '99.9%',
    draft: null, // spam → bez szkicu, akcja: archiwizuj/usuń
  },
];
