"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { signIn } from "@/lib/auth-client";
import { getAuthErrorBn } from "@/lib/utils";

export default function SignInForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({ email, password });
      if (error) {
        toast.error(getAuthErrorBn(error, "সাইন ইন ব্যর্থ!"));
        return;
      }
      toast.success("সাইন ইন সফল! 🎉");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const signUpHref =
    callbackUrl === "/"
      ? "/signup"
      : `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-900">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input w-full rounded-lg bg-surface"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-900">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full rounded-lg bg-surface"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:brightness-110 disabled:opacity-70"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>

      <div className="divider my-4 text-xs text-gray-600">অথবা</div>

      <SocialButtons callbackUrl={callbackUrl} />

      <p className="mt-5 text-center text-sm text-gray-700">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={signUpHref} className="font-medium text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}