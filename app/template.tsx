"use client";

import { motion } from "motion/react";

// Plays on every route change (Next.js remounts template.tsx per navigation).
const EASE = [0.76, 0, 0.24, 1] as const;
const COLS = 6;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      {/* shutter reveal — panels split apart to unveil the new page */}
      <div className="pointer-events-none fixed inset-0 z-[120] flex">
        {Array.from({ length: COLS }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: i % 2 === 0 ? "-100%" : "100%" }}
            transition={{ duration: 0.62, ease: EASE, delay: i * 0.05 }}
            className="relative h-full flex-1 bg-gradient-to-b from-ink-2 to-ink"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          </motion.div>
        ))}
      </div>
    </>
  );
}
