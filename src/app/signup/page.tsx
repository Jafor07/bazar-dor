import type { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";
import SignUpForm from "@/components/SignUpForm";
import { getSafeCallbackUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "সাইন আপ — বাজার দর" };

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <AuthLayout
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <SignUpForm callbackUrl={getSafeCallbackUrl(callbackUrl)} />
    </AuthLayout>
  );
}