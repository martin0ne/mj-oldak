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
        {/* Toggle: What I do | Who I am — wskaźnik + prominent "more" cue (jak prototyp) */}
        <div className="flex items-center gap-4 flex-wrap mb-12">
          <div className="relative grid grid-cols-2 w-fit p-1 rounded-full border border-dark/20 dark:border-[var(--c-ink)]/30 bg-dark/[0.04] dark:bg-white/[0.06]">
            <span
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-dark dark:bg-[var(--c-ink)] shadow-sm transition-transform duration-300 ease-out"
              style={{ transform: tab === 'me' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            <button type="button" onClick={() => setTab('pro')} className={tabText(tab === 'pro')} aria-pressed={tab === 'pro'}>
              What I do
            </button>
            <button type="button" onClick={() => setTab('me')} className={tabText(tab === 'me')} aria-pressed={tab === 'me'}>
              Who I am
            </button>
          </div>
          {tab === 'pro' && (
            <button
              type="button"
              onClick={() => setTab('me')}
              className="group flex items-center gap-2 text-accent hover:animate-none hover:opacity-70 transition-opacity"
              aria-label="See who I am"
            >
              <svg width="56" height="28" viewBox="0 0 56 28" fill="none" aria-hidden="true">
                <path d="M50 8 C 40 4, 22 12, 6 15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 15 L 13 10 M6 15 L 13 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-serif italic text-lg md:text-xl leading-none">more — meet the human</span>
            </button>
          )}
        </div>

        {/* ---------- PROFESSIONAL ---------- */}
        {tab === 'pro' && (
          <div className="max-w-5xl">
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-6">
              I make the computer do <em className="italic">the boring parts</em><span className="text-accent">.</span>
            </h2>
            <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-3xl mb-10 opacity-90">
              No pitch, no buzzwords — just what I actually do, and what it's for.
            </p>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-5 font-sans text-base leading-relaxed opacity-85">
                <p>
                  I've been poking at AI since 2022; since 2026 it's what I do for a living — as one person,{' '}
                  <strong>MJ.OLDAK</strong>. Five of my experiments turned into things people can really use:{' '}
                  invoice OCR, an email helper, a tax-deadline reminder, a report generator and a B2B outreach helper.
                  You can try them further down this page.
                </p>
                <p>
                  Day to day that means <strong>LLMs</strong> (Claude, Gemini) and <strong>n8n</strong> to wire them
                  together — plus a pipeline my agents can call directly. If a free tool does the job, I'll use that
                  instead and tell you so.
                </p>
                <p>
                  Lately I've gone deeper on the <strong>data side</strong> — SQL and reports where every number comes
                  with a named source and a date (see the analysis below).
                </p>
              </div>
              <div className="space-y-5 font-sans text-base leading-relaxed opacity-85">
                <p>
                  My background is deliberately odd: <strong>business psychology</strong> taught me to start from the
                  person, not the process; <strong>law</strong> made GDPR and human oversight second nature — built in
                  from day one, not bolted on later.
                </p>
                <p>
                  I spent a few years inside a <strong>big corporation</strong> automating the repetitive stuff nobody
                  should be doing by hand. I liked the work, not the ladder — I'd rather sit across from a small team
                  where people say what they mean, face to face.
                </p>
                <p>
                  Everything I build is <strong>model-agnostic</strong> (no lock-in), keeps a human in the loop, and
                  speaks Polish regulatory reality (KSeF / JPK). If AI isn't the right answer for you, I'll say that too.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-dark/10 dark:border-[var(--c-line)]">
              <FlipStat value="5" suffix="+" suffixClass="text-accent" label="working AI products (pilot-ready)" />
              <FlipStat value="2022" label="working with AI since" />
              <FlipStat value="1" label="person you talk to — no account managers, no sales" />
            </div>
          </div>
        )}

        {/* ---------- PERSONAL (eksperymentalny: bloki tematyczne, foto naprzemiennie) ---------- */}
        {tab === 'me' && (
          <div>
            <h2 className="font-serif italic text-3xl md:text-5xl leading-[1.12] mb-14 max-w-3xl">
              A human is a context machine. <span className="text-accent">AI is just the tool.</span>
            </h2>

            <div className="space-y-16 lg:space-y-24">
              <Block
                kicker="the hybrid"
                side="right"
                aspect="aspect-[4/5]"
                interval={3500}
                photos={['/photos/art-09.jpg', '/photos/hero-5236.jpg', '/photos/art-04.jpg', '/photos/hero-7543.jpg', '/photos/art-11.jpg']}
              >
                <p>
                  I'm Marcin — and <strong>MJ.OLDAK is me</strong>. The name isn't a branding exercise; it's a person who
                  decided to put his own name on the work.
                </p>
                <p>
                  As a kid I was a humanities person who also loved electronics. Years later I read what <strong>Edwin Land</strong>{' '}
                  — Polaroid's founder, and one of Steve Jobs's heroes — said about people who stand at the intersection of the
                  humanities and science, and I knew that's where I wanted to live. I'm a hybrid: I love technology, I love the
                  humanities, and I think best where the two meet.
                </p>
              </Block>

              <Block
                kicker="the origin"
                side="left"
                aspect="aspect-[16/11]"
                interval={4200}
                photos={['/photos/hero-5350.jpg', '/photos/art-06.jpg', '/photos/hero-0798.jpg', '/photos/art-02.jpg', '/photos/hero-6147.jpg']}
              >
                <p>
                  I don't have a garage-founder myth — I'm 26, with one real moment instead. Working in UK customs and brokerage — the finance side — around 100
                  declarations a day passed through me in a fully locked-down environment with zero admin rights. Instead of
                  grinding the repetition, I started disarming it — Excel macro calculators, written SOPs — on my own initiative,
                  because I couldn't watch people lose hours to work a machine does faster and without errors. Nobody asked me to.{' '}
                  <span className="text-accent">That was MJ.OLDAK before it had a name.</span>
                </p>
                <p>
                  I'm drawn to hard things. Solving hard problems is the oldest engine there is — all the way down to evolution,
                  the ones who solve problems are the ones who move forward. The business world is my playground for exactly that.
                </p>
              </Block>

              <Block
                kicker="how I see AI"
                side="right"
                aspect="aspect-[4/5]"
                interval={3800}
                photos={['/photos/art-01.jpg', '/photos/hero-5048.jpg', '/photos/art-03.jpg', '/photos/art-05.jpg']}
              >
                <p>
                  We spend roughly a third of our lives at work, so I don't treat AI as a tool for cutting headcount — but for{' '}
                  <strong>elevating</strong> people and companies. Done well it cuts cost and lifts revenue, but above all it gives
                  hours back: less repetitive work a computer does better, more time for what actually matters to each person —
                  usually themselves and their families.
                </p>
                <p>
                  The goal isn't to hand the machine your thinking. The opposite — AI takes the craft off your plate so you can be
                  the <strong>philosopher</strong>: the one who understands, thinks critically, and stays accountable. Part of my
                  job is knowing where AI <span className="italic">doesn't</span> belong — so I won't sell you AI where it doesn't
                  pay off.
                </p>
              </Block>

              <Block
                kicker="off the clock"
                side="left"
                aspect="aspect-[16/11]"
                interval={4600}
                photos={['/photos/art-07.jpg', '/photos/art-08.jpg', '/photos/hero-5579.jpg', '/photos/art-10.jpg', '/photos/hero-5088.jpg']}
              >
                <p>
                  I want this to outlast a freelancer's gig: a company designed well enough to outlast its founder. And I want to
                  build it with good teammates — people who share my values, not necessarily my worldview. We all see the world
                  differently, and that's the point: the best ideas come from rubbing different perspectives together.
                </p>
                <p className="opacity-85">
                  Off the clock, family comes first. I read widely — novels by Michel Houellebecq and Aldous Huxley, Walter
                  Isaacson's biographies, Kobe Bryant's <span className="italic">Mamba Mentality</span> — and my taste in music runs
                  just as wide, from Taco Hemingway, Quebonafide, Mata and Maryla Rodowicz to Drake and many more. I cook a serious
                  spaghetti and an even better BBQ, I do my best thinking on long walks in nature, and I rarely travel without a
                  camera — the photographs you see here are a handful of frames from my journeys. Really, I take inspiration from
                  everywhere — life, nature, all of it — because I like to see things <span className="italic">holistically</span>:
                  as parts of something bigger that we all live in, and share.
                </p>
              </Block>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-40 mt-16">
              — photographs: my own, from travels through life
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
