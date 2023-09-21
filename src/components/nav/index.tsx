import React, { useState } from "react";
import { Input } from "antd";
import Link from "next/link";
import { useCartState } from "../../modules/cart/context";

const { Search } = Input;

export const Headernav = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { carts } = useCartState();
  return (
    <header className="relative bg-white">
      <nav
        aria-label="Top"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hidden lg:block"
      >
        <div className="border-b border-gray-200">
          <div className="flex justify-center h-16 items-center">
            {/* <button
          type="button"
          className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button> */}

            {/* Logo */}
            <div className="ml-4 flex gap-32 lg:ml-0">
              <h1 className="font-semibold text-xl">HEALTHSHOP</h1>
              <div className="flex lg:ml-6">
                <Search
                  placeholder="input search text"
                  onSearch={() => {}}
                  enterButton
                  className="w-72 bg-blue-600 border rounded-md"
                />
              </div>
            </div>
            {/* <div className=" lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Home
            </Link>
            <Link
              href="/product"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Collections
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Contact us
            </Link>
          </div> */}

            <div className="ml-auto flex items-center">
              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                  <span>Cart</span>
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {carts?.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="md:hidden flex justify-end">
        <MenuOutlined onClick={() => setToggle(true)} />
      </div> */}
    </header>
  );
};
