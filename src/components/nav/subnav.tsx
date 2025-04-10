import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useCategorystate } from "../../modules/category/context";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import classNames from "classnames";

interface IProps {
  storeId?: string;
}
export const SubNav: React.FC<IProps> = ({ storeId }) => {
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
    <nav className="hidden md:flex justify-center bg-white py-3 shadow-sm">
      <div className="flex space-x-8 max-w-7xl w-full px-4">
        <Link
          href="/stores"
          className="text-gray-700 hover:text-primary transition-colors"
        >
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

        <Link href="/favorites" className="text-sm font-medium">
          My Wishlist
        </Link>
        <Link href="/orders" className="text-sm font-medium">
          My Orders
        </Link>
        <Link
          href={storeId ? `/stores/${storeId}/blogs` : "/blogs"}
          className="text-sm font-medium"
        >
          Blogs
        </Link>
        {/* <Link href="#" className="text-sm font-medium">
          Contact us
        </Link> */}
      </div>
    </nav>
  );
};
