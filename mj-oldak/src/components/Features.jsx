import React, { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Shared 3D Tilt Wrapper ───────────────────────────────────────────
function TiltCard({ children, className = '' }) {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    );
}

// ─── Main Features Section ────────────────────────────────────────────
export default function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="uslugi" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4">Infrastruktura</h2>
                <p className="text-dark/70 font-mono text-sm max-w-xl">
                    Projektujemy i wdrażamy systemy, które pracują dla Ciebie.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <DiagnosticShuffler />
                <TelemetryTypewriter />
                <CursorProtocolScheduler />
            </div>
        </section>
    );
}

// ─── Widget 1: Agenci AI ──────────────────────────────────────────────
const AGENTS = [
    { id: 1, label: 'LLM Integration', status: 'Active', color: '#22c55e', desc: 'GPT-4o · Claude · Gemini' },
    { id: 2, label: 'RAG Pipeline', status: 'Syncing', color: '#3b82f6', desc: 'Embeddings · Vector Search' },
    { id: 3, label: 'Custom Agents', status: 'Deployed', color: '#E63B2E', desc: 'Task Execution · Tool Use' },
    { id: 4, label: 'Vector DB', status: 'Online', color: '#a855f7', desc: 'Pinecone · Qdrant · Weaviate' },
];

function DiagnosticShuffler() {
    const [activeId, setActiveId] = useState(1);
    const progressRef = useRef(null);
    const intervalRef = useRef(null);

    const startCycle = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveId(prev => {
                const idx = AGENTS.findIndex(a => a.id === prev);
                return AGENTS[(idx + 1) % AGENTS.length].id;
            });
        }, 3000);
    }, []);

    useEffect(() => {
        startCycle();
        return () => clearInterval(intervalRef.current);
    }, [startCycle]);

    // Restart progress bar animation on activeId change
    useEffect(() => {
        const bar = progressRef.current;
        if (!bar) return;
        bar.style.transition = 'none';
        bar.style.width = '0%';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                bar.style.transition = 'width 3s linear';
                bar.style.width = '100%';
            });
        });
    }, [activeId]);

    const handleClick = (id) => {
        setActiveId(id);
        startCycle(); // reset timer on manual click
    };

    return (
        <TiltCard className="feature-card bg-dark rounded-[2rem] p-8 h-[420px] flex flex-col relative overflow-hidden group border border-primary/5 hover:border-accent/20 transition-colors duration-500 shadow-lg hover:shadow-[0_8px_40px_rgba(230,59,46,0.15)]">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[10px] text-primary/40 uppercase tracking-widest">System Active</span>
                </div>
                <h3 className="font-sans font-bold text-2xl text-primary mb-2">Agenci AI</h3>
                <p className="font-mono text-sm text-primary/50 mb-4">Autonomiczne systemy zintegrowane w rdzeń Twojej firmy.</p>
            </div>

            <div className="flex-1 relative z-10 flex flex-col gap-2">
                {AGENTS.map((agent) => {
                    const isActive = agent.id === activeId;
                    return (
                        <div
                            key={agent.id}
                            onClick={() => handleClick(agent.id)}
                            className={`rounded-xl p-3 border cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] relative overflow-hidden ${
                                isActive
                                    ? 'border-accent/30 bg-primary/[0.07]'
                                    : 'border-primary/5 bg-primary/[0.02] hover:border-primary/15 hover:bg-primary/[0.04]'
                            }`}
                        >
                            {/* Progress bar for active item */}
                            {isActive && (
                                <div
                                    ref={progressRef}
                                    className="absolute bottom-0 left-0 h-[2px] bg-accent/40"
                                    style={{ width: '0%' }}
                                />
                            )}

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-2 h-2 rounded-full shrink-0 transition-shadow duration-300"
                                        style={{
                                            backgroundColor: agent.color,
                                            boxShadow: isActive ? `0 0 8px ${agent.color}80` : 'none',
                                        }}
                                    />
                                    <span className={`font-mono text-xs font-bold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-primary/50'}`}>
                                        {agent.label}
                                    </span>
                                </div>
                                <span className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-accent' : 'text-primary/25'}`}>
                                    {agent.status}
                                </span>
                            </div>

                            <div
                                className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                style={{ maxHeight: isActive ? '40px' : '0px', opacity: isActive ? 1 : 0 }}
                            >
                                <p className="font-mono text-[11px] text-primary/40 mt-2 pl-5">
                                    {agent.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </TiltCard>
    );
}

// ─── Widget 2: Automatyzacja ──────────────────────────────────────────
const TERMINAL_LINES = [
    { text: 'SYS_INIT: OK', type: 'success' },
    { text: 'MODULE: Automation Pipeline v3.2', type: 'info' },
    { text: 'STATUS: Active — all nodes responding', type: 'success' },
    { text: '> Scanning back-office workflows...', type: 'dim' },
    { text: '> 12 processes identified for optimization', type: 'info' },
    { text: '> Deploying automation agents...', type: 'dim' },
    { text: 'RESULT: Operational time reduced by 74%', type: 'accent' },
    { text: '> Listening for new tasks...', type: 'dim' },
];

function getLineColor(type) {
    switch (type) {
        case 'success': return 'text-green-400';
        case 'accent': return 'text-accent font-bold';
        case 'info': return 'text-blue-400';
        case 'dim': return 'text-primary/40';
        default: return 'text-primary/60';
    }
}

function TelemetryTypewriter() {
    const [display, setDisplay] = useState({ completed: [], typing: '', typingType: 'success', cursorVisible: true });
    const isHoveredRef = useRef(false);
    const animRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function sleep(ms) {
            return new Promise(resolve => {
                animRef.current = setTimeout(resolve, ms);
            });
        }

        async function runTypewriter() {
            while (!cancelled) {
                const completed = [];

                for (let lineIdx = 0; lineIdx < TERMINAL_LINES.length; lineIdx++) {
                    if (cancelled) return;
                    const line = TERMINAL_LINES[lineIdx];

                    // Type out each character
                    for (let charIdx = 1; charIdx <= line.text.length; charIdx++) {
                        if (cancelled) return;
                        setDisplay({
                            completed: [...completed],
                            typing: line.text.slice(0, charIdx),
                            typingType: line.type,
                            cursorVisible: true,
                        });
                        await sleep(isHoveredRef.current ? 8 : 35);
                    }

                    // Line done — push to completed
                    completed.push(line);
                    setDisplay({
                        completed: [...completed],
                        typing: '',
                        typingType: 'dim',
                        cursorVisible: true,
                    });

                    // Pause between lines
                    await sleep(250);
                }

                // All lines done — pause then restart
                await sleep(2500);
                setDisplay({ completed: [], typing: '', typingType: 'success', cursorVisible: true });
                await sleep(500);
            }
        }

        runTypewriter();

        return () => {
            cancelled = true;
            clearTimeout(animRef.current);
        };
    }, []);

    return (
        <TiltCard className="feature-card bg-dark rounded-[2rem] p-8 h-[420px] flex flex-col border border-primary/5 hover:border-accent/20 transition-colors duration-500 shadow-lg hover:shadow-[0_8px_40px_rgba(230,59,46,0.15)]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-sans font-bold text-2xl text-primary">Automatyzacja</h3>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                    <span className="font-mono text-[10px] uppercase text-primary/40 tracking-widest">Live</span>
                </div>
            </div>
            <p className="font-mono text-sm text-primary/50 mb-6">Zastępujemy powtarzalną pracę zintegrowanymi przepływami danych.</p>

            <div
                className="flex-1 bg-[#0a0a0a] rounded-xl p-4 overflow-hidden border border-primary/5 relative"
                onMouseEnter={() => { isHoveredRef.current = true; }}
                onMouseLeave={() => { isHoveredRef.current = false; }}
            >
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,228,221,1) 2px, rgba(232,228,221,1) 4px)',
                    }}
                />

                <div className="relative z-20 font-mono text-xs leading-relaxed space-y-1">
                    {display.completed.map((line, i) => (
                        <div key={i} className={getLineColor(line.type)}>
                            {line.text}
                        </div>
                    ))}
                    {display.typing && (
                        <div className={getLineColor(display.typingType)}>
                            {display.typing}
                            <span className="inline-block w-[6px] h-3 ml-0.5 bg-accent animate-pulse align-middle" />
                        </div>
                    )}
                    {!display.typing && display.cursorVisible && (
                        <div>
                            <span className="inline-block w-[6px] h-3 bg-accent animate-pulse align-middle" />
                        </div>
                    )}
                </div>
            </div>
        </TiltCard>
    );
}

// ─── Widget 3: Consulting AI ──────────────────────────────────────────
function CursorProtocolScheduler() {
    const gridRef = useRef(null);
    const cursorRef = useRef(null);
    const dayCellRef = useRef(null);
    const execBtnRef = useRef(null);
    const [hoveredDay, setHoveredDay] = useState(null);
    const activeDays = [4, 8, 10, 13];

    useEffect(() => {
        if (!cursorRef.current || !dayCellRef.current || !execBtnRef.current) return;

        const cursor = cursorRef.current;
        const dayCell = dayCellRef.current;
        const execBtn = execBtnRef.current;
        const container = cursor.parentElement;

        // Calculate positions relative to cursor's container
        function getRelPos(target) {
            const cRect = container.getBoundingClientRect();
            const tRect = target.getBoundingClientRect();
            return {
                x: tRect.left + tRect.width / 2 - cRect.left - cursor.offsetLeft,
                y: tRect.top + tRect.height / 2 - cRect.top - cursor.offsetTop,
            };
        }

        // Wait a frame for layout to settle
        const raf = requestAnimationFrame(() => {
            const dayPos = getRelPos(dayCell);
            const btnPos = getRelPos(execBtn);

            const ctx = gsap.context(() => {
                const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

                tl.set(cursor, { x: 0, y: 0, scale: 1, opacity: 0 })
                    .to(cursor, { opacity: 1, duration: 0.3 })
                    .to(cursor, { x: dayPos.x, y: dayPos.y, duration: 1.2, ease: 'power3.inOut' })
                    .to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 })
                    .to(dayCell, { backgroundColor: '#E63B2E', color: '#E8E4DD', scale: 1.1, duration: 0.25 }, '-=0.15')
                    .to(cursor, { x: btnPos.x, y: btnPos.y, duration: 1.2, ease: 'power3.inOut', delay: 0.4 })
                    .to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 })
                    .to(execBtn, { scale: 0.93, duration: 0.1, yoyo: true, repeat: 1, backgroundColor: '#E63B2E' }, '-=0.15')
                    .to(execBtn, { backgroundColor: '#E8E4DD', color: '#111111', duration: 0.3, delay: 0.3 })
                    .to(cursor, { opacity: 0, duration: 0.4, delay: 0.5 })
                    .to(dayCell, { backgroundColor: 'rgba(230,59,46,0.1)', color: '#E63B2E', scale: 1, duration: 0.4 }, '+=0.3')
                    .set(dayCell, { clearProps: 'all' })
                    .to(execBtn, { backgroundColor: '#111111', color: '#E8E4DD', duration: 0.3 }, '<');
            }, gridRef);

            cursor._gsapCtx = ctx;
        });

        return () => {
            cancelAnimationFrame(raf);
            if (cursor._gsapCtx) cursor._gsapCtx.revert();
        };
    }, []);

    return (
        <TiltCard className="feature-card bg-dark rounded-[2rem] p-8 h-[420px] flex flex-col relative overflow-hidden group border border-primary/5 hover:border-accent/20 transition-colors duration-500 shadow-lg hover:shadow-[0_8px_40px_rgba(230,59,46,0.15)]">
            <div ref={gridRef} className="flex flex-col h-full">
                <div className="relative z-10">
                    <h3 className="font-sans font-bold text-2xl text-primary mb-2">Consulting AI</h3>
                    <p className="font-mono text-sm text-primary/50 mb-6 max-w-[220px]">Audyty technologiczne i strategia wdrożeń.</p>
                </div>

                <div className="flex-1 border border-primary/10 rounded-xl p-4 bg-[#0a0a0a] relative flex flex-col justify-between">
                    {/* Month label */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[10px] text-primary/30 uppercase tracking-widest">Marzec 2026</span>
                        <span className="font-mono text-[10px] text-accent/60">4 sesje</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {['P', 'W', 'Ś', 'C', 'P', 'S', 'N'].map((day, i) => (
                            <div key={i} className="text-center font-mono text-[10px] text-primary/25 mb-1">{day}</div>
                        ))}
                        {Array.from({ length: 14 }).map((_, i) => {
                            const isActive = activeDays.includes(i);
                            const isAnimTarget = i === 10;
                            return (
                                <div
                                    key={i}
                                    ref={isAnimTarget ? dayCellRef : undefined}
                                    className={`aspect-square rounded-md border flex items-center justify-center font-mono text-[11px] cursor-default transition-all duration-200 ${
                                        isActive
                                            ? 'border-accent/30 text-accent bg-accent/10'
                                            : hoveredDay === i
                                                ? 'border-primary/30 text-primary/80 bg-primary/10'
                                                : 'border-primary/5 text-primary/30'
                                    }`}
                                    onMouseEnter={() => setHoveredDay(i)}
                                    onMouseLeave={() => setHoveredDay(null)}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] text-primary/20">auto-scheduling</span>
                        <div
                            ref={execBtnRef}
                            className="bg-dark text-primary font-mono text-xs px-4 py-2 rounded-lg transition-all duration-200 border border-primary/10 hover:border-accent/30"
                        >
                            Execute
                        </div>
                    </div>

                    {/* Animated cursor */}
                    <div ref={cursorRef} className="absolute z-20 pointer-events-none" style={{ top: 40, left: 20 }}>
                        <MousePointer2 className="w-5 h-5 text-primary fill-primary drop-shadow-[0_2px_8px_rgba(232,228,221,0.3)]" />
                    </div>
                </div>
            </div>
        </TiltCard>
    );
}
