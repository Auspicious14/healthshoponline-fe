import Head from "next/head";
import { HomePage } from "../modules/home/page";
import { apiReqHandler } from "../components";
import { useEffect } from "react";
import { useCategorystate } from "../modules/category/context";
import { useProductState } from "../modules/product/context";
import { MainLayout } from "../modules/layout";
import { useStoreState } from "../modules/store/context";

interface IProps {
  data: any;
}
export default function Home({ data }: IProps) {
  const { setCategories } = useCategorystate();
  const { setNewArrivals } = useProductState();
  const { setStores, setnewStores } = useStoreState();

  useEffect(() => {
    if (data) {
      setCategories(data?.categories);
      setNewArrivals(data?.newArrivals);
      setStores(data?.topStores);
      setnewStores(data?.newStores);
    }
  }, [data]);
  return (
    <MainLayout className="px-0">
      <HomePage />
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
  try {
    const [categoriesRes, topStoresRes, newStoresRes] = await Promise.all([
      apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category`,
        method: "GET",
      }),
      apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/stores/top`,
        method: "GET",
      }),
      apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/stores/new`,
        method: "GET",
      }),
    ]);

    // const newArrivalRes = await apiReqHandler({
    //   endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/products?newArrival=true`,
    //   method: "GET",
    // });

    const categories = categoriesRes?.res?.data?.data || null;
    const newArrivals = [] || null;
    const topStores = topStoresRes?.res?.data?.data || null;
    const newStores = newStoresRes?.res?.data?.data || null;

    if (!categories || !newArrivals || !topStores || !newStores) {
      throw new Error("Failed to fetch all required data");
    }

    return {
      props: {
        data: {
          categories,
          newArrivals,
          topStores,
          newStores,
        },
      },
    };
  } catch (error: any) {
    console.error("Error fetching data for homepage:", error.message);

    return {
      props: {
        data: {
          categories: null,
          newArrival: null,
          topStores: null,
          newStores: null,
        },
        error: error.message || "An error occurred while fetching data",
      },
    };
  }
};
