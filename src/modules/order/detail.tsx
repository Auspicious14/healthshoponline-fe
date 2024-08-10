import React from "react";
import { IOrder } from "./model";
import { Space, Typography, Card } from "antd";
import moment from "moment";
import { helper } from "../../helper";
import { OrderItem } from "./components/item";
import { IStore } from "../store/model";

const { Text } = Typography;
interface IProps {
  order: IOrder;
}
export const OrderDetailPage: React.FC<IProps> = ({ order }) => {
  const stores: IStore[] = order.cart
    ?.map((c) => c.store)
    .reduce((acc, id) => {
      if (!acc.includes(id as never)) {
        acc.push(id as never);
      }
      return acc;
    }, []);

  const amount = order?.cart?.map((c) => c.amount);
  const amountByStore = stores.map((s, i) => ({
    id: s._id,
    amount: amount[i],
  }));

  return (
    <div className=" lg:m-20 m-8">
      <div className="md:flex w-full gap-10">
        <Card className="w-full md:w-[60%] border rounded-lg shadow-lg p-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2">Order ID</p>
              <p className="font-bold text-gray-900 w-1/2">{`#${order?._id}`}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-2/3">
                Transaction Date
              </p>
              <p className="font-bold text-gray-900 w-1/2 md:w-2/3">
                {moment(order?.createdAt).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 md:w-2/3">Status</p>
              <p className="font-bold text-gray-900 uppercase w-1/2">
                {order?.status}
              </p>
            </div>
          </div>
        </Card>

        <Card className="w-full md:w-[40%] flex-wrap border rounded-lg my-4 shadow-lg">
          <Text className="font-bold text-lg mb-4">Shipping Address</Text>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">Name:</p>
              <p className="text-gray-900 w-1/2 md:w-2/3">
                {order?.address?.name}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">Email:</p>
              <div className="whitespace-nowrap">
                <p className="font-bold text-gray-900 w-1/2 md:w-2/3">
                  {order?.address?.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Phone Number:
              </p>
              <p className="text-gray-900 w-1/2 md:w-2/3">
                {order?.address?.phoneNumber}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Address:
              </p>
              <address className="text-gray-900 w-1/2 md:w-2/3">
                {order?.address?.address}
              </address>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Postal Code:
              </p>
              <p className="text-gray-900 w-1/2 md:w-2/3">
                {order?.address?.postalCode}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <p>Pay on Delivery? Get store information</p>
      {stores?.map((s) => (
        <Card className="w-full md:w-[40%] flex-wrap border rounded-lg my-4 shadow-lg">
          <Text className="font-bold text-lg mb-4">Store Details</Text>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">Name:</p>
              <p className="text-gray-900 w-1/2 md:w-2/3">{s?.storeName}</p>
            </div>
            {/* <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">Email:</p>
              <div className="whitespace-nowrap"></div>
              <p className="font-bold text-gray-900 w-1/2 md:w-2/3">
                {s?.email}
              </p>
            </div> */}
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Phone Number:
              </p>
              <p className="text-gray-900 w-1/2 md:w-2/3">
                {s.storePhoneNumber || s?.phoneNumber}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Address:
              </p>
              <address className="text-gray-900 w-1/2 md:w-2/3">
                {s?.storeAddress}
              </address>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Bank Name:
              </p>
              <address className="text-gray-900 w-1/2 md:w-2/3">
                {s?.bankName}
              </address>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Bank Account Number:
              </p>
              <address className="text-gray-900 w-1/2 md:w-2/3">
                {s?.bankAccountNumber}
              </address>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Bank Account Name:
              </p>
              <address className="text-gray-900 w-1/2 md:w-2/3">
                {s?.bankAccountName}
              </address>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                Amount to pay:
              </p>
              {/* {amountByStore.find()} */}
              <p className="text-gray-900 w-1/2 md:w-2/3">
                {helper.toCurrency(
                  amountByStore.find((a) => a.id === s._id)?.amount as number
                )}
              </p>
            </div>
          </div>
        </Card>
      ))}
      <Card className="my-4">
        <Text className="text-lg font-bold">Order Items</Text>
        <OrderItem items={order?.cart} />
      </Card>

      <Space className="flex justify-end items-center py-2">
        <Card className="block">
          <div className="flex justify-between gap-10 items-center my-4">
            <Text>SubTotal</Text>
            <Text className="font-bold">
              {helper?.toCurrency(order?.amount)}
            </Text>
          </div>
          <div className="flex justify-between gap-10 items-center my-4">
            <Text>Tax</Text>
            <Text className="font-bold">{helper?.toCurrency(0)}</Text>
          </div>
          <div className="flex justify-between items-center gap-10">
            <Text>Total</Text>
            <Text className="font-bold text-lg">
              {helper?.toCurrency(order?.amount)}
            </Text>
          </div>
        </Card>
      </Space>
    </div>
  );
};
