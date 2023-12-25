import React, { useState } from "react";
import { apiReqHandler } from "../../../components";
import { setCookie } from "../../../helper";
import { toast } from "react-toastify";

interface IVerifyState {
  loading: boolean;
  handleVerifyOTP: (user: any) => Promise<void>;
}

const VerifyOTPContext = React.createContext<IVerifyState>({
  loading: false,
  handleVerifyOTP(user) {
    return null as any;
  },
});

export const useVerifyOTPState = () => {
  const context = React.useContext(VerifyOTPContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const VerifyOTPContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerifyOTP = async (params: any) => {
    setLoading(true);
    try {
      const response = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/verify`,
        method: "POST",
        payload: JSON.stringify(params),
      });
      setLoading(false);
      const data = await response.res?.data;
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <VerifyOTPContext.Provider value={{ handleVerifyOTP, loading }}>
      {children}
    </VerifyOTPContext.Provider>
  );
};
