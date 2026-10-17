export type FaqItem = {
  question: string;
  answer: string;
};

/*
 * Every answer here is also shown on the page (see components/seo/faq-section.tsx)
 * and is used as FAQPage markup, so keep the wording true and in line with
 * /refund, /shipping and the product page.
 */

export const homepageFaqs: FaqItem[] = [
  {
    question: "What is CoElegance Organic Herbal Hair Oil?",
    answer:
      "CoElegance is a herbal hair oil made in Pakistan with more than 20 natural ingredients including black seed oil, castor oil, and olive oil. It is formulated to help reduce hair fall, strengthen roots, and support healthier-looking hair.",
  },
  {
    question: "How long does it take to see results with CoElegance?",
    answer:
      "Results vary from person to person. With regular use, 2–3 times per week, you may start to notice a difference in hair fall and thickness after about 4–6 weeks. If you have sudden or heavy hair loss, please see a doctor.",
  },
  {
    question: "Is CoElegance suitable for all hair types?",
    answer:
      "CoElegance is a lightweight oil made to suit most hair types, including dry, oily, and colour-treated hair. It is free from mineral oil, parabens, silicones, and artificial fragrance. As with any new product, try a small patch first.",
  },
  {
    question: "Do you offer cash on delivery across Pakistan?",
    answer:
      "Yes. We deliver nationwide with cash on delivery (COD), including Karachi, Lahore, Islamabad, Peshawar, and Quetta. Delivery usually takes 2–7 working days, and a flat delivery fee is shown at checkout.",
  },
  {
    question: "Is CoElegance halal-friendly and cruelty-free?",
    answer:
      "Yes. CoElegance Organic Herbal Hair Oil is halal-friendly, cruelty-free, and not tested on animals. It is made in small batches with ethically sourced botanical ingredients.",
  },
];

export const productFaqs: FaqItem[] = [
  {
    question: "How do I use CoElegance Organic Hair Oil?",
    answer:
      "Apply 8–10 drops to the scalp and massage in circular motions for a few minutes. Leave it on for at least 30 minutes, or overnight for deeper care, then wash with your usual shampoo. Use 2–3 times per week.",
  },
  {
    question: "What are the main ingredients in CoElegance hair oil?",
    answer:
      "CoElegance contains mustard oil, coconut oil, rosemary essential oil, castor oil, olive oil, black cumin, aloe vera, amla, fenugreek, onion, and more than 20 other natural botanical ingredients. The full list is under Ingredients on this page.",
  },
  {
    question: "How many bottles should I order?",
    answer:
      "One 200ml bottle usually lasts around 4–6 weeks with regular use, depending on your hair length and how often you apply it. Order more than one bottle if you want to use it consistently for a couple of months.",
  },
  {
    question: "Can I use CoElegance on coloured or chemically treated hair?",
    answer:
      "CoElegance is a lightweight, non-sticky herbal oil without mineral oil, parabens, or silicones. Many people with colour-treated hair use herbal oils, but everyone's hair is different, so try a small patch first and stop using it if you notice irritation.",
  },
  {
    question: "What if my order arrives damaged?",
    answer:
      "Tell us within 24 hours of delivery, by email or WhatsApp, with your order number and clear photos of the item and invoice. We arrange a courier pickup and send a replacement. Please keep the product and its packaging. Full details are in our Refund & Exchange Policy.",
  },
  {
    question: "How long does delivery take and how do I pay?",
    answer:
      "We deliver across Pakistan and you pay cash on delivery. Delivery usually takes 2–7 working days. A flat delivery fee is shown at checkout before you place your order.",
  },
];
