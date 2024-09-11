import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useCategorystate } from "../../modules/category/context";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import classNames from "classnames";

export const SubNav = () => {
  const { categories, getCategories } = useCategorystate();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    getCategories();
  }, []);

  const categoryItems = categories?.map((category) => ({
    key: category?._id,
    label: (
      <Link href={`/collections/${category?.slug}`}>{category?.name}</Link>
    ),
  }));

  const animatedMenuClass = classNames(
    "p-4 grid grid-cols-2 transform transition ease-in-out duration-300",
    {
      "opacity-0 translate-y-[-10px]": !isVisible,
      "opacity-100 translate-y-0": isVisible,
    }
  );

  return (
    <div className="bg-primary">
      <header className="relative bg-primary text-white">
        <nav aria-label="Top" className="sm:px-6">
          {/* Desktop Links */}
          <div className="hidden md:flex justify-center py-4">
            <div className="flex space-x-16">
              <Link href="/stores" className="text-sm font-medium">
                Stores
              </Link>

              <Dropdown
                menu={{
                  items: categoryItems,
                  className: animatedMenuClass,
                }}
                onOpenChange={(visible) => setIsVisible(visible)}
              >
                <div
                  className="ant-dropdown-link text-sm font-medium cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  Collections
                </div>
              </Dropdown>

              <Link href="/orders" className="text-sm font-medium">
                Order
              </Link>
              <Link href="/blogs" className="text-sm font-medium">
                Blog
              </Link>
              <Link href="#" className="text-sm font-medium">
                Contact us
              </Link>
            </div>
          </div>

          {/* Mobile Links */}
          <div className="md:hidden flex justify-between py-4 px-12">
            <Link href="/stores" className="text-sm font-medium">
              Stores
            </Link>
            <Link href="/products" className="text-sm font-medium">
              Collections
            </Link>
            <Link href="/orders" className="text-sm font-medium">
              Order
            </Link>
            <Link href="/blogs" className="text-sm font-medium">
              Blog
            </Link>
            <Link href="#" className="text-sm font-medium">
              Contact us
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};
