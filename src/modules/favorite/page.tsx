import React, { useEffect, useState } from "react";
import { List } from "antd";
import { FavoriteListItem } from "./components/item";
import { useFavoriteState } from "./context";
import { IFavoriteQuery } from "./model";

interface IProps {
  userId: string;
}
export const FavoritePage: React.FC<IProps> = ({ userId }) => {
  const { loading, favorites, getFavorites, deleteFavorite } =
    useFavoriteState();

  useEffect(() => {
    getFavorites();
  }, []);

  const removeFavorite = (id: string) => {
    deleteFavorite(id);
  };

  return (
    <div className=" py-6 mt-28 xl:mx-20 md:p-0">
      <h1 className="lg:text-2xl text-xl font-semibold mb-4">My Wishlist</h1>

      {!loading && favorites?.length > 0 ? (
        <List
          grid={{
            gutter: 12,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 6,
          }}
          dataSource={favorites}
          renderItem={(f) => (
            <List.Item key={f._id}>
              <FavoriteListItem
                favorite={f}
                onRemove={(id) => removeFavorite(f._id)}
                userId={userId}
              />
            </List.Item>
          )}
        />
      ) : (
        <p className="text-center text-lg">
          You have no favorite products yet.
        </p>
      )}
    </div>
  );
};
