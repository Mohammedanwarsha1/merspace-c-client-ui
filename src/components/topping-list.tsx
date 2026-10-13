import React, { useEffect } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";
import { useSearchParams } from "next/navigation";

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const searchParams = useSearchParams();
  const [toppings, setToppings] = React.useState<Topping[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const restaurantId = searchParams.get("restaurantId");

    if (!restaurantId) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const toppingResponse = await fetch(
        `/api/catalog/toppings?tenantId=${encodeURIComponent(restaurantId)}`,
      );

      if (!toppingResponse.ok) {
        throw new Error(`Failed to fetch toppings: ${toppingResponse.status}`);
      }

      const toppings = await toppingResponse.json();
      setToppings(toppings);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      console.error("Failed to load toppings", error);
      setToppings([]);
      setError("Unable to load extra toppings.");
      setIsLoading(false);
    });
  }, [searchParams]);

  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      {isLoading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {!isLoading && !error && (
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
      )}
    </section>
  );
};

export default ToppingList;
