import React, { useEffect, useState } from "react";
import { ApImage, ApModal, Footer } from "../../components";
import Woman from "../../../public/images/Image.png";
import { FilterProduct } from "../product/components/filter";
import { Pagination, Spin, Typography } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { ProductListItem } from "../product/components/item";
import { IProductFilter } from "../product/model";
import { useProductState } from "../product/context";
import { ICategory } from "./model";
import { Breadcrumb } from "../../components/breadcomb";

const { Text } = Typography;

interface IProps {
  category: ICategory;
}
export const CategoryPage: React.FC<IProps> = ({ category }) => {
  const { collections } = useProductState();
  const [filter, setFilter] = useState<IProductFilter>({});

  const [modal, setModal] = useState<{
    show: boolean;
    type?: "chat" | "detail" | "filter";
  }>({ show: false, type: "detail" });

  return (
    <div>
      <div className="w-[90%] m-auto relative mt-16 z-50 mb-4">
        <Breadcrumb label="Category" category={category} />
        <div className="bg-white">
          {!!category?.images && category?.images?.length > 0 ? (
            <div className="relative  m-auto flex justify-center items-center">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <ApImage
                src={category?.images[0].uri}
                alt={category?.images[0].name}
                className="w-full md:h-[300px] object-cover object-center"
              />
              <div></div>
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-4xl text-2xl font-semibold text-white">
                {category?.name}
              </h1>
            </div>
          ) : (
            <div className="w-full md:h-[300px] bg-primary flex justify-center items-center">
              <h1 className="text-4xl font-semibold">{category?.name}</h1>
            </div>
          )}

          <div className="md:mx-20 px-4 md:p-0">
            <div className="fixed top-[64px] left-0 w-full z-[200] shadow-md"></div>

            <div className=" w-full">
              <div className="">
                <div className="flex justify-between items-center my-4">
                  <Text code>{`Products: ${collections?.length}`}</Text>
                </div>

                {collections?.length > 0 ? (
                  <div className="grid md:grid-cols-6 grid-cols-2 gap-4 my-2 py-4 align-middle border-gray-200 border rounded-lg">
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
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};