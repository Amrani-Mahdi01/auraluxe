import ScrollReveal from "./ScrollReveal";

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div className="mist mist-gold left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-25" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">Our Philosophy</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>

        <ScrollReveal className="text-center font-display text-[clamp(1.7rem,4.4vw,3.3rem)] font-light leading-[1.3] text-bone">
          Scent is the only art you wear on skin — invisible, intimate, and
          impossible to forget. We compose it slowly, in darkness, so it lingers
          like a memory you can almost touch.
        </ScrollReveal>
      </div>
    </section>
  );
}
