import React from "react";
import { OrderPage } from "../../modules/order/page";

import jwt from "jsonwebtoken";
import { MainLayout } from "../../modules/layout";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Order: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout>
      <OrderPage userId={user?.id} />
    </MainLayout>
  );
};

export default Order;

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
