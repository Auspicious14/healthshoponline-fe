import React, { useEffect } from "react";
import { useCategorystate } from "../../category/context";
import { ApImage } from "../../../components";
import { Button } from "antd";
import Categories from "../../../../public/images/Frame 1000005044 (2).png";
import Link from "next/link";

export const Category = () => {
  const { categories, getCategories } = useCategorystate();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-3 align-middle">
      {categories?.map((c) => (
        <div key={c?._id} className="w-full h-full">
          <div className="bg-white md:w-auto w-full shadow-md rounded-md transition-transform hover:shadow-lg hover:scale-105 flex flex-col justify-between h-full">
            <div>
              <Link href={`/collections/${c?.slug}`} className="">
                <div className="group relative">
                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                    <ApImage
                      // key={c?.images[0]?._id}
                      src={c?.images[0]?.uri}
                      alt={c?.images[0]?.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      unoptimized
                    />
                  </div>
                  <div className="mt-4 mx-4">
                    <h3 className="text-gray-700 text-sm font-bold line-clamp-2 max-h-12 overflow-hidden">
                      {c?.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

{
  /* <div className="grid gap-4 sm:grid-cols-3 grid-cols-2">
      {categories?.map((c) => (
        <div key={c?._id} className="relative">
          {!!c?.images?.length && (
            <ApImage
              src={c?.images[0]?.uri}
              className="w-full h-60 object-cover rounded-lg"
              alt={c?.images[0]?.name}
            />
          )}
          <Button
            href={`/products`}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border-none font-bold px-4 py-2 text-black"
          >
            {c?.name}
          </Button>
        </div>
      ))}
    </div> */
}
