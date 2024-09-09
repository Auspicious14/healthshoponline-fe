import React from "react";
import { IStore } from "../model";
import Link from "next/link";
import { ApImage } from "../../../components";

interface IProps {
  store: IStore;
}
export const StoreListItem: React.FC<IProps> = ({ store }) => {
  return (
    <div className="bg-white md:w-auto w-full shadow-md rounded-md transition-transform hover:shadow-lg hover:scale-105 flex flex-col justify-between h-full">
      <div>
        <Link href={`/stores/${store?._id}/products`}>
          <div className="group relative">
            <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
              <ApImage
                key={store?.images[0]?.name}
                src={store?.images[0]?.uri}
                alt={store?.images[0]?.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                unoptimized
              />
            </div>
            <div className="mt-4 mx-4">
              <h3 className=" text-gray-700 text-sm font-bold">
                {store?.storeName?.length > 15
                  ? `${store?.storeName?.substring(0, 15)}...`
                  : store?.storeName}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
