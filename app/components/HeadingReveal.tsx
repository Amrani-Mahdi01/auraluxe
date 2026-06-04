"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const wordV: Variants = {
  hidden: { opacity: 0, y: "0.5em", rotateX: -78 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

type Segment = { text: string; className?: string };

/**
 * Splits a heading into words and flips each one upright in 3D
 * (rotateX + rise + blur), staggered, the first time it scrolls in.
 * `segments` lets part of the heading carry its own styling (e.g. gold italic).
 */
export default function HeadingReveal({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      className={className}
    >
      {segments.map((seg, si) =>
        seg.text.split(" ").map((w, wi) => (
          <span
            key={`${si}-${wi}`}
            className="mr-[0.24em] inline-block"
            style={{ perspective: 600 }}
          >
            <motion.span
              variants={wordV}
              className={`inline-block ${seg.className ?? ""}`}
              style={{ transformOrigin: "bottom center" }}
            >
              {w}
            </motion.span>
          </span>
        ))
      )}
    </motion.h2>
  );
}
