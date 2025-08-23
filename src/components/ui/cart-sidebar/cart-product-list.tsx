import Image from "next/image";
import { removeItem } from "@/redux/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProductQuantityInput from "@/components/shared/ProductQuantityInput";
import EmptyCart from "@/app/(withLayout)/cart/EmptyCart";
import { Button } from "@headlessui/react";

const CartProductList = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  if (!cartItems?.length) {
    return <EmptyCart />;
  }

  return (
    <>
      {cartItems?.map((item, index) => (
        <div key={index} className="py-3">
          <h4 className="text-primary my-1 font-semibold mr-20">
            {item?.name}
          </h4>
          <div className="flex items-center justify-between border-b-2">
            <div className="w-1/3 flex gap-x-2 items-center">
              <div className="hidden md:block overflow-hidden">
                <Image
                  src={item?.photo}
                  width={300}
                  height={300}
                  alt={item?.name}
                  className="rounded h-20 w-24"
                />
              </div>
              <div>
                Price: ৳{item?.price} X {item?.productQuantity}
              </div>
            </div>
            <div>
              <ProductQuantityInput product={item} />
            </div>
            <div>
              <p className="text-center">
                ৳{item?.price * item?.productQuantity}
              </p>
              <Button
                onClick={() => dispatch(
                  removeItem({ id: item?.id?.toString(), variantId: item?.variantId?.toString() }))
                }
                className="mt-1 text-primary bg-primary/5 px-3 py-1"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartProductList;
