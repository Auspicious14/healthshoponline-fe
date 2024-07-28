import React from "react";
import { apiReqHandler } from "../../components";
import { ProductDetailPage } from "../../modules/product/detail";
import { IProduct } from "../../modules/product/model";

interface IProps {
  product: IProduct;
}
const ProductDetail: React.FC<IProps> = ({ product }) => {
  return (
    <div>
      <ProductDetailPage product={product} />
    </div>
  );
};

export default ProductDetail;

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
  console.log(product, "productt");
  if (!product) return new Error("Network Error");

  return {
    props: {
      product: product || null,
    },
  };
}
