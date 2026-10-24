import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/lib/utils";

export default function PriceRisers({ products }: { products: Product[] }) {
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct) // biggest rise first
    .slice(0, 6);

  if (risers.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
        <span className="text-lg text-red-600">▲</span> আজ দাম বেড়েছে
      </h2>
      <ProductGrid products={risers} />
    </section>
  );
}