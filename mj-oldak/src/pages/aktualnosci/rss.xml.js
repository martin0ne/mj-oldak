import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const notes = (await getCollection('notes')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'MJ.OLDAK — Aktualności',
    description: 'Nowe teksty i rzeczy do użycia — krótko, z linkiem.',
    site: context.site,
    items: notes.map((n) => ({
      link: n.data.link ?? n.data.links?.[0]?.href ?? '/aktualnosci/',
      title: n.data.title,
      description: n.body?.slice(0, 280) ?? '',
      pubDate: n.data.date,
    })),
    customData: '<language>pl-PL</language>',
  });
}
