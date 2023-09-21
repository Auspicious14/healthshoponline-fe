import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { CartPage } from "../modules/cart/page";
import { MainLayout } from "../modules/layout";

const Cart = () => {
  return (
    <MainLayout>
      <CartPage />
    </MainLayout>
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
export default Cart;
