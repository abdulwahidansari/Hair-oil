// package
import Link from "next/link";
import { usePathname } from "next/navigation";

// ui
import NavDropdown from "@/ui/navbar/navDropdown";
import { NavLinkProps } from "@/ui/navbar/definition";

// lib
import { cn } from "@/lib/utils";
import { mainNavItems } from "@/lib/catalog";

// The menu is built from the categories in lib/catalog.ts — add a category there
// and it appears here (and in the mobile menu) automatically.
const links: NavLinkProps[] = mainNavItems();

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex lg:justify-center lg:gap-10">
      {links.map((link) => {
        const isActive =
          pathname === link.path ||
          Boolean(link.subLinks?.some((subLink) => subLink.path === pathname));

        return (
          <li
            key={link.id}
            className={cn(
              "font-inter text-sm font-medium text-[#141718] hover:opacity-100",
              !isActive && "opacity-70",
            )}
          >
            {link.subLinks ? (
              <NavDropdown link={link} />
            ) : (
              <Link href={link.path}>{link.name}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
