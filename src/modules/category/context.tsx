import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { ICategory } from "./model";

interface ICategoryState {
  loading: boolean;
  categories: ICategory[];
  setCategories: (category: ICategory[]) => void;
  getCategories: (query?: any) => Promise<void>;
}

const CategoryContext = React.createContext<ICategoryState>({
  loading: false,
  categories: [],
  setCategories(category) {},
  getCategories() {
    return null as any;
  },
});

export const useCategorystate = () => {
  const context = React.useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const CategoryContextProvider: React.FC<IProps> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCategories = async (query?: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      setCategories(data.data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        loading,
        categories,
        getCategories,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
