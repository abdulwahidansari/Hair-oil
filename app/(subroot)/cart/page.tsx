import { CartView } from "@/components/shop/cart-view";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Heading from "@/ui/head";

export default function CartPage() {
  return (
    <SectionLayout className="px-4 py-10 md:px-8 lg:px-12">
      <Heading as="h1" intent="shop-page" className="mb-8 text-3xl md:text-4xl">
        Your cart
      </Heading>
      <CartView />
    </SectionLayout>
  );
}
