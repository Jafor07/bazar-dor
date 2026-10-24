import { formatPrice, getBanglaDate, getUnitBn } from "@/lib/utils";

export default function Home() {
  return (
    <p className="p-8">
      {getBanglaDate()} | {formatPrice(1850)} টাকা {getUnitBn("kg")}
    </p>
  );
}