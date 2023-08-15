import React from "react";
import { ICart } from "../model";
import { Space, Typography } from "antd";
import { helper } from "../../../helper";
import { ApImage } from "../../../components";
const { Text, Paragraph } = Typography;
interface IProps {
  cart: ICart;
}
export const CheckoutListItem: React.FC<IProps> = ({ cart }) => {
  const price = cart?.product?.product?.price;
  console.log(price);
  return (
    <Space className="flex justify-between items-center border-b py-4">
      <Space className="flex gap-4 items-center">
        <Space className="w-20 h-20">
          <ApImage
            src={cart?.product?.product?.images[0]?.uri}
            alt={cart?.product?.product?.images[0]?.name}
            className="w-full h-full object-contain"
          />
        </Space>
        <div>
          <Text className="capitalize font-semibold">
            {cart?.product?.product?.name}
          </Text>
          <Paragraph className="text-gray-600">
            {cart?.product?.quantity}
          </Paragraph>
        </div>
      </Space>
      <Space>
        <Text className="text-gray-400">
          {helper.toCurrency(parseFloat(cart?.product?.product?.price))}
        </Text>
      </Space>
    </Space>
  );
};
