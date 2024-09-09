import { useEffect, useState } from "react";
import { useCategorystate } from "./context";
import Link from "next/link";

export const CategorySideBar = () => {
  const { categories, getCategories } = useCategorystate();
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-white p-4">
      <h1 className="text-lg font-semibold mb-4 uppercase font-sans">
        Categories
      </h1>
      <div className="space-y-4 text-sm ">
        {categories.map((category) => (
          <a
            href={`/collections/${category?.slug}`}
            key={category._id}
            className="hover:text-primary cursor-pointer block"
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
};
