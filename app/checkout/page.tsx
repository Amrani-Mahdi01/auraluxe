import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — AURALUXE",
  description: "Complete your order — cash on delivery across all 58 wilayas.",
};

export default function CheckoutPage() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
