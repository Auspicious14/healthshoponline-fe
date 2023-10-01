import React from "react";
import { Space, Typography } from "antd";
import { ICart } from "../../cart/model";
import { ApImage } from "../../../components";
import { helper } from "../../../helper";

const { Text } = Typography;
interface IProps {
  item: ICart;
}
export const OrderItem: React.FC<IProps> = ({ item }) => {
  return (
    <Space className="flex justify-between border-b py-4">
      <Space className="flex gap-4 items-center">
        <ApImage
          src={item?.product?.product?.images[0]?.uri}
          alt={item?.product?.product?.images[0]?.uri}
        />
        <Space>
          <Text>{item?.product?.product?.name}</Text>
          <Text>{item?.product?.quantity}</Text>
        </Space>
      </Space>
      <Text>
        {helper?.toCurrency(
          parseFloat(item?.product?.product?.price) * item?.product?.quantity
        )}
      </Text>
    </Space>
  );
};
