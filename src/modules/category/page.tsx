import { useEffect, useState } from "react";
import { useCategorystate } from "./context";

export const CategoryPage = () => {
  const { categories, getCategories } = useCategorystate();
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-white p-4">
      <h1 className="text-lg font-semibold mb-4 uppercase font-sans">
        Categories
      </h1>
      <ul className="space-y-4 text-sm grid grid-cols-3 gap-4 lg:block">
        {categories.map((category) => (
          <li key={category._id} className="hover:text-primary cursor-pointer">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
