import React, { useState } from "react";
import { ApImage, ApTextInput } from "../../components";
import { Button, Card, Typography } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import Visa from "../../../public/images/Payment method icon.png";
import VisaIcon from "../../../public/images/Payment methodicon-visa - Copy.png";
import { usePaymentState } from "./context";
import Link from "next/link";
import { IOrder } from "../order/model";
const { Text } = Typography;

interface IProps {
  totalAmount?: number;
  order?: IOrder;
  onDissmiss?: () => void;
}
export const PaymentPage: React.FC<IProps> = ({
  totalAmount,
  order,
  onDissmiss,
}) => {
  const { loading, payWithPayStack } = usePaymentState();
  const router = useRouter();
  const [link, setLink] = useState<string>("");
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });

  const handlePay = async () => {
    const res: any = await payWithPayStack({
      amount: totalAmount,
      userId: order?.userId,
      order,
    });
    if (res) {
      setLink(res?.authorization_url);
      setModal({ show: true });
    }
  };

  return (
    <div>
      {/* <Headernav /> */}
      <div className="lg:mx-20">
        {/* <div className="bg-gray-50 w-fit px-4 my-12 rounded-md flex gap-6">
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
        </div> */}
        <h1 className="text-3xl my-8 font-semibold">Payment</h1>
        <div className="flex justify-between w-full gap-4">
          {modal.show == false ? (
            <Card className="lg:w-[60%]">
              <div>
                <div className="flex justify-between items-center mx-4 my-2 py-1 px-4 bg-gray-100 border rounded-md">
                  <Text className="font-bold">Credit Card</Text>
                  <div className="flex items-center gap-6">
                    <div className="w-8 h-8 flex justify-center items-center object-contain">
                      <ApImage src={VisaIcon.src} alt="" />
                    </div>
                    <div className="w-8 h-8 flex justify-center items-center object-contain">
                      <ApImage src={Visa.src} alt="" />
                    </div>
                  </div>
                </div>
                {/* <Formik
                  initialValues={{
                    email: "",
                    amount: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form className=" Form card px-4 ">
                      <ApTextInput
                        className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-2 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        label="Email"
                        name={"email"}
                        type="email"
                        placeHolder="johndoe@gmail.com"
                        containerClass="flex-col"
                      />
                      <ApTextInput
                        className="relative bg-stone-50 flex-col block w-full rounded-md border-0 py-2 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        label="Amount"
                        name={"amount"}
                        type="number"
                        placeHolder="1029"
                        containerClass="flex-col"
                      />
                    </Form>
                  )}
                </Formik> */}
                <Button
                  type="primary"
                  size="large"
                  htmlType="button"
                  loading={loading}
                  onClick={handlePay}
                  className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Pay now
                </Button>
              </div>
            </Card>
          ) : (
            link?.length > 0 && (
              <Link
                href={`${link}`}
                target="_blank"
                className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Verify Payment
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
