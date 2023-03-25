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
      {!loading && products?.length > 0 && (
        <div>
          {products.map((p, i) => (
            <div key={i} className={"font-bold"}>
              {p.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
