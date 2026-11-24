import React, { useState, useEffect } from 'react';

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
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out grayscale contrast-[1.03]"
          style={{ opacity: k === i ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

// ---- blok tematyczny: tekst + galeria ----
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

// v2 (15.10.2026) — brief: „O mnie: jeden krótki akapit".
// Usunięte: zakładki (Co robię / Kim jestem), 3 liczniki FlipStat (dekoracyjne),
// 3 z 4 opowieści, CTA kontaktowe (jest osobne w sekcji kontaktu),
// „W przygotowaniu: baza wiedzy" (zapowiedź bez materiału).
// Zostawione: fotografie autorskie (brief: „zachowaj, jeśli pasują").
export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background dark:bg-[var(--c-page)] text-dark dark:text-[var(--c-ink)] px-8 md:px-16 py-16 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-50 mb-6">
          <span className="text-sunset">—</span> 03 · O mnie
        </p>

        <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-8">
          Jedna osoba do rozmowy.
        </h2>

        <div className="max-w-3xl">
          <p className="font-sans text-base md:text-lg leading-relaxed opacity-90 mb-8">
            Jestem Marcin. Uczę firmy używać AI tak, żeby realnie odciążało ludzi — nie żeby
            ładnie wyglądało w prezentacji. Pracuję z mikrofirmami i zespołami biurowymi:
            audyt, warsztat, wdrożenie jednego procesu. <strong>13 publicznych repozytoriów</strong>{' '}
            na GitHubie i cztery działające dema są tam po to, żebyś nie musiał wierzyć mi na słowo —
            możesz kliknąć i sprawdzić.
          </p>
          <p className="font-sans text-base md:text-lg leading-relaxed opacity-90 mb-8">
            Równolegle piszę: tom esejów w redakcji, analizy oparte na danych publicznych (GUS, Eurostat, NIK)
            i blog o weryfikowaniu źródeł. To nie hobby obok pracy — to drugi warsztat, który nauczył mnie
            jednej rzeczy: <strong>każda liczba musi mieć nazwę i datę</strong>. Tę samą zasadę stosuję
            w projektach dla firm.
          </p>
          <p className="font-sans text-base md:text-lg leading-relaxed opacity-90">
            Tło jest nietypowe: psychologia w biznesie (DSW) nauczyła mnie patrzeć na człowieka, nie proces;
            edukacja prawna sprawiła, że nadzór ludzki i RODO są standardem, nie dodatkiem. Warsztaty AI
            prowadzę od 2026 — dla zespołów, które chcą robić to samodzielnie po pierwszym szkoleniu.
          </p>
        </div>

        <div className="mt-14 max-w-2xl">
          <Block
            kicker="hybryda"
            side="right"
            aspect="aspect-[16/11]"
            interval={3800}
            photos={['/photos/art-09.jpg', '/photos/hero-5236.jpg', '/photos/art-04.jpg', '/photos/art-01.jpg']}
          >
            <p>
              Łączę humanistykę z technologią: pisarz, analityk i builder narzędzi AI. Humanistyka uczy widzieć
              kontekst, technologia pozwala go zmieniać.
            </p>
          </Block>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-40 mt-12">
          — fotografie: moje, z podróży przez życie
        </p>
      </div>
    </section>
  );
}
