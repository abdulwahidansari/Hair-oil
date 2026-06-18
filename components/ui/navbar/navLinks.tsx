// package
import Link from "next/link";
import { usePathname } from "next/navigation";

// ui
import NavDropdown from "@/ui/navbar/navDropdown";
import { NavLinkProps } from "@/ui/navbar/definition";

// lib
import { cn } from "@/lib/utils";
import { productPath } from "@/lib/product";

const links: NavLinkProps[] = [
  {
    id: "home",
    path: "/",
    name: "Home",
  },
  {
    id: "shop",
    path: productPath(),
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

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex lg:justify-center lg:gap-10">
      {links.map((link) => (
        <li
          key={link.id}
          className={cn(
            "font-inter text-sm font-medium text-[#141718] hover:opacity-100",
            pathname !== link.path && "opacity-70",
          )}
        >
          {link.subLinks ? (
            <NavDropdown link={link} />
          ) : (
            <Link href={link.path}>{link.name}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}
