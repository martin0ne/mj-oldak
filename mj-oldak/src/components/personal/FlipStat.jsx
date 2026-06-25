import { useEffect, useRef, useState } from 'react';

// Split-flap / flip-clock stat — cyfry „przekręcają się" do wartości docelowej, gdy
// sekcja wchodzi w widok (jak tablica Solari na dworcu). Ustalają się od lewej do prawej.
// prefers-reduced-motion → od razu wartość finalna (bez animacji).
export default function FlipStat({ value, suffix = '', suffixClass = '', label }) {
    const ref = useRef(null);
    const started = useRef(false);
    const [display, setDisplay] = useState(value);
    const [rolling, setRolling] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduced = typeof window !== 'undefined'
            && window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started.current) {
                started.current = true;
                io.disconnect();
                if (reduced) { setDisplay(value); return; }
                roll();
            }
        }, { threshold: 0.6 });
        io.observe(el);
        return () => io.disconnect();
    }, [value]);

    const roll = () => {
        const chars = value.split('');
        const isDigit = (c) => c >= '0' && c <= '9';
        // klatka, w której każda cyfra się „zatrzaskuje" (lewa→prawa = efekt split-flap)
        const lockAt = chars.map((_, i) => 7 + i * 5);
        const total = lockAt[lockAt.length - 1] + 4;
        let frame = 0;
        setRolling(true);
        const iv = setInterval(() => {
            frame++;
            const out = chars.map((c, i) => {
                if (!isDigit(c)) return c;
                if (frame >= lockAt[i]) return c;
                return String(Math.floor(Math.random() * 10));
            }).join('');
            setDisplay(out);
            if (frame >= total) {
                clearInterval(iv);
                setDisplay(value);
                setRolling(false);
            }
        }, 55);
    };

    return (
        <div ref={ref}>
            <div className="font-sans font-bold text-4xl md:text-5xl tracking-tight tabular-nums">
                <span
                    className="inline-block transition-[filter,transform] duration-75"
                    style={rolling ? { filter: 'blur(0.4px)' } : undefined}
                >
                    {display}
                </span>
                {suffix && <span className={suffixClass}>{suffix}</span>}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60 mt-2">{label}</div>
        </div>
    );
}
