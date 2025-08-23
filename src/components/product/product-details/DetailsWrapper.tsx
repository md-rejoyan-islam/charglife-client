"use client";
import React from "react";
import Image from "next/image";
import AddToCart from "./AddToCart";
import ProductInfo from "./ProductInfo";
import KeyFeatures from "./KeyFeatures";
import { TProductResponse } from "@/types";
import AddToWish from "./AddToWishlist";

export default function DetailsWrapper({
  product,
}: {
  product: TProductResponse;
  }) {
  
  const productInfo = {
    id: product._id,
    name: `${product?.productName} (${product?.inventory[0]?.productName})`,
    photo: product?.inventory[0]?.img,
    price: product?.inventory[0]?.displayPrice,
    productQuantity: 1,
    variantId: product?.inventory[0]?._id,
    freeShipping:product.freeShipping
  };

  return (
    <div className="bg-white shadow-md px-5">
      <div className="mx-auto max-w-7xl px-0 py-10 md:px-10 ">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 h-fit place-items-center md:place-items-start">
          <div className="self-center">
            <Image
              src={product?.image}
              width={400}
              height={400}
              alt={product?.name}
            />
          </div>
          <div className="md:col-span-2 space-y-5">
            <ProductInfo product={product} />
            <KeyFeatures product={product} />
            <AddToCart product={productInfo} />
            <AddToWish product={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
