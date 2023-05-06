import React, { useEffect, useRef, useState } from "react";
import {
  ApModal,
  ApPlusMinusInput,
  ApTextInput,
  Headernav,
} from "../../components";
import { useProductState } from "./context";
import { IProduct } from "./model";
import { Form, Formik, FormikProps, useField } from "formik";
import { Button, Card, Grid, Space, Typography } from "antd";
import { getCookie } from "../../helper";
import { useCartState } from "../cart/context";
import { useRouter } from "next/router";
import { Review } from "./components/modal";
import { ReviewListItem } from "./components/item";

const { Text } = Typography;
interface IProps {
  product: IProduct;
}

export const ProductDetailPage: React.FC<IProps> = ({ product }) => {
  const { addToCart, loading } = useCartState();
  const { reviews, getReviews } = useProductState();
  console.log(product);
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "Add Review" | "Update Review";
  }>({
    show: false,
  });
  const formRef = useRef<FormikProps<any>>();
  const [qty, setQty] = useState<any>(1);
  const router = useRouter();
  // const [field, meta, { setValue }] = useField(qty);

  useEffect(() => {
    setQty(qty);
    const userId = getCookie("user_id");
    getReviews(product?._id);
  }, [qty]);
  console.log(qty);
  const handleAddToCart = async (values: any) => {
    const userId = getCookie("user_id");
    console.log(values.quantity, userId);
    const res: any = await addToCart({
      product: {
        quantity: values.quantity,
        id: product._id,
      },
      userId,
    });
    console.log(res);
    if (res) router.push("/cart");
  };
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
            <h1 className="pb-4 capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
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

              <Formik
                innerRef={formRef as any}
                initialValues={{ quantity: qty }}
                onSubmit={handleAddToCart}
              >
                {({ values, setFieldValue }) => (
                  <Form className="mt-10">
                    {/* Quantity */}
                    {/* <Space className="flex items-center">
                      <Button
                        htmlType="button"
                        className="  text-blue-600 text-base font-medium "
                        onClick={() => {
                          if (qty > 0) {
                            setQty(qty - 1);
                            console.log(qty, "minus value");
                          }
                        }}
                        // value={qty}
                      >
                        -
                      </Button>
                      <ApTextInput name="quantity" type="button" />
                      <Button
                        htmlType="button"
                        // value={qty}
                        // htmlType="button"
                        className=" text-blue-600 text-base font-medium "
                        onClick={() => {
                          if (qty) {
                            setQty(qty + 1);
                          }
                          console.log(qty, "plus value");
                        }}
                        disabled={qty === product?.quantity ? true : false}
                      >
                        +
                      </Button>
                    </Space> */}
                    <ApPlusMinusInput
                      name="quantity"
                      label="Quantity"
                      onChange={(val: any) => setQty(val)}
                      disable={qty === product?.quantity ? true : false}
                    />

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
                        loading={loading}
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
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div>
          <Space className="my-4 flex justify-between">
            <Text>Ratings and Review</Text>
            <Button
              type="text"
              className="bg-gray-200 font-semibold"
              onClick={() => setModal({ show: true })}
            >
              Write Review
            </Button>
          </Space>
          <Space>
            <Text className="text-4xl font-bold">Reviews</Text>
          </Space>
          {reviews &&
            reviews?.map((r) => <ReviewListItem review={r} key={r?._id} />)}
        </div>
      </div>

      <ApModal show={modal?.show} onDimiss={() => setModal({ show: false })}>
        <Review review={modal.data} productId={product} />
      </ApModal>
    </div>
  );
};
