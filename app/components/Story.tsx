"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import HeadingReveal from "./HeadingReveal";

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
  });
  const y = useTransform(smooth, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(smooth, [0, 1], [1.12, 1]);

  return (
    <section
      id="story"
      className="relative mx-auto max-w-7xl scroll-mt-28 px-6 py-28 md:py-36"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* image */}
        <div ref={ref} className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <motion.div style={{ y, scale }} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src="/products/noirflora.jpg"
                alt="Dried botanicals used in AuraLuxe compositions"
                fill
                sizes="(max-width: 1024px) 90vw, 600px"
                className="object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />
          </div>

          {/* floating badge */}
          <Reveal
            delay={0.2}
            className="absolute -bottom-6 -right-2 rounded-2xl border border-white/10 bg-ink/70 px-6 py-4 backdrop-blur-md sm:-right-6"
          >
            <p className="font-display text-3xl text-gold-grad">MMXXIV</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-bone-mute">
              Grasse · France
            </p>
          </Reveal>

          {/* decorative offset frame */}
          <div className="absolute -left-4 -top-4 -z-10 hidden h-full w-full rounded-[2rem] border border-gold/20 lg:block" />
        </div>

        {/* text */}
        <div className="order-1 lg:order-2">
          <Reveal className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">The House</span>
          </Reveal>

          <Parallax distance={36}>
            <HeadingReveal
              className="font-display text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[0.98] text-bone"
              segments={[
                { text: "An atelier devoted to" },
                { text: "the invisible.", className: "italic text-gold-grad" },
              ]}
            />
          </Parallax>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-md text-[0.98rem] leading-relaxed text-bone-dim">
              Founded in the perfume capital of Grasse, AuraLuxe is a small house
              of perfumers obsessed with the unseen. We macerate rare absolutes
              for six weeks before a single bottle is filled — so every scent
              unfolds slowly, like a memory returning.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-bone-dim">
              No shortcuts. No synthetics masquerading as soul. Only raw
              materials chosen for their character — and the patience to let
              them speak.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-9 flex items-center gap-4">
            <span className="font-display text-2xl italic text-bone">
              Élise Moreau
            </span>
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-mute">
              Master Perfumer
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
