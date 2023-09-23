import React from "react";
import { ProductContextProvider } from "../../modules/product/context";
import { ProductPage } from "../../modules/product/page";
import { MainLayout } from "../../modules/layout";

const Product = () => {
  return (
    <MainLayout home>
      <ProductPage />
    </MainLayout>
  );
};

// export const getServerSideProps = async ({
//   req,
//   query,
// }: {
//   req: any;
//   query: any;
// }) => {
//   if (!req?.cookies.user_id) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permenant: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
export default Product;
