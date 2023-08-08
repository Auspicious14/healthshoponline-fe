import React from "react";
import { useCategorystate } from "../../category/context";
import { ApImage } from "../../../components";
import { Button } from "antd";
import Categories from "../../../../public/images/Frame 1000005044 (2).png";

export const Category = () => {
  const { categories } = useCategorystate();
  return (
    <div className="grid gap-4 grid-cols-4 align-middle">
      {categories?.map((c) => (
        <div>
          <ApImage
            src={Categories}
            className="flex-1 w-full h-40  justify-end border object-cover rounded-lg"
            alt="categories"
          />
          <Button className="bg-white border-none relative -top-20 font-bold px-12 text-black text-center ">
            {c?.name}
          </Button>
        </div>
      ))}
    </div>
  );
};
