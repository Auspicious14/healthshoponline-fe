import React, { useState } from "react";
import { apiReqHandler } from "../../components";
import { IProduct, IProductFilter, IReview } from "./model";
import { toast } from "react-toastify";

interface IProductState {
  loading: boolean;
  totalRatings: number;
  product: IProduct;
  products: IProduct[];
  newArrivals: IProduct[];
  reviews: IReview[];
  setNewArrivals: (newArrivals: IProduct[]) => void;
  getProducts: (filter?: any) => Promise<void>;
  getReviews: (productId: string) => Promise<void>;
  createReview: (payload: IReview) => Promise<void>;
  updateReview: (payload: IReview, productId: string) => Promise<void>;
}

const ProductContext = React.createContext<IProductState>({
  loading: false,
  totalRatings: 0,
  product: {} as any,
  products: [],
  newArrivals: [],
  reviews: [],
  setNewArrivals(newArrivals) {},
  getProducts() {
    return null as any;
  },
  getReviews(productId) {
    return {} as any;
  },
  createReview(payload) {
    return null as any;
  },
  updateReview(payload, productId) {
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
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async (filter?: IProductFilter) => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/products`;
    if (filter?.brand) {
      url = `${url}?brand=${filter?.brand}`;
    } else if (filter?.color) {
      url = `${url}?color=${filter?.color}`;
    } else if (filter?.newArrival) {
      url = `${url}?newArrival=${filter?.newArrival}`;
    } else if (filter?.category) {
      url = `${url}?category=${filter?.category}`;
    } else if (filter?.size) {
      url = `${url}?size=${filter?.size}`;
    } else if (filter?.name) {
      url = `${url}?name=${filter?.name}`;
    } else {
      url = url;
    }

    try {
      const res = await apiReqHandler({
        endPoint: url,
        method: "GET",
      });
      setLoading(false);
      const { data } = await res.res?.data;
      setProducts(data);
    } catch (error: any) {
      toast.error(error);
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
      setTotalRatings(data.total);
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
        newArrivals,
        reviews,
        totalRatings,
        product,
        setNewArrivals,
        getProducts,
        getReviews,
        createReview,
        updateReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
