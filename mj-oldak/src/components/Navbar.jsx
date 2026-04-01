import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isDark, setIsDark] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const nav = navRef.current;
        gsap.set(nav, { y: -100, opacity: 0 });
        gsap.to(nav, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });
    }, []);

    useEffect(() => {
        const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
        const triggers = [];

        darkSections.forEach((section) => {
            const st = ScrollTrigger.create({
                trigger: section,
                start: 'top 60px',
                end: 'bottom 60px',
                onEnter: () => setIsDark(true),
                onLeave: () => setIsDark(false),
                onEnterBack: () => setIsDark(true),
                onLeaveBack: () => setIsDark(false),
            });
            triggers.push(st);
        });

        return () => triggers.forEach(st => st.kill());
    }, []);

    // Close mobile menu on scroll
    useEffect(() => {
        const close = () => setMobileOpen(false);
        window.addEventListener('scroll', close, { passive: true });
        return () => window.removeEventListener('scroll', close);
    }, []);

    const navLinks = [
        { href: '#uslugi', label: 'USŁUGI' },
        { href: '#proces', label: 'PROCES' },
        { href: '#kontakt', label: 'KONTAKT' },
    ];

    return (
        <nav
            ref={navRef}
            aria-label="Menu główne"
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-[3rem] w-[90%] max-w-4xl transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                isDark
                    ? 'bg-dark/60 backdrop-blur-xl border border-primary/10 text-primary'
                    : 'bg-background/70 backdrop-blur-xl border border-dark/10 text-dark'
            }`}
        >
            <div className="flex items-center justify-between">
                <a href="#" className="font-sans font-bold text-xl tracking-tight uppercase no-underline">
                    MJ.OLDAK
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center space-x-8 font-sans font-medium text-sm">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="hover:-translate-y-[1px] transition-transform opacity-70 hover:opacity-100">{link.label}</a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <a href="#kontakt" className="hidden sm:inline-block relative overflow-hidden group px-6 py-3 rounded-[2rem] bg-accent text-primary font-sans font-medium text-sm transition-transform duration-300 hover:scale-[1.03] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] no-underline">
                        <span className="relative z-10">Rozpocznij</span>
                        <span className="absolute inset-0 bg-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></span>
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
                        onClick={() => setMobileOpen(prev => !prev)}
                        aria-label="Menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-dark'} ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-dark'} ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-dark'} ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                id="mobile-menu"
                className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    mobileOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                }`}
            >
                <div className="flex flex-col items-center gap-4 py-4 font-sans font-medium text-sm">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="opacity-70 hover:opacity-100 transition-opacity"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#kontakt"
                        className="sm:hidden mt-2 px-6 py-3 rounded-[2rem] bg-accent text-primary font-sans font-medium text-sm no-underline"
                        onClick={() => setMobileOpen(false)}
                    >
                        Rozpocznij
                    </a>
                </div>
            </div>
        </nav>
    );
}
