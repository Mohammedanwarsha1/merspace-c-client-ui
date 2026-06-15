"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { setInitialCartItems } from "@/lib/store/features/cart/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  // eslint-disable-next-line react-hooks/refs
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    //todo: set initial data from local storage
    const localStorageAvailable =
      typeof window != "undefined" && window.localStorage;
    if (localStorageAvailable) {
      const cartItems = window.localStorage.getItem("cartItems");
      try {
        const parsedItems = JSON.parse(cartItems as string);
        // eslint-disable-next-line react-hooks/refs
        storeRef.current.dispatch(setInitialCartItems(parsedItems));
      } catch (err) {
        console.error(err);
      }
    }
  }

  // eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>;
}
