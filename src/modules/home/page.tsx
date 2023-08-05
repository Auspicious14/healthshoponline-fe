import { Button, Typography } from "antd";
import Image from "next/image";
import React from "react";
import HeroImage from "../../../public/images/homme_page_image.png";
import Categories from "../../../public/images/Frame 1000005044 (2).png";
import SectionImage from "../../../public/images/Image (1).png";
import {
  ApBackgroundImage,
  ApImage,
  Footer,
  Headernav,
  SubNav,
} from "../../components";
import {
  CarTwoTone,
  CustomerServiceTwoTone,
  PayCircleFilled,
  VerifiedOutlined,
  WalletOutlined,
  WalletTwoTone,
} from "@ant-design/icons";
import { ScaleIcon, UserIcon } from "@heroicons/react/24/outline";

const { Text } = Typography;

const categories = [
  {
    name: "Capsules",
    key: "capsules",
  },
  {
    name: "Tablets",
    key: "Tablets",
  },
  {
    name: "Syrup",
    key: "Syrup",
  },
  {
    name: "Multi-Vitamins",
    key: "Multi-Vitamins",
  },
  {
    name: "Women",
    key: "Women",
  },
  {
    name: "Men",
    key: "Men",
  },
  {
    name: "Kids",
    key: "kids",
  },
];
export const HomePage = () => {
  return (
    <>
      <Headernav />
      <SubNav />
      <div className="">
        <div className="flex justify-between gap-12 px-16 py-8 items-center bg-gray-200">
          <div className="w-[50%]  ">
            <Text className="text-5xl font-bold">
              Quality Medicine and Healthcare at your Doorstep
            </Text>
            <p className="pt-3 font-normal">
              Millions of men around the world face this challenge, but the good
              news is that there's a solution that can help you overcome it.
            </p>
            <div className="flex w-[50%] my-4 gap-4 items-center">
              <Button className="border rounded-lg bg-primary w-full py-2 px-4 text-center text-white">
                Explore Store
              </Button>
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
        <div className="text-center mt-12 px-16 py-8">
          <Text className="font-bold text-3xl mb-6">
            Shop Our Best-Selling Categories
          </Text>

          <Text className="block mb-12 text-gray-500">
            Over the months, people like you visit our platform to get quality
            medications in these categories
          </Text>

          <div className="grid gap-4 grid-cols-4 align-middle">
            {categories?.map((c) => (
              <div>
                <ApImage
                  src={Categories}
                  className="flex-1 w-full h-40  justify-end border object-cover rounded-lg"
                  alt="categories"
                />
                <Button className="bg-white border-none relative -top-20 font-bold px-12 text-black text-center ">
                  {c?.name}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 px-16 py-8 bg-gray-100">
          <div className="flex justify-center items-center">
            <div className="flex gap-4 items-center w-[25%] border-r-2">
              <div className="bg-white rounded-md text-center border-none p-2">
                <WalletTwoTone color="bg-primary" />
              </div>
              <Text className="font-bold">
                Secured <br /> Payment
              </Text>
            </div>
            <div className="flex gap-4 items-center w-[25%] border-r-2">
              <div className="bg-white ml-4 rounded-sm p-2 text-center border-none">
                <CustomerServiceTwoTone color="bg-primary" />
              </div>
              <Text className="font-bold">
                Customer <br /> support
              </Text>
            </div>
            <div className="flex gap-4 items-center w-[25%] border-r-2">
              <div className="bg-white rounded-md ml-4 text-center border-none p-2">
                <CarTwoTone color="bg-primary" />
              </div>
              <Text className="font-bold">
                Free <br /> Return
              </Text>
            </div>
            <div className="flex gap-4 items-center w-[25%]">
              <div className="bg-white rounded-md ml-4 text-center border-none p-2">
                <ScaleIcon color="bg-primary" />
              </div>
              <Text className="font-bold">
                Lowest <br /> Prices
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-gray px-16 py-8">
          <Text className="text-sm">BENEFITS</Text>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Text className="block font-bold text-3xl">
                Why we are better
              </Text>
            </div>
            <Button className="bg-primary text-white text-center px-4">
              Explore Store
            </Button>
          </div>
          <div className="flex justify-between gap-8 w-full">
            <div className="w-[50%]">
              <div className="mb-4">
                <CarTwoTone color="bg-primary" className="mb-4" />
                <Text className="block font-bold mb-1">
                  We deliver nationwide
                </Text>
                <Text className="block" color="text-gray">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam, ex!
                </Text>
              </div>
              <div className="mb-4">
                <VerifiedOutlined color="bg-primary" className="mb-4" />
                <Text className="block font-bold mb-1">
                  Nafdac/FDA Approved Medications
                </Text>
                <Text className="block" color="text-gray">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam, ex!
                </Text>
              </div>
              <div className="mb-4">
                <VerifiedOutlined color="bg-primary" className="mb-4" />
                <Text className="block font-bold mb-1">
                  Lowest Prices, High Quality
                </Text>
                <Text className="block" color="text-gray">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam, ex!
                </Text>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Text className="block text-2xl" rootClassName="text-primary">
                    4.9{" "}
                  </Text>
                  <Text className="block" rootClassName="text-gray">
                    Brands
                  </Text>
                </div>
                <div>
                  <Text className="block text-2xl" rootClassName="text-primary">
                    5M+{" "}
                  </Text>
                  <Text className="block" rootClassName="text-gray">
                    Order
                  </Text>
                </div>
                <div>
                  <Text className="block text-2xl" rootClassName="text-primary">
                    50k{" "}
                  </Text>
                  <Text className="block" rootClassName="text-gray">
                    Happy Customers
                  </Text>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <ApImage
                src={SectionImage}
                alt="image"
                className="w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <ApBackgroundImage>
        <div className="w-[50%]  text-white text-center border border-none rounded-lg  p-12  bg-[#2158E8]">
          <Text className="m-auto text-4xl">
            Try Viagra V100 today and experience the power of a stronger and
            longer-lasting erection.
          </Text>
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
      </ApBackgroundImage> */}
      <Footer />
    </>
  );
};
