// GET /api/newsletter/confirm/:uuid
// Verify token → mark subscriber confirmed → redirect /newsletter/dziekuje
// Expired/invalid → redirect /newsletter/blad

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env, 'uuid'> = async ({ params, env, request }) => {
  const uuid = String(params.uuid || '');
  const origin = new URL(request.url).origin;

  if (!uuid) {
    return Response.redirect(`${origin}/newsletter/blad`, 302);
  }

  try {
    const token = await env.DB.prepare(
      'SELECT email, expires_at FROM confirmation_tokens WHERE uuid = ?'
    ).bind(uuid).first<{ email: string; expires_at: string }>();

    if (!token) {
      return Response.redirect(`${origin}/newsletter/blad`, 302);
    }

    if (new Date(token.expires_at) < new Date()) {
      // Cleanup expired
      await env.DB.prepare('DELETE FROM confirmation_tokens WHERE uuid = ?').bind(uuid).run();
      return Response.redirect(`${origin}/newsletter/blad?reason=expired`, 302);
    }

    await env.DB.prepare(
      'UPDATE subscribers SET confirmed_at = ?, unsubscribed_at = NULL WHERE email = ?'
    ).bind(new Date().toISOString(), token.email).run();

    await env.DB.prepare('DELETE FROM confirmation_tokens WHERE uuid = ?').bind(uuid).run();

    return Response.redirect(`${origin}/newsletter/dziekuje`, 302);
  } catch (e) {
    console.error('confirm error', e);
    return Response.redirect(`${origin}/newsletter/blad?reason=error`, 302);
  }
};
