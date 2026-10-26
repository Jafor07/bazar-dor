"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল!");
            router.push("/");
            router.refresh();
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
    >
      <FiLogOut /> সাইন আউট
    </button>
  );
}