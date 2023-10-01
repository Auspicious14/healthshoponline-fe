import React, { useEffect, useState } from "react";
import { ApImage } from "../../components";
import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { IOrder } from "./model";
import { useOrderState } from "./context";
import { getCookie, helper } from "../../helper";

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
          src={cart?.product?.product?.images[0]?.uri}
          alt={cart?.product?.product?.images[0]?.uri}
        />
      ),
    },

    {
      title: "Product Name",
      key: "name",
      render: (_, { cart }) => <Text>{cart?.product?.product?.name}</Text>,
    },

    {
      title: "Price",
      key: "price",
      render: (_, { cart }) => <Text>{cart?.product?.product?.price}</Text>,
    },
    {
      title: "Qty",
      key: "quantity",
      render: (_, { cart }) => <Text>{cart?.product?.quantity}</Text>,
    },
    {
      title: "Total",
      key: "Total",
      render: (_, { amount }) => (
        <Text className="font-semibold">{helper.toCurrency(amount)}</Text>
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
            dataSource={orders?.length > 0 ? orders : []}
            rowKey={(c) => c?.id}
            className="lg:w-[60%] min-w-full"
            rootClassName="w-auto"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
