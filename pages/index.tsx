import type { NextPage } from "next";
import FloatingButton from "@/components/floating-button";
import Item from '@/components/item';
import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';
import Head from "next/head";
import useSWR from 'swr';
import { Product } from "@prisma/client";

interface ProductWithCount extends Product {
  _count: {
    favorites: number
  }
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[]
}

const Home: NextPage = () => {
  const {user, isLoading} = useUser();
  const {data} = useSWR<ProductsResponse>("/api/products")
  console.log(data)
  return (
    <Layout title="Home" hasTabBar>
      <Head><title>Home</title></Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product._count.favorites}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
