import { useEffect, useRef, useState } from 'react';
import { invoices, fieldOrder } from '../../data/demos/ocr.js';

// OCR Invoice Reader — interaktywne demo client-side (sample data, zero backendu).
// WZORZEC dla pozostałych dem: dark glass card · faza idle/processing/done ·
// sekwencyjny reveal wyników · badge "sample data" · UI EN, treść dokumentów PL.

export default function OcrDemo() {
    const [selectedId, setSelectedId] = useState(invoices[0].id);
    const [phase, setPhase] = useState('idle'); // idle | processing | done
    const [revealed, setRevealed] = useState(0); // ile pól już widać
    const [showJson, setShowJson] = useState(false);
    const timersRef = useRef([]);

    const invoice = invoices.find((i) => i.id === selectedId);
    const totalSteps = fieldOrder.length + 1; // pola + tabela pozycji

    const clearTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    useEffect(() => () => clearTimers(), []);

    const selectInvoice = (id) => {
        clearTimers();
        setSelectedId(id);
        setPhase('idle');
        setRevealed(0);
        setShowJson(false);
    };

    const process = () => {
        clearTimers();
        setPhase('processing');
        setRevealed(0);
        setShowJson(false);
        timersRef.current.push(
            setTimeout(() => {
                setPhase('done');
                for (let k = 1; k <= totalSteps; k++) {
                    timersRef.current.push(setTimeout(() => setRevealed(k), k * 170));
                }
            }, 1500)
        );
    };

    return (
        <div className="rounded-3xl border border-primary/15 bg-dark text-primary overflow-hidden">
            <style>{`
                @keyframes ocrScan {
                    0% { top: 0; opacity: 0; }
                    8% { opacity: 1; }
                    92% { opacity: 1; }
                    100% { top: calc(100% - 2px); opacity: 0; }
                }
                @keyframes ocrRowIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Pasek tytułowy */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-primary/10 bg-primary/[0.03]">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-sans font-bold text-lg tracking-tight">OCR Invoice Reader</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 bg-accent/10 rounded-full px-3 py-1">
                    Interactive demo · sample data
                </span>
            </div>

            <div className="p-6">
                {/* Wybór faktury + akcja — przycisk top-right na równi z tabami, faktury zawijają niżej */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                        {invoices.map((inv) => (
                            <button
                                key={inv.id}
                                onClick={() => selectInvoice(inv.id)}
                                className={`px-4 py-2 rounded-full font-mono text-xs transition-colors border ${
                                    inv.id === selectedId
                                        ? 'bg-accent/20 border-accent text-primary'
                                        : 'border-primary/20 text-primary/60 hover:border-primary/50 hover:text-primary'
                                }`}
                            >
                                {inv.label}
                                <span className="hidden sm:inline opacity-50"> · {inv.kind}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={process}
                        disabled={phase === 'processing'}
                        className="shrink-0 self-start min-w-[150px] text-center whitespace-nowrap px-6 py-2.5 rounded-full bg-accent text-primary font-sans font-bold text-sm hover:scale-[1.03] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {phase === 'processing' ? 'Processing…' : phase === 'done' ? 'Process again' : 'Process invoice'}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Dokument (fake paper) */}
                    <div className="relative min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-3">Document</div>
                        <div className="relative bg-[#f5f3ee] text-dark rounded-xl p-5 min-h-[260px] shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden">
                            <div className="font-sans font-bold text-sm tracking-wide mb-3">{invoice.doc.header}</div>
                            <div className="space-y-2">
                                {invoice.doc.lines.map((line, i) => (
                                    <div key={i} className="font-mono text-[11px] leading-relaxed text-dark/75">{line}</div>
                                ))}
                            </div>
                            <div className="mt-4 space-y-1.5">
                                {[85, 70, 78, 55, 64].map((w, i) => (
                                    <div key={i} className="h-[3px] rounded bg-dark/15" style={{ width: `${w}%` }} />
                                ))}
                            </div>
                            {/* Linia skanu */}
                            {phase === 'processing' && (
                                <div
                                    className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_16px_2px_rgba(79,142,186,0.8)]"
                                    style={{ animation: 'ocrScan 1.5s linear forwards' }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Wyniki */}
                    <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-3">
                            Extracted fields {phase === 'done' && revealed >= totalSteps && (
                                <button onClick={() => setShowJson(!showJson)} className="ml-2 text-accent normal-case tracking-normal underline underline-offset-2">
                                    {showJson ? 'hide JSON' : 'view JSON'}
                                </button>
                            )}
                        </div>

                        {phase === 'idle' && (
                            <div className="rounded-xl border border-dashed border-primary/20 min-h-[260px] flex items-center justify-center font-mono text-xs opacity-40 text-center px-6">
                                Pick an invoice and hit „Process invoice" — extraction runs right here in your browser.
                            </div>
                        )}

                        {phase === 'processing' && (
                            <div className="rounded-xl border border-primary/15 bg-primary/[0.04] min-h-[260px] flex flex-col items-center justify-center gap-3">
                                <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                                <span className="font-mono text-xs opacity-60">Reading document…</span>
                            </div>
                        )}

                        {phase === 'done' && !showJson && (
                            <div className="space-y-1.5">
                                {fieldOrder.map((f, idx) => (
                                    idx < revealed && (
                                        <div
                                            key={f.key}
                                            className="grid grid-cols-[110px_1fr_auto] items-baseline gap-3 px-3 py-2 rounded-lg bg-primary/[0.05] border-l-2 border-accent"
                                            style={{ animation: 'ocrRowIn 0.3s ease both' }}
                                        >
                                            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent font-bold">{f.label}</span>
                                            <span className="font-mono text-xs">{invoice.fields[f.key].value}</span>
                                            <span className="font-mono text-[9px] opacity-40">{invoice.fields[f.key].confidence}</span>
                                        </div>
                                    )
                                ))}
                                {revealed >= totalSteps && (
                                    <div className="pt-3" style={{ animation: 'ocrRowIn 0.3s ease both' }}>
                                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">Line items</div>
                                        <div className="rounded-lg border border-primary/15 overflow-hidden">
                                            {invoice.items.map((item, i) => (
                                                <div key={i} className={`grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2 font-mono text-[11px] ${i % 2 ? 'bg-primary/[0.03]' : ''}`}>
                                                    <span className="opacity-85 truncate">{item.name}</span>
                                                    <span className="opacity-50">{item.qty}</span>
                                                    <span className="text-accent">{item.total}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {phase === 'done' && showJson && (
                            <pre className="rounded-xl border border-primary/15 bg-black/30 p-4 font-mono text-[10px] leading-relaxed text-primary/85 overflow-x-auto max-h-[320px] overflow-y-auto">
{JSON.stringify({ ...Object.fromEntries(fieldOrder.map(f => [f.key, invoice.fields[f.key].value])), items: invoice.items }, null, 2)}
                            </pre>
                        )}
                    </div>
                </div>

                {/* Stopka dema — co to dowodzi */}
                <p className="mt-5 font-mono text-[10px] leading-relaxed opacity-40">
                    The product itself: FastAPI + Azure Document Intelligence + Claude API — PDF/photo in, structured data out.
                    The scanned document is intentionally a Polish invoice — that's what the product reads. Demo runs entirely in your browser.
                </p>
            </div>
        </div>
    );
}
