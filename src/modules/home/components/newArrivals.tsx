import React from "react";
import { ApImage } from "../../../components";
import { Button } from "antd";
import Categories from "../../../../public/images/Frame 1000005044 (2).png";
import Link from "next/link";
import { helper } from "../../../helper";
import { IProduct } from "../../product/model";
import { useProductState } from "../../product/context";

export const NewArrivals = () => {
  const { newArrivals } = useProductState();

  return (
    <div className="grid gap-4 grid-cols-4">
      {newArrivals?.map((p: IProduct) => (
        <div key={p?._id}>
          <Link href={`/product/${p?._id}`} className="">
            <div className="relative">
              <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                <ApImage
                  key={p?.images[0]?._id}
                  src={p?.images[0]?.uri}
                  alt={p?.images[0]?.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  unoptimized
                />
              </div>
              <div className="mt-4 mx-4">
                <h3 className=" text-gray-700 font-bold">{p.name}</h3>
                <p className=" font-bold text-gray-900">
                  {helper.toCurrency(parseFloat(p.price))}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
