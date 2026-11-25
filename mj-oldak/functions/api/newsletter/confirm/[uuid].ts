// GET /api/newsletter/confirm/:uuid
// Verify token → mark subscriber confirmed → redirect /newsletter/dziekuje
// Expired/invalid → redirect /newsletter/blad

interface Env {
  DB: D1Database;
  RESEND_API_KEY?: string;
  NEWSLETTER_FROM_EMAIL?: string;
  /** Ścieżka lub pełny URL do PDF-a wysyłanego po potwierdzeniu.
   *  Współdzielone z panelem /admin/newsletter (resend-pdf.ts) — jedno źródło prawdy. */
  NEWSLETTER_PDF_URL?: string;
  /** Nazwa pliku w mailu, np. "slownik-ai.pdf". */
  NEWSLETTER_PDF_NAME?: string;
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

    // Wyślij PDF z pełnym słownikiem. Best effort: jeśli padnie, użytkownik i tak
    // może pobrać plik ze strony /newsletter/dziekuje.
    try {
      await sendDictionaryPdf(env, token.email, origin);
    } catch (e) {
      console.error('PDF delivery failed', e);
    }

    return Response.redirect(`${origin}/newsletter/dziekuje`, 302);
  } catch (e) {
    console.error('confirm error', e);
    return Response.redirect(`${origin}/newsletter/blad?reason=error`, 302);
  }
};

/**
 * Wysyła mail z linkiem do PDF (nie załącznikiem).
 * Link zamiast załącznika: mniejszy mail, brak problemów ze skrzynkami firmowymi
 * blokującymi PDF-y, i plik zawsze w najnowszej wersji (można podmienić bez wysyłki).
 *
 * URL i nazwa pliku czytane z NEWSLETTER_PDF_URL / NEWSLETTER_PDF_NAME — te same zmienne
 * używa panel /admin/newsletter (resend-pdf.ts), więc jest jedno źródło prawdy.
 */
async function sendDictionaryPdf(env: Env, to: string, origin: string) {
  if (!env.RESEND_API_KEY) {
    console.warn('no RESEND_API_KEY, skipping dictionary mail');
    return;
  }

  const rawPdf = (env.NEWSLETTER_PDF_URL || '').trim();
  if (!rawPdf) {
    console.warn('no NEWSLETTER_PDF_URL, skipping dictionary mail');
    return;
  }

  const site = 'https://www.mjoldak.pl';
  const pdfUrl = rawPdf.startsWith('http') ? rawPdf : `${site}${rawPdf.startsWith('/') ? '' : '/'}${rawPdf}`;
  const pdfName = (env.NEWSLETTER_PDF_NAME || '').trim() || 'slownik-ai.pdf';
  const siteUrl = `${site}/slownik-ai/`;

  const html = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><title>Czterdzieści haseł, dwanaście na stronie</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #0a0a0a; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
  <h2 style="font-weight: 700; font-size: 21px; margin: 0 0 20px; letter-spacing: -0.02em;">Słownik AI — czterdzieści haseł</h2>

  <p style="margin: 0 0 16px; font-size: 16px;">PDF jest gotowy. Czterdzieści haseł w trzech blokach: podstawy, praca biurowa, ryzyka i granice.</p>

  <p style="margin: 0 0 28px;">
    <a href="${pdfUrl}" style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 13px 26px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">Pobierz ${escapeAttr(pdfName)}</a>
  </p>

  <p style="margin: 0 0 8px; font-size: 13px; color: #555;">Lub wklej link:</p>
  <p style="margin: 0 0 24px; font-size: 12px; color: #555; word-break: break-all;">${pdfUrl}</p>

  <p style="margin: 0 0 16px; font-size: 15px;">Dwanaście haseł zostaje na stronie i nigdzie nie zniknie: <a href="${siteUrl}" style="color: #0a0a0a;">${siteUrl}</a></p>

  <p style="margin: 0 0 24px; font-size: 14px; color: #555;">Następny mail dostaniesz, kiedy zmieni się słownik albo będę miał nowy materiał. Nie mam serii powitalnej.</p>

  <hr style="border: 0; border-top: 1px solid rgba(10,10,10,0.15); margin: 28px 0;">
  <p style="margin: 0 0 4px; font-size: 13px;"><strong>Marcin Ołdak</strong> · korepetycje AI</p>
  <p style="margin: 0; font-size: 13px; color: #555;">biuro@mjoldak.pl · <a href="https://www.mjoldak.pl" style="color: #555;">mjoldak.pl</a></p>
</body></html>`;

  const text = `Słownik AI — czterdzieści haseł.

Pobierz PDF: ${pdfUrl}

Dwanaście haseł zostaje na stronie: ${siteUrl}

Następny mail dostaniesz, kiedy zmieni się słownik albo pojawi się nowy materiał.

--
Marcin Ołdak · korepetycje AI
biuro@mjoldak.pl`;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.NEWSLETTER_FROM_EMAIL || 'noreply@mjoldak.pl',
      to,
      subject: 'Czterdzieści haseł, dwanaście na stronie',
      html,
      text,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error('Resend dictionary failed ' + resp.status + ': ' + err.slice(0, 200));
  }
}

/** Minimalne escapowanie do treści HTML — nazwa pliku pochodzi ze zmiennej środowiskowej. */
function escapeAttr(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
