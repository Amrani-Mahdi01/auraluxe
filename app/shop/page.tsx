import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopHeader from "../components/ShopHeader";
import ShopGrid from "../components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop — AURALUXE",
  description:
    "The full AuraLuxe collection — eight niche fragrances, hand-poured in Grasse. Filter, sort, and add your signature scent.",
};

export default function ShopPage() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <ShopHeader />
        <ShopGrid />
      </main>
      <Footer />
    </>
  );
}
