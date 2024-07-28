import React from "react";
import { StorePage } from "../../modules/store/page";
import { MainLayout } from "../../modules/layout";

const Store = () => {
  return (
    <MainLayout home>
      <StorePage />
    </MainLayout>
  );
};

export default Store;
