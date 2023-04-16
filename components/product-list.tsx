
import { Product } from "@prisma/client";
import useSWR from "swr";
import Item from "./item";

interface ProductWithCount extends Product {
    _count: {
      favorites: number
      comments: number
    }
  }

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          imageId={record.product.image}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favorites}
        />
      ))}
    </>
  ) : null;
}