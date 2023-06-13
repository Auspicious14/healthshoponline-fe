import Link from "next/link";
import React from "react";
import { IProduct, IReview } from "../model";
import { Button, Space, Typography } from "antd";
import { ApImage, ApRatingStar } from "../../../components";
import { getCookie, helper } from "../../../helper";
import { StarFilled } from "@ant-design/icons";
import { useCartState } from "../../cart/context";

const { Text } = Typography;
interface IProps {
  product: IProduct;
}
export const ProductListItem: React.FC<IProps> = ({ product }) => {
  const { addToCart, loading } = useCartState();
  const handleAddToCart = async (values: any) => {
    const userId = getCookie("user_id");
    const res: any = await addToCart({
      product: {
        quantity: 1,
        id: product._id,
      },
      userId,
    });
    // if (res) router.push("/cart");
  };
  return (
    <div className="bg-white w-auto shadow-md mx-8 rounded-md">
      <div>
        <Link href={`/product/${product?._id}`} className="">
          <div className="group relative">
            <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
              <ApImage
                key={product?.images[0]?._id}
                src={product?.images[0]?.uri}
                alt={product?.images[0]?.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                unoptimized
              />
            </div>
            <div className="mt-4 mx-4">
              <h3 className=" text-gray-700 font-bold">{product.name}</h3>
              <h3 className="text-sm text-gray-700 my-2">
                {product.description.substring(0, 15)}
              </h3>
              <p className=" font-bold text-gray-900">
                {helper.toCurrency(parseFloat(product.price))}
              </p>
              <Button
                size="large"
                onClick={handleAddToCart}
                className="text-white font-bold w-full my-4 text-center bg-[#1D2939] rounded-md"
              >
                + Add to Cart
              </Button>
            </div>
          </div>
        </Link>
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
        {review?.user ? (
          <Space>
            <h1>{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
          </Space>
        ) : (
          <div></div>
        )}
        <Space className="block">
          <ApRatingStar value={review?.rating} />

          <Text className="font-bold">{review?.title}</Text>
          <p className="text-justify my-2">{review?.description}</p>
          <p className="text-justify font-bold">
            {review?.createdAt.substring(0, 10)}
          </p>
        </Space>
      </div>
    </>
  );
};

interface IRateProps {
  review: IReview;
}

export const RateStreakListItem: React.FC<IRateProps> = ({ review }) => {
  return (
    <Space className="flex gap-4 items-center w-20">
      <Space className="">
        {review?.rating > 0 && (
          <StarFilled
            value={review?.rating}
            className={
              review?.rating >= 1 ? "text-orange-500" : "text-gray-200"
            }
          />
        )}
      </Space>
      <Space>
        <Text>{review?.rating}</Text>
      </Space>
    </Space>
  );
};
