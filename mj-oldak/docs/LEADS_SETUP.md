# Leads pipeline setup — MJ.OLDAK

> **Co to jest:** instrukcja setupu hybrydowego pipeline'u leadów ze strony mjoldak.pl. Dwie równoległe ścieżki: **EmailJS** (mail → `biuro@mjoldak.pl`) + **Google Sheets** (persistent log). Failure mode tolerant — jeśli jedna padnie, druga łapie.

> **Architektura:** `Footer.jsx` → `Promise.allSettled([EmailJS, AppsScriptWebhook])` → succes jeśli ≥1 OK.

> **Wartime:** zero PLN poza Anthropic Max, zero infrastructure, free tier sufficient (Apps Script ~20k req/day anonymous).

---

## Setup (~10 min Twojego czasu)

### Krok 1 — Stwórz Google Sheet (1 min)

1. Otwórz https://sheets.google.com → blank
2. Nazwij: **MJ.OLDAK Leads**
3. Skopiuj URL Sheet'a (nie potrzebny w env, ale bookmark dla siebie)

> Apps Script auto-stworzy podsheet "Leads" z headerem przy pierwszym POST. Nie musisz ręcznie tworzyć kolumn.

### Krok 2 — Apps Script setup (5 min)

1. W otwartym Sheet: **Extensions → Apps Script** (otworzy nową kartę edytora)
2. Domyślnie zobaczysz `function myFunction() {}` w `Code.gs` — **usuń całość**
3. Otwórz lokalnie plik: `mj-oldak/scripts/leads-apps-script.gs` (w VS Code lub innym edytorze)
4. **Skopiuj cały content** → wklej do `Code.gs` w Apps Script editor
5. Klik dyskietkę (Save) → File name zostaw `Code.gs`

### Krok 3 — Deploy as Web App (2 min)

1. W Apps Script editor: prawy górny róg → **Deploy → New deployment**
2. Klik koło zębate przy "Select type" → **Web app**
3. Wypełnij:
   - **Description:** `MJ.OLDAK leads webhook v1`
   - **Execute as:** Me (`marcin.oldak00@gmail.com`)
   - **Who has access:** **Anyone** (NIE "Anyone with Google account" — public webhook)
4. Klik **Deploy**
5. Pierwsza autoryzacja: Apps Script poprosi o uprawnienia (`See, edit, create spreadsheets`) → **Authorize access** → wybierz konto → **Advanced → Go to [project name] (unsafe)** → **Allow**
   > Wszystko OK — Apps Script wymaga tej autoryzacji żeby append do Twojego Sheet'a. To kod który sam napisałeś (paste'owałeś), zero risk.
6. Po deploy zobaczysz **Web App URL** typu: `https://script.google.com/macros/s/AKfycb.../exec`
7. **Skopiuj ten URL** — będzie potrzebny w kroku 4

### Krok 4 — Sanity check Web App (30 sek)

Otwórz Web App URL w przeglądarce (GET request). Powinieneś zobaczyć:

```json
{
  "status": "ok",
  "service": "mjoldak-leads-webhook",
  "version": "1.0",
  "sheet": "Leads",
  "timestamp": "2026-05-06T..."
}
```

Jeśli widzisz JSON = endpoint działa ✓
Jeśli widzisz "Authorization required" lub HTML login page = krok 3 deploy settings są źle (sprawdź "Who has access: Anyone")

### Krok 5 — Dodaj env var lokalnie + Cloudflare Pages (2 min)

**Lokalnie** (`mj-oldak/.env`):
```
VITE_LEADS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

**Cloudflare Pages dashboard:**
1. dash.cloudflare.com → Workers & Pages → mj-oldak
2. Settings → Environment variables → Production
3. Add Variable:
   - Name: `VITE_LEADS_WEBHOOK_URL`
   - Value: ten sam URL z lokalnego .env
   - Type: **Plaintext** (NIE Secret — Vite inline'uje env vars w bundle, public URL acceptable)
4. Save

> Plus przy okazji upewnij się że 3 EmailJS env vars są też dodane (z `.env` Marcin'a) per `docs/LEADS_SETUP.md` style — Footer.jsx korzysta z **wszystkich 4** zmiennych:
> - `VITE_EMAILJS_SERVICE_ID`
> - `VITE_EMAILJS_TEMPLATE_ID`
> - `VITE_EMAILJS_PUBLIC_KEY`
> - `VITE_LEADS_WEBHOOK_URL` ← NEW

### Krok 6 — Commit + push Footer.jsx changes (1 min)

```bash
cd "/Users/marcinoldak/Documents/Claude/Projects/Firma/MY Website/mj-oldak"
git status                          # sanity check — Footer.jsx zmieniony, scripts/ + docs/ nowe
git add src/components/Footer.jsx scripts/leads-apps-script.gs docs/LEADS_SETUP.md
git commit -m "feat(leads): hybrid pipeline EmailJS + Google Sheets

- Footer.jsx: Promise.allSettled([emailjs, sheets]) — partial success acceptable
- scripts/leads-apps-script.gs: Apps Script Web App handler (POST → Sheet row)
- docs/LEADS_SETUP.md: 6-step setup guide
- Schema: timestamp / name / email / message / source / status / user_agent / referrer
- Honeypot field defense (silent drop dla botów)
- 8-field row append, header auto-create, frozen header row

Wartime alignment: 0 PLN, free tier (Apps Script 20k req/day anonymous),
zero infra, Marcin może otworzyć Sheet w 2 sec na phone."
git push
```

CF Pages auto-deploy. **Wymaga** że krok 5 (env vars) jest done PRZED tym push'em — inaczej build wyemituje undefined dla `VITE_LEADS_WEBHOOK_URL` i pipeline Sheets fail'uje silently (ale EmailJS nadal działa).

### Krok 7 — Test prod (3 min)

1. Incognito → mjoldak.pl
2. DevTools (F12) → Console + Network tabs otwarte
3. Wypełnij form: testowe dane
4. Submit

**Expected:**
- Console: `[MJ.OLDAK] Lead captured locally: {...}` → potem `[MJ.OLDAK] Lead delivered: {emailOk: true, sheetsOk: true}`
- Network: 2 requests success — EmailJS API endpoint + Apps Script Web App URL (oba 200 OK)
- UI: button → "Wysyłanie..." → "Wysłano" zielono
- Email w `biuro@mjoldak.pl` w <30 sec
- **Google Sheet → otwórz "Leads" subsheet** — nowa wiersz z timestamp + Twoimi testowymi danymi + Status `NEW`

**Negative tests (opcjonalnie):**
- Tymczasowo skasuj `VITE_LEADS_WEBHOOK_URL` w CF Pages → redeploy → submit form → Console pokazuje `[MJ.OLDAK] Sheets pipeline failed: Error: sheets_not_configured`, ALE `[MJ.OLDAK] Lead delivered: {emailOk: true, sheetsOk: false}` — partial success, user widzi "Wysłano" → mail nadal dociera, Sheet nie. **Restore env var → redeploy.**
- Tymczasowo skasuj jeden z `VITE_EMAILJS_*` → analogicznie partial success (Sheets łapie, mail nie).
- Skasuj **wszystkie 4** → submit → status 'error' → fallback red box z mailto: pokazuje się.

---

## Operowanie po setup

### Dzień powszedni
- Bookmark Google Sheet → otwierasz codziennie rano (lub Apple Mail notification dla biuro@mjoldak.pl)
- Status workflow: `NEW` → ręcznie edytujesz na `IN_PROGRESS` po pierwszym kontakcie → `RESPONDED` po wysłaniu odpowiedzi → `CLOSED` po deal lub graceful exit
- Filtruj kolumnę Status w Sheet żeby zobaczyć tylko aktywne leady

### Free tier limits (Apps Script anonymous Web App)
- ~20k requests/day (na pewno wystarczy MJ.OLDAK volume — przewidywalne ≤20 leads/day max)
- 100 simultaneous executions (irrelevant dla low volume)
- Per-request timeout: 6 minut (irrelevant — POST jest milisekundowy)

### Quota burn signal (kiedy migrate na Pages Function + D1)
- Google Sheet >5000 wierszy (slow load)
- Apps Script timeout errors w Console
- Bot spam z honeypot bypass (>50/day)

→ Wtedy **peacetime trigger:** migrate na Cloudflare Pages Function (memory `project_workflow_integration_06_05.md` open loop).

### Bezpieczeństwo

- Web App URL jest publicznie POST-owalny — **każdy z URL'em może append wiersz do Sheet'a**
- **Defense in place:**
  - Honeypot field `website` w Apps Script (silently drop bot submissions)
  - Field length limits (200/200/5000/...) zapobiega massive payload'om
  - Apps Script daily quota = naturalny rate-limit
- **NIE wkładaj sensitive data** do Apps Script kodu (URL i tak public, ale code = private)

---

## Rollback (jeśli coś się sypnie)

### Opcja 1: Disable Sheets pipeline tylko (zachowaj EmailJS)
1. Cloudflare Pages → usuń `VITE_LEADS_WEBHOOK_URL` env var → redeploy
2. Footer.jsx wykryje brak config → `Promise.reject('sheets_not_configured')` → EmailJS sam robi pipeline

### Opcja 2: Pełen rollback Footer.jsx
```bash
cd "/Users/marcinoldak/Documents/Claude/Projects/Firma/MY Website/mj-oldak"
git revert HEAD                     # cofnij commit hybrid pipeline
git push
```

CF Pages re-deploy ze starszym Footer.jsx (z dzisiejszego morning fixu = EmailJS + safety net + mailto fallback). Sheets endpoint zostaje, ale niewykorzystany.

### Opcja 3: Disable Apps Script Web App (kasuje endpoint)
Apps Script editor → Deploy → Manage Deployments → "Archive" → endpoint URL przestaje działać. Ale frontend nadal próbuje — fail w `Promise.allSettled`. Lepsze: zostaw endpoint live + usuń env var (Opcja 1).

---

## Future extensions (peacetime, NIE teraz)

Per `feedback_brand_stealth_positioning.md` chronology + Persona CEO weto #66/67:

- **Status auto-notification** (klient dostaje mail gdy status zmienia się) → wymagałby Apps Script trigger on edit + email send
- **Multi-tenant** (kumpel serwisu laptopów) → osobna Sheet + osobny Apps Script + osobny endpoint = świadoma copy, NIE shared infrastructure
- **Migrate na Cloudflare Pages Function + D1** → zero SaaS dependency, full control
- **Notion sync** → Apps Script sync trigger do Notion API (jeśli kiedyś chcesz Notion CRM)

**Wszystko peacetime trigger:** ≥3 paying klients retention ≥6 mc.
