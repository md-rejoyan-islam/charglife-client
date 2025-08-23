"use client";
import React from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { CartProductType } from "@/types";

export default function AddToCart({ product,disabled=false }: { product: CartProductType,disabled?:Boolean }) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: CartProductType) => {
    
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        photo: product.photo,
        price: product.price,
        productQuantity: product.productQuantity,
        variantId: product.variantId,
        freeShipping:product.freeShipping
      }),
    );
    toast.success("Product added to your cart");
  };

  return (
    <>
      <button
  className="bg-[#FAD70F] text-white px-10 py-2 rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-200 ease-in-out mr-4"
  onClick={() =>  {   disabled?   toast.error("Product is out of stock"): handleAddProduct(product)}}
>
  Buy Now
</button>
    </>
  );
}
