import React, { useEffect, useState } from "react";
import { ApImage } from "../../components";
import { Button, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { IOrder } from "./model";
import { useOrderState } from "./context";
import { getCookie, helper } from "../../helper";
import { ICart } from "../cart/model";

const { Text } = Typography;

export const OrderPage = () => {
  const { orders, getUserOrders, loading } = useOrderState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    const id = getCookie("user_id");
    getUserOrders(id);
  }, []);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<IOrder> = [
    {
      title: "Image",
      key: "image",
      render: (_, { cart }) => (
        <ApImage
          className="w-12 h-12"
          src={cart[0]?.product?.product?.images[0]?.uri}
          alt={cart[0]?.product?.product?.images[0]?.uri}
        />
      ),
    },

    {
      title: "Product Name",
      key: "name",
      render: (_, { cart }) => <Text>{cart[0]?.product?.product?.name}</Text>,
    },

    {
      title: "Price",
      key: "price",
      render: (_, { cart }) => <Text>{cart[0]?.product?.product?.price}</Text>,
    },
    {
      title: "Qty",
      key: "quantity",
      render: (_, { cart }) => <Text>{cart[0]?.product?.quantity}</Text>,
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
        <Button href={`/orders/${record?._id}`} htmlType={"button"}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="lg:mx-20 mx-4">
        <h1 className="text-3xl my-8 font-semibold">Orders</h1>
        <div className="lg:flex  lg:justify-between gap-4 ">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={orders}
            rowKey={(c) => c?._id}
            className="lg:w-[60%] min-w-full"
            rootClassName="w-auto"
            loading={loading}
            // expandable={{
            //   expandedRowRender: (record) => {
            //     return record?.cart?.map((c) => (
            //       <Text key={c?._id}>{c?.product?.product?.name}</Text>
            //     ));
            //   },
            //   //   rowExpandable: (record) => {
            //   //     return record?.cart ? record?.cart : [];
            //   //   },
            // }}
          />
        </div>
      </div>
    </div>
  );
};
