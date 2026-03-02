"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ContactUs = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({ name: "", phone: "", email: "", comment: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailUsClick = () => {
    const email = "coeleganceintl@gmail.com";
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">DROP US A QUERY</h1>
          <p className="text-gray-600">
            We&apos;re here to quickly provide you with the info and services you need & answer any question you may have
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">SEND US AN EMAIL:</h2>
            <p className="text-gray-600">ASK US ANYTHING! WE&apos;LL GET BACK TO YOU WITHIN 24-48 HOURS.</p>

            {submitStatus.type && (
              <div
                className={`rounded-md p-4 ${
                  submitStatus.type === "success" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    submitStatus.type === "success" ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Your Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Your Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  required
                  rows={6}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Please leave your comment here"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#EE1D52] px-6 py-3 text-center text-sm font-semibold text-white transition-all ${
                  isSubmitting ? "cursor-not-allowed opacity-70" : "hover:bg-[#EE1D52]/90"
                }`}
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT CONTACT"}
              </button>
            </form>
          </div>

          {/* Customer Service Info */}
          <div className="space-y-8 bg-gray-50 p-8">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">CUSTOMER SERVICE</h2>
              <p className="text-gray-600">
                IF YOU HAVE AN ISSUE OR QUESTION THAT REQUIRES IMMEDIATE ASSISTANCE, YOU CAN CONTACT A CUSTOMER SERVICE REPRESENTATIVE ON THE NUMBERS GIVEN BELOW:
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Phone:</p>
                <a href="tel:+922137170445" className="text-gray-600 hover:text-gray-900">
                  +92 213 717 0445
                </a>
              </div>

              <div>
                <p className="font-medium text-gray-700">For customer queries:</p>
                <a 
                  href="mailto:coeleganceintl@gmail.com" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  coeleganceintl@gmail.com
                </a>
              </div>

              <div>
                <p className="text-gray-600">
                  IF WE AREN&apos;T AVAILABLE, DROP US AN EMAIL AND WE&apos;LL RESPOND WITHIN 24-48 HOURS
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700">OUR CUSTOMER SERVICE TEAM IS AVAILABLE</p>
                <p className="text-gray-600">Mon - Sat: 9:30am - 10:00pm</p>
                <p className="text-gray-600">Sun: 11am - 8pm</p>
              </div>

              <div>
                <p className="text-gray-600">Head Office Location: Karachi, Pakistan</p>
              </div>

              <button
                onClick={handleEmailUsClick}
                className="w-full border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                EMAIL US
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                FOR BULK ORDERS, DISTRIBUTION AND CORPORATE INQUIRIES, SUBJECT: CORPORATE
              </h3>
              <div>
                <p className="font-medium text-gray-700">Email:</p>
                <a 
                  href="mailto:coeleganceintl@gmail.com?subject=CORPORATE" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  coeleganceintl@gmail.com (Subject: CORPORATE)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 