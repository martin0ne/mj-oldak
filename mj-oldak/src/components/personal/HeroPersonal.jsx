import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// v4 (14.10.2026) — narracja 2026: pisarz + analityk + builder, SZUKA PRACY.
// Usunięto: agencyjne „studio", angielskie CTA, tytuł książki (w redakcji).

const PHOTOS = [
    '/photos/hero-5350.jpg',
    '/photos/art-01.jpg',
    '/photos/hero-5236.jpg',
    '/photos/art-04.jpg',
    '/photos/hero-0798.jpg',
    '/photos/art-11.jpg',
];
const ROTATE_MS = 9000;

// Status realizacji — liczbę produktów i repo potwierdza strona (zero zmyśleń).
const STATUS = [
    { n: '01', head: 'Eseje', body: 'tom zaawansowany — ostatni rozdział zaakceptowany; w redakcji' },
    { n: '02', head: 'Badania', body: 'raport GUS × Eurostat: dane energetyczne, energie odnawialne; pipeline i PDF poniżej' },
    { n: '03', head: 'Narzędzia', body: 'projekty AI i data-engineering: OCR, mail, raporty; demo na GitHubie' },
];

export default function HeroPersonal() {
    const containerRef = useRef(null);
    const [idx, setIdx] = useState(0);
    const [maxSeen, setMaxSeen] = useState(0);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Slide-up bez ukrywania opacity — treść widoczna nawet bez JS.
            gsap.from('.hero-reveal', {
                y: 24,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.07,
                clearProps: 'transform',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
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
            className="relative min-h-[100dvh] w-full grid md:grid-cols-[1.15fr_0.85fr] bg-dark overflow-hidden"
        >
            {/* PRAWA: własne fotografie, crossfade bez gradientów i plam */}
            <div className="relative order-1 md:order-2 min-h-[38vh] md:min-h-0 overflow-hidden border-l border-primary/10">
                {PHOTOS.map((src, i) => (
                    i <= maxSeen && (
                        <div
                            key={src}
                            className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-[1800ms]"
                            role={i === idx ? 'img' : undefined}
                            aria-label={i === idx ? 'Own photography — rotating' : undefined}
                            aria-hidden={i === idx ? undefined : true}
                            style={{ backgroundImage: `url("${src}")`, opacity: i === idx ? 1 : 0 }}
                        />
                    )
                ))}
                <div className="absolute bottom-4 right-5 z-20 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/55">
                    own photography
                </div>
            </div>

            {/* LEWA: statement + status realizacji */}
            <div className="relative z-30 order-2 md:order-1 flex flex-col justify-between p-6 md:p-12 lg:p-16 pt-24 md:pt-28">
                {/* Metadane w rogu — wydanie, nie HUD */}
                <div className="hero-reveal hidden md:flex justify-end font-mono text-[10px] uppercase tracking-[0.22em] text-primary/45">
                    <span>Warszawa · PL — 2026</span>
                </div>

                <div className="w-full max-w-2xl py-6 md:py-0">
                    <p className="hero-reveal font-mono text-[11px] uppercase tracking-[0.3em] text-primary/60 mb-7">
                        ( pisarz · analityk · builder narzędzi AI )
                    </p>

                    <h1 className="hero-reveal text-primary leading-[0.95] mb-6">
                        <span className="font-serif italic text-[clamp(34px,5.4vw,64px)] font-normal">Szukam pracy.</span>{' '}
                        <span className="font-sans text-[clamp(34px,5.4vw,64px)] font-bold tracking-[-0.03em]">Piszę,</span>
                        <span className="font-serif text-[clamp(34px,5.4vw,64px)] font-normal"> badam i buduję narzędzia.</span>
                    </h1>

                    <p className="hero-reveal text-primary/70 text-base max-w-xl mb-9 leading-relaxed">
                        Pisarz i analityk danych, który buduje narzędzia AI i szuka pracy — Warszawa, zdalnie PL/EU. W przygotowaniu: baza wiedzy o AI po ludzku. Na co dzień SQL, LLM-y i dane z jawnych źródeł. Poniżej znajdziesz moje repozytoria, blog i projekt badawczy GUS × Eurostat.
                    </p>

                    {/* Status 01/02/03 — co jest, co powstaje, co dalej */}
                    <div className="hero-reveal mb-10 border-t border-primary/15 max-w-xl">
                        {STATUS.map(s => (
                            <div key={s.n} className="grid grid-cols-[auto_1fr] gap-4 py-3.5 border-b border-primary/15">
                                <span className="font-mono text-[11px] text-primary/50 pt-0.5">{s.n}</span>
                                <span className="text-sm leading-relaxed text-primary/85">
                                    <span className="font-medium text-primary">{s.head}</span>
                                    <span className="text-primary/55"> — </span>
                                    <span className="text-primary/70">{s.body}</span>
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="hero-reveal flex flex-wrap items-center gap-3">
                        <a
                            href="/artykuly/"
                            className="px-6 py-3 rounded-[6px] bg-[#FBFBFA] text-[#111111] text-sm font-medium hover:bg-white transition-colors duration-200 no-underline"
                        >
                            Przeczytaj artykuły
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 rounded-[6px] border border-primary/35 text-primary text-sm font-medium hover:border-primary transition-colors duration-200 no-underline"
                        >
                            Zatrudnij mnie
                        </a>
                    </div>
                </div>

                <a
                    href="#about"
                    className="hero-reveal hidden md:inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary/45 hover:text-primary transition-colors no-underline w-fit"
                >
                    <span className="w-8 h-[1px] bg-primary/30"></span>
                    Scroll — 01 · About
                </a>
            </div>
        </section>
    );
}
