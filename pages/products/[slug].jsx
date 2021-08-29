import { useState, useEffect } from "react";
import useStore from "../../store";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { getProductIds } from "../../lib/products";

import Image from "next/image";
import Button from "../../components/button";
import Layout from "../../components/layout";

export default function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addProductToCart = useStore((state) => state.addProductToCart);
  const clearAddedProduct = useStore((state) => state.clearAddedProduct);
  const addedProduct = useStore((state) => state.addedProduct);

  function handleSubmit(product) {
    product.quantity = quantity;
    addProductToCart(product);
  }

  function increment() {
    setQuantity(quantity + 1);
  }

  function onChange(e) {
    setQuantity(e.target.value);
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  useEffect(() => {
    if (addedProduct) {
      const interval = setInterval(() => {
        clearAddedProduct();
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [addedProduct, clearAddedProduct]);

  return (
    <Layout title={product.name} description={product.description}>
      <div className="flex flex-col md:grid grid-cols-12 items-center md:items-start">
        <div className="col-span-4">
          <Image
            priority
            src={product.image}
            height={400}
            width={400}
            alt={product.name}
          />
        </div>
        <div className="col-span-8 md:ml-6">
          <p className="text-3xl font-medium text-center md:text-left">
            {product.name}
          </p>
          <p className="text-xl font-medium text-center md:text-left">
            {product.price}$
          </p>

          <div className="flex flex-col justify-center md:grid md:grid-cols-12 items-center">
            <div className="flex flex-row h-10 rounded-lg relative bg-transparent mt-2 mb-2 md:col-start-1 md:col-end-5">
              <button
                onClick={decrement}
                data-action="decrement"
                className="bg-gray-100 text-gray-900 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="number"
                className="appearance-none outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                name="custom-input-number"
                value={quantity}
                onChange={onChange}
              ></input>
              <button
                onClick={increment}
                data-action="increment"
                className="bg-gray-100 text-gray-900 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer"
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
            <div className="w-sm md:col-end-8 md:col-span-2  ">
              <Button callback={() => handleSubmit(product)}>Buy</Button>
            </div>
          </div>
          <div>
            {addedProduct.id === product.id ? (
              <p className="text-green-500 transition duration-300 ease-in-out">
                Item has been added to your cart.
              </p>
            ) : (
              <p className="opacity-0">i</p>
            )}
          </div>
          <p className="text-xl text-justify sm:max-w-lg md:max-w-full">
            {product.description}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const query = gql`
    query Product($slug: String) {
      products(slug: $slug) {
        id
        name
        slug
        image
        price
        description
      }
    }
  `;
  const { data } = await client.query({
    query: query,
    variables: {
      slug: slug,
    },
  });

  return {
    props: {
      product: data.products[0],
    },
  };
}

export async function getStaticPaths() {
  const paths = await getProductIds();

  return {
    paths: paths.map((path) => ({
      params: {
        slug: path.slug,
      },
    })),
    fallback: false,
  };
}
