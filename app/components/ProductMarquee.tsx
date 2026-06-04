"use client";

import Image from "next/image";
import Link from "next/link";
import { CATALOG, type Product } from "./catalog";
import { formatPrice } from "./format";

const COL_A = CATALOG.slice(0, 4);
const COL_B = CATALOG.slice(4, 8);

function Card({ p }: { p: Product }) {
  return (
    <div className="mb-5">
      <Link
        href={`/product/${p.id}`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-[1.4rem] border border-white/10 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]"
      >
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 1024px) 42vw, 210px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        <div className="absolute inset-x-3.5 bottom-3">
          <p className="font-display text-[0.95rem] leading-tight text-bone">
            {p.name}
          </p>
          <p className="mt-0.5 text-[0.58rem] uppercase tracking-[0.22em] text-gold-soft">
            {formatPrice(p.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function ProductMarquee() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* glow + aura behind the columns */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[90px]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full aura-halo opacity-30" />

      <div className="vmarquee vmask grid h-[26rem] grid-cols-2 gap-5 overflow-hidden sm:h-[30rem] lg:h-[36rem]">
        {/* left column — drifts up */}
        <div>
          <div className="vtrack vtrack-up">
            {[...COL_A, ...COL_A].map((p, i) => (
              <Card key={i} p={p} />
            ))}
          </div>
        </div>

        {/* right column — drifts down (offset for rhythm) */}
        <div className="mt-8">
          <div className="vtrack vtrack-down">
            {[...COL_B, ...COL_B].map((p, i) => (
              <Card key={i} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
