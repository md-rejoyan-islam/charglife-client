"use client";
import Link from "next/link";
import Image from "next/image";
import { Address, Socials } from "@/types";

const Footer = ({addresses,socials}:{addresses:Address,socials:Socials}) => {

  const socialIcons: Record<string, JSX.Element> = {
    facebook: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Facebook icon SVG path */}
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
    instagram: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Instagram icon SVG path */}
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    twitter: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Twitter icon SVG path */}
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
    youtube: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* YouTube icon SVG path */}
        <path d="M23.498 6.186a2.97 2.97 0 0 0-2.093-2.093C19.784 3.5 12 3.5 12 3.5s-7.784 0-9.405.593A2.97 2.97 0 0 0 .502 6.186 31.653 31.653 0 0 0 0 12a31.653 31.653 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.093 2.093C4.216 20.5 12 20.5 12 20.5s7.784 0 9.405-.593a2.97 2.97 0 0 0 2.093-2.093A31.653 31.653 0 0 0 24 12a31.653 31.653 0 0 0-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
      </svg>
    ),
    tiktok: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* TikTok icon SVG path */}
        <path d="M12.875 3v9.557a3.125 3.125 0 1 1-2.25-3.027V7.57a5.625 5.625 0 1 0 6.375 5.544V8.824c.582.239 1.21.376 1.875.376h1.25V6.25h-1.25A3.75 3.75 0 0 1 15 2.5h-2.125z" />
      </svg>
    ),
  };

  return (
    <footer className="button-color">
      <div className="max-w-screen-xl mx-auto">
        <div className="border-b-2 border-[#100f11]"></div>
        <div className="pb-6 lg:pt-12 pt-6 px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 ">
            <div>
              <div className="w-40 mb-3">
                <Image
                  width={150}
                  height={100}
                  src="/img/black-n-red-logo.png"
                  alt="footer-logo"
                />
              </div>

              <p className="leading-relaxed text-center sm:max-w-xs sm:mx-0 sm:text-left">
                {addresses?.description}
              </p>

              <ul className="flex justify-center mt-5 gap-4 sm:justify-start">
                {socials &&
                  Object.entries(socials).map(
                    ([platform, url]) =>
                      url && (
                        <li key={platform}>
                          <Link
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-teal-500 transition hover:text-teal-500/75"
                          >
                            <span className="sr-only">{platform}</span>
                            {socialIcons[platform]}
                          </Link>
                        </li>
                      )
                  )}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-3">
              <div className="text-center sm:text-left">
                <p className="text-lg font-bold border-b-2 border-black w-32">
                  Company
                </p>

                <nav className="mt-8">
                  <ul className="space-y-4 text-sm">
                    <li>
                      <Link href="/about-us" className=" transition hover:/75">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/faqs" className=" transition hover:/75">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link href="/career" className=" transition hover:/75">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-bold border-b-2 border-black w-32">
                  Our Services
                </p>
                <nav className="mt-8">
                  <ul className="space-y-4 text-sm">
                    <li>
                      <Link href="/marketing" className=" transition hover:/75">
                        Marketing
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className=" transition hover:/75">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/e-warranty" className=" transition hover:/75">
                        E Warranty
                      </Link>
                    </li>
                    <li>
                      <Link href="/coupon" className=" transition hover:/75">
                      Coupon
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-bold border-b-2 border-black w-32">
                  Contact Us
                </p>
                <ul className="mt-8 text-sm">
               
                    <li key={addresses?._id} className="space-y-4">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="transition group-hover:/75">
                          {addresses?.email}
                        </span>
                      </div>

                      {/* Phone number */}
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="transition group-hover:/75">
                          {addresses?.phone}
                        </span>
                      </div>

                      {/* Address */}
                      <div className="flex items-start justify-center gap-1.5 sm:justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <address className="-mt-0.5 not-italic">
                          {addresses?.address}
                        </address>
                      </div>
                    </li>
                
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-black">
            <div className="text-center sm:flex sm:justify-between sm:text-left">
              <p className="text-sm text-gray-500">
                <span className="block sm:inline">All rights reserved. </span>
                <span className="block sm:inline">
                  &copy; {new Date().getFullYear()} Charg
                </span>
              </p>

              <span className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
                Developed by{" "}
                <Link
                  href="https://amarlodge.com/"
                  className="hover:text-primary duration-300"
                >
                  Amarlodge
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
