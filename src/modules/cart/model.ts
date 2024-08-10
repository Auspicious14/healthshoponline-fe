import { IProduct } from "../product/model";
import { IStore } from "../store/model";

export interface ICart {
  _id: string;
  userId?: string;
  amount?: number;
  product: IProduct;
  store: IStore;
  quantity: number;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}
