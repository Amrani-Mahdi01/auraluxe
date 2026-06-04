"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const PARTICLES = [
  { left: "18%", size: 5, delay: 0, dur: 7 },
  { left: "32%", size: 3, delay: 1.4, dur: 9 },
  { left: "47%", size: 6, delay: 2.6, dur: 8 },
  { left: "58%", size: 4, delay: 0.8, dur: 10 },
  { left: "70%", size: 3, delay: 3.2, dur: 7.5 },
  { left: "82%", size: 5, delay: 2, dur: 9.5 },
  { left: "26%", size: 2, delay: 4, dur: 8.5 },
  { left: "64%", size: 2, delay: 1.1, dur: 11 },
];

export default function PerfumeBottle() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(useTransform(px, [-1, 1], [16, -16]), {
    stiffness: 120,
    damping: 18,
  });
  const rotX = useSpring(useTransform(py, [-1, 1], [-12, 12]), {
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

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* rotating aura behind the bottle */}
      <div className="absolute h-[26rem] w-[26rem] rounded-full aura-halo opacity-80" />
      <div className="absolute h-[34rem] w-[34rem] rounded-full bg-gold/5 blur-3xl" />

      {/* rising particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle bottom-24"
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

      {/* the floating + tilting flacon */}
      <motion.div
        className="relative float-y"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* spray cap */}
          <div className="h-3 w-9 rounded-t-md flacon-cap" />
          <div className="h-6 w-12 rounded-sm flacon-cap" />
          {/* collar */}
          <div className="h-2.5 w-16 rounded-sm bg-gradient-to-b from-gold-soft/60 to-gold-deep/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]" />
          {/* neck */}
          <div className="h-5 w-10 rounded-none border-x border-t-0 flacon-glass" />

          {/* body */}
          <div className="relative h-72 w-56 overflow-hidden rounded-[2rem] flacon-glass">
            {/* liquid */}
            <div className="absolute inset-x-0 bottom-0 h-[62%] flacon-liquid rounded-b-[2rem]">
              <div className="absolute inset-x-0 top-0 h-2 bg-white/30 blur-[2px]" />
            </div>
            {/* moving shine */}
            <div className="absolute -inset-y-6 -left-1/2 w-[60%] flacon-shine rotate-6" />
            {/* engraved label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
              <span className="font-display text-2xl tracking-[0.12em] text-ink/80 drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]">
                AURALUXE
              </span>
              <span className="h-px w-10 bg-ink/30" />
              <span className="text-[0.55rem] uppercase tracking-[0.4em] text-ink/60">
                Eau de Parfum
              </span>
              <span className="mt-1 font-display text-[0.7rem] italic tracking-wide text-ink/50">
                N°01 · Noir
              </span>
            </div>
          </div>

          {/* floor reflection */}
          <div className="mt-3 h-16 w-48 rounded-[50%] bg-gold/20 blur-2xl" />
        </div>
      </motion.div>
    </div>
  );
}
