import React, { useEffect, useState } from "react";
import { ApImage } from "../../components";
import { Button, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { IOrder } from "./model";
import { useOrderState } from "./context";
import { getCookie, helper } from "../../helper";
import { ICart } from "../cart/model";
import Link from "next/link";

const { Text } = Typography;

interface IProps {
  userId: string;
}
export const OrderPage: React.FC<IProps> = ({ userId }) => {
  const { orders, getUserOrders, loading } = useOrderState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    getUserOrders(userId);
  }, [userId]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<IOrder> = [
    {
      title: "Image",
      key: "image",
      render: (_, { cart }) => (
        <div className="flex flex-col gap-4">
          {cart?.slice(0, 2)?.map((c) => (
            <ApImage
              key={c._id}
              className="w-12 h-12"
              src={c?.product?.images[0]?.uri}
              alt={c?.product?.images[0]?.uri}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Product Name",
      key: "name",
      render: (_, { cart }) => (
        <Text className="flex flex-col gap-4">
          {cart?.slice(0, 2)?.map((c) => (
            <Text key={c._id}>{c.product?.name}</Text>
          ))}
        </Text>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (_, { cart }) => (
        <div className="flex flex-col gap-4">
          {cart?.slice(0, 2)?.map((c) => (
            <Text key={c._id}>{c.product?.price}</Text>
          ))}
        </div>
      ),
    },
    {
      title: "Qty",
      key: "quantity",
      render: (_, { cart }) => (
        <div className="flex flex-col gap-4">
          {cart?.slice(0, 2)?.map((c) => (
            <Text key={c._id}>{c.quantity}</Text>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Total",
      key: "Total",
      render: (_, { amount }) => (
        <Text className="font-semibold">{helper.toCurrency(amount)}</Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button>
          <Link href={`/orders/${record?._id}`}>View</Link>
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="lg:mx-20 mx-4">
        <h1 className="text-3xl my-8 font-semibold">Orders</h1>
        <div className=" ">
          <div className="overflow-x-scroll md:overflow-auto">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={orders}
              rowKey={(c) => c?._id}
              rootClassName="w-auto"
              loading={loading}
              scroll={{ x: 1000 }} // Ensures horizontal scroll on smaller screens

              // expandable={{
              //   expandedRowRender: (record) => {
              //     if (record?.cart.length > 1) {
              //       return (
              //         <div className="flex flex-col gap-4">
              //           {record?.cart?.map((c) => (
              //             <div key={c?._id} className=" flex gap-20 items-center">
              //               <Text></Text>
              //               <Text>{c?.product?.name}</Text>
              //               <Text>{c?.product?.price}</Text>
              //               <Text>{c?.quantity}</Text>
              //               <Text key={record?._id}>{record.status}</Text>
              //             </div>
              //           ))}
              //         </div>
              //       );
              //     }
              //   },
              //   //   rowExpandable: (record) => {
              //   //     return record?.cart ? record?.cart : [];
              //   //   },
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
