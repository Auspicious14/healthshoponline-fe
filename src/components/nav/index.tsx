import React, { useEffect, useState } from "react";
import { Input, MenuProps, Tabs, TabsProps } from "antd";
import Link from "next/link";
import { useCartState } from "../../modules/cart/context";
import { getCookie } from "../../helper";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify_070931.png";
import { useProductState } from "../../modules/product/context";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useCategorystate } from "../../modules/category/context";
import { CategorySideBar } from "../../modules/category/components/sidebar";

const { Search } = Input;
interface IProps {
  storeId?: string;
}
export const Headernav: React.FC<IProps> = ({ storeId }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { carts, getCart } = useCartState();
  const { products, getProducts } = useProductState();
  const { categories, getCategories } = useCategorystate();

  useEffect(() => {
    const id = getCookie("user_id");
    getCart(id);
  }, []);

  useEffect(() => {
    // getCategories()
    getProducts();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Main menu",
      children: <>{mobileTabNav(storeId as string)}</>,
    },
    {
      key: "2",
      label: "Collections",
      children: <CategorySideBar isNav />,
    },
  ];

  return (
    <header className="relative bg-white">
      <nav aria-label="Top" className="max-w-7xl mx-auto lg:px-8">
        <div className="hidden xl:flex justify-between items-center h-16">
          <Link href={"/"} className="flex items-center">
            <ApImage src={Logo} alt="logo" className="object-cover w-auto" />
          </Link>
          <input
            type="search"
            placeholder="Search Products"
            className="w-1/2 border rounded-md outline-none px-4 mx-4 py-2"
            onChange={() => {}}
          />
          <Link href="/cart" className="relative items-center p-2">
            <ShoppingCartOutlined
              size={30}
              className="text-2xl text-gray-700"
            />
            {!!carts && carts?.length >= 0 && (
              <div className="absolute bg-primary text-white w-8 h-8 flex justify-center items-center rounded-full p-2 -top-4 left-3 text-sm font-medium text-gray-700">
                {carts?.length}
              </div>
            )}
          </Link>
        </div>

        <div className="flex lg:hidden justify-between items-center h-16">
          <div className="flex gap-3 items-center">
            <button
              type="button"
              className="rounded-md p-2 text-gray-400"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? (
                <CloseCircleFilled className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <Link href={"/"}>
              <ApImage src={Logo} alt="logo" className="object-cover w-40" />
            </Link>
          </div>
          <Link href="/cart" className="relative items-center p-2">
            <ShoppingCartOutlined
              size={30}
              className="text-2xl text-gray-700"
            />
            {!!carts && carts?.length >= 0 && (
              <div className="absolute bg-primary text-white w-8 h-8 flex justify-center items-center rounded-full p-2 -top-4 left-3 text-sm font-medium text-gray-700">
                {carts?.length}
              </div>
            )}
          </Link>
        </div>

        <div
          className={`fixed inset-0 z-50 transition-transform transform ${
            toggle ? "translate-x-0" : "-translate-x-full"
          } lg:hidden bg-white w-3/4 max-w-xs`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <Link href={"/"}>
                <ApImage
                  src={Logo}
                  alt="logo"
                  className="object-cover w-auto"
                />
              </Link>

              <button
                type="button"
                className="text-gray-400"
                onClick={() => setToggle(false)}
              >
                <CloseCircleOutlined
                  size={30}
                  className="h-10 w-10"
                  aria-hidden="true"
                />
              </button>
            </div>

            <Tabs
              defaultActiveKey="1"
              className="h-full font-sans"
              items={items}
            />
          </div>
        </div>

        {toggle && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setToggle(false)}
          />
        )}
      </nav>
    </header>
  );
};

const mobileTabNav = (storeId: string) => (
  <nav className="md:mt-6">
    <Link href="/stores" className="block py-2 text-sm font-medium">
      Stores
    </Link>
    <Link
      href={storeId ? `/store/${storeId}/products` : "/products"}
      className="block py-2 text-sm font-medium"
    >
      Collections
    </Link>
    <Link href="/orders" className="block py-2 text-sm font-medium">
      Order
    </Link>
    <Link
      href={storeId ? "/store/${storeId}/blog" : "/blog"}
      className="block py-2 text-sm font-medium"
    >
      Blog
    </Link>
  </nav>
);
