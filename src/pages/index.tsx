import Head from "next/head";
import { HomePage } from "../modules/home/page";
import { apiReqHandler } from "../components";
import { useEffect } from "react";
import { useCategorystate } from "../modules/category/context";
import { useProductState } from "../modules/product/context";
import { MainLayout } from "../modules/layout";

interface IProps {
  data: any;
}
export default function Home({ data }: IProps) {
  const { setCategories } = useCategorystate();
  const { setNewArrivals } = useProductState();

  useEffect(() => {
    if (data) {
      setCategories(data?.data);
      setNewArrivals(data?.newArrival);
    }
  }, [data]);
  return (
    <MainLayout home>
      <HomePage />
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
  const res = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category`,
    method: "GET",
  });

  const data = await res?.res?.data?.data;

  const response = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/products?newArrival=newArrival`,
    method: "GET",
  });
  const newArrival = await response?.res?.data?.data;

  return {
    props: { data: { data, newArrival } || null },
  };
};
