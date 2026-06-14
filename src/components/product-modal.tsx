"use client";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import ToppingList from "./topping-list";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Topping } from "@/lib/types";
import { startTransition, Suspense, useState } from "react";
import React from "react";
const ProductModal = ({ product }: { product: Product }) => {
  type ChosenConfig = {
    [key: string]: string;
  };
  const [chosenConfig, setChosenConfig] = useState<ChosenConfig>();
  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element.id === topping.id,
    );

    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedToppings((prev) =>
          prev.filter((elm: Topping) => elm.id !== topping.id),
        );
        return;
      }
      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    });
  };

  const handleAddToCart = () => {
    console.log("adding to cart...");
  };
  const handleRadioChange = (key: string, data: string) => {
    /**
          {
            Size: "Medium",
            Crust: "Thin"
        }
         */
    startTransition(() => {
      setChosenConfig((prev) => {
        return {
          ...prev,
          [key]: data,
        };
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-8 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <DialogTitle className="sr-only">Customize {product.name}</DialogTitle>
        <div className="flex">
          <div className="w-1/3 bg-white rounded p-3 flex items-center justify-center">
            <Image
              src={product.image}
              width={450}
              height={450}
              alt={product.name}
            />
          </div>
          <div className="w-2/3 p-8">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-1">{product.description}</p>

            {Object.entries(product.category.PriceConfiguration).map(
              ([key, value]) => {
                return (
                  <div key={key}>
                    <h4 className="mt-6">Choose the {key}</h4>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      onValueChange={(data) => {
                        handleRadioChange(key, data);
                      }}
                      className="grid grid-cols-3 gap-4 mt-2"
                    >
                      {value.availableOptions.map((option) => {
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                              aria-label={option}
                            />
                            <Label
                              htmlFor={option}
                              className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                );
              },
            )}
            <Suspense fallback={"Topping loading..."}>
              <ToppingList
                selectedToppings={selectedToppings}
                handleCheckBoxCheck={handleCheckBoxCheck}
              />
            </Suspense>
            <div className="flex items-center justify-between mt-12">
              <span className="font-bold">₹400</span>
              <Button onClick={handleAddToCart} className="ml-2">
                <ShoppingCart size={20} />
                <span className="ml-2">Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
