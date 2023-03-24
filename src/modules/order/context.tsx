import React, { useState } from "react";
import { IOrder } from "./model";

interface IOrderState {
  loading: boolean;
  order: IOrder;
  placeOrder: (payload: IOrder) => Promise<void>;
  updateOrderItem: (payload: IOrder, cartId: string) => Promise<void>;
  getOrder: (userId: string) => Promise<void>;
}

const OrderContext = React.createContext<IOrderState>({
  loading: false,
  order: {} as any,
  getOrder(payload) {
    return null as any;
  },
  placeOrder(cartId) {
    return null as any;
  },
  updateOrderItem(payload, cartId) {
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
  const [loading, setLoading] = useState<boolean>(false);

  const getOrder = async (userId: string) => {
    setLoading(true);
    console.log(JSON.stringify(userId));
    try {
      const res = await fetch(`http://localhost:2000/order/:${userId}`, {
        method: "GET",
      });
      setLoading(false);
      const data = await res.json();
      setOrder(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async (payload: IOrder) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await fetch(`http://localhost:2000/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res.json();
      setOrder(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderItem = async (payload: IOrder, orderId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/order/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res.json();
      setOrder(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        loading,
        order,
        getOrder,
        placeOrder,
        updateOrderItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
