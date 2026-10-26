import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "পেজটি পাওয়া যায়নি — বাজার দর" };

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-10 text-center">
        <p className="text-6xl">🔍</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          পেজটি পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-gray-600">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, নাম বদলেছে, অথবা কখনো
          ছিলই না।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 hover:brightness-110"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}