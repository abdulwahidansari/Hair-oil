import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center md:mb-24">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
          About Us
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          We are passionate about delivering high-quality audio experiences through our carefully curated selection of headphones and audio equipment.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16 grid gap-8 md:mb-24 md:grid-cols-2 md:items-center md:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="/images/about/mission.jpg"
            alt="Our Mission"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to provide audio enthusiasts with the finest selection of headphones and audio equipment. We believe that everyone deserves to experience music in its purest form, which is why we carefully curate our products to ensure the highest quality and performance.
          </p>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              Delivering exceptional audio quality
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              Providing expert guidance and support
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              Ensuring customer satisfaction
            </li>
          </ul>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16 md:mb-24">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          Our Values
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Quality",
              description: "We only offer products that meet our high standards for audio excellence.",
            },
            {
              title: "Innovation",
              description: "We stay at the forefront of audio technology to bring you the latest advancements.",
            },
            {
              title: "Customer Focus",
              description: "Your satisfaction is our top priority, and we're here to help you find the perfect audio solution.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-50 p-6 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="mb-4 text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16 md:mb-24">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "John Smith",
              role: "Founder & CEO",
              image: "/images/about/team1.jpg",
            },
            {
              name: "Sarah Johnson",
              role: "Audio Specialist",
              image: "/images/about/team2.jpg",
            },
            {
              name: "Michael Chen",
              role: "Customer Experience",
              image: "/images/about/team3.jpg",
            },
            {
              name: "Emily Brown",
              role: "Product Manager",
              image: "/images/about/team4.jpg",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-4 aspect-square w-48 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg bg-gray-900 px-6 py-12 text-center text-white md:px-12">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Ready to Experience Premium Audio?</h2>
        <p className="mb-8 text-gray-300">
          Explore our collection of high-quality headphones and audio equipment.
        </p>
        <Link
          href="/shop"
          className="inline-block rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
} 