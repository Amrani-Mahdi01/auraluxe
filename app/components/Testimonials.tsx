import Reveal from "./Reveal";
import Parallax from "./Parallax";
import HeadingReveal from "./HeadingReveal";

const QUOTES = [
  {
    quote:
      "It's the first scent strangers stop me to ask about. Obsidienne is pure witchcraft in a bottle.",
    name: "Camille R.",
    place: "Paris",
  },
  {
    quote:
      "Six weeks of aging — you can smell the patience. Nothing else I own lasts like this on skin.",
    name: "Jonah M.",
    place: "New York",
  },
  {
    quote:
      "Rose Mémoire smells like a memory I didn't know I had. Quietly, completely addictive.",
    name: "Aïsha K.",
    place: "London",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-28 overflow-hidden border-t border-white/5 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Parallax distance={34}>
          <Reveal className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Admirers</span>
            <span className="h-px w-8 bg-gold/60" />
          </Reveal>
          <HeadingReveal
            className="text-center font-display text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[0.98] text-bone"
            segments={[
              { text: "Worn &" },
              { text: "adored.", className: "italic text-gold-grad" },
            ]}
          />
        </Parallax>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.12}>
              <figure className="flex h-full flex-col gap-6 rounded-3xl border border-white/8 bg-ink-2/40 p-8 backdrop-blur-sm transition-colors hover:border-gold/25">
                <span className="font-display text-6xl leading-none text-gold/40">
                  &ldquo;
                </span>
                <blockquote className="-mt-8 flex-1 font-display text-xl leading-snug text-bone/90">
                  {q.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-2">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 font-display text-sm text-gold">
                    {q.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm text-bone">{q.name}</span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-bone-mute">
                      {q.place}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
