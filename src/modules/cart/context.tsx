import React, { useState } from "react";
import { ICart } from "./model";

interface ICartState {
  loading: boolean;
  cart: ICart;
  addToCart: (payload: ICart) => Promise<void>;
  updateCartItem: (payload: ICart, cartId: string) => Promise<void>;
  deleteCartItem: (cartId: string) => Promise<void>;
  getCart: (userId: string) => Promise<void>;
}

const CartContext = React.createContext<ICartState>({
  loading: false,
  cart: {} as any,
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
  const [loading, setLoading] = useState<boolean>(false);

  const getCart = async (userId: string) => {
    setLoading(true);
    console.log(JSON.stringify(userId));
    try {
      const res = await fetch(`http://localhost:2000/cart/:${userId}`, {
        method: "GET",
      });
      setLoading(false);
      const data = await res.json();
      setcart(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (payload: ICart) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await fetch(`http://localhost:2000/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res.json();
      setcart(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (cartId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/cart/${cartId}`, {
        method: "DELETE",
      });

      setLoading(false);
      const data = await res.json();
      setcart(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateCartItem = async (payload: ICart, cartId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/cart/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res.json();
      setcart(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        getCart,
        addToCart,
        updateCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
