import React from "react";
import { Space, Table, Typography } from "antd";
import { ICart } from "../../cart/model";
import { ApImage } from "../../../components";
import { helper } from "../../../helper";
import { ColumnsType } from "antd/es/table";

const { Text } = Typography;
interface IProps {
  items: ICart[];
}
export const OrderItem: React.FC<IProps> = ({ items }) => {
  const columns: ColumnsType<ICart> = [
    {
      title: "Image",
      key: "image",
      render: (_, { product }) => (
        <ApImage
          className="w-12 h-12"
          src={product?.images[0]?.uri}
          alt={product?.images[0]?.uri}
        />
      ),
    },

    {
      title: "Product Name",
      key: "name",
      render: (_, { product }) => <Text>{product?.name}</Text>,
    },

    {
      title: "Price",
      key: "price",
      render: (_, { product }) => <Text>{product?.price}</Text>,
    },
    {
      title: "Qty",
      key: "quantity",
      render: (_, { quantity }) => (
        <div className="flex flex-col gap-4">
          <Text>{quantity}</Text>
        </div>
      ),
    },

    {
      title: "Total",
      key: "Total",
      render: (_, { amount }) => (
        <Text className="font-semibold">
          {helper.toCurrency(amount as number)}
        </Text>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={items}
        rowKey={(c) => c?._id}
        className="lg:w-[60%] min-w-full"
        rootClassName="w-auto"
      />
    </>
  );
};

// <Space className="flex justify-between border-b py-4">
//       <Space className="flex gap-4 items-center">
//         <ApImage
//           src={item?.product?.images[0]?.uri}
//           alt={item?.product?.images[0]?.uri}
//         />
//         <Space>
//           <Text>{item?.product?.name}</Text>
//           <Text>{item?.quantity}</Text>
//         </Space>
//       </Space>
//       <Text>
//         {helper?.toCurrency(parseFloat(item?.product?.price) * item?.quantity)}
//       </Text>
//     </Space>
