"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { config } from "@/config";
import EmptyCart from "./EmptyCart";
import ProductQuantityInput from "@/components/shared/ProductQuantityInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeItem, clearCart, applyCoupon, removeCoupon, selectAppliedCoupon, selectDiscountedTotal } from "@/redux/slice/cartSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CartList() {
  const dispatch = useAppDispatch();
  const { cartItems, totalAmount } = useAppSelector((state) => state.cart);
  const appliedCoupon = useAppSelector(selectAppliedCoupon);
  const discountedTotal = useAppSelector(selectDiscountedTotal);
  const [couponCode, setCouponCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleClear = () => {
    const check = window.confirm("Do you want to clear your cart?");
    if (check) {
      dispatch(clearCart());
    }
  };

  const validateCoupon = async () => {
    setIsValidating(true);
    try {
      const response = await fetch(`${config.backend_url}/coupon/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: couponCode, amount:totalAmount }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(applyCoupon(data.data));
        toast.success(data.message || 'Coupon applied successfully!');
      } else {
        toast.error(data.message || 'Invalid coupon code');
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      toast.error('An error occurred while validating the coupon');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    toast.success('Coupon removed');
  };

  const finalTotal = discountedTotal ; // Adding delivery charge

  return (
    <div className="space-y-3">
      <CartProductList />
      {cartItems?.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <Button
              className="bg-red-500 text-white hover:bg-red-600 w-full md:w-auto"
              onClick={handleClear}
            >
              Clear Cart
            </Button>
          </div>
          <div className="w-full md:w-auto space-y-4">
            {!appliedCoupon && (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={validateCoupon}
                  disabled={isValidating || !couponCode}
                  className="bg-primary text-white hover:bg-primary-dark"
                >
                  {isValidating ? 'Validating...' : 'Apply'}
                </Button>
              </div>
            )}
            <div className="space-y-2 text-right">
              {/* <h2>Delivery: ৳60</h2> */}
              <h2>Sub Total: ৳{totalAmount }</h2>
              {appliedCoupon && (
                <>
                  <h2 className="text-green-600">Coupon Applied: {appliedCoupon.code}</h2>
                  <h2 className="text-green-600">Discount: ৳{(totalAmount - discountedTotal)?.toFixed(2)}</h2>
                  <h2 className="font-bold">Total After Discount: ৳{finalTotal?.toFixed(2)}</h2>
                  <Button onClick={handleRemoveCoupon} className="text-white hover:text-red-700">
                    Remove Coupon
                  </Button>
                </>
              )}
            </div>
            <div className="text-right space-x-4 mt-5">
              <Link href="/product">
                <Button variant="outline" className="border-2 border-secondary hover:bg-secondary hover:text-white">
                  Back to shopping
                </Button>
              </Link>
              <Link href="/checkout">
                <Button className="bg-primary text-white hover:bg-primary-dark">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CartProductList = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  if (!cartItems?.length) return <EmptyCart />;

  return (
    <>
      {cartItems?.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between py-5 border-b-2"
        >
          <div className="w-1/3 flex gap-x-5 items-center">
            <div className="hidden md:block overflow-hidden">
              <Image
                src={item.photo}
                width={100}
                height={100}
                alt={item.name}
                className="rounded"
              />
            </div>
            <div>
              <h4 className="text-primary">{item.name}</h4>
              <p>
                Unit Price: <span className="font-bold">৳{item.price}</span>
              </p>
              <button
                     onClick={() => dispatch(
                      removeItem({ id: item?.id?.toString(), variantId: item?.variantId?.toString() }))
                    }
                className="mt-4 text-primary bg-red-50 px-4 py-1"
              >
                Remove
              </button>
            </div>
          </div>
          <ProductQuantityInput product={item} />
          <div>৳{item.price * item.productQuantity}</div>
        </div>
      ))}
    </>
  );
};