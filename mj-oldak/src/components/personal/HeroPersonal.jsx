import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// v5 (24.11.2026) — repozycjonowanie: KONSULTANT · TRENER AI · TECHNOLOG.
// Pisarstwo schodzi do toru równoległego (sekcja 03), nie jest już osią strony.
// Klient biznesowy ma w 5 sekund wiedzieć: co dostanie, dla kogo, jak zacząć.

const PHOTOS = [
    '/photos/hero-5350.jpg',
    '/photos/art-01.jpg',
    '/photos/hero-5236.jpg',
    '/photos/art-04.jpg',
    '/photos/hero-0798.jpg',
    '/photos/art-11.jpg',
];
const ROTATE_MS = 9000;

// Każda pozycja = to, co klient realnie kupuje. Zero zmyśleń: liczby potwierdzone na stronie.
const OFFER = [
    { n: '01', head: 'Konsultacja', body: 'audyt: gdzie w Twojej firmie AI realnie oszczędza godziny, a gdzie to strata pieniędzy' },
    { n: '02', head: 'Szkolenie', body: 'warsztat na Waszych zadaniach — zespół wychodzi z gotowymi narzędziami, nie z notatkami' },
    { n: '03', head: 'Wdrożenie', body: 'agent lub automatyzacja: OCR faktur, klasyfikacja maili, raporty — z człowiekiem w pętli' },
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

            {/* LEWA: statement + oferta */}
            <div className="relative z-30 order-2 md:order-1 flex flex-col justify-between p-6 md:p-12 lg:p-16 pt-24 md:pt-28">
                {/* Metadane w rogu — wydanie, nie HUD */}
                <div className="hero-reveal hidden md:flex justify-end font-mono text-[10px] uppercase tracking-[0.22em] text-primary/45">
                    <span>Warszawa · PL — 2026</span>
                </div>

                <div className="w-full max-w-2xl py-6 md:py-0">
                    <p className="hero-reveal font-mono text-[11px] uppercase tracking-[0.3em] text-primary/60 mb-7">
                        ( konsultant AI · trener · technolog )
                    </p>

                    <h1 className="hero-reveal text-primary leading-[0.95] mb-6">
                        <span className="type-texture font-sans text-[clamp(34px,5.4vw,64px)] font-bold tracking-[-0.03em]">Wdrażam AI</span>
                        <span className="font-serif text-[clamp(34px,5.4vw,64px)] font-normal"> w małych firmach.</span>{' '}
                        <span className="font-serif italic text-[clamp(30px,4.4vw,52px)] font-normal text-primary/90">Uczę zespoły robić to samodzielnie.</span>
                    </h1>

                    <p className="hero-reveal text-primary/70 text-base max-w-xl mb-9 leading-relaxed">
                        Pracuję z mikrofirmami i zespołami biurowymi. Zaczynam od jednego procesu,
                        który realnie zjada godziny — i dopiero potem rozmawiamy o narzędziach.
                        Jeśli AI się nie opłaca, mówię to wprost.
                    </p>

                    {/* Oferta 01/02/03 — co klient kupuje */}
                    <div className="hero-reveal mb-10 border-t border-primary/15 max-w-xl">
                        {OFFER.map(s => (
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
                            href="#contact"
                            className="px-6 py-3 rounded-[6px] bg-[#FBFBFA] text-[#111111] text-sm font-medium hover:bg-white transition-colors duration-200 no-underline"
                        >
                            Porozmawiajmy — 15 min, bezpłatnie
                        </a>
                        <a
                            href="#work"
                            className="px-6 py-3 rounded-[6px] border border-primary/30 text-primary text-sm font-medium hover:border-primary/60 transition-colors duration-200 no-underline"
                        >
                            Zobacz dowody
                        </a>
                    </div>

                    <p className="hero-reveal font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40 mt-6">
                        piszę też eseje i analizy — poniżej
                    </p>
                </div>

                <a
                    href="#work"
                    className="hero-reveal hidden md:inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary/45 hover:text-primary transition-colors no-underline w-fit"
                >
                    <span className="w-8 h-[1px] bg-primary/30"></span>
                    Scroll — 01 · Co robię
                </a>
            </div>
        </section>
    );
}
