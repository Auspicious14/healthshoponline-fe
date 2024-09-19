import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { CheckoutPage } from "../modules/cart/checkout";
import { OrderContextProvider } from "../modules/order/context";
import jwt from "jsonwebtoken";
import { MainLayout } from "../modules/layout";

const tokenSecret: string | undefined = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const CheckOut: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout>
      <CartContextProvider>
        <OrderContextProvider>
          <CheckoutPage userId={user.id} />
        </OrderContextProvider>
      </CartContextProvider>
    </MainLayout>
  );
};

export default CheckOut;

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const cookie = req?.cookies?.token;
  if (!cookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  const token: any = jwt.verify(cookie, tokenSecret as string);

  if (token?.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  return {
    props: {
      user: token || null,
    },
  };
};
