import React, { useEffect, useState } from "react";
import { IProductFilter, filters } from "../model";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useCategorystate } from "../../category/context";

const filterData: {
  category: keyof IProductFilter;
  options: string[];
}[] = [
  {
    category: "brand",
    options: ["kedi", "Tuyil", "Nike", "Armani"],
  },
  {
    category: "color",
    options: ["White", "Beige", "Blue", "Brown", "Green", "Purple"],
  },
];

interface IProps {
  setFilter: React.Dispatch<React.SetStateAction<IProductFilter>>;
}

export const FilterProduct: React.FC<IProps> = ({ setFilter }) => {
  const [localFilters, setLocalFilters] = useState<IProductFilter>({});
  const [filterCategories, setFilterCategories] = useState(filterData);
  const [toggle, setToggle] = useState<{
    [key in keyof IProductFilter]?: boolean;
  }>({});

  const { categories, getCategories } = useCategorystate();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      const catFlt = {
        category: "category" as keyof IProductFilter,
        options: categories?.map((c) => c.name),
      };

      // setFilterCategories((prev) => {
      //   const existingCategory = prev.find(
      //     (cat) => cat.category === "category"
      //   );
      //   if (existingCategory) {
      //     return prev.map((cat) =>
      //       cat.category === "category" ? catFlt : cat
      //     );
      //   } else {
      //     return [...prev, catFlt];
      //   }
      // });
    }
  }, [categories]);

  const handleFilterChange = (
    category: keyof IProductFilter,
    value: string
  ) => {
    const newFilters = { ...localFilters, [category]: value };
    setLocalFilters(newFilters);
    setFilter(newFilters);
  };

  const handleToggle = (category: string) => {
    // setToggle((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md w-full max-w-xs bg-white">
      {/* {categories.map(({ name }) => (
        <div key={name} className="mb-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wide">
              {name}
            </h3>
            <button
              className="focus:outline-none"
              onClick={() => handleToggle(name)}
            >
              {toggle[name] ? (
                <MinusIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <PlusIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          {toggle[name] && (
            <div className="mt-3 space-y-2 transition-all duration-200 ease-in-out">
              {options.map((option) => (
                <div key={option} className="flex items-center py-2">
                  <input
                    type="radio"
                    name={name}
                    value={option}
                    checked={localFilters?.[name] === option}
                    onChange={(e) =>
                      handleFilterChange(
                        name as keyof IProductFilter,
                        e.target.value
                      )
                    }
                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <label className="ml-3 text-sm text-gray-600">{option}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))} */}
      {/* Add a clear filter button if needed */}
      <div className="pt-4 border-t border-gray-200 mt-4">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
          onClick={() => setFilter({})}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
