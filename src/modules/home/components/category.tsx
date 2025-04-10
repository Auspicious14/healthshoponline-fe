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
    <div className="grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories?.map((c) => (
        <div key={c?._id} className="group relative p-2">
          <Link href={`/collections/${c?.slug}`} className="block">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 transition-transform duration-300 group-hover:scale-95">
              <ApImage
                src={c?.images[0]?.uri}
                className="h-full w-full object-cover"
                alt={c?.images[0]?.name}
              />
            </div>
            <h3 className="mt-2 text-xs font-semibold text-gray-700 line-clamp-2 md:text-sm">
              {c?.name}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
};
