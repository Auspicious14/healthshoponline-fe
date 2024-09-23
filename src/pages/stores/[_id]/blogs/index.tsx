import React from "react";
import jwt from "jsonwebtoken";
import { BlogPage } from "../../../../modules/blog/page";
import { MainLayout } from "../../../../modules/layout";

const tokenSecret = process.env.JWT_SECRET;
interface IProps {
  storeId: string;
  user: { id: string | null; isAdmin: boolean };
}

const StoreBlog: React.FC<IProps> = ({ storeId, user }) => {
  return (
    <MainLayout storeId={storeId}>
      <BlogPage storeId={storeId} />
    </MainLayout>
  );
};

export default StoreBlog;

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

  return {
    props: {
      user: token || null,
      storeId: query._id || null,
    },
  };
};
