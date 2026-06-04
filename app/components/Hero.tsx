"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import MagneticButton from "./MagneticButton";
import ProductMarquee from "./ProductMarquee";
import { useIsMobile } from "./useIsMobile";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const rise: Variants = {
  hidden: { y: 22, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1, ease: EASE } },
};

const LINES = [["Wear", "your"], ["aura."]];

const NOTES = [
  "Oud",
  "Bergamot",
  "Tuberose",
  "Ambergris",
  "Iris",
  "Vetiver",
  "Neroli",
  "Saffron",
  "Cashmere Musk",
  "Black Currant",
];

const STATS = [
  { k: "12", v: "Signature accords" },
  { k: "100%", v: "Cruelty-free" },
  { k: "24h", v: "Lasting sillage" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.3,
  });

  // foreground text drifts up faster + fades; product drifts slower (depth)
  const textY = useTransform(smooth, [0, 1], [0, -140]);
  const textOpacity = useTransform(smooth, [0, 0.5], [1, 0]);
  const textBlurN = useTransform(smooth, [0, 0.5], [0, 6]);
  const textFilter = useTransform(textBlurN, (v) => `blur(${v}px)`);
  const showcaseY = useTransform(smooth, [0, 1], [0, -45]);

  return (
    <section
      ref={ref}
      className="relative min-h-dvh overflow-hidden pt-28 md:pt-32"
    >
      {/* drifting scent mist */}
      <div className="mist mist-gold right-[8%] top-[12%] h-[28rem] w-[28rem]" />
      <div className="mist mist-rose -left-[6%] top-[40%] h-[24rem] w-[24rem]" />
      <div className="mist mist-gold bottom-[6%] left-[35%] h-[20rem] w-[20rem] opacity-60" />

      {/* vertical edge label */}
      <span className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[0.6rem] uppercase tracking-[0.5em] text-bone-mute xl:block">
        Est. MMXXIV — Grasse
      </span>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* ---- Text column (scroll-parallax wrapper) ---- */}
        <motion.div
          style={
            isMobile
              ? undefined
              : { y: textY, opacity: textOpacity, filter: textFilter }
          }
          className="relative z-10"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
          <motion.div
            variants={rise}
            className="mb-7 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Niche Fragrance Atelier</span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.2rem,9vw,7rem)] font-light leading-[0.92] tracking-tight text-bone">
            {LINES.map((line, li) => (
              <span
                key={li}
                className="block overflow-hidden py-[0.05em]"
              >
                {line.map((w, wi) => (
                  <motion.span
                    key={wi}
                    variants={word}
                    className={`inline-block ${
                      li === 1 ? "italic text-gold-grad" : ""
                    } ${wi > 0 ? "ml-[0.25em]" : ""}`}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-7 max-w-md text-[0.98rem] leading-relaxed text-bone-dim lg:mx-0"
          >
            Fragrances composed in small batches — rare botanicals,
            slow-pressed oils, and a finish that lingers like memory.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start"
          >
            <MagneticButton
              href="/shop"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink shadow-[0_18px_40px_-12px_rgba(204,168,105,0.6)]"
            >
              <span className="relative z-10">Shop the collection</span>
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-full" />
            </MagneticButton>

            <MagneticButton
              href="#story"
              strength={0.25}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-bone/85 transition-colors hover:border-gold/50 hover:text-bone"
            >
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-500 group-hover:scale-150" />
              </span>
              Our story
            </MagneticButton>
          </motion.div>

          {/* stats */}
          <motion.dl
            variants={rise}
            className="mt-12 flex items-stretch justify-center divide-x divide-white/10 lg:justify-start"
          >
            {STATS.map((s) => (
              <div key={s.v} className="px-6 first:pl-0">
                <dt className="font-display text-2xl text-bone">{s.k}</dt>
                <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-bone-mute">
                  {s.v}
                </dd>
              </div>
            ))}
          </motion.dl>
          </motion.div>
        </motion.div>

        {/* ---- Bottle column (slower parallax for depth) ---- */}
        <motion.div
          style={isMobile ? undefined : { y: showcaseY }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
            className="flex items-center justify-center py-8 lg:py-0"
          >
            <ProductMarquee />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-bone-mute">
          Scroll
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
      </motion.div>

      {/* notes marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-white/5 bg-ink-2/40 py-4 backdrop-blur-sm">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                {NOTES.map((n) => (
                  <span key={n} className="flex items-center">
                    <span className="px-7 font-display text-lg italic text-bone-dim">
                      {n}
                    </span>
                    <span className="text-gold/60">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
