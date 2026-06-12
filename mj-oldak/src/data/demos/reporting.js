// Sample data — Reporting Agent demo (fikcyjni klienci biura, raport miesięczny PL).

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
          { name: 'Materiały (płyta, okucia)', value: '96 200 zł' },
          { name: 'Wynagrodzenia + ZUS', value: '78 400 zł' },
          { name: 'Transport i logistyka', value: '18 700 zł' },
        ],
        summary: 'Przychód wyższy o 9% m/m przy stabilnych kosztach materiałów. Dochód netto rośnie trzeci miesiąc z rzędu. Uwaga: faktury kosztowe od 2 dostawców wpłynęły po terminie — ryzyko korekt JPK.',
      },
      '2026-05': {
        revenue: '301 750 zł',
        costs: '241 100 zł',
        income: '60 650 zł',
        vatDue: '13 240 zł',
        zus: '21 360 zł',
        topCosts: [
          { name: 'Materiały (płyta, okucia)', value: '108 900 zł' },
          { name: 'Wynagrodzenia + ZUS', value: '79 100 zł' },
          { name: 'Energia i media (hala)', value: '16 300 zł' },
        ],
        summary: 'Rekordowy przychód miesiąca, ale marża spadła o 3,1 p.p. — wzrost cen płyty meblowej. Rekomendacja: renegocjacja umowy z głównym dostawcą przed sezonem Q4.',
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
          { name: 'Paliwo', value: '61 400 zł' },
          { name: 'Wynagrodzenia kierowców', value: '48 200 zł' },
          { name: 'Leasing ciągników', value: '19 600 zł' },
        ],
        summary: 'Niska marża (9,3%) typowa dla sezonu. Dwa pojazdy w serwisie obniżyły dostępność floty o 12 dni roboczych. VAT: nadwyżka naliczonego z faktur leasingowych częściowo skompensowana.',
      },
      '2026-05': {
        revenue: '171 900 zł',
        costs: '146 250 zł',
        income: '25 650 zł',
        vatDue: '8 460 zł',
        zus: '12 840 zł',
        topCosts: [
          { name: 'Paliwo', value: '66 800 zł' },
          { name: 'Wynagrodzenia kierowców', value: '49 750 zł' },
          { name: 'Leasing ciągników', value: '19 600 zł' },
        ],
        summary: 'Marża odbiła do 14,9% — pełna dostępność floty + 2 nowe stałe trasy. Rekomendacja: przegląd stawek za km na trasach DE (wzrost kosztów paliwa o 4% m/m).',
      },
    },
  },
];

export const reportMonths = [
  { id: '2026-04', label: 'April 2026' },
  { id: '2026-05', label: 'May 2026' },
];
