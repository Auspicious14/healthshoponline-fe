import React from "react";
import { MainLayout } from "../../modules/layout";
import { FavoritePage } from "../../modules/favorite/page";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET;

interface IProps {
  user: { id: string; isAdmin: boolean };
}
const Favorite: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout>
      <FavoritePage userId={user?.id} />
    </MainLayout>
  );
};

export default Favorite;

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
      user: token,
    },
  };
};
