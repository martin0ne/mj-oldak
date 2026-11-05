# Newsletter — automatyczna wysyłka nowych tekstów

## Co robi

Codziennie o 6:00 UTC (7:00 zimą / 8:00 latem) Worker `mj-oldak-newsletter-digest`:

1. pobiera `https://www.mjoldak.pl/rss.xml`,
2. wybiera wpisy z ostatnich 30 dni, których nie ma w tabeli `digest_log`,
3. jeśli są nowe — wysyła **jeden mail** do wszystkich potwierdzonych subskrybentów (`confirmed_at IS NOT NULL AND unsubscribed_at IS NULL`),
4. oznacza wysłane slugi w `digest_log` i zapisuje przebieg w `digest_runs`.

Idempotencja: `digest_log.slug` jest kluczem głównym — ten sam artykuł nie wyjdzie dwa razy, nawet jeśli przebieg padnie w połowie.

Mail zawiera: tytuł, pierwsze ~300 znaków opisu, link „Czytaj →", stopkę z jednoklikowym wypisem (`List-Unsubscribe` + link do `/api/newsletter/unsubscribe/<token>`).

## Jednorazowa konfiguracja (Marcin, ~5 min)

```bash
cd ~/projects/mj-oldak/mj-oldak

# 1. logowanie do Cloudflare (raz)
npx wrangler login

# 2. tabela rejestru wysyłek
npx wrangler d1 execute mj-oldak-newsletter --remote --file=migrations/0003_digest.sql

# 3. sekrety Workera (wklej TEN SAM klucz Resend, który jest w Pages)
cd workers/newsletter-digest
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TRIGGER_KEY      # dowolny ciąg, np. długie hasło

# 4. deploy
npx wrangler deploy
```

Po deployu wrangler wypisze URL typu `https://mj-oldak-newsletter-digest.<subdomain>.workers.dev`.

## Test bez wysyłki

```bash
curl "https://mj-oldak-newsletter-digest.<subdomain>.workers.dev/?key=TRIGGER_KEY&dry=1"
```

Zwraca: listę nowych artykułów, liczbę odbiorców (zamaskowane adresy w `sample`). Zero maili.
`"note":"no confirmed subscribers"` = baza pusta albo nikt nie potwierdził.

## Pierwszy przebieg (ważne)

Przy pustym `digest_log` Worker **nie wysyła archiwum** — oznacza wszystkie istniejące wpisy jako baseline (`"note":"baseline seeded"`). Mail pójdzie dopiero dla tekstu opublikowanego po wdrożeniu.

Jeśli chcesz, żeby **najnowszy** artykuł poszedł od razu przy pierwszym przebiegu:

```bash
curl "https://.../?key=TRIGGER_KEY&include_latest=1"
```

## Realna wysyłka poza harmonogramem

```bash
curl "https://mj-oldak-newsletter-digest.<subdomain>.workers.dev/?key=TRIGGER_KEY"
```

## Sprawdzenie stanu listy

```bash
npx wrangler d1 execute mj-oldak-newsletter --remote --command \
  "SELECT COUNT(*) AS potwierdzeni FROM subscribers WHERE confirmed_at IS NOT NULL AND unsubscribed_at IS NULL;"

npx wrangler d1 execute mj-oldak-newsletter --remote --command \
  "SELECT * FROM digest_runs ORDER BY id DESC LIMIT 5;"
```

## Gdzie ludzie się zapisują

- `/newsletter/` — strona z formularzem,
- **każdy artykuł** (PL i EN) — formularz na dole, po treści, przed tagami.

Oba miejsca POST-ują do `/api/newsletter/subscribe` (double opt-in, 24 h na potwierdzenie).

## Znane ograniczenia

- **Resend free tier: 3 000 maili/mies., 100/dzień.** Przy 200 odbiorcach jeden przebieg = 200 maili → dzienny limit przekroczony. Powyżej ~90 potwierdzonych adresów trzeba przejść na plan płatny (referendum) albo dzielić wysyłkę na dwa dni — kod ma `MAX_PER_RUN=200`, ale to nie omija limitu Resenda.
- Worker wysyła **jeden mail na odbiorcę** (bez BCC) — inaczej nie ma poprawnego wypisu.
- Cron jest w UTC: zimą 7:00, latem 8:00 czasu polskiego.
