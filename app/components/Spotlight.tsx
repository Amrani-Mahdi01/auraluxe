"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import HeadingReveal from "./HeadingReveal";
import MagneticButton from "./MagneticButton";
import { useCart } from "./CartContext";
import { formatPrice } from "./format";

const EASE = [0.16, 1, 0.3, 1] as const;

const SIZES = [
  { ml: "50ml", price: 14900 },
  { ml: "100ml", price: 20900 },
];

const PYRAMID = [
  { tier: "Top", width: "46%", notes: "Bergamot · Pink Pepper" },
  { tier: "Heart", width: "72%", notes: "Oud · Orris · Saffron" },
  { tier: "Base", width: "100%", notes: "Amber · Tonka · Incense" },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Spotlight() {
  const { add } = useCart();
  const [size, setSize] = useState(0);

  return (
    <section
      id="spotlight"
      className="relative scroll-mt-28 overflow-hidden border-y border-white/5 bg-ink-2/30 py-28 md:py-36"
    >
      <div className="mist mist-gold -right-[5%] top-[10%] h-[26rem] w-[26rem] opacity-40" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* image */}
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[80px]" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-white/15 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)]">
            <Image
              src="/products/obsidienne.jpg"
              alt="Obsidienne Eau de Parfum"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-gold-soft backdrop-blur-md">
              Bestseller
            </span>
          </div>
        </Reveal>

        {/* details */}
        <div>
          <Reveal className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Signature Scent</span>
          </Reveal>

          <Parallax distance={34}>
            <HeadingReveal
              className="font-display text-[clamp(2.6rem,6vw,4.2rem)] font-light leading-[0.95] text-bone"
              segments={[{ text: "Obsidienne" }]}
            />
            <Reveal delay={0.2}>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[0.3em] text-bone-mute">
                Eau de Parfum · Extrait
              </p>
            </Reveal>
          </Parallax>

          <Reveal delay={0.1} className="mt-4 flex items-center gap-3">
            <Stars />
            <span className="text-[0.78rem] text-bone-dim">
              4.9 · 212 reviews
            </span>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-[0.96rem] leading-relaxed text-bone-dim">
              A nocturnal oud built on smouldering amber and incense, lifted by a
              whisper of saffron. Dark, resinous, and impossibly long-lasting.
            </p>
          </Reveal>

          {/* olfactory pyramid */}
          <div className="mt-9 space-y-4">
            {PYRAMID.map((p, i) => (
              <motion.div
                key={p.tier}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.12 }}
              >
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
                    {p.tier} Notes
                  </span>
                  <span className="text-[0.82rem] text-bone/90">{p.notes}</span>
                </div>
                <div className="h-px w-full bg-white/8">
                  <motion.div
                    className="h-px origin-left bg-gradient-to-r from-gold to-rose"
                    style={{ width: p.width }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.12 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* size + price + cart */}
          <Reveal delay={0.15} className="mt-9">
            <div className="flex flex-wrap items-center gap-3">
              {SIZES.map((s, i) => (
                <button
                  key={s.ml}
                  onClick={() => setSize(i)}
                  className={`rounded-full border px-5 py-2.5 text-[0.78rem] font-medium tracking-wide transition-all ${
                    size === i
                      ? "border-gold bg-gold/10 text-bone"
                      : "border-white/12 text-bone/60 hover:border-white/30 hover:text-bone"
                  }`}
                >
                  {s.ml}
                </button>
              ))}
              <span className="ml-auto font-display text-3xl text-gold-grad">
                {formatPrice(SIZES[size].price)}
              </span>
            </div>

            <MagneticButton
              strength={0.2}
              onClick={() =>
                add({
                  id: "obsidienne",
                  name: "Obsidienne",
                  price: SIZES[size].price,
                  img: "/products/obsidienne.jpg",
                  size: SIZES[size].ml,
                })
              }
              className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_18px_40px_-12px_rgba(204,168,105,0.6)] sm:w-auto sm:px-14"
            >
              Add to bag — {SIZES[size].ml}
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>

            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-bone-mute">
              Complimentary 2ml sample · Cash on delivery · 58 wilayas
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
