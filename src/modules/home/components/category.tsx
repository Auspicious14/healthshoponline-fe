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
              className="border object-cover rounded-lg"
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
