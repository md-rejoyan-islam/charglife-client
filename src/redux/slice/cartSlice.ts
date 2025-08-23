import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartProductType } from "@/types";

interface Coupon {
  code: string;
  discountType: "percentage" | "value";
  discountValue: number;
  maximumDiscount?: number;
}

type CartItemType = CartProductType & {
  variantId?: string;
  timestamp: number;
};

type InitialStateType = {
  cartItems: CartItemType[];
  cartQuantity: number;
  totalAmount: number;
  appliedCoupon: Coupon | null;
  discountedTotal: number;
};

const initialState: InitialStateType = {
  cartItems: [],
  cartQuantity: 0,
  totalAmount: 0,
  appliedCoupon: null,
  discountedTotal: 0,
};

const ONE_DAY_IN_MS =5 * 60 * 1000;;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.cartQuantity = 0;
      state.totalAmount = 0;
      state.appliedCoupon = null;
      state.discountedTotal = 0;
    },

    addToCart: (state, action: PayloadAction<CartProductType & { variantId?: string }>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.variantId === action.payload.variantId
      );

      const currentTime = Date.now();

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].productQuantity += 1;
        state.cartQuantity += 1;
        state.totalAmount += state.cartItems[itemIndex].price;
        state.discountedTotal += state.cartItems[itemIndex].price;
        state.cartItems[itemIndex].timestamp = currentTime;
      } else {
        const tempProduct = {
          ...action.payload,
          productQuantity: 1,
          timestamp: currentTime,
        };
        state.cartItems.push(tempProduct);
        state.cartQuantity += 1;
        state.totalAmount += tempProduct.price;
        state.discountedTotal += tempProduct.price;
      }

      if (state.appliedCoupon) {
        state.discountedTotal = calculateDiscountedTotal(state);
      }
    },

    removeItem: (state, action: PayloadAction<{ id: string; variantId?: string }>) => {
      const nextCartItems = state.cartItems.filter(
        (product) => !(product.id === action.payload.id && product.variantId === action.payload.variantId)
      );

      const removedItem = state.cartItems.find(
        (product) => product.id === action.payload.id && product.variantId === action.payload.variantId
      );

      state.cartItems = nextCartItems;
      if (removedItem) {
        state.cartQuantity -= removedItem.productQuantity;
        state.totalAmount -= removedItem.price * removedItem.productQuantity;
        state.discountedTotal -= removedItem.price * removedItem.productQuantity;
      }

      if (state.appliedCoupon) {
        state.discountedTotal = calculateDiscountedTotal(state);
      }
    },

    removeExpiredItems: (state) => {
      const currentTime = Date.now();
      const validItems = state.cartItems.filter(
        (item) => currentTime - item.timestamp < ONE_DAY_IN_MS
      );

      state.cartItems = validItems;
      let quantity = 0;
      let total = 0;

      validItems.forEach((item) => {
        quantity += item.productQuantity;
        total += item.price * item.productQuantity;
      });

      state.cartQuantity = quantity;
      state.totalAmount = total;
      if (validItems.length === 0) {
    
        state.appliedCoupon = null;
        state.discountedTotal = 0;
      } else {
        state.discountedTotal = total;
        if (state.appliedCoupon) {
          state.discountedTotal = calculateDiscountedTotal(state);
        }
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: string; variantId?: string }>) => {
      const cartItem = state.cartItems.find(
        (pd) => pd.id === action.payload.id && pd.variantId === action.payload.variantId
      );

      if (cartItem) {
        if (cartItem.productQuantity > 1) {
          cartItem.productQuantity -= 1;
          state.cartQuantity -= 1;
          state.totalAmount -= cartItem.price;
          state.discountedTotal -= cartItem.price;
        } else {
          state.cartItems = state.cartItems.filter(
            (product) => !(product.id === action.payload.id && product.variantId === action.payload.variantId)
          );
          state.cartQuantity -= 1;
          state.totalAmount -= cartItem.price;
          state.discountedTotal -= cartItem.price;
        }
      }

      if (state.appliedCoupon) {
        state.discountedTotal = calculateDiscountedTotal(state);
      }
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string; variantId?: string }>) => {
      const cartItem = state.cartItems.find(
        (pd) => pd.id === action.payload.id && pd.variantId === action.payload.variantId
      );

      if (cartItem) {
        cartItem.productQuantity += 1;
        state.cartQuantity += 1;
        state.totalAmount += cartItem.price;
        state.discountedTotal += cartItem.price;
      }

      if (state.appliedCoupon) {
        state.discountedTotal = calculateDiscountedTotal(state);
      }
    },

    getTotalAmount: (state) => {
      let quantity = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        quantity += item.productQuantity;
        total += item.price * item.productQuantity;
      });

      state.cartQuantity = quantity;
      state.totalAmount = total;
      state.discountedTotal = total;

      if (state.appliedCoupon) {
        state.discountedTotal = calculateDiscountedTotal(state);
      }
    },

    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      state.appliedCoupon = action.payload;
      state.discountedTotal = calculateDiscountedTotal(state);
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountedTotal = state.totalAmount;
    },
  },
});

const calculateDiscountedTotal = (state: InitialStateType): number => {
  if (!state.appliedCoupon) return state.totalAmount;

  const { discountType, discountValue, maximumDiscount } = state.appliedCoupon;
  let discountAmount =
    discountType === "percentage"
      ? state.totalAmount * (discountValue / 100)
      : discountValue;

  if (maximumDiscount) {
    discountAmount = Math.min(discountAmount, maximumDiscount);
  }

  return Math.max(state.totalAmount - Math.round(discountAmount), 0);
};

export const {
  addToCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  getTotalAmount,
  applyCoupon,
  removeCoupon,
  removeExpiredItems,
} = cartSlice.actions;

export const selectCartQuantity = (state: RootState) => state.cart.cartQuantity;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectAppliedCoupon = (state: RootState) => state.cart.appliedCoupon;
export const selectDiscountedTotal = (state: RootState) => state.cart.discountedTotal;

export default cartSlice.reducer;
