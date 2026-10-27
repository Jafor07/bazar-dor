import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  API_BASE,
  changeStyle,
  formatAvgPrice,
  formatPercent,
  formatPrice,
  getUnitBn,
  getUnitShortBn,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

// The API has no "single product" endpoint, so fetch all and pick one.
async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const products: Product[] = await res.json();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product
      ? `${product.nameBn} — বাজার দর`
      : "পণ্য পাওয়া যায়নি — বাজার দর",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params; // in Next 16, params is a Promise
  const product = await getProduct(slug);
  if (!product) notFound();

  const style = changeStyle[product.change.dir];
  const changeWord = {
    up: "বেড়েছে",
    down: "কমেছে",
    flat: "অপরিবর্তিত",
  }[product.change.dir];

  // ----- market statistics -----
  const hasMarkets = product.markets.length > 0;
  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );
  const cheapest = product.markets.find((m) => m.min === minPrice);
  const dearest = product.markets.find((m) => m.max === maxPrice);

  // cheapest market (by average) first
  const marketRows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const history = [
    { label: "আজ", price: product.today, current: true },
    { label: "গতকাল", price: product.yesterday, current: false },
    { label: "গত সপ্তাহ", price: product.lastWeek, current: false },
    { label: "গত মাস", price: product.lastMonth, current: false },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-6">
      {/* 1. Breadcrumb */}
      <nav className="breadcrumbs text-sm text-gray-600" aria-label="breadcrumb">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="text-gray-900">{product.nameBn}</li>
        </ul>
      </nav>

      {/* 2. Summary card */}
      <section className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-page text-4xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {getUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm text-gray-800">
              গতকালের তুলনায় আজ দাম{" "}
              <strong className="font-semibold">{changeWord}</strong>
              {product.change.dir !== "flat" && (
                <> {formatPercent(product.change.pct)}%</>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-page px-5 py-4 text-center sm:min-w-32">
          <p className="text-sm text-gray-600">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(product.today)}
          </p>
          <p className="text-sm text-gray-600">
            টাকা / {getUnitShortBn(product.unit)}
          </p>
          <p className={`mt-1 text-sm font-semibold ${style.text}`}>
            {style.symbol} {formatPercent(product.change.pct)}%
          </p>
        </div>
      </section>

      {/* 3. Price details */}
      <section className="space-y-6 rounded-2xl border border-line bg-surface p-5">
        {hasMarkets ? (
          <>
            <h2 className="text-lg font-semibold text-gray-900">
              দামের সারসংক্ষেপ
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard
                label="সর্বনিম্ন দাম"
                value={`${formatPrice(minPrice)} টাকা`}
                valueClass="text-green-600"
                caption={`সবচেয়ে কম দামের বাজার: ${cheapest?.market}`}
              />
              <StatCard
                label="সর্বাধিক দাম"
                value={`${formatPrice(maxPrice)} টাকা`}
                valueClass="text-red-600"
                caption={`সবচেয়ে বেশি দামের বাজার: ${dearest?.market}`}
              />
              <StatCard
                label="গড় দাম"
                value={`${formatPrice(avgPrice)} টাকা`}
                valueClass="text-brand"
                caption={`${getUnitBn(product.unit)}-এর হিসাবে`}
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <div className="overflow-hidden rounded-2xl border border-line">
              <div className="overflow-x-auto">
                <table className="table whitespace-nowrap">
                  <thead>
                    <tr className="text-gray-900">
                      <th>বাজার</th>
                      <th>বিভাগ</th>
                      <th className="text-right">সর্বনিম্ন</th>
                      <th className="text-right">সর্বাধিক</th>
                      <th className="text-right">গড়</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketRows.map((m) => (
                      <tr key={`${m.market}-${m.division}`} className="even:bg-page">
                        <td className="font-medium text-gray-900">{m.market}</td>
                        <td className="text-gray-700">{m.division}</td>
                        <td className="text-right">{formatPrice(m.min)} টাকা</td>
                        <td className="text-right">{formatPrice(m.max)} টাকা</td>
                        <td className="text-right font-semibold text-gray-900">
                          {formatAvgPrice(m.avg)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600">বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।</p>
        )}

        {/* Price history */}
        <h2 className="text-lg font-semibold text-gray-900">
          আগের দামের তুলনা
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {history.map((h) => (
            <HistoryCell
              key={h.label}
              label={h.label}
              price={h.price}
              today={product.today}
              current={h.current}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClass,
  caption,
}: {
  label: string;
  value: string;
  valueClass: string;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-6 py-4">
      <p className="text-xs text-gray-600">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${valueClass}`}>{value}</p>
      <p className="mt-1 text-xs text-gray-600">{caption}</p>
    </div>
  );
}

function HistoryCell({
  label,
  price,
  today,
  current,
}: {
  label: string;
  price: number;
  today: number;
  current: boolean;
}) {
  const diff = today - price; // how much today differs from that day
  let note = <span className="text-gray-600">বর্তমান দাম</span>;
  if (!current) {
    note =
      diff > 0 ? (
        <span className="text-red-600">▲ আজ {toBengaliNumber(diff)} টাকা বেশি</span>
      ) : diff < 0 ? (
        <span className="text-green-600">
          ▼ আজ {toBengaliNumber(Math.abs(diff))} টাকা কম
        </span>
      ) : (
        <span className="text-gray-500">— একই দাম</span>
      );
  }

  return (
    <div
      className={`rounded-2xl border p-4 ${
        current ? "border-brand bg-page" : "border-line bg-surface"
      }`}
    >
      <p className="text-xs text-gray-600">{label}</p>
      <p className="mt-1 text-xl font-bold text-gray-900">
        {formatPrice(price)} <span className="text-sm font-normal">টাকা</span>
      </p>
      <p className="mt-1 text-xs">{note}</p>
    </div>
  );
}
