import React, { useEffect, useState } from "react";
import { ApImage, ApModal, Footer } from "../../components";
import { Input, Pagination, Spin } from "antd";
import { Typography } from "antd";
import { useProductState } from "./context";
import { ProductListItem } from "./components/item";
import Woman from "../../../public/images/Image.png";
import { IProductFilter } from "./model";
import { FilterProduct } from "./components/filter";
import { MenuFoldOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Search } = Input;

interface IProps {
  storeId?: string;
}

export const ProductPage: React.FC<IProps> = ({ storeId }) => {
  const { products, getProducts, loading } = useProductState();
  const [filter, setFilter] = useState<IProductFilter>({ storeId });
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    getProducts({ ...filter, storeId });
  }, [filter]);

  const handleSearch = (val: string) => {
    if (val === undefined) return;
    setFilter({ ...filter, name: val });
  };

  console.log(products, "filter");
  return (
    <>
      <div className="md:mx-20 px-4 pt-20 md:p-0 ">
        <Search
          placeholder="search product"
          allowClear
          enterButton="Search"
          size="large"
          className="bg-blue-600 rounded-md md:mt-8"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="md:flex gap-10 w-full">
          <div className="md:w-[30%] hidden md:block">
            <FilterProduct setFilter={setFilter} />
          </div>
          <div className="md:w-[80%]">
            <div className="flex justify-between items-center my-4">
              <Text code>{`Product: ${products?.length}`}</Text>
              <MenuFoldOutlined
                className="md:hidden"
                onClick={() => setModal(!modal)}
              />
            </div>
            {loading && (
              <Spin size="large" className="flex justify-center items-center" />
            )}
            {!loading && products?.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 my-2 py-4 align-middle border-gray-200 border rounded-lg">
                {products?.map((p) => (
                  <ProductListItem product={p} key={p?._id} />
                ))}
              </div>
            ) : (
              !loading && products?.length === 0 && <div>No products...</div>
            )}
            <Pagination
              className="text-center"
              defaultCurrent={1}
              // showTotal={(t, r: [number, number]) => <div>{t}</div>}
              total={products?.length}
            />
          </div>
        </div>
      </div>

      <ApImage
        src={Woman.src}
        alt="image"
        className="w-full md:h-[500px] m-auto mt-6 sm:object-cover object-contain"
      />
      <Footer />
      <ApModal show={modal} onDimiss={() => setModal(false)}>
        <FilterProduct setFilter={setFilter} />
      </ApModal>
    </>
  );
};
