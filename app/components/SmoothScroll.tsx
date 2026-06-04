"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { setLenis } from "./lenisStore";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who prefer reduced motion — keep native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Use native scrolling on mobile (no Lenis smoothing on small screens).
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);

    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // Smoothly scroll in-page anchor links, offset for the fixed header.
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      const anchor =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      if (!document.querySelector(href)) return;
      e.preventDefault();
      const header = document.querySelector("header");
      const offset = header ? header.getBoundingClientRect().height : 116;
      lenis.scrollTo(href, { offset: -offset });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
