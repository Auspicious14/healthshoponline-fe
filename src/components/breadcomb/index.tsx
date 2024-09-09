import Link from "next/link";
import { useRouter } from "next/router";
import { ICategory } from "../../modules/category/model";
import { IProduct } from "../../modules/product/model";

interface IProps {
  category?: ICategory;
  product?: IProduct;
  label: string;
}
export const Breadcrumb: React.FC<IProps> = ({ label, category, product }) => {
  const router = useRouter();

  return (
    <nav className="text-gray my-4 text-sm">
      <ul className="flex space-x-2">
        {/* Home link */}
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>/</li>

        {/* <li>
          <Link href={`/${label}`} className="hover:underline">
            {label}
          </Link>
        </li>
        <li>/</li> */}

        <li>{category ? category?.name : product?.name}</li>
      </ul>
    </nav>
  );
};
