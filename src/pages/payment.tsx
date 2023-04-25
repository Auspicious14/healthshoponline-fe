import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { PaymentPage } from "../modules/payment/page";

const Payment = () => {
  return (
    <CartContextProvider>
      <PaymentPage />
    </CartContextProvider>
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
