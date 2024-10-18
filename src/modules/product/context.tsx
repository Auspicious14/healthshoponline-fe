import React, { useState } from "react";
import { apiReqHandler } from "../../components";
import { IProduct, IProductFilter, IProductImage, IReview } from "./model";
import { toast } from "react-toastify";

interface IProductState {
  loading: boolean;
  totalRatings: number;
  totalRecords: number;
  product: IProduct;
  products: IProduct[];
  collections: IProduct[];
  newArrivals: IProduct[];
  relatedProducts: IProduct[];
  reviews: IReview[];
  setNewArrivals: (newArrivals: IProduct[]) => void;
  setCollections: (products: IProduct[]) => void;
  setRelatedProducts: (products: IProduct[]) => void;
  getProducts: (filter?: any) => Promise<void>;
  getNewArrivals: () => Promise<void>;
  getReviews: (productId: string) => Promise<void>;
  createReview: (payload: IReview) => Promise<void>;
  updateReview: (payload: IReview, productId: string) => Promise<void>;
  getProductsByImage: (file: IProductImage) => Promise<any>;
}

const ProductContext = React.createContext<IProductState>({
  loading: false,
  totalRatings: 0,
  totalRecords: 0,
  product: {} as any,
  products: [],
  newArrivals: [],
  collections: [],
  relatedProducts: [],
  reviews: [],
  setNewArrivals(newArrivals) {},
  getProducts() {
    return null as any;
  },
  getNewArrivals() {
    return null as any;
  },
  getReviews(productId) {
    return null as any;
  },
  getProductsByImage(file) {
    return null as any;
  },
  createReview(payload) {
    return null as any;
  },
  updateReview(payload, productId) {
    return null as any;
  },
  setCollections(products) {},
  setRelatedProducts(products) {},
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
  const [collections, setCollections] = useState<IProduct[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async (filter?: IProductFilter) => {
    setLoading(true);
    const query = new URLSearchParams(filter as any).toString();
    const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/products?${query}`;
    try {
      const res = await apiReqHandler({
        endPoint: url,
        method: "GET",
      });

      const { data } = await res.res?.data;
      setProducts(data.data);
      setTotalRecords(data.totalRecords);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getNewArrivals = async () => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/products?newArrival=true`,
        method: "GET",
      });

      setLoading(false);
      const { data } = await res.res?.data;
      setNewArrivals(data.data);
      if (data.success === false) {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const getProductsByImage = async (file: IProductImage) => {
    setLoading(true);
    const { name, uri, type } = file;
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/products/search-by-image`,
        method: "POST",
        payload: JSON.stringify({ file: { name, uri, type } }),
      });

      const { data } = await res.res?.data;
      setProducts(data);
      setTotalRecords(data.totalRecords);
      return data;
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (payload: IReview) => {
    setLoading(true);
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
      toast.error(error);
    } finally {
      setLoading(false);
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
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const updateReview = async (payload: IReview, productId: string) => {
    setLoading(true);
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
      setReviews(
        reviews?.map((r) => (r?._id == data?.data?._id ? data.data : r))
      );
      toast.success(data.message);
      return data.data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        totalRecords,
        products,
        collections,
        newArrivals,
        relatedProducts,
        reviews,
        totalRatings,
        product,
        setNewArrivals,
        getProducts,
        getProductsByImage,
        getNewArrivals,
        getReviews,
        createReview,
        updateReview,
        setCollections,
        setRelatedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
