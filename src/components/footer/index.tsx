import Link from "next/link";
import React from "react";
import { ApImage } from "../image";
import visaCardImage from "../../../public/images/Payment method icon (1).png";
import masterCardImage from "../../../public/images/Payment method icon.png";
import skrillCardImage from "../../../public/images/Payment method icon (2).png";
import Logo from "../../../public/images/vendify logo white.jpg";
import { Button, Input, Space, Typography } from "antd";
import { MessageOutlined, PhoneOutlined } from "@ant-design/icons";
const { Text } = Typography;
export const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Space className="block md:p-20 p-6 bg-gray">
      <Space className="sm:flex sm:justify-between block">
        <Text className="font-bold text-2xl block font-sans">
          Get our emails for info on new <br /> items, sales and more
        </Text>
        <Space className="block my-4">
          <Space.Compact style={{ width: "100%" }}>
            <Input defaultValue="" placeholder="Enter your email" />
            <Button type="primary" className="bg-blue-600">
              Subscribe
            </Button>
          </Space.Compact>
          <Text className="block text-gray mt-2 font-sans">
            By subscribing, you agree to our terms and conditions, privacy and
            cookies policy
          </Text>
        </Space>
      </Space>
      <Space className="md:flex md:justify-between block items-start mt-8 pb-8 border-b">
        <Space className="block">
          <Space className="block">
            <Link href={"/"}>
              <ApImage src={Logo} width={100} height={100} alt="logo" />
            </Link>
            <Text className="block text-base font-sans">
              Design amazing digital experiences that create
            </Text>
            <Space>
              <PhoneOutlined rev={undefined} />
              <Text className="block text-base text-gray font-sans">
                +2347010018536
              </Text>
            </Space>
            <Space>
              <MessageOutlined rev={undefined} />
              <Text className="block text-base text-gray font-sans">
                uthmanabdulganiyu2019@gmail.com
              </Text>
            </Space>
          </Space>
        </Space>
        <Space className="flex items-center justify-between gap-8 my-2 md:my-0">
          <Space className="block my-4 md:my-0">
            <Text className="block text-base font-bold font-sans">Shop</Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              Collections
            </Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              Discount
            </Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              Blogs
            </Text>
          </Space>

          <Space className="block my-4 md:my-0">
            <Text className="block text-base font-bold font-sans">Company</Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              About Us
            </Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              Contact Us
            </Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              Support
            </Text>
          </Space>
          <Space className="block my-4 md:my-0">
            <Text className="block text-base font-bold font-sans">Support</Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              FAQs
            </Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              Cookie Policy
            </Text>
            <Text className="block text-base my-1 text-[#1A45B5] font-semibold font-sans">
              Terms of use
            </Text>
          </Space>
        </Space>
        <Space className=" block mt-8">
          <Text className=" block text-base text-gray mt-2 font-sans">
            Accepted Payment
          </Text>
          <Space className="  flex gap-4">
            <ApImage
              src={masterCardImage}
              alt={"healthshop"}
              width={50}
              height={50}
              className={"my-4"}
            />
            <ApImage
              src={visaCardImage}
              alt={"healthshop"}
              width={50}
              height={50}
              className={"my-4"}
            />
            <ApImage
              src={skrillCardImage}
              alt={"healthshop"}
              width={50}
              height={50}
              className={"my-4"}
            />
          </Space>
        </Space>
      </Space>
      <Space className="flex justify-between my-4">
        <span className="flex gap-2">
          <span>&copy;{`${date}`}</span>
          <span>All right reserved.</span>
        </span>
      </Space>
    </Space>
  );
};
