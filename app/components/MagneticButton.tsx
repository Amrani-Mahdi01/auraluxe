"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.35,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick,
    style: { x: sx, y: sy },
    className,
  };

  if (href) {
    return (
      <motion.a ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref as Ref<HTMLButtonElement>} {...shared}>
      {children}
    </motion.button>
  );
}
