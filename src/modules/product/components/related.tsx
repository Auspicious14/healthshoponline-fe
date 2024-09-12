import React from "react";
import { useProductState } from "../context";
import { ProductListItem } from "./item";

export const RelatedProducts = () => {
  const { relatedProducts } = useProductState();

  return (
    <div className="bg-white rounded-lg p-4">
      <div>
        <h1 className="capitalize font-bold text-xl">
          Products you may also like
        </h1>
      </div>
      {relatedProducts?.length > 0 ? (
        <div className="grid md:grid-cols-6 grid-cols-2 gap-4 my-2 py-4 align-middle rounded-lg">
          {relatedProducts?.map((p) => (
            <ProductListItem product={p} key={p?._id} />
          ))}
        </div>
      ) : (
        relatedProducts?.length === 0 && (
          <div className="flex justify-center items-center my-auto">
            No Related products...
          </div>
        )
      )}
    </div>
  );
};
