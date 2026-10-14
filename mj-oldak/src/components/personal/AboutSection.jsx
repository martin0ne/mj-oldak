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
        {/* Toggle: Co robię | Kim jestem — wskaźnik + prominent "more" cue */}
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
              Pisarz. Analityk danych. Builder narzędzi AI<span className="text-accent">.</span>
            </h2>
            <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-3xl mb-10 opacity-90">
              To, co łączę — pisanie, analizę danych i kodowanie narzędzi — robię od 2022 roku.
            </p>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-5 font-sans text-base leading-relaxed opacity-85">
                <p>
                  Piszę tom esejów (ostatni rozdział zaakceptowany, w redakcji), prowadzę badanie GUS × Eurostat i buduję narzędzia AI/data-engineering na GitHubie — <strong>6 publicznych repozytoriów</strong>. Używam SQL, LLM-ów i automatyzacji, żeby działały razem. Jeśli proste otwarte narzędzie ogarnie robotę — użyję go i powiem o tym.
                </p>
                <p>
                  Na co dzień SQL, LLM-y i automatyzacja. Pracuję z danymi publicznymi — każde źródło ma nazwę i datę. Buduję rozwiązania model-agnostic, z człowiekiem w pętli.
                </p>
              </div>
              <div className="space-y-5 font-sans text-base leading-relaxed opacity-85">
                <p>
                  Tło jest nietypowe: <strong>psychologia w biznesie</strong> nauczyła mnie patrzeć na człowieka, nie proces. Edukacja prawna sprawiła, że RODO i nadzór ludzki są standardem, nie dodatkiem.
                </p>
                <p>
                  W poprzedniej pracy automatyzowałem powtarzalne zadania i odkryłem, że najlepsze narzędzia rozwiązują problem zanim ktoś zauważy, że istnieje.
                </p>
                <p>
                  Model-agnostic — bez lock-inu do jednego dostawcy. Z człowiekiem w pętli i z rozumieniem polskich realiów (<strong>RODO, KSeF, JPK</strong>).
                </p>
                <p>
                  <strong>Współpraca — jedna z opcji:</strong> projekty w AI, analizie danych, automatyzacji. Działam niezależnie — Warszawa lub zdalnie (PL/EU). W przygotowaniu: baza wiedzy o AI — napisana dla człowieka, który z niej korzysta i chce rozumieć, jak działają narzędzia AI i samo AI. Masz projekt? Napisz przez formularz kontaktowy na dole strony.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-dark/10 dark:border-[var(--c-line)]">
              <FlipStat value="6" label="publicznych repozytoriów na GitHubie" />
              <FlipStat value="0,34" suffix="pp" suffixClass="text-accent" label="GUS × Eurostat uzgodnione — raport niżej" />
              <FlipStat value="1" label="rozmawiasz ze mną — bez pośredników i handlowców" />
            </div>
          </div>
        )}

        {/* ---------- PERSONAL ---------- */}
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
                  Jestem Marcin. MJ.OLDAK to moje nazwisko — nie marka, nie studio, nie agencja. Łączę humanistykę z technologią: pisarz, analityk i builder narzędzi AI. Humanistyka uczy widzieć kontekst, technologia pozwala go zmieniać.
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
                  Pracując wcześniej w brytyjskim cle, przechodziło przeze mnie około 100 deklaracji dziennie. Zamiast ciągnąć powtarzalną robotę, zacząłem ją rozwiązywać — z własnej inicjatywy. To był początek podejścia, które teraz nazywam MJ.OLDAK.
                </p>
                <p>
                  Ciągnie mnie to, co trudne. Rozwiązywanie trudnych problemów to najstarszy silnik — aż po ewolucję: ci, którzy rozwiązują problemy, idą do przodu. Świat biznesu jest moim placem zabaw dokładnie z tego powodu.
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
                  AI traktuję praktycznie: obniża koszty, oszczędza czas i oddaje godziny ludziom. AI nie zastępuje myślenia — usuwa powtarzalną robotę, żebyś mógł skupić się na decyzyjnym. Kiedy AI to zły wybór — powiem to wprost.
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
                  Rodzina na pierwszym miejscu. Czytam powieści (Houellebecq, Huxley), biografie i książki o mindsetzie. Muzycznie szeroki gust: od Taco Hemingwaya po Marylę Rodowicz. Najlepiej myślę na długich spacerach w naturze. Robię poważne spaghetti i jeszcze poważniejsze BBQ.
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
