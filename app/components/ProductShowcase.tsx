"use client";

/* Imagery: Unsplash — brand-neutral placeholder product photography
   obsidienne Puscas Adryan · soleil Emily Wang · rose Siora Photography · ecarlate Aleksandar Kyng */

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const PRODUCTS = [
  {
    id: "obsidienne",
    name: "Obsidienne",
    notes: "Oud · Amber · Incense",
    price: "$240",
    img: "/products/obsidienne.jpg",
    glow: "rgba(204,168,105,0.55)",
  },
  {
    id: "soleil",
    name: "Soleil d'Or",
    notes: "Amber · Honey · Vanilla",
    price: "$210",
    img: "/products/soleil.jpg",
    glow: "rgba(214,170,96,0.5)",
  },
  {
    id: "rose",
    name: "Rose Mémoire",
    notes: "Rose · Peony · Musk",
    price: "$185",
    img: "/products/rose.jpg",
    glow: "rgba(216,150,172,0.5)",
  },
  {
    id: "ecarlate",
    name: "Écarlate",
    notes: "Saffron · Red Fruits · Leather",
    price: "$225",
    img: "/products/ecarlate.jpg",
    glow: "rgba(200,96,96,0.45)",
  },
];

const PARTICLES = [
  { left: "16%", size: 5, delay: 0, dur: 7.5 },
  { left: "34%", size: 3, delay: 1.6, dur: 9 },
  { left: "52%", size: 4, delay: 2.8, dur: 8 },
  { left: "72%", size: 3, delay: 0.9, dur: 10 },
  { left: "86%", size: 5, delay: 3.4, dur: 9.5 },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // pointer-driven 3D tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(useTransform(px, [-1, 1], [13, -13]), {
    stiffness: 120,
    damping: 18,
  });
  const rotX = useSpring(useTransform(py, [-1, 1], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [px, py]);

  // gentle auto-rotation, paused on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % PRODUCTS.length),
      5000
    );
    return () => clearInterval(id);
  }, [paused]);

  const current = PRODUCTS[active];

  return (
    <div
      className="relative flex flex-col items-center gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ perspective: "1300px" }}
    >
      {/* glow + aura behind frame */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full blur-[80px]"
        animate={{ backgroundColor: current.glow }}
        transition={{ duration: 0.9 }}
      />
      <div className="absolute left-1/2 top-1/3 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full aura-halo opacity-60" />

      {/* rising particles */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle bottom-28"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* tilting frame */}
      <motion.div
        className="relative z-10 float-y"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-[3/4] w-[clamp(16rem,74vw,22rem)] overflow-hidden rounded-[2.2rem] border border-white/15 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)]">
          {/* stacked images for instant crossfade */}
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                scale: i === active ? 1 : 1.08,
              }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Image
                src={p.img}
                alt={p.name}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 74vw, 360px"
                className="object-cover"
              />
            </motion.div>
          ))}

          {/* blend + vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-ink/25" />
          <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-40px_70px_rgba(12,10,8,0.5)]" />

          {/* bestseller tag */}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-[0.6rem] uppercase tracking-[0.24em] text-bone/90">
              Bestseller
            </span>
          </div>

          {/* info chip */}
          <div className="absolute inset-x-4 bottom-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-end justify-between gap-3 rounded-2xl border border-white/10 bg-ink/45 px-4 py-3 backdrop-blur-md"
              >
                <div>
                  <h3 className="font-display text-xl leading-tight text-bone">
                    {current.name}
                  </h3>
                  <p className="mt-0.5 text-[0.62rem] uppercase tracking-[0.2em] text-bone-mute">
                    {current.notes}
                  </p>
                </div>
                <span className="font-display text-lg text-gold-grad">
                  {current.price}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* floor reflection */}
        <div className="mx-auto mt-4 h-12 w-3/4 rounded-[50%] bg-gold/15 blur-2xl" />
      </motion.div>

      {/* thumbnail switcher */}
      <div className="relative z-10 flex items-center gap-3">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            aria-label={`View ${p.name}`}
            className={`group relative h-14 w-14 overflow-hidden rounded-xl border transition-all duration-500 ${
              i === active
                ? "scale-110 border-gold shadow-[0_8px_24px_-6px_rgba(204,168,105,0.6)]"
                : "border-white/10 opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={p.img}
              alt={p.name}
              fill
              sizes="56px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {i === active && (
              <motion.span
                layoutId="thumb-ring"
                className="absolute inset-0 rounded-xl ring-2 ring-gold ring-offset-2 ring-offset-ink"
                transition={{ duration: 0.4, ease: EASE }}
              />
            )}
          </button>
        ))}
      </div>

      <p className="text-[0.58rem] uppercase tracking-[0.3em] text-bone-mute/70">
        Photography · Unsplash
      </p>
    </div>
  );
}
