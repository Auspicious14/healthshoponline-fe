import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  MenuProps,
  Select,
  Tabs,
  TabsProps,
  Tooltip,
  Upload,
} from "antd";
import Link from "next/link";
import { useCartState } from "../../modules/cart/context";
import { getCookie } from "../../helper";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify_070931.png";
import { useProductState } from "../../modules/product/context";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Icon, {
  CameraOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  FileImageOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useCategorystate } from "../../modules/category/context";
import { CategorySideBar } from "../../modules/category/components/sidebar";
import { IProductFilter } from "../../modules/product/model";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { fileSvc } from "../../file";
import { useRouter } from "next/router";

const { Search } = Input;
interface IProps {
  storeId?: string;
}
export const Headernav: React.FC<IProps> = ({ storeId }) => {
  const router = useRouter();
  const { carts, getCart } = useCartState();
  const { products, getProducts, getProductsByImage } = useProductState();
  const { categories, getCategories } = useCategorystate();
  const [toggle, setToggle] = useState<boolean>(false);
  const [filter, setFilter] = useState<IProductFilter>({ pageSize: 100 });
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const id = getCookie("user_id");
    getCart(id);
  }, []);

  // useEffect(() => {
  //   // getCategories()
  //   getProducts(filter);
  // }, [filter]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Main menu",
      children: <>{mobileTabNav(storeId as string)}</>,
    },
    {
      key: "2",
      label: "Collections",
      children: (
        <div className="overflow-scroll h-[500px] bg-red-400">
          <CategorySideBar isNav />
        </div>
      ),
    },
  ];

  const handleSearch = (name: string) => {
    setFilter({ ...filter, name });
  };

  const handleChange = (val: string) => {
    if (val) {
      setValue(val);
    }
  };

  console.log({ products });

  const handleImageUpload = async (file: UploadFile<any>) => {
    const { name, type }: any = file;

    const uri = await fileSvc.fileToBase64(file.originFileObj as any);

    getProductsByImage({ name, uri, type }).then((res) => {
      console.log({ res });
      if (res?.length > 0) {
        router.push({
          pathname: "/products",
          query: { products: JSON.stringify(res) },
        });
      }
    });
  };

  return (
    <header className="relative bg-white">
      <nav aria-label="Top" className="max-w-7xl mx-auto lg:px-8">
        <div className="hidden lg:flex justify-between items-center h-16">
          <Link href={"/"} className="flex items-center">
            <ApImage src={Logo} alt="logo" className="object-cover w-auto" />
          </Link>
          <div className="w-1/3 flex gap-4">
            <Select
              className="w-full"
              showSearch
              defaultActiveFirstOption={false}
              suffixIcon={null}
              notFoundContent={null}
              placeholder={"Search Product"}
              value={value}
              // onSearch={(e) => handleSearch(e)}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              {products?.length > 0 &&
                products?.map((p) => (
                  <Select.Option key={p._id} value={p.name.toLowerCase()}>
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  </Select.Option>
                ))}
            </Select>
            <Tooltip
              title="Search by Image"
              placement="bottom"
              arrow={{ pointAtCenter: false }}
            >
              <Upload
                accept="/*"
                fileList={[]}
                className="text-primary text-2xl"
                onChange={(e) => handleImageUpload(e.file)}
              >
                <CameraOutlined />
                {/* <h1>Text here</h1> */}
              </Upload>
            </Tooltip>
          </div>
          <Link href="/cart" className="relative items-center p-2">
            <ShoppingCartOutlined
              size={30}
              className="text-2xl text-gray-700"
            />
            {!!carts && carts?.length >= 0 && (
              <div className="absolute bg-primary text-white w-8 h-8 flex justify-center items-center rounded-full p-2 -top-4 left-3 text-sm font-medium text-gray-700">
                {carts?.length}
              </div>
            )}
          </Link>
        </div>

        <div className="flex lg:hidden justify-between items-center h-16">
          <div className="flex gap-3 md:p-2 items-center">
            <div className="md:hidden">
              <button
                type="button"
                className="rounded-md p-2 text-gray-400"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? (
                  <CloseCircleFilled className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <Link href={"/"}>
              <ApImage src={Logo} alt="logo" className="object-cover w-40" />
            </Link>
          </div>
          <div className="md:block hidden w-1/3">
            <Select
              className="w-full"
              showSearch
              defaultActiveFirstOption={false}
              suffixIcon={null}
              filterOption={false}
              notFoundContent={null}
              placeholder={"Search Product"}
              value={value}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              {products?.length > 0 &&
                products?.map((p) => (
                  <Select.Option key={p._id} value={p.name.toLowerCase()}>
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  </Select.Option>
                ))}
            </Select>
          </div>
          <Upload
            accept="/*"
            fileList={[]}
            className="bg-primary"
            onChange={(e) => handleImageUpload(e.file)}
          >
            <Icon name="image" children />
          </Upload>
          <Link href="/cart" className="relative items-center p-2">
            <ShoppingCartOutlined
              size={30}
              className="text-2xl text-gray-700"
            />
            {!!carts && carts?.length >= 0 && (
              <div className="absolute bg-primary text-white w-8 h-8 flex justify-center items-center rounded-full p-2 -top-4 left-3 text-sm font-medium text-gray-700">
                {carts?.length}
              </div>
            )}
          </Link>
        </div>
        <div className="md:hidden w-full flex justify-center gap-4 items-center pb-4">
          <Select
            className="w-[80%]"
            showSearch
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            notFoundContent={null}
            value={value}
            placeholder={"Search Product"}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            {products?.length > 0 &&
              products.map((p) => (
                <Select.Option key={p._id} value={p.name.toLowerCase()}>
                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                </Select.Option>
              ))}
          </Select>
          <Tooltip
            title="Search by Image"
            placement="bottom"
            arrow={{ pointAtCenter: false }}
          >
            <Upload
              accept="/*"
              fileList={[]}
              className="text-primary text-2xl"
              onChange={(e) => handleImageUpload(e.file)}
            >
              <CameraOutlined />
              {/* <h1>Text here</h1> */}
            </Upload>
          </Tooltip>
        </div>

        <div
          className={`fixed inset-0 z-[50] transition-transform transform ${
            toggle ? "translate-x-0" : "-translate-x-full"
          } lg:hidden bg-white w-3/4 max-w-xs`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <Link href={"/"}>
                <ApImage src={Logo} alt="logo" className="object-cover w-40" />
              </Link>

              <button
                type="button"
                className="text-gray-400"
                onClick={() => setToggle(false)}
              >
                <CloseCircleOutlined size={40} aria-hidden="true" />
              </button>
            </div>

            <Tabs
              defaultActiveKey="1"
              className="h-full font-sans z-[50000]"
              items={items}
            />
          </div>
        </div>

        {toggle && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setToggle(false)}
          />
        )}
      </nav>
    </header>
  );
};

const mobileTabNav = (storeId: string) => (
  <nav className="md:mt-6 ">
    <Link href="/stores" className="block py-2 text-sm font-medium">
      Stores
    </Link>
    <Link
      href={storeId ? `/store/${storeId}/products` : "/products"}
      className="block py-2 text-sm font-medium"
    >
      Collections
    </Link>
    <Link href={"/favorites"} className="block py-2 text-sm font-medium">
      Wishlist
    </Link>
    <Link href="/orders" className="block py-2 text-sm font-medium">
      Order
    </Link>
    <Link
      href={storeId ? "/store/${storeId}/blogs" : "/blogs"}
      className="block py-2 text-sm font-medium"
    >
      Blog
    </Link>
  </nav>
);
