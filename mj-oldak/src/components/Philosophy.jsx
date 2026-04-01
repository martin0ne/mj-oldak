import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.philo-line', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

            gsap.to('.philo-bg', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
                y: '20%',
                ease: 'none'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} data-nav-theme="dark" className="relative w-full py-32 md:py-48 bg-dark text-primary overflow-hidden flex items-center justify-center">
            {/* Gradient bridges for smooth section transitions */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
            {/* Parallax Background */}
            <div
                className="philo-bg absolute inset-0 inset-y-[-10%] z-0 opacity-20 mix-blend-overlay"
                style={{
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(230,59,46,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(232,228,221,0.08) 0%, transparent 50%)',
                }}
            />

            <div className="relative z-10 max-w-5xl px-6 md:px-12 text-center flex flex-col items-center">
                <p className="philo-line font-mono text-sm md:text-base text-primary/60 mb-6 uppercase tracking-widest max-w-2xl">
                    Większość firm skupia się na ręcznym wykonywaniu powtarzalnych zadań.
                </p>
                <h2 className="philo-line font-serif italic text-4xl md:text-6xl lg:text-8xl leading-none">
                    My budujemy <span className="text-accent">systemy</span>, które to skalują.
                </h2>
            </div>
        </section>
    );
}
