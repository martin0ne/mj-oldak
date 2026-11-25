# Panel /admin/newsletter

Panel do obsługi listy subskrybentów newslettera. Stoi za Cloudflare Access (email OTP), nie ma własnego hasła. Nie wysyła kampanii ani broadcastów: jedyne wysyłki to ponowny mail z PDF-em do jednego potwierdzonego adresu i wypis.

## Co jest w środku

| Plik | Rola |
| --- | --- |
| `src/pages/admin/newsletter/index.astro` | Strona panelu (statyczna, `noindex`), styl panelu |
| `src/components/admin/NewsletterAdmin.jsx` | Lista, wyszukiwanie, filtry, akcje, dziennik |
| `src/layouts/AdminLayout.astro` | Minimalny layout: bez GA4 i bez paska dostępności |
| `functions/_lib/auth.ts` | Weryfikacja JWT Cloudflare Access (RS256, `aud`, `exp`, `nbf`) |
| `functions/_lib/newsletter-admin.ts` | Zapytania do `subscribers`, CSV, dziennik akcji |
| `functions/admin/api/newsletter/subscribers.ts` | `GET` lista + liczniki |
| `functions/admin/api/newsletter/export.ts` | `GET` CSV bieżącego filtra |
| `functions/admin/api/newsletter/unsubscribe.ts` | `POST` wypis (jak publiczny link) |
| `functions/admin/api/newsletter/resend-pdf.ts` | `POST` ponowna wysyłka PDF |
| `functions/admin/api/newsletter/audit.ts` | `GET` ostatnie akcje |
| `migrations/0004_admin_audit.sql` | Tabela `admin_audit_log` |

Panel jest stroną statyczną, więc dane dociąga osobnym żądaniem: `fetch` na `/admin/api/newsletter/*` z `credentials: 'same-origin'`, żeby przeglądarka dołączyła cookie Access.

## Bezpieczeństwo

- **Cloudflare Access** blokuje wejście na `/admin/*` i `/admin/api/*` na brzegu.
- **Funkcje sprawdzają JWT same**, niezależnie od Access. Brak `ACCESS_TEAM_DOMAIN`/`ACCESS_AUD` to `503`, brak tokenu to `401`, zły podpis/`aud`/`exp` to `401`. Dzięki temu literówka w polityce albo chwilowo wyłączona aplikacja Access nie odsłania listy adresów.
- **Akcje zapisujące** (`unsubscribe`, `resend-pdf`) wymagają nagłówka `Origin` zgodnego z hostem. Cookie Access jest wysyłane automatycznie, więc bez tego inna strona mogłaby wywołać akcję w imieniu zalogowanego administratora.
- **`ADMIN_DEV_BYPASS=1`** działa wyłącznie na `localhost`/`127.0.0.1`. Poza localhost jest ignorowane, więc przypadkowe ustawienie w produkcji nic nie otwiera.
- **Dane**: żadnych nowych pól z PII. `admin_audit_log` trzyma tylko email administratora (z Access), nazwę akcji, `subscriber_id`, wynik i krótki opis. Nie ma kopii treści maili.
- **Wypis** robi to samo co publiczny link: `unsubscribed_at`, wiersz zostaje (dziennik zgód), operacja idempotentna. Dodatkowo czyści oczekujące tokeny potwierdzenia, żeby stary link z maila nie przywrócił subskrypcji.
- **Ponowna wysyłka** tylko do potwierdzonych i nieaktywnych wypisaniem. Limit: jedna udana wysyłka na subskrybenta na minutę (nieudana próba nie blokuje kolejnej).
- **CSV**: BOM (polskie znaki w Excelu), CRLF, cudzysłowy escapowane, komórki zaczynające się od `=`, `+`, `-`, `@` poprzedzone apostrofem (formuła z pola `source` nie wykona się w arkuszu).

## Konfiguracja Cloudflare (Marcin, panel)

### 1. Cloudflare Access dla `/admin`

1. dash.cloudflare.com → **Zero Trust** → **Access controls** → **Applications** → **Create new application** → **Self-hosted and private**.
2. **Application name**: `mjoldak admin`.
3. **Add public hostname**:
   - Subdomain: `www`
   - Domain: `mjoldak.pl`
   - Path: `admin`
   To pokrywa `/admin` i wszystko pod nim, w tym `/admin/api/newsletter/*` używane przez panel. Jeśli wolisz jawnie, dodaj drugi wpis z Path `admin/api`.
   > Uwaga: samo `mjoldak.pl` bez `www` to parking OVH. Panel działa pod `https://www.mjoldak.pl/admin/newsletter/`.
4. **Access policies** → **Create new policy**:
   - Action: **Allow**
   - Include → **Emails** → wpisz swój adres (ten, na który chcesz dostawać kody).
   - (Opcjonalnie) Require → **Login methods** → `One-time PIN`, żeby tylko OTP wpuszczało na panel.
5. **Authentication** → upewnij się, że **One-time PIN** jest dostępny jako metoda logowania. Jeśli nie ma go na liście: Zero Trust → **Integrations** → **Identity providers** → **Add new identity provider** → **One-time PIN**.
6. Session duration: 24 h jest rozsądne dla panelu.
7. Zapisz aplikację.
8. Wejdź w aplikację → **Overview** (albo **Settings**) → skopiuj **Application Audience (AUD) Tag**. To 64 znaki hex.
9. Twój **team domain** to `<nazwa-zespolu>.cloudflareaccess.com` (Zero Trust → Settings → Custom pages / Team domain).

### 2. Zmienne w Cloudflare Pages

Workers & Pages → `mj-oldak` → Settings → **Variables and Secrets** → Production:

| Nazwa | Wartość | Typ |
| --- | --- | --- |
| `ACCESS_TEAM_DOMAIN` | `<nazwa-zespolu>.cloudflareaccess.com` | Plaintext |
| `ACCESS_AUD` | AUD Tag z kroku 1.8 | Plaintext |
| `NEWSLETTER_PDF_URL` | np. `/reports/broszura-msp.pdf` | Plaintext |
| `NEWSLETTER_PDF_NAME` | np. `broszura-msp.pdf` | Plaintext |

`RESEND_API_KEY` i `NEWSLETTER_FROM_EMAIL` już są, panel ich nie duplikuje.

`NEWSLETTER_PDF_URL` może być ścieżką na stronie (wtedy panel dokleja `PUBLIC_SITE_URL`) albo pełnym URL-em. Resend pobiera plik pod tym adresem przy wysyłce, więc musi być publicznie dostępny. Rozmiar załącznika: do 40 MB, czyli każdy obecny PDF w `public/reports/` się mieści.

### 3. Migracja bazy

```bash
npx wrangler d1 execute mj-oldak-newsletter --remote --file=migrations/0004_admin_audit.sql
```

Bez tej tabeli panel zwróci błąd przy akcjach i dzienniku. Lista i eksport działają, bo czytają tylko `subscribers`.

### 4. Pierwsze wejście

Otwórz `https://www.mjoldak.pl/admin/newsletter/`. Access poprosi o email, wyśle kod, po kodzie wpuszcza do panelu. W prawym górnym rogu panelu widać adres, który przeszedł przez Access. To on trafia do dziennika akcji.

## Praca lokalna

```bash
npm ci
npm run build

# baza lokalna + dane
npx wrangler d1 execute mj-oldak-newsletter --local --file=migrations/0001_newsletter.sql
npx wrangler d1 execute mj-oldak-newsletter --local --file=migrations/0002_contact_submissions.sql
npx wrangler d1 execute mj-oldak-newsletter --local --file=migrations/0003_digest.sql
npx wrangler d1 execute mj-oldak-newsletter --local --file=migrations/0004_admin_audit.sql

npx wrangler pages dev dist --binding ADMIN_DEV_BYPASS=1
```

`ADMIN_DEV_BYPASS=1` omija Access tylko na localhost. Do sprawdzenia wysyłki PDF potrzebne są jeszcze `RESEND_API_KEY`, `NEWSLETTER_PDF_URL` i `NEWSLETTER_PDF_NAME`; bez nich endpoint zwraca `503` z czytelnym komunikatem, zamiast próbować wysyłki.

## Czego tu celowo nie ma

- kampanii i broadcastów (jeden adres na żądanie, nie cała lista),
- edycji adresów i ręcznego dodawania subskrybentów (zgoda musi przyjść przez formularz),
- usuwania wierszy z bazy (wypis zostawia ślad dla RODO),
- ręcznego hasła, sesji, ról (to robi Access).
