import React from "react";
import { ApImage } from "../../../components";
import Link from "next/link";
import { helper } from "../../../helper";
import { IProduct } from "../../product/model";
import { useProductState } from "../../product/context";

export const NewArrivals = () => {
  const { newArrivals } = useProductState();

  return (
    <div className="grid gap-4 xl:lg:md:grid-cols-4 sm:grid-cols-3 grid-cols-2 align-middle">
      {newArrivals?.map((product: IProduct) => (
        <div key={product?._id}>
          <div className="bg-white md:w-auto w-full shadow-md rounded-md transition-transform hover:shadow-lg hover:scale-105 flex flex-col justify-between h-full">
            <div>
              <Link href={`/products/${product?._id}`} className="">
                <div className="group relative">
                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                    <ApImage
                      key={product?.images[0]?._id}
                      src={product?.images[0]?.uri}
                      alt={product?.images[0]?.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      unoptimized
                    />
                  </div>
                  <div className="mt-4 mx-4">
                    {/* Product Name */}
                    <h3 className="text-gray-700 text-sm font-bold line-clamp-2 max-h-12 overflow-hidden">
                      {product?.name}
                    </h3>

                    {/* Price */}
                    <p className="font-bold text-gray-900">
                      {helper.toCurrency(parseFloat(product?.price))}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Add to Cart Button */}
            {/* <div className="mt-4">
        <Button
          size="large"
          loading={loading}
          disabled={loading}
          onClick={handleAddToCart}
          className="text-white font-bold w-full text-center bg-[#1D2939] rounded-md"
        >
          + Add to Cart
        </Button>
      </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

{
  /* <div className="grid gap-4 sm:grid-cols-3 grid-cols-2">
{newArrivals?.map((p) => (
  <Link href={`/products/${p?._id}`} key={p?._id}>
    <div className="relative group">
      <div className="w-full h-60 overflow-hidden rounded-md bg-gray-200">
        <ApImage
          src={p?.images[0]?.uri}
          alt={p?.images[0]?.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="mt-4">
        <Text className="text-gray-700 font-bold">{p.name}</Text>
        <Text className="font-bold text-gray-900">
          {helper.toCurrency(parseFloat(p.price))}
        </Text>
      </div>
    </div>
  </Link>
))}
</div> */
}
