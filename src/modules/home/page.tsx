import { Button } from "antd";
import Image from "next/image";
import React from "react";
import HeroImage from "../../../public/images/homme_page_image.png";
import {
  ApBackgroundImage,
  ApImage,
  Footer,
  Headernav,
  SubNav,
} from "../../components";

export const HomePage = () => {
  return (
    <>
      <Headernav />
      <SubNav />
      <div className="flex justify-between gap-12 items-center mx-16 my-8">
        <div className="w-[50%]  ">
          <h1 className="text-5xl font-bold">
            Quality Medicine and Healthcare at your Doorstep
          </h1>
          <p className="pt-3 font-normal">
            Millions of men around the world face this challenge, but the good
            news is that there's a solution that can help you overcome it.
          </p>
          <div className="flex w-[50%] my-4 gap-4 items-center">
            <button className="border rounded-lg bg-primary w-full py-2 px-4 text-center text-white">
              Explore Store
            </button>
            <button className="rounded-lg bg-offWhite w-full py-2 px-4 text-center text-primary">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-[50%] py-4">
          <ApImage
            // width={500}
            className="flex-1 w-[400px] h-96 justify-end border object-cover rounded-lg"
            // height={200}
            src={HeroImage}
            alt="hero-image"
          />
        </div>
      </div>
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
