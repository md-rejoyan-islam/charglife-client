"use client";

import type React from "react";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { addToWishlist } from "@/redux/slice/wishlistSlice";
import clsx from "clsx";
import Cookies from "js-cookie";
import { ArrowBigRight, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProductProps {
  _id: string;
  productName: string;
  category: { name: string };
  inventory: Array<{
    _id: string;
    productName: string;
    img: string;
    displayPrice: number;
    price: number;
  }>;
  freeShipping: boolean;
  image: string;
  price: number;
  displayPrice?: number;
}

export default function ProductCard({
  product,
  offer = false,
  disabled = false,
}: {
  product: any;
  offer?: any;
  disabled?: boolean;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  console.log("ProductCard product:", product);

  const hasDiscount =
    product.displayPrice !== 0 && (product?.displayPrice ?? 0) > product.price;

  const productInfo = {
    id: product._id,
    name: `${product?.productName} (${product?.inventory[0]?.productName})`,
    photo: product?.inventory[0]?.img,
    price: offer ? product.price : product?.inventory[0]?.displayPrice,
    productQuantity: 1,
    variantId: product?.inventory[0]?._id,
    freeShipping: product.freeShipping,
  };

  const handleAddWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToWishlist(productInfo));
    toast.success("Product added to your wishlist");
  };

  const handleAddProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(productInfo));
    toast.success("Product added to your cart");
  };

  return (
    <div
      className={`w-full group/image relative cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]  hover:-translate-x-1 hover:-translate-y-1 hover:border-gray-300 transition-all duration-300 ease-in-out z-[99] ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
      style={{ minHeight: "420px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsCartHovered(false);
      }}
      onClick={() => {
        if (offer) Cookies.set("offer", offer, { expires: 1 / (24 * 60) });
        router.push(
          `/${product?.productName?.replace(/\s+/g, "-")?.toLowerCase()}`
        );
      }}
    >
      <div className="absolute top-10 bottom-0 left-1/2 -translate-x-1/2 h-[70%] w-[100%] pointer-events-none border-l border-r border-[#eaeaea]" />
      {/* Card content */}
      <div className="p-6 pb-4">
        {/* Category */}
        <div className="text-[darkgray] text-sm mb-1">
          {product?.category?.name}
        </div>

        {/* Product name */}
        <h3 className="text-blue-600 font-bold line-clamp-2 text-md mb-2 h-[45px] text-base/5">
          {product?.productName}
        </h3>

        {/* Product image */}
        <div className="flex  justify-center mb-4">
          <Image
            src={product?.image || "/placeholder.svg"}
            alt={product?.productName}
            width={200}
            height={200}
            className={clsx(
              "w-100 ",
              product?.productImage?.length > 0
                ? "group-hover/image:hidden"
                : ""
            )}
          />
          <Image
            src={product?.productImage[0] || "/placeholder.svg"}
            alt={product?.productName}
            width={200}
            height={200}
            className={clsx(
              "w-100 ",
              product?.productImage?.length > 0
                ? "hidden group-hover/image:block"
                : "hidden"
            )}
          />
        </div>

        {/* Price and Cart button in the same row */}
        <div className="flex justify-between items-center mt-2">
          {/* Price */}
          <div>
            {hasDiscount ? (
              <>
                <div className="text-[darkgray] line-through text-sm">
                  ৳{product?.displayPrice?.toFixed(2)}
                </div>
                <div className="text-red-500 font-semibold text-2xl">
                  ৳{product?.price?.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-gray-800 font-semibold text-2xl">
                ৳{product?.price?.toFixed(2)}
              </div>
            )}
          </div>

          {/* Cart button */}
          <div
            className="relative"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
            onClick={(e) => handleAddProduct(e)}
          >
            <div
              className={`rounded-full p-3 flex items-center justify-center transition-colors duration-300 ${
                isHovered ? "bg-yellow-400" : "bg-[#eaeaea]"
              }`}
            >
              {isCartHovered && (
                <div className="absolute -right-2 -top-8 bg-black text-white px-3 py-1 text-sm rounded whitespace-nowrap z-20">
                  Add to cart
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist and Compare - Absolute positioned at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity duration-300 ease-in-out hover:z-[12]"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="w-[80%] border-t border-gray-200 mx-auto" />
        <div className="flex items-center justify-between px-4 py-3">
          <button
            className="flex items-center gap-1 text-[darkgray] hover:text-black text-sm"
            onClick={(e) => handleAddWishlist(e)}
            style={{ visibility: isHovered ? "visible" : "hidden" }}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist</span>
          </button>
          <button
            className="flex items-center gap-1 text-[darkgray] hover:text-black text-sm"
            style={{ visibility: isHovered ? "visible" : "hidden" }}
          >
            <ArrowBigRight className="w-4 h-4" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
