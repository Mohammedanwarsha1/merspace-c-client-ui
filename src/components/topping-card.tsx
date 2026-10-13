"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { Topping } from "@/lib/types";

type PropType = {
  topping: Topping;
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
};
const ToppingCard = ({
  topping,
  selectedToppings,
  handleCheckBoxCheck,
}: PropType) => {
  const imageSrc = typeof topping.image === "string" ? topping.image.trim() : "";
  const isCurrentSelected = selectedToppings.some(
    (element) => element.id === topping.id,
  );

  return (
    <Button
      onClick={() => handleCheckBoxCheck(topping)}
      variant={"outline"}
      className={cn(
        "flex flex-col h-auto min-h-42 relative",
        isCurrentSelected ? "border-primary" : "",
      )}
    >
      {imageSrc ? (
        <span className="relative block h-20 w-20">
          <Image
            src={imageSrc}
            fill
            alt={topping.name}
            unoptimized
            sizes="80px"
            className="object-contain"
          />
        </span>
      ) : (
        <div
          className="w-20 h-20 rounded-md bg-gray-100"
          aria-hidden="true"
        />
      )}
      <h4>{topping.name}</h4>
      <p>&#8377;{topping.price}</p>
      {isCurrentSelected && (
        <CircleCheck className="absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
