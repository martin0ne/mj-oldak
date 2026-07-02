import { useEffect, useRef, useState } from 'react';
import { scenarios } from '../../data/demos/agent.js';
import { track } from '../../lib/track.js';

// Agent Mission Control — flagowe demo "wow": oglądasz autonomicznego agenta przy pracy.
// Plan → kroki pipeline'u na żywo → terminal ReAct (THOUGHT/ACTION/OBSERVATION) →
// kontrolowany fail z odzyskiem → bramka human-in-the-loop. Client-side, zero API.

const LINE_MS = 650;      // tempo pojawiania się linii logu
const STEP_PAUSE = 350;   // oddech między krokami

const prefixStyle = {
    THOUGHT: 'text-violet-400',
    ACTION: 'text-accent',
    OBSERVATION: 'text-green-400',
    ERROR: 'text-red-400',
};

export default function AgentDemo() {
    const [scenarioId, setScenarioId] = useState(scenarios[0].id);
    const [phase, setPhase] = useState('idle'); // idle | running | approval | done
    const [stepStates, setStepStates] = useState([]); // 'pending' | 'running' | 'failed' | 'done'
    const [lines, setLines] = useState([]); // {prefix, text, step}
    const timersRef = useRef([]);
    const termRef = useRef(null);

    const scenario = scenarios.find((s) => s.id === scenarioId);

    const clearTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };
    useEffect(() => () => clearTimers(), []);

    // Autoscroll terminala
    useEffect(() => {
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
    }, [lines, phase]);

    const pickScenario = (id) => {
        clearTimers();
        setScenarioId(id);
        setPhase('idle');
        setStepStates([]);
        setLines([]);
    };

    const run = () => {
        clearTimers();
        setPhase('running');
        setLines([{ prefix: 'GOAL', text: scenario.goal }]);
        setStepStates(scenario.steps.map(() => 'pending'));
        track('demo_run', { demo: 'agent', scenario: scenarioId });

        let t = 600;
        scenario.steps.forEach((step, si) => {
            // start kroku
            timersRef.current.push(setTimeout(() => {
                setStepStates((st) => st.map((s, i) => (i === si ? 'running' : s)));
            }, t));

            step.log.forEach(([prefix, text]) => {
                timersRef.current.push(setTimeout(() => {
                    if (prefix === 'ERROR') {
                        setStepStates((st) => st.map((s, i) => (i === si ? 'failed' : s)));
                    }
                    // odzysk po ERROR — kolejna ACTION przywraca 'running'
                    if (prefix === 'ACTION') {
                        setStepStates((st) => st.map((s, i) => (i === si && st[i] === 'failed' ? 'running' : s)));
                    }
                    setLines((ls) => [...ls, { prefix, text, step: step.node }]);
                }, t));
                t += LINE_MS;
            });

            // koniec kroku
            timersRef.current.push(setTimeout(() => {
                setStepStates((st) => st.map((s, i) => (i === si ? 'done' : s)));
            }, t));
            t += STEP_PAUSE;
        });

        timersRef.current.push(setTimeout(() => {
            setLines((ls) => [...ls, { prefix: 'AGENT', text: 'All steps complete. Nothing was sent or finalized — awaiting human approval.' }]);
            setPhase('approval');
        }, t + 200));
    };

    const approve = () => {
        setLines((ls) => [...ls, { prefix: 'HUMAN', text: 'Approved ✓ — committed. Human-in-the-loop by design (GDPR Art. 22).' }]);
        setPhase('done');
    };

    const statusIcon = (s) =>
        s === 'done' ? <span className="text-green-400">✓</span>
        : s === 'running' ? <span className="inline-block w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        : s === 'failed' ? <span className="text-red-400">✗</span>
        : <span className="opacity-30">○</span>;

    return (
        <div className="rounded-3xl border border-accent/40 bg-dark text-primary overflow-hidden shadow-[0_0_60px_-15px_rgba(79,142,186,0.45)]">
            {/* Pasek tytułowy */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-primary/10 bg-accent/[0.06]">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-sans font-bold text-lg tracking-tight">Agent Mission Control</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 bg-accent/10 rounded-full px-3 py-1">
                    Scripted simulation · watch an AI agent work
                </span>
            </div>

            <div className="p-6">
                {/* Scenariusz + RUN */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {scenarios.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => pickScenario(s.id)}
                            className={`px-4 py-2 rounded-full font-mono text-[11px] transition-colors border ${
                                s.id === scenarioId
                                    ? 'bg-accent/20 border-accent text-primary'
                                    : 'border-primary/20 text-primary/60 hover:border-primary/50 hover:text-primary'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                    <button
                        onClick={run}
                        disabled={phase === 'running'}
                        className="ml-auto px-7 py-2.5 rounded-full bg-accent text-primary font-sans font-bold text-sm hover:scale-[1.03] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {phase === 'idle' ? '▶ Run agent' : phase === 'running' ? 'Agent working…' : '▶ Run again'}
                    </button>
                </div>

                <div className="grid md:grid-cols-[1fr_1.4fr] gap-6">
                    {/* Pipeline kroków */}
                    <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-3">Pipeline</div>
                        <div className="rounded-xl border border-primary/15 divide-y divide-primary/10 overflow-hidden">
                            {scenario.steps.map((step, i) => (
                                <div
                                    key={step.node}
                                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                                        stepStates[i] === 'running' ? 'bg-accent/10' : stepStates[i] === 'failed' ? 'bg-red-400/10' : ''
                                    }`}
                                >
                                    <span className="w-4 shrink-0 text-center font-mono text-sm">{statusIcon(stepStates[i] || 'pending')}</span>
                                    <div className="min-w-0">
                                        <div className="font-sans font-semibold text-sm leading-tight">{step.node}</div>
                                        <div className="font-mono text-[9px] uppercase tracking-[0.15em] opacity-45 mt-0.5">{step.tool}</div>
                                    </div>
                                </div>
                            ))}
                            {/* Bramka human approval jako ostatni "krok" */}
                            <div className={`flex items-center gap-3 px-4 py-3 transition-colors ${phase === 'approval' ? 'bg-sunset/15' : ''}`}>
                                <span className="w-4 shrink-0 text-center font-mono text-sm">
                                    {phase === 'done' ? <span className="text-green-400">✓</span> : phase === 'approval' ? <span className="text-sunset animate-pulse">⏸</span> : <span className="opacity-30">○</span>}
                                </span>
                                <div className="min-w-0">
                                    <div className="font-sans font-semibold text-sm leading-tight">Human approval</div>
                                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] opacity-45 mt-0.5">you · the gate that ships</div>
                                </div>
                                {phase === 'approval' && (
                                    <button
                                        onClick={approve}
                                        className="ml-auto shrink-0 px-4 py-1.5 rounded-full bg-sunset text-dark font-sans font-bold text-xs hover:scale-[1.05] transition-transform animate-pulse"
                                    >
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>

                        {phase === 'done' && (
                            <div className="mt-4 p-4 rounded-xl border border-green-400/30 bg-green-400/5 font-mono text-[11px] leading-relaxed text-green-400/90">
                                ✓ Done. The agent planned, executed, recovered from a failure — and a human made the final call.
                            </div>
                        )}
                    </div>

                    {/* Terminal */}
                    <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-3">Agent log — scripted run</div>
                        <div
                            ref={termRef}
                            className="rounded-xl border border-primary/15 bg-black/40 p-4 h-[300px] md:h-[340px] overflow-y-auto font-mono text-[11px] leading-relaxed"
                        >
                            {lines.length === 0 && (
                                <div className="opacity-40">
                                    $ Pick a scenario and hit „Run agent" — you'll see the agent plan,
                                    call tools, hit a real-world failure and recover from it. Right here in your browser.
                                </div>
                            )}
                            {lines.map((l, i) => (
                                <div key={i} className="mb-1.5 break-words">
                                    <span className={`font-bold ${prefixStyle[l.prefix] || 'text-sunset'}`}>[{l.prefix}]</span>{' '}
                                    <span className="opacity-85">{l.text}</span>
                                </div>
                            ))}
                            {phase === 'running' && <span className="inline-block w-2 h-4 bg-accent/80 animate-pulse align-middle" />}
                        </div>
                    </div>
                </div>

                <p className="mt-5 font-mono text-[10px] leading-relaxed opacity-40">
                    Scripted simulation mirroring my real pipeline architecture (n8n Webhook → LLM extraction → validation →
                    Supabase EU → human approval) — including how agents should fail and recover. No external calls; runs entirely in your browser.
                </p>
            </div>
        </div>
    );
}
