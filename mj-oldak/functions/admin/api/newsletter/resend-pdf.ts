// POST /admin/api/newsletter/resend-pdf  { id: number }
// Ponowna wysyłka maila z PDF-em do potwierdzonego subskrybenta.
//
// Świadomie NIE jest to broadcast: jeden adres z bazy, jeden mail, ta sama treść co przy zapisie.
// Mail nie jest nigdzie zapisywany: treść powstaje w pamięci, w bazie zostaje tylko wpis w dzienniku akcji.
//
// Wymaga NEWSLETTER_PDF_URL (np. /reports/broszura-msp.pdf) i NEWSLETTER_PDF_NAME w zmiennych Pages.

import { requireAdmin, json, type AdminEnv } from '../../../_lib/auth';
import { getSubscriber, logAudit, recentSuccessfulResend } from '../../../_lib/newsletter-admin';

const RESEND_MIN_GAP_MS = 60 * 1000;
const DEFAULT_FROM = 'noreply@mjoldak.pl';
const DEFAULT_SITE = 'https://www.mjoldak.pl';
const DEFAULT_RESEND_URL = 'https://api.resend.com/emails';

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return auth.response;

  if (!sameOrigin(request)) {
    return json({ error: 'Nieprawidłowe źródło żądania.' }, { status: 403 });
  }

  const pdfUrl = (env.NEWSLETTER_PDF_URL || '').trim();
  const pdfName = (env.NEWSLETTER_PDF_NAME || '').trim() || 'material.pdf';
  if (!pdfUrl) {
    return json(
      { error: 'Nie ustawiono NEWSLETTER_PDF_URL, więc nie ma czego wysyłać.' },
      { status: 503 }
    );
  }
  if (!env.RESEND_API_KEY) {
    return json({ error: 'Brak klucza Resend w konfiguracji Pages.' }, { status: 503 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { id?: number };
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return json({ error: 'Brak poprawnego identyfikatora.' }, { status: 400 });
    }

    const row = await getSubscriber(env.DB, id);
    if (!row) {
      return json({ error: 'Nie ma takiego subskrybenta.' }, { status: 404 });
    }
    if (!row.confirmed_at) {
      return json({ error: 'Ten adres nie potwierdził subskrypcji. Najpierw double opt-in.' }, { status: 409 });
    }
    if (row.unsubscribed_at) {
      return json({ error: 'Ten adres jest wypisany. Nie wysyłam maili.' }, { status: 409 });
    }

    // Liczy się tylko udana wysyłka. Nieudana próba nie może blokować kolejnej.
    const recent = await recentSuccessfulResend(env.DB, row.id, RESEND_MIN_GAP_MS / 1000);

    if (recent) {
      return json(
        { error: 'Ten mail poszedł chwilę temu. Odczekaj minutę, żeby nie mnożyć wiadomości.' },
        { status: 429 }
      );
    }

    const site = (env.PUBLIC_SITE_URL || DEFAULT_SITE).replace(/\/+$/, '');
    const absolutePdfUrl = pdfUrl.startsWith('http') ? pdfUrl : `${site}${pdfUrl.startsWith('/') ? '' : '/'}${pdfUrl}`;
    const unsubscribeUrl = `${site}/api/newsletter/unsubscribe/${row.unsubscribe_token}`;
    // RESEND_API_URL istnieje tylko po to, żeby dało się sprawdzić ścieżkę lokalnie (stub).
    // W produkcji zmienna nie jest ustawiona i request idzie do api.resend.com.
    const resendUrl = (env.RESEND_API_URL || DEFAULT_RESEND_URL).trim();

    const resendResp = await fetch(resendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.NEWSLETTER_FROM_EMAIL || DEFAULT_FROM,
        to: row.email,
        subject: 'Twój PDF z MJ.OLDAK',
        html: renderPdfEmail({ pdfUrl: absolutePdfUrl, unsubscribeUrl, email: row.email }),
        text: renderPdfText({ pdfUrl: absolutePdfUrl, unsubscribeUrl, email: row.email }),
        attachments: [{ filename: pdfName, path: absolutePdfUrl }],
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      }),
    });

    if (!resendResp.ok) {
      const err = (await resendResp.text()).slice(0, 300);
      console.error('admin resend pdf failed', resendResp.status, err);
      await logAudit(env.DB, {
        actor: auth.actor,
        action: 'newsletter.resend_pdf',
        outcome: 'error',
        subscriberId: row.id,
        detail: `Resend ${resendResp.status}: ${err.slice(0, 120)}`,
      });
      return json({ error: `Resend odrzucił wysyłkę (${resendResp.status}).` }, { status: 502 });
    }

    await logAudit(env.DB, {
      actor: auth.actor,
      action: 'newsletter.resend_pdf',
      outcome: 'ok',
      subscriberId: row.id,
      detail: `wysłano PDF: ${pdfName}`,
    });

    return json({ ok: true, message: `Mail z PDF-em poszedł do ${row.email}.` });
  } catch (e) {
    console.error('admin resend pdf error', e);
    return json({ error: 'Nie udało się wysłać maila.' }, { status: 500 });
  }
};

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function renderPdfText({
  pdfUrl,
  unsubscribeUrl,
  email,
}: {
  pdfUrl: string;
  unsubscribeUrl: string;
  email: string;
}): string {
  return `Twój PDF z MJ.OLDAK\n\nPobierz: ${pdfUrl}\n\nWysyłam ponownie, bo o to poprosiłeś. Adres: ${email}.\n\nWypisz się jednym klikiem: ${unsubscribeUrl}\n\nMarcin Ołdak · MJ.OLDAK SYSTEMS\nbiuro@mjoldak.pl · https://mjoldak.pl`;
}

function renderPdfEmail({
  pdfUrl,
  unsubscribeUrl,
  email,
}: {
  pdfUrl: string;
  unsubscribeUrl: string;
  email: string;
}): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><title>Twój PDF z MJ.OLDAK</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.55; color: #0D1B32; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #E4DBCD;">
  <h2 style="font-weight: 700; font-size: 22px; margin: 0 0 20px; letter-spacing: -0.02em;">Twój PDF z MJ.OLDAK</h2>
  <p style="margin: 0 0 16px; font-size: 16px;">Wysyłam materiał ponownie na adres <strong>${escapeHtml(email)}</strong>.</p>
  <p style="margin: 0 0 28px; font-size: 16px;">Plik jest w załączniku. Jeśli wolisz pobrać go z przeglądarki, jest też pod tym linkiem.</p>
  <p style="margin: 0 0 28px;">
    <a href="${escapeHtml(pdfUrl)}" style="display: inline-block; background: #4F8EBA; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">
      Pobierz PDF
    </a>
  </p>
  <p style="margin: 0 0 8px; font-size: 13px; color: #555;">Lub wklej link w przeglądarce:</p>
  <p style="margin: 0 0 24px; font-size: 12px; color: #555; word-break: break-all;">${escapeHtml(pdfUrl)}</p>
  <hr style="border: 0; border-top: 1px solid rgba(13,27,50,0.15); margin: 28px 0;">
  <p style="margin: 0 0 4px; font-size: 13px;"><strong>Marcin Ołdak</strong> · MJ.OLDAK SYSTEMS</p>
  <p style="margin: 0 0 12px; font-size: 13px; color: #555;">biuro@mjoldak.pl · <a href="https://mjoldak.pl" style="color: #4F8EBA;">mjoldak.pl</a></p>
  <p style="margin: 0; font-size: 12px; color: #6B7280;">
    Dostajesz tego maila, bo potwierdziłeś subskrypcję na mjoldak.pl.
    <a href="${escapeHtml(unsubscribeUrl)}" style="color: #6B7280;">Wypisz się jednym klikiem</a>.
  </p>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
