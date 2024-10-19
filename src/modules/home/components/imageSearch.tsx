import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadFile } from "antd";
import React from "react";
import { useProductState } from "../../product/context";
import { useRouter } from "next/router";
import { fileSvc } from "../../../file";

const { Dragger } = Upload;

export const SearchByImage = () => {
  const router = useRouter();
  const { getProductsByImage } = useProductState();

  const handleImageUpload = async (file: UploadFile<any>) => {
    const { name, type }: any = file;

    const uri = await fileSvc.fileToBase64(file.originFileObj as any);

    getProductsByImage({ name, uri, type }).then((res) => {
      if (res?.length > 0) {
        router.push({
          pathname: "/products",
          query: { products: JSON.stringify(res) },
        });
      }
    });
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <p className="text-xl font-bold text-center mb-2">
        Search Products by Image
      </p>
      <Dragger
        multiple={false}
        onChange={(e) => {
          handleImageUpload(e.file);
        }}
        accept="image/png, image/jpeg, image/webp"
        // onDrop={(e) => console.log(e.dataTransfer.files, "droped files")}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibited from uploading
          company data or other banned files.
        </p>
      </Dragger>
    </div>
  );
};
