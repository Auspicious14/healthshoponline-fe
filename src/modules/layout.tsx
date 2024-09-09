import React from "react";
import { Footer, Headernav, SubNav } from "../components";
import { StoreNav } from "./store/layout";

interface IProps {
  home?: boolean;
  children: React.ReactNode;
  storeId?: string;
}
export const MainLayout = ({ home, children, storeId }: IProps) => {
  return (
    <div>
      <div className="fixed top-0 w-full z-[5000] ">
        <Headernav storeId={storeId} />
        {/* {home ? "" : <StoreNav storeId={storeId as string} />} */}
      </div>
      <div className="bg-gray md:mt-28 mb-4 mx-auto px-4">{children}</div>
      <Footer />
    </div>
  );
};
