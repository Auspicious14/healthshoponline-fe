import { Button } from "antd";
import Image from "next/image";
import React from "react";
import { ApBackgroundImage, Footer, Headernav } from "../../components";

export const HomePage = () => {
  return (
    <>
      <Headernav />
      <ApBackgroundImage>
        <div className="w-[50%]  text-white text-center border border-none rounded-lg  p-12  bg-[#2158E8]">
          <h1 className="m-auto text-4xl">
            Try Viagra V100 today and experience the power of a stronger and
            longer-lasting erection.
          </h1>
          <p className="my-2">
            Order now and receive discreet packaging and fast delivery right to
            your doorstep.
          </p>
          <Button
            type="primary"
            size={"large"}
            className="border-white border my-2"
          >
            Shop Now
          </Button>
        </div>
      </ApBackgroundImage>
      <Footer />
    </>
  );
};
