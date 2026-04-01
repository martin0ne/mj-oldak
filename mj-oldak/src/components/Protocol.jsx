import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        title: 'Analiza Systemu',
        desc: 'Mapowanie procesów biznesowych i identyfikacja wąskich gardeł gotowych na automatyzację LLM.',
        Animation: StepOneAnim
    },
    {
        num: '02',
        title: 'Budowa Agenta',
        desc: 'Projektowanie i wdrażanie niestandardowych agentów AI z pełnym dostępem do infrastruktury.',
        Animation: StepTwoAnim
    },
    {
        num: '03',
        title: 'Wdrożenie i Skalowanie',
        desc: 'Monitorowanie wydajności, optymalizacja kosztów inferencji i iteracyjna poprawa niezawodności.',
        Animation: StepThreeAnim
    }
];

export default function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    gsap.to(card, {
                        scrollTrigger: {
                            trigger: cards[i + 1],
                            start: 'top bottom',
                            end: 'top 40%',
                            scrub: true,
                        },
                        scale: 0.95,
                        opacity: 0,
                        ease: 'none',
                    });
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="proces" className="relative w-full bg-background pb-32">
            <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4 text-dark">Protokół Wdrożenia</h2>
                <p className="text-dark/70 font-mono text-sm max-w-xl">
                    Trzy kroki od audytu do działającego systemu.
                </p>
            </div>

            <div className="relative">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="protocol-card sticky top-0 h-[100dvh] w-full flex items-center justify-center p-6 md:p-12"
                        style={{ zIndex: i }}
                    >
                        <div className="w-full max-w-5xl bg-primary border border-dark/10 rounded-[3rem] h-full sm:h-[80vh] p-8 md:p-16 flex flex-col md:flex-row gap-8 shadow-2xl relative overflow-hidden">
                            <div className="flex-1 flex flex-col justify-center relative z-10">
                                <span className="font-mono text-xl text-accent mb-6 block">STEP_{step.num}</span>
                                <h3 className="font-serif italic text-4xl md:text-6xl text-dark mb-4">{step.title}</h3>
                                <p className="font-mono text-sm md:text-base text-dark/70 max-w-md">
                                    {step.desc}
                                </p>
                            </div>
                            <div className="flex-1 relative flex items-center justify-center bg-dark/5 rounded-[2rem] border border-dark/10 overflow-hidden">
                                <step.Animation />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function StepOneAnim() {
    return (
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 stroke-dark/40 animate-[spin_20s_linear_infinite]">
            <circle cx="50" cy="50" r="40" fill="none" strokeWidth="0.5" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="30" fill="none" strokeWidth="1" strokeDasharray="4 8" />
            <polygon points="50,15 85,75 15,75" fill="none" strokeWidth="0.5" className="animate-pulse" />
            <polygon transform="rotate(180 50 50)" points="50,15 85,75 15,75" fill="none" strokeWidth="0.5" />
        </svg>
    );
}

function StepTwoAnim() {
    return (
        <div className="relative w-full h-full p-8 flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-2 w-full h-8">
                    {Array.from({ length: 8 }).map((_, j) => (
                        <div key={j} className="flex-1 bg-dark/10 rounded-sm"></div>
                    ))}
                </div>
            ))}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent/80 shadow-[0_0_15px_rgba(230,59,46,0.8)] animate-[scan_3s_ease-in-out_infinite_alternate]"></div>
        </div>
    );
}

function StepThreeAnim() {
    return (
        <svg viewBox="0 0 200 100" className="w-full h-1/2 stroke-accent drop-shadow-[0_0_8px_rgba(230,59,46,0.6)]">
            <path
                d="M 0 50 L 40 50 L 50 20 L 70 80 L 100 10 L 120 70 L 140 50 L 200 50"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[dash_2s_linear_infinite]"
                strokeDasharray="200"
                strokeDashoffset="200"
            />
        </svg>
    );
}
