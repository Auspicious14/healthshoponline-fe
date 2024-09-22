import React, { useState } from "react";
import { apiReqHandler } from "../../components";
import { IFavoriteQuery, IFavorite } from "./model";
import { toast } from "react-toastify";
import { IProduct } from "../product/model";

interface IFavoriteState {
  loading: boolean;
  product: Partial<IProduct>;
  favorites: IFavorite[];
  getFavorites: () => Promise<void>;
  saveFavorite: (payload: IFavoriteQuery) => Promise<void>;
}

const FavoriteContext = React.createContext<IFavoriteState>({
  loading: false,
  product: {} as IProduct,
  favorites: [],
  getFavorites() {
    return null as any;
  },
  saveFavorite(payload) {
    return null as never;
  },
});

export const useFavoriteState = () => {
  const context = React.useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const FavoriteContextProvider: React.FC<IProps> = ({ children }) => {
  const [product, setProduct] = useState<Partial<IProduct>>({});
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getFavorites = async () => {
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/favorites`;
    try {
      const res = await apiReqHandler({
        endPoint: url,
        method: "GET",
      });
      setLoading(false);
      const { data } = await res.res?.data;
      console.log(data, "ddd");
      setFavorites(data.data);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const saveFavorite = async (payload: IFavoriteQuery) => {
    const endPoint = `${process.env.NEXT_PUBLIC_API_ROUTE}/favorite/save`;
    const method = "PUT";

    try {
      const res = await apiReqHandler({
        endPoint,
        method,
        payload: JSON.stringify(payload),
      });
      const data = await res.res?.data;

      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      const updatedProduct: IProduct =
        payload.productId === data.product._id ? data.data.product : product;

      setFavorites(
        favorites?.map((f) => (f?._id === data?.data?._id ? data.data : f))
      );
      setProduct(updatedProduct);
    } catch (error: any) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add product to wishlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        loading,
        favorites,
        product,
        getFavorites,
        saveFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
