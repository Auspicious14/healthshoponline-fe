import { IProduct } from "../product/model";

export interface IFavorite {
  _id: string;
  product: IProduct;
  addToFavorite: boolean;
}

export interface IFavoriteQuery {
  productId: string;
  addToFavorite: boolean;
}
