import React, { useEffect, useState } from "react";
import { Headernav } from "../../components";
import { Input, Menu, MenuProps } from "antd";
import { Typography } from "antd";

import { useProductState } from "./context";
import { ProductListItem } from "./components/item";

const { Text } = Typography;
const { Search } = Input;
export const ProductPage = () => {
  const { products, getProducts, loading } = useProductState();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  useEffect(() => {
    getProducts();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e: any) => {
    console.log("click ", e);
  };
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    getItem("BRAND", "sub1", [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
    ]),

    getItem("DOSAGE FORM", "sub2", [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
    ]),

    getItem("WEIGHT", "sub4", [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const rootSubmenuKeys: any = [];
  const onOpenChange: MenuProps["onOpenChange"] = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <div>
      <Headernav />
      <div className="mx-20">
        {loading && <div>loading...</div>}
        <div className="my-4">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={() => {}}
          />
        </div>
        <div className="flex w-full">
          <div className="w-[30%]">
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ width: 256 }}
              items={items}
            />
          </div>
          <div className="w-[80%]">
            <div className="flex justify-between my-4">
              <Text code>{`Ant Design: ${54}`}</Text>
            </div>
            {products?.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 my-2 border-gray-200 border rounded-lg">
                {products?.map((p) => (
                  <ProductListItem product={p} key={p?.id} />
                ))}
              </div>
            ) : (
              !loading && products?.length === 0 && <div>No products...</div>
            )}
          </div>
        </div>
        <div
          style={{ backgroundImage: "url(/public/images/subtract.png)" }}
          className="bg-[image:var('/public/images/subtract.png')] w-full h-96"
        ></div>
      </div>
    </div>
  );
};
