import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    // Feed główny = PL (defaultLocale). EN ma własny route /en/articles/ i nie wchodzi tutaj —
    // wcześniej EN wpisy lądowały w feedzie z linkami /artykuly/<en-slug>/ (martwe: CF serwuje
    // homepage 200 dla nieistniejących ścieżek), co pośredowało do newsletter digest.
    // Uwaga: a.id (bez .md) = slug route'u; a.slug jest undefined, gdy schema ma pole slug.
    const articles = (await getCollection('articles', ({ data }) => !data.draft && data.publishedAt <= new Date()))
        .filter((a) => a.data.lang !== 'en');
    return rss({
        title: 'MJ.OLDAK — Artykuły',
        description: 'AI dla polskich firm bez ściemy. Case studies z biur rachunkowych, koszty wdrożeń, kompliance, demo techniczne.',
        site: context.site,
        items: articles
            .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
            .map((a) => ({
                link: `/artykuly/${a.id.replace(/\.md$/, '')}/`,
                title: a.data.title,
                description: a.data.excerpt,
                pubDate: a.data.publishedAt,
                author: a.data.author,
                categories: a.data.tags,
            })),
        customData: '<language>pl-PL</language>',
    });
}
