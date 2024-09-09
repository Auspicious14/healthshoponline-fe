import React, { useEffect, useRef, useState } from "react";
import {
  ApImage,
  ApModal,
  ApPlusMinusInput,
  ApRatingStar,
  Footer,
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
import {
  BackwardOutlined,
  CopyOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";

const { Text } = Typography;
interface IProps {
  product: IProduct;
  userId: string | null;
}

export const ProductDetailPage: React.FC<IProps> = ({ product, userId }) => {
  const { addToCart, loading } = useCartState();
  const { reviews, getReviews, totalRatings } = useProductState();
  const formRef = useRef<FormikProps<any>>();
  const [qty, setQty] = useState<any>(1);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product?.images[0]?.uri);
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "Add Review" | "Update Review";
  }>({
    show: false,
  });

  useEffect(() => {
    setQty(qty);
    getReviews(product?._id);
  }, [qty]);

  const handleAddToCart = async (values: any) => {
    if (!userId) return router.push("/auth/login");
    const payload = {
      productId: product?._id,
      quantity: values.quantity,
      userId,
    };
    const res: any = await addToCart(payload);
    if (res) router.push("/cart");
  };

  const handleCopy = () => {
    const text = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
    navigator.clipboard.writeText(text);
    toast.success("copied");
  };
  const handleEachRating = () => {
    reviews?.find((r) => r?._id);
  };
  const ratingsData = [
    { rating: 5, count: 9 },
    { rating: 4, count: 21 },
    { rating: 3, count: 3 },
    { rating: 2, count: 5 },
    { rating: 1, count: 1 },
  ];

  return (
    <div className="">
      {/* <div className="lg:hidden">
        <ArrowLeftCircleIcon
          className="w-8 h-8"
          onClick={() => router.back()}
        />
      </div> */}
      <div className="bg-white mt-20 md:mx-12 md:p-4 px-4 mx-4 rounded-lg">
        <div className="md:flex gap-8 w-full pt-6">
          {/* Image gallery */}
          <div className="md:w-[50%] w-full bg-gray py-4 border rounded-lg">
            {/* Main Image */}
            <div className="w-full h-[400px] flex items-center justify-center m-auto">
              <ApImage
                src={selectedImage}
                alt="Product Image"
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="mx-auto mt-6 sm:px-6 w-full grid grid-cols-4 gap-4 items-center lg:px-8">
              {product?.images?.map((p) => (
                <div
                  key={p._id}
                  className={`w-[80px] h-[80px] bg-slate-300 rounded-md border cursor-pointer ${
                    selectedImage === p.uri
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(p.uri)}
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
          </div>

          <div className="md:w-[50%] text-sm">
            <div className="flex justify-between mt-2 md:my-0 md:block">
              <h1 className="pb-4 capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <p className="text-lg font-bold tracking-tight text-primary">
                {`$N{product.price}`}
              </p>
            </div>
            <div className="flex gap-4 items-center mb-4">
              <ApRatingStar value={totalRatings} className="text-zinc-200" />
              <p>{totalRatings?.toFixed(1) || 0} Ratings</p>
            </div>

            <div className="space-y-6 text-justify">
              <p className="text-sm text-gray">{product?.description}</p>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <Formik
                innerRef={formRef as any}
                initialValues={{ quantity: qty }}
                onSubmit={handleAddToCart}
              >
                {({ values, setFieldValue }) => (
                  <Form className="mt-10">
                    <div className="flex gap-4 justify-between items-center">
                      <ApPlusMinusInput
                        name="quantity"
                        label="Quantity"
                        onChange={(val: any) => setQty(val)}
                        disable={qty === product?.quantity ? true : false}
                        btnClassName="w-8 h-8 rounded-full"
                      />
                      <p className="mt-4">Stock: {product?.quantity}</p>
                    </div>

                    <div className="flex w-full gap-4 text-base">
                      <Button
                        htmlType="submit"
                        type="text"
                        loading={loading}
                        className="mt-10 flex w-full p-6 items-center justify-center rounded-md border border-gray-200 bg-gray-200  text-base font-medium text-black"
                      >
                        Add to cart
                      </Button>
                      <Button
                        type="primary"
                        className="mt-10 flex w-full p-6 items-center justify-center rounded-md border border-transparent bg-blue-600 text-base font-medium text-white"
                      >
                        Buy Now
                      </Button>
                    </div>
                    <ShareAltOutlined
                      className="my-4"
                      size={20}
                      onClick={handleCopy}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="md:m-12 rounded-lg bg-white m-4 p-4">
        <Space className="lg:my-4 flex justify-between mt-8 my-4">
          <Text className="lg:text-3xl text-xl font-bold font-sans">
            Ratings and Review
          </Text>
          <Button
            type="text"
            className="bg-gray-200 font-semibold font-sans"
            onClick={() => setModal({ show: true })}
          >
            Write Review
          </Button>
        </Space>
        <div className="flex md:gap-24 gap-10">
          <Space className="block w-40 text-center">
            <Text className="lg:text-6xl text-4xl font-bold my-4 font-sans">
              {totalRatings ? totalRatings.toFixed(1) : "0.0"}
            </Text>
            <ApRatingStar
              value={totalRatings}
              size={30}
              className="justify-center my-2"
            />
            <Text className="text-gray-300 my-3 font-sans">{`${reviews?.length} Product Ratings`}</Text>
          </Space>
          <Space className="block">
            {/* {reviews?.map((r) => (
                <RateStreakListItem review={r} key={r?._id} />
              ))} */}
            {ratingsData.map((data) => (
              <RateStreakListItem
                key={data.rating}
                rating={data.rating}
                count={data.count}
                totalRatings={totalRatings}
              />
            ))}
          </Space>
        </div>

        <Space className="block mt-4">
          <Text className="text-2xl font-sans font-bold">Reviews</Text>
        </Space>
        {reviews?.map((r) => (
          <ReviewListItem review={r} key={r?._id} />
        ))}
      </div>

      <Footer />
      <ApModal show={modal?.show} onDimiss={() => setModal({ show: false })}>
        <Review review={modal.data} productId={product} />
      </ApModal>
    </div>
  );
};
