/**
 * CoElegance catalog — the single source of truth for categories, products,
 * the navigation menu, collection pages, the cart and checkout pricing.
 *
 * HOW TO ADD THINGS LATER
 * -----------------------
 * New category (e.g. Makeup, Bodycare, Men):
 *   1. Add an entry to CATEGORIES. Give it no `parent` to make it a top-level
 *      menu item, or set `parent` to another category's slug to nest it.
 *   2. That's it — the menu, /collections/<slug> page and sitemap pick it up.
 *
 * New product:
 *   1. Drop the photos in /public/images.
 *   2. Add an entry to PRODUCTS with `categories: ["<category slug>"]`.
 *   3. Set `status: "active"` once the price and details are final.
 *      Products with `status: "coming-soon"` are shown on the site but cannot be
 *      ordered, show no price, are noindexed and are left out of the sitemap.
 */

// NOTE: this file must not import from lib/product.ts — product.ts reads from here.
import { productFaqs } from "@/lib/faq";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Category = {
  /** URL slug, used as /collections/<slug>. Must be unique. */
  slug: string;
  name: string;
  /** Slug of the parent category. Omit for a top-level menu item. */
  parent?: string;
  /** Short line shown under the collection heading and in the shop tiles. */
  description: string;
  /** <title> for the collection page (keep it under ~60 characters). */
  metaTitle: string;
  /** Meta description for the collection page (keep it under ~155 characters). */
  metaDescription: string;
};

export type ProductImage = { src: string; alt: string };

export type ProductStatus = "active" | "coming-soon";

export type Product = {
  /** URL slug, used as /products/<slug>. Must be unique. */
  slug: string;
  name: string;
  /** Short card label, e.g. "Hair Oil". */
  tagline: string;
  /** Category slugs this product belongs to. */
  categories: string[];
  status: ProductStatus;
  /** Price in PKR. Required when status is "active". */
  price?: number;
  /** Original price in PKR, shown struck through. Only set if it is a real previous price. */
  compareAtPrice?: number;
  sku: string;
  /** Pack size, e.g. "200ml". */
  size?: string;
  images: ProductImage[];
  description: string[];
  benefits?: string[];
  usage?: string[];
  ingredients?: string;
  /** Meta description for the product page. */
  metaDescription: string;
  /** Title for the product page (absolute, includes brand). */
  metaTitle: string;
  /** Question/answer pairs. Only render these on the page if they are also shown visibly. */
  faqs?: { question: string; answer: string }[];
  /** When true, the site-wide testimonials are used for rating markup. */
  showReviews?: boolean;
};

// ---------------------------------------------------------------------------
// Store settings
// ---------------------------------------------------------------------------

export const CURRENCY = "PKR";
/** Flat delivery fee in PKR (same value the checkout used before). */
export const SHIPPING_FEE = 200;
/** Largest quantity of one product in a single order. */
export const MAX_QUANTITY = 20;
export const PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

// ---------------------------------------------------------------------------
// Categories  (add new ones here — see the note at the top of the file)
// ---------------------------------------------------------------------------

export const CATEGORIES: Category[] = [
  {
    slug: "hair-care",
    name: "Hair Care",
    description: "Shampoos and herbal oils for a healthy scalp and stronger hair.",
    metaTitle: "Hair Care Products in Pakistan – CoElegance",
    metaDescription:
      "Shop CoElegance hair care: herbal hair oil and shampoos made in Pakistan. Cash on delivery nationwide.",
  },
  {
    slug: "shampoos",
    name: "Shampoos",
    parent: "hair-care",
    description: "Gentle shampoos for repair and scalp care.",
    metaTitle: "Shampoos – Hair Repair & Anti-Dandruff | CoElegance",
    metaDescription:
      "CoElegance shampoos for damaged hair and flaky scalps. Made in Pakistan, cash on delivery nationwide.",
  },
  {
    slug: "hair-oils",
    name: "Hair Oils",
    parent: "hair-care",
    description: "Herbal hair oil made with 20+ botanical ingredients.",
    metaTitle: "Herbal Hair Oil in Pakistan – CoElegance",
    metaDescription:
      "CoElegance herbal hair oil with 20+ botanical ingredients to help reduce hair fall. Cash on delivery nationwide.",
  },
];

// ---------------------------------------------------------------------------
// Products  (add new ones here)
// ---------------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  {
    // Keep this slug unchanged: it is the live product URL (/products/organic-hair-oil-best-seller).
    slug: "organic-hair-oil-best-seller",
    name: "CoElegance Organic Herbal Hair Oil 200ml",
    tagline: "Hair Oil",
    categories: ["hair-oils"],
    status: "active",
    price: 1500,
    compareAtPrice: 2000,
    sku: "COELEGANCE-HAIR-OIL-200ML",
    size: "200ml",
    images: [
      { src: "/images/bottel.png", alt: "CoElegance Organic Hair Oil with golden oil splash" },
      { src: "/images/image 1.png", alt: "CoElegance Organic Hair Oil — front" },
      { src: "/images/main.png", alt: "CoElegance Organic Hair Oil — lifestyle" },
      { src: "/images/Organic 1.png", alt: "CoElegance Organic Hair Oil — product detail" },
    ],
    description: [
      "A powerful organic hair growth oil is meticulously crafted to nourish your scalp while promoting thicker, fuller hair. It has 20+ herbs and 6 natural oils — our formula strengthens hair follicles, reduces breakage, and stimulates growth.",
      "Ideal for all hair types, deeply nourishing and hydrating the scalp and helping your hair feel softer, fuller, and more vibrant. Use it regularly, and your hair can look healthier, shinier, and better maintained, naturally.",
      "Give your hair the care it deserves with a botanical-rich formula designed for everyday hair care. Shop CoElegance Organic Hair Oil today and add the good stuff of natural ingredients to your hair care routine.",
    ],
    benefits: [
      "Helps reduce hair fall and supports healthier-looking growth.",
      "Nourishes the scalp with 20+ herbs and 6 natural oils.",
      "Strengthens hair follicles and reduces breakage with regular use.",
      "Lightweight, non-sticky feel suitable for all hair types.",
      "Deeply hydrates the scalp for softer, shinier hair.",
    ],
    usage: [
      "Shake CoElegance Organic Hair Oil bottle well before use.",
      "Gently massage in circular motions for a few minutes into scalp and ends of hair.",
      "Leave on for at least 30 minutes, or overnight for deeper care.",
      "Wash with your usual shampoo. Use 2–3 times per week, or as needed.",
      "Do not use on cut, broken or irritated skin.",
      "Avoid contact with eyes. In the event of contact with eyes, rinse thoroughly with water.",
      "Do not use if you are sensitive or allergic to any of the ingredients.",
      "Store under 30°C and out of direct sunlight.",
      "For external use only.",
    ],
    ingredients:
      "Mustard oil, Coconut oil, Sesame seeds, Jasmine oil, Jojoba oil, Olive oil, Rosemary essential oil, Argan oil, Avocado oil, Peppermint oil, Tea tree oil, Linseed oil, Almond oil, Vitamin E oil, Castor oil, Almonds, Beetroot, Ginger, Coriander leaves, Onions, Aloe vera, Amla, Fenugreek seeds, Terminalia chebula, Jatamansi, Sapindus mukorossi, Black cumin, Alkanet root, Cloves, Curry leaves, Shikakai.",
    metaTitle: "CoElegance Herbal Hair Oil 200ml – Buy in Pakistan (COD)",
    metaDescription:
      "Buy CoElegance Organic Herbal Hair Oil 200ml in Pakistan. Herbal formula to help reduce hair fall and strengthen roots. Cash on delivery nationwide.",
    showReviews: true,
    // Same FAQ markup the product page already had. It is not shown on the page yet.
    faqs: productFaqs,
  },

  // TODO(owner): the two shampoos below are drafts. Before launching them:
  //   - add real photos in /public/images and replace the `images` entries,
  //   - fill in `price`, `size` and the full `ingredients` list copied from your label,
  //   - confirm every claim on the bottle: "sulphate-free", "paraben-free", "silicone-free",
  //     "halal", "cruelty-free" (add them to the copy only once the label supports them),
  //   - add any allergy / dietary note your label carries (for example nut allergy,
  //     or "not vegan" if the formula contains keratin),
  //   - add shelf-life wording from the label (for example months after opening),
  //   - change `status` to "active".
  {
    slug: "hair-repair-shampoo",
    name: "CoElegance Hair Repair Shampoo",
    tagline: "Shampoo",
    categories: ["shampoos"],
    status: "coming-soon",
    sku: "COELEGANCE-HAIR-REPAIR-SHAMPOO",
    images: [
      {
        src: PLACEHOLDER_IMAGE,
        alt: "CoElegance Hair Repair Shampoo — product photo coming soon",
      },
    ],
    description: [
      "CoElegance Hair Repair Shampoo is a gentle everyday shampoo for hair that feels dry, rough or tired from heat styling, colouring, sun and dust. It cleans the scalp while leaving your hair softer, smoother and easier to comb.",
      "It is made for dry, brittle and chemically treated hair, and works well on fine or flat hair that needs a little extra body. Follow it with your usual conditioner to keep the ends feeling smooth between trims.",
    ],
    benefits: [
      "Gently cleanses the hair and scalp.",
      "Helps hair feel softer, smoother and more manageable.",
      "Made for dry, brittle and chemically treated hair.",
      "Helps hair look shinier and fuller.",
      "Helps rough ends look and feel smoother.",
    ],
    usage: [
      "Wet your hair and scalp thoroughly.",
      "Take a small amount, work it into a lather and massage the scalp gently for about two minutes.",
      "Rinse well with water. Follow with a conditioner for best results.",
      "Do a patch test on the inner elbow before first use, and stop using it if irritation occurs.",
      "Avoid contact with eyes. If it gets in your eyes, rinse well with water.",
      "Keep out of reach of children. For external use only.",
      "Store below 30°C and out of direct sunlight.",
    ],
    metaTitle: "CoElegance Hair Repair Shampoo – Coming Soon",
    metaDescription:
      "CoElegance Hair Repair Shampoo for dry, rough, damaged-looking hair, made in Pakistan. Coming soon.",
  },
  {
    slug: "anti-dandruff-shampoo",
    name: "CoElegance Anti-Dandruff Shampoo",
    tagline: "Shampoo",
    categories: ["shampoos"],
    status: "coming-soon",
    sku: "COELEGANCE-ANTI-DANDRUFF-SHAMPOO",
    images: [
      {
        src: PLACEHOLDER_IMAGE,
        alt: "CoElegance Anti-Dandruff Shampoo — product photo coming soon",
      },
    ],
    description: [
      "CoElegance Anti-Dandruff Shampoo is a scalp-care shampoo made for flaky, itchy-feeling scalps.",
      "Full product details and pricing will be available at launch.",
    ],
    usage: [
      "Wet your hair and scalp thoroughly.",
      "Take a small amount, work it into a lather and massage the scalp gently for a couple of minutes.",
      "Rinse well with water.",
      "Do a patch test on the inner elbow before first use, and stop using it if irritation occurs.",
      "Avoid contact with eyes. If it gets in your eyes, rinse well with water.",
      "Keep out of reach of children. For external use only.",
      "Store below 30°C and out of direct sunlight.",
    ],
    metaTitle: "CoElegance Anti-Dandruff Shampoo – Coming Soon",
    metaDescription:
      "CoElegance Anti-Dandruff Shampoo for flaky, itchy-feeling scalps, made in Pakistan. Coming soon.",
  },
];

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function isPurchasable(product: Product): boolean {
  return product.status === "active" && typeof product.price === "number";
}

/** The product, but only if it is live and can be ordered (active with a price). */
export function getPublishedProduct(slug: string): Product | undefined {
  const product = getProduct(slug);
  return product && isPurchasable(product) ? product : undefined;
}

type WithSlug = string | { slug: string };

function slugOf(input: WithSlug): string {
  return typeof input === "string" ? input : input.slug;
}

/** Page path for a product. Accepts a product or just its slug. */
export function productHref(product: WithSlug): string {
  return `/products/${slugOf(product)}`;
}

/** Page path for a category. Accepts a category or just its slug. */
export function collectionHref(category: WithSlug): string {
  return `/collections/${slugOf(category)}`;
}

export function childCategories(parentSlug: string): Category[] {
  return CATEGORIES.filter((category) => category.parent === parentSlug);
}

export function topLevelCategories(): Category[] {
  return CATEGORIES.filter((category) => !category.parent);
}

/** The category itself plus every category below it. */
export function descendantSlugs(slug: string): string[] {
  const result = [slug];
  childCategories(slug).forEach((child) => {
    result.push(...descendantSlugs(child.slug));
  });
  return result;
}

/** Products in a category, including products in its sub-categories. */
export function productsInCategory(slug: string): Product[] {
  const slugs = descendantSlugs(slug);
  return PRODUCTS.filter((product) =>
    product.categories.some((categorySlug) => slugs.includes(categorySlug)),
  );
}

/** Category chain from the top level down to this category, for breadcrumbs. */
export function categoryTrail(slug: string): Category[] {
  const trail: Category[] = [];
  let current = getCategory(slug);
  while (current) {
    trail.unshift(current);
    current = current.parent ? getCategory(current.parent) : undefined;
  }
  return trail;
}

export function searchProducts(query: string): Product[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return PRODUCTS;
  }

  return PRODUCTS.filter((product) => {
    const haystack = [
      product.name,
      product.tagline,
      ...product.categories.map((slug) => getCategory(slug)?.name ?? ""),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter((other) => other.slug !== product.slug)
    .sort((a, b) => {
      const sharedA = a.categories.some((c) => product.categories.includes(c)) ? 0 : 1;
      const sharedB = b.categories.some((c) => product.categories.includes(c)) ? 0 : 1;
      return sharedA - sharedB;
    })
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Navigation menu (built from CATEGORIES)
// ---------------------------------------------------------------------------

export type NavItem = {
  id: string;
  name: string;
  path: string;
  subLinks?: NavItem[];
};

function categoryNavItem(category: Category): NavItem {
  const children = childCategories(category.slug);
  const item: NavItem = {
    id: category.slug,
    name: category.name,
    path: collectionHref(category),
  };

  if (children.length > 0) {
    item.subLinks = [
      {
        id: `${category.slug}-all`,
        name: `All ${category.name}`,
        path: collectionHref(category),
      },
      ...children.map(categoryNavItem),
    ];
  }

  return item;
}

/** Full main menu: fixed pages plus one dropdown per top-level category. */
export function mainNavItems(): NavItem[] {
  return [
    { id: "home", name: "Home", path: "/" },
    { id: "shop", name: "Shop", path: "/shop" },
    ...topLevelCategories().map(categoryNavItem),
    { id: "about", name: "About Us", path: "/about" },
    { id: "blog", name: "Blog", path: "/blog" },
    { id: "contact", name: "Contact Us", path: "/contact" },
  ];
}

// ---------------------------------------------------------------------------
// Pricing (used by the cart page, checkout and the order API)
// ---------------------------------------------------------------------------

export type OrderLineInput = { slug: string; quantity: number };

export type OrderLine = {
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  lineSavings: number;
};

export type OrderTotals = {
  lines: OrderLine[];
  itemCount: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
};

export function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) {
    return 1;
  }
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(value)));
}

/**
 * Price an order from product slugs and quantities. Unknown or unavailable
 * products are dropped. Prices always come from this catalog, never from the
 * browser, so the same function is safe to use on the server.
 */
export function priceOrder(inputs: OrderLineInput[]): OrderTotals {
  const merged = new Map<string, number>();
  inputs.forEach((input) => {
    const product = getProduct(input.slug);
    if (!product || !isPurchasable(product)) {
      return;
    }
    merged.set(
      product.slug,
      Math.min(MAX_QUANTITY, (merged.get(product.slug) ?? 0) + clampQuantity(input.quantity)),
    );
  });

  const lines: OrderLine[] = [];
  merged.forEach((quantity, slug) => {
    const product = getProduct(slug);
    if (!product || typeof product.price !== "number") {
      return;
    }
    const unitPrice = product.price;
    const compareAt = product.compareAtPrice ?? unitPrice;
    lines.push({
      product,
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
      lineSavings: Math.max(0, compareAt - unitPrice) * quantity,
    });
  });

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const savings = lines.reduce((sum, line) => sum + line.lineSavings, 0);
  const shipping = lines.length > 0 ? SHIPPING_FEE : 0;

  return { lines, itemCount, subtotal, savings, shipping, total: subtotal + shipping };
}

export function formatPKR(value: number): string {
  return `Rs ${value.toLocaleString("en-PK")}`;
}
