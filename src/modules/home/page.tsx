import { Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Footer } from "../../components";
import { NewArrivals } from "./components/newArrivals";
import Link from "next/link";
import { TopStores } from "./components/topStores";
import { NewStores } from "./components/newStores";
import {
  motion,
  useScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { CategorySideBar } from "../category/components/sidebar";
import { Category } from "./components/category";

const { Text } = Typography;

export const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const newArrivalsRef = useRef<HTMLDivElement | null>(null);
  const [sidebarTop, setSidebarTop] = useState(0);

  // Calculate sidebar top offset
  useEffect(() => {
    const handleResize = () => {
      if (newArrivalsRef.current) {
        const offsetTop =
          newArrivalsRef.current.getBoundingClientRect().top + window.scrollY;
        setSidebarTop(offsetTop);
      }
    };

    // Set initial position
    handleResize();

    // Recalculate on window resize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div className="mt-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ scale }}
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
      <div className="flex gap-8 relative xl:px-16 lg:px-16 md:px-16 p-6">
        {/* Category Sidebar - Fixed on larger screens */}
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
            className=" lg:hidden bg-white shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Category />
          </motion.div>
          <motion.div
            className="bg-white"
            style={{ scale }}
            ref={newArrivalsRef}
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
            style={{ scale }}
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
            style={{ scale }}
          >
            <h1 className="font-bold md:text-2xl text-xl mb-6 bg-primary text-white">
              New Stores
            </h1>
            <NewStores />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
