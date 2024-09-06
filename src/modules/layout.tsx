import React from "react";
import { Headernav, SubNav } from "../components";
import { StoreNav } from "./store/layout";

interface IProps {
  home?: boolean;
  children: React.ReactNode;
  storeId?: string;
}
export const MainLayout = ({ home, children, storeId }: IProps) => {
  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        <Headernav />
        {home ? <SubNav /> : <StoreNav storeId={storeId as string} />}
      </div>
      {children}
    </div>
  );
};
