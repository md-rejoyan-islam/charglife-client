"use client";

import React, { useEffect, useState } from "react";
import { config } from "@/config";
import { Address } from "@/types";

const ContactContainer = () => {
  const [addresses, setAddresses] = useState<Address>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${config.backend_url}/address`)
      .then((response) => response.json())
      .then((json) => setAddresses(json.data))
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const body = JSON.stringify(formData);
      const response = await fetch(`${config.backend_url}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Failed to send the message. Please try again later.");
      }

      setSuccess("Your message has been sent successfully.");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (error:any) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="mx-auto max-w-7xl px-0 md:px-10 py-12 flex sm:flex-nowrap flex-wrap px-2">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative h-[700px] md:h-auto">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
             src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d228.12470637322352!2d90.42015239999999!3d23.818766099999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c78afe3bb29b%3A0xf84bad6c42f71e83!2sCHARG!5e0!3m2!1sen!2sbd!4v1741249303941!5m2!1sen!2sbd" 
             loading="lazy"
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            {addresses ? (
              <>
                <div className="lg:w-1/2 px-6">
                  <h2 className="uppercase font-bold title-font text-gray-900 tracking-widest text-xs">
                    Address
                  </h2>
                  <p className="mt-1">{addresses?.address}</p>
                </div>
                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                    EMAIL
                  </h2>
                  <a
                    href={`mailto:${addresses?.email}`}
                    className="text-indigo-500 leading-relaxed"
                  >
                    {addresses?.email}
                  </a>
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                    PHONE
                  </h2>
                  <p className="leading-relaxed">{addresses?.phone}</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Loading address...</p>
            )}
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col w-full md:p-8 p-4">
          <h2 className="text-gray-900 mb-1 font-semibold text-2xl">Feedback</h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Post-ironic portland shabby chic echo park, banjo fashion axe
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4 flex gap-2">
              <div>
                <label className="leading-7 text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div>
                <label className="leading-7 text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-black border-none py-2 px-6 focus:outline-none hover:bg-black/80 duration-300 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral
            artisan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactContainer;
