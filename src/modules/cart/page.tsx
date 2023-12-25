import { DeleteFilled } from "@ant-design/icons";
import { Button, Card, Form, Popconfirm, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApImage, ApPlusMinusInput } from "../../components";
import { getCookie, helper } from "../../helper";
import { useCartState } from "./context";
import { ICart } from "./model";

const { Text } = Typography;

export const CartPage = () => {
  const { carts, getCart, deleteCartItem, updateCartItem } = useCartState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [qty, setQty] = useState<number>(1);
  const total = carts?.map((c) => parseFloat(c?.product?.price) * c.quantity);
  const subTotal = carts
    .map((t) => t.amount)
    .reduce((a: any, b: any) => a + b, 0);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    const id = getCookie("user_id");
    getCart(id);
  }, [subTotal]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<ICart> = [
    {
      title: "Image",
      key: "image",
      render: (_, { product }) =>
        !!product?.images?.length && (
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
      render: (_, { _id, quantity, product }) => (
        <Formik
          initialValues={{
            quantity: quantity || "",
          }}
          onSubmit={() => {}}
        >
          {({ values }) => (
            <Form>
              <div>
                <ApPlusMinusInput
                  name="quantity"
                  btnClassName=" h-7 font-bold text-base"
                  inputClassName=" h-8 py-2 px-10 bg-white font-extrabold"
                  onChange={async (val) => {
                    setQty(val);
                    if (val !== quantity) {
                      const res: any = await updateCartItem(
                        { productId: product?._id, quantity: val },
                        _id
                      );
                      if (res) toast.success("Quantity updated");
                    }
                  }}
                  disable={qty == product?.quantity ? true : false}
                />
              </div>
            </Form>
          )}
        </Formik>
      ),
    },
    {
      title: "Total",
      key: "Total",
      render: (_, { _id, amount }) => (
        <Text className="font-semibold">{amount}</Text>
      ),
    },

    {
      title: "",
      key: "action",
      render: (_, { _id }) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => deleteCartItem(_id)}
          okButtonProps={{
            style: { background: "rgb(37 99 235)" },
          }}
        >
          <DeleteFilled rev={undefined} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div className="lg:mx-20 mx-4">
        <h1 className="text-3xl my-8 font-semibold">Cart</h1>
        <div className="lg:flex  lg:justify-between gap-4 ">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={carts.length > 0 ? carts : []}
            rowKey={(c) => c?._id}
            className="lg:w-[60%] min-w-full"
            rootClassName="w-auto"
          />
          <Card
            title={"ORDER SUMMARY"}
            type="inner"
            className="lg:w-[40%] w-full"
          >
            <div className="w-full pb-8 border-b ">
              <div className="flex justify-between items-center pb-4">
                <Text className="text-gray-400">Subtotal</Text>
                <Text className="font-semibold">
                  {helper.toCurrency(subTotal)}
                </Text>
              </div>
              <div className="flex justify-between items-center ">
                <Text className="text-gray-400">Free Delivery</Text>
                <Text className="font-semibold">{helper.toCurrency(0)}</Text>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center py-4">
                <Text className="text-gray-300">Total</Text>
                <Text className="font-semibold">
                  {helper.toCurrency(subTotal)}
                </Text>
              </div>
              <Button className="w-full" type="primary" href={"/checkout"}>
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
