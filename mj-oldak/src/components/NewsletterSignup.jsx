import { useState } from 'react';

const COPY = {
    pl: {
        kicker: 'PDF · 40 haseł',
        titleA: 'Czterdzieści',
        titleB: 'haseł.',
        lead: 'Na stronie jest dwanaście. Wyślij adres, dostaniesz czterdzieści w PDF-ie.',
        sent: '✓ Sprawdź skrzynkę. Wysłałem link potwierdzający — kliknij go, żeby dostać PDF. Link ważny 24h.',
        placeholder: 'np. anna@firma.pl',
        btnIdle: 'Wyślij PDF',
        btnSending: 'Wysyłam…',
        btnDuplicate: 'Adres już na liście',
        btnError: 'Spróbuj ponownie',
        consentA: 'Administratorem danych jest Marcin Ołdak. Adres służy tylko do wysyłki słownika i rzadkich maili o AI. Wypisanie to jedno kliknięcie. Akceptuję',
        consentLink: 'politykę prywatności',
        consentHref: '/polityka-prywatnosci',
        consentB: '.',
        ariaEmail: 'Adres email',
    },
    en: {
        kicker: 'PDF · 40 terms',
        titleA: 'Forty',
        titleB: 'terms.',
        lead: 'Twelve are on the page. Leave your address, get all forty in a PDF.',
        sent: '✓ Check your inbox. I sent a confirmation link — click it to get the PDF. The link is valid for 24 hours.',
        placeholder: 'e.g. anna@company.com',
        btnIdle: 'Send PDF',
        btnSending: 'Sending…',
        btnDuplicate: 'Already on the list',
        btnError: 'Try again',
        consentA: 'The data controller is Marcin Ołdak. Your address is used only to send the glossary and occasional AI updates. Unsubscribe in one click. I accept the',
        consentLink: 'privacy policy',
        consentHref: '/en/privacy-policy',
        consentB: '.',
        ariaEmail: 'Email address',
    },
};

export default function NewsletterSignup({ variant = 'inline', lang = 'pl' }) {
    const t = COPY[lang] || COPY.pl;
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error | duplicate
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = email.trim().toLowerCase();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
        if (!consent) return;

        setStatus('sending');
        setErrorMsg('');

        try {
            const resp = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: trimmed,
                    consent: true,
                    source: typeof window !== 'undefined' ? window.location.pathname : '/',
                }),
            });

            if (resp.ok) {
                setStatus('sent');
                setEmail('');
                setConsent(false);
                setTimeout(() => setStatus('idle'), 12000);
                return;
            }

            if (resp.status === 409) {
                setStatus('duplicate');
                setTimeout(() => setStatus('idle'), 8000);
                return;
            }

            const data = await resp.json().catch(() => ({}));
            setErrorMsg(data.error || t.btnError);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 8000);
        } catch (err) {
            setErrorMsg(lang === 'en' ? 'Connection error' : 'Błąd połączenia');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 8000);
        }
    };

    const canSubmit = consent && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && status !== 'sending';

    return (
        <div className="rounded-[2rem] bg-dark text-primary p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary/50">{t.kicker}</span>
                </div>
                <h3 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">
                    {t.titleA} <span className="font-serif italic font-normal text-accent">{t.titleB}</span>
                </h3>
                <p className="font-mono text-sm text-primary/70 mb-6 max-w-md leading-relaxed">{t.lead}</p>
                {status === 'sent' ? (
                    <div className="bg-accent/15 border border-accent/40 rounded-xl px-5 py-4 max-w-lg">
                        <p className="font-mono text-sm text-primary leading-relaxed">{t.sent}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-lg">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                required
                                aria-required="true"
                                aria-label={t.ariaEmail}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.placeholder}
                                className="flex-1 bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-3 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 focus:bg-primary/[0.18] transition-all duration-300"
                            />
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="px-6 py-3 rounded-[2rem] bg-accent text-primary font-sans font-bold text-sm uppercase tracking-widest hover:scale-[1.03] transition disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                <span aria-live="polite">
                                    {status === 'idle' && t.btnIdle}
                                    {status === 'sending' && t.btnSending}
                                    {status === 'duplicate' && t.btnDuplicate}
                                    {status === 'error' && (errorMsg || t.btnError)}
                                </span>
                            </button>
                        </div>
                        <label className="mt-4 flex items-start gap-3 cursor-pointer select-none max-w-lg">
                            <input
                                type="checkbox"
                                required
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-[3px] w-4 h-4 rounded border-primary/30 bg-primary/10 accent-accent flex-shrink-0"
                            />
                            <span className="font-mono text-[11px] leading-snug text-primary/70">
                                {t.consentA}{' '}
                                <a href={t.consentHref} className="underline text-primary hover:text-accent transition" target="_blank" rel="noopener noreferrer">
                                    {t.consentLink}
                                </a>
                                {t.consentB}
                            </span>
                        </label>
                    </form>
                )}
            </div>
        </div>
    );
}
