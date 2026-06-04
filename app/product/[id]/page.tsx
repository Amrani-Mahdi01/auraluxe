import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";
import { CATALOG, getProduct } from "../../components/catalog";

export function generateStaticParams() {
  return CATALOG.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Not found — AURALUXE" };
  return {
    title: `${product.name} — AURALUXE`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
