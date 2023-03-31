import React, { useEffect } from "react";
import { Headernav } from "../../components";
import { useProductState } from "./context";
import { IProduct } from "./model";

interface IProps {
  product: IProduct;
}

export const ProductDetailPage: React.FC<IProps> = ({ product }) => {
  return (
    <div>
      <Headernav />
      <div className="mx-20 my-12">
        <div className="flex justify-around">
          <div>
            <img
              src={product?.images[0]?.uri || ""}
              alt={"name"}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
            <div>
              {product?.images?.map((p) => (
                <img
                  src={p.uri || ""}
                  alt={"name"}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-2xl">{product?.name}</h1>
            <p className="text-lg text-blue-600">{product?.price}</p>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
