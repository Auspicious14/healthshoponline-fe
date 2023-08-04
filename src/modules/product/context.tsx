import React, { useState } from "react";
import { apiReqHandler } from "../../components";
import { IProduct, IProductFilter, IReview } from "./model";
import { toast } from "react-toastify";

interface IProductState {
  loading: boolean;
  product: IProduct;
  products: IProduct[];
  reviews: IReview[];
  getProducts: (filter?: any) => Promise<void>;
  getReviews: (productId: string) => Promise<void>;
  getOneProduct: (productId: string) => Promise<void>;
  createProduct: (payload: IProduct) => Promise<void>;
  createReview: (payload: IReview) => Promise<void>;
  updateProduct: (payload: IProduct, productId: string) => Promise<void>;
  updateReview: (payload: IReview, productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

const ProductContext = React.createContext<IProductState>({
  loading: false,
  product: {} as any,
  products: [],
  reviews: [],
  getProducts() {
    return null as any;
  },
  getReviews(productId) {
    return {} as any;
  },
  getOneProduct(productId) {
    return null as any;
  },
  createReview(payload) {
    return null as any;
  },
  createProduct(payload) {
    return null as any;
  },
  updateProduct(payload, productId) {
    return null as any;
  },
  updateReview(payload, productId) {
    return null as any;
  },

  deleteProduct(productId) {
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
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [filter, setFilter] = useState<IProductFilter>();
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async (filter?: IProductFilter) => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/products`;
    if (filter?.brand) {
      url = `${url}?brand=${filter?.brand}`;
    } else if (filter?.color) {
      url = `${url}?color=${filter?.color}`;
    }
    console.log(filter?.brand);
    try {
      const res = await apiReqHandler({
        endPoint: url,
        method: "GET",
      });
      setLoading(false);
      const { data } = await res.res?.data;
      setProducts(data);
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

  const createProduct = async (payload: IProduct) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await fetch(`http://localhost:2000/product}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.json();
      setProducts([...data, products]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (payload: IProduct, productId: string) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await fetch(`http://localhost:2000/product/:${productId}}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/product/:${productId}}`, {
        method: "DELETE",
      });
      setLoading(false);
      const data = await res.json();
      setProducts(
        data.filter((del: IProduct, i: number) => del._id !== productId)
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createReview = async (payload: IReview) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/review`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data;
      if (data.success === false) {
        toast.error(data.message);
      }
      console.log(data);
      setReviews([...reviews, data.data]);
      toast.success(data.message);
      return data.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const getReviews = async (productId: string) => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/review/${productId}`;
    try {
      const res = await apiReqHandler({
        endPoint: url,
        method: "GET",
      });
      setLoading(false);
      const { data } = await res.res?.data;
      setReviews(data.review);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateReview = async (payload: IReview, productId: string) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/review/${productId}`,
        method: "PUT",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data;
      if (data.success === false) {
        toast.error(data.message);
      }
      console.log(data);
      setReviews(
        reviews?.map((r) => (r?._id == data?.data?._id ? data.data : r))
      );
      toast.success(data.message);
      return data.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        reviews,
        product,
        getProducts,
        getReviews,
        getOneProduct,
        createProduct,
        createReview,
        updateReview,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
