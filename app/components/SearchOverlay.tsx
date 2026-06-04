"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { CATALOG, type Product } from "./catalog";
import { formatPrice } from "./format";
import { getLenis } from "./lenisStore";

const EASE = [0.16, 1, 0.3, 1] as const;
const POPULAR = ["Oud", "Rose", "Amber", "Vetiver", "Citrus", "Musk"];

const wordStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};
const wordItem: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

function ProductCard({ p, onClose }: { p: Product; onClose: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 26, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: EASE }}
      className="w-[14rem] shrink-0 sm:w-[15.5rem]"
    >
      <Link
        href={`/product/${p.id}`}
        onClick={onClose}
        aria-label={`View ${p.name}`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)]"
      >
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="248px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink/40 text-bone/80 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:opacity-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>

        {p.tag && (
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink/40 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.2em] text-gold-soft backdrop-blur-md">
            {p.tag}
          </span>
        )}

        <div className="absolute inset-x-4 bottom-4">
          <p className="font-display text-lg leading-tight text-bone">{p.name}</p>
          <p className="mt-0.5 text-[0.56rem] uppercase tracking-[0.18em] text-bone-mute">
            {p.notes}
          </p>
          <p className="mt-1.5 font-display text-gold-grad">{formatPrice(p.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return CATALOG.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.notes.toLowerCase().includes(term) ||
        p.cat.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[85] overflow-hidden bg-ink"
        >
          {/* atmosphere */}
          <div className="mist mist-gold right-[8%] top-[6%] h-[28rem] w-[28rem] opacity-30" />
          <div className="mist mist-rose -left-[4%] bottom-[4%] h-[24rem] w-[24rem] opacity-25" />

          <div className="relative mx-auto flex h-dvh max-w-7xl flex-col px-6 sm:px-10">
            {/* top bar */}
            <motion.div
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              className="flex items-center justify-between py-7"
            >
              <span className="eyebrow">Search the Maison</span>
              <button
                onClick={onClose}
                className="group flex items-center gap-2.5"
                aria-label="Close search"
              >
                <span className="text-[0.66rem] uppercase tracking-[0.2em] text-bone-mute transition-colors group-hover:text-bone">
                  Close
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-bone/80 transition-colors group-hover:border-gold/50 group-hover:text-gold">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </span>
              </button>
            </motion.div>

            {/* giant input */}
            <motion.div
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.16, duration: 0.7, ease: EASE }}
              className="mt-[5vh]"
            >
              <div className="flex items-center gap-4 border-b border-white/15 pb-5 transition-colors focus-within:border-gold/60">
                <svg className="h-6 w-6 shrink-0 text-gold sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />
                </svg>
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Type a scent…"
                  className="w-full bg-transparent font-display text-[clamp(2rem,7vw,5rem)] font-light leading-none text-bone caret-gold placeholder:text-bone-mute/40 focus:outline-none"
                />
              </div>
              <p className="mt-4 text-[0.72rem] uppercase tracking-[0.22em] text-bone-mute">
                {q.trim()
                  ? `${results.length} ${
                      results.length === 1 ? "fragrance" : "fragrances"
                    }`
                  : "Search by name, note, or mood"}
              </p>
            </motion.div>

            {/* results / trending */}
            <div className="relative mt-8 flex-1 overflow-hidden">
              {q.trim() === "" ? (
                <motion.div
                  variants={wordStagger}
                  initial="hidden"
                  animate="show"
                  className="pt-2"
                >
                  <p className="eyebrow mb-6">Trending notes</p>
                  <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                    {POPULAR.map((w) => (
                      <motion.button
                        key={w}
                        variants={wordItem}
                        onClick={() => setQ(w)}
                        className="font-display text-[clamp(1.7rem,4.5vw,3.4rem)] font-light italic text-bone-dim transition-colors duration-300 hover:text-gold-soft"
                      >
                        {w}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : results.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="pt-4"
                >
                  <p className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-light text-bone">
                    Nothing matches &ldquo;{q}&rdquo;.
                  </p>
                  <p className="mt-3 text-bone-dim">
                    Try a note like{" "}
                    <button
                      onClick={() => setQ("oud")}
                      className="text-gold underline-offset-4 hover:underline"
                    >
                      oud
                    </button>
                    ,{" "}
                    <button
                      onClick={() => setQ("rose")}
                      className="text-gold underline-offset-4 hover:underline"
                    >
                      rose
                    </button>
                    , or{" "}
                    <button
                      onClick={() => setQ("citrus")}
                      className="text-gold underline-offset-4 hover:underline"
                    >
                      citrus
                    </button>
                    .
                  </p>
                </motion.div>
              ) : (
                <div className="flex h-full items-center gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <AnimatePresence mode="popLayout">
                    {results.map((p) => (
                      <ProductCard key={p.id} p={p} onClose={onClose} />
                    ))}
                  </AnimatePresence>
                  <div className="w-2 shrink-0" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
