import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import { ApBackgroundImage, ApTextInput } from "../../../components";
import { useSignUpState } from "./context";
import Section from "../../../../public/images/Sections.png";
import { Button, Card } from "antd";
import { EyeInvisibleFilled, EyeOutlined } from "@ant-design/icons";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(6),
});

export const SignUpPage = () => {
  const { handleSignUp, loading } = useSignUpState();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const res = handleSignUp(values);
    res.then((rs: any) => {
      if (rs.user) router.push("/");
    });
  };

  return (
    <div className=" md:flex">
      {/* <div className="lg:ml-32 mt-12 lg:w-1/4 w-full">
        <h2 className="my-6 mx-4 text-3xl font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                label="First Name"
                name="firstName"
                type="text"
                placeHolder="First Name"
                containerClass="flex flex-col"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                label="Last Name"
                name="lastName"
                type="text"
                placeHolder="Last Name"
                containerClass="flex flex-col"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                label="Email"
                name="email"
                type="email"
                placeHolder="johndoe@gmail.com"
                containerClass="flex flex-col"
              />
              <div className="relative">
                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeHolder="*******"
                  containerClass="flex flex-col"
                />
                {!showPassword && (
                  <EyeInvisibleFilled
                    className="absolute right-2 top-9"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                {showPassword && (
                  <EyeOutlined
                    className="absolute right-2 top-9"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Sign up
              </Button>

              <div className="flex justify-center items-center">
                <span>Already have an account?</span>
                <Button type="link" href={"/auth/login"}>
                  Log in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div> */}
      <div className="w-1/2 mx-20">
        <div className=" flex justify-center md:block ">
          <div className="my-6 mx-4 text-left">
            <h2 className=" text-3xl text-center font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="text-[#475467] my-2">
              Discover a World of Convenient Shopping. Please log in to access
              your account.
            </p>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
          >
            {(props: FormikProps<any>) => (
              <Form className=" Form card px-4 ">
                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeHolder="First Name"
                  containerClass="flex flex-col"
                />
                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeHolder="Last Name"
                  containerClass="flex flex-col"
                />
                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                  label="Email"
                  name="email"
                  type="email"
                  placeHolder="johndoe@gmail.com"
                  containerClass="flex flex-col"
                />
                <div className="relative">
                  <ApTextInput
                    className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeHolder="*******"
                    containerClass="flex flex-col"
                  />
                  {!showPassword && (
                    <EyeInvisibleFilled
                      className="absolute right-2 top-9"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                  {showPassword && (
                    <EyeOutlined
                      className="absolute right-2 top-9"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>

                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Sign up
                </Button>

                <div className="flex justify-center items-center">
                  <span>Already have an account?</span>
                  <Button type="link" href={"/auth/login"}>
                    Log in
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Card className="h-screen flex items-center justify-center p-8 text-center text-white bg-blue-800 bg-opacity-90">
        <p className="capitalize text-4xl font-bold mb-4">
          Your Personalized shopping experience awaits
        </p>
      </Card>
    </div>
  );
};
