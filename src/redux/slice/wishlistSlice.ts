import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type WishlistItemType = {
  // productQuantity: number;
  id: string;
  name: string;
  price: number;
  photo: string;
};

type WishlistState = {
  items: WishlistItemType[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItemType>) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (!itemExists) state.items.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export default wishlistSlice.reducer;
