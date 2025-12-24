// package
import Image from "next/image";
import Link from "next/link";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Text from "@/ui/text";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/ui/assets/svg";

const paymentLogos = [
  { src: "/icons/ubl.png", alt: "UBL Pay" },
  { src: "/icons/Raast.png", alt: "Raast" },
  { src: "/icons/paypak.png", alt: "PayPak" },
  { src: "/icons/American.png", alt: "American Express" },
  { src: "/icons/unionpay.png", alt: "UnionPay" },
];

const Footer = () => {
  return (
    <SectionLayout bg="bg-transparent">
      <div className="space-y-0">
        {/* Upper (dark) area */}
        <div className="bg-[#0B0B0C] px-8 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-3">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Need Help?
              </Text>
              <div className="space-y-1 text-sm text-[#E5E7EB]">
                <Text size="sm" color="white/900">
                  +922 137 170 445
                </Text>
                <Text size="sm" color="gray">
                  (Mon - Sat: 9:30am - 10:00pm | Sun: 11am - 8pm)
                </Text>
              </div>
              <Text size="sm" color="white/900">
                coeleganceintl@gmail.com
            </Text>
          </div>

            <div className="space-y-3">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Catalogue
              </Text>
              <ul className="space-y-2 text-sm text-[#E5E7EB]">
                <li>
              <Link href="/shop">Shop</Link>
            </li>
                <li>
                  <Link href="/new-arrivals">New Arrivals</Link>
                </li>
                <li>
                  <Link href="/best-sellers">Best Sellers</Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Customer Service
              </Text>
              <ul className="space-y-2 text-sm text-[#E5E7EB]">
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/delivery">Delivery & Orders</Link>
                </li>
                <li>
                  <Link href="/returns">Returns & Exchanges</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/orders/track">Track My Order</Link>
                </li>
                <li>
                  <Link href="/payment-guide">Payment Guide</Link>
                </li>
                <li>
                  <Link href="/fabric-glossary">Fabric Glossary</Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Company
              </Text>
              <ul className="space-y-2 text-sm text-[#E5E7EB]">
                <li>
              <Link href="/about">About Us</Link>
            </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/stores">Store Addresses</Link>
            </li>
                <li>
                  <Link href="/corporate">Corporate</Link>
            </li>
          </ul>
        </div>

            <div className="space-y-4">
              <Text size="lg" weight={600} family="poppins" color="white/900">
                Follow Us
              </Text>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/Coeleganceintl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:opacity-75"
                >
                  <FacebookIcon stroke="#FEFEFE" className="h-5 w-5" />
                </a>
            <a
              href="https://www.instagram.com/coeleganceintl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
                  className="hover:opacity-75"
            >
                  <InstagramIcon fill="#FEFEFE" stroke="#FEFEFE" className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@Coelegance"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
                  className="hover:opacity-75"
            >
                  <YoutubeIcon stroke="#FEFEFE" className="h-5 w-5" />
            </a>
          </div>
            </div>
          </div>
            </div>

        {/* Lower (light) area */}
        <div className="bg-white px-8 py-6">
          <div className="flex flex-wrap items-center justify-start gap-4">
            {paymentLogos.map((logo) => (
              <div
                key={logo.alt}
                className="relative flex h-12 min-w-[100px] items-center justify-center rounded-md border border-[#E5E7EB] bg-white px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
            >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="max-h-10 w-auto object-contain"
                  quality={100}
                  loading="lazy"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Footer;
