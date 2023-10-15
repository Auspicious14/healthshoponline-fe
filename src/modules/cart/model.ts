import { IProduct } from "../product/model";

export interface ICart {
  _id: string;
  userId?: string;
  amount?: number;
  product: IProduct;
  quantity: number;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}
