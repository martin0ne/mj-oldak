import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    useEffect(() => {
        const close = () => setMobileOpen(false);
        window.addEventListener('scroll', close, { passive: true });
        return () => window.removeEventListener('scroll', close);
    }, []);

    const navLinks = [
        { href: '/#work', label: 'Work' },
        { href: '/#about', label: 'About' },
        { href: '/#skills', label: 'Skills' },
        { href: '/#open-source', label: 'Open Source' },
        { href: '/#analytics', label: 'Analytics' },
        { href: '/#writing', label: 'Writing' },
    ];

    return (
        <nav
            ref={navRef}
            aria-label="Main menu"
            className={`navbar-enter fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-[3rem] w-[92%] max-w-5xl transition-colors duration-500 ${
                isDark
                    ? 'bg-dark/60 backdrop-blur-xl border border-primary/10 text-primary'
                    : 'bg-background/70 dark:bg-[var(--c-surface)] backdrop-blur-xl border border-dark/10 dark:border-[var(--c-line)] text-dark dark:text-[var(--c-ink)]'
            }`}
        >
            <div className="flex items-center justify-between">
                <a href="/" className="flex items-baseline gap-2 no-underline">
                    <span className="font-sans font-bold text-xl tracking-tight">Marcin J. Ołdak</span>
                    <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">MJ.OLDAK</span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center space-x-8 font-sans font-semibold text-base">
                    {navLinks.filter(link => link.href !== '/#open-source').map(link => (
                        <a key={link.href} href={link.href} className="hover:-translate-y-[1px] transition-transform opacity-75 hover:opacity-100">{link.label}</a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="/#open-source"
                        className={`hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-[2rem] border font-sans font-medium text-sm transition-colors duration-300 no-underline ${
                            isDark
                                ? 'border-primary/30 text-primary hover:border-accent hover:text-accent'
                                : 'border-dark/20 dark:border-[var(--c-line)] text-dark dark:text-[var(--c-ink)] hover:border-accent hover:text-accent'
                        }`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.3 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>
                        <span>Open Source</span>
                    </a>
                    <a
                        href="/#contact"
                        className="hidden sm:inline-block px-6 py-3 rounded-[2rem] bg-accent text-primary font-sans font-medium text-sm transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] no-underline"
                    >
                        Get in touch
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
                        onClick={() => setMobileOpen(prev => !prev)}
                        aria-label="Menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu-personal"
                    >
                        <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-dark dark:bg-[var(--c-ink)]'} ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-dark dark:bg-[var(--c-ink)]'} ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-dark dark:bg-[var(--c-ink)]'} ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                id="mobile-menu-personal"
                className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    mobileOpen ? 'max-h-72 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                }`}
            >
                <div className="flex flex-col items-center gap-4 py-4 font-sans font-semibold text-base">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="opacity-75 hover:opacity-100 transition-opacity"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/#contact"
                        className="sm:hidden mt-2 px-6 py-3 rounded-[2rem] bg-accent text-primary font-sans font-medium text-sm no-underline"
                        onClick={() => setMobileOpen(false)}
                    >
                        Get in touch
                    </a>
                </div>
            </div>
        </nav>
    );
}
