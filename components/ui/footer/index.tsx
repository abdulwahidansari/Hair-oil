// package
import Link from "next/link";

import { productPath } from "@/lib/product";

// ui
import Text from "@/ui/text";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();
  const linkClass =
    "text-sm text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EE1D52] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C]";

  const socials = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61587810810965",
      brand: "#1877F2",
      Icon: FaFacebookF,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/coelegance.store/",
      brand: "#E1306C",
      Icon: FaInstagram,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@Coelegance",
      brand: "#FF0000",
      Icon: FaYoutube,
    },
    {
      label: "Pinterest",
      href: "https://www.pinterest.com/coelegance/",
      brand: "#E60023",
      Icon: FaPinterestP,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@coeleganceintl",
      brand: "#25F4EE",
      Icon: FaTiktok,
    },
  ] as const;

  return (
    <footer className="w-full">
      {/* Upper (dark) area - full width black background */}
      <div className="w-full bg-[#0B0B0C]">
        <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-14 md:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* Brand + Contact */}
            <div className="space-y-4 lg:col-span-4">
              <div className="space-y-2">
                <Text size="lg" weight={600} family="poppins" color="white/900">
                  CoElegance
                </Text>
                <p className="max-w-sm text-sm leading-relaxed text-white/70">
                  Organic herbal hair care made with thoughtfully selected botanical oils to
                  nourish roots and support healthier, stronger hair.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <a href="tel:+923071123512" className={linkClass}>
                Phone : +923071123512
                </a>
                <a href="mailto:coeleganceintl@gmail.com" className={linkClass}>
                  coeleganceintl@gmail.com
                </a>
                <div className="text-white/60">Karachi, Pakistan</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 lg:col-span-3">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Quick Links
              </Text>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={productPath()}
                    className={linkClass}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className={linkClass}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={linkClass}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={linkClass}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="space-y-4 lg:col-span-3">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Policies
              </Text>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className={linkClass}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className={linkClass}>
                    Refund & Exchange Policy
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className={linkClass}>
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div className="space-y-4 lg:col-span-2">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Follow Us
              </Text>
              <div className="flex items-center gap-3">
                {socials.map(({ href, label, brand, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-[var(--brand)] ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand)] hover:text-white hover:ring-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EE1D52] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C]"
                    style={{ ["--brand" as any]: brand }}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-white/50">
                Follow for hair care tips, offers, and new launches.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-3 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
              <div>© {2026} CoElegance. All rights reserved.</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/terms" className={linkClass}>
                  Terms
                </Link>
                <Link href="/refund" className={linkClass}>
                  Refund Policy
                </Link>
                <Link href="/contact" className={linkClass}>
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
