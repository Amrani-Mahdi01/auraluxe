"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useIsMobile } from "./useIsMobile";

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blurN = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blurN, (v) => `blur(${v}px)`);
  const y = useTransform(progress, range, [12, 0]);

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className="mr-[0.24em] inline-block"
    >
      {children}
    </motion.span>
  );
}

/**
 * Splits text into words and scrubs each word's opacity/blur/position
 * to the section's scroll progress — words "ignite" as you scroll past.
 */
export default function ScrollReveal({
  children,
  className,
  start = 0.85,
  end = 0.32,
}: {
  children: string;
  className?: string;
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${start}`, `end ${end}`],
  });

  const words = children.split(" ");

  if (isMobile) {
    return <p className={className}>{children}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const s = i / words.length;
        const e = (i + 1) / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[s, e]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}
