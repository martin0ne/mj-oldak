// POST /admin/api/newsletter/unsubscribe  { id: number }
// Wypis z panelu. Semantyka jak publiczny link jednoklikowy: ustawia unsubscribed_at,
// wiersz zostaje (dziennik zgód), operacja jest idempotentna.

import { requireAdmin, json, type AdminEnv } from '../../../_lib/auth';
import {
  getSubscriber,
  logAudit,
  unsubscribeSubscriber,
} from '../../../_lib/newsletter-admin';

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return auth.response;

  if (!sameOrigin(request)) {
    return json({ error: 'Nieprawidłowe źródło żądania.' }, { status: 403 });
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

    const result = await unsubscribeSubscriber(env.DB, row, new Date().toISOString());

    await logAudit(env.DB, {
      actor: auth.actor,
      action: 'newsletter.unsubscribe',
      subscriberId: row.id,
      detail: result.changed
        ? `wypis z panelu, usunięte tokeny potwierdzenia: ${result.tokensRemoved}`
        : 'już wypisany, bez zmian',
    });

    return json({
      ok: true,
      changed: result.changed,
      status: 'wypisany',
      message: result.changed ? 'Subskrybent wypisany.' : 'Ten adres był już wypisany.',
    });
  } catch (e) {
    console.error('admin unsubscribe error', e);
    return json({ error: 'Nie udało się wypisać subskrybenta.' }, { status: 500 });
  }
};

/** Cookie Access jest wysyłane przez przeglądarkę, więc wymagamy zgodnego Origin. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
