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
import { Review } from "./components/review";
import { RateStreakListItem, ReviewListItem } from "./components/item";
import { ShareIcon } from "@heroicons/react/24/outline";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Text } = Typography;
interface IProps {
  product: IProduct;
}

export const ProductDetailPage: React.FC<IProps> = ({ product }) => {
  const { addToCart, loading } = useCartState();
  const { reviews, getReviews, totalRatings } = useProductState();
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
  // const totalRating = Math.round(total);
  const router = useRouter();

  useEffect(() => {
    setQty(qty);
    getReviews(product?._id);
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

  const handleCopy = () => {
    const text = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
    navigator.clipboard.writeText(text);
    toast.success("copied");
  };
  console.log(Math.round(totalRatings));
  const handleEachRating = () => {
    reviews?.find((r) => r?._id);
  };
  return (
    <div>
      <Headernav />
      <div className="bg-white md:mx-12 mx-4">
        <div className="md:flex gap-8 w-full pt-6">
          {/* Image gallery */}
          <div className="md:w-[50%] w-full bg-gray py-4 border rounded-lg">
            <div className="w-[50%] h-[50%] m-auto">
              <ApImage
                src={product?.images[0]?.uri}
                alt={product?.images[0]?.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mx-auto mt-6 sm:px-6 w-full grid grid-cols-4 gap-4 items-center  lg:px-8">
              {product?.images?.map((p) => (
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
          <div className="md:w-[50%]">
            <div className="flex justify-between mt-2 md:my-0 md:block">
              <h1 className="pb-4 capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <p className=" text-lg font-bold tracking-tight text-primary">
                {`$${product.price}`}
              </p>
            </div>
            <div className="flex gap-4 items-center mb-4">
              <ApRatingStar value={totalRatings} className="text-zinc-200" />
              <p>{totalRatings?.toFixed(1) || 0} Ratings</p>
            </div>
            {/* Description and details */}
            <div className="space-y-6 text-justify">
              <p className="text-base text-gray-400">{product?.description}</p>
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
                    <div className="flex gap-4 items-center">
                      <ApPlusMinusInput
                        name="quantity"
                        label="Quantity"
                        onChange={(val: any) => setQty(val)}
                        disable={qty === product?.quantity ? true : false}
                        btnClassName="w-8 h-8 rounded-full"
                      />
                      <p className="mt-4">Stock: {product?.quantity}</p>
                    </div>
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
                        className="mt-10 flex w-full p-6 items-center justify-center rounded-md border border-gray-200 bg-gray-200  text-base font-medium text-black "
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
                    <div
                      className="flex items-center gap-2 my-4 cursor-pointer"
                      onClick={handleCopy}
                    >
                      <CopyOutlined className="w-6 text-primary" />
                      <p>Copy link</p>
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
                {totalRatings ? totalRatings.toFixed(1) : "0.0"}
              </Text>
              <div className="">
                <ApRatingStar
                  value={totalRatings}
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
