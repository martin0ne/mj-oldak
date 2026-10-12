import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// v3 (12.10.2026) — belka z etykietami, nie pigułka z blur.
// Hairline, sentence case, mono tylko na marce. Zero rounded-3rem / backdrop-blur.
export default function NavbarPersonal() {
    const navRef = useRef(null);
    const [isDark, setIsDark] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
        const triggers = [];

        darkSections.forEach((section) => {
            const st = ScrollTrigger.create({
                trigger: section,
                start: 'top 56px',
                end: 'bottom 56px',
                onEnter: () => setIsDark(true),
                onLeave: () => setIsDark(false),
                onEnterBack: () => setIsDark(true),
                onLeaveBack: () => setIsDark(false),
            });
            triggers.push(st);
        });

        return () => triggers.forEach(st => st.kill());
    }, []);

    useEffect(() => {
        const close = () => setMobileOpen(false);
        window.addEventListener('scroll', close, { passive: true });
        return () => window.removeEventListener('scroll', close);
    }, []);

    const navLinks = [
        { href: '/#work', label: 'Tools' },
        { href: '/#about', label: 'About' },
        { href: '/#skills', label: 'Skills' },
        { href: '/#analytics', label: 'Analytics' },
        { href: '/#writing', label: 'Writing' },
        { href: '/#community', label: 'Community' },
        { href: '/artykuly/', label: 'Blog' },
    ];

    const dark = isDark;

    return (
        <nav
            ref={navRef}
            aria-label="Main menu"
            className={`navbar-enter fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${
                dark
                    ? 'bg-dark/95 border-primary/15 text-primary'
                    : 'bg-[var(--c-page)]/95 border-[var(--c-line)] text-dark dark:bg-[var(--c-page)]/95 dark:text-[var(--c-ink)]'
            }`}
        >
            <div className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between">
                <a href="/" className="flex items-baseline gap-2.5 no-underline">
                    <span className="font-serif text-lg leading-none">Marcin J. Ołdak</span>
                    <span className={`hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em] ${dark ? 'text-primary/50' : 'opacity-50 dark:opacity-60'}`}>
                        MJ.OLDAK
                    </span>
                </a>

                {/* Desktop — etykiety, nie przyciski-pigułki */}
                <div className="hidden md:flex items-center gap-7 text-sm font-medium">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`no-underline transition-opacity duration-200 ${dark ? 'opacity-70 hover:opacity-100' : 'opacity-70 hover:opacity-100'}`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/#contact"
                        className={`no-underline text-sm font-medium px-4 py-2 rounded-[6px] transition-colors duration-200 ${
                            dark
                                ? 'bg-primary text-dark hover:bg-[#FBFBFA]'
                                : 'bg-[#111111] text-[#FBFBFA] hover:bg-[#333333] dark:bg-[#FBFBFA] dark:text-[#111111]'
                        }`}
                    >
                        Get in touch
                    </a>
                </div>

                {/* Mobile hamburger — prostokątne linie, bez rounded-full */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label="Menu"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu-personal"
                >
                    <span className={`block w-5 h-[1.5px] transition-all duration-300 ${dark ? 'bg-primary' : 'bg-dark dark:bg-[var(--c-ink)]'} ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`block w-5 h-[1.5px] transition-all duration-300 ${dark ? 'bg-primary' : 'bg-dark dark:bg-[var(--c-ink)]'} ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-[1.5px] transition-all duration-300 ${dark ? 'bg-primary' : 'bg-dark dark:bg-[var(--c-ink)]'} ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div
                id="mobile-menu-personal"
                className={`md:hidden overflow-hidden transition-all duration-300 ${
                    mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="flex flex-col items-start gap-4 px-5 pb-5 pt-1 text-sm font-medium border-t border-inherit">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="opacity-75 hover:opacity-100 transition-opacity no-underline"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/#contact"
                        className="mt-1 px-4 py-2 rounded-[6px] bg-[#111111] text-[#FBFBFA] no-underline"
                        onClick={() => setMobileOpen(false)}
                    >
                        Get in touch
                    </a>
                </div>
            </div>
        </nav>
    );
}