// Sample data — Deadline Agent demo. Polski kalendarz podatkowy 2026 (uproszczony do demo,
// realne reguły dni: JPK 25. / zaliczki 20. / ZUS 15.-20.). Logika dat liczona w przeglądarce.

export const taxpayerTypes = [
  { id: 'jdg-vat', label: 'JDG — tax scale + VAT' },
  { id: 'jdg-ryczalt', label: 'JDG — lump sum (ryczałt) + VAT' },
  { id: 'spzoo', label: 'Sp. z o.o. — CIT + VAT, employer' },
];

export const months = [
  { id: '2026-06', label: 'June 2026' },
  { id: '2026-07', label: 'July 2026' },
  { id: '2026-08', label: 'August 2026' },
  { id: '2026-09', label: 'September 2026' },
];

// Reguły miesięczne: dzień miesiąca + kogo dotyczy.
export const monthlyRules = [
  { name: 'ZUS DRA + contributions (employer)', day: 15, appliesTo: ['spzoo'], tag: 'ZUS' },
  { name: 'PIT advance (tax scale)', day: 20, appliesTo: ['jdg-vat'], tag: 'PIT' },
  { name: 'Lump-sum tax (ryczałt) payment', day: 20, appliesTo: ['jdg-ryczalt'], tag: 'PIT' },
  { name: 'ZUS DRA + contributions', day: 20, appliesTo: ['jdg-vat', 'jdg-ryczalt'], tag: 'ZUS' },
  { name: 'CIT advance', day: 20, appliesTo: ['spzoo'], tag: 'CIT' },
  { name: 'Employee PIT advances (PIT-4)', day: 20, appliesTo: ['spzoo'], tag: 'PIT' },
  { name: 'JPK_V7M file + VAT payment', day: 25, appliesTo: ['jdg-vat', 'jdg-ryczalt', 'spzoo'], tag: 'VAT' },
];

// Terminy jednorazowe w horyzoncie demo.
export const oneOffs = [
  { name: 'KSeF — mandatory e-invoicing starts (all VAT payers)', date: '2026-07-01', appliesTo: ['jdg-vat', 'jdg-ryczalt', 'spzoo'], tag: 'KSeF' },
];

// "Dziś" zamrożone dla powtarzalności demo (data publikacji strony).
export const demoToday = '2026-06-12';
