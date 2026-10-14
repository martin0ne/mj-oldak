import React, { useState, useEffect } from 'react';
import FlipStat from './FlipStat.jsx';

// ---- mini-galeria: crossfade po podzbiorze zdjęć, własny timer ----
function PhotoStack({ photos, aspect, interval }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % photos.length), interval);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-2xl bg-dark/5 dark:bg-white/5`}>
      {photos.map((src, k) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: k === i ? 1 : 0 }}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {photos.map((_, k) => (
          <span
            key={k}
            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{ background: k === i ? '#111111' : 'rgba(255,255,255,0.5)', transform: k === i ? 'scale(1.4)' : 'scale(1)' }}
          />
        ))}
      </div>
    </div>
  );
}

// ---- blok tematyczny: tekst + galeria, naprzemienne strony/orientacje ----
function Block({ kicker, side, photos, aspect, interval, children }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
      <div className={side === 'right' ? 'lg:order-2' : 'lg:order-1'}>
        <PhotoStack photos={photos} aspect={aspect} interval={interval} />
      </div>
      <div className={side === 'right' ? 'lg:order-1' : 'lg:order-2'}>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent/80 mb-4">— {kicker}</p>
        <div className="space-y-5 font-sans text-base md:text-lg leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [tab, setTab] = useState('pro'); // 'pro' = professional, 'me' = personal

  const tabText = (active) =>
    `relative z-10 font-mono text-xs uppercase tracking-[0.18em] px-6 py-2.5 rounded-full transition-colors duration-300 ${
      active ? 'text-background dark:text-[var(--c-page)]' : 'text-dark dark:text-[var(--c-ink)] hover:opacity-70'
    }`;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background dark:bg-[var(--c-page)] text-dark dark:text-[var(--c-ink)] px-8 md:px-16 py-16 md:py-24 transition-colors duration-500"
    >

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Toggle: Co robię | Kim jestem — wskaźnik + prominent "more" cue (jak prototyp) */}
        <div className="flex items-center gap-4 flex-wrap mb-12">
          <div className="relative grid grid-cols-2 w-fit p-1 rounded-full border border-dark/20 dark:border-[var(--c-ink)]/30 bg-dark/[0.04] dark:bg-white/[0.06]">
            <span
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-dark dark:bg-[var(--c-ink)] shadow-sm transition-transform duration-300 ease-out"
              style={{ transform: tab === 'me' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            <button type="button" onClick={() => setTab('pro')} className={tabText(tab === 'pro')} aria-pressed={tab === 'pro'}>
              Co robię
            </button>
            <button type="button" onClick={() => setTab('me')} className={tabText(tab === 'me')} aria-pressed={tab === 'me'}>
              Kim jestem
            </button>
          </div>
          {tab === 'pro' && (
            <button
              type="button"
              onClick={() => setTab('me')}
              className="group flex items-center gap-2 text-accent hover:animate-none hover:opacity-70 transition-opacity"
              aria-label="Zobacz kim jestem"
            >
              <svg width="56" height="28" viewBox="0 0 56 28" fill="none" aria-hidden="true">
                <path d="M50 8 C 40 4, 22 12, 6 15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 15 L 13 10 M6 15 L 13 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-serif italic text-lg md:text-xl leading-none">więcej — poznaj człowieka</span>
            </button>
          )}
        </div>

        {/* ---------- PROFESSIONAL ---------- */}
        {tab === 'pro' && (
          <div className="max-w-5xl">
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-6">
              Każe komputerowi robić <em className="italic">nudne rzeczy</em><span className="text-accent">.</span>
            </h2>
            <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-3xl mb-10 opacity-90">
              Bez pitchu, bez buzzwordów — tylko to, co naprawdę robię i po co to jest.
            </p>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-5 font-sans text-base leading-relaxed opacity-85">
                <p>
                  Siedzę w AI od 2022; od 2026 to moja praca — na własny rachunek, jako jedna osoba,{' '}
                  <strong>MJ.OLDAK</strong>. Pięć moich eksperymentów urosło do narzędzi, z których ludzie naprawdę
                  korzystają: OCR faktur, pomocnik maili, przypomnienie o terminach podatkowych, generator raportów
                  i outreach B2B. Wypróbujesz je niżej na tej stronie.
                </p>
                <p>
                  Na co dzień to <strong>LLM-y</strong> (Claude, Gemini) i <strong>n8n</strong>, żeby to ze sobą
                  spiąć — plus pipeline, z którego korzystają moje agenty. Jeśli darmowe narzędzie ogarnie robotę,
                  użyję go i powiem Ci o tym.
                </p>
                <p>
                  Ostatnio idę głębiej w <strong>dane</strong> — SQL i raporty, w których każda liczba ma nazwane
                  źródło i datę (patrz analiza niżej).
                </p>
              </div>
              <div className="space-y-5 font-sans text-base leading-relaxed opacity-85">
                <p>
                  Moje tło jest celowo dziwne: <strong>psychologia w biznesie</strong> nauczyła mnie zaczynać od
                  człowieka, nie od procesu; <strong>prawo</strong> zrobiło z RODO i ludzkiego nadzoru odruch —
                  wbudowane od pierwszego dnia, nie doklejane na końcu.
                </p>
                <p>
                  Kilka lat spędziłem w <strong>wielkiej korporacji</strong>, automatyzując powtarzalną pracę, której
                  nikt nie powinien robić ręcznie. Lubiłem pracę, nie drabinę w niej — wolę usiąść naprzeciw małego
                  zespołu, w którym ludzie mówią wprost, twarzą w twarz.
                </p>
                <p>
                  Wszystko, co buduję, jest <strong>model-agnostic</strong> (bez lock-inu), z człowiekiem w pętli
                  i w polskiej regulacyjnej rzeczywistości (KSeF / JPK). Jeśli AI nie jest dla Ciebie dobrą odpowiedzią —
                  powiem to wprost.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-dark/10 dark:border-[var(--c-line)]">
              <FlipStat value="5" suffix="+" suffixClass="text-accent" label="produkty AI gotowe do pilotażu" />
              <FlipStat value="2022" label="pracuję z AI od" />
              <FlipStat value="1" label="rozmawiasz ze mną — bez pośredników i handlowców" />
            </div>
          </div>
        )}

        {/* ---------- PERSONAL (eksperymentalny: bloki tematyczne, foto naprzemiennie) ---------- */}
        {tab === 'me' && (
          <div>
            <h2 className="font-serif italic text-3xl md:text-5xl leading-[1.12] mb-14 max-w-3xl">
              Człowiek to maszyna kontekstu. <span className="text-accent">AI to tylko narzędzie.</span>
            </h2>

            <div className="space-y-16 lg:space-y-24">
              <Block
                kicker="hybryda"
                side="right"
                aspect="aspect-[4/5]"
                interval={3500}
                photos={['/photos/art-09.jpg', '/photos/hero-5236.jpg', '/photos/art-04.jpg', '/photos/hero-7543.jpg', '/photos/art-11.jpg']}
              >
                <p>
                  Jestem Marcin — a <strong>MJ.OLDAK to ja</strong>. To nie ćwiczenie z brandingu; to człowiek, który
                  postanowił podpisać swoim nazwiskiem to, co robi.
                </p>
                <p>
                  Jako dziecko byłem humanistą, który jednocześnie kochał elektronikę. Lata później przeczytałem, co <strong>Edwin Land</strong>{' '}
                  — założyciel Polaroidu i jeden z bohaterów Steve'a Jobsa — mówił o ludziach stojących na skrzyżowaniu
                  humanistyki i nauki, i wiedziałem, że właśnie tam chcę żyć. Jestem hybrydą: kocham technologię, kocham
                  humanistykę i najlepiej myślę tam, gdzie się spotykają.
                </p>
              </Block>

              <Block
                kicker="punkt startu"
                side="left"
                aspect="aspect-[16/11]"
                interval={4200}
                photos={['/photos/hero-5350.jpg', '/photos/art-06.jpg', '/photos/hero-0798.jpg', '/photos/art-02.jpg', '/photos/hero-6147.jpg']}
              >
                <p>
                  Nie mam mitu o garażu — mam jeden prawdziwy moment. Pracując w brytyjskim cle i brokerage'u, po stronie
                  finansów, przechodziło przeze mnie około 100 deklaracji dziennie, w środowisku kompletnie zamkniętym,
                  bez uprawnień administracyjnych. Zamiast tyrać powtarzalną robotę, zacząłem ją rozbrajać — z własnej
                  woli: makra w Excelu, pisane procedury — bo nie mogłem patrzeć, jak ludzie tracą godziny na coś, co
                  maszyna robi szybciej i bez błędów. Nikt mnie o to nie prosił.{' '}
                  <span className="text-accent">To był MJ.OLDAK, zanim miał nazwę.</span>
                </p>
                <p>
                  Ciągnie mnie to, co trudne. Rozwiązywanie trudnych problemów to najstarszy silnik — aż po ewolucję:
                  ci, którzy rozwiązują problemy, idą do przodu. Świat biznesu jest moim placem zabaw dokładnie z tego powodu.
                </p>
              </Block>

              <Block
                kicker="jak widzę AI"
                side="right"
                aspect="aspect-[4/5]"
                interval={3800}
                photos={['/photos/art-01.jpg', '/photos/hero-5048.jpg', '/photos/art-03.jpg', '/photos/art-05.jpg']}
              >
                <p>
                  Mniej więcej trzecią część życia spędzamy w pracy, więc nie traktuję AI jako narzędzia do cięcia etatów —
                  tylko do <strong>podnoszenia</strong> ludzi i firm. Zrobione dobrze obniża koszty i podnosi przychody, ale
                  przede wszystkim oddaje godziny: mniej powtarzalnej roboty, którą lepiej robi komputer, więcej czasu na to,
                  co dla każdego naprawdę liczy — zwykle on sam i jego rodzina.
                </p>
                <p>
                  Celem nie jest oddanie maszynie swojego myślenia. Wręcz przeciwnie — AI zdejmuje z Ciebie rzemiosło,
                  żebyś mógł być <strong>filozofem</strong>: tym, który rozumie, myśli krytycznie i ponosi odpowiedzialność.
                  Część mojej pracy to wiedzieć, gdzie AI <span className="italic">nie pasuje</span> — więc nie sprzedam Ci
                  AI tam, gdzie się nie opłaca.
                </p>
              </Block>

              <Block
                kicker="po godzinach"
                side="left"
                aspect="aspect-[16/11]"
                interval={4600}
                photos={['/photos/art-07.jpg', '/photos/art-08.jpg', '/photos/hero-5579.jpg', '/photos/art-10.jpg', '/photos/hero-5088.jpg']}
              >
                <p>
                  Chcę, żeby to przetrwało dłużej niż freelancerski zleceniowy okres: firmę zaprojektowaną tak dobrze,
                  że przetrwa swojego założyciela. I chcę budować ją z dobrymi ludźmi — takimi, którzy dzielą moje wartości,
                  niekoniecznie mój światopogląd. Wszyscy widzimy świat inaczej — i o to chodzi: najlepsze pomysły rodzą się
                  z tarcia różnych perspektyw.
                </p>
                <p className="opacity-85">
                  Po godzinach rodzina na pierwszym miejscu. Czytam dużo — powieści Michela Houellebecqa i Aldousa
                  Huxleya, biografie Waltera Isaacsona, Kobe Bryanta <span className="italic">Mamba Mentality</span> —
                  i muzycznie mam równie szeroki gust: od Taco Hemingwaya, Quebonafide, Maty i Maryli Rodowicz po Drake'a
                  i wielu innych. Robię poważne spaghetti i jeszcze poważniejsze BBQ, najlepiej myślę na długich spacerach
                  w naturze i rzadko podróżuję bez aparatu — zdjęcia, które tu widzisz, to kilka klatek z moich wojaży.
                  Tak naprawdę czerpię inspirację wszędzie — z życia, z natury, ze wszystkiego — bo lubię widzieć rzeczy
                  <span className="italic"> holistycznie</span>: jako części czegoś większego, w czym wszyscy mieszkamy
                  i co współdzielimy.
                </p>
              </Block>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-40 mt-16">
              — fotografie: moje, z podróży przez życie
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
