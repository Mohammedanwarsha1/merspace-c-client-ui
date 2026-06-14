import { Category, Product } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await categoryResponse.json();

  const productResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/product?perPage=100&tenantId=1`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  console.log(productResponse.status);

  const products: { data: Product[] } = await productResponse.json();

  console.log(products);
  return (
    <section>
      <div className="container mx-auto max-w-7xl px-20 py-12">
        <Tabs defaultValue="pizza">
          <TabsList>
            {categories.map((category) => {
              return (
                <TabsTrigger
                  key={category._id}
                  value={category._id}
                  className="text-md"
                >
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {categories.map((category) => {
            return (
              <TabsContent key={category._id} value={category._id}>
                <div className="grid grid-cols-4 gap-6 mt-6">
                  {products.data
                    .filter((product) => product.category._id === category._id)
                    .map((product) => (
                      <ProductCard product={product} key={product._id} />
                    ))}
                </div>
              </TabsContent>
            );
          })}
          {/* <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {product.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {product.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </TabsContent> */}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;
