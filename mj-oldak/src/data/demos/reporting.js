// Sample data — Reporting Agent demo (fikcyjni klienci biura).
// Treść EN (czytelna dla rekrutera); kwoty w zł = polski rynek. W produkcie raport dla
// klienta biura jest PO POLSKU (branded PDF) — odnotowane w stopce dema.

export const clients = [
  {
    id: 'meblex',
    name: 'MEBLEX Sp. z o.o.',
    industry: 'Furniture manufacturing',
    months: {
      '2026-04': {
        revenue: '286 400 zł',
        costs: '218 950 zł',
        income: '67 450 zł',
        vatDue: '14 820 zł',
        zus: '21 360 zł',
        topCosts: [
          { name: 'Materials (boards, fittings)', value: '96 200 zł' },
          { name: 'Salaries + social security (ZUS)', value: '78 400 zł' },
          { name: 'Transport & logistics', value: '18 700 zł' },
        ],
        summary: 'Revenue up 9% month-over-month with stable material costs. Net income grows for the third month in a row. Note: cost invoices from 2 suppliers arrived late — risk of JPK corrections.',
      },
      '2026-05': {
        revenue: '301 750 zł',
        costs: '241 100 zł',
        income: '60 650 zł',
        vatDue: '13 240 zł',
        zus: '21 360 zł',
        topCosts: [
          { name: 'Materials (boards, fittings)', value: '108 900 zł' },
          { name: 'Salaries + social security (ZUS)', value: '79 100 zł' },
          { name: 'Energy & utilities (factory)', value: '16 300 zł' },
        ],
        summary: 'Record monthly revenue, but margin dropped 3.1 pp — furniture board prices went up. Recommendation: renegotiate the main supplier contract before the Q4 season.',
      },
    },
  },
  {
    id: 'translog',
    name: 'TransLog Sp. k.',
    industry: 'Road transport (FTL)',
    months: {
      '2026-04': {
        revenue: '154 200 zł',
        costs: '139 800 zł',
        income: '14 400 zł',
        vatDue: '6 180 zł',
        zus: '12 840 zł',
        topCosts: [
          { name: 'Fuel', value: '61 400 zł' },
          { name: 'Driver salaries', value: '48 200 zł' },
          { name: 'Truck leasing', value: '19 600 zł' },
        ],
        summary: 'Low margin (9.3%) typical for the season. Two vehicles in service reduced fleet availability by 12 working days. VAT: input surplus from leasing invoices partially offset.',
      },
      '2026-05': {
        revenue: '171 900 zł',
        costs: '146 250 zł',
        income: '25 650 zł',
        vatDue: '8 460 zł',
        zus: '12 840 zł',
        topCosts: [
          { name: 'Fuel', value: '66 800 zł' },
          { name: 'Driver salaries', value: '49 750 zł' },
          { name: 'Truck leasing', value: '19 600 zł' },
        ],
        summary: 'Margin rebounded to 14.9% — full fleet availability + 2 new regular routes. Recommendation: review per-km rates on DE routes (fuel costs up 4% month-over-month).',
      },
    },
  },
];

export const reportMonths = [
  { id: '2026-04', label: 'April 2026' },
  { id: '2026-05', label: 'May 2026' },
];
