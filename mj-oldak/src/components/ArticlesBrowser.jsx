import { useEffect, useMemo, useState } from 'react';
import MiniSearch from 'minisearch';

export default function ArticlesBrowser({ articles, allTags }) {
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState(null);

    const search = useMemo(() => {
        const ms = new MiniSearch({
            fields: ['title', 'excerpt', 'tags', 'category'],
            storeFields: ['slug', 'title', 'excerpt', 'tags', 'category'],
            searchOptions: {
                boost: { title: 3, tags: 2 },
                fuzzy: 0.2,
                prefix: true,
            },
        });
        ms.addAll(articles.map((a, i) => ({ id: i, ...a, tags: a.tags.join(' ') })));
        return ms;
    }, [articles]);

    const filtered = useMemo(() => {
        let result = articles;
        if (activeTag) {
            result = result.filter((a) => a.tags.includes(activeTag));
        }
        if (query.trim().length >= 2) {
            const ids = new Set(search.search(query.trim()).map((r) => r.id));
            result = result.filter((_, i) => ids.has(i));
        }
        return result;
    }, [articles, activeTag, query, search]);

    const tagCounts = useMemo(() => {
        const counts = {};
        articles.forEach((a) => a.tags.forEach((t) => { counts[t] = (counts[t] ?? 0) + 1; }));
        return counts;
    }, [articles]);

    return (
        <div>
            {/* Toolbar */}
            <div class="mb-10">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-xl">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Szukaj artykułów..."
                            aria-label="Wyszukaj artykuł"
                            className="w-full bg-dark/[0.04] border border-dark/15 rounded-[2rem] pl-12 pr-5 py-3.5 font-mono text-sm text-dark placeholder:text-dark/40 outline-none focus:border-accent/60 focus:bg-dark/[0.06] transition-all"
                        />
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-dark/40 self-center">
                        {filtered.length} {filtered.length === 1 ? 'artykuł' : filtered.length >= 2 && filtered.length <= 4 ? 'artykuły' : 'artykułów'}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveTag(null)}
                        className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition ${
                            activeTag === null
                                ? 'bg-accent text-primary border-accent'
                                : 'bg-dark/[0.04] text-dark/70 border-dark/15 hover:border-accent/40 hover:text-dark'
                        }`}
                    >
                        Wszystkie ({articles.length})
                    </button>
                    {allTags.filter((t) => tagCounts[t]).map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                            className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition ${
                                activeTag === tag
                                    ? 'bg-accent text-primary border-accent'
                                    : 'bg-dark/[0.04] text-dark/70 border-dark/15 hover:border-accent/40 hover:text-dark'
                            }`}
                        >
                            #{tag} ({tagCounts[tag]})
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="rounded-[2rem] bg-dark/[0.04] border border-dark/10 p-12 text-center">
                    <p className="font-mono text-sm text-dark/60">Brak wyników. Spróbuj innych słów lub wyczyść filtry.</p>
                    <button
                        onClick={() => { setQuery(''); setActiveTag(null); }}
                        className="mt-4 font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full bg-accent text-primary hover:scale-[1.03] transition"
                    >
                        Wyczyść filtry
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((a) => (
                        <a
                            key={a.slug}
                            href={`/artykuly/${a.slug}/`}
                            className="group block rounded-[2rem] bg-dark/[0.05] border border-dark/10 hover:border-accent/40 hover:bg-dark/[0.07] transition-all overflow-hidden no-underline"
                        >
                            {a.cover && (
                                <div className="aspect-[4/3] overflow-hidden bg-dark/[0.05]">
                                    <img src={a.cover} alt={a.coverAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3 font-sans font-medium text-xs uppercase tracking-[0.15em] text-dark/50">
                                    <span className="font-bold text-accent">{a.category}</span>
                                    <span className="text-dark/30">·</span>
                                    <span>{a.publishedDateLabel}</span>
                                    {a.readingTime && <><span className="text-dark/30">·</span><span>{a.readingTime} min</span></>}
                                </div>
                                <h3 className="font-sans font-bold text-lg uppercase tracking-tight text-dark mb-2 group-hover:text-accent transition leading-tight">
                                    {a.title}
                                </h3>
                                <p className="font-mono text-xs text-dark/60 leading-relaxed mb-4 line-clamp-3">
                                    {a.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {a.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="font-sans font-medium text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded-full bg-dark/[0.06] text-dark/60">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            <style>{`
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
