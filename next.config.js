/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/products/coelegance-organic-hair-oil-best-seller",
        destination: "/products/organic-hair-oil-best-seller",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
