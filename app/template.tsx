"use client";

import { motion } from "motion/react";

// Plays on every route change (Next.js remounts template.tsx per navigation):
// a single clean curtain that lifts up to reveal the new page.
const EASE = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none fixed inset-0 z-[120] bg-gradient-to-b from-ink-2 to-ink"
      >
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </motion.div>
    </>
  );
}
