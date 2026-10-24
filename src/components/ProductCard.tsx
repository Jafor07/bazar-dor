import Link from "next/link";
import {
  changeStyle,
  formatPercent,
  formatPrice,
  getUnitBn,
  type Product,
} from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const style = changeStyle[product.change.dir];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">
            {product.nameBn}
          </h3>
          <p className="text-sm text-gray-500">{getUnitBn(product.unit)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600">আজকের দাম</p>
      <div className="mt-1 flex items-end justify-between">
        <p>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.today)}
          </span>{" "}
          <span className="text-sm text-gray-700">টাকা</span>
        </p>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}
        >
          {style.symbol} {formatPercent(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}