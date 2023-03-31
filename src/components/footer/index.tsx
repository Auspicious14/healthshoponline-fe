import Link from "next/link";
import React from "react";
import { ApImage } from "../image";
import visaCardImage from "../../../public/images/Payment method icon (1).png";
import masterCardImage from "../../../public/images/Payment method icon.png";
import skrillCardImage from "../../../public/images/Payment method icon (2).png";
import { Button, Input, Space } from "antd";
import { RocketOutlined, ShareAltOutlined } from "@ant-design/icons";

export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="p-20 ">
      <div className="flex justify-between  my-2  border-b">
        <div className="flex gap-4">
          <div>
            <div>
              <Link href={"#"}>Logo</Link>
              <div>Design amazing digital experiences that create</div>
            </div>
            <div className="mt-8">
              <span>Accepted Payment</span>
              <div className="flex gap-4">
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
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-bold">Product</h1>
            <p className="my-1 text-[#1A45B5] font-semibold">Overview</p>
            <p className="my-1 text-[#1A45B5] font-semibold">Features</p>
            <p className="my-1 text-[#1A45B5] font-semibold">Solutions</p>
            <p className="my-1 text-[#1A45B5] font-semibold">Tutorials</p>
            <p className="my-1 text-[#1A45B5] font-semibold">pricing</p>
            <p className="my-1 text-[#1A45B5] font-semibold">Releases</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold">Resources</h1>
          <p className="my-1 text-[#1A45B5] font-semibold">Blog</p>
          <p className="my-1 text-[#1A45B5] font-semibold">NewsLetter</p>
          <p className="my-1 text-[#1A45B5] font-semibold">Events</p>
          <p className="my-1 text-[#1A45B5] font-semibold">Help center</p>
          <p className="my-1 text-[#1A45B5] font-semibold">Tutorials</p>
          <p className="my-1 text-[#1A45B5] font-semibold">Support</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold">NewsLetter</h1>
          <p>Design amazing digital experiences</p>
          <div className="my-4">
            <Space.Compact style={{ width: "100%" }}>
              <Input defaultValue="" />
              <Button type="primary" className="bg-blue-600">
                Subscribe
              </Button>
            </Space.Compact>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="flex gap-2">
          <span>&copy;{`${date}`}</span>
          <span>All right reserved.</span>
        </span>
      </div>
    </div>
  );
};
