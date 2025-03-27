// package
import Link from "next/link";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Text from "@/ui/text";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/ui/assets/svg";
import Logo1 from "@/ui/assets/logo1";

const Footer = () => {
  return (
    <SectionLayout bg="bg-[#141718]">
      <div className="space-y-10 px-8 py-12 lg:space-y-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-0">
            <Logo1 />
            <span className="h-[1px] w-8 rounded-full bg-[#6C7275] lg:hidden"></span>
            <Text size="sm" color="white/900" className="lg:pl-8">
              Headphone Store
            </Text>
          </div>

          <ul className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            <li className="text-center font-inter text-sm font-normal text-[#FEFEFE] hover:text-gray-300">
              <Link href="/">Home</Link>
            </li>
            <li className="text-center font-inter text-sm font-normal text-[#FEFEFE] hover:text-gray-300">
              <Link href="/shop">Shop</Link>
            </li>
            <li className="text-center font-inter text-sm font-normal text-[#FEFEFE] hover:text-gray-300">
              <Link href="/about">About Us</Link>
            </li>
            <li className="text-center font-inter text-sm font-normal text-[#FEFEFE] hover:text-gray-300">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="text-center font-inter text-sm font-normal text-[#FEFEFE] hover:text-gray-300">
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 border-t border-[#6C7275] py-6 lg:flex-row lg:justify-between lg:gap-0 lg:py-4">
          <div className="flex items-center justify-center gap-6 lg:order-2">
            <a
              href="#"
              className="group transition-transform duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <InstagramIcon
                fill="#FEFEFE"
                stroke="#FEFEFE"
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </a>
            <a
              href="#"
              className="group transition-transform duration-200 hover:scale-110"
              aria-label="Facebook"
            >
              <FacebookIcon 
                stroke="#FEFEFE" 
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </a>
            <a
              href="#"
              className="group transition-transform duration-200 hover:scale-110"
              aria-label="YouTube"
            >
              <YoutubeIcon 
                stroke="#FEFEFE" 
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </a>
          </div>

          <div className="flex flex-col gap-7 lg:order-1 lg:flex-row">
            <div className="flex flex-col gap-4 text-center sm:flex-row sm:justify-center sm:gap-7 lg:order-2">
              <Link href="/refund" className="hover:text-gray-300">
                <Text size="xs" weight={600} family="poppins" color="white/900">
                  Refund & Exchange Policy
                </Text>
              </Link>
              <Link href="/terms" className="hover:text-gray-300">
                <Text size="xs" weight={600} family="poppins" color="white/900">
                  Terms of Service (Privacy Policy)
                </Text>
              </Link>
              <Link href="/sitemap" className="hover:text-gray-300">
                <Text size="xs" weight={600} family="poppins" color="white/900">
                  Sitemap
                </Text>
              </Link>
            </div>

            <Text
              family="poppins"
              size="xs"
              color="white/800"
              className="text-center lg:order-1 lg:text-left"
            >
              Copyright © 2024 Coeleganceintl. All rights reserved
            </Text>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Footer;
