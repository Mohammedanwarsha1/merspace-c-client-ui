import React, { useEffect } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const [toppings, setToppings] = React.useState<Topping[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=1`,
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings);
      console.log("topping", toppings);
    };
    fetchData();
  }, []);

  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping: Topping) => {
          return (
            <ToppingCard
              topping={topping}
              key={topping.id}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
