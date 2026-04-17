import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function NewsletterSignup({ variant = 'inline' }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = email.trim();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;

        setStatus('sending');
        emailjs.send(
            import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                from_name: 'Newsletter signup',
                from_email: trimmed,
                message: `Nowy zapis na newsletter: ${trimmed}`,
                source: typeof window !== 'undefined' ? window.location.pathname : '/',
            },
            import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        ).then(() => {
            setStatus('sent');
            setEmail('');
            setTimeout(() => setStatus('idle'), 6000);
        }).catch(() => {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 6000);
        });
    };

    return (
        <div className="rounded-[2rem] bg-dark text-primary p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary/50">Newsletter · 1× w miesiącu</span>
                </div>
                <h3 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">
                    Dostawaj <span className="font-serif italic font-normal text-accent">esencję.</span>
                </h3>
                <p className="font-mono text-sm text-primary/70 mb-6 max-w-md leading-relaxed">
                    Najlepsze artykuły z miesiąca + 1 case study z biur rachunkowych. Bez spamu, bez sprzedaży.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                    <input
                        type="email"
                        required
                        aria-required="true"
                        aria-label="Adres email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="twoj@firma.pl"
                        className="flex-1 bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-3 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 focus:bg-primary/[0.18] transition-all duration-300"
                    />
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="px-6 py-3 rounded-[2rem] bg-accent text-primary font-sans font-bold text-sm uppercase tracking-widest hover:scale-[1.03] transition disabled:opacity-60 disabled:hover:scale-100"
                    >
                        <span aria-live="polite">
                            {status === 'idle' && 'Zapisz mnie'}
                            {status === 'sending' && '...'}
                            {status === 'sent' && '✓ Zapisano'}
                            {status === 'error' && 'Spróbuj ponownie'}
                        </span>
                    </button>
                </form>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-primary/40">
                    Twój email idzie tylko do mnie. Wypisanie 1 klikiem.
                </p>
            </div>
        </div>
    );
}
