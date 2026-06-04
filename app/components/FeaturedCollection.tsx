"use client";

/* Imagery: Unsplash — brand-neutral placeholder product photography
   obsidienne Puscas Adryan · soleil Emily Wang · rose Siora Photography
   ecarlate Aleksandar Kyng · vetiver Klim Musalimov · fleur Zulian Firmansyah */

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { CATALOG } from "./catalog";
import { formatPrice } from "./format";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import HeadingReveal from "./HeadingReveal";
import { useCart } from "./CartContext";

const EASE = [0.16, 1, 0.3, 1] as const;

const FILTERS = ["All", "Femme", "Homme", "Unisexe"] as const;

const header: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7 7-7Z" />
    </svg>
  );
}

export default function FeaturedCollection() {
  const { add } = useCart();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [wish, setWish] = useState<Set<string>>(new Set());

  const toggleWish = (id: string) =>
    setWish((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const shown =
    filter === "All" ? CATALOG : CATALOG.filter((p) => p.cat === filter);

  return (
    <section
      id="collection"
      className="relative mx-auto max-w-7xl scroll-mt-28 px-6 py-28 md:py-36"
    >
      {/* heading */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <Reveal className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">The Collection</span>
          </Reveal>
          <Parallax distance={30}>
            <HeadingReveal
              className="font-display text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[0.95] text-bone"
              segments={[
                { text: "Signature" },
                { text: "fragrances", className: "italic text-gold-grad" },
              ]}
            />
          </Parallax>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-bone-dim">
              Each composition is aged for six weeks and bottled by hand — a
              curated wardrobe of scent for every hour of the day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="hidden md:block">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-bone/80 transition-colors hover:text-gold"
          >
            View all
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>

      {/* filter tabs */}
      <motion.div
        variants={header}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors ${
              filter === f ? "text-ink" : "text-bone/70 hover:text-bone"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-soft to-gold"
                transition={{ duration: 0.5, ease: EASE }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </motion.div>

      {/* grid */}
      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <motion.article
            key={p.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-ink-2">
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" />

              <Link
                href={`/product/${p.id}`}
                aria-label={p.name}
                className="absolute inset-0 z-10"
              />

              {/* tag */}
              {p.tag && (
                <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-ink/40 px-3 py-1 text-[0.58rem] uppercase tracking-[0.22em] text-gold-soft backdrop-blur-md">
                  {p.tag}
                </span>
              )}

              {/* wishlist */}
              <button
                onClick={() => toggleWish(p.id)}
                aria-label={`Save ${p.name}`}
                aria-pressed={wish.has(p.id)}
                className={`absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/15 backdrop-blur-md transition-colors ${
                  wish.has(p.id)
                    ? "bg-gold/20 text-rose"
                    : "bg-ink/40 text-bone/80 hover:text-rose"
                }`}
              >
                <Heart filled={wish.has(p.id)} />
              </button>

              {/* quick add */}
              <div className="absolute inset-x-4 bottom-4 z-20 translate-y-[140%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                <button
                  onClick={() =>
                    add({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      img: p.img,
                    })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_14px_30px_-10px_rgba(204,168,105,0.7)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  Add to bag
                  <span aria-hidden>+</span>
                </button>
              </div>
            </div>

            {/* info */}
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl text-bone transition-colors group-hover:text-gold-soft">
                  <Link href={`/product/${p.id}`}>{p.name}</Link>
                </h3>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-bone-mute">
                  {p.notes}
                </p>
              </div>
              <span className="font-display text-lg text-gold-grad">
                {formatPrice(p.price)}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
