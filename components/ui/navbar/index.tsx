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

// lib
import { cn } from "@/lib/utils";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const isRootPage = useRootContext();
  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartSummary, setCartSummary] = useState<{
    productName: string;
    packSize: number;
    quantity: number;
    totalBottles: number;
    subtotalFormatted: string;
  } | null>(null);

  const handleOnScroll = () => {
    window.scrollY >= 32 ? setScroll(true) : setScroll(false);
  };

  const loadCartFromStorage = () => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("currentOrder");
      if (!raw) {
        setCartSummary(null);
        return;
      }
      const parsed = JSON.parse(raw);
      setCartSummary(parsed);
    } catch {
      setCartSummary(null);
    }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    const q = searchQuery.trim();
    if (q) router.push(`/shipping?q=${encodeURIComponent(q)}`);
    else router.push("/shipping");
    setSearchQuery("");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

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
            <button className="lg:hidden" onClick={() => setOpen(true)}>
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

            <button
              type="button"
              aria-label="Cart / Checkout"
              onClick={() => {
                loadCartFromStorage();
                setCartOpen(true);
              }}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <CartIcon className="h-6 w-6" />
              <NotificationCount
                count={cartSummary?.totalBottles ?? 0}
                className={cn(
                  "absolute -right-1 -top-1 h-5 w-5 text-white",
                  isRootPage ? "bg-black" : "bg-black",
                )}
              />
            </button>
          </div>

          {/* mobile navbar  */}
          <NavMobile
            open={open}
            onClick={() => setOpen(false)}
            onSearchOpen={() => setSearchOpen(true)}
          />
        </nav>

        {cartOpen && (
          <div
            className="fixed inset-0 z-[120] flex items-start justify-end bg-black/30 px-4 pt-20 sm:pt-24"
            onClick={() => setCartOpen(false)}
          >
            <div
              className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#111827]">
                  Order summary
                </p>
                <button
                  type="button"
                  className="text-xs text-[#6b7280] hover:text-black"
                  onClick={() => setCartOpen(false)}
                >
                  Close
                </button>
              </div>

              {cartSummary ? (
                <div className="space-y-3 text-sm">
                  <p className="font-medium text-[#111827]">
                    {cartSummary.productName}
                  </p>
                  <p className="text-[#4b5563]">
                    {cartSummary.packSize} Bottle
                    {cartSummary.packSize > 1 ? "s" : ""} ×{" "}
                    {cartSummary.quantity} pack
                  </p>
                  <p className="text-xs text-[#6b7280]">
                    Total bottles:{" "}
                    <span className="font-semibold text-[#111827]">
                      {cartSummary.totalBottles}
                    </span>
                  </p>
                  <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-3">
                    <span className="text-[#4b5563]">Estimated total</span>
                    <span className="font-semibold text-[#111827]">
                      {cartSummary.subtotalFormatted}
                    </span>
                  </div>
                  <Link
                    href={`/checkout?packSize=${cartSummary.packSize}&quantity=${cartSummary.quantity}`}
                    onClick={() => setCartOpen(false)}
                    className="mt-3 inline-flex w-full justify-center"
                  >
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-900">
                      Go to checkout
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-[#4b5563]">
                  <p>No order selected yet.</p>
                  <Link
                    href="/shipping"
                    onClick={() => setCartOpen(false)}
                    className="inline-flex w-full justify-center"
                  >
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-900">
                      View product
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search overlay */}
        {searchOpen && (
          <div
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/40 pt-24 px-4"
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
                Search and go to shop. Try &quot;hair oil&quot; or &quot;organic&quot;.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
