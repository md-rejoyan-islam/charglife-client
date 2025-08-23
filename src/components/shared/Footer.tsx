"use client";
import { config } from "@/config";
import { Address } from "@/types";
import { Headset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiResponse, Category } from "./Header";

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

export default function Footer({
  addresses,
  socials,
}: {
  addresses: Address;
  socials: any;
}) {
  delete socials._id;
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${config.backend_url}/category`)
      .then((response) => response.json())
      .then((json: ApiResponse<Category>) => {
        setCategories(json?.data?.result);
      });
  }, []);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${config.backend_url}/page`)
      .then((response) => response.json())
      .then((json: ApiResponse<Category>) => {
        setPages(json?.data?.result);
      });
  }, []);
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-8">
          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2 space-y-4 text-center md:text-left">
            <div className="mb-6">
              <div className="">
                <div className="flex items-center justify-center md:justify-start">
                  <Link href="/" className="flex items-center">
                    <div className="w-40 mb-3">
                      <Image
                        width={150}
                        height={100}
                        src="/img/black-n-red-logo.png"
                        alt="footer-logo"
                      />
                    </div>
                  </Link>
                </div>

                <div className="mt-2">
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <div className="">
                      <Headset className="h-14 w-14 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[darkgray]">
                        Got Questions ? Call us 24/7!
                      </p>
                      <p className="text-2xl font-light"> {addresses?.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="font-semibold">Contact Info</p>
                <p className="text-[#7d8287]"> {addresses?.email}</p>
                <p className="text-[#7d8287]"> {addresses?.address}</p>
              </div>

              <div className="flex items-center gap-5 justify-center md:justify-start">
                {socials &&
                  Object.entries(socials).map(
                    ([platform, url]) =>
                      url && (
                        <Link
                          key={platform}
                          href={url}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="text-[darkgray] transition hover:text-teal-500/75"
                        >
                          <span className="sr-only">{platform}</span>
                          {socialIcons[platform]}
                        </Link>
                      )
                  )}
              </div>
            </div>
          </div>

          {/* Find It Fast */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold mb-4">Find It Fast</h3>
            <ul className="space-y-2">
              {categories &&
                categories?.map((value: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/product/${value?.name
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}?category=${value?._id}`}
                      className="text-[#7d8287] hover:text-gray-900"
                    >
                      {value?.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium mb-4 hidden md:block">&nbsp;</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-[#7d8287] hover:text-gray-900"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="text-[#7d8287] hover:text-gray-900"
                >
                  Career
                </Link>
              </li>
              <li>
                <Link
                  href="/e-warranty"
                  className="text-[#7d8287] hover:text-gray-900"
                >
                  E Warranty
                </Link>
              </li>
              <li>
                <Link
                  href="/coupon"
                  className="text-[#7d8287] hover:text-gray-900"
                >
                  Coupon
                </Link>
              </li>
              <li>
                <Link
                  href="/campaign"
                  className="text-[#7d8287] hover:text-gray-900"
                >
                  Campaign
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/account/orders"
                    className="text-[#7d8287] hover:text-gray-900"
                  >
                    My Order
                  </Link>
                </li>
                {pages?.map((res) => (
                  <li>
                    <Link
                      href={`/${res?.slug}`}
                      className="text-[#7d8287] hover:text-gray-900"
                    >
                      {res?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t bg-[#eaeaea]">
        <div className="container mx-auto py-1">
          <div className="flex flex-col md:flex-row justify-center text-sm items-center">
            <p className="text-gray-400">
              © <span className="font-semibold">Charg</span> - All Rights
              Reserved
            </p>

            {/* <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Image
                src="/img/patment-icon1.webp"
                height={30}
                width={340}
                alt="payment"
                className="h-[35px] w-100"
              />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
