import Image from "next/image";
import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="flex items-center justify-between gap-8 rounded-3xl border border-line bg-surface p-8">
      <div className="max-w-xl">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-brand">
          {getBanglaDate()}
        </span>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-4 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#all-products"
          className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 hover:brightness-110"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <Image
        src="/bazar-hero.png"
        alt="সবজির ঝুড়ি"
        width={315}
        height={263}
        priority
        className="hidden h-auto w-[315px] shrink-0 md:block"
      />
    </section>
  );
}