import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
  ICategoryFilterProps,
  IProduct,
  IProductFilter,
  filters,
} from "../model";
import { useProductState } from "../context";
import { useCategorystate } from "../../category/context";

interface IProps {
  product?: IProduct;
}
export const CategoryListItem: React.FC<IProps> = ({ product }) => {
  const { getProducts, loading } = useProductState();
  const [filter, setFilter] = useState<IProductFilter>();
  const [categoryFilter, setCategoryFilter] =
    useState<ICategoryFilterProps[]>(filters);
  const { categories, getCategories } = useCategorystate();

  useEffect(() => {
    getCategories();
  }, []);

  const catFlt = {
    id: "category",
    name: "CATEGORY",
    options: categories?.map((c) => ({
      value: c?.name,
      label: c?.name,
      checked: false,
    })),
  };

  if (filters?.length <= 3) {
    filters.push(catFlt);
  }
  console.log(filters);

  const handleFilter = (section: any, e: any) => {
    console.log(e.target?.value);
    if (section?.name === "COLOR") {
      getProducts({
        ...filter,
        color: e.target.value,
      });
    } else if (section.name === "BRAND") {
      getProducts({
        ...filter,
        brand: e.target.value,
      });
    } else if (section.name === "CATEGORY") {
      getProducts({
        ...filter,
        category: e.target.value,
      });
    } else {
      getProducts({
        ...filter,
        size: e.target.value,
      });
    }
  };
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1> */}
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6 w-full"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
                                  onClick={(e: any) => handleFilter(section, e)}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{/* Your content */}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
