// Sample data — Email Assistant demo (client-side only, fikcyjne maile klientów biura).
// Treść maili PL (vertical księgowy), UI dema EN. 5 kategorii jak w produkcie.

export const categories = {
  invoice: { label: 'Invoice', color: 'accent' },
  urgent: { label: 'Urgent', color: 'sunset' },
  question: { label: 'Question', color: 'green' },
  meeting: { label: 'Meeting', color: 'violet' },
  spam: { label: 'Spam', color: 'gray' },
};

export const emails = [
  {
    id: 'm1',
    from: 'k.nowicka@meblex-wroclaw.pl',
    sender: 'Katarzyna Nowicka — MEBLEX',
    subject: 'Faktura korygująca za maj — prośba',
    snippet: 'Dzień dobry, czy mogłaby Pani wystawić korektę do FV 2026/05/118…',
    body: 'Dzień dobry,\n\nczy mogłaby Pani wystawić korektę do FV 2026/05/118? Kontrahent zwrócił część towaru (2 z 5 palet) i potrzebujemy skorygować kwotę.\n\nPozdrawiam,\nKatarzyna Nowicka',
    category: 'invoice',
    confidence: '97.4%',
    draft: 'Dzień dobry Pani Katarzyno,\n\ndziękuję za wiadomość. Przygotuję fakturę korygującą do FV 2026/05/118 — proszę tylko o przesłanie dokumentu zwrotu (WZ lub protokół) dla 2 palet, żebym mogła poprawnie ująć korektę w ewidencji VAT.\n\nKorektę wystawię tego samego dnia, w którym otrzymam dokument.\n\nZ poważaniem,',
  },
  {
    id: 'm2',
    from: 'biuro@instal-bud.com.pl',
    sender: 'Tomasz Wierzbicki — INSTAL-BUD',
    subject: 'PILNE: wezwanie z US ws. JPK_V7M za kwiecień',
    snippet: 'Pani Aniu, dostaliśmy wezwanie do złożenia wyjaśnień w sprawie rozbieżności…',
    body: 'Pani Aniu,\n\ndostaliśmy dziś wezwanie z US do złożenia wyjaśnień ws. rozbieżności w JPK_V7M za kwiecień (7 dni na odpowiedź!). W załączniku skan pisma. Co robimy?\n\nTomasz Wierzbicki',
    category: 'urgent',
    confidence: '99.1%',
    draft: 'Dzień dobry Panie Tomaszu,\n\notrzymałam — sprawa jest priorytetowa. Proszę o przesłanie oryginału pisma (PDF ze skrzynki ePUAP, nie skan), zweryfikuję rozbieżność z naszą ewidencją jeszcze dziś.\n\nWstępnie: najczęściej to niedopasowanie NIP kontrahenta lub data ujęcia korekty. Przygotuję projekt odpowiedzi do Pana akceptacji najpóźniej jutro do 12:00 — zmieścimy się w terminie z zapasem.\n\nZ poważaniem,',
  },
  {
    id: 'm3',
    from: 'm.adamski@gmail.com',
    sender: 'Michał Adamski (JDG)',
    subject: 'Pytanie o limit zwolnienia z VAT w 2026',
    snippet: 'Dzień dobry, zbliżam się do 200 tys. obrotu i zastanawiam się…',
    body: 'Dzień dobry,\n\nzbliżam się do 200 tys. zł obrotu w tym roku i zastanawiam się, co się stanie jak przekroczę limit. Czy muszę się rejestrować do VAT od razu? Jak to wygląda w praktyce?\n\nPozdrawiam,\nMichał Adamski',
    category: 'question',
    confidence: '95.8%',
    draft: 'Dzień dobry Panie Michale,\n\ndobrze, że Pan pyta z wyprzedzeniem. W skrócie: po przekroczeniu 200 tys. zł rejestracja VAT-R jest obowiązkowa PRZED transakcją, która przekroczy limit — i to ta transakcja jest już opodatkowana.\n\nProponuję krótką rozmowę w tym tygodniu: policzymy prognozę obrotu i sprawdzimy, czy rejestracja dobrowolna wcześniej nie będzie dla Pana korzystniejsza (odliczenia). Pasuje czwartek 10:00?\n\nZ poważaniem,',
  },
  {
    id: 'm4',
    from: 'a.lis@transpedkom.pl',
    sender: 'Anna Lis — TRANSPEDKOM',
    subject: 'Spotkanie ws. zamknięcia półrocza',
    snippet: 'Dzień dobry, chcielibyśmy umówić spotkanie ws. wyników za H1…',
    body: 'Dzień dobry,\n\nchcielibyśmy umówić spotkanie (może być online) ws. wyników za pierwsze półrocze i planowania podatkowego na H2. Pasuje Państwu przyszły tydzień?\n\nAnna Lis',
    category: 'meeting',
    confidence: '96.3%',
    draft: 'Dzień dobry Pani Anno,\n\nchętnie. Proponuję wtorek 23.06 o 11:00 lub środę 24.06 o 14:00 (Teams lub u nas w biurze — jak Państwu wygodniej).\n\nPrzed spotkaniem prześlę wstępne zestawienie wyników H1, żebyśmy mogli od razu przejść do wniosków.\n\nZ poważaniem,',
  },
  {
    id: 'm5',
    from: 'promo@super-okazje-online.click',
    sender: 'Super Okazje Online',
    subject: '🎁 Wygraj iPhone 17 Pro — tylko dziś!',
    snippet: 'Gratulacje! Twój adres został wylosowany. Kliknij i odbierz nagrodę…',
    body: 'GRATULACJE!!!\n\nTwój adres email został WYLOSOWANY w naszej loterii. Odbierz iPhone 17 Pro klikając w link poniżej w ciągu 24h!\n\n>>> ODBIERZ-NAGRODE-TERAZ.click <<<',
    category: 'spam',
    confidence: '99.9%',
    draft: null, // spam → bez szkicu, akcja: archiwizuj/usuń
  },
];
