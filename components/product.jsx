import useStore from "../store";

import Link from "next/link";
import Button from "./button";
import Image from "next/image";

export default function Product({ product }) {
  const addProductToCart = useStore((state) => state.addProductToCart);

  function handleSubmit(product) {
    product.quantity = 1;
    addProductToCart(product);
  }

  return (
    <div key={product.id} className="mt-10 sm:mx-3 lg:mx-0">
      <Link href={`/products/${product.slug}`} passHref>
        <a className="group flex flex-col">
          <Image
            src={product.image}
            height={400}
            width={400}
            alt={product.name}
            className="hover:transform group-hover:scale-105 transition duration-500 ease-in-out"
          />
          <p className="text-3xl text-gray-900 group-hover:text-opacity-50 transition duration-500 ease-in-out">
            {product.name}
          </p>
        </a>
      </Link>
      <div className="flex justify-between items-center mt-2">
        <Button callback={() => handleSubmit(product)}>buy</Button>
        <p className="text-xl text-gray-900 font-medium">{product.price}$</p>
      </div>
    </div>
  );
}
