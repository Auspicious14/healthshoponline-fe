import React from "react";

import jwt from "jsonwebtoken";
import { MainLayout } from "../../../../modules/layout";
import { apiReqHandler } from "../../../../components";
import { IBlog } from "../../../../modules/blog/model";
import { useBlogState } from "../../../../modules/blog/context";
import { BlogDetailPage } from "../../../../modules/blog/detail";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  blog: IBlog;
  user: { id: string | null; isAdmin: boolean };
  storeId: string;
}

const StoreBlogDetail: React.FC<IProps> = ({ blog, user, storeId }) => {
  return (
    <MainLayout storeId={storeId}>
      <BlogDetailPage blog={blog} />
    </MainLayout>
  );
};

export default StoreBlogDetail;

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

  const { blogId, _id } = query;

  const data = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/blog/${blogId}`,
    method: "GET",
  });

  const blog = data?.res?.data?.data;
  if (!blog) return new Error("Network Error");

  return {
    props: {
      user: token || null,
      blog: blog || null,
      storeId: _id || null,
    },
  };
};
