// newsletter-digest — codzienny przebieg: nowe artykuły z RSS → mail do potwierdzonych subskrybentów.
//
// Uruchomienie automatyczne: cron "0 6 * * *" (7:00/8:00 czasu PL).
// Ręcznie:  https://<worker>.workers.dev/?key=TRIGGER_KEY          — realna wysyłka
//           https://<worker>.workers.dev/?key=TRIGGER_KEY&dry=1    — tylko raport, bez maili
//
// Idempotencja: tabela digest_log (slug = PRIMARY KEY). Ten sam artykuł nie wyjdzie dwa razy,
// nawet jeśli przebieg padnie w połowie — przy kolejnym uruchomieniu pominie już wysłane.

export default {
  async scheduled(_event, env) {
    const result = await run(env, { dry: false, includeLatest: false });
    console.log('digest', JSON.stringify(result));
  },

  async fetch(request, env) {
    const url = new URL(request.url);
    if (env.TRIGGER_KEY && url.searchParams.get('key') !== env.TRIGGER_KEY) {
      return new Response('forbidden', { status: 403 });
    }
    const dry = url.searchParams.get('dry') === '1';
    const includeLatest = url.searchParams.get('include_latest') === '1';
    const result = await run(env, { dry, includeLatest });
    return Response.json(result);
  },
};

// ─────────────────────────────────────────────────────────────

async function run(env, { dry, includeLatest = false }) {
  const started = new Date().toISOString();
  const rssUrl = `${env.SITE_URL}/rss.xml`;
  const rssResp = await fetch(rssUrl, { cf: { cacheTtl: 0 } });
  if (!rssResp.ok) return { error: `rss ${rssResp.status}`, started };

  const items = parseRss(await rssResp.text());
  if (!items.length) return { articles: 0, sent: 0, note: 'rss empty', started };

  const lookback = Date.now() - Number(env.MAX_LOOKBACK_DAYS || 30) * 86400000;
  const fresh = items
    .filter((i) => i.pubDate && i.pubDate >= lookback)
    .filter((i) => !i.link.includes('/en/articles/') || true) // EN i PL traktujemy jako osobne wpisy
    .sort((a, b) => b.pubDate - a.pubDate);

  // co już poszło
  const { results: sentRows } = await env.DB.prepare('SELECT slug FROM digest_log').all();
  const already = new Set((sentRows || []).map((r) => r.slug));

  // Pierwszy przebieg: oznacz historię jako baseline (bez maili), żeby nie wysłać
  // komuś całego archiwum. include_latest=1 zostawia najnowszy wpis do wysyłki.
  let seeded = 0;
  if (already.size === 0 && !dry) {
    const toSeed = includeLatest ? fresh.slice(1) : fresh;
    for (const item of toSeed) {
      await env.DB.prepare('INSERT OR IGNORE INTO digest_log (slug, title, link) VALUES (?, ?, ?)')
        .bind(slugOf(item.link), item.title, item.link)
        .run();
      already.add(slugOf(item.link));
      seeded++;
    }
  }

  const pending = fresh.filter((i) => !already.has(slugOf(i.link)));
  if (!pending.length) {
    return { articles: 0, sent: 0, seeded, note: seeded ? 'baseline seeded' : 'nothing new', started };
  }

  const { results: subs } = await env.DB.prepare(
    'SELECT email, unsubscribe_token FROM subscribers WHERE confirmed_at IS NOT NULL AND unsubscribed_at IS NULL ORDER BY created_at'
  ).all();

  const allSubs = subs || [];
  if (!allSubs.length) {
    return { articles: pending.length, sent: 0, note: 'no confirmed subscribers', started, pending: pending.map((p) => p.link) };
  }

  // Kto już dostał który slug — pozwala wznawiać po limicie dziennym bez duplikatów
  const slugs = pending.map((p) => slugOf(p.link));
  const ph = slugs.map(() => '?').join(',');
  const { results: deliv } = await env.DB.prepare(
    `SELECT slug, email FROM digest_deliveries WHERE slug IN (${ph})`
  ).bind(...slugs).all();
  const sentSet = new Set((deliv || []).map((d) => `${d.slug}|${d.email}`));

  const jobs = allSubs
    .map((s) => ({
      email: s.email,
      token: s.unsubscribe_token,
      items: pending.filter((p) => !sentSet.has(`${slugOf(p.link)}|${s.email}`)),
    }))
    .filter((j) => j.items.length > 0);

  if (!jobs.length) {
    return { articles: 0, sent: 0, note: 'all delivered, marking done', started };
  }

  if (dry) {
    return {
      dry: true,
      articles: pending.map((p) => ({ title: p.title, link: p.link })),
      recipients: jobs.length,
      sample: jobs.slice(0, 3).map((j) => maskEmail(j.email)),
      started,
    };
  }

  const batch = jobs.slice(0, Number(env.MAX_PER_RUN || 90));
  let sent = 0;
  let failed = 0;
  const errors = [];

  for (const job of batch) {
    try {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
          to: job.email,
          subject: subjectFor(job.items),
          html: renderEmail(job.items, job.token, env.SITE_URL),
          text: renderText(job.items, job.token, env.SITE_URL),
          headers: {
            'List-Unsubscribe': `<${env.SITE_URL}/api/newsletter/unsubscribe/${job.token}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        }),
      });
      if (resp.ok) {
        sent++;
        for (const item of job.items) {
          await env.DB.prepare('INSERT OR IGNORE INTO digest_deliveries (slug, email) VALUES (?, ?)')
            .bind(slugOf(item.link), job.email)
            .run();
        }
      } else {
        failed++;
        errors.push(`${maskEmail(job.email)} ${resp.status} ${(await resp.text()).slice(0, 120)}`);
      }
    } catch (e) {
      failed++;
      errors.push(`${maskEmail(job.email)} ${String(e).slice(0, 120)}`);
    }
    await sleep(220); // Resend: limit 2 req/s
  }

  // Slug trafia do digest_log dopiero, gdy dotarł do WSZYSTKICH potwierdzonych
  let completed = 0;
  for (const p of pending) {
    const sl = slugOf(p.link);
    const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM digest_deliveries WHERE slug = ?').bind(sl).first();
    if ((row?.n || 0) >= allSubs.length) {
      await env.DB.prepare('INSERT OR IGNORE INTO digest_log (slug, title, link) VALUES (?, ?, ?)')
        .bind(sl, p.title, p.link)
        .run();
      completed++;
    }
  }

  await env.DB.prepare(
    'INSERT INTO digest_runs (articles, recipients, sent, failed, note) VALUES (?, ?, ?, ?, ?)'
  ).bind(pending.length, batch.length, sent, failed, errors.slice(0, 3).join(' | ') || null).run();

  return {
    articles: pending.length,
    completed,
    recipients: batch.length,
    queued: jobs.length,
    sent,
    failed,
    errors: errors.slice(0, 3),
    started,
  };
}

// ─────────────────────────────────────────────────────────────

function slugOf(link) {
  try {
    return new URL(link).pathname.replace(/\/$/, '');
  } catch {
    return link;
  }
}

function maskEmail(email) {
  const [u, d] = String(email).split('@');
  return `${(u || '').slice(0, 2)}***@${d || ''}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Minimalny parser RSS — bez zależności, tylko to, czego używamy. */
function parseRss(xml) {
  const out = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    out.push({
      title: decode(pick(block, 'title')),
      link: decode(pick(block, 'link')),
      description: decode(pick(block, 'description')),
      pubDate: Date.parse(pick(block, 'pubDate')),
    });
  }
  return out.filter((i) => i.title && i.link);
}

function pick(block, tag) {
  const cdata = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`).exec(block);
  if (cdata) return cdata[1];
  const plain = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(block);
  return plain ? plain[1] : '';
}

function decode(s) {
  return String(s)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();
}

function subjectFor(items) {
  if (items.length === 1) return `Nowe na stronie: ${items[0].title}`;
  return `${items.length} nowe teksty na mjoldak.pl`;
}

function preview(items) {
  return String(items[0].description || '').slice(0, 240);
}

function renderText(items, token, site) {
  const lines = [
    'Nowe na stronie:',
    '',
    ...items.map((i) => `— ${i.title}\n  ${i.link}`),
    '',
    preview(items),
    '',
    `Wypisz się: ${site}/api/newsletter/unsubscribe/${token}`,
    '',
    'Marcin Ołdak · MJ.OLDAK',
  ];
  return lines.join('\n');
}

function renderEmail(items, token, site) {
  const rows = items
    .map(
      (i) => `
      <tr><td style="padding:0 0 26px;">
        <a href="${esc(i.link)}" style="color:#0D1B32;text-decoration:none;">
          <div style="font-size:19px;font-weight:700;line-height:1.3;letter-spacing:-0.01em;">${esc(i.title)}</div>
        </a>
        <div style="font-size:15px;color:#4A5568;line-height:1.5;margin-top:8px;">${esc(String(i.description || '').slice(0, 300))}</div>
        <div style="margin-top:10px;">
          <a href="${esc(i.link)}" style="color:#4F8EBA;font-size:14px;text-decoration:none;">Czytaj →</a>
        </div>
      </td></tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="pl"><head><meta charset="UTF-8"><title>Nowe na mjoldak.pl</title></head>
<body style="margin:0;padding:0;background:#E4DBCD;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E4DBCD;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#F4EEE4;border:1px solid rgba(13,27,50,0.12);border-radius:10px;padding:36px 32px;">
        <tr><td style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#4F8EBA;padding-bottom:18px;">
          MJ.OLDAK · nowe teksty
        </td></tr>
        <tr><td style="padding-bottom:24px;font-size:16px;color:#0D1B32;line-height:1.55;">
          ${items.length === 1 ? 'Na stronie pojawił się nowy tekst.' : `Na stronie pojawiły się ${items.length} nowe teksty.`}
        </td></tr>
        ${rows}
        <tr><td style="border-top:1px solid rgba(13,27,50,0.15);padding-top:20px;font-size:12px;color:#6B7280;line-height:1.6;">
          Dostajesz tego maila, bo zapisałeś się na listę MJ.OLDAK i potwierdziłeś subskrypcję.
          <a href="${esc(site)}/api/newsletter/unsubscribe/${esc(token)}" style="color:#6B7280;">Wypisz się jednym klikiem</a>.
          <br><br>
          Marcin Ołdak · MJ.OLDAK SYSTEMS · biuro@mjoldak.pl
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export { parseRss, slugOf, subjectFor, renderEmail, renderText };
