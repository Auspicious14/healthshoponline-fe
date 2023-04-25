import React, { useEffect, useState } from "react";
import { ApPlusMinusInput, ApTextInput, Headernav } from "../../components";
import { Button, Card, Space, Typography } from "antd";
import { getCookie, helper } from "../../helper";
import { Form, Formik, FormikProps } from "formik";
import { useOrderState } from "../order/context";
import { useRouter } from "next/router";
import { useCartState } from "../cart/context";
import Visa from "../../../public/images/Payment method icon.png";
import VisaIcon from "../../../public/images/Payment methodicon-visa - Copy.png";
import { CheckoutListItem } from "../cart/components/checkoutitems";
const { Text } = Typography;

export const PaymentPage = () => {
  // const { orders, createOrder, loading } = useOrderState();
  const { carts, getCart, emptyCart, loading } = useCartState();
  const router = useRouter();

  const subTotal = carts
    ?.map((c: any) => parseFloat(c?.product?.product?.price))
    ?.reduce((a: any, b: any) => a + b, 0);
  const total = carts?.map(
    (c) => parseFloat(c?.product?.product?.price) * c.product.quantity
  );
  const overallTotal = total.map((t) => t).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const id = getCookie("user_id");
    getCart(id);
  }, []);

  const handleSubmit = async (values: any) => {
    console.log(values);
    // let { amount, ...otherValues } = values;
    // amount = overallTotal;
    // const id = getCookie("user_id");
    // // const res: any = await createOrder({ id, amount, ...otherValues });
    // console.log(res);
    // if (res) {
    //   const response = await emptyCart(id);
    //   console.log(response, "emptycart");
    //   router.push("/payment");
    // }
  };

  return (
    <div>
      <Headernav />
      <div className="mx-20">
        <div className="bg-gray-50 w-fit px-4 my-12 rounded-md flex gap-6">
          <div className="flex gap-4">
            <Text>Cart</Text>
            <Text>/</Text>
          </div>
          <div className="flex gap-4">
            <Text>Checkout</Text>
            <Text>/</Text>
          </div>
          <div className="flex gap-4 bg-gray-300 text-blue-600 font-bold">
            <Text>Payment</Text>
          </div>
        </div>
        <h1 className="text-3xl my-8 font-semibold">Payment</h1>
        <div className="flex justify-between w-full gap-4">
          <Card className="w-[60%]">
            <div className="flex justify-between items-center mx-4 my-2 py-1 px-4 bg-gray-100 border rounded-md">
              <Text className="font-bold">Credit Card</Text>
              <div className="flex items-center gap-6">
                <div className="w-8 h-8 flex justify-center items-center object-contain">
                  <img src={VisaIcon.src} alt="" />
                </div>
                <div className="w-8 h-8 flex justify-center items-center object-contain">
                  <img src={Visa.src} alt="" />
                </div>
              </div>
            </div>
            <Formik
              initialValues={{
                cardNumber: "",
                cardName: "",
                expireDate: "",
                cvv: "",
                amount: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className=" Form card px-4 ">
                  <ApTextInput
                    className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-2 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    label="Card Number"
                    name={"cardNumber"}
                    type="number"
                    placeHolder="1029"
                    containerClass="flex-col"
                  />
                  <ApTextInput
                    className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-2 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    label="Card Name"
                    name={"cardName"}
                    type="text"
                    placeHolder="john doe"
                    containerClass="flex-col"
                  />
                  <Space className="flex justify-between items-center gap-4 w-full">
                    <ApTextInput
                      className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-2 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      label="Expire Date"
                      name={"expireDate"}
                      type="Date"
                      placeHolder=""
                      containerClass="flex-col"
                    />
                    <ApTextInput
                      className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-2 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      label="CVV"
                      name={"cvv"}
                      type="number"
                      placeHolder="200"
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
          <Card title={"ORDER SUMMARY"} type="inner" className="w-[40%]">
            {carts?.map((c) => (
              <CheckoutListItem cart={c} key={c?._id} />
            ))}
            <div className="w-full pb-8 border-b ">
              <div className="flex justify-between items-center pb-4">
                <Text className="text-gray-400">Subtotal</Text>
                <Text className="font-semibold">
                  {helper.toCurrency(overallTotal)}
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
                  {helper.toCurrency(overallTotal)}
                </Text>
              </div>
              {/* <Button className="w-full" type="primary" href={"/checkout"}>
                Proceed to Checkout
              </Button> */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
