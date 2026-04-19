"use client";

// package
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ui
import Logo from "@/ui/assets/logo";
import {
  CartIcon,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  NotificationCount,
  SearchIcon,
  WishlistIcon,
  YoutubeIcon,
} from "@/ui/assets/svg";

// lib
import { cn } from "@/lib/utils";

const links = [
  {
    id: "home",
    path: "/",
    name: "Home",
  },
  {
    id: "shop",
    path: "/products/coelegance-organic-hair-oil-best-seller",
    name: "Shop",
  },
  {
    id: "about",
    path: "/about",
    name: "About Us",
  },
  {
    id: "blog",
    path: "/blog",
    name: "Blog",
  },
  {
    id: "contact",
    path: "/contact",
    name: "Contact Us",
  },
];

export default function NavMobile({
  onClick,
  open,
  onSearchOpen,
}: {
  onClick: () => void;
  open: boolean;
  onSearchOpen?: () => void;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClick();
    if (searchQuery.trim()) {
      router.push(
        `/products/coelegance-organic-hair-oil-best-seller?q=${encodeURIComponent(searchQuery.trim())}`,
      );
    } else {
      router.push("/products/coelegance-organic-hair-oil-best-seller");
    }
    setSearchQuery("");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[110] grid h-[100dvh] min-h-[100dvh] w-full grid-cols-[11fr_1fr] bg-transparent transition-transform duration-200 ease-out md:grid-cols-[10fr_2fr] lg:hidden",
        open ? "translate-x-0 touch-none" : "pointer-events-none -translate-x-full",
      )}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex min-h-0 flex-col justify-between overflow-y-auto bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
        {/* top section */}
        <div className="flex flex-col gap-4">
          {/* logo */}
          <div className="flex items-center justify-between">
            <Logo />

            <button
              type="button"
              onClick={onClick}
              aria-label="Close navigation menu"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              <CloseIcon className="w-6" />
            </button>
          </div>

          {/* search input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex h-12 items-center gap-2 rounded-md border border-[#6C7275] px-4"
          >
            <SearchIcon className="shrink-0" aria-hidden />
            <input
              id="search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-0 flex-1 font-inter text-sm font-normal text-[#141718] outline-none placeholder:opacity-70"
              placeholder="Search..."
            />
            <button
              type="button"
              className="text-xs font-semibold text-[#141718]"
              onClick={() => {
                onSearchOpen?.();
                onClick();
              }}
            >
              Go
            </button>
          </form>
          {/* navbar links */}
          <ul className="grid grid-cols-1">
            {links.map((link) => (
              <li
                key={link.id}
                className="border-b border-[#E8ECEF] first:pt-0"
              >
                <Link
                  href={link.path}
                  onClick={onClick}
                  className="block py-4 font-inter text-sm font-medium text-[#141718]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* bottom section */}
        <div className="flex flex-col gap-5">
          {/* cart & wishlist */}
          <ul>
            <li>
              <Link
                href="/checkout"
                onClick={onClick}
                className="flex items-center justify-between border-b border-[#E8ECEF] py-4"
              >
                <span className="font-inter text-sm font-medium text-[#141718]">
                  Checkout
                </span>

                <div className="flex items-center gap-1.5">
                  <CartIcon className="w-6" />
                  <NotificationCount count={6} />
                </div>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between border-b border-[#E8ECEF] py-4 text-left"
                disabled
              >
                <span className="font-inter text-sm font-medium text-[#9ca3af]">
                  Wishlist (coming soon)
                </span>

                <div className="flex items-center gap-1.5 text-[#9ca3af]">
                  <WishlistIcon className="w-6" />
                  <NotificationCount count={0} />
                </div>
              </button>
            </li>
          </ul>

          {/* social media button */}
          <div className="flex items-center gap-6">
            <InstagramIcon className="w-6" />
            <FacebookIcon className="w-6" />
            <YoutubeIcon className="w-6" />
          </div>
        </div>
      </div>

      <div className="h-full bg-black/30" onClick={onClick}></div>
    </div>
  );
}
