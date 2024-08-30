import React, { useEffect, useState } from "react";
import { Input } from "antd";
import Link from "next/link";
import { useCartState } from "../../modules/cart/context";
import { getCookie } from "../../helper";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify logo white.jpg";
import { useProductState } from "../../modules/product/context";

const { Search } = Input;

export const Headernav = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { carts, getCart } = useCartState();
  const { products, getProducts } = useProductState();
  const [filter, setFilter] = useState();
  useEffect(() => {
    const id = getCookie("user_id");
    getCart(id);
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <header className="relative bg-white">
      <nav
        aria-label="Top"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hidden lg:block"
      >
        <div className="border-b border-gray-200">
          <div className="flex justify-center gap-20 h-16 items-center">
            {/* <button
          type="button"
          className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button> */}

            <div className="ml-4 flex gap-32 lg:ml-0 lg:w-1/3">
              <ApImage
                src={Logo}
                alt={"logo"}
                className="object-cover w-auto"
              />
            </div>

            <div className="lg:w-1/3">
              <input
                type="search"
                placeholder="Search Products"
                onChange={() => {}}
                className="w-full  border rounded-md outline-none px-4 py-2"
              />
            </div>

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
