import Link from "next/link";
import React from "react";
import { ApImage } from "../image";
import visaCardImage from "../../../public/images/Payment method icon (1).png";
import masterCardImage from "../../../public/images/Payment method icon.png";
import skrillCardImage from "../../../public/images/Payment method icon (2).png";
import { Button, Input, Space, Typography } from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  RocketOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
const { Text } = Typography;
export const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Space className="block p-20 bg-gray">
      <Space className="flex justify-between">
        <Text className="font-bold text-2xl block">
          Get our emails for info on new <br /> items, sales and more
        </Text>
        <Space className="block my-4">
          <Space.Compact style={{ width: "100%" }}>
            <Input defaultValue="" placeholder="Enter your email" />
            <Button type="primary" className="bg-blue-600">
              Subscribe
            </Button>
          </Space.Compact>
          <Text className="block text-gray mt-2">
            By subscribing, you agree to our terms and conditions, privacy and
            cookies policy
          </Text>
        </Space>
      </Space>
      <Space className="flex justify-between items-start mt-8 pb-8 border-b">
        <Space className="block">
          <Space className="block">
            <Link href={"#"}>Logo</Link>
            <Text className="block">
              Design amazing digital experiences that create
            </Text>
            <Space>
              <PhoneOutlined />
              <Text className="block text-gray">+2347010018536</Text>
            </Space>
            <Space>
              <MessageOutlined />
              <Text className="block text-gray">
                uthmanabdulganiyu2019@gmail.com
              </Text>
            </Space>
          </Space>
        </Space>

        <Space className="block">
          <Text className="block font-bold">Shop</Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">
            Collections
          </Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">
            Discount
          </Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">Blogs</Text>
        </Space>

        <Space className="block">
          <Text className="block font-bold">Company</Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">
            About Us
          </Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">
            Contact Us
          </Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">
            Support
          </Text>
        </Space>
        <Space className="block">
          <Text className="block font-bold">Support</Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">FAQs</Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">
            Cookie Policy
          </Text>
          <Text className="block my-1 text-[#1A45B5] font-semibold">
            Terms of use
          </Text>
        </Space>
        <Space className=" block mt-8">
          <Text className=" block text-gray mt-2">Accepted Payment</Text>
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
