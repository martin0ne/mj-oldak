import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const footerRef = useRef(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = { name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() };
        if (!trimmed.name || !trimmed.email || !trimmed.message) return;

        setStatus('sending');
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            { from_name: trimmed.name, from_email: trimmed.email, message: trimmed.message },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        ).then(() => {
            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000);
        }).catch(() => {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        });
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                '.footer-reveal',
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 90%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    immediateRender: false,
                }
            );
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} id="kontakt" data-nav-theme="dark" className="bg-dark text-primary rounded-t-[4rem] px-6 md:px-12 pt-24 pb-12 relative z-10">
            {/* Contact form section */}
            <div className="max-w-7xl mx-auto mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="footer-reveal flex items-center gap-3 mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="font-mono text-xs text-primary/40 uppercase tracking-widest">Formularz kontaktowy</span>
                        </div>
                        <h2 className="footer-reveal font-serif italic text-4xl md:text-6xl leading-none mb-6">
                            Zacznijmy <span className="text-accent">budować</span>.
                        </h2>
                        <p className="footer-reveal font-mono text-sm text-primary/60 max-w-md mb-8 leading-relaxed">
                            Opisz swój projekt — odezwiemy się w ciągu 24h z propozycją współpracy.
                        </p>
                        <ul className="footer-reveal space-y-4 font-mono text-sm">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <a href="mailto:contact@mj-oldak.com" className="hover:text-accent transition-colors">contact@mj-oldak.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                <span className="text-primary/60">Warszawa, Polska</span>
                            </li>
                        </ul>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="footer-reveal">
                            <label htmlFor="name" className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-2 block">Imię</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                aria-required="true"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-4 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 focus:bg-primary/[0.18] transition-all duration-300"
                                placeholder="Jan Kowalski"
                            />
                        </div>
                        <div className="footer-reveal">
                            <label htmlFor="email" className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-2 block">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                aria-required="true"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-4 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 focus:bg-primary/[0.18] transition-all duration-300"
                                placeholder="jan@firma.pl"
                            />
                        </div>
                        <div className="footer-reveal">
                            <label htmlFor="message" className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-2 block">Wiadomość</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                aria-required="true"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-primary/[0.12] border border-primary/25 rounded-xl px-5 py-4 font-mono text-sm text-primary placeholder:text-primary/45 outline-none focus:border-accent/60 focus:bg-primary/[0.18] transition-all duration-300 resize-none"
                                placeholder="Opowiedz nam o swoim projekcie..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="footer-reveal relative overflow-hidden group px-8 py-4 rounded-[2rem] bg-accent text-primary font-sans font-bold text-sm transition-all duration-300 hover:scale-[1.03] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] disabled:opacity-60 disabled:hover:scale-100 self-start"
                        >
                            <span className="relative z-10" aria-live="polite">
                                {status === 'idle' && 'Wyślij wiadomość'}
                                {status === 'sending' && 'Wysyłanie...'}
                                {status === 'sent' && 'Wysłano'}
                                {status === 'error' && 'Spróbuj ponownie'}
                            </span>
                            <span className="absolute inset-0 bg-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer links */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pt-16 border-t border-primary/10">
                <div>
                    <h2 className="font-sans font-bold text-2xl uppercase tracking-tighter mb-4">MJ.OLDAK</h2>
                    <p className="font-mono text-sm text-primary/50 max-w-sm leading-relaxed">
                        AI systems &amp; automation dla polskich firm. 4 gotowe produkty + custom solutions. RODO compliant, własność kodu.
                    </p>
                </div>

                <div>
                    <h4 className="font-mono text-xs uppercase text-primary/40 mb-6">Nawigacja</h4>
                    <ul className="space-y-4 font-sans text-sm font-medium">
                        <li><a href="/#uslugi" className="hover:text-accent transition-colors">Usługi</a></li>
                        <li><a href="/#produkty" className="hover:text-accent transition-colors">Produkty</a></li>
                        <li><a href="/artykuly/" className="hover:text-accent transition-colors">Artykuły</a></li>
                        <li><a href="/#proces" className="hover:text-accent transition-colors">Protokół</a></li>
                        <li><a href="/#kontakt" className="hover:text-accent transition-colors">Kontakt</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-mono text-xs uppercase text-primary/40 mb-6">Kontakt</h4>
                    <ul className="space-y-4 font-mono text-sm">
                        <li><a href="mailto:contact@mj-oldak.com" className="hover:text-accent transition-colors">contact@mj-oldak.com</a></li>
                        <li className="text-primary/50">Warszawa, Polska</li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-primary/10">
                <div className="flex items-center gap-3 mb-4 md:mb-0 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                    <span className="font-mono text-xs uppercase tracking-widest text-primary/80">System Operational</span>
                </div>
                <div className="font-mono text-xs text-primary/40">
                    &copy; {new Date().getFullYear()} MJ.OLDAK. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
