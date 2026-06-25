// Contact — EN, personal-brand. Reuse pipeline EmailJS + Sheets webhook z Footer.jsx
// (te same endpointy, ta sama hybryda Promise.allSettled + localStorage backup + mailto fallback).
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const SHEETS_WEBHOOK_FALLBACK = 'https://script.google.com/macros/s/AKfycbxAN6FfpCW0TJ_8KdJQEnWbx5J6I2RlPYEZDuiTOrqvMqmvs8RdFAEJzZGNsESR2poP2Q/exec';

export default function ContactPersonal() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (status === 'error' || status === 'sent') setStatus('idle');
    };

    const sendViaEmailJS = (t) => {
        const hasConfig = Boolean(
            import.meta.env.VITE_EMAILJS_SERVICE_ID &&
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        if (!hasConfig) return Promise.reject(new Error('emailjs_not_configured'));
        return emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            { from_name: t.name, from_email: t.email, message: t.message },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
    };

    const sendViaSheets = (t) => {
        const url = import.meta.env.VITE_LEADS_WEBHOOK_URL || SHEETS_WEBHOOK_FALLBACK;
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                name: t.name,
                email: t.email,
                message: t.message,
                source: typeof window !== 'undefined' ? window.location.href : '',
                user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                referrer: typeof document !== 'undefined' ? document.referrer : '',
            }),
        }).then((r) => {
            if (!r.ok) throw new Error('sheets_http_' + r.status);
            return r.json();
        }).then((p) => {
            if (p && p.status !== 'ok') throw new Error('sheets_' + (p.error || 'unknown'));
            return p;
        });
    };

    const handleSubmit = async (e) => {
        // Najpierw natywna walidacja HTML5 (type=email wymusza poprawny format, required pilnuje pól) —
        // jeśli formularz niepoprawny, przeglądarka pokaże komunikat i nie wyślemy.
        const form = e.currentTarget;
        if (form && typeof form.checkValidity === 'function' && !form.checkValidity()) {
            form.reportValidity?.();
            return;
        }
        e.preventDefault();
        const t = { name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() };
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email);
        if (!t.name || !emailOk || !t.message || !consent) return;

        try {
            const lead = { ...t, timestamp: new Date().toISOString() };
            const existing = JSON.parse(localStorage.getItem('mjoldak_lead_backup') || '[]');
            localStorage.setItem('mjoldak_lead_backup', JSON.stringify([...existing.slice(-9), lead]));
        } catch (_) { /* private browsing — pomiń backup */ }

        setStatus('sending');
        const results = await Promise.allSettled([sendViaEmailJS(t), sendViaSheets(t)]);
        const ok = results.some((r) => r.status === 'fulfilled');

        if (ok) {
            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            setStatus('error');
        }
    };

    const mailtoFallback = () => {
        const subject = `Contact from mjoldak.pl — ${formData.name || 'message'}`;
        const body = `${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`;
        return `mailto:biuro@mjoldak.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section id="contact" data-nav-theme="dark" className="relative overflow-hidden bg-dark text-primary px-8 md:px-16 pt-24 md:pt-32 pb-12">
            <div className="pointer-events-none absolute -top-[10%] -right-[8%] w-[55%] h-[75%] rounded-full blur-[130px] opacity-[0.38]" style={{ background: 'radial-gradient(circle, #4F8EBA 0%, transparent 70%)' }} aria-hidden="true"></div>
            <div className="relative z-10 max-w-5xl mx-auto">
                <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-60 mb-6">
                    <span className="text-accent">—</span> 07 · Contact
                </p>

                <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-[-0.03em] uppercase leading-[0.95] mb-8">
                    Let's talk<span className="text-accent">.</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <p className="font-sans text-base leading-relaxed opacity-80 mb-8 max-w-md">
                            Hiring for an AI / automation role, or just want to see these systems up close?
                            Drop me a message — I reply within 24h.
                        </p>
                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                <a href="mailto:biuro@mjoldak.pl" className="hover:text-accent transition-colors">biuro@mjoldak.pl</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <a href="https://linkedin.com/in/mjoldak" target="_blank" rel="noopener" className="hover:text-accent transition-colors">linkedin.com/in/mjoldak</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                <span className="text-primary/60">Wrocław, Poland · remote-ready (PL/EU)</span>
                            </li>
                        </ul>
                        <div className="mt-8 p-4 rounded-xl border border-accent/30 bg-accent/5">
                            <p className="font-mono text-xs leading-relaxed text-primary/85">
                                <span className="text-accent font-bold">CV on request</span> — send me a message and I'll reply with a current CV the same day.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="cp-name" className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-2 block">Name</label>
                            <input
                                type="text" id="cp-name" name="name" required value={formData.name} onChange={handleChange}
                                className="w-full bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-4 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 transition-all"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="cp-email" className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-2 block">Email</label>
                            <input
                                type="email" id="cp-email" name="email" required value={formData.email} onChange={handleChange}
                                className="w-full bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-4 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 transition-all"
                                placeholder="jane@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="cp-message" className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-2 block">Message</label>
                            <textarea
                                id="cp-message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                                className="w-full bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-4 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 transition-all resize-none"
                                placeholder="Hi Marcin, ..."
                            />
                        </div>
                        <label className="flex items-start gap-3 font-sans text-xs leading-relaxed text-primary/70 cursor-pointer">
                            <input
                                type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required
                                className="mt-0.5 w-4 h-4 shrink-0 accent-[#4F8EBA] cursor-pointer"
                            />
                            <span>
                                I consent to the processing of my personal data to handle this enquiry (GDPR Art. 6(1)(a)).{' '}
                                <a href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-accent">Privacy policy (PL)</a>
                            </span>
                        </label>
                        <button
                            type="submit"
                            disabled={status === 'sending' || !consent}
                            className="px-8 py-4 rounded-[2rem] bg-accent text-primary font-sans font-bold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 self-start"
                        >
                            {status === 'idle' && 'Send message'}
                            {status === 'sending' && 'Sending…'}
                            {status === 'sent' && 'Sent — thank you!'}
                            {status === 'error' && 'Try again'}
                        </button>

                        {status === 'error' && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                <p className="font-mono text-xs text-primary/90 mb-3 leading-relaxed">
                                    Automatic delivery failed. Send directly — your message above will be pre-filled:
                                </p>
                                <a href={mailtoFallback()} className="inline-block px-5 py-2.5 rounded-full bg-accent text-primary font-bold text-xs uppercase tracking-widest no-underline">
                                    Email biuro@mjoldak.pl
                                </a>
                            </div>
                        )}
                    </form>
                </div>

                {/* Stopka */}
                <div className="mt-20 pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-primary/40">
                    <span>© {new Date().getFullYear()} Marcin J. Ołdak · MJ.OLDAK</span>
                    <div className="flex gap-6">
                        <a href="/dla-biur" className="hover:text-accent transition-colors">Dla biur rachunkowych (PL) →</a>
                        <a href="/polityka-prywatnosci" className="hover:text-accent transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
