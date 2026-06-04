"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./CartContext";
import { formatPrice } from "./format";
import { getLenis } from "./lenisStore";

const EASE = [0.16, 1, 0.3, 1] as const;
const FREE_SHIP = 12000;

export default function CartDrawer() {
  const { lines, isOpen, close, remove, setQty, subtotal, count } = useCart();

  // Lock background scroll (and pause Lenis) while the drawer is open.
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIP) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col border-l border-white/10 bg-ink-2/95 shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
              <div className="flex items-baseline gap-2.5">
                <h2 className="font-display text-xl tracking-wide text-bone">
                  Your Bag
                </h2>
                <span className="text-[0.66rem] uppercase tracking-[0.2em] text-bone-mute">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-bone/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {/* free-shipping progress */}
            {lines.length > 0 && (
              <div className="border-b border-white/8 px-6 py-4">
                <p className="text-[0.74rem] text-bone-dim">
                  {remaining > 0 ? (
                    <>
                      You&rsquo;re{" "}
                      <span className="text-gold">{formatPrice(remaining)}</span>{" "}
                      from free delivery
                    </>
                  ) : (
                    <span className="text-gold">
                      ✦ Free delivery unlocked
                    </span>
                  )}
                </p>
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold-soft via-gold to-rose"
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </div>
              </div>
            )}

            {/* items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-white/10 text-gold/60">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <p className="mt-5 font-display text-xl text-bone">
                    Your bag is empty
                  </p>
                  <p className="mt-2 max-w-[16rem] text-sm text-bone-dim">
                    Every scent is hand-poured in Grasse. Find the one that
                    becomes yours.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full border border-gold/40 px-7 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-bone transition-colors hover:bg-gold/10"
                  >
                    Explore fragrances
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.key}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="flex gap-4"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
                          <Image
                            src={l.img}
                            alt={l.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-[1.05rem] leading-tight text-bone">
                                {l.name}
                              </p>
                              {l.size && (
                                <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-bone-mute">
                                  {l.size}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => remove(l.key)}
                              className="text-[0.66rem] uppercase tracking-[0.12em] text-bone-mute transition-colors hover:text-rose"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center gap-3 rounded-full border border-white/12 px-1">
                              <button
                                onClick={() => setQty(l.key, l.qty - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-7 w-7 place-items-center text-bone/80 transition-colors hover:text-gold"
                              >
                                –
                              </button>
                              <span className="min-w-4 text-center text-sm tabular-nums text-bone">
                                {l.qty}
                              </span>
                              <button
                                onClick={() => setQty(l.key, l.qty + 1)}
                                aria-label="Increase quantity"
                                className="grid h-7 w-7 place-items-center text-bone/80 transition-colors hover:text-gold"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-display text-lg text-gold-grad">
                              {formatPrice(l.price * l.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* footer */}
            {lines.length > 0 && (
              <div className="border-t border-white/8 px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-bone-dim">Subtotal</span>
                  <span className="font-display text-2xl text-bone">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[0.66rem] text-bone-mute">
                  Delivery calculated at checkout · Cash on delivery available.
                </p>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_18px_40px_-12px_rgba(204,168,105,0.6)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  Checkout
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <button
                  onClick={close}
                  className="mt-3 w-full text-center text-[0.7rem] uppercase tracking-[0.16em] text-bone-mute transition-colors hover:text-bone"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
