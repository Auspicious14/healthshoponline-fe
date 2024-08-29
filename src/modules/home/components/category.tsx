import React from "react";
import { useCategorystate } from "../../category/context";
import { ApImage } from "../../../components";
import { Button } from "antd";
import Categories from "../../../../public/images/Frame 1000005044 (2).png";
import Link from "next/link";

export const Category = () => {
  const { categories } = useCategorystate();
  return (
    <div className="grid gap-4 xl:lg:md:grid-cols-4 sm:grid-cols-3 grid-cols-2 align-middle">
      {categories?.map((c) => (
        <div key={c?._id} className="w-full h-full">
          {!!c?.images?.length && (
            <ApImage
              src={c?.images[0]?.uri}
              className="w-full h-60 object-cover rounded-lg"
              alt={c?.images[0]?.name}
            />
          )}
          <Button
            href={`/products`}
            className="bg-white border-none relative -top-20 font-bold px-12 text-black text-center "
          >
            {c?.name}
          </Button>
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
