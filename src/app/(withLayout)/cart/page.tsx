import React from "react";
import CartList from "./CartList";
import ClientSecureWrapper from "@/components/hoc/ClientSecureWrapper";

export const metadata = {
  title: "Shopping Cart | Charg Tech",
  description:
    "Review your selected items and proceed to checkout. Secure and easy shopping at Charg Tech.",
};
function CartPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto py-10 md:py-20">
        <div className="bg-white p-8 ">
          <h3 className="pb-3 border-b-2 ">Shopping Cart</h3>
          <CartList />
        </div>
      </div>
    </>
  );
}


export default CartPage