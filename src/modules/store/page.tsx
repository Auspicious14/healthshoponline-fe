import React, { useEffect } from "react";
import { useStoreState } from "./context";
import { Spin } from "antd";
import { StoreListItem } from "./components/item";

export const StorePage = () => {
  const { stores, loading, getStores } = useStoreState();

  useEffect(() => {
    getStores();
  }, []);

  console.log(stores, "ssss");

  return (
    <div>
      {loading && (
        <Spin size="large" className="flex justify-center items-center" />
      )}
      {!loading && stores?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 my-2 py-4 align-middle border-gray-200 border rounded-lg">
          {stores?.map((s) => (
            <StoreListItem store={s} key={s?._id} />
          ))}
        </div>
      ) : (
        !loading && stores?.length === 0 && <div>No stores...</div>
      )}
    </div>
  );
};
