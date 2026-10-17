"use client";

// package
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ui
import Logo from "@/ui/assets/logo";
import {
  CartIcon,
  HamburgerMenu,
  NotificationCount,
  SearchIcon,
} from "@/ui/assets/svg";
import NavLinks from "@/ui/navbar/navLinks";
import NavMobile from "@/ui/navbar/navMobile";
import PromoSection from "@/ui/promo";

// hooks
import { useRootContext } from "@/hooks/rootContext";

// stores
import { useCartCount, useHydrateCart } from "@/stores/cart";

// lib
import { cn } from "@/lib/utils";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const isRootPage = useRootContext();
  const cartCount = useCartCount();
  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load the visitor's saved cart once, on every page.
  useHydrateCart();

  const handleOnScroll = () => {
    window.scrollY >= 32 ? setScroll(true) : setScroll(false);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    const q = searchQuery.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchQuery("");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      {!open && <PromoSection />}
      <div
        className={cn(
          "sticky top-0 z-[100]",
          isRootPage ? "bg-[#ffc95c]" : "bg-white",
          scroll && "bg-white shadow transition-colors duration-200 ease-in",
        )}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:justify-normal">
          <div className="flex items-center gap-2 lg:basis-1/4">
            <button
              type="button"
              className="lg:hidden"
              aria-label="Open navigation menu"
              onClick={() => setOpen(true)}
            >
              <HamburgerMenu className="w-6 sm:w-7" />
            </button>

            <Logo />
          </div>

          <div className="hidden basis-2/4 lg:block">
            <NavLinks />
          </div>

          <div className="flex items-center gap-2 lg:basis-1/4 lg:justify-end lg:gap-4">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="inline-flex rounded-md p-2 transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <SearchIcon className="h-6 w-6" />
            </button>

            <Link
              href="/cart"
              aria-label={
                cartCount > 0 ? `Cart, ${cartCount} item${cartCount > 1 ? "s" : ""}` : "Cart"
              }
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <CartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <NotificationCount
                  count={cartCount}
                  className="absolute -right-1 -top-1 h-5 w-5 bg-black text-white"
                />
              )}
            </Link>
          </div>

          {/* mobile navbar  */}
          <NavMobile
            open={open}
            onClick={() => setOpen(false)}
            onSearchOpen={() => setSearchOpen(true)}
          />
        </nav>

        {/* Search overlay */}
        {searchOpen && (
          <div
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/40 px-4 pb-[env(safe-area-inset-bottom)] pt-[max(6rem,env(safe-area-inset-top))]"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
          >
            <div
              className="w-full max-w-xl rounded-xl bg-white p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="flex-1 rounded-lg border border-[#E8ECEF] px-4 py-2.5 text-[#141718] outline-none placeholder:text-[#6C7275] focus:border-[#141718]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Search
                </button>
              </form>
              <p className="mt-2 text-xs text-[#6C7275]">
                Try &quot;shampoo&quot; or &quot;hair oil&quot;.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
