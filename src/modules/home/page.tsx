import { Button, Space, Typography } from "antd";
import Image from "next/image";
import React from "react";
import HeroImage from "../../../public/images/homme_page_image.png";
import SectionImage from "../../../public/images/Image (1).png";
import { ApImage, Footer, Headernav, SubNav } from "../../components";
import {
  CarTwoTone,
  CustomerServiceTwoTone,
  VerifiedOutlined,
  WalletTwoTone,
} from "@ant-design/icons";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { Category } from "./components/category";
import { NewArrivals } from "./components/newArrivals";

const { Text } = Typography;

export const HomePage = () => {
  return (
    <>
      <div className="">
        <div className="lg:flex xl:flex md:flex xl:justify-between lg:justify-between md:justify-between gap-12 xl:px-16 lg:px-16 md:px-16 xl:lg:md:py-8 p-6 items-center bg-gray">
          <div className="md:w-1/2 xl:w-1/2 lg:w-[50%] w-full md:text-left text-center">
            <Text className="text-5xl font-bold text-center md:text-left">
              Quality Medicine and Healthcare at your Doorstep
            </Text>
            <p className="pt-3 font-normal">
              {
                "Millions of men around the world face this challenge, but the good news is that there's a solution that can help you overcome it."
              }
            </p>
            <div className="flex md:w-1/2 my-4 gap-4 sm:justify-center items-center">
              <Button className="border-none rounded-lg text-white h-12 font-bold text-center px-4 bg-primary">
                Explore Store
              </Button>
              <Button className="border-none font-bold rounded-lg bg-offWhite w-full px-4 h-12 text-center text-primary">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 xl:w-1/2 lg:w-[50%] py-4">
            <ApImage
              // width={500}
              className="flex-1 xl:lg:md:w-[400px] w-full h-96 justify-end border object-cover rounded-lg"
              // height={200}
              src={HeroImage}
              alt="hero-image"
            />
          </div>
        </div>

        <div className="text-center xl:mt-12 lg:mt-12 md:mt-12 xl:px-16 lg:px-16 md:px-16 xl:py-8 lg:py-8 md:py-8 p-6 mt-8">
          <Text className="font-bold text-3xl mb-6">
            Get a taste of Our products as they come
          </Text>
          <Text className="block mb-12 text-base mt-2 text-gray-500">
            Products are kept updated for you to have a good taste and view
          </Text>
          <NewArrivals />
        </div>
        <div className="text-center xl:mt-12 lg:mt-12 md:mt-12 xl:px-16 lg:px-16 md:px-16 xl:py-8 lg:py-8 md:py-8 p-6 mt-8">
          <Text className="font-bold text-3xl mb-6">
            Shop Our Best-Selling Categories
          </Text>

          <Text className="block mb-12 text-gray-500 text-base mt-2">
            Over the months, people like you visit our platform to get quality
            medications in these categories
          </Text>
          <Category />
        </div>
        <div className="text-center xl:mt-12 lg:mt-12 md:mt-12 xl:px-16 lg:px-16 md:px-16 xl:py-8 lg:py-8 md:py-8 p-6 mt-8 bg-gray-100">
          <div className="sm:flex sm:justify-center items-center grid grid-cols-2 gap-4">
            <div className="flex gap-4 items-center sm:w-[25%] border-r-2">
              <div className="bg-white rounded-md text-center border-none p-2">
                <WalletTwoTone color="bg-primary" />
              </div>
              <Text className="font-bold text-base lg:xl:text-xl">
                Secured <br /> Payment
              </Text>
            </div>
            <div className="flex gap-4 items-center sm:w-[25%] sm:border-r-2">
              <div className="bg-white ml-4 rounded-sm p-2 text-center border-none">
                <CustomerServiceTwoTone color="bg-primary" />
              </div>
              <Text className="font-bold text-base lg:xl:text-xl">
                Customer <br /> support
              </Text>
            </div>
            <div className="flex gap-4 items-center sm:w-[25%] border-r-2">
              <div className="bg-white rounded-md ml-4 text-center border-none p-2">
                <CarTwoTone color="bg-primary" />
              </div>
              <Text className="font-bold text-base lg:xl:text-xl">
                Free <br /> Return
              </Text>
            </div>
            <div className="flex gap-4 items-center sm:w-[25%]">
              <div className="bg-white rounded-md ml-4 text-center border-none p-2">
                <ScaleIcon color="bg-primary" />
              </div>
              <Text className="font-bold text-base lg:xl:text-xl">
                Lowest <br /> Prices
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-gray xl:mt-12 lg:mt-12 md:mt-12 xl:px-16 lg:px-16 md:px-16 xl:py-8 lg:py-8 md:py-8 p-6 mt-8">
          <Text className="text-sm ">BENEFITS</Text>
          <div className="text-center xl:flex lg:flex md:flex xl:justify-between lg:justify-between md:justify-between sm:flex sm:justify-between sm:items-center block xl:items-center lg:items-center md:items-center mb-6">
            <div>
              <Text className="block font-bold text-3xl">
                Why we are better
              </Text>
            </div>
            <Button className="bg-primary text-white text-center px-4 h-12 my-4 lg:xl:md:my-0">
              Explore Store
            </Button>
          </div>
          <div className="xl:flex lg:flex md:flex xl:justify-between lg:justify-between md:justify-between sm:flex sm:justify-between block gap-8 w-full">
            <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
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
                  <Text
                    className="block text-2xl font-bold"
                    rootClassName="text-primary"
                  >
                    4.9{" "}
                  </Text>
                  <Text className="block" rootClassName="text-gray">
                    Brands
                  </Text>
                </div>
                <div>
                  <Text
                    className="block text-2xl font-bold"
                    rootClassName="text-primary"
                  >
                    5M+{" "}
                  </Text>
                  <Text className="block" rootClassName="text-gray">
                    Order
                  </Text>
                </div>
                <div>
                  <Text
                    className="block text-2xl font-bold"
                    rootClassName="text-primary"
                  >
                    50k{" "}
                  </Text>
                  <Text className="block" rootClassName="text-gray">
                    Happy Customers
                  </Text>
                </div>
              </div>
            </div>
            <div className="my-4 xl:my-0 lg:my-0 sm:my-0 md:my-0 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xl:flex lg:flex md:flex xl:justify-end lg:justify-end sm:justify-end md:justify-end w-full">
              <ApImage
                src={SectionImage}
                alt="image"
                className="lg:w-[400px] lg:h-[400px] xl:w-[400px] xl:h-[400px] md:w-[400px] md:h-[400px] sm:w-[400px] sm:h-[400px] w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className=" xl:mt-12 lg:mt-12 md:mt-12 xl:px-16 lg:px-16 md:px-16 xl:py-8 lg:py-8 md:py-8 p-6 mt-8 bg-gray-100">
          <Space className="block text-center">
            <Text className="block font-bold text-3xl">
              Trusted Medication, Delivered to your Door
            </Text>
            <Text className="block my-2 text-base" color="text-gray">
              Our online store offers fast and reliable shipping to your
              doorstep, ensuring you receive the medication you need when you
              need it.
            </Text>
          </Space>
          <ApImage
            src={SectionImage}
            alt="image"
            className="w-full h-[500px] m-auto mt-6 sm:object-cover object-contain"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};
