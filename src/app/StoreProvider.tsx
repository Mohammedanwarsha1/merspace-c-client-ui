"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { setInitialCartItems } from "@/lib/store/features/cart/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  // Create store only once
  // eslint-disable-next-line react-hooks/refs
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    try {
      const cartItems = localStorage.getItem("cartItems");

      if (cartItems) {
        const parsedItems = JSON.parse(cartItems);

        storeRef.current?.dispatch(setInitialCartItems(parsedItems));
      }
    } catch (err) {
      console.error("Failed to load cart items:", err);
    }
  }, []);

  return (
    // eslint-disable-next-line react-hooks/refs
    <Provider store={storeRef.current}>{children}</Provider>
  );
}
