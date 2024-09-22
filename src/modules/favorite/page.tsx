// pages/FavoritePage.tsx
import React, { useEffect, useState } from "react";
import { List, message } from "antd";
import { FavoriteListItem } from "./components/item";
import { useFavoriteState } from "./context";
import { IFavoriteQuery } from "./model";

export const FavoritePage: React.FC = () => {
  const { favorites, getFavorites } = useFavoriteState();

  useEffect(() => {
    getFavorites();
  }, []);

  const removeFavorite = (payload: IFavoriteQuery, id: string) => {
    // updateFavorite(payload, id);
    // message.success("Product removed from favorites");
  };

  return (
    <div className=" py-6 mt-28 xl:mx-20 md:p-0">
      <h1 className="lg:text-2xl text-xl font-semibold mb-4">My Wishlist</h1>

      {favorites?.length ? (
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
                onRemove={(id) =>
                  removeFavorite(
                    { addToFavorite: true, productId: f.product._id },
                    id
                  )
                }
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
