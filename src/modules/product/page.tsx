import React, { useEffect, useState } from "react";
import {
  ApBackgroundImage,
  ApImage,
  Footer,
  Headernav,
} from "../../components";
import { Button, Input, Menu, MenuProps } from "antd";
import { Typography } from "antd";
import { useProductState } from "./context";
import { ProductListItem } from "./components/item";
import Woman from "../../../public/images/Image.png";
import backgroundImage from "../../../public/images/subtract.png";
import { IProduct, IProductFilter } from "./model";
import { CategoryListItem } from "./components/category";

const { Text } = Typography;
const { Search } = Input;
export const ProductPage = () => {
  const { products, getProducts, loading } = useProductState();
  const [filter, setFilter] = useState<IProductFilter>();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  useEffect(() => {
    getProducts();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e: any) => {
    const name =
      e?.item?.props?.children[1]?.props?.props?.children[1].props?.children;
    getProducts(e?.key);
    console.log(name);
    console.log(e);
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
      getItem("Kedi", "Kedi"),
      getItem("Tuyil", "Tuyil"),
    ]),

    getItem("Color", "sub2", [
      getItem("White", "White"),
      getItem("Red", "Red"),
    ]),

    getItem("Price", "sub4", [
      getItem(["100", "10000"], "34"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  return (
    <div>
      <Headernav />
      <div className="mx-20">
        {loading && <div>loading...</div>}
        <div className="my-4">
          <Search
            placeholder="search product"
            allowClear
            enterButton="Search"
            size="large"
            className="bg-blue-600 rounded-md"
            onSearch={() => {}}
          />
        </div>
        <div className="flex w-full">
          <div className="w-[30%]">
            {/* <Menu
              onClick={onClick}
              style={{ width: 256 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            /> */}
            <CategoryListItem />
          </div>
          <div className="w-[80%]">
            <div className="flex justify-between my-4">
              <Text code>{`Product: ${products.length}`}</Text>
            </div>
            {products?.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 my-2 border-gray-200 border rounded-lg">
                {products?.map((p) => (
                  <ProductListItem product={p} key={p?._id} />
                ))}
              </div>
            ) : (
              !loading && products?.length === 0 && <div>No products...</div>
            )}
          </div>
        </div>
      </div>
      <ApBackgroundImage
        src={Woman.src}
        style={{
          width: "100%",
          height: "30rem",
          marginBlock: "2rem",
          // marginLeft: "8rem",
          marginRight: "8rem",
        }}
      >
        {/* <div className="w-[50%]  text-white text-center border border-none rounded-lg  p-12  bg-[#2158E8]">
          <h1 className="m-auto text-4xl">
            Try Viagra V100 today and experience the power of a stronger and
            longer-lasting erection.
          </h1>
          <p className="my-2">
            Order now and receive discreet packaging and fast delivery right to
            your doorstep.
          </p>
          <Button
            type="primary"
            size={"large"}
            className="border-white border my-2"
          >
            Shop Now
          </Button>
        </div> */}
      </ApBackgroundImage>
      <Footer />
    </div>
  );
};
