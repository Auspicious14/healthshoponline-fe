import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { ApTextInput } from "../../../components";
import { useForgetPasswordState } from "./context";
import { Button } from "antd";
import { toast } from "react-toastify";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
});

export const ForgetPasswordPage = () => {
  const router = useRouter();
  const { handleForgetPassword, loading } = useForgetPasswordState();
  const handleSubmit = async (values: any) => {
    const res = handleForgetPassword(values);
    res.then((res: any) => {
      toast.success(res?.message);
      router.push("/auth/verify");
    });
  };

  return (
    <div className="flex justify-center items-center my-32">
      <div>
        <div className="my-6 mx-4 text-left">
          <h2 className=" text-3xl font-bold tracking-tight text-gray-900">
            Forgot Password?
          </h2>
          <p className="text-[#475467] my-2">
            {" No worries, we'll send you reset instructions"}
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <ApTextInput
                className="relative bg-stone-50 block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                label="Email"
                name="email"
                type="email"
                placeHolder="email"
              />

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Get OTP
              </Button>
              <div className="flex justify-center items-center">
                <Button type="link" href={"/auth/login"} icon={""}>
                  Back to log in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
