import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  // Check the session on the server (the proxy only checks that a cookie exists)
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackUrl=%2Fprofile");

  const { user } = session;

  return (
    <div className="mx-auto max-w-[736px] space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-700">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar
            name={user.name}
            image={user.image}
            className="h-20 w-20 shrink-0 rounded-2xl text-3xl"
          />
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-gray-600">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-lg font-semibold text-gray-900">তথ্য</h2>
        <dl className="mt-4 divide-y divide-line text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-gray-600">নাম</dt>
            <dd className="font-medium text-gray-900">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-gray-600">ইমেইল</dt>
            <dd className="truncate font-medium text-gray-900">{user.email}</dd>
          </div>
        </dl>
        <Link
          href="/profile/update"
          className="mt-4 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 hover:brightness-110"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}