import React from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { CategorySideBar } from "../modules/category/components/sidebar";
import { Category } from "../modules/home/components/category";
import { NewArrivals } from "../modules/home/components/newArrivals";
import { NewStores } from "../modules/home/components/newStores";
import { TopStores } from "../modules/home/components/topStores";
import { MainLayout } from "../modules/layout";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const App: React.FC = () => (
  <MainLayout>
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
    <motion.div className="">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        // style={{ scale }}
      >
        <div className="md:w-[90%] mx-0 md:m-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 lg:px-16 py-8 bg-primary text-white">
          <div className="w-full text-center md:mt-0 font-sans">
            <motion.h1
              className="text-3xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Discover Thousands of Products from Multiple Vendors
            </motion.h1>
            <motion.p
              className="pt-3 md:w-1/2 hidden md:block m-auto font-normal text-gray-600"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Explore a vast collection of products across various categories
              from trusted sellers. Shop with confidence and find exactly what
              you need, all in one place.
            </motion.p>
            <motion.div
              className="flex justify-center items-center my-4 gap-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Link
                href="/products"
                className="border-none rounded-lg text-primary font-bold bg-white p-4 transition-transform hover:shadow-lg hover:scale-105"
              >
                Start Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="flex gap-8 relative xl:px-16 lg:px-16 md:px-16 pt-3">
        <motion.div
          className="hidden lg:block h-full w-[30%] bg-white shadow-lg"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CategorySideBar />
        </motion.div>

        <div className="w-full">
          <motion.div
            className=" lg:hidden lg:bg-transparent lg:shadow-none bg-white p-2 mb-2 shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Category />
          </motion.div>
          <motion.div
            className="bg-white"
            // style={{ scale }}
            // ref={newArrivalsRef}
          >
            <div className="text-center mb-4">
              <motion.h1
                className="font-bold md:text-2xl text-lg mb-6 bg-primary text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                New Arrivals
              </motion.h1>
              <NewArrivals />
            </div>
          </motion.div>

          <motion.div
            className="text-center bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            // style={{ scale }}
          >
            <h1 className="font-bold md:text-2xl text-xl mb-6 bg-primary text-white">
              Best-Selling Stores
            </h1>
            <TopStores />
          </motion.div>

          <motion.div
            className="text-center my-4 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            // style={{ scale }}
          >
            <h1 className="font-bold md:text-2xl text-xl mb-6 bg-primary text-white">
              New Stores
            </h1>
            <NewStores />
          </motion.div>
        </div>
      </div>
    </motion.div>
  </MainLayout>
);

export default App;
