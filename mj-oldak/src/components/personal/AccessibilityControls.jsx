import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// Pasek komfortu/dostępności: język artykułów (PL/EN) + tryb jasny/ciemny + rozmiar tekstu.
// Wszystko zapamiętane w localStorage. Zero-flash motywu/rozmiaru: inline script w <head>.
// Język dotyczy WYŁĄCZNIE artykułów — strona główna pozostaje EN (nie ma jeszcze PL home).
const SCALES = [100, 110, 120, 130];
const KEY_SCALE = 'mjo-text-scale';
const KEY_THEME = 'mjo-theme';
const KEY_LANG = 'mjo-lang';

function detectLang() {
    // 1. Na stronach artykułów język wynika z URL (pasek zawsze zgodny z aktualną stroną).
    const p = (typeof window !== 'undefined' && window.location.pathname) || '';
    if (p.startsWith('/en/articles')) return 'en';
    if (p.startsWith('/artykuly')) return 'pl';
    // 2. Poza artykułami: zapamiętany wybór, potem język przeglądarki.
    try {
        const saved = localStorage.getItem(KEY_LANG);
        if (saved === 'pl' || saved === 'en') return saved;
    } catch (e) {}
    const nav = (typeof navigator !== 'undefined' && navigator.language) || 'en';
    return nav.toLowerCase().startsWith('pl') ? 'pl' : 'en';
}

// Ustawia docelowe linki „do artykułów" na całej stronie wg języka (data-art-pl / data-art-en).
function applyArticleLinks(lang) {
    document.querySelectorAll('a[data-art-pl][data-art-en]').forEach((a) => {
        a.setAttribute('href', lang === 'en' ? a.dataset.artEn : a.dataset.artPl);
    });
}

export default function AccessibilityControls() {
    const [level, setLevel] = useState(0);
    const [dark, setDark] = useState(false);
    const [lang, setLang] = useState('en');
    const [onArticles, setOnArticles] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const saved = parseInt(localStorage.getItem(KEY_SCALE) || '0', 10);
        setLevel(Number.isNaN(saved) ? 0 : Math.min(Math.max(saved, 0), SCALES.length - 1));
        setDark(document.documentElement.classList.contains('dark'));
        const l = detectLang();
        setLang(l);
        applyArticleLinks(l);
        const p = window.location.pathname;
        setOnArticles(p.startsWith('/artykuly') || p.startsWith('/en/articles'));
        setReady(true);
    }, []);

    useEffect(() => {
        if (!ready) return;
        document.documentElement.style.fontSize = SCALES[level] + '%';
        localStorage.setItem(KEY_SCALE, String(level));
    }, [level, ready]);

    const toggleTheme = () => {
        setDark((d) => {
            const nd = !d;
            document.documentElement.classList.toggle('dark', nd);
            localStorage.setItem(KEY_THEME, nd ? 'dark' : 'light');
            return nd;
        });
    };

    const switchLang = (next) => {
        if (next === lang) return;
        setLang(next);
        try { localStorage.setItem(KEY_LANG, next); } catch (e) {}
        applyArticleLinks(next);
        // Jeśli jesteśmy NA stronie artykułów — przeskocz na wersję w wybranym języku.
        const p = window.location.pathname;
        const onEn = p.startsWith('/en/articles');
        const onPl = p.startsWith('/artykuly');
        if ((next === 'en' && onPl) || (next === 'pl' && onEn)) {
            const isList = /^\/en\/articles\/?$/.test(p) || /^\/artykuly\/?$/.test(p);
            const tr = document.querySelector('a[data-translate]');
            if (!isList && tr && tr.getAttribute('href')) {
                window.location.href = tr.getAttribute('href');
            } else {
                window.location.href = next === 'en' ? '/en/articles/' : '/artykuly/';
            }
        }
    };

    const iconBtn = 'w-8 h-8 flex items-center justify-center rounded-full leading-none transition-colors disabled:opacity-30 disabled:cursor-default hover:bg-accent/15 text-dark dark:text-[var(--c-ink)]';
    const langBtn = (active) =>
        `px-2.5 h-7 flex items-center justify-center font-mono text-[10px] font-bold tracking-wider rounded-full transition-colors ${
            active ? 'bg-accent text-dark' : 'text-dark/55 dark:text-[var(--c-ink)] hover:text-accent'
        }`;

    return (
        <div
            className="fixed bottom-5 right-5 z-[60] flex items-center gap-1 rounded-full border border-dark/15 dark:border-[var(--c-line)] bg-background/90 dark:bg-[var(--c-surface)] backdrop-blur-md px-2 py-1.5 shadow-[0_8px_24px_rgba(13,27,50,0.18)]"
            role="group"
            aria-label="Język, motyw i rozmiar tekstu"
        >
            {/* Język artykułów — tylko na stronach artykułów (strona główna jest wyłącznie EN) */}
            {onArticles && (
                <>
                    <div className="flex items-center gap-0.5" role="group" aria-label="Język artykułów">
                        <button onClick={() => switchLang('pl')} aria-pressed={lang === 'pl'} className={langBtn(lang === 'pl')}>PL</button>
                        <button onClick={() => switchLang('en')} aria-pressed={lang === 'en'} className={langBtn(lang === 'en')}>EN</button>
                    </div>
                    <span className="w-px h-5 bg-dark/15 dark:bg-[var(--c-line)] mx-0.5" aria-hidden="true" />
                </>
            )}

            <button
                onClick={toggleTheme}
                aria-label={dark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
                aria-pressed={dark}
                className={iconBtn}
                title={dark ? 'Tryb jasny' : 'Tryb ciemny'}
            >
                {dark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
            </button>

            <span className="w-px h-5 bg-dark/15 dark:bg-[var(--c-line)] mx-0.5" aria-hidden="true" />

            <button
                onClick={() => setLevel((l) => Math.max(0, l - 1))}
                disabled={level === 0}
                aria-label="Zmniejsz tekst"
                className={`${iconBtn} font-sans font-bold text-sm`}
            >
                A<span className="text-[10px]">−</span>
            </button>
            <span className="font-mono text-[10px] tabular-nums text-dark/55 dark:text-[var(--c-ink)] dark:opacity-60 w-9 text-center select-none" aria-hidden="true">
                {SCALES[level]}%
            </span>
            <button
                onClick={() => setLevel((l) => Math.min(SCALES.length - 1, l + 1))}
                disabled={level === SCALES.length - 1}
                aria-label="Powiększ tekst"
                className={`${iconBtn} font-sans font-bold text-base`}
            >
                A<span className="text-xs">+</span>
            </button>
        </div>
    );
}
