"use client";

import Link from "next/link";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button } from "@headlessui/react";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slice/cartSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {  ArrowRightOutlined } from "@ant-design/icons";
import CartProductList from "./cart-product-list";
import {  ShoppingCart, X } from "lucide-react";

const CartSidebar = () => {
  const dispatch = useAppDispatch();
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems, totalAmount } = useAppSelector(
    (state: RootState) => state.cart
  );

  const cartQuantity = useAppSelector(
    (state: RootState) => state?.cart?.cartQuantity
  );

  const handleSidebar = () => {
    setCartOpen(!cartOpen);
  };

  const handleClear = () => {
    const check = window.confirm("Do you want to clear your cart?");
    if (check) {
      dispatch(clearCart());
    }
  };

  //make payment
  const makePayment = async () => {
    try {
      handleSidebar()
      //load stripe published key
      //   const stripe = await loadStripe(config.stripe_published_key as string);
      // const response = await fetch(`${config.backend_url}/checkout`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(reformItems),
      // });
      // const session = await response.json();
      //   await stripe?.redirectToCheckout({
      //     sessionId: session?.result?.id,
      //   });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // Cart calculation
  const shipping = 60;
  const total = totalAmount ;

  return (
    <section
    className={`fixed top-0 right-0 z-[100] h-screen w-[360px] md:w-[460px] transform bg-cyan-500 shadow-lg shadow-black/40 transition duration-300 ease-in ${
      cartOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {/* Toggle Button */}
    {cartOpen ? (
      <button
        className="absolute top-[45%] -left-7 h-24 w-7 rounded-s-sm text-white bg-black"
        onClick={handleSidebar}
      >
        <ArrowRightOutlined size={25} />
      </button>
    ) : (
      <div
        className="h-14 w-14 absolute top-[90%] -left-20 bg-black text-white hover:bg-primary transition duration-300 ease-in-out rounded-full p-4 shadow-lg flex items-center justify-center group cursor-pointer"
        onClick={handleSidebar}
      >
        <ShoppingCart size={24} className="group-hover:scale-110 transition-transform text-white" />
        {cartQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartQuantity}
          </span>
        )}
      </div>
    )}
  
    {/* Sidebar Body */}
    <div className="flex flex-col h-full bg-white/90">
      {/* Header */}
      <div className="flex justify-between items-center h-16 button-color text-white px-4 z-10 shrink-0">
        <p className="my-title-font text-md font-semibold">
          <span>YOUR CART</span>
        </p>
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-800 rotate-0 hover:rotate-180"
          onClick={handleSidebar}
        >
          <X size={20} className="font-bold" />
        </button>
      </div>
  
      {/* Product List - scrollable section */}
      <div className="flex-1 overflow-y-auto px-5 py-3 no-scrollbar">
        <div className="space-y-3">
          <CartProductList />
          {cartItems?.length > 0 && (
            <div className="flex justify-end">
              <Button
                className="bg-secondary p-1 text-white hover:bg-primary duration-200 px-3"
                onClick={handleClear}
              >
                Cart Clear
              </Button>
            </div>
          )}
        </div>
      </div>
  
      {/* Footer - Checkout Summary */}
      <div className="px-5 py-4 border-t border-gray-200 shrink-0">
        <div className="space-y-2">
          <h2 className="text-xl">Checkout Summary</h2>
          <h3 className="flex justify-between text-base">
            <span>Sub Total</span> <span>{totalAmount} Tk.</span>
          </h3>
          <h3 className="flex justify-between text-base">
            <span>Total</span> <span>{total} Tk.</span>
          </h3>
          <h3 className="flex justify-between text-base font-bold">
            <span>Payable Total</span> <span>{total} Tk.</span>
          </h3>
        </div>
  
        <div className="mt-5 space-y-1 gap-2 flex flex-col">
          <Link href="/cart">
            <Button
              onClick={handleSidebar}
              className="button-color rounded-lg hover:bg-primary/80 duration-200 w-full py-3 px-6 text-white"
            >
              View Cart
            </Button>
          </Link>
          <Link href="/checkout">
            <Button
              onClick={makePayment}
              className="bg-black rounded-lg hover:bg-black/80 duration-200 w-full py-3 px-6 text-white"
            >
              Proceed to Checkout
              <ArrowRightOutlined className="animate-bounce-horizontal w-6 h-6 duration-1000 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default CartSidebar;
