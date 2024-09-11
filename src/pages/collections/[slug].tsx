import React, { useEffect } from "react";
import { MainLayout } from "../../modules/layout";
import { CategoryPage } from "../../modules/category/page";
import jwt from "jsonwebtoken";
import { apiReqHandler } from "../../components";
import { useProductState } from "../../modules/product/context";
import { IProduct } from "../../modules/product/model";
import { ICategory } from "../../modules/category/model";

const tokenSecret = process.env.JWT_SECRET;

interface IProps {
  user: { id: string; isAdmin: boolean };
  products: IProduct[];
  category: ICategory;
}
const CategorySlug: React.FC<IProps> = ({ products, category }) => {
  const { setCollections } = useProductState();

  useEffect(() => {
    setCollections(products);
  }, []);

  return (
    <MainLayout className="px-0">
      <CategoryPage category={category} />
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

  try {
    const [productsRes, categoryRes] = await Promise.all([
      await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/products/${slug}`,
        method: "GET",
      }),
      await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category/${slug}`,
        method: "GET",
      }),
    ]);

    const category = categoryRes?.res?.data?.data || null;
    const products = productsRes?.res?.data?.data || null;

    return {
      props: {
        user: token || null,
        slug: slug || null,
        products,
        category,
      },
    };
  } catch (error: any) {
    console.log(error.message, "failed to fetch");
    return {
      props: {
        user: token || null,
        slug: slug || null,
        products: null,
        category: null,
      },
    };
  }
};
