import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/lib/utils";

export default function PriceFallers({ products }: { products: Product[] }) {
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)) // biggest fall first
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
        <span className="text-lg text-green-600">▼</span> আজ দাম কমেছে
      </h2>
      <ProductGrid products={fallers} />
    </section>
  );
}