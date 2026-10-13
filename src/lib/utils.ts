import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/cartSlice";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheItem(payload: CartItem): string {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });
  const hash = CryptoJS.SHA256(jsonString).toString();
  return hash;
}

export function getFromPrice(product: Product): number {
  const basePrice = Object.entries(product.priceConfiguration)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, value]) => {
      return value.priceType === "base";
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .reduce((acc, [key, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions));
      return acc + smallestPrice;
    }, 0);
  return basePrice;
}

export function getItemTotal(product: CartItem) {
  const toppingsTotal = product.chosenConfiguration.selectedToppings.reduce(
    (acc, curr) => acc + curr.price,
    0,
  );

  const configPricing = Object.entries(
    product.chosenConfiguration.priceConfiguration,
  ).reduce((acc, [key, value]: [string, string]) => {
    const configuration = product.priceConfiguration?.[key];
    const price = configuration?.availableOptions?.[value];

    if (typeof price !== "number") {
      console.error("Invalid cart price configuration", {
        productId: product._id,
        key,
        value,
      });
      return acc;
    }

    return acc + price;
  }, 0);
  return configPricing + toppingsTotal;
}
