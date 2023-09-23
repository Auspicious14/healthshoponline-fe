import { Button, Card, Typography } from "antd";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  ApPlusMinusInput,
  ApRatingStar,
  ApTextInput,
} from "../../../components";
import product from "../../../pages/products";
import { IProduct, IReview } from "../model";
import { useProductState } from "../context";
import { getCookie } from "../../../helper";

const { Text } = Typography;
interface IProps {
  review: IReview;
  productId?: IProduct;
}
export const Review: React.FC<IProps> = ({ productId, review }) => {
  const formRef = useRef();
  const { createReview, updateReview, loading } = useProductState();
  const [rate, setRate] = useState(review?.rating);

  const handleSubmit = async (values: any) => {
    const userId = getCookie("user_id");
    console.log(values, rate);
    let res;

    res = await createReview({
      ...values,
      productId: productId?._id,
      userId,
      rating: rate,
    });
    console.log(res);
  };
  return (
    <Formik
      innerRef={formRef as any}
      initialValues={{
        title: review?.title || "",
        description: review?.description || "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="w-full flex justify-center items-center">
            <div className="w-full">
              <Card className="m-3">
                <div className="my-3">
                  <Text>Rate</Text>
                  <ApRatingStar
                    value={review?.rating}
                    size={40}
                    handleUpdateRating={(rate) => setRate(rate)}
                    className="text-zinc-200"
                  />
                </div>
                <ApTextInput
                  label="Name"
                  name="title"
                  type="text"
                  placeHolder="Nike Air Max"
                  containerClass="flex-col"
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                <ApTextInput
                  name="description"
                  type="textarea"
                  placeHolder="Nike Air Max"
                  label="Description"
                  containerClass="flex-col"
                  className="relative h-48 w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </Card>
              <Button
                htmlType="submit"
                type="primary"
                className="m-3 bg-blue-600 text-white"
                loading={loading}
              >
                {review?._id ? "Save Changes" : "Write Review"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
