"use client";

import React from "react";
import ProductDetailsClient from "./ProductDetailsClient";

type Props = {
  product: any;
};

export default function ProductDetailsWrapper({ product }: Props) {

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  return <ProductDetailsClient product={product} />;
}