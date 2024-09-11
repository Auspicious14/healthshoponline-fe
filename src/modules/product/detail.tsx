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
import { Button, Carousel, Space, Typography } from "antd";
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
import { CategoryListItem } from "./components/category";
import { motion } from "framer-motion";
import { CarouselRef } from "antd/es/carousel";
import { ProductCarousel, ProductThumbnail } from "./components/carousel";

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
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

  const handleImageChange = (index: number) => {
    if (carouselRef.current) {
      setSelectedImageIndex(index);
      carouselRef.current.goTo(index);
    }
  };

  return (
    <div>
      <div className="bg-white mt-20 lg:mx-12 md:p-4 px-4 my-4 rounded-lg">
        <div className="md:flex gap-8 w-full pt-6">
          <div className="md:w-[50%] w-full bg-gray py-4 border rounded-lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative w-full flex flex-col items-center justify-center">
                <div className="w-full relative font-sans">
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="relative w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                      <Carousel
                        ref={carouselRef}
                        className="w-full h-full"
                        draggable
                        dots={false}
                        autoplay={true}
                        arrows
                        fade
                        afterChange={(index) => setSelectedImageIndex(index)}
                      >
                        {!!product?.images && product?.images?.length > 0 ? (
                          product?.images.map((image, index) => (
                            <div
                              key={index}
                              className="relative m-auto flex justify-center items-center"
                            >
                              <ApImage
                                src={image.uri}
                                alt={image.name}
                                className="w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center"
                              />
                            </div>
                          ))
                        ) : (
                          <div className="w-full md:h-[300px] bg-primary flex justify-center items-center">
                            <h1 className="text-4xl font-semibold">
                              {product?.name}
                            </h1>
                          </div>
                        )}
                      </Carousel>

                      {/* Thumbnails */}
                      <div className="absolute bottom-4 w-full flex justify-center">
                        <div className="flex gap-2">
                          {!!product?.images &&
                            product?.images.map((image, index) => (
                              <div
                                key={index}
                                className={`cursor-pointer border-2 rounded-lg ${
                                  selectedImageIndex === index
                                    ? "border-primary"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleImageChange(index)}
                              >
                                <ApImage
                                  src={image.uri}
                                  alt={image.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:w-[50%] text-sm">
            <div className="flex justify-between mt-2 md:my-0 md:block">
              <h1 className="pb-4 capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <p className="text-lg font-bold tracking-tight text-primary">
                {`N${product.price}`}
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
      <div className="lg:m-12 rounded-lg bg-white my-4 lg:py-4 px-4">
        <div className="flex justify-between items-center lg:block lg:my-4">
          <Text className="lg:text-3xl text-xl font-bold font-sans">
            Ratings and Review
          </Text>
          <Space className="lg:hidden lg:my-4 flex justify-between my-4">
            <Button
              type="text"
              className="bg-gray-200 font-semibold font-sans"
              onClick={() => setModal({ show: true })}
            >
              Write Review
            </Button>
          </Space>
        </div>
        <div className="lg:flex">
          <div className=" lg:w-1/2">
            <div className="flex lg:gap-24 gap-10">
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
              <Space className="block md:w-[50%] w-full">
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
            {reviews?.length === 0 && (
              <div className="flex justify-center m-auto items-center">
                No reviews
              </div>
            )}
          </div>
          <div className="lg:w-1/2 hidden lg:block">
            <Review review={modal.data} productId={product} />
          </div>
        </div>
      </div>
      {/* <CategoryListItem /> */}

      <ApModal show={modal?.show} onDimiss={() => setModal({ show: false })}>
        <Review review={modal.data} productId={product} />
      </ApModal>
    </div>
  );
};
