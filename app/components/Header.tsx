"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./CartContext";
import SearchOverlay from "./SearchOverlay";

const NAV = [
  { label: "Shop", to: "/shop" },
  { label: "Fragrances", to: "#collection" },
  { label: "The House", to: "#story" },
  { label: "Savoir-faire", to: "#craft" },
];

const ANNOUNCEMENTS = [
  "Free delivery over 12 000 DA — 58 wilayas",
  "Cash on delivery nationwide",
  "Free 2ml sample with every order",
];

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export default function Header() {
  const { count, open: openCart } = useCart();
  const pathname = usePathname();
  // On the homepage, section links are smooth in-page anchors; elsewhere they
  // route home first (e.g. "/#story") so they always work.
  const hrefFor = (to: string) =>
    to.startsWith("#") && pathname !== "/" ? `/${to}` : to;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setMsg((m) => (m + 1) % ANNOUNCEMENTS.length),
      3800
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ⌘K / Ctrl+K toggles search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="relative overflow-hidden border-b border-white/5 bg-ink-2/60 backdrop-blur-sm">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={msg}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="whitespace-nowrap text-center text-[0.58rem] font-medium uppercase tracking-[0.1em] sm:text-[0.68rem] sm:tracking-[0.28em]"
            >
              <span className="shimmer">{ANNOUNCEMENTS[msg]}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main nav */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(12,10,8,0.72)"
            : "rgba(12,10,8,0)",
          borderColor: scrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.4 }}
        className="border-b backdrop-blur-md"
        style={{ backdropFilter: scrolled ? "blur(14px)" : "blur(0px)" }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20">
          {/* Left: desktop nav */}
          <ul className="hidden flex-1 items-center gap-8 lg:flex">
            {NAV.slice(0, 2).map((item) => (
              <NavLink key={item.label} label={item.label} href={hrefFor(item.to)} />
            ))}
          </ul>

          {/* Center: logo */}
          <Link
            href="/"
            className="flex shrink-0 select-none items-center transition-opacity hover:opacity-80"
            aria-label="AuraLuxe home"
          >
            <Image
              src="/logo.png"
              alt="AuraLuxe Cosmetics"
              width={722}
              height={555}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          {/* Right: nav + icons */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <ul className="hidden items-center gap-8 lg:flex">
              {NAV.slice(2).map((item) => (
                <NavLink key={item.label} label={item.label} href={hrefFor(item.to)} />
              ))}
            </ul>

            <div className="hidden h-5 w-px bg-white/10 lg:block" />

            <button
              onClick={() => setSearchOpen(true)}
              className="text-bone/80 transition-colors hover:text-gold"
              aria-label="Search"
            >
              <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />
            </button>
            <button
              onClick={openCart}
              className="relative text-bone/80 transition-colors hover:text-gold"
              aria-label={`Open bag, ${count} items`}
            >
              <Icon d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 18 }}
                    className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(true)}
              className="text-bone/90 lg:hidden"
              aria-label="Open menu"
            >
              <Icon d="M4 7h16M4 12h16M4 17h16" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-7">
              <Image
                src="/logo.png"
                alt="AuraLuxe Cosmetics"
                width={722}
                height={555}
                className="h-10 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-bone"
                aria-label="Close menu"
              >
                <Icon d="M6 6l12 12M18 6 6 18" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2 px-6">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                    duration: 0.5,
                  }}
                >
                  {hrefFor(item.to).startsWith("/") ? (
                    <Link
                      href={hrefFor(item.to)}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/5 py-5 font-display text-4xl text-bone transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={hrefFor(item.to)}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/5 py-5 font-display text-4xl text-bone transition-colors hover:text-gold"
                    >
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="absolute bottom-10 left-6 right-6">
              <p className="eyebrow mb-3">Find us</p>
              <p className="font-display text-lg italic text-bone-dim">
                12 Rue des Parfumeurs, Grasse
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const cls =
    "group relative text-[0.82rem] font-medium uppercase tracking-[0.16em] text-bone/75 transition-colors hover:text-bone";
  const inner = (
    <>
      {label}
      <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-gold to-rose transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
    </>
  );
  return (
    <li>
      {href.startsWith("/") ? (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      ) : (
        <a href={href} className={cls}>
          {inner}
        </a>
      )}
    </li>
  );
}
