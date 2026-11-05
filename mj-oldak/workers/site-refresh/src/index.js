// site-refresh — codzienny rebuild strony przez Cloudflare Pages Deploy Hook.
//
// Dlaczego: /pnews/ pobiera RSS w czasie builda (docs/PNEWS-WARSTWA.md, reguła
// „build-time RSS, zero runtime"). Bez nowego builda lista stoi na dacie ostatniego
// deployu — dokładnie to się stało 03.11.2026.
//
// Cron: 4:30 UTC codziennie (5:30 zimą / 6:30 latem czasu PL).
// Ręcznie: https://<worker>.workers.dev/?key=TRIGGER_KEY

export default {
  async scheduled(_event, env) {
    const r = await rebuild(env);
    console.log('refresh', JSON.stringify(r));
  },

  async fetch(request, env) {
    const url = new URL(request.url);
    if (env.TRIGGER_KEY && url.searchParams.get('key') !== env.TRIGGER_KEY) {
      return new Response('forbidden', { status: 403 });
    }
    return Response.json(await rebuild(env));
  },
};

async function rebuild(env) {
  const started = new Date().toISOString();
  if (!env.DEPLOY_HOOK_URL) {
    return { ok: false, error: 'DEPLOY_HOOK_URL not set', started };
  }
  try {
    const resp = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
    const body = (await resp.text()).slice(0, 200);
    return { ok: resp.ok, status: resp.status, body, started };
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 200), started };
  }
}
