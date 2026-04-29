import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const articles = await getCollection('articles', ({ data }) => !data.draft && data.publishedAt <= new Date());
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
