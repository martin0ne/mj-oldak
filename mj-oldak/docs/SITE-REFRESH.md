# Odświeżanie strony (pnews, RSS, build-time dane)

## Problem, który to rozwiązuje

`/pnews/` pobiera RSS **w trakcie builda** (reguła z `docs/PNEWS-WARSTWA.md`: build-time RSS, zero runtime). To znaczy, że lista newsów ma datę ostatniego deployu, nie datę dzisiejszą.

**Stan zastany 05.11.2026:** ostatni build 03.11, więc Pnews pokazywał „3 listopada" i 126 pozycji — mimo że źródła miały świeższe wpisy. Nic się nie zepsuło; po prostu nie było rebuilda. Świeży build (5.11) daje 112 wpisów z 04–05.11 i licznik „5 listopada 2026".

## Rozwiązanie

Worker `mj-oldak-site-refresh` — cron **4:30 UTC codziennie** (5:30 zimą / 6:30 latem PL) wywołuje Cloudflare Pages **Deploy Hook**, czyli przebudowę z ostatniego commita. Zero zmian w kodzie strony, zero runtime'u RSS.

## Konfiguracja (Marcin, ~3 min)

1. **Deploy Hook w Cloudflare:**
   Dashboard → Workers & Pages → `mj-oldak` → Settings → Builds & deployments → **Deploy hooks** → *Add deploy hook*:
   - nazwa: `nightly-refresh`
   - branch: `main`
   → skopiuj URL (wygląda jak `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/...`)

2. **Sekrety i deploy Workera:**

```bash
cd ~/projects/mj-oldak/mj-oldak/workers/site-refresh
npx wrangler secret put DEPLOY_HOOK_URL     # wklej URL z kroku 1
npx wrangler secret put TRIGGER_KEY         # dowolny ciąg do ręcznego wywołania
npx wrangler deploy
```

3. **Test ręczny:**

```bash
curl "https://mj-oldak-site-refresh.<subdomain>.workers.dev/?key=TRIGGER_KEY"
# → {"ok":true,"status":200,...}
```

Po ~90 sekundach `/pnews/` powinien mieć dzisiejszą datę.

## Weryfikacja, że działa

```bash
curl -s https://www.mjoldak.pl/pnews/ | grep -o "ostatnia aktualizacja: [^<]*"
```

Data powinna być z dziś albo z wczoraj (cron chodzi nad ranem).

## Alternatywa bez Workera

Każdy `git push origin main` też wywołuje build. Jeśli deploy hooka nie chcesz konfigurować, wystarczy raz dziennie zrobić pusty commit:

```bash
git commit --allow-empty -m "chore: nightly rebuild" && git push
```

Ale to wymaga Twojego kliknięcia codziennie — Worker robi to sam.

## Uwaga o kosztach

CF Pages Free: **500 buildów miesięcznie**. Jeden dziennie = ~30. Nawet z dodatkowymi pushami mieścimy się z dużym zapasem.
