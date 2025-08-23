"use client";
import React from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import { CartProductType } from "@/types";
import {
  removeFromWishlist,
  selectWishlistItems,
} from "@/redux/slice/wishlistSlice";
import { Button } from "@/components/ui/button";
import ClientSecureWrapper from "@/components/hoc/ClientSecureWrapper";
import { useRouter } from "next/navigation";

const Wishlists = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const router=useRouter()

  const handleAddProduct = (product: CartProductType) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        photo: product.photo,
        price: product.price,
        productQuantity: product.productQuantity||1,
        variantId: product.variantId,
        freeShipping:product.freeShipping
      })
    );
    toast.success("Product added to your cart");
  };

  return (
    <ClientSecureWrapper>
    <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-primary mb-4">My Wishlist</h1>
      <p className="text-muted-foreground mb-8">
        You have {wishlistItems.length}{" "}
        {wishlistItems.length === 1 ? "product" : "products"} in your wishlist.
      </p>

      <div className="space-y-6">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div
              onClick={()=>router.push(`/${item.name?.replace(/\s+/g, "-")?.toLocaleLowerCase()}`)}
              key={item.id}
              className="flex gap-6 items-center border border-gray-300 rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <img
                src={item.photo}
                alt={item.name}
                width={120}
                height={120}
                className="rounded-md h-[120px] w-[120px] object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xl font-medium text-gray-800">{item.name}</div>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-semibold text-lg text-gray-900">Tk. {item.price}</span>

                </div>
                {/* <Button
                  onClick={() =>
                    handleAddProduct({
                      id: item.id,
                      name: item.name,
                      photo: item.photo,
                      price: item.price,
                      productQuantity: 1,
                      
                    })
                  }
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Add to Cart
                </Button> */}
              </div>
              <button
                onClick={() => {
                  dispatch(removeFromWishlist(item.id));
                  toast.success("Product removed from your wishlist.");
                }}
                className="text-red-500 hover:text-muted-foreground focus:outline-none"
              >
                <Trash2 className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Remove from wishlist</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground text-xl">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
    </ClientSecureWrapper>
  );
};

export default Wishlists;
