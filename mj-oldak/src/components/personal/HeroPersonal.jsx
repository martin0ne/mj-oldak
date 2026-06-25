import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Zdjęcia własne Marcina (public/photos — ten sam zestaw co stara strona; brand v2.1
// sea/sunset wywodzi się z tych fotografii). Rotacja crossfade, ładowanie progresywne.
const PHOTOS = [
    '/photos/hero-5350.jpg',
    '/photos/hero-5236.jpg',
    '/photos/hero-0798.jpg',
    '/photos/hero-5579.jpg',
    '/photos/hero-5103.jpg',
    '/photos/hero-7543.jpg',
    '/photos/hero-5088.jpg',
    '/photos/hero-5084.jpg',
    '/photos/hero-6147.jpg',
];
// Per-photo accent — wprost z global.css (--photo-*): kolor panelu rotuje ZE zdjęciem
// (brand v2.1: "Sea Blue — DYNAMIC: rotates per photo"). Brak mapowania → sea-blue.
const SEA = '#4F8EBA';
const SUNSET = '#C87E3B';
const PHOTO_ACCENTS = [
    '#B07A4E', // 5350 sunset boardwalk (rozjaśniony dla vibrancy)
    '#C49478', // 5236 mountain road, golden hour
    '#A8754F', // 0798 brick facade, warm earth
    '#A6754F', // 5579 Warszawa pano
    SEA,       // 5103 (brak w palecie) → sea-blue
    '#C2762F', // 7543 evening city, deep dusk
    '#8FA0B8', // 5088 sea + mountains → chłodny
    SEA,       // 5084 (brak) → sea-blue
    '#BF9A45', // 6147 yellow flowers, summer
];
// Układ tła zmienia się z każdym zdjęciem — panel "żyje", to nie generyczny slideshow.
const BLOB_LAYOUTS = [
    { b1: { top: '-20%', left: '-15%' }, b2: { bottom: '-25%', right: '-12%' } },
    { b1: { top: '12%', left: '-22%' }, b2: { bottom: '-18%', right: '-22%' } },
    { b1: { top: '-25%', left: '18%' }, b2: { bottom: '-30%', right: '8%' } },
    { b1: { top: '6%', left: '-8%' }, b2: { bottom: '-22%', right: '-26%' } },
    { b1: { top: '-18%', left: '-28%' }, b2: { bottom: '-12%', right: '4%' } },
];
const ROTATE_MS = 9000;

// Pasek możliwości — wszystkie pozycje zweryfikowane (kod / gh / stack). Zero zmyśleń (#15).
const TICKER = [
    '5 AI products',
    '6 public repos',
    '4 LLM providers · zero lock-in',
    'n8n automation',
    'FastAPI + Python',
    'Claude + Gemini',
    'Azure OCR',
    'Supabase + Cloudflare',
    'MCP tools',
    'Astro + React',
    'AI since 2022',
];

export default function HeroPersonal() {
    const containerRef = useRef(null);
    const [idx, setIdx] = useState(0);
    // Renderujemy tylko zdjęcia już obejrzane — sieć ciągnie 1 plik na 9s, nie 4MB na starcie.
    const [maxSeen, setMaxSeen] = useState(0);
    const accent = PHOTO_ACCENTS[idx] || SEA;
    const layout = BLOB_LAYOUTS[idx % BLOB_LAYOUTS.length];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Reveal bez ukrywania opacity — content zawsze widoczny (zero ryzyka
            // stuck-invisible gdy rAF pauzuje w nieaktywnej karcie). GSAP robi tylko slide-up.
            gsap.from('.hero-reveal', {
                y: 30,
                duration: 1.0,
                ease: 'power3.out',
                stagger: 0.08,
                clearProps: 'transform',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Przy każdej zmianie zdjęcia: subtelny "oddech" akcentów + plam → panel żyje (nie slideshow).
    const firstRun = useRef(true);
    useEffect(() => {
        if (firstRun.current) { firstRun.current = false; return; }
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-pulse',
                { opacity: 0.35 },
                { opacity: 1, duration: 1.4, ease: 'power2.out', stagger: 0.05 });
            gsap.fromTo('.hero-blob',
                { scale: 0.9 },
                { scale: 1, duration: 2.0, ease: 'power2.out' });
        }, containerRef);
        return () => ctx.revert();
    }, [idx]);

    useEffect(() => {
        // Preload następnego zdjęcia tuż przed rotacją — crossfade bez mignięcia.
        const next = (idx + 1) % PHOTOS.length;
        const img = new Image();
        img.src = PHOTOS[next];
        const t = setTimeout(() => {
            setIdx(next);
            setMaxSeen((m) => Math.max(m, next));
        }, ROTATE_MS);
        return () => clearTimeout(t);
    }, [idx]);

    return (
        <section
            id="top"
            ref={containerRef}
            data-nav-theme="dark"
            className="relative min-h-[100dvh] w-full grid md:grid-cols-2 bg-dark overflow-hidden"
            style={{ '--hero-accent': accent }}
        >
            <style>{`
                @keyframes heroDrift {
                    0%   { transform: translate(0, 0); }
                    50%  { transform: translate(7%, -5%); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes heroDrift2 {
                    0%   { transform: translate(0, 0); }
                    50%  { transform: translate(-6%, 6%); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes heroTicker {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-blob, .hero-ticker-track { animation: none !important; }
                }
            `}</style>

            {/* PRAWA (desktop) / GÓRA (mobile): rotacja zdjęć własnych — gładki crossfade */}
            <div className="relative order-1 md:order-2 min-h-[42vh] md:min-h-0 overflow-hidden">
                {PHOTOS.map((src, i) => (
                    i <= maxSeen && (
                        <div
                            key={src}
                            className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-[2200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                            role={i === idx ? 'img' : undefined}
                            aria-label={i === idx ? 'Hero background — own photography' : undefined}
                            aria-hidden={i === idx ? undefined : true}
                            style={{
                                backgroundImage: `url("${src}")`,
                                opacity: i === idx ? 1 : 0,
                            }}
                        />
                    )
                ))}
                {/* Blend krawędzi w panel: pion na mobile, poziom (do panelu) na desktop */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-dark/25 via-transparent to-dark/55 md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-dark/85" />
                {/* HUD sygnatura — operating-manual */}
                <div className="absolute bottom-4 right-5 z-20 font-mono text-[10px] uppercase tracking-[0.25em] text-primary/55">
                    own photography · coastal
                </div>
            </div>

            {/* LEWA (desktop) / DÓŁ (mobile): VIBRANT panel — układ tła + akcent rotują ze zdjęciem */}
            <div className="relative z-30 order-2 md:order-1 flex flex-col justify-between overflow-hidden p-8 md:p-12 lg:p-16">
                <div className="absolute inset-0 -z-10 bg-dark" />
                {/* Plama główna — photo-accent, pozycja zmienia się per zdjęcie (płynnie) */}
                <div
                    className="hero-blob absolute -z-10 w-[80%] h-[80%] rounded-full blur-[90px] opacity-[0.6]"
                    style={{ ...layout.b1, background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`, transition: 'top 1.8s ease, bottom 1.8s ease, left 1.8s ease, right 1.8s ease, background 1.5s ease', animation: 'heroDrift 16s ease-in-out infinite' }}
                />
                {/* Plama 2 — sea-blue (stała baza brandu) */}
                <div
                    className="hero-blob absolute -z-10 w-[70%] h-[70%] rounded-full blur-[90px] opacity-[0.45]"
                    style={{ ...layout.b2, background: `radial-gradient(circle, ${SEA} 0%, transparent 70%)`, transition: 'top 1.8s ease, bottom 1.8s ease, left 1.8s ease, right 1.8s ease', animation: 'heroDrift2 21s ease-in-out infinite' }}
                />
                {/* Plama 3 — sunset glow, mała, dla bogactwa palety */}
                <div
                    className="hero-blob absolute -z-10 top-[40%] right-[10%] w-[40%] h-[40%] rounded-full blur-[80px] opacity-[0.3]"
                    style={{ background: `radial-gradient(circle, ${SUNSET} 0%, transparent 70%)`, animation: 'heroDrift 24s ease-in-out infinite' }}
                />
                {/* Czytelność tekstu na żywym tle */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-dark/85 via-dark/45 to-dark/10" />

                {/* Górna meta — HUD */}
                <div className="hero-reveal hidden md:flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-primary/45">
                    <span>MJ.OLDAK — Operating Manual</span>
                    <span>PL · 2026</span>
                </div>

                {/* Rdzeń */}
                <div className="w-full max-w-2xl py-8 md:py-0">
                    <div className="hero-reveal flex items-center gap-3 mb-5">
                        <span className="hero-pulse w-3 h-3 rounded-full animate-pulse transition-[background,box-shadow] duration-[1500ms]" style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}></span>
                        <span className="font-mono text-xs text-primary/65 uppercase tracking-[0.3em]">AI Automation Builder</span>
                    </div>

                    <h1 className="hero-reveal text-primary font-sans font-bold text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] uppercase mb-4 leading-[0.9]">
                        Marcin J. Ołdak
                    </h1>

                    {/* Hierarchia ról: Builder = primary (serif), Analyst = secondary (mono) */}
                    <h2 className="hero-reveal font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[0.95] text-primary mb-1.5">
                        AI Automation Builder
                    </h2>
                    <p className="hero-reveal font-mono text-sm md:text-base uppercase tracking-[0.2em] text-primary/55 mb-6">
                        <span className="hero-pulse" style={{ color: accent }}>&amp;</span> AI Business Analyst
                    </p>

                    <div className="hero-reveal hero-pulse w-16 h-[2px] mb-6 transition-[background] duration-[1500ms]" style={{ background: accent }}></div>

                    <p className="hero-reveal text-primary/75 font-mono text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                        Autonomous AI agents · n8n workflow automation · LLM-backed apps — from PoC to pilot.
                    </p>

                    <div className="hero-reveal flex flex-wrap items-center gap-4 mb-8">
                        {/* CTA główne — tło rotuje z photo-accentem; hover = zmiana koloru na navy + scale */}
                        <a href="#work" className="px-8 py-4 rounded-[2rem] text-primary font-sans font-bold text-lg bg-[var(--cta-bg)] hover:bg-dark dark:hover:bg-primary dark:hover:text-dark hover:scale-[1.04] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] inline-block no-underline" style={{ '--cta-bg': accent, transition: 'background-color 0.35s ease, color 0.35s ease, transform 0.3s ease' }}>
                            See my work
                        </a>
                        <a href="#contact" className="px-8 py-4 rounded-[2rem] border border-primary/30 text-primary font-sans font-bold text-lg hover:border-accent hover:text-accent transition-colors inline-block no-underline">
                            Get in touch
                        </a>
                    </div>

                    {/* Przewijany pasek możliwości — zweryfikowane liczby + realny stack */}
                    <div className="hero-reveal relative max-w-xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                        <div className="hero-ticker-track flex w-max items-center gap-0" style={{ animation: 'heroTicker 32s linear infinite' }}>
                            {[0, 1].map((dup) => (
                                <div key={dup} aria-hidden={dup === 1 ? true : undefined} className="flex items-center gap-0 shrink-0">
                                    {TICKER.map((item, i) => (
                                        <span key={i} className="flex items-center font-mono text-[11px] uppercase tracking-[0.18em] text-primary/55 whitespace-nowrap">
                                            <span className="px-4">{item}</span>
                                            <span className="hero-pulse transition-[color] duration-[1500ms]" style={{ color: accent }}>·</span>
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dolny scroll-hint — wypełnia pion, prowadzi do About */}
                <a href="#about" className="hero-reveal hidden md:inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/45 hover:text-accent transition-colors no-underline w-fit">
                    <span className="w-8 h-[1px] bg-primary/30"></span>
                    Scroll — 01 · About
                </a>
            </div>
        </section>
    );
}
