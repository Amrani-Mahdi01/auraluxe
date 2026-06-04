import Reveal from "./Reveal";
import Parallax from "./Parallax";
import HeadingReveal from "./HeadingReveal";

const STEPS = [
  {
    n: "01",
    title: "Harvest",
    body: "Flowers are picked at dawn in the hills of Grasse, when their oils are most concentrated and alive.",
  },
  {
    n: "02",
    title: "Enfleurage",
    body: "Absolutes are drawn out by hand and composed on the perfumer's organ, drop by deliberate drop.",
  },
  {
    n: "03",
    title: "Maceration",
    body: "Each blend rests six weeks in darkness, allowing every note to marry into a single voice.",
  },
  {
    n: "04",
    title: "Hand-poured",
    body: "Bottled, wax-sealed, and individually numbered in batches that never exceed three hundred.",
  },
];

export default function Ritual() {
  return (
    <section
      id="craft"
      className="relative mx-auto max-w-7xl scroll-mt-28 px-6 py-28 md:py-36"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Parallax distance={34}>
          <Reveal className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Savoir-faire</span>
          </Reveal>
          <HeadingReveal
            className="max-w-xl font-display text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[0.98] text-bone"
            segments={[
              { text: "From petal" },
              { text: "to perfume.", className: "italic text-gold-grad" },
            ]}
          />
        </Parallax>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-[0.95rem] leading-relaxed text-bone-dim">
            Four slow steps, unchanged since 1921 — the difference you can smell
            from the very first hour.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div className="group relative pt-7">
              <span className="absolute left-0 top-0 h-px w-full bg-white/10">
                <span className="block h-px w-0 bg-gradient-to-r from-gold to-rose transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </span>
              <span className="font-display text-5xl text-bone/15 transition-colors duration-500 group-hover:text-gold/40">
                {s.n}
              </span>
              <h3 className="mt-5 font-display text-2xl text-bone">{s.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-bone-dim">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
