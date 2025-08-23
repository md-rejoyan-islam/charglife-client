import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slice/cartSlice";
import authReducer from "../redux/slice/authSlice";
import wishlistReducer from "../redux/slice/wishlistSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./api/baseApi";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// Import redux-persist storage
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Fallback for storage during SSR (noopStorage)
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

// Use browser storage if available; otherwise, use noopStorage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local") // Use localStorage for browser
    : createNoopStorage(); // Use noopStorage for SSR

// Persist configurations
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  version: 1,
  storage,
};

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

// Persist reducers
const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

// Configure Redux store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Base API
    cart: cartPersistedReducer, // Cart slice
    auth: authPersistedReducer, // Auth slice
    wishlist: persistedWishlistReducer, // Wishlist slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
