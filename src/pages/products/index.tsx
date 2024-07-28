import React from "react";
import { ProductPage } from "../../modules/product/page";
import { MainLayout } from "../../modules/layout";

const Product = () => {
  return (
    <MainLayout home>
      <ProductPage />
    </MainLayout>
  );
};
export default Product;

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
