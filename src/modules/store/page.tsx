import React, { useEffect, useState } from "react";
import { useStoreState } from "./context";
import { Input, Spin } from "antd";
import { StoreListItem } from "./components/item";
// import Search from "antd/es/input/Search";
const { Search } = Input;

export const StorePage = () => {
  const { stores, loading, getStores } = useStoreState();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getStores();
  }, []);

  const handleSearch = (val: string) => {
    if (val === undefined) return;
    setFilter(val);
  };

  return (
    <div>
      <div className="md:mx-20 px-4 pt-20 md:p-0 ">
        <Search
          placeholder="search store"
          allowClear
          enterButton="Search"
          size="large"
          className="bg-blue-600 rounded-md md:mt-8"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {loading && (
          <Spin size="large" className="flex justify-center items-center" />
        )}
        {!loading && stores?.length > 0 ? (
          <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-4 my-2 p-4 align-middle rounded-lg">
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
