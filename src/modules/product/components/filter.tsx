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

      setFilterCategories((prev) => {
        const existingCategory = prev.find(
          (cat) => cat.category === "category"
        );
        if (existingCategory) {
          return prev.map((cat) =>
            cat.category === "category" ? catFlt : cat
          );
        } else {
          return [...prev, catFlt];
        }
      });
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

  const handleToggle = (category: keyof IProductFilter) => {
    setToggle((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="mb-4">
        {filterCategories.map(({ category, options }) => (
          <div key={category} className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{category.toUpperCase()}</h3>
              {toggle[category] ? (
                <MinusIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                  onClick={() => handleToggle(category)}
                />
              ) : (
                <PlusIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                  onClick={() => handleToggle(category)}
                />
              )}
            </div>
            <div>
              {toggle[category] &&
                options.map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      name={category}
                      value={option}
                      checked={localFilters?.[category] === option}
                      onChange={(e) =>
                        handleFilterChange(
                          category as keyof IProductFilter,
                          e.target.value
                        )
                      }
                    />
                    <label className="ml-2">{option}</label>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
