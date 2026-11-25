// GET /admin/api/newsletter/subscribers?q=&status=&page=&per=
// Lista subskrybentów + liczniki + tożsamość administratora z Cloudflare Access.
// Panel jest statyczny (Astro output: static), więc dane idą osobnym żądaniem.

import { requireAdmin, json, type AdminEnv } from '../../../_lib/auth';
import { listSubscribers, parseListParams } from '../../../_lib/newsletter-admin';

export const onRequestGet: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return auth.response;

  try {
    const url = new URL(request.url);
    const data = await listSubscribers(env.DB, parseListParams(url));
    return json({ ...data, actor: auth.actor });
  } catch (e) {
    console.error('admin subscribers error', e);
    return json({ error: 'Nie udało się wczytać listy.' }, { status: 500 });
  }
};
