import React, { useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useCartState } from "../../modules/cart/context";

export const SubNav = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div>
      <div className="bg-primary">
        <header className="relative bg-primary text-white">
          <nav aria-label="Top" className="  sm:px-6 ">
            <>
              <div className="md:flex lg:justify-end md:py-4 md:px-12 md:justify-center md:items-center hidden">
                <div className="  lg:items-center lg:justify-center space-x-16">
                  <Link href="/stores" className="text-sm font-medium">
                    Stores
                  </Link>
                  <Link href="/products" className="text-sm font-medium">
                    Collections
                  </Link>
                  <Link href="/orders" className="text-sm font-medium ">
                    Order
                  </Link>
                  <Link href="#" className="text-sm font-medium ">
                    Blog
                  </Link>
                  <Link href="#" className="text-sm font-medium">
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="fixed w-full bg-primary bg-opacity-90 z-50 md:hidden">
                <div className="flex justify-between py-4 px-12 items-center  md:hidden ">
                  <Link href="/stores" className="text-sm font-medium">
                    Stores
                  </Link>
                  <Link href="/products" className="text-sm font-medium">
                    Collections
                  </Link>
                  <Link href="#" className="text-sm font-medium ">
                    Blog
                  </Link>
                  <Link href="/orders" className="text-sm font-medium ">
                    Order
                  </Link>
                  <Link href="#" className="text-sm font-medium">
                    Contact us
                  </Link>
                </div>
              </div>
            </>
          </nav>
        </header>
      </div>
    </div>
  );
};
