import React, { useEffect, useState } from "react";
import { ApImage, ApModal, Footer } from "../../components";
import Woman from "../../../public/images/Image.png";
import { FilterProduct } from "../product/components/filter";
import { Pagination, Spin, Typography } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { ProductListItem } from "../product/components/item";
import { IProductFilter } from "../product/model";
import { useProductState } from "../product/context";

const { Text } = Typography;

export const CategoryPage = () => {
  const { collections } = useProductState();
  const [filter, setFilter] = useState<IProductFilter>({});

  const [modal, setModal] = useState<{
    show: boolean;
    type?: "chat" | "detail" | "filter";
  }>({ show: false, type: "detail" });

  return (
    <div>
      <div className="relative mt-16 z-50 bg-white">
        <div className="md:mx-20 px-4 md:p-0">
          <div className="fixed top-[64px] left-0 w-full z-[200] bg-white shadow-md"></div>

          <div className="md:flex gap-10 w-full mt-[9rem]">
            <div className="hidden md:block md:w-[30%] mt-4">
              <div className="fixed w-[25%] h-[70%] overflow-auto">
                <FilterProduct setFilter={setFilter} />
              </div>
            </div>

            <div className="md:w-[70%]">
              <div className="flex justify-between items-center my-4">
                <Text code>{`Products: ${collections?.length}`}</Text>
                <MenuFoldOutlined
                  className="md:hidden"
                  onClick={() =>
                    setModal({ show: !modal.show, type: "filter" })
                  }
                />
              </div>

              {collections?.length > 0 ? (
                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-2 py-4 align-middle border-gray-200 border rounded-lg">
                  {collections?.map((p) => (
                    <ProductListItem product={p} key={p?._id} />
                  ))}
                </div>
              ) : (
                collections?.length === 0 && <div>No products...</div>
              )}

              <Pagination
                className="text-center"
                defaultCurrent={1}
                total={collections?.length}
                responsive
                onChange={(page: number, pageSize: number) =>
                  setFilter({ ...filter })
                }
              />
            </div>
          </div>
        </div>

        {/* Product Banner */}
        <ApImage
          src={Woman.src}
          alt="image"
          className="w-full md:h-[500px] m-auto mt-6 sm:object-cover object-contain"
        />

        {/* Footer */}
        <Footer />

        {/* Modal for Mobile Filter */}
        {modal.type === "filter" && modal.show && (
          <ApModal show={modal.show} onDimiss={() => setModal({ show: false })}>
            <FilterProduct setFilter={setFilter} />
          </ApModal>
        )}
      </div>
    </div>
  );
};
