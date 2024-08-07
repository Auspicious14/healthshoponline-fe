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
  rating: string | number;
}

export interface IProductImage {
  _id: string;
  uri: string;
  name: string;
  type: string;
}

export interface IProductFilter {
  brand?: string;
  category?: string;
  color?: string;
  size?: string;
  newArrival?: string;
  name?: string;
  storeId?: string;
}

export interface ICategoryFilterProps {
  name: string;
  id: string;
  options: {
    checked: boolean;
    value: string;
    label: string;
  }[];
}
export interface IReview {
  _id: string;
  title: string;
  description: string;
  rating: number;
  user: IUser;
  createdAt: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export let filters = [
  {
    id: "brand",
    name: "BRAND",
    options: [
      { value: "Kedi", label: "kedi", checked: false },
      { value: "tuyil", label: "Tuyil", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "color",
    name: "COLOR",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "size",
    name: "SIZE",
    options: [
      { value: "xs", label: "Extra small", checked: false },
      { value: "sm", label: "Small", checked: false },
      { value: "lg", label: "Large", checked: false },
    ],
  },
];
