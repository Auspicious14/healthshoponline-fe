import React, { useEffect, useRef, useState } from "react";
import {
  ApImage,
  ApModal,
  ApPlusMinusInput,
  ApRatingStar,
  Headernav,
} from "../../components";
import { useProductState } from "./context";
import { IProduct } from "./model";
import { Form, Formik, FormikProps } from "formik";
import { Button, Space, Typography } from "antd";
import { getCookie } from "../../helper";
import { useCartState } from "../cart/context";
import { useRouter } from "next/router";
import { Review } from "./components/modal";
import { RateStreakListItem, ReviewListItem } from "./components/item";

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
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setQty(qty);
    getReviews(product?._id).then((rs: any) => setTotal(rs?.total));
  }, [qty]);

  const handleAddToCart = async (values: any) => {
    const userId = getCookie("user_id");
    const res: any = await addToCart({
      product: {
        quantity: values.quantity,
        id: product._id,
      },
      userId,
    });
    if (res) router.push("/cart");
  };
  const value = Math.round(total);
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
                  <ApImage
                    key={p._id}
                    src={p.uri}
                    alt={p.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover object-center"
                    unoptimized
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

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              {/* Reviews */}
              <Formik
                innerRef={formRef as any}
                initialValues={{ quantity: qty }}
                onSubmit={handleAddToCart}
              >
                {({ values, setFieldValue }) => (
                  <Form className="mt-10">
                    <ApPlusMinusInput
                      name="quantity"
                      label="Quantity"
                      onChange={(val: any) => setQty(val)}
                      disable={qty === product?.quantity ? true : false}
                    />

                    {/* Sizes */}
                    <div className="mt-10">
                      <div className="flex items-center gap-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size:
                        </h3>
                        <Text>{product?.size}</Text>
                      </div>
                    </div>
 x 
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
            <Text className="text-3xl font-bold">Ratings and Review</Text>
            <Button
              type="text"
              className="bg-gray-200 font-semibold"
              onClick={() => setModal({ show: true })}
            >
              Write Review
            </Button>
          </Space>
          <div className="flex gap-24">
            <Space className="block w-40 text-center">
              <Text className="text-6xl font-bold my-4">
                {total ? total.toFixed(1) : "0.0"}
              </Text>
              <div className="">
                <ApRatingStar
                  value={value}
                  size={30}
                  className="justify-center my-2"
                />
              </div>

              <Text className="text-gray-300 my-3">{`${reviews?.length} Product Ratings`}</Text>
            </Space>
            <Space className="block">
              {reviews?.map((r) => (
                <RateStreakListItem review={r} key={r?._id} />
              ))}
            </Space>
          </div>

          <Space className="block mt-4">
            <Text className="text-2xl font-bold">Reviews</Text>
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
