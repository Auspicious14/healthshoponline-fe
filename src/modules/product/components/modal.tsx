import { Button, Card } from "antd";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  ApPlusMinusInput,
  ApRatingStar,
  ApTextInput,
} from "../../../components";
import product from "../../../pages/product";
import { IProduct, IReview } from "../model";
import { useProductState } from "../context";
import { getCookie } from "../../../helper";

interface IProps {
  review: IReview;
  productId?: IProduct;
}
export const Review: React.FC<IProps> = ({ productId, review }) => {
  const formRef = useRef();
  const { createReview } = useProductState();
  const [rate, setRate] = useState(review?.rating);

  const handleSubmit = async (values: any) => {
    const userId = getCookie("user_id");
    console.log(values, rate);
    const res = await createReview({
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
          <div className="w-full flex justify-between">
            <div className="w-full">
              <Card className="m-3 ">
                <ApTextInput
                  name="title"
                  type="text"
                  placeHolder="Nike Air MAx"
                  label="Name"
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                <ApTextInput
                  name="description"
                  type="textarea"
                  placeHolder="Nike Air MAx"
                  label="Description"
                  className="relative h-48 w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                <ApRatingStar
                  value={review?.rating}
                  handleUpdateRating={(rate) => setRate(rate)}
                />
              </Card>
            </div>
            <div className="m-3 w-full">
              <Button
                htmlType="submit"
                type="primary"
                className="m-3 bg-blue-600 text-white"
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
