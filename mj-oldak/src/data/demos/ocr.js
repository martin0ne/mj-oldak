// Sample data — OCR Invoice Reader demo (client-side only, brak prawdziwych danych).
// Treść faktur realistycznie PL (vertical księgowy), UI dema po EN.
// NIP-y fikcyjne; kwoty jako sformatowane stringi (zero logiki formatowania w UI).

export const invoices = [
  {
    id: 'fv-0142',
    label: 'FV 2026/06/0142',
    kind: 'Building materials',
    doc: {
      header: 'FAKTURA VAT',
      lines: [
        'BUDMAT Hurtownia Materiałów Budowlanych Sp. z o.o.',
        'ul. Składowa 18, 53-127 Wrocław',
        'NIP: 899-284-71-63',
        'Data wystawienia: 04.06.2026',
        'Pozycje: cement portlandzki, wełna mineralna…',
      ],
    },
    fields: {
      seller: { value: 'BUDMAT Hurtownia Mat. Bud. Sp. z o.o.', confidence: '99.1%' },
      nip: { value: '899-284-71-63', confidence: '99.8%' },
      invoiceNo: { value: 'FV 2026/06/0142', confidence: '99.5%' },
      issueDate: { value: '04.06.2026', confidence: '98.9%' },
      net: { value: '4 850,00 zł', confidence: '99.3%' },
      vat: { value: '1 115,50 zł (23%)', confidence: '99.0%' },
      gross: { value: '5 965,50 zł', confidence: '99.6%' },
    },
    items: [
      { name: 'Cement portlandzki CEM I 42,5R', qty: '40 szt.', price: '21,50 zł', total: '860,00 zł' },
      { name: 'Wełna mineralna 10cm (rolka)', qty: '60 szt.', price: '48,90 zł', total: '2 934,00 zł' },
      { name: 'Folia budowlana czarna 4×25m', qty: '12 szt.', price: '88,00 zł', total: '1 056,00 zł' },
    ],
  },
  {
    id: 'fv-0318',
    label: 'FV/0318/2026',
    kind: 'Transport service',
    doc: {
      header: 'FAKTURA',
      lines: [
        'TransLog Spedycja Sp. k.',
        'ul. Logistyczna 4, 41-300 Dąbrowa Górnicza',
        'NIP: 631-204-58-87',
        'Data wystawienia: 28.05.2026',
        'Usługa: transport krajowy FTL Wrocław–Gdańsk',
      ],
    },
    fields: {
      seller: { value: 'TransLog Spedycja Sp. k.', confidence: '98.7%' },
      nip: { value: '631-204-58-87', confidence: '99.7%' },
      invoiceNo: { value: 'FV/0318/2026', confidence: '99.2%' },
      issueDate: { value: '28.05.2026', confidence: '99.1%' },
      net: { value: '2 300,00 zł', confidence: '99.4%' },
      vat: { value: '529,00 zł (23%)', confidence: '99.2%' },
      gross: { value: '2 829,00 zł', confidence: '99.5%' },
    },
    items: [
      { name: 'Transport krajowy FTL, trasa WRO–GDN', qty: '1 usł.', price: '2 300,00 zł', total: '2 300,00 zł' },
    ],
  },
  {
    id: 'f-1205',
    label: 'F/2026/1205',
    kind: 'Office supplies',
    doc: {
      header: 'FAKTURA VAT',
      lines: [
        'Biuro Plus — Artykuły Biurowe S.A.',
        'al. Papiernicza 92, 90-001 Łódź',
        'NIP: 774-231-89-56',
        'Data wystawienia: 09.06.2026',
        'Pozycje: papier ksero, tonery, segregatory…',
      ],
    },
    fields: {
      seller: { value: 'Biuro Plus — Artykuły Biurowe S.A.', confidence: '99.0%' },
      nip: { value: '774-231-89-56', confidence: '99.6%' },
      invoiceNo: { value: 'F/2026/1205', confidence: '99.3%' },
      issueDate: { value: '09.06.2026', confidence: '99.0%' },
      net: { value: '612,20 zł', confidence: '99.2%' },
      vat: { value: '140,81 zł (23%)', confidence: '98.8%' },
      gross: { value: '753,01 zł', confidence: '99.4%' },
    },
    items: [
      { name: 'Papier ksero A4 80g (ryza)', qty: '20 szt.', price: '14,20 zł', total: '284,00 zł' },
      { name: 'Toner HP 305X czarny', qty: '2 szt.', price: '129,00 zł', total: '258,00 zł' },
      { name: 'Segregator A4/75 (mix kolorów)', qty: '14 szt.', price: '5,01 zł', total: '70,20 zł' },
    ],
  },
];

// Kolejność i etykiety pól w UI (EN) — wspólny kontrakt dla rendera.
export const fieldOrder = [
  { key: 'seller', label: 'Seller' },
  { key: 'nip', label: 'Tax ID (NIP)' },
  { key: 'invoiceNo', label: 'Invoice no.' },
  { key: 'issueDate', label: 'Issue date' },
  { key: 'net', label: 'Net' },
  { key: 'vat', label: 'VAT' },
  { key: 'gross', label: 'Gross' },
];
