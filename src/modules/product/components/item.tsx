import Link from "next/link";
import React from "react";
import { IProduct, IReview } from "../model";
import { Button, Space, Typography } from "antd";
import { ApImage, ApRatingStar } from "../../../components";
import { getCookie, helper } from "../../../helper";
import { StarFilled } from "@ant-design/icons";
import { useCartState } from "../../cart/context";
import { useRouter } from "next/router";

const { Text } = Typography;
interface IProps {
  product: IProduct;
  userId?: string | null;
}
export const ProductListItem: React.FC<IProps> = ({ product, userId }) => {
  const { addToCart, loading } = useCartState();
  const router = useRouter();
  const handleAddToCart = async (values: any) => {
    if (!userId) return router.push("/auth/login");

    const payload = {
      productId: product?._id,
      quantity: 1,
      userId,
    };
    const res: any = await addToCart(payload);
    if (res) router.push("/cart");
  };
  return (
    <div className="bg-white md:w-auto w-full shadow-md md:mx-8 rounded-md">
      <div>
        <Link href={`/products/${product?._id}`} className="">
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
              <h3 className=" text-gray-700 font-bold">
                {product?.name?.length > 15
                  ? `${product?.name?.substring(0, 15)}...`
                  : product?.name}
              </h3>

              <p className=" font-bold text-gray-900">
                {helper.toCurrency(parseFloat(product?.price))}
              </p>
            </div>
          </div>
        </Link>
        <Button
          size="large"
          loading={loading}
          disabled={loading}
          onClick={handleAddToCart}
          className="text-white font-bold w-full my-4 text-center bg-[#1D2939] rounded-md"
        >
          + Add to Cart
        </Button>
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
      <div className="lg:flex lg:gap-72 my-6">
        {review?.user ? (
          <div>
            <Space className="hidden lg:block">
              <h1>{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
              <p className="text-justify font-bold py-2">
                {review?.createdAt?.substring(0, 10)}
              </p>
            </Space>
            <Space className="flex gap-3 items-center lg:hidden">
              <ApRatingStar value={review?.rating} />
              <p className="text-justify font-bold py-2 text-sm">
                {review?.createdAt?.substring(0, 10)}
              </p>
            </Space>
          </div>
        ) : (
          <div></div>
        )}
        <Space className="block">
          <ApRatingStar value={review?.rating} className="hidden lg:block" />

          <Text className="font-bold">{review?.title}</Text>
          <p className="text-justify lg:my-2">{review?.description}</p>
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
            rev={undefined}
          />
        )}
      </Space>
      <Space>
        <Text>{review?.rating}</Text>
      </Space>
    </Space>
  );
};
