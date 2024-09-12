import React, { useEffect } from "react";
import { apiReqHandler } from "../../components";
import { ProductDetailPage } from "../../modules/product/detail";
import { IProduct } from "../../modules/product/model";
import jwt from "jsonwebtoken";
import { MainLayout } from "../../modules/layout";
import { useProductState } from "../../modules/product/context";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  relatedProducts: IProduct[];
  product: IProduct;
  user: { id: string | null; isAdmin: boolean };
}
const ProductDetail: React.FC<IProps> = ({
  product,
  user,
  relatedProducts,
}) => {
  const { setRelatedProducts } = useProductState();
  useEffect(() => {
    setRelatedProducts(relatedProducts);
  }, []);

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

  const { slug } = query;
  try {
    let relatedProducts: IProduct[] = [];
    let product: IProduct;

    const productRes = await apiReqHandler({
      endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${slug}`,
      method: "GET",
    });

    product = productRes?.res?.data?.data;
    if (!product) throw new Error("Failed to fetch the product");
    const categories = product?.categories
      .map((c) => encodeURIComponent(c.name))
      .join(",");

    try {
      const relatedProductsRes = await apiReqHandler({
        endPoint: `${
          process.env.NEXT_PUBLIC_API_ROUTE
        }/products?categories=${categories}&limit=${20}`,
        method: "GET",
      });

      relatedProducts = relatedProductsRes?.res?.data?.data?.data || [];
    } catch (error: any) {
      console.warn("Failed to fetch related products:", error.message);
    }

    return {
      props: {
        product: product || null,
        relatedProducts: relatedProducts || [],
        user: token || null,
      },
    };
  } catch (error: any) {
    console.log("Error fetching product details:", error.message);

    return {
      props: {
        product: null,
        relatedProducts: [],
        user: token || null,
      },
    };
  }
}
