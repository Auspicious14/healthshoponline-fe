import { Button, Space } from "antd";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { ApTextInput } from "../../../components";
import { useSignInState } from "./context";
import { ISignIn } from "./model";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("email is required").email(),
  password: Yup.string().required("password is required").min(6),
});

export const SignInPage = () => {
  const { handleSignUp, loading } = useSignInState();
  const router = useRouter();
  const handleSubmit = async (values: ISignIn) => {
    const res = handleSignUp(values);
    res.then((res) => {
      router.push("/");
    });
  };
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form className=" Form card px-4 ">
            <ApTextInput
              className="w-full p-4 mb-2 bg-stone-50 border-none"
              label="Email"
              name="email"
              type="email"
              placeHolder="Username"
            />

            <ApTextInput
              className="w-full p-4 mb-2 bg-stone-50 border-none"
              label="Password"
              name="password"
              type="password"
              placeHolder="*******"
            />

            <Button
              disabled={loading}
              type={"default"}
              htmlType={"submit"}
              loading={loading}
              className="text-center  "
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
