import React from "react";
import { ProductPage } from "../../modules/product/page";
import { MainLayout } from "../../modules/layout";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  user: { id: string | null; isAdmin: boolean };
}
const Product: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout home>
      <ProductPage userId={user?.id} />
    </MainLayout>
  );
};
export default Product;

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const cookie = req?.cookies?.token;

  let token;
  if (cookie) {
    token = jwt.verify(cookie, tokenSecret as string);
  }

  return {
    props: {
      user: token || null,
    },
  };
};
