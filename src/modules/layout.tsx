import React from "react";
import { Footer, Headernav, SubNav, MobileTab } from "../components";

interface IProps {
  children: React.ReactNode;
  storeId?: string;
  className?: string;
}

export const MainLayout = ({ className, children, storeId }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <Headernav storeId={storeId} />
        <div className="hidden md:block border-t border-gray-100">
          <SubNav storeId={storeId} />
        </div>
      </header>

      <main
        className={`flex-1 pt-20 md:pt-24 px-4 md:px-6 lg:px-8 ${className}`}
      >
        {children}
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
        <Footer />
      </footer>

      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 shadow-lg z-50">
        <MobileTab />
      </div>
    </div>
  );
};
