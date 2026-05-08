// POST /api/newsletter/subscribe
// Body: { email: string, consent: true, source?: string }
// → 200: { ok: true } (confirmation email sent)
// → 400: invalid input
// → 409: already subscribed (active)
// → 500: server error

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  NEWSLETTER_FROM_EMAIL: string;
  PUBLIC_SITE_URL: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONSENT_VERSION = '2026-05-08-v1';
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json<{ email?: string; consent?: boolean; source?: string }>();
    const email = (body.email || '').trim().toLowerCase();
    const consent = body.consent === true;
    const source = (body.source || '/').slice(0, 200);

    if (!email || !EMAIL_RE.test(email) || !consent) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }

    const ip = request.headers.get('cf-connecting-ip') || '';
    const ua = (request.headers.get('user-agent') || '').slice(0, 500);

    const existing = await env.DB.prepare(
      'SELECT id, confirmed_at, unsubscribed_at FROM subscribers WHERE email = ?'
    ).bind(email).first();

    if (existing && existing.confirmed_at && !existing.unsubscribed_at) {
      return Response.json({ error: 'Already subscribed' }, { status: 409 });
    }

    if (existing) {
      // Re-issue confirmation (stale unconfirmed or previously unsubscribed re-subscribing)
      await env.DB.prepare(
        'UPDATE subscribers SET ip = ?, user_agent = ?, source = ?, consent_version = ?, unsubscribed_at = NULL WHERE email = ?'
      ).bind(ip, ua, source, CONSENT_VERSION, email).run();
    } else {
      await env.DB.prepare(
        'INSERT INTO subscribers (email, ip, user_agent, source, consent_version, unsubscribe_token) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(email, ip, ua, source, CONSENT_VERSION, crypto.randomUUID()).run();
    }

    // Replace any pending confirmation tokens for this email
    await env.DB.prepare('DELETE FROM confirmation_tokens WHERE email = ?').bind(email).run();
    const uuid = crypto.randomUUID();
    const expires = new Date(Date.now() + TOKEN_TTL_MS).toISOString();
    await env.DB.prepare(
      'INSERT INTO confirmation_tokens (uuid, email, expires_at) VALUES (?, ?, ?)'
    ).bind(uuid, email, expires).run();

    const confirmUrl = `${env.PUBLIC_SITE_URL}/api/newsletter/confirm/${uuid}`;
    const html = renderConfirmEmail({ confirmUrl, email });
    const text = `Potwierdź subskrypcję newslettera MJ.OLDAK.\n\nKliknij aby potwierdzić: ${confirmUrl}\n\nLink ważny 24h. Jeśli to nie Ty — zignoruj tego maila.\n\n--\nMarcin Ołdak · MJ.OLDAK SYSTEMS\nbiuro@mjoldak.pl · https://mjoldak.pl`;

    const resendResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.NEWSLETTER_FROM_EMAIL,
        to: email,
        subject: 'Potwierdź subskrypcję newslettera MJ.OLDAK',
        html,
        text,
      }),
    });

    if (!resendResp.ok) {
      const err = await resendResp.text();
      console.error('Resend failed', resendResp.status, err);
      return Response.json({ error: 'Failed to send confirmation' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('subscribe error', e);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
};

function renderConfirmEmail({ confirmUrl, email }: { confirmUrl: string; email: string }): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><title>Potwierdź subskrypcję · MJ.OLDAK</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.55; color: #0D1B32; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #E4DBCD;">
  <h2 style="font-weight: 700; font-size: 22px; margin: 0 0 20px; letter-spacing: -0.02em;">Potwierdź subskrypcję newslettera MJ.OLDAK</h2>
  <p style="margin: 0 0 16px; font-size: 16px;">Hej, dostałem zgłoszenie subskrypcji z adresu <strong>${escapeHtml(email)}</strong>.</p>
  <p style="margin: 0 0 28px; font-size: 16px;">Aby aktywować — kliknij poniższy przycisk. Bez tego nie wpisuję Cię na listę.</p>
  <p style="margin: 0 0 28px;">
    <a href="${confirmUrl}" style="display: inline-block; background: #4F8EBA; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">
      Potwierdzam subskrypcję
    </a>
  </p>
  <p style="margin: 0 0 8px; font-size: 13px; color: #555;">Lub wklej link w przeglądarce:</p>
  <p style="margin: 0 0 24px; font-size: 12px; color: #555; word-break: break-all;">${confirmUrl}</p>
  <p style="margin: 0 0 24px; font-size: 13px; color: #555;">Link ważny 24 godziny. Jeśli to nie Ty — zignoruj wiadomość.</p>
  <hr style="border: 0; border-top: 1px solid rgba(13,27,50,0.15); margin: 28px 0;">
  <p style="margin: 0 0 4px; font-size: 13px;"><strong>Marcin Ołdak</strong> · MJ.OLDAK SYSTEMS</p>
  <p style="margin: 0; font-size: 13px; color: #555;">biuro@mjoldak.pl · <a href="https://mjoldak.pl" style="color: #4F8EBA;">mjoldak.pl</a></p>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
