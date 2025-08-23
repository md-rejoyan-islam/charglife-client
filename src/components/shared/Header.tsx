"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  BoltIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { config } from "@/config";
import { useSearchParams } from "next/navigation";

export interface SubCategory {
  _id: string;
  name: string;
  parentCategory: string;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  subCategory: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    result: T[];
    count: number;
  };
}

const Header= ({menuItems}:{menuItems:Category[]}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedSubCategory = searchParams.get("subCategory");


  return (
    <div className="bg-[#fbe437]/10">
      <div className="px-3 lg:px-0 py-3 my-auto mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="relative flex items-center lg:justify-between">
          {/* Desktop Nav */}
          <nav>
            <ul className="items-center hidden space-x-6 lg:flex">
            <li
                  className="relative group"
                >
                  <div className="relative"
                  >
                    <Link              
                      href={`/product`}
                      className={`default block px-3 py-2 rounded transition duration-300 bg-[#100f11] text-white`}
                    >
                      Charg
                    </Link>
                  </div>
                          </li>
              {menuItems.map((item, index) => (
                <li
                  key={item?._id}
                  className="relative group"

                >
                  <div className="relative"
                  onMouseEnter={() => setOpenSubmenu(index)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <Link
                                       
                      href={`/product?category=${item?._id}`}
                      className={`default block px-3 py-2 rounded transition duration-300 ${
                        selectedCategory === item?._id
                          ? "text-blue-500 font-semibold"
                          : "hover:bg-gray-200 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </div>
                  {item?.subCategory?.length > 0 && (
                    <ul
                      onMouseEnter={() => openSubmenu === index && setOpenSubmenu(index)}
                      onMouseLeave={() => openSubmenu === index && setOpenSubmenu(null)}
                        className={`absolute left-0 top-full bg-white w-64 border rounded shadow-md  
                                    transform transition-all duration-300 ease-in-out 
                                    origin-top-left top-[30px]
                                    ${
                                      openSubmenu === index
                                        ? "opacity-100 scale-100 translate-y-0 z-20"
                                        : "opacity-0 scale-95 -translate-y-2 z-[-1]"
                                    }`}
                      >
                        {item?.subCategory?.map((subName: any, subIndex: number) => (
                          <li key={subIndex}>
                            <Link
                              href={`/product?category=${item?._id}&subCategory=${subName?._id}`}
                              className={`block px-4 py-2 text-gray-700 rounded transition duration-300 hover:bg-blue-100 hover:text-blue-600 ${
                                selectedSubCategory === subName?._id
                                  ? "text-blue-500 font-semibold"
                                  : ""
                              }`}
                            >
                              {subName?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </nav>
          <Link
                          className="btn bg-[#100f11] text-white items-center hidden space-x-6 lg:flex"
                          href={`/e-warranty`}>
                          E Warranty
                          </Link>
          {/* Mobile Navbar */}
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <Bars3BottomRightIcon className="w-5 text-black" />
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-50">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link href="/" className="inline-flex items-center">
                        <BoltIcon className="h-6 w-6 text-black" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Brand
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <XMarkIcon className="w-5 font-bold text-black" />
                      </button>
                    </div>
                  </div>
                  {/* Mobile Nav */}
                  <nav>
                    <ul className="space-y-4">
                    <li className="py-2">
                    <Link
                          className="btn bg-[#100f11] text-white"
                          href={`/product`}>
                          Charg
                          </Link>
                        </li>
                      {menuItems.map((item, index) => (
                        <li key={item?._id}>
                          <button
                            onClick={() =>
                              setOpenSubmenu((prev) =>
                                prev === index ? null : index
                              )
                            }
                            className={`font-medium tracking-wide text-gray-700 transition duration-300 hover:text-blue-400 ${
                              selectedCategory === item?._id
                                ? "text-blue-500 font-semibold"
                                : ""
                            }`}
                          >
                            {item?.name}
                          </button>
                          {item?.subCategory?.length > 0 && (
                            <ul
                              className={`mt-2 space-y-2 pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                                openSubmenu === index ? "max-h-96" : "max-h-0"
                              }`}
                            >
                              {item?.subCategory?.map(
                                (subName: any, subIndex: number) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={`/product?category=${item?._id}&subCategory=${subName?._id}`}
                                      className={`block px-4 py-2 text-gray-700 rounded transition duration-300 hover:bg-blue-100 hover:text-blue-600 ${
                                        selectedSubCategory === subName?._id
                                          ? "text-blue-500 font-semibold"
                                          : ""
                                      }`}
                                    >
                                      {subName?.name}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                      <li>
                        <Link
                          className="btn bg-[#100f11] text-white"
                          href={`/e-warranty`}>
                          E Warranty
                          </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;