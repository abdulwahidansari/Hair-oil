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
  UserIcon,
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
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
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
              aria-label="Account"
              onClick={() => setSignInOpen(true)}
              className="inline-flex rounded-md p-2 transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <UserIcon className="h-6 w-6" />
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
            onSignInClick={() => setSignInOpen(true)}
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

        {/* Sign-in modal */}
        {signInOpen && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSignInOpen(false)}
          >
            <div
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-poppins text-xl font-semibold text-[#121212]">
                  Sign In
                </h2>
                <button
                  type="button"
                  className="rounded p-1 text-[#6C7275] hover:bg-black/5 hover:text-black"
                  aria-label="Close"
                  onClick={() => setSignInOpen(false)}
                >
                  <span className="text-xl leading-none">&times;</span>
                </button>
              </div>
              <p className="mb-6 text-sm text-[#6C7275]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold text-[#38CB89] hover:underline"
                  onClick={() => setSignInOpen(false)}
                >
                  Sign Up
                </Link>
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Optional: call sign-in API here
                  setSignInOpen(false);
                }}
              >
                <div>
                  <label htmlFor="signin-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    placeholder="Email address"
                    className="w-full border-b border-[#E8ECEF] pb-2 text-[#141718] outline-none placeholder:text-[#6C7275] focus:border-[#141718]"
                  />
                </div>
                <div>
                  <label htmlFor="signin-password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="signin-password"
                    type="password"
                    placeholder="Password"
                    className="w-full border-b border-[#E8ECEF] pb-2 text-[#141718] outline-none placeholder:text-[#6C7275] focus:border-[#141718]"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-[#6C7275]">
                    <input type="checkbox" className="rounded border-[#6C7275]" />
                    Remember me
                  </label>
                  <Link
                    href="/sign-in"
                    className="font-semibold text-[#141718] hover:underline"
                    onClick={() => setSignInOpen(false)}
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Sign In
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-[#6C7275]">
                Prefer full page?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-[#38CB89] hover:underline"
                  onClick={() => setSignInOpen(false)}
                >
                  Open sign-in page
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
