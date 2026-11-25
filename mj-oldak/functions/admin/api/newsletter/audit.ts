// GET /admin/api/newsletter/audit?limit=20
// Ostatnie akcje administracyjne (kto, kiedy, co). Tylko odczyt.

import { requireAdmin, json, type AdminEnv } from '../../../_lib/auth';
import { recentAudit } from '../../../_lib/newsletter-admin';

export const onRequestGet: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return auth.response;

  try {
    const limit = Number.parseInt(new URL(request.url).searchParams.get('limit') || '20', 10);
    const entries = await recentAudit(env.DB, Number.isFinite(limit) ? limit : 20);
    return json({ entries });
  } catch (e) {
    console.error('admin audit error', e);
    return json({ error: 'Nie udało się wczytać dziennika.' }, { status: 500 });
  }
};
