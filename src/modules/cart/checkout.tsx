import React, { useEffect, useState } from "react";
import {
  ApModal,
  ApPlusMinusInput,
  ApTextInput,
  Headernav,
} from "../../components";
import { Button, Card, Space, Typography } from "antd";
import { useCartState } from "./context";
import { getCookie, helper } from "../../helper";
import { Form, Formik, FormikProps } from "formik";
import { useOrderState } from "../order/context";
import { CheckoutListItem } from "./components/checkoutitems";
import { useRouter } from "next/router";
import { PaymentPage } from "../payment/page";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { number } from "yup";
import { IOrder } from "../order/model";
const { Text } = Typography;

interface IProps {
  userId: string;
}
export const CheckoutPage: React.FC<IProps> = ({ userId }) => {
  const { orders, createOrder, loading } = useOrderState();
  const { carts, getCart, emptyCart } = useCartState();
  const [order, setOrder] = useState<IOrder>();
  const router = useRouter();
  const subTotal: number = carts
    ?.map((c) => c?.amount)
    ?.reduce((a, b: any) => a + b, 0) as number;
  // const total = carts?.map(
  //   (c) => parseFloat(c?.product?.product?.price) * c.product.quantity
  // );
  // const overallTotal = total.map((t) => t).reduce((a, b) => a + b, 0);
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });

  useEffect(() => {
    getCart(userId);
  }, [userId]);

  const handleSubmit = async (values: any, actions: any) => {
    let { amount, ...otherValues } = values;
    amount = subTotal;
    // const id = getCookie("user_id");
    const res: any = await createOrder({ userId, amount, ...otherValues });
    console.log(res);
    if (res?.data) {
      setOrder(res.data);
      const response = await emptyCart(userId);
      // router.push("/payment");
      actions.resetForm({
        values: {
          address: {
            name: "",
            address: "",
            postalCode: "",
            city: "",
            email: "",
            phoneNumber: "",
          },
          amount: "",
        },
      });
      // setModal({ show: true });
      router.push("/orders");
    }
  };

  return (
    <div>
      <Headernav />
      <div className="lg:hidden">
        <ArrowLeftCircleIcon
          className="w-8 h-8"
          onClick={() => router.back()}
        />
      </div>
      <div className="lg:mx-20 mx-4">
        <h1 className="text-3xl my-8 font-semibold">Checkout</h1>
        <div className="lg:flex lg:justify-between w-full gap-4">
          <Card className="lg:w-[60%] w-full">
            <Formik
              initialValues={{
                address: {
                  name: "",
                  address: "",
                  postalCode: "",
                  city: "",
                  email: "",
                  phoneNumber: "",
                },
                amount: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className=" Form card px-4 ">
                  <ApTextInput
                    className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    label="Full name"
                    name={"address.name"}
                    type="text"
                    placeHolder="name"
                    containerClass="flex-col"
                  />
                  <Space className="flex justify-between items-center gap-4 w-full">
                    <ApTextInput
                      className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      label="Phone Number"
                      name={"address.phoneNumber"}
                      type="tel"
                      placeHolder="+234"
                      containerClass="flex-col"
                    />
                    <ApTextInput
                      className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      label="Email"
                      name={"address.email"}
                      type="email"
                      placeHolder="johndoe@shop.com"
                      containerClass="flex-col"
                    />
                  </Space>
                  <ApTextInput
                    className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    label="Delivery Address"
                    name={"address.address"}
                    type="text"
                    placeHolder="address"
                    containerClass="flex-col"
                  />
                  <Space className="flex justify-between w-full gap-4 items-center ">
                    <ApTextInput
                      className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      label="City"
                      name={"address.city"}
                      type="text"
                      placeHolder="Ilorin"
                      containerClass="flex-col"
                    />
                    <ApTextInput
                      className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      label="Postal Code"
                      name={"address.postalCode"}
                      type="text"
                      placeHolder="Ilorin"
                      containerClass="flex-col"
                    />
                  </Space>

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    Place Order
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
          <Card title={"ORDER SUMMARY"} type="inner" className="lg:w-[40%]">
            {carts?.map((c) => (
              <CheckoutListItem cart={c} key={c?._id} />
            ))}
            <div className="w-full pb-8 border-b ">
              <div className="flex justify-between items-center pb-4">
                <Text className="text-gray-400">Subtotal</Text>
                <Text className="font-semibold">
                  {helper.toCurrency(subTotal as number)}
                </Text>
              </div>
              <div className="flex justify-between items-center ">
                <Text className="text-gray-400">Delivery Fee</Text>
                <Text className="font-semibold">{helper.toCurrency(0)}</Text>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center py-4">
                <Text className="text-gray-300">Total</Text>
                <Text className="font-semibold">
                  {helper.toCurrency(subTotal as number)}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* <ApModal show={modal.show} onDimiss={() => setModal({ show: false })}>
        <PaymentPage
          onDissmiss={() => setModal({ show: false })}
          totalAmount={subTotal}
          order={order}
        />
      </ApModal> */}
    </div>
  );
};
