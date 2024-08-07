import React from "react";
import { MainLayout } from "../../../modules/layout";
import { ProductPage } from "../../../modules/product/page";
import { apiReqHandler } from "../../../components";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  storeId?: string;
  user: { id: string | null; isAdmin: boolean };
}

const StoreProducts: React.FC<IProps> = ({ user, storeId }) => {
  return (
    <MainLayout home>
      <ProductPage storeId={storeId} userId={user?.id} />
    </MainLayout>
  );
};

export default StoreProducts;

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
      storeId: query._id || null,
    },
  };
};
