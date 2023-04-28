import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { PaymentPage } from "../modules/payment/page";
import { PaymentContextProvider } from "../modules/payment/context";

const Payment = () => {
  return (
    <PaymentContextProvider>
      <CartContextProvider>
        <PaymentPage />
      </CartContextProvider>
    </PaymentContextProvider>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  if (!req?.cookies.user_id) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Payment;
