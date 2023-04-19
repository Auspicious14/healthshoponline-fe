import React from "react";
import { CartContextProvider } from "../modules/cart/context";
import { CartPage } from "../modules/cart/page";

const Cart = () => {
  return (
    <div>
      <CartContextProvider>
        <CartPage />
      </CartContextProvider>
    </div>
  );
};

export default Cart;
