import { useEffect, useRef, useState } from 'react';

const AUTO_ADVANCE_MS = 5500;

export default function ArticleCarousel({ articles, heading, subheading, sectionLabel }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = articles.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-12 bg-background overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Polecane artykuły"
    >
      <div className="max-w-7xl mx-auto">
        {(sectionLabel || heading) && (
          <div className="mb-10 md:mb-14">
            {sectionLabel && (
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span className="font-sans font-medium text-xs uppercase tracking-[0.2em] text-dark/50">{sectionLabel}</span>
              </div>
            )}
            {heading && (
              <h2 className="font-sans font-bold text-4xl md:text-6xl uppercase tracking-tight text-dark leading-[0.95] mb-3">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-mono text-base text-dark/60 max-w-2xl leading-relaxed">{subheading}</p>
            )}
          </div>
        )}

        <div
          className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-dark/10 bg-dark/[0.05]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {articles.map((a) => (
              <a
                key={a.slug}
                href={`/artykuly/${a.slug}/`}
                className="group flex-shrink-0 w-full no-underline"
                aria-hidden={articles[index].slug !== a.slug ? 'true' : 'false'}
                tabIndex={articles[index].slug !== a.slug ? -1 : 0}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {a.cover && (
                    <div className="lg:col-span-3 aspect-[4/3] overflow-hidden bg-dark/10">
                      <img
                        src={a.cover}
                        alt={a.coverAlt || a.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                        loading={articles[0].slug === a.slug ? 'eager' : 'lazy'}
                      />
                    </div>
                  )}
                  <div className={`p-8 md:p-12 flex flex-col justify-center ${a.cover ? 'lg:col-span-2' : 'lg:col-span-5'}`}>
                    <div className="flex items-center gap-2 mb-5 font-sans font-medium text-xs uppercase tracking-[0.15em] text-dark/50">
                      <span className="font-bold text-accent">{a.category}</span>
                      <span className="text-dark/30">·</span>
                      <span>{a.publishedDateLabel}</span>
                      {a.readingTime && (
                        <>
                          <span className="text-dark/30">·</span>
                          <span>{a.readingTime} min czytania</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tight text-dark mb-4 group-hover:text-accent transition leading-tight">
                      {a.title}
                    </h3>
                    <p className="font-mono text-sm text-dark/70 leading-relaxed mb-6 line-clamp-4">
                      {a.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans font-medium text-xs uppercase tracking-[0.15em] text-accent">
                      Czytaj artykuł
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); go(-1); }}
                className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 w-11 h-11 rounded-full bg-dark/80 hover:bg-accent text-primary flex items-center justify-center backdrop-blur-sm transition-colors"
                aria-label="Poprzedni artykuł"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); go(1); }}
                className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 w-11 h-11 rounded-full bg-dark/80 hover:bg-accent text-primary flex items-center justify-center backdrop-blur-sm transition-colors"
                aria-label="Następny artykuł"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {articles.map((a, i) => (
              <button
                key={a.slug}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-10 bg-accent' : 'w-6 bg-dark/20 hover:bg-dark/40'}`}
                aria-label={`Przejdź do slajdu ${i + 1}`}
                aria-current={i === index ? 'true' : 'false'}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
