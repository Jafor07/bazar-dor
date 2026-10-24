"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  API_BASE,
  changeStyle,
  formatPercent,
  formatPrice,
  getUnitShortBn,
  type Product,
} from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  // keeps the bar's height while loading (no layout jump)
  if (products.length === 0) {
    return <div className="h-[37px] border-b border-line bg-white" />;
  }

  // repeat twice so translateX(-50%) loops seamlessly
  const tickerItems = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-line bg-white">
      <div className="animate-marquee flex w-max">
        {tickerItems.map((p, i) => {
          const style = changeStyle[p.change.dir];
          return (
            <Link
              key={`${p.id}-${i}`}
              href={`/product/${p.slug}`}
              className="flex shrink-0 items-center gap-2 border-r border-line px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50"
            >
              <span>{p.image}</span>
              <span className="font-semibold text-gray-900">{p.nameBn}</span>
              <span className="text-gray-600">
                {formatPrice(p.today)} টাকা/{getUnitShortBn(p.unit)}
              </span>
              <span className={`font-semibold ${style.text}`}>
                {style.symbol} {formatPercent(p.change.pct)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}