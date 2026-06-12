import { useMemo, useState } from 'react';
import { taxpayerTypes, months, monthlyRules, oneOffs, demoToday } from '../../data/demos/deadline.js';

// Deadline Agent — demo z PRAWDZIWĄ logiką dat w przeglądarce:
// reguły miesięczne → konkretne daty + przesunięcie weekendowe (sob/nd → pon), jak w realnym kalendarzu podatkowym.

const tagColors = {
    VAT: 'bg-accent/15 text-accent border-accent/50',
    PIT: 'bg-green-400/15 text-green-400 border-green-400/50',
    CIT: 'bg-violet-400/15 text-violet-400 border-violet-400/50',
    ZUS: 'bg-sunset/15 text-sunset border-sunset/50',
    KSeF: 'bg-red-400/15 text-red-400 border-red-400/50',
};

// Sob/nd → następny dzień roboczy (realna reguła Ordynacji podatkowej).
function shiftWeekend(date) {
    const d = new Date(date);
    if (d.getDay() === 6) d.setDate(d.getDate() + 2);
    else if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d;
}

function fmt(d) {
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
}

export default function DeadlineDemo() {
    const [type, setType] = useState(taxpayerTypes[0].id);
    const [month, setMonth] = useState(months[0].id);

    const deadlines = useMemo(() => {
        const today = new Date(demoToday);
        const fromRules = monthlyRules
            .filter((r) => r.appliesTo.includes(type))
            .map((r) => {
                const raw = new Date(`${month}-${String(r.day).padStart(2, '0')}`);
                const date = shiftWeekend(raw);
                const shifted = date.getTime() !== raw.getTime();
                return { ...r, date, shifted };
            });
        const fromOneOffs = oneOffs
            .filter((o) => o.appliesTo.includes(type) && o.date.startsWith(month))
            .map((o) => ({ ...o, date: new Date(o.date), shifted: false }));
        return [...fromRules, ...fromOneOffs]
            .sort((a, b) => a.date - b.date)
            .map((d) => {
                const diff = Math.ceil((d.date - today) / 86400000);
                return { ...d, daysLeft: diff, passed: diff < 0 };
            });
    }, [type, month]);

    const next = deadlines.find((d) => !d.passed);

    return (
        <div className="rounded-3xl border border-primary/15 bg-dark text-primary overflow-hidden">
            {/* Pasek tytułowy */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-primary/10 bg-primary/[0.03]">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-sans font-bold text-lg tracking-tight">Deadline Agent</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 bg-accent/10 rounded-full px-3 py-1">
                    Interactive demo · real date logic
                </span>
            </div>

            <div className="p-6">
                {/* Selektory */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">Taxpayer profile</div>
                        <div className="flex flex-wrap gap-2">
                            {taxpayerTypes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setType(t.id)}
                                    className={`px-3.5 py-2 rounded-full font-mono text-[11px] transition-colors border ${
                                        t.id === type
                                            ? 'bg-accent/20 border-accent text-primary'
                                            : 'border-primary/20 text-primary/60 hover:border-primary/50 hover:text-primary'
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">Month</div>
                        <div className="flex flex-wrap gap-2">
                            {months.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setMonth(m.id)}
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
                </div>

                {/* Lista deadlinów */}
                <div className="rounded-xl border border-primary/15 overflow-hidden divide-y divide-primary/10">
                    {deadlines.map((d, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-4 px-4 py-3 ${
                                d === next ? 'bg-accent/10 border-l-2 border-accent' : d.passed ? 'opacity-40' : ''
                            }`}
                        >
                            <div className="font-mono text-xs w-24 shrink-0">{fmt(d.date)}</div>
                            <span className={`shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] border rounded-full px-2 py-0.5 ${tagColors[d.tag]}`}>
                                {d.tag}
                            </span>
                            <div className="font-sans text-sm flex-1 min-w-0">
                                {d.name}
                                {d.shifted && <span className="font-mono text-[9px] text-accent ml-2">↪ moved from weekend</span>}
                            </div>
                            <div className="font-mono text-[10px] shrink-0 text-right">
                                {d.passed ? (
                                    <span className="opacity-50">passed</span>
                                ) : d === next ? (
                                    <span className="text-accent font-bold">in {d.daysLeft} days · NEXT</span>
                                ) : (
                                    <span className="opacity-60">in {d.daysLeft} days</span>
                                )}
                            </div>
                        </div>
                    ))}
                    {deadlines.length === 0 && (
                        <div className="px-4 py-8 text-center font-mono text-xs opacity-40">No deadlines for this profile this month.</div>
                    )}
                </div>

                <p className="mt-5 font-mono text-[10px] leading-relaxed opacity-40">
                    Dates computed live in your browser — including the real weekend-shift rule (Sat/Sun → next business day),
                    relative to {demoToday}. Production version: FastAPI + full Polish tax calendar (KSeF / JPK / ZUS / CIT / PIT)
                    with per-client profiles and email reminders.
                </p>
            </div>
        </div>
    );
}
