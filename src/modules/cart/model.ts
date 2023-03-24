import { IProduct } from "../product/model";

export interface ICart {
  userId: string;
  products: IProduct[];
  quantity: string;
}
