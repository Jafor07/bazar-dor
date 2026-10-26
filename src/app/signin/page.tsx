import type { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";
import SignInForm from "@/components/SignInForm";
import { getOAuthErrorBn, getSafeCallbackUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;

  return (
    <AuthLayout
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {getOAuthErrorBn(error)}
        </p>
      )}
      <SignInForm callbackUrl={getSafeCallbackUrl(callbackUrl)} />
    </AuthLayout>
  );
}