import ProductGrid from "@/components/ProductGrid";
import { toBengaliNumber, type Product } from "@/lib/utils";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section id="all-products" className="scroll-mt-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
        <p className="text-sm text-gray-600">
          মোট {toBengaliNumber(products.length)}টি পণ্য
        </p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}