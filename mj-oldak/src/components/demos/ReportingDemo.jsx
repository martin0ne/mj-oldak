import { useEffect, useRef, useState } from 'react';
import { clients, reportMonths } from '../../data/demos/reporting.js';

// Reporting Agent — demo client-side: wybór klienta+miesiąca → "Generate" → podgląd raportu
// (KPI + top koszty + podsumowanie PL, jak w produkcie — raport dla klienta biura jest po polsku).

export default function ReportingDemo() {
    const [clientId, setClientId] = useState(clients[0].id);
    const [month, setMonth] = useState(reportMonths[0].id);
    const [phase, setPhase] = useState('idle'); // idle | generating | done
    const timersRef = useRef([]);

    const client = clients.find((c) => c.id === clientId);
    const report = client.months[month];

    const clearTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    useEffect(() => () => clearTimers(), []);

    const pick = (setter) => (val) => {
        clearTimers();
        setter(val);
        setPhase('idle');
    };

    const generate = () => {
        clearTimers();
        setPhase('generating');
        timersRef.current.push(setTimeout(() => setPhase('done'), 1100));
    };

    const kpis = report
        ? [
              { label: 'Revenue', value: report.revenue },
              { label: 'Costs', value: report.costs },
              { label: 'Net income', value: report.income },
              { label: 'VAT due', value: report.vatDue },
              { label: 'ZUS', value: report.zus },
          ]
        : [];

    return (
        <div className="rounded-3xl border border-primary/15 bg-dark text-primary overflow-hidden">
            <style>{`
                @keyframes reportIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Pasek tytułowy */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-primary/10 bg-primary/[0.03]">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-sans font-bold text-lg tracking-tight">Reporting Agent</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 bg-accent/10 rounded-full px-3 py-1">
                    Interactive demo · sample data
                </span>
            </div>

            <div className="p-6">
                {/* Selektory + akcja */}
                <div className="flex flex-wrap items-end gap-4 mb-6">
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">Client</div>
                        <div className="flex flex-wrap gap-2">
                            {clients.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => pick(setClientId)(c.id)}
                                    className={`px-3.5 py-2 rounded-full font-mono text-[11px] transition-colors border ${
                                        c.id === clientId
                                            ? 'bg-accent/20 border-accent text-primary'
                                            : 'border-primary/20 text-primary/60 hover:border-primary/50 hover:text-primary'
                                    }`}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">Month</div>
                        <div className="flex flex-wrap gap-2">
                            {reportMonths.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => pick(setMonth)(m.id)}
                                    className={`px-3.5 py-2 rounded-full font-mono text-[11px] transition-colors border ${
                                        m.id === month
                                            ? 'bg-accent/20 border-accent text-primary'
                                            : 'border-primary/20 text-primary/60 hover:border-primary/50 hover:text-primary'
                                    }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={generate}
                        disabled={phase === 'generating'}
                        className="ml-auto px-6 py-2.5 rounded-full bg-accent text-primary font-sans font-bold text-sm hover:scale-[1.03] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {phase === 'generating' ? 'Generating…' : phase === 'done' ? 'Regenerate' : 'Generate report'}
                    </button>
                </div>

                {phase === 'idle' && (
                    <div className="rounded-xl border border-dashed border-primary/20 min-h-[240px] flex items-center justify-center font-mono text-xs opacity-40 text-center px-6">
                        Pick a client and month, then generate — the monthly report builds right here in your browser.
                    </div>
                )}

                {phase === 'generating' && (
                    <div className="rounded-xl border border-primary/15 bg-primary/[0.04] min-h-[240px] flex flex-col items-center justify-center gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                        <span className="font-mono text-xs opacity-60">Building report…</span>
                    </div>
                )}

                {phase === 'done' && report && (
                    <div className="rounded-xl border border-primary/15 bg-[#f5f3ee] text-dark overflow-hidden" style={{ animation: 'reportIn 0.4s ease both' }}>
                        {/* Nagłówek raportu (PL — jak trafia do klienta biura) */}
                        <div className="px-6 py-4 border-b border-dark/10 flex items-baseline justify-between flex-wrap gap-2">
                            <div>
                                <div className="font-sans font-bold text-lg">{client.name}</div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-50">{client.industry}</div>
                            </div>
                            <div className="font-mono text-[11px] opacity-60">Monthly report · {reportMonths.find((m) => m.id === month).label}</div>
                        </div>

                        {/* KPI */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-dark/10">
                            {kpis.map((k) => (
                                <div key={k.label} className="bg-[#f5f3ee] px-4 py-3">
                                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] opacity-50">{k.label}</div>
                                    <div className="font-sans font-bold text-sm mt-1">{k.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Top koszty */}
                        <div className="px-6 py-4">
                            <div className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-50 mb-2">Top costs</div>
                            {report.topCosts.map((c, i) => (
                                <div key={i} className="flex justify-between font-mono text-[12px] py-1.5 border-b border-dark/5 last:border-0">
                                    <span className="opacity-75">{c.name}</span>
                                    <span className="font-bold">{c.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Podsumowanie PL */}
                        <div className="px-6 pb-5">
                            <div className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-50 mb-2">Summary</div>
                            <p className="font-sans text-[13px] leading-relaxed opacity-85">{report.summary}</p>
                        </div>
                    </div>
                )}

                <p className="mt-5 font-mono text-[10px] leading-relaxed opacity-40">
                    The product itself: FastAPI + openpyxl + fpdf2 — branded PDF reports per client (in Polish),
                    generated from the office's ledger exports. This demo runs entirely in your browser on sample data.
                </p>
            </div>
        </div>
    );
}
