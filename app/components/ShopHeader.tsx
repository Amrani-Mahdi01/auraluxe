import Reveal from "./Reveal";
import Parallax from "./Parallax";
import HeadingReveal from "./HeadingReveal";

export default function ShopHeader() {
  return (
    <section className="relative overflow-hidden px-6 pb-6 pt-36 md:pt-44">
      <div className="mist mist-gold right-[6%] top-[18%] h-[26rem] w-[26rem] opacity-30" />
      <div className="mist mist-rose -left-[4%] top-[30%] h-[20rem] w-[20rem] opacity-20" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-6 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">The Maison · Every Fragrance</span>
        </Reveal>

        <Parallax distance={30}>
          <HeadingReveal
            className="font-display text-[clamp(3rem,9vw,7rem)] font-light leading-[0.9] tracking-tight text-bone"
            segments={[
              { text: "The full" },
              { text: "collection.", className: "italic text-gold-grad" },
            ]}
          />
        </Parallax>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-bone-dim">
            Eight compositions, each aged six weeks and hand-poured in Grasse.
            Filter by character, sort to taste — and add your next signature to
            the bag.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
