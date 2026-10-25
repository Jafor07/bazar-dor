"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategorySkeleton from "@/components/CategorySkeleton";
import ProductGrid from "@/components/ProductGrid";
import SortDropdown from "@/components/SortDropdown";
import {
  fetchCategoryPage,
  sortProducts,
  toBengaliNumber,
  type Category,
  type Product,
  type SortOption,
} from "@/lib/utils";

type PageData = {
  slug: string; // which category this data belongs to
  products: Product[];
  category: Category | null;
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const [data, setData] = useState<PageData | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    let ignore = false; // ignore a slow response if the user already moved on

    fetchCategoryPage(slug)
      .then((result) => {
        if (!ignore) setData({ slug, ...result });
      })
      .catch(() => {
        if (!ignore) setData({ slug, products: [], category: null });
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  // 1) Loading: no data yet, or the data is for the previous category
  if (!data || data.slug !== slug) return <CategorySkeleton />;

  const { products, category } = data;

  // 2) Error / empty
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-2xl border border-line bg-surface p-10 text-center">
          <p className="text-4xl">🔍</p>
          <h1 className="mt-3 text-xl font-bold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="mt-1 text-gray-600">
            এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 hover:brightness-110"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  // 3) Success
  const title = category?.nameBn ?? products[0].categoryNameBn;
  const icon = category?.icon ?? products[0].categoryIcon;
  const count = toBengaliNumber(products.length);
  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
      <section className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
          {icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600">
            {count}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-4">
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </section>

      <p className="text-sm text-gray-600">মোট {count}টি পণ্য দেখানো হচ্ছে</p>

      <ProductGrid products={sortedProducts} />
    </div>
  );
}