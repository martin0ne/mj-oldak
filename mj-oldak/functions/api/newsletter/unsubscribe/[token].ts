// GET /api/newsletter/unsubscribe/:token
// One-click unsubscribe (RODO Art. 7 ust. 3 — withdraw consent)
// Token = subscribers.unsubscribe_token (stable, embed in every newsletter footer)

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env, 'token'> = async ({ params, env, request }) => {
  const token = String(params.token || '');
  const origin = new URL(request.url).origin;

  if (!token) {
    return Response.redirect(`${origin}/newsletter/blad`, 302);
  }

  try {
    const result = await env.DB.prepare(
      'UPDATE subscribers SET unsubscribed_at = ? WHERE unsubscribe_token = ? AND unsubscribed_at IS NULL'
    ).bind(new Date().toISOString(), token).run();

    if (result.meta.changes === 0) {
      // Already unsubscribed or invalid token — show neutral landing anyway (don't leak existence)
      return Response.redirect(`${origin}/newsletter/wypisany`, 302);
    }

    return Response.redirect(`${origin}/newsletter/wypisany`, 302);
  } catch (e) {
    console.error('unsubscribe error', e);
    return Response.redirect(`${origin}/newsletter/blad?reason=error`, 302);
  }
};
