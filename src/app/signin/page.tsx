import type { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";
import SignInForm from "@/components/SignInForm";
import { getSafeCallbackUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <AuthLayout
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm callbackUrl={getSafeCallbackUrl(callbackUrl)} />
    </AuthLayout>
  );
}