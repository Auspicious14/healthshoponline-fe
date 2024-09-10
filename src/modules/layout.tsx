import React from "react";
import { Footer, Headernav, SubNav } from "../components";
import { StoreNav } from "./store/layout";
import { HeaderNav } from "../components/nav/header";

interface IProps {
  home?: boolean;
  children: React.ReactNode;
  storeId?: string;
  className?: string;
}

export const MainLayout = ({ className, home, children, storeId }: IProps) => {
  return (
    <div className="relative ">
      <div className="fixed top-0 left-0 w-full z-[5000]">
        <Headernav storeId={storeId} />
        <div className="hidden md:block">
          <SubNav />
        </div>
      </div>
      <div className={` bg-gray md:mt-32 mt-20 mb-4 px-4 ${className}`}>
        {children}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
