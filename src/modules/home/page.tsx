import { Carousel, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ApImage, Footer } from "../../components";
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
import Banner1 from "../../../public/images/banner1 (1).jpeg";
import Banner2 from "../../../public/images/banner1 (2).jpeg";
import Banner3 from "../../../public/images/banner1 (3).jpeg";
import Banner4 from "../../../public/images/banner1 (4).jpeg";
import Banner5 from "../../../public/images/banner1 (5).jpeg";

const { Text } = Typography;

const bannerImages = [
  { id: 1, uri: Banner1, name: "banner1" },
  { id: 2, uri: Banner2, name: "banner2" },
  { id: 3, uri: Banner3, name: "banner3" },
  { id: 4, uri: Banner4, name: "banner" },
  { id: 5, uri: Banner4, name: "banner1" },
];

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
    <motion.div className="xl:px-16 lg:px-16 md:px-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ scale }}
      >
        <div className="relative w-full flex flex-col items-center justify-center py-8 text-white">
          <div className="w-full mx-auto relative font-sans ">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                <Carousel
                  className="w-full h-full"
                  draggable
                  autoplay
                  arrows
                  fade
                >
                  {bannerImages.map((b) => (
                    <div className="w-full h-full" key={b.id}>
                      <ApImage
                        src={b.uri.src}
                        alt={b.name}
                        className="object-cover w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] block"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </motion.div>
            <div className="absolute top-0 bottom-0 right-0 py-4 left-0 w-full h-full flex justify-center flex-col items-center z-10">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Discover Thousands of Products from Multiple Vendors
              </motion.h1>
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl pt-3 px-4 md:w-2/3 lg:w-1/2 mx-auto font-normal text-center hidden md:block"
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
                  className="border-none rounded-lg text-primary font-bold bg-white p-4 text-sm lg:text-lg transition-transform hover:shadow-lg hover:scale-105"
                >
                  Start Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex gap-8 relative  pt-3">
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
