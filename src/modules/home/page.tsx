import { Carousel } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ApImage, Footer } from "../../components";
import { NewArrivals } from "./components/newArrivals";
import Link from "next/link";
import { TopStores } from "./components/topStores";
import { NewStores } from "./components/newStores";
import { motion, useScroll, useTransform } from "framer-motion";
import { CategorySideBar } from "../category/components/sidebar";
import { Category } from "./components/category";
import Banner1 from "../../../public/images/banner1 (1).jpeg";
import Banner2 from "../../../public/images/banner1 (2).jpeg";
import Banner3 from "../../../public/images/banner1 (3).jpeg";
import Banner4 from "../../../public/images/banner1 (4).jpeg";
import Banner5 from "../../../public/images/banner1 (5).jpeg";
import { SearchByImage } from "./components/imageSearch";

const bannerImages = [
  { id: 1, uri: Banner1, name: "banner1" },
  { id: 2, uri: Banner2, name: "banner2" },
  { id: 3, uri: Banner3, name: "banner3" },
  { id: 4, uri: Banner4, name: "banner4" },
  { id: 5, uri: Banner5, name: "banner5" },
];

export const HomePage = () => {
  return (
    <div className="px-2 md:px-4 lg:px-16">
      {/* Carousel Section */}
      <div className="mb-4 md:mb-8">
        <div className="relative h-[40vh] md:h-[60vh] overflow-hidden rounded-xl">
          <Carousel autoplay effect="fade" dotPosition="bottom">
            {bannerImages.map((b) => (
              <div key={b.id} className="relative h-[40vh] md:h-[60vh]">
                <ApImage
                  src={b.uri.src}
                  className="h-full w-full object-cover"
                  alt={b.name}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h1 className="text-xl md:text-4xl font-bold text-white mb-4">
                      Discover Thousands of Products
                    </h1>
                    <Link
                      href="/products"
                      className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Category Section */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-lg md:text-2xl font-bold mb-4">Categories</h2>
        <Category />
      </section>

      {/* New Arrivals */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-lg md:text-2xl font-bold mb-4">New Arrivals</h2>
        <NewArrivals />
      </section>

      {/* Top Stores */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-lg md:text-2xl font-bold mb-4">Top Stores</h2>
        <TopStores />
      </section>

      {/* New Stores */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-lg md:text-2xl font-bold mb-4">New Stores</h2>
        <NewStores />
      </section>
    </div>
  );
};
