import React from "react";
import { MainLayout } from "../../../modules/layout";
import { ProductPage } from "../../../modules/product/page";
import { apiReqHandler } from "../../../components";

interface IProps {
  storeId?: string;
}

const StoreProducts: React.FC<IProps> = ({ storeId }) => {
  return (
    <MainLayout home>
      <ProductPage storeId={storeId} />
    </MainLayout>
  );
};

export default StoreProducts;

export const getServerSideProps = async ({ query }: { query: any }) => {
  return {
    props: {
      // data: data  || null,
      storeId: query._id || null,
    },
  };
};
