import React from "react";
import { Headernav, SubNav } from "../components";

interface IProps {
  home?: boolean;
  children: React.ReactNode;
}
export const MainLayout = ({ home, children }: IProps) => {
  return (
    <div>
      <Headernav />
      {home && <SubNav />}
      {children}
    </div>
  );
};
