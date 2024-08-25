import React, { useEffect, useState } from "react";
import { ApImage, ApModal, Footer } from "../../components";
import { Input, Pagination, Spin } from "antd";
import { Typography } from "antd";
import { useProductState } from "./context";
import { ProductListItem } from "./components/item";
import Woman from "../../../public/images/Image.png";
import { IProductFilter } from "./model";
import { FilterProduct } from "./components/filter";
import { MenuFoldOutlined, MessageOutlined } from "@ant-design/icons";
import { ChatPage } from "../chat/page";

const { Text } = Typography;
const { Search } = Input;

interface IProps {
  userId: string | null;
  user: { id: string | null; isAdmin: boolean };
  storeId?: string;
}

export const ProductPage: React.FC<IProps> = ({ storeId, userId, user }) => {
  const { products, getProducts, loading } = useProductState();
  const [filter, setFilter] = useState<IProductFilter>({});
  const [modal, setModal] = useState<{
    show: boolean;
    type?: "chat" | "detail";
  }>({ show: false, type: "detail" });

  useEffect(() => {
    if (storeId) {
      setFilter({ ...filter, storeId });
    }
  }, [storeId]);
  console.log(userId, "userrrr");

  useEffect(() => {
    getProducts(filter);
  }, [filter]);

  const handleSearch = (val: string) => {
    if (val === undefined) return;
    setFilter({ ...filter, name: val });
  };

  return (
    <div className="relative">
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
                onClick={() => setModal({ show: !modal, type: "detail" })}
              />
            </div>
            {loading && (
              <Spin size="large" className="flex justify-center items-center" />
            )}
            {!loading && products?.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 my-2 py-4 align-middle border-gray-200 border rounded-lg">
                {products?.map((p) => (
                  <ProductListItem product={p} key={p?._id} userId={userId} />
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

      {storeId && (
        <div className="fixed right-10 bottom-16">
          <div className="flex justify-center items-center shadow-sm bg-blue-700 cursor-pointer text-white p-4 rounded-full">
            <MessageOutlined
              size={30}
              className="text-3xl"
              onClick={() => setModal({ show: true, type: "chat" })}
            />
          </div>
        </div>
      )}
      <ApImage
        src={Woman.src}
        alt="image"
        className="w-full md:h-[500px] m-auto mt-6 sm:object-cover object-contain"
      />
      <Footer />
      {modal.type == "detail" && (
        <ApModal show={modal.show} onDimiss={() => setModal({ show: false })}>
          <FilterProduct setFilter={setFilter} />
        </ApModal>
      )}

      {modal.type == "chat" && modal.show && (
        <ChatPage
          storeId={storeId as string}
          userId={userId as string}
          onDissmiss={() => setModal({ show: false, type: "chat" })}
          user={user}
        />
      )}
    </div>
  );
};
