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
    icon: <AppstoreFilled />,
  },
  {
    key: "tab2",
    label: <Link href={"/products"}>Products</Link>,
    icon: <ProductIcon />,
    route: "/products",
  },
  {
    key: "tab3",
    label: <Link href={"/favorites"}>Wishlist</Link>,
    icon: <HeartFilled />,
    route: "/favorites",
  },
  {
    key: "tab4",
    label: <Link href={"/orders"}>Orders</Link>,
    icon: <ShoppingBagIcon />,
    route: "/orders",
  },
  {
    key: "tab5",
    label: <Link href={"/profile"}>Profile</Link>,
    icon: <UserCircleIcon />,
    route: "/profile",
  },
];
export const MobileTab = () => {
  const router = useRouter();

  return (
    <div>
      <div>
        <Tabs
          animated
          activeKey={tabs.find((t) => t.route === router.pathname)?.key}
          defaultActiveKey="tab1"
          className="mx-2"
          items={tabs}
          //   tabBarGutter={35}
        />
      </div>
    </div>
  );
};
