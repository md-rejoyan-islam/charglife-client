import React from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/slice/wishlistSlice";
import { WishProductType } from "@/types";
import { toast } from "sonner";

const AddToWish = ({ product }: { product: WishProductType }) => {
  const dispatch = useDispatch();

  const handleAddProduct = (product: WishProductType) => {
    dispatch(addToWishlist(product));
    toast.success("Product added to your wishlist");
  };

  return (
    <>
<button
  className="bg-[darkgray] text-white px-10 py-2 rounded-lg shadow hover:bg-secondary/90 hover:shadow-md transition-all duration-200 ease-in-out"
  onClick={() => handleAddProduct(product)}
>
  Add to Wishlist
</button>

    </>
  );
};

export default AddToWish;
