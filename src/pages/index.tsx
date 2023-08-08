import Head from "next/head";
import { HomePage } from "../modules/home/page";
import { apiReqHandler } from "../components";
import { useEffect } from "react";
import { useCategorystate } from "../modules/category/context";

interface IProps {
  data: any;
}
export default function Home({ data }: IProps) {
  const { setCategories } = useCategorystate();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  return (
    <>
      <HomePage />
    </>
  );
}

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const res = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category`,
    method: "GET",
  });
  const data = await res.res?.data?.data;

  console.log(data);
  if (!req?.cookies.user_id) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  return {
    props: { data },
  };
};
