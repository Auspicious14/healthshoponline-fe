import React from "react";
import jwt from "jsonwebtoken";
import { apiReqHandler } from "../../components";
import { BlogDetailPage } from "../../modules/blog/detail";
import { IBlog } from "../../modules/blog/model";
import { MainLayout } from "../../modules/layout";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  blog: IBlog;
  user: { id: string | null; isAdmin: boolean };
  storeId: string;
}

const BlogDetail: React.FC<IProps> = ({ blog, user }) => {
  return (
    <MainLayout>
      <BlogDetailPage blog={blog} />
    </MainLayout>
  );
};

export default BlogDetail;

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

  const { blogId } = query;

  try {
    const data = await apiReqHandler({
      endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/blog/${blogId}`,
      method: "GET",
    });

    const blog = data?.res?.data?.data;
    if (!blog) throw new Error("Error fetching blog");

    return {
      props: {
        user: token || null,
        blog: blog || null,
      },
    };
  } catch (error: any) {
    console.log(error.message, "Failed to fetch");
    return {
      props: {
        user: token || null,
        blog: null,
      },
    };
  }
};
