import React, { useEffect } from "react";
import { apiReqHandler } from "../../components";
import { getCookie } from "../../helper";
import {
  ProductContextProvider,
  useProductState,
} from "../../modules/product/context";
import { ProductDetailPage } from "../../modules/product/detail";
import { IProduct } from "../../modules/product/model";

interface IProps {
  product: IProduct;
}
const ProductDetail: React.FC<IProps> = ({ product }) => {
  return (
    <div>
      <ProductContextProvider>
        <ProductDetailPage product={product} />
      </ProductContextProvider>
    </div>
  );
};

export async function getServerSideProps({
  query,
  req,
}: {
  query: any;
  req: any;
}) {
  const { _id } = query;
  const data = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${_id}`,
    method: "GET",
  });
  const product = data?.res?.data?.data;
  if (!product) return new Error("Unauthorised");
  return {
    props: { product },
  };
}
export default ProductDetail;
