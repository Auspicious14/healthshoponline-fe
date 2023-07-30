import React, { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useCartState } from "../../modules/cart/context";

const { Search } = Input;
export const SubNav = () => {
  return (
    <div>
      <div className="bg-primary">
        {/* Mobile menu */}
        {/* <Transition.Root  as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={''}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            ></Transition.Child>
          </div>
        </Dialog>
      </Transition.Root> */}

        <header className="relative bg-primary text-white">
          <nav aria-label="Top" className="  sm:px-6 ">
            <>
              <div className="flex justify-between py-4 px-12 items-center">
                <div className="ml-4 flex gap-32 lg:ml-0">
                  <div className="flex gap-2 items-center">
                    <MenuOutlined />
                    <span>Browse Categories</span>
                  </div>
                </div>
                <div className="  lg:items-center lg:justify-center lg:space-x-16">
                  <Link
                    href="/"
                    className="text-sm font-medium hover:text-gray-800"
                  >
                    Home
                  </Link>
                  <Link href="/product" className="text-sm font-medium">
                    Collections
                  </Link>
                  <Link href="#" className="text-sm font-medium ">
                    Blog
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
