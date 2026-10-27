"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialButtons({ callbackUrl }: { callbackUrl: string }) {
  const [loading, setLoading] = useState<Provider | null>(null);

  const handleSocial = async (provider: Provider) => {
    setLoading(provider);
    try {
      // on success the browser leaves for Google / GitHub, so we keep the spinner
      const { error } = await signIn.social({
        provider,
        callbackURL: callbackUrl,
        errorCallbackURL: "/signin", // OAuth errors come back to our sign-in page
      });
      if (error) {
        toast.error("সাইন ইন ব্যর্থ!");
        setLoading(null);
      }
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
      setLoading(null);
    }
  };

  const buttonClass =
    "flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line bg-surface px-2 py-2.5 text-[13px] font-medium text-gray-900 transition hover:bg-gray-50 disabled:opacity-60";

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={loading !== null}
        className={buttonClass}
      >
        {loading === "google" ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <FcGoogle size={18} />
        )}
        Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => handleSocial("github")}
        disabled={loading !== null}
        className={buttonClass}
      >
        {loading === "github" ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <FaGithub size={18} />
        )}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
