"use client";
import React from "react";
import Image from "next/image";
import { THotOfferResponse } from "@/types";
import OfferProductInfo from "./OfferProductInfo";
import OfferKeyFeatures from "./OfferKeyFeatures";
import AddToCart from "../product-details/AddToCart";
import AddToWish from "../product-details/AddToWishlist";

export default function OfferDetailsWrapper({
  product,
}: {
  product: any;
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
              src={product?.product?.image}
              width={400}
              height={400}
              alt={"image"}
            />
          </div>
          <div className="md:col-span-2 space-y-5">
            <OfferProductInfo product={product} />
            <OfferKeyFeatures product={product} />
            <AddToCart product={productInfo} />
            <AddToWish product={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
