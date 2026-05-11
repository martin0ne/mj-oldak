// POST /api/contact/submit
// Body: { name, email, message, consent: true, source?, website? (honeypot) }
// → 200: { ok: true } (saved + email forwarded)
// → 400: invalid input
// → 429: rate limited (>5 submissions/10min/IP)
// → 500: server error

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  NEWSLETTER_FROM_EMAIL: string;
  PUBLIC_SITE_URL: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONSENT_VERSION = '2026-05-08-v1';
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_MINUTES = 10;
const NOTIFICATION_TO = 'biuro@mjoldak.pl';
const MAX_NAME = 200;
const MAX_MSG = 5000;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json<{
      name?: string;
      email?: string;
      message?: string;
      consent?: boolean;
      source?: string;
      website?: string; // honeypot
    }>();

    // Honeypot trap — silent success to fool bot
    if (body.website && body.website.trim().length > 0) {
      return Response.json({ ok: true });
    }

    const name = (body.name || '').trim().slice(0, MAX_NAME);
    const email = (body.email || '').trim().toLowerCase();
    const message = (body.message || '').trim().slice(0, MAX_MSG);
    const consent = body.consent === true;
    const source = (body.source || '/').slice(0, 200);

    if (!name || !email || !message || !EMAIL_RE.test(email) || !consent) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }

    const ip = request.headers.get('cf-connecting-ip') || '';
    const ua = (request.headers.get('user-agent') || '').slice(0, 500);

    // Rate limit per IP
    if (ip) {
      const recent = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM contact_submissions WHERE ip = ? AND created_at > datetime('now', '-${RATE_LIMIT_MINUTES} minutes')`
      ).bind(ip).first<{ cnt: number }>();

      if (recent && recent.cnt >= RATE_LIMIT_COUNT) {
        return Response.json(
          { error: `Zbyt wiele wiadomości (>${RATE_LIMIT_COUNT}/${RATE_LIMIT_MINUTES}min). Spróbuj za chwilę.` },
          { status: 429 }
        );
      }
    }

    // Persist
    await env.DB.prepare(
      'INSERT INTO contact_submissions (name, email, message, ip, user_agent, source, consent_version, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(name, email, message, ip, ua, source, CONSENT_VERSION, 'new').run();

    // Forward to biuro@mjoldak.pl via Resend (reply_to: kontaktujący)
    const html = renderForwardEmail({ name, email, message, source, ip, ua });
    const text = `Imię/biuro: ${name}\nEmail: ${email}\n\n${message}\n\n--\nSource: ${source}\nIP: ${ip}\nConsent: ${CONSENT_VERSION}`;

    const resendResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.NEWSLETTER_FROM_EMAIL,
        to: NOTIFICATION_TO,
        reply_to: email,
        subject: `[mjoldak.pl] Kontakt: ${name.slice(0, 80)}`,
        html,
        text,
      }),
    });

    if (!resendResp.ok) {
      const err = await resendResp.text();
      console.error('Resend forward failed', resendResp.status, err);
      // Don't fail user — DB save sukces, ja sprawdzę logs
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('contact submit error', e);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
};

function renderForwardEmail({
  name,
  email,
  message,
  source,
  ip,
  ua,
}: {
  name: string;
  email: string;
  message: string;
  source: string;
  ip: string;
  ua: string;
}): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><title>Nowy kontakt z mjoldak.pl</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.55; color: #0D1B32; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
  <h2 style="font-weight: 700; font-size: 20px; margin: 0 0 20px; letter-spacing: -0.01em;">Nowa wiadomość z formularza kontaktowego</h2>
  <p style="margin: 0 0 12px; font-size: 15px;"><strong>Imię/biuro:</strong> ${escapeHtml(name)}</p>
  <p style="margin: 0 0 12px; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #4F8EBA;">${escapeHtml(email)}</a></p>
  <p style="margin: 20px 0 8px; font-size: 13px; color: #555; letter-spacing: 0.05em; text-transform: uppercase;"><strong>Treść:</strong></p>
  <blockquote style="background: rgba(79,142,186,0.08); padding: 16px 20px; border-left: 3px solid #4F8EBA; margin: 0 0 24px; border-radius: 0 4px 4px 0; font-size: 15px;">
    ${escapeHtml(message).replace(/\n/g, '<br>')}
  </blockquote>
  <hr style="border: 0; border-top: 1px solid #ddd; margin: 24px 0;">
  <p style="margin: 0; font-size: 12px; color: #666;">
    <strong>Source:</strong> ${escapeHtml(source)}<br>
    <strong>IP:</strong> ${escapeHtml(ip || 'unknown')}<br>
    <strong>UA:</strong> ${escapeHtml(ua.slice(0, 120))}<br>
    <strong>Consent version:</strong> ${CONSENT_VERSION}
  </p>
  <p style="margin: 16px 0 0; font-size: 12px; color: #888;">
    Aby odpisać klientowi — kliknij <strong>Reply</strong> (Reply-To ustawione na adres klienta).
  </p>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
