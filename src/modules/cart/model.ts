import { IProduct } from "../product/model";

export interface ICart {
  _id: string;
  userId?: string;
  amount?: number;
  product: ICartProduct;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}
