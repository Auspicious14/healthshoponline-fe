import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { CheckoutPage } from "../modules/cart/checkout";
import { OrderContextProvider } from "../modules/order/context";

const CheckOut = () => {
  return (
    <CartContextProvider>
      <OrderContextProvider>
        <CheckoutPage />
      </OrderContextProvider>
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
export default CheckOut;
