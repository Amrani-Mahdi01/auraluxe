"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "How do I place an order?",
    a: "Add your fragrances to the bag and check out. We'll call to confirm your order, your wilaya, and the delivery details before dispatch.",
  },
  {
    q: "How does payment work?",
    a: "We accept cash on delivery (paiement à la livraison) across all 58 wilayas — you pay in cash when your parcel arrives. No card or prepayment needed.",
  },
  {
    q: "How much is delivery, and how long does it take?",
    a: "Delivery fees depend on your wilaya and are shown at checkout. Orders over 12 000 DA ship free. Most orders arrive within 24–72 hours after confirmation.",
  },
  {
    q: "Can I return or exchange a fragrance?",
    a: "Unopened bottles can be returned or exchanged within 14 days. Just contact us and we'll arrange a pickup or send a replacement.",
  },
  {
    q: "Are the fragrances authentic and long-lasting?",
    a: "Every bottle is composed in small batches and sealed by hand. Each order includes a complimentary 2ml sample so you can test before you wear.",
  },
  {
    q: "Do you deliver outside Algeria?",
    a: "Not yet — we currently deliver within Algeria only, to all 58 wilayas.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-y border-white/8">
      {FAQS.map((f, i) => (
        <div key={i} className="border-b border-white/8 last:border-b-0">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="group flex w-full items-center justify-between gap-5 py-5 text-left"
          >
            <span className="font-display text-lg text-bone transition-colors group-hover:text-gold-soft sm:text-xl">
              {f.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/12 text-lg leading-none text-gold"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-bone-dim">
                  {f.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
