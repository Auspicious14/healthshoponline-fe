import React, { useEffect, useState } from "react";
import { useStoreState } from "./context";
import { Input, Spin } from "antd";
import { StoreListItem } from "./components/item";
import { Footer } from "../../components";
// import Search from "antd/es/input/Search";
const { Search } = Input;

export const StorePage = () => {
  const { stores, loading, getStores } = useStoreState();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getStores(filter);
  }, [filter]);

  const handleSearch = (val: string) => {
    if (val === undefined) return;
    setFilter(val);
  };

  return (
    <div className="mt-24">
      <div className="md:mx-20 md:p-0 ">
        {/* <Search
          placeholder="Search store"
          allowClear
          enterButton="Search"
          size="large"
          className="bg-blue-600 rounded-md md:mt-8"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        /> */}
        {loading && (
          <Spin
            size="large"
            className="flex justify-center items-center my-auto"
          />
        )}
        {!loading && stores?.length > 0 ? (
          <div className="bg-white grid md:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-4 my-2 p-4 align-middle rounded-lg">
            {stores?.map((s) => (
              <StoreListItem store={s} key={s?._id} />
            ))}
          </div>
        ) : (
          !loading && stores?.length === 0 && <div>No stores...</div>
        )}
      </div>
    </div>
  );
};
