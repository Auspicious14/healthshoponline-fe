import React from "react";
import Link from "next/link";
import { Progress } from "antd"; // Assuming you're using Ant Design for the progress bar
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
    <div className="bg-white md:w-auto w-full shadow-md rounded-md transition-transform hover:shadow-lg hover:scale-105 flex flex-col justify-between h-full">
      <div>
        <Link href={`/products/${product?._id}`} className="">
          <div className="group relative">
            <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
              <ApImage
                key={product?.images[0]?._id}
                src={product?.images[0]?.uri}
                alt={product?.images[0]?.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 mx-4">
              <h3 className="text-gray text-sm line-clamp-2 max-h-12 overflow-hidden">
                {product?.name}
              </h3>
              <ApRatingStar
                value={product?.rating as number}
                className="my-2"
              />

              <p className="font-bold text-gray-900">
                {helper.toCurrency(parseFloat(product?.price))}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <Button
          size="large"
          loading={loading}
          disabled={loading}
          onClick={handleAddToCart}
          className="text-white font-bold w-full text-center bg-[#1D2939] rounded-md"
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
          <div></div>

          <Text className="font-bold">{review?.title}</Text>
          <p className="text-justify lg:my-2">{review?.description}</p>
        </Space>
      </div>
    </>
  );
};

interface IRateProps {
  review?: IReview;
  rating: number;
  totalRatings: number;
  count: number;
}

export const RateStreakListItem: React.FC<IRateProps> = ({
  rating,
  review,
  count,
  totalRatings,
}) => {
  const percentage = (count / 100) * 100;
  console.log(percentage, "percent");
  return (
    <div className="flex items-center gap-2 w-full">
      {/* Star Rating */}
      <div className="flex gap-4 items-center w-[15%]">
        <StarFilled className="text-yellow-500" />
      </div>
      <div className="">{rating}</div>

      <div className="w-[100%]">
        <Progress percent={percentage} showInfo={false} strokeColor="#007bff" />
      </div>

      <div className="w-[10%] text-right">
        <span>{count}</span>
      </div>
    </div>
  );
};
