"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATALOG, type Family, type Product } from "./catalog";
import { useCart } from "./CartContext";
import { formatPrice } from "./format";
import Reveal from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const FILTERS = ["All", "Femme", "Homme", "Unisexe"] as const;
type Filter = (typeof FILTERS)[number];

const FAMILIES: Family[] = ["Floral", "Woody", "Amber", "Fresh", "Spicy"];
const NOTE_FILTERS = [
  "Oud",
  "Rose",
  "Amber",
  "Citrus",
  "Musk",
  "Vetiver",
  "Vanilla",
  "Jasmine",
  "Leather",
  "Saffron",
  "Sandalwood",
  "Incense",
];

const PRICE_MIN = 8000;
const PRICE_MAX = 15000;
const PRICE_STEP = 500;

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "name", label: "Name: A–Z" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

const toggle = (setter: Dispatch<SetStateAction<Set<string>>>, value: string) =>
  setter((prev) => {
    const next = new Set(prev);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  });

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
        active
          ? "border-gold bg-gold text-ink"
          : "border-white/12 text-bone/70 hover:border-gold/40 hover:text-bone"
      }`}
    >
      {children}
    </button>
  );
}

function PriceSlider({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const [min, max] = value;
  const pctMin = ((min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const pctMax = ((max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  return (
    <div>
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-white/10" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-gold to-rose"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={min}
          onChange={(e) =>
            onChange([Math.min(Number(e.target.value), max - PRICE_STEP), max])
          }
          aria-label="Minimum price"
          className="price-thumb absolute top-0 h-6 w-full"
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={max}
          onChange={(e) =>
            onChange([min, Math.max(Number(e.target.value), min + PRICE_STEP)])
          }
          aria-label="Maximum price"
          className="price-thumb absolute top-0 h-6 w-full"
        />
      </div>
      <div className="mt-1 flex justify-between text-[0.74rem] text-bone-dim">
        <span>{formatPrice(min)}</span>
        <span>
          {formatPrice(max)}
          {max >= PRICE_MAX ? "+" : ""}
        </span>
      </div>
    </div>
  );
}

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

function ShopCard({
  p,
  index,
  wished,
  onWish,
  onAdd,
}: {
  p: Product;
  index: number;
  wished: boolean;
  onWish: () => void;
  onAdd: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.08 }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-ink-2">
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" />

        <Link
          href={`/product/${p.id}`}
          aria-label={p.name}
          className="absolute inset-0 z-10"
        />

        <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2">
          {p.tag && (
            <span className="rounded-full border border-white/15 bg-ink/40 px-3 py-1 text-[0.58rem] uppercase tracking-[0.22em] text-gold-soft backdrop-blur-md">
              {p.tag}
            </span>
          )}
          <span className="hidden rounded-full border border-white/10 bg-ink/40 px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-bone/70 backdrop-blur-md sm:inline-block">
            {p.family}
          </span>
        </div>

        <button
          onClick={onWish}
          aria-label={`Save ${p.name}`}
          aria-pressed={wished}
          className={`absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/15 backdrop-blur-md transition-colors ${
            wished ? "bg-gold/20 text-rose" : "bg-ink/40 text-bone/80 hover:text-rose"
          }`}
        >
          <Heart filled={wished} />
        </button>

        <div className="absolute inset-x-4 bottom-4 z-20 translate-y-[140%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={onAdd}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_14px_30px_-10px_rgba(204,168,105,0.7)] transition-transform duration-300 hover:scale-[1.02]"
          >
            Add to bag
            <span aria-hidden>+</span>
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
          <h3 className="font-display text-base leading-tight text-bone transition-colors group-hover:text-gold-soft sm:text-xl">
            <Link href={`/product/${p.id}`}>{p.name}</Link>
          </h3>
          <span className="mt-0.5 whitespace-nowrap font-display text-base text-gold-grad sm:mt-0 sm:shrink-0 sm:text-lg">
            {formatPrice(p.price)}
          </span>
        </div>
        <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-bone-mute">
          {p.notes}
        </p>
      </div>
    </motion.article>
  );
}

export default function ShopGrid() {
  const { add } = useCart();
  const [category, setCategory] = useState<Filter>("All");
  const [families, setFamilies] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Set<string>>(new Set());
  const [price, setPrice] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [noteQuery, setNoteQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [wish, setWish] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  const priceActive = price[0] > PRICE_MIN || price[1] < PRICE_MAX;

  // --- read filters from the URL on mount (shareable links) ---
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const cat = p.get("cat");
    if (cat && (FILTERS as readonly string[]).includes(cat))
      setCategory(cat as Filter);
    const fam = p.get("family");
    if (fam)
      setFamilies(
        new Set(fam.split(",").filter((v) => (FAMILIES as string[]).includes(v)))
      );
    const nt = p.get("notes");
    if (nt) setNotes(new Set(nt.split(",").filter((v) => NOTE_FILTERS.includes(v))));
    const pr = p.get("price");
    if (pr) {
      const [a, b] = pr.split("-").map(Number);
      if (Number.isFinite(a) && Number.isFinite(b)) {
        setPrice([
          Math.max(PRICE_MIN, Math.min(a, b)),
          Math.min(PRICE_MAX, Math.max(a, b)),
        ]);
      }
    }
    const st = p.get("sort");
    if (st && SORTS.some((s) => s.key === st)) setSort(st as SortKey);
    if (p.toString()) setPanelOpen(true);
    setReady(true);
  }, []);

  // --- write filters back to the URL when they change ---
  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    if (category !== "All") p.set("cat", category);
    if (families.size) p.set("family", [...families].join(","));
    if (notes.size) p.set("notes", [...notes].join(","));
    if (priceActive) p.set("price", `${price[0]}-${price[1]}`);
    if (sort !== "featured") p.set("sort", sort);
    const qs = p.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
  }, [ready, category, families, notes, price, priceActive, sort]);

  const toggleWish = (id: string) => toggle(setWish, id);
  const addToBag = (p: Product) =>
    add({ id: p.id, name: p.name, price: p.price, img: p.img });

  const facetCount = families.size + notes.size + (priceActive ? 1 : 0);
  const hasActive = facetCount > 0 || category !== "All";

  const clearAll = () => {
    setCategory("All");
    setFamilies(new Set());
    setNotes(new Set());
    setPrice([PRICE_MIN, PRICE_MAX]);
  };

  const visible = useMemo(() => {
    const list = CATALOG.filter((p) => {
      if (category !== "All" && p.cat !== category) return false;
      if (families.size && !families.has(p.family)) return false;
      if (
        notes.size &&
        ![...notes].some((n) => p.notes.toLowerCase().includes(n.toLowerCase()))
      )
        return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      return true;
    });
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, families, notes, price, sort]);

  const visibleNotes = NOTE_FILTERS.filter((n) =>
    n.toLowerCase().includes(noteQuery.toLowerCase())
  );

  const chips: { k: string; label: string; remove: () => void }[] = [];
  if (category !== "All")
    chips.push({ k: "cat", label: category, remove: () => setCategory("All") });
  families.forEach((f) =>
    chips.push({ k: `f-${f}`, label: f, remove: () => toggle(setFamilies, f) })
  );
  notes.forEach((n) =>
    chips.push({ k: `n-${n}`, label: n, remove: () => toggle(setNotes, n) })
  );
  if (priceActive)
    chips.push({
      k: "price",
      label: `${formatPrice(price[0])} – ${formatPrice(price[1])}${price[1] >= PRICE_MAX ? "+" : ""}`,
      remove: () => setPrice([PRICE_MIN, PRICE_MAX]),
    });

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      {/* toolbar */}
      <div className="rounded-2xl border border-white/8 bg-ink/60 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setCategory(f)}
                className={`relative rounded-full px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors ${
                  category === f ? "text-ink" : "text-bone/70 hover:text-bone"
                }`}
              >
                {category === f && (
                  <motion.span
                    layoutId="shop-cat-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-soft to-gold"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPanelOpen((o) => !o)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
                panelOpen || facetCount
                  ? "border-gold/50 text-bone"
                  : "border-white/12 text-bone/70 hover:text-bone"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3 6h18M7 12h10M11 18h2" />
              </svg>
              Filters
              {facetCount > 0 && (
                <span className="grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-ink">
                  {facetCount}
                </span>
              )}
              <motion.svg
                animate={{ rotate: panelOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>

            <span className="hidden text-[0.66rem] uppercase tracking-[0.18em] text-bone-mute sm:block">
              {visible.length} {visible.length === 1 ? "scent" : "scents"}
            </span>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort fragrances"
                className="appearance-none rounded-full border border-white/12 bg-ink-2/60 py-2 pl-4 pr-9 text-[0.72rem] uppercase tracking-[0.12em] text-bone/85 focus:border-gold/50 focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key} className="bg-ink text-bone">
                    {s.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* expandable filter panel */}
        <AnimatePresence initial={false}>
          {panelOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid gap-7 border-t border-white/8 pt-6 sm:grid-cols-3">
                <div>
                  <p className="eyebrow mb-3">Olfactory family</p>
                  <div className="flex flex-wrap gap-2">
                    {FAMILIES.map((f) => (
                      <Pill key={f} active={families.has(f)} onClick={() => toggle(setFamilies, f)}>
                        {f}
                      </Pill>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="eyebrow mb-3">Notes</p>
                  <input
                    value={noteQuery}
                    onChange={(e) => setNoteQuery(e.target.value)}
                    placeholder="Filter notes…"
                    className="mb-3 w-full rounded-full border border-white/12 bg-ink-2/60 px-4 py-2 text-sm text-bone placeholder:text-bone-mute focus:border-gold/50 focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    {visibleNotes.length > 0 ? (
                      visibleNotes.map((n) => (
                        <Pill key={n} active={notes.has(n)} onClick={() => toggle(setNotes, n)}>
                          {n}
                        </Pill>
                      ))
                    ) : (
                      <span className="text-sm text-bone-mute">No notes found.</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="eyebrow mb-4">Price</p>
                  <PriceSlider value={price} onChange={setPrice} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* active chips */}
      <AnimatePresence initial={false}>
        {hasActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <AnimatePresence initial={false}>
                {chips.map((c) => (
                  <motion.button
                    key={c.k}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    onClick={c.remove}
                    className="group inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.1em] text-bone transition-colors hover:border-gold/60"
                  >
                    {c.label}
                    <span className="text-bone-mute transition-colors group-hover:text-gold">✕</span>
                  </motion.button>
                ))}
              </AnimatePresence>
              <button
                onClick={clearAll}
                className="ml-1 text-[0.66rem] uppercase tracking-[0.14em] text-bone-mute underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                Clear all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* grid */}
      {visible.length > 0 ? (
        <motion.div
          layout
          className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <ShopCard
              key={p.id}
              p={p}
              index={i}
              wished={wish.has(p.id)}
              onWish={() => toggleWish(p.id)}
              onAdd={() => addToBag(p)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-4 py-16 text-center">
          <p className="font-display text-2xl text-bone">No scents match those filters.</p>
          <button
            onClick={clearAll}
            className="rounded-full border border-gold/40 px-6 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-bone transition-colors hover:bg-gold/10"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* discovery set promo */}
      <Reveal className="mt-20">
        <div className="relative grid overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2/50 md:grid-cols-2">
          <div className="relative min-h-[18rem] overflow-hidden md:min-h-[24rem]">
            <Image
              src="/products/discovery.jpg"
              alt="AuraLuxe Discovery Set"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-ink/60" />
          </div>

          <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 md:p-14">
            <span className="eyebrow">Not sure where to begin?</span>
            <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1] text-bone">
              The Discovery <span className="italic text-gold-grad">Set</span>
            </h3>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-bone-dim">
              Eight 2ml vials of the entire maison — explore every accord, then
              redeem its full value against your first bottle.
            </p>
            <button
              onClick={() =>
                add({
                  id: "discovery",
                  name: "Discovery Set",
                  price: 4900,
                  img: "/products/discovery.jpg",
                })
              }
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-6 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink shadow-[0_18px_40px_-12px_rgba(204,168,105,0.6)] sm:w-fit sm:px-8 sm:text-sm sm:tracking-[0.14em]"
            >
              <span className="whitespace-nowrap">Add the set — 4 900 DA</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
