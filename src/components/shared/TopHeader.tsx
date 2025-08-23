"use client";

import { useAppSelector } from "@/redux/hooks";
import { removeExpiredItems } from "@/redux/slice/cartSlice";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MapPin,
  Menu,
  Package,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Login from "../navbar/Login";
import SearchBox from "../SearchBox";

export default function TopHeader({ menuItems }: { menuItems: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { totalAmount } = useAppSelector((state: any) => state.cart);

  const cartQuantity = useAppSelector(
    (state: any) => state?.cart?.cartQuantity
  );

  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeExpiredItems());
  }, [dispatch]);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") ?? null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    searchParams.get("subCategory") ?? null
  );

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="hidden lg:block border-b border-gray-300">
        <div className="container mx-auto py-3 flex justify-between items-center text-xs flex-wrap">
          <div className="text-[#8b8e90]">
            CHARG - Gadget that charge your life
          </div>
          <div className="flex items-center ">
            <Link
              href="/store-locator"
              className="flex items-center text-[#8b8e90] hover:text-black border-black border-r pr-4"
            >
              <MapPin className="h-4 w-4 mr-1" />
              <span>Store Locator</span>
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <Link
              href="/track-order"
              className="flex items-center text-[#8b8e90] hover:text-black border-black border-r px-4"
            >
              <Package className="h-4 w-4 mr-1" />
              <span>Track Your Order</span>
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <Link
              href="/product"
              className="flex items-center text-[#8b8e90] hover:text-black border-black border-r px-4"
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              <span>Shop</span>
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <Link
              href="/account/edit-profile"
              className="flex items-center text-[#8b8e90] hover:text-black pl-4"
            >
              <User className="h-4 w-4 mr-1" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto py-3 flex items-center justify-between bg-yellow-400 lg:bg-transparent">
        <div className="flex items-center gap-2">
          <button className="p-2 block lg:hidden">
            <Menu
              className="h-6 w-6 text-gray-700"
              onClick={() => setIsMenuOpen(true)}
            />
          </button>
          <Link
            href="/"
            className="text-4xl font-bold text-gray-800 mr-8 lg:block hidden"
          >
            <Image
              width={150}
              height={100}
              src="/img/black-n-red-logo.png"
              alt="footer-logo"
            />
          </Link>
          <Link
            href="/"
            className="text-4xl font-bold text-gray-800 mr-8 block lg:hidden"
          >
            <Image
              width={170}
              height={120}
              src="/img/black-n-red-logo.png"
              alt="footer-logo"
            />
          </Link>
          <button className="p-2 hidden lg:flex">
            <Menu
              className="h-8 w-8 text-gray-700"
              onClick={() => setIsMenuOpen(true)}
            />
          </button>
        </div>

        <div className="flex-1 max-w-2xl mx-4 hidden lg:flex">
          <SearchBox />
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="relative group">
            <button
              className="animate-pulse hover:animate-none transition-transform duration-300 group-hover:scale-110"
              onClick={() => router.push("/campaign")}
            >
              <img
                src="/img/OFFER.gif"
                alt="offer"
                className="h-10 w-20 md:w-16 mt-1"
              />
              <div className="absolute -top-6 md:-top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Offers
              </div>
            </button>
          </div>
          <button
            className="p-2 hidden lg:block"
            onClick={() => router.push("/account/wishlist")}
          >
            <Heart className="h-7 w-7 text-gray-700" />
          </button>
          <div className="lg:hidden block">
            <SearchBox />
          </div>

          <button className="mx-1">
            <Login />
          </button>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            {/* bag + badge */}
            <div className="relative mr-2 hidden md:block">
              {/* the bag */}
              <ShoppingCart className="h-7 w-7 text-gray-800 " />

              {/* the badge — absolute‑positioned bottom‑right */}
              {cartQuantity > 0 && (
                <span className="absolute -bottom-2 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-bold leading-none text-white">
                  {cartQuantity}
                </span>
              )}
            </div>

            {/* price */}
            <div className="font-bold text-gray-800 hidden lg:block ">
              TK&nbsp;{totalAmount ?? 0}
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden lg:block bg-yellow-400">
        <div className="container mx-auto">
          <ul className="flex">
            {menuItems.map((item: any, index: any) => (
              <li key={item._id} className="relative group">
                <div
                  className="relative"
                  onMouseEnter={() => setOpenSubmenu(index)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <Link
                    href={`/product/${item?.name
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}?category=${item._id}`}
                    className={`flex items-center px-4 py-3 text-gray-800 hover:bg-yellow-500 font-semibold text-md border-r border-[#a5a5a591] ${
                      selectedCategory === item._id
                        ? "text-gray-900 font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(item._id)}
                  >
                    {item.name}
                    {item?.subCategory?.length ? (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
                {item?.subCategory?.length > 0 && (
                  <ul
                    onMouseEnter={() =>
                      openSubmenu === index && setOpenSubmenu(index)
                    }
                    onMouseLeave={() =>
                      openSubmenu === index && setOpenSubmenu(null)
                    }
                    className={`absolute left-0 top-full bg-white w-64 shadow-md 
                                transform transition-all duration-300 ease-in-out 
                                origin-top-left z-50
                                border-t-4 border-red-500
                                ${
                                  openSubmenu === index
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-95 -translate-y-2 invisible"
                                }`}
                  >
                    {item?.subCategory?.map(
                      (subName: any, subIndex: number) => (
                        <li key={subIndex}>
                          <Link
                            href={`/product/${item?.name
                              ?.toLowerCase()
                              .replace(/\s+/g, "-")}?category=${
                              item._id
                            }&subCategory=${subName._id}`}
                            className={`block px-4 py-2 text-gray-700 transition duration-300 hover:bg-gray-100 hover:text-gray-900 ${
                              selectedSubCategory === subName._id
                                ? "text-gray-900 font-semibold"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedCategory(item._id);
                              setSelectedSubCategory(subName._id);
                            }}
                          >
                            {subName.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50">
          <div className="w-[80%] max-w-sm h-full bg-white p-5 shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="inline-flex items-center">
                <Image
                  width={100}
                  height={80}
                  src="/img/black-n-red-logo.png"
                  alt="footer-logo"
                />
              </Link>
              <button
                aria-label="Close Menu"
                title="Close Menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* Navigation */}
            <nav>
              <ul className="divide-y divide-gray-200">
                {menuItems.map((item: any, index: number) => (
                  <li key={item?._id} className="py-3">
                    <div
                      onClick={() =>
                        setOpenSubmenu((prev) =>
                          prev === index ? null : index
                        )
                      }
                      className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-blue-500 font-medium"
                    >
                      <Link
                        href={`/product/${item?.name
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")}?category=${item?._id}`}
                        onClick={() => {
                          setSelectedCategory(item?._id);
                          setIsMenuOpen(false);
                        }}
                        className={`transition duration-300 ${
                          selectedCategory === item?._id
                            ? "text-blue-500 font-semibold"
                            : ""
                        }`}
                      >
                        {item?.name}
                      </Link>
                      {item?.subCategory?.length > 0 &&
                        (openSubmenu === index ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        ))}
                    </div>

                    {/* Submenu */}
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
                                href={`/product/${item?.name
                                  ?.toLowerCase()
                                  .replace(/\s+/g, "-")}?category=${
                                  item?._id
                                }&subCategory=${subName?._id}`}
                                onClick={() => setIsMenuOpen(false)}
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

                <li className="py-3">
                  <Link
                    href={`/store-locator`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-gray-700 rounded transition duration-300 hover:bg-blue-100 hover:text-blue-600`}
                  >
                    Store Locator
                  </Link>
                </li>
                <li className="py-3">
                  <Link
                    href={`/track-order`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-gray-700 rounded transition duration-300 hover:bg-blue-100 hover:text-blue-600`}
                  >
                    Track Your Order
                  </Link>
                </li>
                <li className="py-3">
                  <div className="relative group">
                    <button
                      className="animate-pulse hover:animate-none transition-transform duration-300 group-hover:scale-110"
                      onClick={() => {
                        router.push("/campaign");
                        setIsMenuOpen(false);
                      }}
                    >
                      <img
                        src="/img/OFFER.gif"
                        alt="offer"
                        className="h-10 w-20 md:w-16 mt-1"
                      />
                      <div className="absolute -top-6 md:-top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        Offers
                      </div>
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
