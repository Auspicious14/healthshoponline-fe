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
import { useChatState } from "../chat/context";
import { CategorySideBar } from "../category/components/sidebar";

const { Text } = Typography;
const { Search } = Input;

interface IProps {
  userId: string | null;
  user?: { id: string | null; isAdmin: boolean };
  storeId?: string;
}

export const ProductPage: React.FC<IProps> = ({ storeId, userId, user }) => {
  const { products, getProducts, loading } = useProductState();
  const { users, getUsersWhoMessageStore } = useChatState();
  const [filter, setFilter] = useState<IProductFilter>({ limit: 50 });
  const [unreadMessage, setUnreadMessage] = useState<number>(0);
  const [modal, setModal] = useState<{
    show: boolean;
    type?: "chat" | "detail" | "filter";
  }>({ show: false, type: "detail" });

  useEffect(() => {
    if (storeId) {
      setFilter({ ...filter, storeId });
    }
  }, [storeId]);

  useEffect(() => {
    getProducts(filter);
  }, [filter]);

  useEffect(() => {
    getUsersWhoMessageStore(storeId as string);
  }, []);

  useEffect(() => {
    setUnreadMessage(
      users.find((user) => user._id === userId)
        ?.unreadMessagesFromStore as number
    );
  }, [users]);

  const handleSearch = (val: string) => {
    if (val === undefined) return;
    setFilter({ ...filter, name: val });
  };

  return (
    <div className="relative z-50">
      <div className="md:mx-20 px-4 md:p-0">
        <div className="md:flex gap-10 w-full px-4">
          <div className="hidden md:block md:w-[30%]">
            <div className="fixed w-[25%] overflow-auto">
              <CategorySideBar />
            </div>
          </div>

          <div className="md:w-[70%] h-full bg-white">
            <div className="flex justify-between items-center my-4">
              <Text code>{`Products: ${products?.length}`}</Text>
              <MenuFoldOutlined
                className="md:hidden"
                onClick={() => setModal({ show: !modal.show, type: "filter" })}
              />
            </div>

            {loading && (
              <Spin size="large" className="flex justify-center items-center" />
            )}
            {!loading && products?.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-2 py-4 align-middle border-gray-200 border rounded-lg">
                {products?.map((p) => (
                  <ProductListItem
                    product={p}
                    key={p?._id}
                    userId={userId}
                    page
                  />
                ))}
              </div>
            ) : (
              !loading && products?.length === 0 && <div>No products...</div>
            )}

            <Pagination
              className="text-center"
              defaultCurrent={1}
              total={products?.length}
              responsive
              onChange={(page: number, pageSize: number) =>
                setFilter({ ...filter, limit: page })
              }
            />
          </div>
        </div>
      </div>

      {/* Chat Button */}
      {storeId && (
        <div className="fixed right-10 bottom-16">
          {unreadMessage !== 0 && (
            <div className="w-7 h-7 relative top-4 right-3 flex justify-center items-center text-primary bg-white rounded-full m-auto">
              {unreadMessage}
            </div>
          )}
          <div className="flex justify-center items-center shadow-sm bg-blue-700 cursor-pointer text-white p-4 rounded-full">
            <MessageOutlined
              size={30}
              className="text-3xl"
              onClick={() => setModal({ show: true, type: "chat" })}
            />
          </div>
        </div>
      )}

      {modal.type === "filter" && modal.show && (
        <ApModal show={modal.show} onDimiss={() => setModal({ show: false })}>
          <CategorySideBar />
        </ApModal>
      )}

      {modal.type === "chat" && modal.show && (
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
