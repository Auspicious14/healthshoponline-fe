import Link from "next/link";
import React from "react";
import { IProduct, IReview } from "../model";
import { Space, Typography } from "antd";

const { Text } = Typography;
interface IProps {
  product: IProduct;
}
export const ProductListItem: React.FC<IProps> = ({ product }) => {
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 sm:px-6 sm:py-12 lg:max-w-7xl">
          <Link href={`/product/${product?._id}`} className="">
            <div className="group relative">
              <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                <img
                  key={product?.images[0]?._id}
                  src={product?.images[0]?.uri}
                  alt={product?.images[0]?.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 ">
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface IReviewProps {
  review: IReview;
}

export const ReviewListItem: React.FC<IReviewProps> = ({ review }) => {
  return (
    <>
      <div className="flex gap-72 my-6">
        <Space>
          <h1>{"Name"}</h1>
        </Space>
        <Space className="block">
          <Text className="text-justify">{review?.rating}</Text>
          <Text className="font-bold">{review?.title}</Text>
          <Text className="text-justify">{review?.description}</Text>
        </Space>
      </div>
    </>
  );
};
