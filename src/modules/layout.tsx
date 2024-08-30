import React from "react";
import { Headernav, SubNav } from "../components";

interface IProps {
  home?: boolean;
  children: React.ReactNode;
}
export const MainLayout = ({ home, children }: IProps) => {
  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        <Headernav />
        {home && <SubNav />}
      </div>
      {children}
    </div>
  );
};
