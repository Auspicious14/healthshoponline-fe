import React, { useEffect } from "react";
import { ApImage } from "../../../components";
import Link from "next/link";
import { helper } from "../../../helper";
import { IProduct } from "../../product/model";
import { useProductState } from "../../product/context";
import { Spin } from "antd";

export const NewArrivals = () => {
  const { newArrivals, getNewArrivals, loading } = useProductState();

  useEffect(() => {
    getNewArrivals();
  }, []);

  return (
    <>
      {loading && (
        <Spin size="large" className="flex justify-center items-center" />
      )}
      <div className=" grid gap-4 xl:lg:md:grid-cols-4 sm:grid-cols-3 grid-cols-2 align-middle">
        {!loading &&
          newArrivals.length > 0 &&
          newArrivals?.map((product: IProduct) => (
            <div key={product?._id}>
              <div className="bg-white md:w-auto w-full shadow-md rounded-md transition-transform hover:shadow-lg hover:scale-105 flex flex-col justify-between h-full">
                <div>
                  <Link href={`/products/${product?._id}`} className="">
                    <div className="group relative">
                      <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                        <ApImage
                          key={product?.images[0]?._id}
                          src={product?.images[0]?.uri}
                          alt={product?.images[0]?.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          unoptimized
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-gray text-sm line-clamp-2 max-h-12 overflow-hidden">
                          {product?.name}
                        </h3>

                        <p className="font-bold text-gray-900">
                          {helper.toCurrency(parseFloat(product?.price))}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
