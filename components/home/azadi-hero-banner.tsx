import Image from "next/image";
import Link from "next/link";

import { productPath } from "@/lib/product";

export default function AzadiHeroBanner() {
  return (
    <section aria-label="Azadi Sale promotion" className="relative w-full overflow-hidden">
      <Link href={productPath()} className="block">
        <div className="relative aspect-[21/9] min-h-[200px] w-full sm:min-h-[260px] md:min-h-[340px] lg:min-h-[420px] xl:min-h-[480px]">
          <Image
            src="/images/azadi-sale-hero.png"
            alt="Azadi Sale — Flat 25% off CoElegance Organic Hair Oil, 13 Aug to 16 Aug"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </Link>
    </section>
  );
}
