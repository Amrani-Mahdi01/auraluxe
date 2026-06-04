"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <section
      id="newsletter"
      className="relative scroll-mt-28 overflow-hidden py-28 md:py-36"
    >
      <div className="mist mist-rose left-[10%] top-1/4 h-[22rem] w-[22rem] opacity-50" />
      <div className="mist mist-gold right-[8%] bottom-0 h-[24rem] w-[24rem] opacity-40" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">The List</span>
            <span className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-[clamp(2.6rem,6vw,4.4rem)] font-light leading-[0.96] text-bone">
            Join the <span className="italic text-gold-grad">atelier.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[0.96rem] leading-relaxed text-bone-dim">
            Be first to new compositions and private events — and take 10% off
            your first order.
          </p>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-7 py-4"
                >
                  <span className="text-gold">✦</span>
                  <span className="text-sm tracking-wide text-bone">
                    Welcome to the maison. Check your inbox.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={submit}
                  className="group mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-ink-2/50 p-2 backdrop-blur-md transition-colors focus-within:border-gold/50"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-5 py-2.5 text-sm text-bone placeholder:text-bone-mute focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-7 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Subscribe
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            <p className="mt-4 text-[0.66rem] uppercase tracking-[0.18em] text-bone-mute">
              No spam — only scent. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
