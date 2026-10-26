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
            Jestem Marcin. MJ.OLDAK to moje nazwisko — nie marka, nie studio, nie agencja. Piszę tom esejów
            (ostatni rozdział zaakceptowany, w redakcji), prowadzę badanie GUS × Eurostat i buduję narzędzia
            AI na GitHubie — <strong>10 publicznych repozytoriów</strong>. Używam SQL, LLM-ów i automatyzacji,
            żeby działały razem; jeśli proste otwarte narzędzie ogarnie robotę, użyję go i powiem o tym.
            Pracuję z danymi publicznymi — każde źródło ma nazwę i datę. Buduję rozwiązania model-agnostic,
            z człowiekiem w pętli i z rozumieniem polskich realiów (RODO, KSeF, JPK). Tło jest nietypowe:
            psychologia w biznesie nauczyła mnie patrzeć na człowieka, nie proces; edukacja prawna sprawiła,
            że nadzór ludzki jest standardem, nie dodatkiem.
           Otwarty na rozmowy o AI i automatyzacji.</p>
          <p className="font-sans text-base md:text-lg leading-relaxed opacity-90">
            Współpraca to jedna z opcji — projekty w AI, analizie danych, automatyzacji. Działam niezależnie:
            Warszawa lub zdalnie (PL/EU).
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
