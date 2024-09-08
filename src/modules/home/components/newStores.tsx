import React from "react";
import { ApImage } from "../../../components";
import Link from "next/link";
import { helper } from "../../../helper";
import { useStoreState } from "../../store/context";
import { IStore } from "../../store/model";

export const NewStores = () => {
  const { newStores } = useStoreState();

  return (
    <div className="grid gap-4 xl:lg:md:grid-cols-4 sm:grid-cols-3 grid-cols-2 align-middle">
      {newStores?.map((store: IStore) => (
        <div key={store?._id}>
          <div className="bg-white md:w-auto w-full shadow-md rounded-md transition-transform hover:shadow-lg hover:scale-105 flex flex-col justify-between h-full">
            <div>
              <Link href={`stores/${store?._id}/products`} className="">
                <div className="group relative">
                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                    <ApImage
                      //   key={store?.images[0]?._id}
                      src={store?.images[0]?.uri}
                      alt={store?.images[0]?.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      unoptimized
                    />
                  </div>
                  <div className="mt-4 mx-4">
                    {/* Product Name */}
                    <h3 className="text-gray-700 text-sm font-bold line-clamp-2 max-h-12 overflow-hidden">
                      {store?.storeName}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
