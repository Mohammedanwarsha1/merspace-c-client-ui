import React from "react";
import { CartItem } from "../store/features/cart/cartSlice";
import { getItemTotal } from "../utils";

export function useTotal(product: CartItem) {
  const totalPrice = React.useMemo(() => {
    return getItemTotal(product);
  }, [product]);

  // const configPricing = Object.entries(
  //   product.chosenConfiguration.priceConfiguration,
  // ).reduce((acc, [key, value]: [string, string]) => {
  //   const configuration = product.priceConfiguration?.[key];
  //   const price = configuration?.availableOptions?.[value];

  //   if (typeof price !== "number") {
  //     console.error("Invalid cart price configuration", {
  //       productId: product._id,
  //       key,
  //       value,
  //     });
  //     return acc;
  //   }

  //   return acc + price;
  // }, 0);
  // return configPricing + toppingsTotal;
  return totalPrice;
}
