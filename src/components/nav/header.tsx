import {
  CloseCircleFilled,
  ShoppingCartOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { ShoppingCartIcon, Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie } from "../../helper";
import { useCartState } from "../../modules/cart/context";
import { useProductState } from "../../modules/product/context";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify logo white.jpg";
import { IProductImage } from "../../modules/product/model";

interface IProps {
  storeId: string;
}
export const HeaderNav: React.FC<IProps> = ({ storeId }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { carts, getCart } = useCartState();
  const { products, getProducts } = useProductState();

  useEffect(() => {
    const id = getCookie("user_id");
    getCart(id);
  }, []);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <header className="relative bg-white">
      {/* Top Bar */}
      <div className="bg-gray-200 py-2 text-sm flex justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <span className="mr-4">Free Shipping on Orders Over $100</span>
          <Link href="/track-order" className="hover:underline">
            Track Order
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/account" className="hover:underline">
            My Account
          </Link>
          <span>USD</span>
          <span>EN</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <div className="hidden xl:flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <ApImage src={Logo} alt="logo" className="object-cover w-auto" />
          </Link>

          {/* All Departments Dropdown */}
          <div className="relative">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
              All Departments
            </button>
            {/* Dropdown would be implemented here */}
          </div>

          {/* Search Bar */}
          <input
            type="search"
            placeholder="Search Products"
            className="w-full max-w-lg border rounded-md outline-none px-4 mx-4 py-2"
            onChange={() => {}}
          />

          {/* Navigation Links */}
          <div className="flex space-x-10 text-sm font-medium">
            <Link href="/stores" className="text-gray-700 hover:text-black">
              Stores
            </Link>
            <Link
              href={storeId ? `/store/${storeId}/products` : "/products"}
              className="text-gray-700 hover:text-black"
            >
              Collections
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-black">
              Order
            </Link>
            <Link
              href={storeId ? `/store/${storeId}/blog` : "/blog"}
              className="text-gray-700 hover:text-black"
            >
              Blog
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="ml-auto">
            <Link href="/cart" className="flex items-center p-2">
              <ShoppingCartIcon className="text-2xl text-gray-700" />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {carts?.length || 0}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu - Hamburger Icon */}
        <div className="flex lg:hidden justify-between items-center h-16">
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

          <Link href="/" className="flex items-center">
            <ApImage src={Logo} alt="logo" className="object-cover w-auto" />
          </Link>

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

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed inset-0 z-50 transition-transform transform ${
            toggle ? "translate-x-0" : "-translate-x-full"
          } lg:hidden bg-white w-3/4 max-w-xs`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <Link href="/">
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

            <nav className="mt-6">
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
                href={storeId ? `/store/${storeId}/blog` : "/blog"}
                className="block py-2 text-sm font-medium"
              >
                Blog
              </Link>
            </nav>
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
