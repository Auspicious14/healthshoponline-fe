import React, { useState } from "react";
import { apiReqHandler } from "../../components";
import { toast } from "react-toastify";

interface IPaymentState {
  loading: boolean;
  payWithPayStack: (payload: any) => Promise<void>;
}

const PaymentContext = React.createContext<IPaymentState>({
  loading: false,
  payWithPayStack(payload) {
    return null as any;
  },
});

export const usePaymentState = () => {
  const context = React.useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const PaymentContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const payWithPayStack = async (payload: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/payment`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data?.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        loading,
        payWithPayStack,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
