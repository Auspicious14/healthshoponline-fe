import React, { useState } from "react";
import { ICart } from "./model";
import { apiReqHandler } from "../../components";
import { toast } from "react-toastify";

interface ICartState {
  loading: boolean;
  cart: ICart;
  carts: ICart[];
  addToCart: (payload: any) => Promise<void>;
  updateCartItem: (payload: any, cartId: string) => Promise<void>;
  deleteCartItem: (cartId: string) => Promise<void>;
  getCart: (userId: string) => Promise<void>;
  emptyCart: (userId: string) => Promise<void>;
}

const CartContext = React.createContext<ICartState>({
  loading: false,
  cart: {} as any,
  carts: [],
  getCart(payload) {
    return null as any;
  },
  addToCart(cartId) {
    return null as any;
  },
  updateCartItem(payload, cartId) {
    return null as any;
  },
  deleteCartItem(cartId) {
    return null as any;
  },
  emptyCart(userId) {
    return null as any;
  },
});

export const useCartState = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const CartContextProvider: React.FC<IProps> = ({ children }) => {
  const [cart, setcart] = useState<ICart>() as any;
  const [carts, setCarts] = useState<ICart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCart = async (id: string) => {
    setLoading(true);
    // console.log(JSON.stringify(userId));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/cart/${id}`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      setCarts(data.data);
      console.log(data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (payload: any) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/cart`,
        method: "POST",
        payload: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res.res?.data;
      setcart(data);
      toast.success("Product is added to cart");
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const deleteCartItem = async (cartId: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/cart/${cartId}`,
        method: "DELETE",
      });

      setLoading(false);
      const data = await res.res?.data;
      if (data) {
        setCarts(carts?.filter((c, i) => c._id !== cartId));
        console.log(data.data);
        toast.success(data.data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateCartItem = async (payload: any, cartId: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/cart/${cartId}`,
        method: "PUT",
        payload: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res?.res?.data;
      if (data) {
        setCarts(carts?.map((c) => (c._id == data?._id ? data : c)));
        console.log(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const emptyCart = async (id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/cart/delete/${id}`,
        method: "DELETE",
        // payload: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res?.res?.data;
      if (data) {
        // setCarts(carts?.map((c) => (c._id == data?._id ? data : c)));
        console.log(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        carts,
        getCart,
        addToCart,
        updateCartItem,
        deleteCartItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
