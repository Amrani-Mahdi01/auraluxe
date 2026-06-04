"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { useCart } from "./CartContext";
import { formatPrice } from "./format";
import { WILAYAS, deskFee } from "../lib/wilayas";

const EASE = [0.16, 1, 0.3, 1] as const;
const FREE_SHIP = 12000;

type Delivery = "home" | "desk";

type Snapshot = {
  ref: string;
  name: string;
  phone: string;
  wilaya: string;
  delivery: Delivery;
  count: number;
  total: number;
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.66rem] uppercase tracking-[0.2em] text-bone-mute">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[0.72rem] text-rose">{error}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/12 bg-ink-2/60 px-4 py-3 text-sm text-bone placeholder:text-bone-mute transition-colors focus:border-gold/50 focus:outline-none";

export default function CheckoutForm() {
  const { lines, subtotal, count, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    wilaya: "",
    delivery: "home" as Delivery,
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<Snapshot | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const wilaya = WILAYAS.find((w) => String(w.code) === form.wilaya);
  const freeShip = subtotal >= FREE_SHIP;
  const baseFee = wilaya
    ? form.delivery === "home"
      ? wilaya.home
      : deskFee(wilaya.home)
    : null;
  const deliveryFee = freeShip ? 0 : baseFee;
  const total = subtotal + (deliveryFee ?? 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^0[5-7]\d{8}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Algerian mobile (e.g. 0550 00 00 00).";
    if (!form.wilaya) e.wilaya = "Please choose your wilaya.";
    if (form.address.trim().length < 4) e.address = "Please add a delivery address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (lines.length === 0 || !validate()) return;
    const ref =
      "AL-" + String(Math.floor(100000 + Math.random() * 899999));
    setOrder({
      ref,
      name: form.name.trim(),
      phone: form.phone,
      wilaya: wilaya ? `${wilaya.name} (${wilaya.code})` : "",
      delivery: form.delivery,
      count,
      total,
    });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- confirmation ---------- */
  if (order) {
    return (
      <section className="mx-auto max-w-2xl px-6 pb-32 pt-36 text-center md:pt-44">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-2xl text-gold"
        >
          ✦
        </motion.div>
        <h1 className="mt-7 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-light leading-tight text-bone">
          Order <span className="italic text-gold-grad">confirmed</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[0.96rem] leading-relaxed text-bone-dim">
          Thank you, {order.name}. We&rsquo;ll call you on{" "}
          <span className="text-bone">{order.phone}</span> shortly to confirm
          your order to <span className="text-bone">{order.wilaya}</span>.
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-ink-2/40 p-6 text-left">
          <Row label="Order reference" value={order.ref} />
          <Row label="Items" value={`${order.count}`} />
          <Row
            label="Payment"
            value={order.delivery === "home" ? "Cash on delivery" : "Pay at desk"}
          />
          <div className="mt-3 flex items-baseline justify-between border-t border-white/8 pt-3">
            <span className="text-sm text-bone-dim">Total</span>
            <span className="font-display text-2xl text-gold-grad">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold/40 px-8 py-4 text-sm uppercase tracking-[0.14em] text-bone transition-colors hover:bg-gold/10"
        >
          Continue shopping →
        </Link>
      </section>
    );
  }

  /* ---------- empty cart ---------- */
  if (lines.length === 0) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-32 pt-40 text-center md:pt-48">
        <h1 className="font-display text-[clamp(2rem,6vw,3rem)] font-light text-bone">
          Your bag is empty
        </h1>
        <p className="mt-4 text-bone-dim">
          Add a fragrance before heading to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-7 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
        >
          Explore fragrances
        </Link>
      </section>
    );
  }

  /* ---------- form ---------- */
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-32 md:pt-40">
      <div className="mb-10">
        <span className="eyebrow">Cash on delivery · 58 wilayas</span>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4rem)] font-light leading-[0.95] text-bone">
          Checkout
        </h1>
      </div>

      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:gap-16">
        {/* ---- fields ---- */}
        <div className="space-y-10">
          <fieldset className="space-y-5">
            <legend className="mb-3 font-display text-xl text-bone">
              Contact
            </legend>
            <Field label="Full name" error={errors.name}>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Amine Benali"
                autoComplete="name"
              />
            </Field>
            <Field label="Phone number" error={errors.phone}>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="0550 00 00 00"
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-3 font-display text-xl text-bone">
              Delivery
            </legend>

            {/* wilaya first — delivery prices depend on it */}
            <Field label="Wilaya" error={errors.wilaya}>
              <div className="relative">
                <select
                  className={`${inputClass} appearance-none pr-10`}
                  value={form.wilaya}
                  onChange={(e) => set("wilaya", e.target.value)}
                >
                  <option value="" className="bg-ink">
                    Select your wilaya
                  </option>
                  {WILAYAS.map((w) => (
                    <option key={w.code} value={w.code} className="bg-ink text-bone">
                      {w.code} — {w.name}
                    </option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </Field>

            <Field label="Commune / address" error={errors.address}>
              <input
                className={inputClass}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="Commune, street, landmark…"
                autoComplete="street-address"
              />
            </Field>

            {/* delivery method with each option's own price */}
            <div>
              <span className="mb-2 block text-[0.66rem] uppercase tracking-[0.2em] text-bone-mute">
                Delivery method
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(["home", "desk"] as Delivery[]).map((d) => {
                  const fee = wilaya
                    ? d === "home"
                      ? wilaya.home
                      : deskFee(wilaya.home)
                    : null;
                  const priceLabel = freeShip
                    ? "Free"
                    : fee == null
                      ? "—"
                      : formatPrice(fee);
                  return (
                    <button
                      type="button"
                      key={d}
                      onClick={() => set("delivery", d)}
                      className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                        form.delivery === d
                          ? "border-gold bg-gold/10"
                          : "border-white/12 hover:border-white/30"
                      }`}
                    >
                      <span className="block text-sm text-bone">
                        {d === "home" ? "Home delivery" : "Stop desk"}
                      </span>
                      <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-bone-mute">
                        {d === "home" ? "À domicile" : "Au bureau"}
                      </span>
                      <span className="mt-1.5 block whitespace-nowrap font-display text-base text-gold-grad">
                        {priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Order notes (optional)">
              <textarea
                className={`${inputClass} min-h-[5rem] resize-none`}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Anything we should know for delivery…"
              />
            </Field>
          </fieldset>
        </div>

        {/* ---- summary ---- */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-ink-2/50 p-6">
            <h2 className="font-display text-xl text-bone">Your order</h2>

            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <Image src={l.img} alt={l.name} fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-ink">
                      {l.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-bone">{l.name}</p>
                    {l.size && (
                      <p className="text-[0.58rem] uppercase tracking-[0.16em] text-bone-mute">
                        {l.size}
                      </p>
                    )}
                  </div>
                  <span className="whitespace-nowrap text-sm text-bone-dim">
                    {formatPrice(l.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-white/8 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-bone-dim">Subtotal</span>
                <span className="text-bone">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bone-dim">Delivery</span>
                <span className="text-bone">
                  {freeShip
                    ? "Free"
                    : deliveryFee == null
                      ? "Select wilaya"
                      : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-white/8 pt-3">
                <span className="text-bone-dim">Total</span>
                <span className="font-display text-2xl text-gold-grad">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="group mt-6 flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep py-4 text-sm font-semibold uppercase tracking-[0.12em] text-ink shadow-[0_18px_40px_-12px_rgba(204,168,105,0.6)] transition-transform duration-300 hover:scale-[1.01]"
            >
              Confirm order
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </button>
            <p className="mt-3 text-center text-[0.66rem] uppercase tracking-[0.14em] text-bone-mute">
              Pay in cash on delivery · No prepayment
            </p>
          </div>
        </aside>
      </form>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-bone-mute">{label}</span>
      <span className="text-bone">{value}</span>
    </div>
  );
}
