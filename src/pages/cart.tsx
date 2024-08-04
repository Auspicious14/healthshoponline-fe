import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { CartPage } from "../modules/cart/page";
import { MainLayout } from "../modules/layout";

import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Cart: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout>
      <CartPage userId={user.id} />
    </MainLayout>
  );
};

export default Cart;

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
