import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";
import HeadingReveal from "../components/HeadingReveal";
import FaqAccordion from "../components/FaqAccordion";

export const metadata: Metadata = {
  title: "Delivery & FAQ — AURALUXE",
  description:
    "Delivery to all 58 wilayas of Algeria, cash on delivery, returns, and answers to common questions.",
};

const DELIVERY = [
  { k: "58", v: "Wilayas covered — we deliver everywhere in Algeria." },
  { k: "24–72h", v: "Typical delivery time once your order is confirmed." },
  { k: "12 000 DA", v: "Free delivery on every order above this amount." },
  { k: "COD", v: "Cash on delivery — pay when your parcel arrives." },
];

export default function HelpPage() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Header />
      <main>
        {/* hero */}
        <section className="relative overflow-hidden px-6 pb-6 pt-36 md:pt-44">
          <div className="mist mist-gold right-[6%] top-[18%] h-[24rem] w-[24rem] opacity-25" />
          <div className="relative mx-auto max-w-7xl">
            <Reveal className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">Help · Livraison</span>
            </Reveal>
            <Parallax distance={30}>
              <HeadingReveal
                className="font-display text-[clamp(2.8rem,8vw,6rem)] font-light leading-[0.92] tracking-tight text-bone"
                segments={[
                  { text: "Delivery" },
                  { text: "& FAQ", className: "italic text-gold-grad" },
                ]}
              />
            </Parallax>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-bone-dim">
                Hand-poured fragrances, delivered to your door across Algeria —
                with cash on delivery and a complimentary sample in every order.
              </p>
            </Reveal>
          </div>
        </section>

        {/* delivery facts */}
        <section
          id="delivery"
          className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16 md:py-24"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {DELIVERY.map((d, i) => (
              <Reveal key={d.k} delay={i * 0.08}>
                <p className="font-display text-4xl text-gold-grad sm:text-5xl">
                  {d.k}
                </p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-bone-dim">
                  {d.v}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* returns */}
        <section
          id="returns"
          className="mx-auto max-w-3xl scroll-mt-28 border-t border-white/8 px-6 py-16 md:py-20"
        >
          <Reveal>
            <span className="eyebrow">Returns &amp; exchanges</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight text-bone">
              Changed your mind? It happens.
            </h2>
            <p className="mt-5 text-[0.96rem] leading-relaxed text-bone-dim">
              Unopened bottles can be returned or exchanged within{" "}
              <span className="text-bone">14 days</span> of delivery. Reach out
              at{" "}
              <a
                href="mailto:concierge@auraluxe.com"
                className="text-gold underline-offset-4 hover:underline"
              >
                concierge@auraluxe.com
              </a>{" "}
              or by phone and we&rsquo;ll arrange a pickup or a replacement —
              simply, and at no extra cost.
            </p>
          </Reveal>
        </section>

        {/* faq */}
        <section
          id="faq"
          className="mx-auto max-w-3xl scroll-mt-28 px-6 pb-28 md:pb-36"
        >
          <Reveal className="mb-8">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight text-bone">
              Everything you might ask.
            </h2>
          </Reveal>
          <FaqAccordion />
        </section>
      </main>
      <Footer />
    </>
  );
}
