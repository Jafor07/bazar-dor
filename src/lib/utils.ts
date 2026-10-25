export const API_BASE = "https://api.api-store.workers.dev/api/bazardor";

/* ---------- Types ---------- */

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

/* ---------- Number helpers ---------- */

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[Number(d)]);
}

export function formatPrice(price: number): string {
  return toBengaliNumber(price.toLocaleString("en-IN"));
}

// 2.6 -> "২.৬", -2.9 -> "২.৯" (the ▲/▼ arrow already shows direction)
export function formatPercent(pct: number): string {
  return toBengaliNumber(Math.abs(pct).toFixed(1));
}

/* ---------- Units ---------- */

const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export function getUnitBn(unit: string): string {
  return unitMap[unit] ?? `প্রতি ${unit}`;
}

// "প্রতি কেজি" -> "কেজি" (for the ticker: ১৪৮ টাকা/কেজি)
export function getUnitShortBn(unit: string): string {
  return getUnitBn(unit).replace("প্রতি ", "");
}

/* ---------- Date ---------- */

const banglaDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const banglaMonths = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

export function getBanglaDate(date: Date = new Date()): string {
  // Bangladesh is UTC+6 with no daylight saving. Shifting by 6h and reading the
  // UTC fields gives the same date on the server (UTC) and in the browser.
  const bd = new Date(date.getTime() + 6 * 60 * 60 * 1000);
  const day = banglaDays[bd.getUTCDay()];
  const month = banglaMonths[bd.getUTCMonth()];
  return `${day}, ${toBengaliNumber(bd.getUTCDate())} ${month}, ${toBengaliNumber(bd.getUTCFullYear())}`;
}

/* ---------- Price change styling ---------- */

export const changeStyle = {
  up: { symbol: "▲", text: "text-red-600", badge: "bg-red-50 text-red-600" },
  down: { symbol: "▼", text: "text-green-600", badge: "bg-green-50 text-green-700" },
  flat: { symbol: "—", text: "text-gray-500", badge: "bg-gray-100 text-gray-600" },
} as const;

/* ---------- Category page helpers ---------- */

export type SortOption = "default" | "price-asc" | "price-desc";

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products]; // copy first, never mutate React state
  if (sortBy === "price-asc") sorted.sort((a, b) => a.today - b.today);
  if (sortBy === "price-desc") sorted.sort((a, b) => b.today - a.today);
  return sorted;
}

export async function fetchCategoryPage(
  slug: string
): Promise<{ products: Product[]; category: Category | null }> {
  // both requests run at the same time
  const [productsRes, categoryRes] = await Promise.all([
    fetch(`${API_BASE}/products?category=${encodeURIComponent(slug)}`),
    fetch(`${API_BASE}/categories/${encodeURIComponent(slug)}`),
  ]);

  const productsData: unknown = productsRes.ok ? await productsRes.json() : [];
  const products = Array.isArray(productsData) ? (productsData as Product[]) : [];

  let category: Category | null = null;
  if (categoryRes.ok) {
    const data: unknown = await categoryRes.json();
    if (data && typeof data === "object" && "nameBn" in data) {
      category = data as Category;
    }
  }

  return { products, category };
}