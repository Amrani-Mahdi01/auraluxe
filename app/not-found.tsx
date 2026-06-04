import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

export default function NotFound() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Header />
      <main className="relative flex min-h-[88vh] items-center overflow-hidden px-6 py-32">
        <div className="mist mist-gold left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 opacity-25" />
        <div className="mist mist-rose right-[10%] bottom-[12%] h-[20rem] w-[20rem] opacity-20" />

        {/* giant ghost numerals */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[42vw] font-light leading-none text-bone/[0.04]"
        >
          404
        </span>

        <div className="relative mx-auto max-w-xl text-center">
          <Reveal className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Error 404</span>
            <span className="h-px w-8 bg-gold/60" />
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-[clamp(2.6rem,8vw,5rem)] font-light leading-[0.95] text-bone">
              This page has{" "}
              <span className="italic text-gold-grad">evaporated.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-[0.98rem] leading-relaxed text-bone-dim">
              The page you&rsquo;re looking for has drifted away like a top note.
              Let&rsquo;s get you back to something you can wear.
            </p>
          </Reveal>

          <Reveal
            delay={0.15}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink shadow-[0_18px_40px_-12px_rgba(204,168,105,0.6)] transition-transform duration-300 hover:scale-[1.02]"
            >
              Back home
            </Link>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-bone/85 transition-colors hover:border-gold/50 hover:text-bone"
            >
              Shop fragrances
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
