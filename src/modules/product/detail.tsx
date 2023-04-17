import React, { useEffect } from "react";
import { ApTextInput, Headernav } from "../../components";
import { useProductState } from "./context";
import { IProduct } from "./model";
import { Form, Formik } from "formik";
import { Button, Card, Grid } from "antd";
import ButtonGroup from "antd/es/button/button-group";

interface IProps {
  product: IProduct;
}

export const ProductDetailPage: React.FC<IProps> = ({ product }) => {
  console.log(product);
  return (
    <div>
      <Headernav />
      <div className="bg-white mx-12">
        <div className="flex gap-8 w-full pt-6">
          {/* Image gallery */}
          <div className="w-[50%] bg-gray-200 border rounded-md">
            <div className="w-full m-auto">
              <img
                src={product?.images[0]?.uri}
                alt={product?.images[0]?.name}
                className="h-full w-full object-cover border rounded-md object-center"
              />
            </div>
            <div className="mx-auto mt-6 sm:px-6 w-full grid grid-cols-3 gap-4 items-center  lg:px-8">
              {product?.images?.map((p, i) => (
                <div
                  key={p._id}
                  className="w-[80%] bg-slate-300 rounded-md border"
                >
                  <img
                    key={p._id}
                    src={p.uri}
                    alt={p.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="w-[50%]">
            <h1 className="pb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="pb-4 text-lg font-bold tracking-tight text-blue-600">
              {`$${product.price}`}
            </p>

            {/* Description and details */}
            <div className="space-y-6 text-justify">
              <p className="text-base text-gray-400">{product.description}</p>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              {/* Reviews */}

              <Formik initialValues={{}} onSubmit={() => {}}>
                <Form className="mt-10">
                  {/* Quantity */}
                  <ButtonGroup className="flex items-center">
                    <Button
                      type="text"
                      className="  text-blue-600 text-base font-medium "
                    >
                      -
                    </Button>
                    <ApTextInput name="quantity" type="text" />
                    <Button
                      type="text"
                      className=" text-blue-600 text-base font-medium "
                    >
                      +
                    </Button>
                  </ButtonGroup>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>
                  </div>

                  <div className="flex w-full gap-4">
                    <Button
                      htmlType="submit"
                      type="text"
                      className="mt-10 flex w-full p-6 items-center justify-center rounded-md border border-transparent bg-gray-200  text-base font-medium text-black "
                    >
                      Add to cart
                    </Button>
                    <Button
                      type="primary"
                      className="mt-10 flex w-full p-6 items-center justify-center rounded-md border border-transparent bg-blue-600 text-base font-medium text-white "
                    >
                      Buy Now
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
