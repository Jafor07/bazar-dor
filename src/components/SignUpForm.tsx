"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { signUp } from "@/lib/auth-client";
import { getAuthErrorBn } from "@/lib/utils";

export default function SignUpForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp.email({ name, email, password });
      if (error) 
        {console.error("sign-up error:", error);
        toast.error(getAuthErrorBn(error, "রেজিস্ট্রেশন ব্যর্থ!"), { id: "auth-error" });
            return;
        }
      // BetterAuth signs the new user in automatically
      toast.success("রেজিস্ট্রেশন সফল! 🎉");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const signInHref =
    callbackUrl === "/"
      ? "/signin"
      : `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-900";
  const inputClass = "input w-full rounded-lg bg-surface";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>নাম</label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>ইমেইল</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>পাসওয়ার্ড</label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClass}>
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="আবার লিখুন"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:brightness-110 disabled:opacity-70"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <div className="divider my-4 text-xs text-gray-600">অথবা</div>

      <SocialButtons callbackUrl={callbackUrl} />

      <p className="mt-5 text-center text-sm text-gray-700">
        অ্যাকাউন্ট আছে?{" "}
        <Link href={signInHref} className="font-medium text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}