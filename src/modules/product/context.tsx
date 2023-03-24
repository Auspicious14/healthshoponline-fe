import React, { useState } from "react";
import { IProduct } from "./model";

interface IProductState {
  loading: boolean;
  product: IProduct;
  products: IProduct[];
  getProducts: (payload: IProduct) => Promise<void>;
  getOneProduct: (productId: string) => Promise<void>;
}

const ProductContext = React.createContext<IProductState>({
  loading: false,
  product: {} as any,
  products: [],
  getProducts(payload) {
    return null as any;
  },
  getOneProduct(productId) {
    return null as any;
  },
});

export const useProductState = () => {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ProductContextProvider: React.FC<IProps> = ({ children }) => {
  const [product, setProduct] = useState<IProduct>() as any;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async (payload: IProduct) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await fetch("http://localhost:2000/products", {
        method: "GET",
      });
      setLoading(false);
      const data = await res.json();
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneProduct = async (productId: string) => {
    setLoading(true);
    console.log(JSON.stringify(productId));
    try {
      const res = await fetch(`http://localhost:2000/product/:${productId}`, {
        method: "GET",
      });
      setLoading(false);
      const data = await res.json();
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ loading, products, product, getProducts, getOneProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
