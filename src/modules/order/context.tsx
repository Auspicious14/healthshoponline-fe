import React, { useState } from "react";
import { IOrder } from "./model";
import { apiReqHandler } from "../../components";
import { toast } from "react-toastify";

interface IOrderState {
  loading: boolean;
  order: IOrder;
  orders: IOrder[];
  createOrder: (payload: any) => Promise<void>;
  getUserOrders: (userId: string) => Promise<void>;
}

const OrderContext = React.createContext<IOrderState>({
  loading: false,
  order: {} as any,
  orders: [],
  getUserOrders(payload) {
    return null as any;
  },
  createOrder(payload) {
    return null as any;
  },
});

export const useOrderState = () => {
  const context = React.useContext(OrderContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const OrderContextProvider: React.FC<IProps> = ({ children }) => {
  const [order, setOrder] = useState<IOrder>() as any;
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserOrders = async (userId: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/order/${userId}`,
        method: "GET",
      });
      setLoading(false);
      const data = await res?.res?.data?.data;
      setOrders(data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const createOrder = async (payload: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/order`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data;
      if (data) {
        toast.success("Order successfully placed.");
        setOrders(data.data);
      }
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        loading,
        order,
        orders,
        getUserOrders,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
