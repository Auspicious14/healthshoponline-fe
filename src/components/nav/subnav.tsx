import React, { useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useCartState } from "../../modules/cart/context";

export const SubNav = () => {
  const [toggle, setToggle] = useState<boolean>(false);

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
