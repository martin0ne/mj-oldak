import { useEffect, useRef, useState } from 'react';
import { emails, categories } from '../../data/demos/email.js';
import { track } from '../../lib/track.js';

// Email Assistant — interaktywne demo client-side (sample data, zero backendu).
// Wzorzec jak OcrDemo: dark glass card · fazy · sequential reveal · badge sample-data.

const badgeClasses = {
    accent: 'bg-accent/15 text-accent border-accent/50',
    sunset: 'bg-sunset/15 text-sunset border-sunset/50',
    green: 'bg-green-400/15 text-green-400 border-green-400/50',
    violet: 'bg-violet-400/15 text-violet-400 border-violet-400/50',
    gray: 'bg-gray-400/15 text-gray-400 border-gray-400/50',
};

export default function EmailDemo() {
    const [selectedId, setSelectedId] = useState(null);
    const [phase, setPhase] = useState('idle'); // idle | classifying | done
    const [editing, setEditing] = useState(false); // human edytuje szkic
    const [draftText, setDraftText] = useState(''); // edytowalna treść szkicu
    const [sent, setSent] = useState(false); // SYMULACJA wysyłki (nic realnie nie wychodzi)
    const timersRef = useRef([]);

    const mail = emails.find((m) => m.id === selectedId);
    const cat = mail ? categories[mail.category] : null;

    const clearTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    useEffect(() => () => clearTimers(), []);

    const openMail = (id) => {
        clearTimers();
        setSelectedId(id);
        setPhase('classifying');
        setEditing(false);
        setSent(false);
        track('demo_run', { demo: 'email', item: id });
        const next = emails.find((m) => m.id === id);
        setDraftText(next && next.draft ? next.draft : '');
        timersRef.current.push(setTimeout(() => setPhase('done'), 900));
    };

    return (
        <div className="rounded-3xl border border-primary/15 bg-dark text-primary overflow-hidden">
            <style>{`
                @keyframes emailRowIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Pasek tytułowy */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-primary/10 bg-primary/[0.03]">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-sans font-bold text-lg tracking-tight">Email Assistant</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 bg-accent/10 rounded-full px-3 py-1">
                    Interactive demo · sample data
                </span>
            </div>

            <div className="p-6">
                <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
                    {/* Inbox */}
                    <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-3">Inbox — click an email</div>
                        <div className="rounded-xl border border-primary/15 overflow-hidden divide-y divide-primary/10">
                            {emails.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => openMail(m.id)}
                                    className={`w-full text-left px-4 py-3 border-l-2 transition-colors ${
                                        m.id === selectedId
                                            ? 'bg-accent/20 border-l-accent'
                                            : 'border-l-transparent hover:bg-accent/[0.08] hover:border-l-accent/50'
                                    }`}
                                >
                                    <div className="flex items-baseline justify-between gap-2">
                                        <span className="font-sans font-semibold text-[13px] truncate">{m.sender}</span>
                                        {m.id === selectedId && phase === 'done' && cat && (
                                            <span className={`shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] border rounded-full px-2 py-0.5 ${badgeClasses[cat.color]}`}>
                                                {cat.label}
                                            </span>
                                        )}
                                    </div>
                                    <div className="font-mono text-[11px] opacity-80 truncate mt-0.5">{m.subject}</div>
                                    <div className="font-mono text-[10px] opacity-40 truncate mt-0.5">{m.snippet}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Klasyfikacja + szkic */}
                    <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-3">Classification &amp; reply draft</div>

                        {!mail && (
                            <div className="rounded-xl border border-dashed border-primary/20 min-h-[280px] flex items-center justify-center font-mono text-xs opacity-40 text-center px-6">
                                Open any email — the assistant classifies it and drafts a reply, right in your browser.
                            </div>
                        )}

                        {mail && phase === 'classifying' && (
                            <div className="rounded-xl border border-primary/15 bg-primary/[0.04] min-h-[280px] flex flex-col items-center justify-center gap-3">
                                <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                                <span className="font-mono text-xs opacity-60">Classifying…</span>
                            </div>
                        )}

                        {mail && phase === 'done' && (
                            <div className="space-y-3">
                                <div className="rounded-xl border border-primary/15 bg-primary/[0.04] p-4" style={{ animation: 'emailRowIn 0.3s ease both' }}>
                                    <div className="flex items-center justify-between gap-3 flex-wrap">
                                        <span className={`font-mono text-[10px] uppercase tracking-[0.15em] border rounded-full px-3 py-1 ${badgeClasses[cat.color]}`}>
                                            {cat.label}
                                        </span>
                                        <span className="font-mono text-[9px] opacity-40">confidence {mail.confidence}</span>
                                    </div>
                                    <div className="font-mono text-[11px] opacity-70 whitespace-pre-line break-words mt-3 max-h-28 overflow-y-auto">{mail.body}</div>
                                </div>

                                {mail.draft ? (
                                    <div className="rounded-xl border-l-2 border-accent border border-primary/15 bg-primary/[0.04] p-4" style={{ animation: 'emailRowIn 0.3s ease 0.15s both' }}>
                                        <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent font-bold mb-2">Suggested reply — human approves before sending</div>

                                        {editing ? (
                                            <textarea
                                                value={draftText}
                                                onChange={(e) => setDraftText(e.target.value)}
                                                rows={6}
                                                className="w-full rounded-lg bg-black/30 border border-accent/40 focus:border-accent focus:outline-none p-3 font-mono text-[11px] leading-relaxed text-primary/90 resize-y"
                                            />
                                        ) : (
                                            <div className="font-mono text-[11px] leading-relaxed opacity-85 whitespace-pre-line break-words">{draftText}</div>
                                        )}

                                        {/* Human-in-the-loop: użytkownik decyduje, edytuje, „wysyła" */}
                                        <div className="flex items-center gap-2 mt-3">
                                            {sent ? (
                                                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-green-400 border border-green-400/50 bg-green-400/10 rounded-full px-3 py-1.5">
                                                    Sent ✓
                                                </span>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => setEditing((v) => !v)}
                                                        className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary/80 border border-primary/30 hover:border-primary/60 hover:text-primary rounded-full px-3 py-1.5 transition-colors"
                                                    >
                                                        {editing ? 'Done editing' : 'Edit'}
                                                    </button>
                                                    <button
                                                        onClick={() => { setEditing(false); setSent(true); }}
                                                        className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary border border-accent/50 bg-accent/15 hover:bg-accent/25 rounded-full px-3 py-1.5 transition-colors"
                                                    >
                                                        Send
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        <div className="font-mono text-[9px] opacity-30 mt-2">Simulated — nothing is actually sent from this demo.</div>
                                    </div>
                                ) : (
                                    <div className="rounded-xl border-l-2 border-gray-400 border border-primary/15 bg-primary/[0.04] p-4" style={{ animation: 'emailRowIn 0.3s ease 0.15s both' }}>
                                        <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-2">No reply needed</div>
                                        <div className="font-mono text-[11px] opacity-70">Suggested action: archive &amp; block sender.</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <p className="mt-5 font-mono text-[10px] leading-relaxed opacity-40">
                    The product itself: IMAP/SMTP + Claude — classification into 4 categories + reply drafts written in Polish
                    for the client, human-in-the-loop by design. This demo runs in your browser on sample emails (in English for readability).
                </p>
            </div>
        </div>
    );
}
