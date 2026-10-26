"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // null = the user hasn't typed yet, so show the current name from the session
  const [typedName, setTypedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const name = typedName ?? session?.user.name ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (trimmed.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে", { id: "profile-error" });
      return;
    }
    if (trimmed === session?.user.name) {
      toast("নামে কোনো পরিবর্তন নেই");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error) {
        toast.error("আপডেট ব্যর্থ!", { id: "profile-error" });
        return;
      }
      toast.success("প্রোফাইল আপডেট হয়েছে! 🎉");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="text-lg font-semibold text-gray-900">তথ্য</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-900">
            নাম
          </label>
          <input
            id="name"
            type="text"
            required
            disabled={isPending}
            autoComplete="name"
            value={name}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder="আপনার নাম"
            className="input w-full rounded-lg bg-surface"
          />
        </div>

        <button
          type="submit"
          disabled={loading || isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:brightness-110 disabled:opacity-70"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          আপডেট
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        <Link href="/profile" className="hover:text-brand">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </section>
  );
}