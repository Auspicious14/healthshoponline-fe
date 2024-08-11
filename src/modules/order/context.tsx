import React, { useState } from "react";
import { IOrder, IOrderStatus } from "./model";
import { apiReqHandler } from "../../components";
import { toast } from "react-toastify";

interface IOrderState {
  loading: boolean;
  order: IOrder;
  orders: IOrder[];
  createOrder: (payload: any) => Promise<void>;
  getOrderDetail: (order: string) => Promise<IOrder>;
  getUserOrders: (userId: string) => Promise<IOrder[]>;
  refund: (order: IOrder) => Promise<any>;
  updateOrderStatus: (orderId: string, status: IOrderStatus) => Promise<IOrder>;
}

const OrderContext = React.createContext<IOrderState>({
  loading: false,
  order: {} as any,
  orders: [],
  getUserOrders(payload) {
    return null as any;
  },
  getOrderDetail(order) {
    return null as any;
  },
  createOrder(payload) {
    return null as any;
  },
  refund(order) {
    return null as any;
  },
  updateOrderStatus(orderId, status) {
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

  const getUserOrders = async (userId: string): Promise<IOrder[]> => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/orders?userId=${userId}`,
        method: "GET",
      });
      setLoading(false);
      const data = await res?.res?.data?.data;
      setOrders(data);
      return data;
    } catch (error: any) {
      toast.error(error);
      return error;
    }
  };

  const getOrderDetail = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/order/${orderId}`,
        method: "GET",
      });
      setLoading(false);
      const data = await res?.res?.data?.data;
      console.log(data);
      setOrder(data);
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
  const updateOrderStatus = async (orderId: string, status: IOrderStatus) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/order/${orderId}`,
        method: "PUT",
        payload: JSON.stringify({ status }),
      });
      setLoading(false);
      const data = await res.res?.data;
      console.log(data.data);
      if (data) {
        toast.success("Order successfully placed.");
        setOrder(data.data);
        getOrderDetail(orderId);
      }
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const refund = async (order: IOrder) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/refund`,
        method: "POST",
        payload: JSON.stringify(order),
      });
      setLoading(false);
      const data = await res?.res?.data?.data;
      console.log(data);
      // setOrder(data);
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
        getOrderDetail,
        createOrder,
        refund,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
