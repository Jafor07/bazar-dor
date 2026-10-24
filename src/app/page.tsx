import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceFallers from "@/components/PriceFallers";
import PriceRisers from "@/components/PriceRisers";
import { API_BASE, type Product } from "@/lib/utils";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 60 }, // refresh the data at most once a minute
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-8">
      <Hero />
      <PriceRisers products={products} />
      <PriceFallers products={products} />
      <AllProducts products={products} />
    </div>
  );
}