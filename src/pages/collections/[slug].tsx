import React, { useEffect } from "react";
import { MainLayout } from "../../modules/layout";
import { CategoryPage } from "../../modules/category/page";
import jwt from "jsonwebtoken";
import { apiReqHandler } from "../../components";
import { useProductState } from "../../modules/product/context";
import { IProduct } from "../../modules/product/model";

const tokenSecret = process.env.JWT_SECRET;

interface IProps {
  user: { id: string; isAdmin: boolean };
  products: IProduct[];
}
const CategorySlug: React.FC<IProps> = ({ products }) => {
  const { setCollections } = useProductState();

  useEffect(() => {
    setCollections(products);
  }, []);

  return (
    <MainLayout>
      <CategoryPage />
    </MainLayout>
  );
};

export default CategorySlug;

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

  const { slug } = query;

  const data = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/products/${slug}`,
    method: "GET",
  });

  const products = data?.res?.data?.data;
  if (!products) return new Error("Network Error");

  return {
    props: {
      user: token || null,
      products: products || null,
    },
  };
};
