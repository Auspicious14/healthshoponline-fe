import React, { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";

import { Input } from "antd";
// import Search from "antd/es/input/Search";
import Link from "next/link";

const { Search } = Input;
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export const Headernav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
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
                <Link href="#">
                  <span className="sr-only">HEALTHSHOP</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
                <div className="flex lg:ml-6">
                  <Search
                    placeholder="input search text"
                    onSearch={() => {}}
                    enterButton
                    className="w-72 bg-blue-600 border rounded-md"
                  />
                </div>
              </div>
              <div className=" lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-6">
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
              </div>

              <div className="ml-auto flex items-center">
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="#" className="group -m-2 flex items-center p-2">
                    <span>Cart</span>
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
