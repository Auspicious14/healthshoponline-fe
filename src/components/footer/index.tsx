import Link from "next/link";
import React from "react";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify_070931.png";
import { Button, Input, Space } from "antd";
import { MessageOutlined, PhoneOutlined } from "@ant-design/icons";

export const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4 lg:pr-8">
            <Link href="/">
              <ApImage
                src={Logo}
                width={120}
                height={120}
                alt="logo"
                className="hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-sm text-gray-600">
              Design amazing digital experiences that create lasting impressions
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PhoneOutlined className="text-gray-600" />
                <span className="text-sm text-gray-600">+2347010018536</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageOutlined className="text-gray-600" />
                <span className="text-sm text-gray-600 break-all">
                  uthmanabdulganiyu2019@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Get updates on new items, sales and more
              </h3>
              <Space.Compact className="w-full">
                <Input
                  placeholder="Enter your email"
                  className="py-2 rounded-l-lg"
                />
                <Button
                  type="primary"
                  className="bg-primary hover:bg-blue-700 transition-colors rounded-r-lg"
                >
                  Subscribe
                </Button>
              </Space.Compact>
              <p className="text-xs text-gray-500 mt-2">
                By subscribing, you agree to our terms and conditions, privacy
                and cookies policy
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Shop</h4>
                <Link
                  href="/collections"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/discounts"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  Discount
                </Link>
                <Link
                  href="/blogs"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  Blogs
                </Link>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Company</h4>
                <Link
                  href="/about"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/support"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  Support
                </Link>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Support</h4>
                <Link
                  href="/faqs"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  href="/cookie-policy"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/terms"
                  className="block text-sm text-primary hover:text-blue-800 transition-colors"
                >
                  Terms of use
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <span className="text-sm text-gray-600">
            &copy; {date} All rights reserved. Vendify Marketplace
          </span>
        </div>
      </div>
    </footer>
  );
};
