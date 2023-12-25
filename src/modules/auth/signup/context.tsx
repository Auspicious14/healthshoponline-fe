import React, { useState } from "react";
import { ISignUp } from "./model";
import { apiReqHandler } from "../../../components";
import { toast } from "react-toastify";
import { setCookie } from "../../../helper";

interface ISignUpState {
  loading: boolean;
  handleSignUp: (user: any) => Promise<void>;
}

const SignUpContext = React.createContext<ISignUpState>({
  loading: false,
  handleSignUp(user) {
    return null as any;
  },
});

export const useSignUpState = () => {
  const context = React.useContext(SignUpContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const SignUpContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (user: ISignUp) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/signup`,
        method: "POST",
        payload: JSON.stringify(user),
      });
      setLoading(false);
      const data = await res.res?.data;
      setCookie("user_id", data?.user?._id, 3);
      if (res?.res?.status === 200) {
        if (data.error) {
          toast.error(data.error);
        }
      }
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <SignUpContext.Provider value={{ handleSignUp, loading }}>
      {children}
    </SignUpContext.Provider>
  );
};
