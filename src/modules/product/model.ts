export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: IProductImage[];
  price: string;
  size: string;
  categories: [string];
  color: string;
  quantity: number;
}

export interface IProductImage {
  _id: string;
  uri: string;
  name?: string;
  type?: string;
}

export interface IProductFilter {
  brand: string;
  category: string;
  color: string;
}

export interface IReview {
  _id: string;
  title: string;
  description: string;
  rating: string;
  name: string;
  createdAt: string;
}
