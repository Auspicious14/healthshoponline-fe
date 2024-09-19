import {
  DeleteFilled,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Image,
  InputNumber,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApImage, ApPlusMinusInput } from "../../components";
import { getCookie, helper } from "../../helper";
import { useCartState } from "./context";
import { ICart } from "./model";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { IProduct } from "../product/model";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const { Text } = Typography;
interface IProps {
  userId: string;
}

export const CartPage: React.FC<IProps> = ({ userId }) => {
  const router = useRouter();
  const { carts, getCart, deleteCartItem, updateCartItem } = useCartState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [qty, setQty] = useState<number>(1);

  const total = carts?.map((c) => parseFloat(c?.product?.price) * c.quantity);
  const subTotal = carts
    ?.map((t) => t.amount)
    ?.reduce((a: any, b: any) => a + b, 0);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    getCart(userId);
  }, [subTotal, userId]);

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
          initialValues={{ quantity: quantity || "" }}
          onSubmit={() => {}}
        >
          {({ values }) => (
            <Form>
              <div>
                <ApPlusMinusInput
                  name="quantity"
                  btnClassName="h-7 font-bold text-base"
                  inputClassName="h-8 py-2 px-10 bg-white font-extrabold"
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
      fixed: "right",
      width: 100,
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

  const handleQuantityChange = async (val: number, cartItem: ICart) => {
    setQty(val);
    if (val !== qty) {
      const res: any = await updateCartItem(
        { productId: cartItem?.product?._id, quantity: val },
        cartItem?._id
      );
      if (res) toast.success("Quantity updated");
    }
  };
  return (
    <div>
      <div className="lg:mx-20">
        <h1 className="text-3xl my-8 font-semibold">Cart</h1>
        <div className="lg:flex lg:justify-between gap-4">
          <div className="sm:overflow-x-scroll md:overflow-auto md:block hidden">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={carts?.length > 0 ? carts : []}
              rowKey={(c) => c?._id}
              rootClassName="lg:w-full"
              tableLayout="fixed"
              scroll={{ x: 1000 }}
            />
          </div>
          <div className="md:hidden">
            <h2>Cart ({carts?.length})</h2>
            {carts?.length > 0 ? (
              carts?.map((cartItem) => (
                <Card key={cartItem._id} className="mb-4">
                  <div className="flex gap-4">
                    <Image
                      width={80}
                      height={80}
                      src={cartItem?.product?.images[0]?.uri}
                      alt={cartItem?.product?.name}
                      preview={true}
                    />
                    <div className="flex gap-4 justify-between">
                      <p>{cartItem.product?.name}</p>
                      <span className="text-lg font-semibold text-primary">
                        N{cartItem.product?.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <ApPlusMinusChange
                      currentQty={qty}
                      onQuantityChange={(val) =>
                        handleQuantityChange(val, cartItem)
                      }
                    />

                    <Button
                      icon={<DeleteOutlined />}
                      className=" text-red-500"
                      onClick={() => deleteCartItem(cartItem._id)}
                    />
                  </div>
                </Card>
              ))
            ) : (
              <div className="mx-auto my-8 w-full flex flex-col justify-center text-center">
                <div className="w-28 h-28 bg-white rounded-full flex justify-center mx-auto items-center ">
                  <ShoppingCartIcon className="text-primary w-auto h-auto object-cover" />
                </div>
                <p className="my-8">No product added yet</p>
                <Link href={`/products`}>
                  <p className=" border border-primary rounded-lg p-4 text-center text-primary ">
                    Continue Shopping
                  </p>
                </Link>
              </div>
            )}
          </div>
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

const ApPlusMinusChange = ({
  currentQty,
  onQuantityChange,
}: {
  currentQty: number;
  onQuantityChange: (qty: number) => void;
}) => {
  const handleIncrease = () => {
    const newQty = currentQty + 1;
    onQuantityChange(newQty);
  };

  const handleDecrease = () => {
    if (currentQty > 1) {
      const newQty = currentQty - 1;
      onQuantityChange(newQty);
    }
  };
  return (
    <div className="flex items-center">
      <Button
        icon={<MinusOutlined />}
        disabled={currentQty <= 1}
        onClick={handleDecrease}
        className="flex justify-center items-center w-8 h-8"
      />
      <div className="mx-2 text-base font-semibold">{currentQty}</div>
      <Button
        icon={<PlusOutlined />}
        onClick={handleIncrease}
        className="flex justify-center items-center w-8 h-8"
      />
    </div>
  );
};
