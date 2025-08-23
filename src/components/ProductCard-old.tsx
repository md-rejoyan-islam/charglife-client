"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { CartProductType, TProductResponse, WishProductType } from "@/types";
import StarRatings from "react-star-ratings";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { addToWishlist } from "@/redux/slice/wishlistSlice";
import { useRouter } from "next/navigation";

const StarRatingsComponent = StarRatings as unknown as React.FC<any>;

export default function ProductCard({
  product,
}: {
  product: any;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productInfo = {
    id: product._id,
    name: `${product?.productName} (${product?.inventory[0]?.productName})`,
    photo: product?.inventory[0]?.img,
    price: product?.inventory[0]?.displayPrice,
    productQuantity: 1,
    variantId: product?.inventory[0]?._id,
    freeShipping:product.freeShipping
  };

  const handleAddWishlist = (product: WishProductType) => {
    dispatch(addToWishlist(product));
    toast.success("Product added to your wishlist");
  };

  const handleAddProduct = (product: any) => {
    
    dispatch( addToCart({
            id: product.id,
            name: product.name,
            photo: product.photo,
            price: product.price,
            productQuantity: 1,
            variantId: product.variantId,
            freeShipping:product.freeShipping
          }));
    toast.success("Product added to your cart");
  };

  return (
    <Link href={`/${product?.productName?.replace(/\s+/g, "-")?.toLocaleLowerCase()}`}>
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden group hover:scale-105 transform transition-transform duration-300">
      {/* Product Image */}
      <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <Image
          width={300}
          height={300}
          alt={product?.productName}
          src={product?.image}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Product Info Section */}
      <div className="relative p-4 group-hover:bg-black/30 group-hover:backdrop-blur-sm transition duration-300">
        <small className="text-gray-500">{product?.category?.name}</small>
     
          <h3 className="mt-2 font-semibold text-gray-800 hover:text-primary hover:underline transition duration-300">
            {product?.productName?.length > 20
              ? `${product?.productName?.slice(0, 20)}...`
              : product?.productName}
          </h3>
   
        <StarRatingsComponent
          name="rating"
          numberOfStars={5}
          starSpacing="2px"
          rating={product?.ratings || 0}
          starRatedColor="orange"
          starDimension="16px"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-400 line-through">
            Tk. {product?.displayPrice}
          </span>
          <span className="font-bold text-primary">Tk. {product?.price}</span>
        </div>

        {/* Hover Buttons - Centered in Product Info */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
            <button
              className="w-12 h-12 p-3 rounded-full bg-white text-primary shadow-md hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center"
              onClick={() => handleAddWishlist(productInfo)}
              >
                <div className="">
                 <HeartOutlined />
                <p className="text-[9px] mt-[-6px]">Wishlist</p>
                </div>
            
            </button>
            <button
              className="w-12 h-12 p-3 rounded-full bg-white text-primary shadow-md hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center"
              onClick={() => {
                handleAddProduct(productInfo);
                router.push("/cart");
              }}
              >
                   <div className="">
                   <ShoppingOutlined />
                <p className="text-[9px] mt-[-6px]">Buy</p>
                </div>
             
            </button>
            <button
              className="w-12 h-12 p-3 rounded-full bg-white text-primary shadow-md hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center"
              onClick={() => handleAddProduct(productInfo)}
              >
                     <div className="">
                     <ShoppingCartOutlined />
                <p className="text-[9px] mt-[-6px]">Cart</p>
                </div>
              
            </button>
          </div>
        </div>
      </div>
      </div>
      </Link>
  );
}
