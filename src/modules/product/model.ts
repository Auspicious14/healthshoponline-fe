export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: IProductImage[];
  price: number;
  size: string;
  categories: [string];
  color: string;
  quantity: string;
}

export interface IProductImage {
  uri: string;
  name?: string;
  type?: string;
}
