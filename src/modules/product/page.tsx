import React, { useEffect } from "react";
import { useProductState } from "./context";

export const ProductPage = () => {
  const { products, getProducts, loading } = useProductState();
  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);
  return (
    <div>
      {loading && <div>loading...</div>}

      <div>
        {products.map((p, i) => (
          <div key={i} className={"font-bold bg-red-400"}>
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
};
