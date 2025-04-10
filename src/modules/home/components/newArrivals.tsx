import React, { useEffect } from "react";
import { ApImage } from "../../../components";
import Link from "next/link";
import { helper } from "../../../helper";
import { IProduct } from "../../product/model";
import { useProductState } from "../../product/context";
import { Spin } from "antd";

export const NewArrivals = () => {
  const { newArrivals, getNewArrivals, loading } = useProductState();

  // useEffect(() => {
  //   getNewArrivals();
  // }, []);

  return (
    <div className="grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {newArrivals?.map((product: IProduct) => (
        <div key={product?._id} className="group relative p-2">
          <Link href={`/products/${product?.slug}`} className="block">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-transform duration-300 group-hover:scale-95">
              <ApImage
                src={product?.images[0]?.uri}
                className="h-full w-full object-cover"
                alt={product?.images[0]?.name}
              />
            </div>
            <div className="mt-2 space-y-1 px-1">
              <h3 className="text-xs font-medium text-gray-900 line-clamp-2 md:text-sm">
                {product?.name}
              </h3>
              <p className="text-xs font-semibold text-primary md:text-sm">
                {helper.toCurrency(parseFloat(product?.price))}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
