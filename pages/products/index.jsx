import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

import Link from "next/link";
import Layout from "../../components/layout";
import Product from "../../components/product";

export default function Products({ products }) {
  const [inputVal, setInputVal] = useState("");
  const [foundProducts, setFoundProducts] = useState([]);

  function handleChange(e) {
    setInputVal(e.target.value);
    setFoundProducts(
      products.filter((item) =>
        item.name.toLowerCase().includes(inputVal.toLowerCase())
      )
    );
  }

  return (
    <Layout>
      <h1 className="text-5xl text-gray-900 font-medium text-center">
        Products
      </h1>
      <div className="mx-auto flex flex-col items-center mt-5 mb-30  md:max-w-lg  relative z-40">
        <input
          className="px-2 py-1 rounded-md border border-gray-300 text-gray-500 text-sm w-full focus:outline-none"
          placeholder="Search products..."
          value={inputVal}
          onChange={handleChange}
        />
        {foundProducts.length > 0 && inputVal && (
          <div className="absolute left-0 bg-white top-6 text-gray-500 border-t-0 border border-gray-300 rounded-b-md w-full px-2 py-2">
            {foundProducts.slice(0, 7).map((item) => (
              <div key={item.id}>
                <Link href={`/products/${item.slug}`}>
                  <a className="hover:text-gray-400">{item.name}</a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-around lg:justify-between relative z-10">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Product {
        products {
          id
          name
          slug
          image
          price
          description
        }
      }
    `,
  });

  return {
    props: {
      products: data.products,
    },
  };
}
