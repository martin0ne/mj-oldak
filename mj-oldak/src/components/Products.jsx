import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Mail, Calendar, BarChart3, ChevronDown, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
    {
        id: 'ocr',
        n: '01',
        name: 'INVOICE',
        Icon: FileText,
        tagline: 'OCR faktur kosztowych',
        status: 'READY',
        statusColor: '#22c55e',
        port: 8080,
        desc:
            'Wrzuć PDF lub zdjęcie faktury — system wyciągnie sprzedawcę, NIP, kwoty netto/VAT/brutto, datę wystawienia, termin płatności i pozycje. Wynik gotowy do eksportu do Comarch / InsERT / wapro.',
        bullets: [
            'PDF, JPG, PNG, HEIC — bez ograniczeń formatu',
            'Wykrywa polskie znaki w nazwach kontrahentów',
            'Eksport CSV / JSON / XML zgodny z systemami księgowymi',
            'Historia wszystkich uploadów + edycja wyników',
        ],
        screenshots: ['/products/ocr/1.jpg', '/products/ocr/2.jpg', '/products/ocr/3.jpg', '/products/ocr/4.jpg'],
        output: `{
  "sprzedawca": "Hurt-Budex sp. z o.o.",
  "nip": "5252345678",
  "data_wystawienia": "2026-04-12",
  "termin_platnosci": "2026-04-26",
  "numer_faktury": "FV/2026/04/00128",
  "netto": 3000.00,
  "vat": 690.00,
  "brutto": 3690.00,
  "pozycje": [
    { "nazwa": "Płyta OSB 12mm", "ilosc": 20, "jm": "szt", "netto": 150.00 }
  ]
}`,
        manual: '/manuals/01-ocr-invoice-reader.pdf',
    },
    {
        id: 'email',
        n: '02',
        name: 'EMAIL',
        Icon: Mail,
        tagline: 'Klasyfikacja maili + drafty odpowiedzi',
        status: 'READY',
        statusColor: '#22c55e',
        port: 8081,
        desc:
            'Wkleja maila → system klasyfikuje (PILNE / NORMALNE / SPAM) i pisze draft odpowiedzi w stylu Twojego biura. Konfiguracja przez `company_profile.json`: opis biura, kategorie, ton komunikacji.',
        bullets: [
            'Klasyfikacja w 3 kategoriach (konfigurowalne)',
            'Draft po polsku z poprawną odmianą',
            'Ton dopasowany do biura (formalny / ciepły)',
            'Edycja draftu przed wysyłką + batch processing',
        ],
        screenshots: ['/products/email/1.jpg', '/products/email/2.jpg', '/products/email/3.jpg', '/products/email/4.jpg'],
        output: `KATEGORIA: PILNE
PRIORYTET: 9/10
TEMAT: Re: Wezwanie do uzupełnienia VAT-7 za marzec 2026

DRAFT ODPOWIEDZI:
Szanowny Panie Kowalski,

Potwierdzam otrzymanie wezwania z US Katowice-Zachód
z 14.04.2026. Brakujące dane (kwoty z dwóch faktur)
prześlę najpóźniej do piątku 18.04.

Z poważaniem,
Biuro Rachunkowe Nowak`,
        manual: '/manuals/02-email-assistant.pdf',
    },
    {
        id: 'deadline',
        n: '03',
        name: 'DEADLINE',
        Icon: Calendar,
        tagline: 'Polski kalendarz podatkowy + przypomnienia',
        status: 'READY',
        statusColor: '#22c55e',
        port: 8082,
        desc:
            'Importujesz CSV z klientami (NIP, forma prawna, typy rozliczeń). System wie że Anna Nowak (JDG, VAT-7K) ma deadline 25 kwietnia i wysyła Ci/jej draft przypomnienia 7 dni wcześniej.',
        bullets: [
            'VAT-7, VAT-7K, CIT-8, PIT-36/37, ZUS, JPK_VAT — wszystko',
            'Tryby wysyłki: tekst / SMTP / Gmail OAuth',
            'Per-klient konfiguracja (mail / telefon / forma rozliczenia)',
            'Dashboard nadchodzących terminów na 14/30 dni',
        ],
        screenshots: ['/products/deadline/1.jpg', '/products/deadline/2.jpg', '/products/deadline/3.jpg', '/products/deadline/4.jpg'],
        output: `# PRZYPOMNIENIA — 14 dni do przodu

[2026-04-25 | T-7] Anna Nowak (JDG, VAT-7K)
  → SMTP wysłane 18.04 09:00. Status: dostarczono.

[2026-04-25 | T-7] Jan Kowalski sp. z o.o. (VAT-7, ZUS)
  → Draft gotowy. Czeka na akceptację.

[2026-04-30 | T-12] Marek Zięba JDG (PIT-36, ZUS-JDG)
  → Klient nieaktywny od 90 dni. Sprawdź status.`,
        manual: '/manuals/03-deadline-agent.pdf',
    },
    {
        id: 'reports',
        n: '04',
        name: 'REPORTS',
        Icon: BarChart3,
        tagline: 'Raporty miesięczne PDF dla klientów',
        status: 'READY',
        statusColor: '#22c55e',
        port: 8083,
        desc:
            'Wgrasz CSV z przychodami/kosztami → 2 minuty i masz PDF z polskimi znakami, podsumowaniem, wykresami i tabelą szczegółową. Branding biura, gotowe do wysłania klientowi.',
        bullets: [
            'PDF z polskimi znakami (DejaVu Sans embedded)',
            'Wykresy słupkowe (przychody vs koszty miesiąc po miesiącu)',
            'Tabela VAT-7 / matematyka się zgadza',
            'Integracja z OCR Invoice Reader (one-click flow)',
        ],
        screenshots: ['/products/reports/1.jpg', '/products/reports/2.jpg', '/products/reports/3.jpg', '/products/reports/4.jpg'],
        output: `RAPORT MIESIĘCZNY — Marzec 2026
Klient: Firma A sp. z o.o. (NIP 1234567890)

PRZYCHODY:    47 850,00 zł netto
KOSZTY:       28 920,00 zł netto
ZYSK:         18 930,00 zł

VAT NALEŻNY:  11 005,50 zł
VAT NALICZONY: 6 651,60 zł
DO ZAPŁATY:    4 353,90 zł

Plik: raport_03_2026_firma_a.pdf (412 KB)
Wygenerowano: 02.04.2026 09:14`,
        manual: '/manuals/04-reporting-agent.pdf',
    },
];

export default function Products() {
    const sectionRef = useRef(null);
    const [expandedId, setExpandedId] = useState(null);
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.product-card',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    immediateRender: false,
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

    return (
        <section
            ref={sectionRef}
            id="produkty"
            className="py-32 px-6 md:px-12 max-w-7xl mx-auto"
        >
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest">
                        [ 04 / PRODUKTY DEMO ]
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4">
                    Cztery moduły, <span className="font-serif italic font-normal text-accent">jeden system.</span>
                </h2>
                <p className="text-dark/70 font-mono text-sm max-w-xl leading-relaxed">
                    Każdy produkt działa solo. Razem tworzą kompletny back-office dla biura rachunkowego.
                    Kliknij kartę aby zobaczyć szczegóły, screenshoty i przykładowy output.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {PRODUCTS.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        expanded={expandedId === p.id}
                        onToggle={() => toggle(p.id)}
                        onLightbox={setLightbox}
                    />
                ))}
            </div>

            {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
        </section>
    );
}

function ProductCard({ product, expanded, onToggle, onLightbox }) {
    const { n, name, Icon, tagline, status, statusColor, port, desc, bullets, screenshots, output, manual } = product;
    const [tab, setTab] = useState('co-robi');
    const panelRef = useRef(null);

    return (
        <div
            className={`product-card group bg-dark/[0.05] border rounded-[2rem] transition-all duration-500 overflow-hidden ${
                expanded
                    ? 'border-accent/30 shadow-[0_8px_40px_rgba(230,59,46,0.15)]'
                    : 'border-dark/10 hover:border-accent/20 hover:shadow-[0_8px_40px_rgba(230,59,46,0.10)]'
            }`}
        >
            {/* Header (always visible) */}
            <button
                onClick={onToggle}
                className="w-full text-left p-8 cursor-pointer focus:outline-none"
                aria-expanded={expanded}
                aria-controls={`panel-${product.id}`}
            >
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-dark/40 tracking-widest">{n}</span>
                        <div className="w-10 h-10 rounded-xl bg-dark/[0.05] border border-dark/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-accent" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: statusColor, boxShadow: `0 0 8px ${statusColor}80` }}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-dark/50">
                            {status} · :{port}
                        </span>
                    </div>
                </div>

                <h3 className="font-sans font-bold text-3xl tracking-tight uppercase mb-2 text-dark">
                    MJ.OLDAK <span className="text-accent">{name}</span>
                </h3>
                <p className="font-mono text-sm text-dark/70 leading-relaxed">{tagline}</p>

                <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest">
                        {expanded ? 'Zwiń szczegóły' : 'Rozwiń szczegóły'}
                    </span>
                    <ChevronDown
                        className={`w-5 h-5 text-dark/50 transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            {/* Expand panel */}
            <div
                ref={panelRef}
                id={`panel-${product.id}`}
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ maxHeight: expanded ? '1600px' : '0px', opacity: expanded ? 1 : 0 }}
            >
                <div className="px-8 pb-8 pt-2 border-t border-dark/10">
                    {/* Tab switcher */}
                    <div className="flex gap-1 mb-6 bg-dark/[0.05] rounded-2xl p-1 w-fit">
                        {[
                            { id: 'co-robi', label: 'CO ROBI' },
                            { id: 'screenshoty', label: 'SCREENSHOTY' },
                            { id: 'output', label: 'OUTPUT' },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all ${
                                    tab === t.id
                                        ? 'bg-dark text-primary'
                                        : 'text-dark/60 hover:text-dark hover:bg-dark/[0.05]'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    {tab === 'co-robi' && (
                        <div>
                            <p className="font-mono text-sm text-dark/80 leading-relaxed mb-6">{desc}</p>
                            <ul className="space-y-2">
                                {bullets.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3 font-mono text-sm text-dark/70">
                                        <span className="text-accent mt-[2px] shrink-0">▸</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {tab === 'screenshoty' && (
                        <div className="grid grid-cols-2 gap-3">
                            {screenshots.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => onLightbox(src)}
                                    className="group/shot relative rounded-2xl overflow-hidden border border-dark/10 bg-dark/[0.05] aspect-[16/10] hover:border-accent/30 transition-all"
                                >
                                    <img
                                        src={src}
                                        alt={`${name} screenshot ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/shot:scale-[1.03]"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.querySelector('.placeholder').style.display = 'flex';
                                        }}
                                    />
                                    <div className="placeholder absolute inset-0 hidden flex-col items-center justify-center text-dark/30 font-mono text-xs uppercase tracking-widest gap-2">
                                        <Icon className="w-8 h-8" />
                                        <span>Screenshot #{i + 1}</span>
                                        <span className="text-dark/20 normal-case tracking-normal">soon</span>
                                    </div>
                                    <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-widest bg-dark/80 text-primary px-2 py-1 rounded-md opacity-0 group-hover/shot:opacity-100 transition-opacity">
                                        Powiększ
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    {tab === 'output' && (
                        <div className="bg-dark rounded-2xl p-5 relative overflow-hidden border border-dark/20">
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                style={{
                                    backgroundImage:
                                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,228,221,1) 2px, rgba(232,228,221,1) 4px)',
                                }}
                            />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary/40">
                                        Sample output
                                    </span>
                                </div>
                                <pre className="font-mono text-xs text-primary/90 leading-relaxed whitespace-pre-wrap">
                                    {output}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Footer CTAs */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-dark/10">
                        <button
                            disabled
                            title="Demo publiczne wkrótce — na razie dostępne na życzenie"
                            className="relative overflow-hidden px-5 py-2.5 rounded-[2rem] bg-dark/20 text-dark/40 font-sans font-bold text-sm cursor-not-allowed"
                        >
                            Live demo · wkrótce
                        </button>
                        <a
                            href={manual}
                            className="px-5 py-2.5 rounded-[2rem] border border-dark/20 text-dark font-sans font-bold text-sm hover:bg-dark/[0.05] hover:-translate-y-[1px] transition no-underline"
                        >
                            Pobierz manual PDF
                        </a>
                        <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest ml-auto">
                            Pakiet od 800 zł/mies
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Lightbox({ src, onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[10000] bg-dark/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-dark/60 border border-primary/20 text-primary flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Zamknij"
            >
                <X className="w-5 h-5" />
            </button>
            <img
                src={src}
                alt="Powiększony screenshot"
                className="max-w-full max-h-full rounded-2xl border border-primary/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}
