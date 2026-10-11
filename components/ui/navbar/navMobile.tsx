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
  DropdownIcon,
  FacebookIcon,
  InstagramIcon,
  NotificationCount,
  SearchIcon,
  WishlistIcon,
  YoutubeIcon,
} from "@/ui/assets/svg";

// lib
import { cn } from "@/lib/utils";
import { mainNavItems, type NavItem } from "@/lib/catalog";

// stores
import { useCartCount } from "@/stores/cart";

// Built from the categories in lib/catalog.ts, same as the desktop menu.
const links: NavItem[] = mainNavItems();

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
  const cartCount = useCartCount();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClick();
    const q = searchQuery.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchQuery("");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[110] grid h-[100dvh] min-h-[100dvh] w-full grid-cols-[11fr_1fr] bg-transparent transition-transform duration-200 ease-out md:grid-cols-[10fr_2fr] lg:hidden",
        open ? "translate-x-0" : "pointer-events-none -translate-x-full",
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
              <MobileNavItem key={link.id} item={link} onNavigate={onClick} depth={0} />
            ))}
          </ul>
        </div>

        {/* bottom section */}
        <div className="flex flex-col gap-5">
          {/* cart & wishlist */}
          <ul>
            <li>
              <Link
                href="/cart"
                onClick={onClick}
                className="flex items-center justify-between border-b border-[#E8ECEF] py-4"
              >
                <span className="font-inter text-sm font-medium text-[#141718]">
                  Cart
                </span>

                <div className="flex items-center gap-1.5">
                  <CartIcon className="w-6" />
                  {cartCount > 0 && <NotificationCount count={cartCount} />}
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

/** One menu row. Rows with children expand like an accordion; the label still links to the page. */
function MobileNavItem({
  item,
  onNavigate,
  depth,
}: {
  item: NavItem;
  onNavigate: () => void;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const indent = depth > 0 ? "pl-4" : "";

  if (!item.subLinks) {
    return (
      <li className="border-b border-[#E8ECEF] first:pt-0">
        <Link
          href={item.path}
          onClick={onNavigate}
          className={cn(
            "block py-4 font-inter text-sm font-medium text-[#141718]",
            indent,
          )}
        >
          {item.name}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-[#E8ECEF] first:pt-0">
      <div className={cn("flex items-center justify-between", indent)}>
        <Link
          href={item.path}
          onClick={onNavigate}
          className="flex-1 py-4 font-inter text-sm font-medium text-[#141718]"
        >
          {item.name}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.name}`}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <DropdownIcon
            className={cn("h-5 w-5 transition-transform", expanded && "rotate-180")}
          />
        </button>
      </div>
      {expanded && (
        <ul className="pb-2">
          {item.subLinks.map((subLink) => (
            <MobileNavItem
              key={subLink.id}
              item={subLink}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
