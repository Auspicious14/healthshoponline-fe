import React from "react";
import { IOrder } from "./model";
import { Space, Typography } from "antd";
import moment from "moment";
import { helper } from "../../helper";
import { OrderItem } from "./components/item";

const { Text } = Typography;
interface IProps {
  order: IOrder;
}
export const OrderDetailPage: React.FC<IProps> = ({ order }) => {
  return (
    <div className="flex justify-center items-center border rounded-md">
      <Space className="flex justify-between items-center border-b">
        <Text>Order ID</Text>
        <Text className="font-bold">{order?.id}</Text>
      </Space>
      <Space className="flex justify-between items-center border-b">
        <Text>Transaction Date</Text>
        <Text className="font-bold">
          {moment(order?.createdAt).format("DD-MM-YYYY")}
        </Text>
      </Space>
      <Space className="flex justify-between items-center border-b">
        <Text>Address</Text>
        <Text>{order?.address?.address}</Text>
      </Space>
      <Text>Your Order</Text>
      {order?.cart?.map((c) => (
        <OrderItem item={c} key={c?._id} />
      ))}
      <Space>
        <Space className="flex justify-between items-center border-b py-2">
          <Text>SubTotal</Text>
          <Text className="font-bold">{helper?.toCurrency(order?.amount)}</Text>
        </Space>
        <Space className="flex justify-between items-center">
          <Text>Total</Text>
          <Text className="font-bold text-lg">
            {helper?.toCurrency(order?.amount)}
          </Text>
        </Space>
      </Space>
    </div>
  );
};
