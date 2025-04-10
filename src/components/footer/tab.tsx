import { AppstoreFilled, BoxPlotFilled, HeartFilled } from "@ant-design/icons";
import { ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Tabs } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ProductIcon } from "../icon/product";

const tabs = [
  {
    key: "tab1",
    label: <Link href={"/stores"}>Stores</Link>,
    route: "/stores",
    icon: <AppstoreFilled className="text-primary" />,
  },
  {
    key: "tab2",
    label: <Link href={"/products"}>Products</Link>,
    icon: <ProductIcon className="text-primary" />,
    route: "/products",
  },
  {
    key: "tab3",
    label: <Link href={"/favorites"}>Wishlist</Link>,
    icon: <HeartFilled className="text-primary" />,
    route: "/favorites",
  },
  {
    key: "tab5",
    label: <Link href={"/profile"}>Profile</Link>,
    icon: <UserCircleIcon className="w-6 h-6 text-primary" />,
    route: "/profile",
  },
];
export const MobileTab = () => {
  return (
    <div className="flex justify-around items-center h-16 px-4">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.route}
          className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs mt-1">{tab.label}</span>
        </Link>
      ))}
    </div>
  );
};
