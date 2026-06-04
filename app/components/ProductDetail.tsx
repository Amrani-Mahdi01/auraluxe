"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { CATALOG, type Product } from "./catalog";
import { useCart } from "./CartContext";
import { formatPrice } from "./format";
import MagneticButton from "./MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const roundDA = (n: number) => Math.round(n / 100) * 100;
const SIZES = [
  { ml: "50ml", mult: 1 },
  { ml: "100ml", mult: 1.4 },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

const DETAILS = [
  "Cash on delivery — paiement à la livraison",
  "Delivery to all 58 wilayas in 24–72h",
  "Complimentary 2ml sample with every order",
  "Vegan, cruelty-free & long-lasting",
];

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(1);

  const sizePrice = roundDA(product.price * SIZES[size].mult);

  const pyramid = [
    { tier: "Top", width: "46%", notes: product.top },
    { tier: "Heart", width: "72%", notes: product.heart },
    { tier: "Base", width: "100%", notes: product.base },
  ];

  const related = [
    ...CATALOG.filter((p) => p.id !== product.id && p.family === product.family),
    ...CATALOG.filter((p) => p.id !== product.id && p.family !== product.family),
  ].slice(0, 3);

  const addToBag = () => {
    for (let i = 0; i < qty; i++) {
      add({
        id: product.id,
        name: product.name,
        price: sizePrice,
        img: product.img,
        size: SIZES[size].ml,
      });
    }
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-32 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[90px]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-white/12 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)]">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                <div className="absolute left-5 top-5 flex gap-2">
                  {product.tag && (
                    <span className="rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-gold-soft backdrop-blur-md">
                      {product.tag}
                    </span>
                  )}
                  <span className="rounded-full border border-white/10 bg-ink/40 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.2em] text-bone/70 backdrop-blur-md">
                    {product.family}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <nav className="mb-6 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-bone-mute">
              <Link href="/shop" className="transition-colors hover:text-gold">
                Shop
              </Link>
              <span>/</span>
              <span className="text-bone/70">{product.cat}</span>
            </nav>

            <h1 className="font-display text-[clamp(2.8rem,6vw,4.6rem)] font-light leading-[0.95] text-bone">
              {product.name}
            </h1>
            <p className="mt-2 text-[0.72rem] uppercase tracking-[0.3em] text-bone-mute">
              Eau de Parfum · {product.notes}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <Stars />
              <span className="text-[0.78rem] text-bone-dim">4.8 · 184 reviews</span>
            </div>

            <p className="mt-6 max-w-md text-[0.97rem] leading-relaxed text-bone-dim">
              {product.description}
            </p>

            {/* pyramid */}
            <div className="mt-9 space-y-4">
              {pyramid.map((p, i) => (
                <motion.div
                  key={p.tier}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.12 }}
                >
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
                      {p.tier} Notes
                    </span>
                    <span className="text-[0.82rem] text-bone/90">{p.notes}</span>
                  </div>
                  <div className="h-px w-full bg-white/[0.08]">
                    <motion.div
                      className="h-px bg-gradient-to-r from-gold to-rose"
                      initial={{ width: 0 }}
                      animate={{ width: p.width }}
                      transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.12 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* size */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {SIZES.map((s, i) => (
                <button
                  key={s.ml}
                  onClick={() => setSize(i)}
                  className={`rounded-full border px-5 py-2.5 text-[0.78rem] font-medium tracking-wide transition-all ${
                    size === i
                      ? "border-gold bg-gold/10 text-bone"
                      : "border-white/12 text-bone/60 hover:border-white/30 hover:text-bone"
                  }`}
                >
                  {s.ml}
                </button>
              ))}
              <span className="ml-auto font-display text-3xl text-gold-grad">
                {formatPrice(sizePrice)}
              </span>
            </div>

            {/* qty + add */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-white/12 px-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-10 w-10 place-items-center text-bone/80 transition-colors hover:text-gold"
                >
                  –
                </button>
                <span className="min-w-5 text-center tabular-nums text-bone">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="grid h-10 w-10 place-items-center text-bone/80 transition-colors hover:text-gold"
                >
                  +
                </button>
              </div>

              <MagneticButton
                strength={0.2}
                onClick={addToBag}
                className="group order-last flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_18px_40px_-12px_rgba(204,168,105,0.6)] sm:order-none sm:w-auto sm:flex-1"
              >
                Add to bag
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </MagneticButton>
            </div>

            {/* details list */}
            <ul className="mt-9 space-y-3 border-t border-white/8 pt-7">
              {DETAILS.map((d) => (
                <li key={d} className="flex items-center gap-3 text-[0.88rem] text-bone-dim">
                  <span className="text-gold">✦</span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* related */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-bone">
            You may also <span className="italic text-gold-grad">love</span>
          </h2>
          <Link
            href="/shop"
            className="group hidden items-center gap-2 text-sm uppercase tracking-[0.16em] text-bone/80 transition-colors hover:text-gold md:inline-flex"
          >
            All fragrances
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
          {related.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 90vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg text-bone transition-colors group-hover:text-gold-soft">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-bone-mute">
                    {p.notes}
                  </p>
                </div>
                <span className="font-display text-gold-grad">
                  {formatPrice(p.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
