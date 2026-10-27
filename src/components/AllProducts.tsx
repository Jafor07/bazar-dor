"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import SortDropdown from "@/components/SortDropdown";
import {
  sortProducts,
  toBengaliNumber,
  type Product,
  type SortOption,
} from "@/lib/utils";

export default function AllProducts({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  return (
    <section id="all-products" className="scroll-mt-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="mt-1 text-sm text-gray-600">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>
      <ProductGrid products={sortProducts(products, sortBy)} />
    </section>
  );
}
