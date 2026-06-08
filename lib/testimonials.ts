export type Testimonial = {
  quote: string;
  author: string;
  location: string;
  rating: number;
  datePublished: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I've never felt better about the products I use on my Hair. CoElegance delivers on its promise of organic, effective Hair oil.!",
    author: "Bisma Khan",
    location: "Karachi",
    rating: 5,
    datePublished: "2025-01-15",
  },
  {
    quote:
      "My hair fall reduced within weeks and feels thicker at the roots. CoElegance is now a permanent part of my night routine.",
    author: "Ayesha Khan",
    location: "Karachi",
    rating: 5,
    datePublished: "2025-02-03",
  },
  {
    quote:
      "I love that it's herbal and still lightweight. My scalp feels calm and my hair looks healthier without feeling greasy.",
    author: "Sara Malik",
    location: "Lahore",
    rating: 5,
    datePublished: "2025-02-20",
  },
  {
    quote:
      "After using CoElegance regularly, my hair feels stronger and breakage has visibly reduced. Highly recommend for damaged hair.",
    author: "Hamza Ali",
    location: "Islamabad",
    rating: 5,
    datePublished: "2025-03-01",
  },
];

export const featuredTestimonial = testimonials[0];
