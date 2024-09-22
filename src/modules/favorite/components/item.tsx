import React from "react";
import { Button, Image } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { IProduct } from "../../product/model";
import { IFavorite } from "../model";
import { useCartState } from "../../cart/context";
import { useRouter } from "next/router";
import Link from "next/link";

interface IProps {
  favorite: IFavorite;
  onRemove: (productId: string) => void;
  userId?: string;
}

export const FavoriteListItem: React.FC<IProps> = ({
  userId,
  favorite,
  onRemove,
}) => {
  const { addToCart, loading } = useCartState();
  const router = useRouter();

  const handleAddToCart = async (values: any) => {
    if (!userId) return router.push("/auth/login");

    const payload = {
      productId: favorite?.product?._id,
      quantity: 1,
      userId,
    };
    const res: any = await addToCart(payload);
    if (res) router.push("/cart");
  };

  return (
    <div className="border rounded-md bg-white ">
      <Link
        href={`/products/${favorite?.product?.slug}`}
        className="  flex lg:flex-col gap-x-4  lg:gap-0 flex-row"
      >
        <div className="w-32 md:w-auto h-full">
          <Image
            src={favorite?.product?.images[0]?.uri}
            alt={favorite?.product?.images[0]?.name}
            className=" lg:max-h-auto max-h-60 object-cover rounded-lg"
          />
        </div>
        <div className=" lg:px-2 flex lg:flex-row  flex-col gap-4 lg:justify-between lg:my-4">
          <div>
            <h2 className="text-lg font-medium">{favorite?.product?.name}</h2>
            <p className="text-primary  font-semibold text-base py-2">
              ${favorite?.product?.price}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between lg:items-end p-2">
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() => onRemove(favorite?._id)}
        >
          Remove
        </Button>
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleAddToCart}
          icon={<PlusOutlined />}
          className="bg-primary text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
