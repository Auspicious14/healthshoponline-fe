import React from "react";
import { apiReqHandler } from "../../components";
import { ProductDetailPage } from "../../modules/product/detail";
import { IProduct } from "../../modules/product/model";
import jwt from "jsonwebtoken";
import { MainLayout } from "../../modules/layout";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  product: IProduct;
  user: { id: string | null; isAdmin: boolean };
}
const ProductDetail: React.FC<IProps> = ({ product, user }) => {
  return (
    <MainLayout>
      <ProductDetailPage product={product} userId={user?.id} />
    </MainLayout>
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
  const cookie = req?.cookies?.token;

  let token;
  if (cookie) {
    token = jwt.verify(cookie, tokenSecret as string, {});
  }

  const { _id } = query;
  try {
    const data = await apiReqHandler({
      endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${_id}`,
      method: "GET",
    });

    const product = data?.res?.data?.data;
    if (!product) throw new Error("Failed to fetch all required data");

    return {
      props: {
        product: product || null,
        user: token || null,
      },
    };
  } catch (error: any) {
    console.log(error.message);

    return {
      props: {
        product: null,
        user: token || null,
      },
    };
  }
}
