"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import { FiChevronDown, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import Avatar from "@/components/Avatar";
import { signOut, useSession } from "@/lib/auth-client";
import { API_BASE, getBanglaDate, type Category } from "@/lib/utils";

// The date is empty on the server and filled in by the browser, so pages that
// were pre-rendered days ago never show an old date.
const subscribe = () => () => {};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const today = useSyncExternalStore(subscribe, () => getBanglaDate(), () => "");

  // Categories
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => setCategories([]))
      .finally(() => setLoadingCategories(false));
  }, []);

  // Close the user dropdown when clicking outside it
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const pillClass = (active: boolean) =>
    `flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-brand text-white shadow-md shadow-green-900/20"
        : "text-gray-800 hover:bg-gray-100"
    }`;

  const firstName = session?.user.name?.split(" ")[0] ?? "";

  return (
    <header className="border-b border-line bg-surface">
      {/* Row 1: logo + auth */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand shadow-md shadow-green-900/20">
            <Image src="/logo-icon.png" alt="" width={18} height={18} />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold text-gray-900">
              বাজার দর
            </span>
            <span className="block min-h-4 text-xs text-gray-500">{today}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-brand" />
          ) : session ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100"
              >
                <Avatar name={session.user.name} image={session.user.image} />
                <span className="hidden text-sm font-medium text-gray-800 sm:block">
                  {firstName}
                </span>
                <FiChevronDown className="text-gray-500" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-line bg-surface p-4 shadow-lg">
                  <p className="font-semibold text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="mb-2 truncate text-xs text-gray-500">
                    {session.user.email}
                  </p>
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm text-gray-800 hover:text-brand"
                  >
                    <FiUser /> আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 py-2 text-sm text-red-600 hover:text-red-700"
                  >
                    <FiLogOut /> সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/signin"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-green-900/20 hover:brightness-110"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          {/* Hamburger (mobile / tablet) */}
          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="মেনু"
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Row 2: categories (desktop) */}
      <nav className="hidden border-t border-line lg:block">
        <ul className="mx-auto flex max-w-6xl items-center gap-1 px-6 py-2">
          {loadingCategories
            ? Array.from({ length: 8 }).map((_, i) => (
                <li key={i}>
                  <div className="skeleton h-8 w-20" />
                </li>
              ))
            : categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={pillClass(pathname === `/category/${cat.slug}`)}
                  >
                    <span>{cat.icon}</span>
                    {cat.nameBn}
                  </Link>
                </li>
              ))}
        </ul>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line px-6 py-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={pillClass(pathname === `/category/${cat.slug}`)}
                >
                  <span>{cat.icon}</span>
                  {cat.nameBn}
                </Link>
              </li>
            ))}
          </ul>

          {!session && !isPending && (
            <div className="mt-3 flex gap-2 sm:hidden">
              <Link
                href="/signin"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg border border-line py-2 text-center text-sm font-semibold text-gray-900"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg bg-brand py-2 text-center text-sm font-semibold text-white"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}