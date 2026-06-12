import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroPersonal() {
    const containerRef = useRef(null);

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

    return (
        <section
            id="top"
            ref={containerRef}
            data-nav-theme="dark"
            className="relative h-[100dvh] w-full flex flex-col justify-end p-8 md:p-16 overflow-hidden"
        >
            {/* Brutalist concrete background */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                role="img"
                aria-label="Hero background"
                style={{
                    backgroundImage: 'url("/hero-bg.jpg")',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/85 to-dark/30 z-10" />
            {/* Bottom gradient bridge to light section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-20 pointer-events-none" />

            {/* Content strictly bottom-left */}
            <div className="relative z-30 w-full max-w-5xl">
                <div className="hero-reveal flex items-center gap-3 mb-5">
                    <span className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_12px_rgba(79,142,186,0.6)]"></span>
                    <span className="font-mono text-xs text-primary/60 uppercase tracking-[0.3em]">MJ.OLDAK · AI Practitioner</span>
                </div>

                <h1 className="hero-reveal text-primary font-sans font-bold text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] uppercase mb-2 leading-[0.9]">
                    Marcin J. Ołdak
                </h1>
                <h2 className="hero-reveal font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[0.9] mb-6 text-primary">
                    AI &amp; Automation Consultant
                </h2>

                <div className="hero-reveal w-16 h-[2px] bg-accent mb-6"></div>

                <p className="hero-reveal text-primary/75 font-mono text-sm md:text-base max-w-xl mb-10 leading-relaxed">
                    Autonomous AI agents · n8n workflow automation · LLM-backed apps — from PoC to production.
                </p>

                <div className="hero-reveal flex flex-wrap items-center gap-4">
                    <a href="#work" className="relative overflow-hidden group px-8 py-4 rounded-[2rem] bg-accent text-primary font-sans font-bold text-lg transition-transform duration-300 hover:scale-[1.03] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] inline-block no-underline">
                        <span className="relative z-10">See my work</span>
                        <span className="absolute inset-0 bg-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></span>
                    </a>
                    <a href="/cv/Marcin-Oldak-CV-EN.pdf" target="_blank" rel="noopener" className="px-8 py-4 rounded-[2rem] border border-primary/30 text-primary font-sans font-bold text-lg hover:border-accent hover:text-accent transition-colors inline-block no-underline">
                        Download CV
                    </a>
                </div>
            </div>
        </section>
    );
}
