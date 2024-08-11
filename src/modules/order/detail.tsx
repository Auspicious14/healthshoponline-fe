import React, { useState } from "react";
import { IOrder, IOrderStatus } from "./model";
import { Space, Typography, Card, Button } from "antd";
import moment from "moment";
import { helper } from "../../helper";
import { OrderItem } from "./components/item";
import { IStore } from "../store/model";
import { useOrderState } from "./context";
import { ApModal } from "../../components";
import { PaymentPage } from "../payment/page";

const { Text } = Typography;
interface IProps {
  order: IOrder;
}
export const OrderDetailPage: React.FC<IProps> = ({ order }) => {
  const { refund, loading, updateOrderStatus } = useOrderState();
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });

  const stores: IStore[] = order.cart
    ?.map((c) => c.store)
    .reduce((acc, id) => {
      if (!acc.includes(id as never)) {
        acc.push(id as never);
      }
      return acc;
    }, []);

  const subTotal = order?.cart?.map((c) => c.amount);
  const amountByStore = stores.map((s, i) => ({
    id: s._id,
    amount: subTotal[i],
  }));

  const handleRefund = () => {
    refund(order);
  };

  const handleUpdateOrderStatus = () => {
    updateOrderStatus(order?._id, IOrderStatus.confirmed);
  };

  return (
    <div>
      <div className=" lg:m-20 m-8">
        <div className="md:flex w-full gap-10">
          <Card className="w-full md:w-[60%] border rounded-lg shadow-lg">
            <Text className="font-bold text-lg mb-4">Order Details</Text>
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
                <p className="font-medium text-gray-700 w-1/2 md:w-2/3">
                  Delivery Date
                </p>
                <p className="font-bold text-gray-900 w-1/2 md:w-2/3">
                  {`${moment(order?.deliveryDate).format(
                    "DD-MM-YYYY"
                  )} - ${moment(order?.deliveryDate).calendar()}`}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-700 w-1/2 md:w-2/3">
                  Status
                </p>
                <p className="font-bold text-gray-900 uppercase w-1/2 md:w-2/3">
                  {order?.status}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {order?.status == IOrderStatus.confirmed && (
                  <div className="flex justify-end">
                    <Button
                      className="bg-blue-600 text-white border-none"
                      onClick={handleRefund}
                    >
                      Refund
                    </Button>
                  </div>
                )}
                {(order?.status == IOrderStatus.pending ||
                  order?.status == IOrderStatus.new) && (
                  <div className="flex justify-end">
                    <Button
                      className="bg-blue-600 text-white border-none"
                      onClick={handleUpdateOrderStatus}
                    >
                      Confirm Order
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="w-full md:w-[40%] flex-wrap border rounded-lg shadow-lg my-4 md:my-0">
            <Text className="font-bold text-lg mb-4">Shipping Address</Text>

            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                  Name:
                </p>
                <p className="text-gray-900 w-1/2 md:w-2/3">
                  {order?.address?.name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                  Email:
                </p>
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
        <div className="flex justify-between items-center my-8">
          <p className="my-2 font-bold">Pay on Delivery?</p>
          <Button
            className="bg-blue-600 text-white"
            onClick={() => setModal({ show: true, data: order })}
          >
            Instant Payment
          </Button>
        </div>
        <div className="md:flex gap-10">
          {stores?.map((s) => (
            <Card
              key={s._id}
              className="w-full md:w-[40%] flex-wrap border rounded-lg my-4 shadow-lg"
            >
              <Text className="font-bold text-lg mb-4">Store Details</Text>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="font-medium text-gray-700 w-1/2 md:w-1/3">
                    Name:
                  </p>
                  <p className="text-gray-900 w-1/2 md:w-2/3">{s?.storeName}</p>
                </div>
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
                      amountByStore.find((a) => a.id === s._id)
                        ?.amount as number
                    )}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
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
      <ApModal show={modal.show} onDimiss={() => setModal({ show: false })}>
        <PaymentPage
          onDissmiss={() => setModal({ show: false })}
          totalAmount={subTotal.reduce((a: any, b) => a + b, 0)}
          order={order}
        />
      </ApModal>
    </div>
  );
};
