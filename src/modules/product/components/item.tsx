import React, { useState } from "react";
import Link from "next/link";
import { Progress } from "antd"; // Assuming you're using Ant Design for the progress bar
import { IProduct, IReview } from "../model";
import { Button, Space, Typography } from "antd";
import { ApImage, ApRatingStar } from "../../../components";
import { getCookie, helper } from "../../../helper";
import {
  HeartFilled,
  HeartOutlined,
  HeartTwoTone,
  StarFilled,
} from "@ant-design/icons";
import { useCartState } from "../../cart/context";
import { useRouter } from "next/router";
import { IFavorite, IFavoriteQuery } from "../../favorite/model";
import { useFavoriteState } from "../../favorite/context";

const { Text } = Typography;
interface IProps {
  page?: boolean;
  product: IProduct;
  userId?: string | null;
}
export const ProductListItem: React.FC<IProps> = ({
  product,
  userId,
  page,
}) => {
  const { addToCart, loading } = useCartState();
  const { saveFavorite, product: favProduct } = useFavoriteState();
  const router = useRouter();
  const [addedToFavorite, setAddedToFavorite] = useState<boolean>(
    product?.addedToFavorite || (favProduct?.addedToFavorite as boolean)
  );

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

  const handleUpdateFavorite = (payload: IFavoriteQuery) => {
    setAddedToFavorite(payload.addToFavorite);
    saveFavorite(payload);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl transition-all hover:shadow-lg group overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product?.slug}`} className="block">
          <div className="aspect-square bg-gray-100 relative overflow-hidden">
            <ApImage
              src={product?.images[0]?.uri}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              alt={product?.images[0]?.name}
            />
          </div>
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() => handleUpdateFavorite({
            addToFavorite: !addedToFavorite,
            productId: product?._id,
          })}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white transition-colors"
          aria-label={addedToFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {addedToFavorite ? (
            <HeartFilled className="text-lg text-red-500" />
          ) : (
            <HeartOutlined className="text-lg text-gray-600 hover:text-red-400" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <ApRatingStar 
          value={product?.rating as number} 
          className="text-sm text-amber-500"
        />
        
        <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight text-base">
          {product?.name}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">
            {helper.toCurrency(parseFloat(product?.price))}
          </p>
          
          {/* Add to Cart Button */}
          {page && (
            <Button
              shape="round"
              size="middle"
              loading={loading}
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary-hover text-white font-medium border-none"
            >
              Add to Cart
            </Button>
          )}
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
      <div className="lg:flex lg:gap-12 my-6">
        <div>
          <Space className="hidden lg:block">
            {review?.user && (
              <h1>{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
            )}
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

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex gap-4 items-center w-[15%]">
        <StarFilled className="text-orange-500" />
        <div className="">{rating}</div>
      </div>

      <div className="w-[100%]">
        <Progress
          percent={percentage}
          showInfo={true}
          className="block w-full"
          strokeColor="#007bff"
        />
      </div>

      {/* <div className="w-[10%] text-right">
        <span>{count}</span>
      </div> */}
    </div>
  );
};
