import Image from "next/image";
import Link from "next/link";

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Fragrances", href: "/shop" },
      { label: "Discovery Set", href: "/shop" },
      { label: "Bestsellers", href: "/shop?sort=featured" },
      { label: "New In", href: "/shop" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "Our Story", href: "/#story" },
      { label: "Savoir-faire", href: "/#craft" },
      { label: "The Spotlight", href: "/#spotlight" },
      { label: "Reviews", href: "/#reviews" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Delivery", href: "/help#delivery" },
      { label: "Returns", href: "/help#returns" },
      { label: "FAQ", href: "/help#faq" },
    ],
  },
];

const LINK_CLASS =
  "text-[0.88rem] text-bone-dim transition-colors hover:text-bone";

function FooterLink({ href, label }: FooterLink) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={LINK_CLASS}>
        {label}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={LINK_CLASS}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-2/40 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* top */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="AuraLuxe Cosmetics"
                width={722}
                height={555}
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-bone-dim">
              Niche fragrances composed and hand-poured in Grasse, France. Small
              batches, rare materials, the patience of memory.
            </p>
            <div className="mt-6 space-y-1.5 text-[0.88rem] text-bone-dim">
              <a
                href="mailto:concierge@auraluxe.com"
                className="block underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                concierge@auraluxe.com
              </a>
              <a
                href="tel:+213560000000"
                className="block underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                +213 560 00 00 00
              </a>
              <p className="text-bone-mute">Alger · Livraison 58 wilayas</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[0.65rem] uppercase tracking-[0.24em] text-gold">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink href={l.href} label={l.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 py-7 text-[0.72rem] text-bone-mute md:flex-row">
          <p>© 2026 AuraLuxe — Alger, Algérie · Paiement à la livraison.</p>
          <div className="flex items-center gap-6">
            <Link href="/help" className="transition-colors hover:text-bone">
              Delivery &amp; FAQ
            </Link>
            <Link href="/shop" className="transition-colors hover:text-bone">
              Shop
            </Link>
          </div>
        </div>
      </div>

      {/* giant ghost wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-6 text-center"
      >
        <p className="font-display text-[clamp(3.5rem,18vw,16rem)] font-light leading-none text-bone/[0.04]">
          AuraLuxe
        </p>
      </div>
    </footer>
  );
}
