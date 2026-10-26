import type { Metadata } from "next";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata: Metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default function UpdateProfilePage() {
  return (
    <div className="mx-auto max-w-[736px] space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-gray-700">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>
      </div>

      <UpdateProfileForm />
    </div>
  );
}