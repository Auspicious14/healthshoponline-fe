import React from "react";
import { ProductContextProvider } from "../../modules/product/context";
import { ProductPage } from "../../modules/product/page";

const Product = () => {
  return (
    <ProductContextProvider>
      <ProductPage />
    </ProductContextProvider>
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
export default Product;
