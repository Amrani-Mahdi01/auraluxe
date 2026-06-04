"use client";

import { useEffect, useState } from "react";

// True on touch devices (phones/tablets), where heavy blur/scroll animations
// cause jank. Desktop (mouse) keeps the full motion.
export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return mobile;
}
