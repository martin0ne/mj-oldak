import React, { useState, useEffect } from 'react';

// ---- mini-gallery: crossfade on photo subset, own timer ----
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
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out grayscale contrast-[1.03]"
          style={{ opacity: k === i ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

// ---- themed block: text + gallery ----
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

// v1 (19.10.2026) — mirror of AboutSection.jsx (PL) with English content.
// Single paragraph, self-authored photography (brief: zachowaj jeśli pasują).

export default function AboutSectionEN() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background dark:bg-[var(--c-page)] text-dark dark:text-[var(--c-ink)] px-8 md:px-16 py-16 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-50 mb-6">
          <span className="text-sunset">—</span> 03 · About
        </p>

        <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-8">
          One person to talk to.
        </h2>

        <div className="max-w-3xl">
          <p className="font-sans text-base md:text-lg leading-relaxed opacity-90 mb-8">
            I am Marcin. MJ.OLDAK is my name — not a brand, not a studio, not an agency. I write a book of essays
            (final chapter accepted, in editing), run a GUS × Eurostat study and build AI tools on GitHub —
            <strong> six public repositories</strong>. I use SQL, LLMs and automation; if a simple open tool gets the job done, I will use it and tell you about it. I work with public data — every source has a name and date. Solutions are model-agnostic, human-in-the-loop, grounded in Polish reality (GDPR, KSeF, JPK). My background is unconventional: business psychology taught me to see the person, not the process; legal education makes human oversight a standard, not an add-on.
          </p>
          <p className="font-sans text-base md:text-lg leading-relaxed opacity-90">
            Collaboration is one option — projects in AI, data analysis, automation. I operate independently:
            Warsaw or remote (PL/EU).
          </p>
        </div>

        <div className="mt-14 max-w-2xl">
          <Block
            kicker="hybrid"
            side="right"
            aspect="aspect-[16/11]"
            interval={3800}
            photos={['/photos/art-09.jpg', '/photos/hero-5236.jpg', '/photos/art-04.jpg', '/photos/art-01.jpg']}
          >
            <p>
              I bring humanities together with technology: writer, analyst and builder of AI tools. Humanities teach you to see context; technology lets you change it.
            </p>
          </Block>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-40 mt-12">
          — photography: mine, from journeys through life
        </p>
      </div>
    </section>
  );
}
