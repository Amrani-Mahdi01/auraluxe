"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useIsMobile } from "./useIsMobile";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      className={className}
      initial={
        isMobile ? { opacity: 0, y } : { opacity: 0, y, filter: "blur(8px)" }
      }
      whileInView={
        isMobile
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: isMobile ? 0.55 : 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
