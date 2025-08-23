"use client";
import React from "react";
import { CartProductType } from "@/types";
import { Button } from "@headlessui/react";
import { useAppDispatch } from "@/redux/hooks";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { decreaseQuantity, increaseQuantity } from "@/redux/slice/cartSlice";

export default function ProductQuantityInput({
  product,
}: {
  product: CartProductType;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-1 justify-center">
      <Button
        className="p-2 border"
        onClick={() => dispatch(decreaseQuantity({ id: product?.id, variantId: product?.variantId }))}
      >
        <MinusIcon width={15} />
      </Button>
      <div className="py-1 px-3 border">{product?.productQuantity}</div>
      <Button
        className="p-2 border"
        onClick={() => dispatch(increaseQuantity({ id: product?.id, variantId: product?.variantId }))}
      >
        <PlusIcon width={15} />
      </Button>
    </div>
  );
}
