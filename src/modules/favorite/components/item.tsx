import React from "react";
import { Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IProduct } from "../../product/model";
import { IFavorite } from "../model";

interface IProps {
  favorite: IFavorite;
  onRemove: (productId: string) => void;
}

export const FavoriteListItem: React.FC<IProps> = ({ favorite, onRemove }) => {
  return (
    <div className="p-4 border rounded-md flex flex-col items-center">
      <Image
        className="w-full max-h-60 object-cover mb-4"
        src={favorite?.product?.images[0]?.uri}
        alt={favorite?.product?.images[0]?.name}
      />
      <h2 className="text-lg font-medium">{favorite?.product?.name}</h2>
      <p className="text-green-500 font-semibold">
        ${favorite?.product?.price}
      </p>
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        onClick={() => onRemove(favorite?._id)}
        className="mt-2"
      >
        Remove
      </Button>
    </div>
  );
};
