import type Lenis from "lenis";

// Shared handle to the active Lenis instance so overlays (e.g. the cart
// drawer) can pause/resume smooth scrolling while they're open.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
