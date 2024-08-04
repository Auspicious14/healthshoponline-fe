import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { PaymentPage } from "../modules/payment/page";
import { PaymentContextProvider } from "../modules/payment/context";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Payment: React.FC<IProps> = ({ user }) => {
  return (
    <PaymentContextProvider>
      <CartContextProvider>
        <PaymentPage />
      </CartContextProvider>
    </PaymentContextProvider>
  );
};

export default Payment;

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
    props: {},
  };
};
