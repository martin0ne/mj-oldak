// GET /admin/api/newsletter/export?q=&status=
// CSV bieżącego filtra (bez stronicowania). Eksport jest akcją administracyjną, więc trafia do dziennika.

import { requireAdmin, json, type AdminEnv } from '../../../_lib/auth';
import { exportRows, logAudit, parseListParams, toCsv } from '../../../_lib/newsletter-admin';

export const onRequestGet: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return auth.response;

  try {
    const params = parseListParams(new URL(request.url));
    const rows = await exportRows(env.DB, params);

    await logAudit(env.DB, {
      actor: auth.actor,
      action: 'newsletter.export',
      detail: `status=${params.status} q=${params.q || '-'} rows=${rows.length}`,
    });

    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(toCsv(rows), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="subskrybenci-${params.status}-${stamp}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    console.error('admin export error', e);
    return json({ error: 'Nie udało się wygenerować eksportu.' }, { status: 500 });
  }
};
