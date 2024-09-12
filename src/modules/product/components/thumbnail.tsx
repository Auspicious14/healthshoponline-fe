import React from "react";
import { IProduct } from "../model";
import { Carousel } from "antd";
import { ApImage } from "../../../components";

interface IProps {
  product: IProduct;
  selectedImage: number;
  setSelectedImage: (selectedImage: number) => void;
}
export const ProductThumbNail: React.FC<IProps> = ({
  product,
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <div>
      <Carousel>
        <div className=" mt-6 sm:px-6 w-full grid grid-cols-2 gap-4 items-center lg:px-8">
          {product?.images?.map((p, i) => (
            <div
              key={p._id}
              className={`w-[80px] h-[80px] bg-slate-300 rounded-md border cursor-pointer ${
                selectedImage === i ? "border-blue-600" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(i)}
            >
              <ApImage
                key={p._id}
                src={p.uri}
                alt={p.name}
                className="h-full w-full rounded-lg object-cover object-center"
                width={80}
                height={80}
                unoptimized
                priority
              />
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
};
