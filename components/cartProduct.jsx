import Link from "next/link";
import Image from "next/image";
import DeleteBtn from "./deleteBtn";

export default function CartProduct({ product, callback }) {
  return (
    <div className="grid grid-cols-12 items-center mt-5 text-gray-900">
      <div className="col-span-12 flex flex justify-center sm:justify-start sm:col-span-1  place-items: center;	 ">
        <Image
          priority
          className="text-lg self-center "
          src={product.image}
          height={200}
          width={200}
          alt={product.name}
        />
      </div>
      <Link href={`/products/${product.slug}`}>
        <a className="col-span-12 sm:col-span-5 sm:ml-2 flex justify-center sm:justify-start text-lg  hover:opacity-50">
          {product.name}
        </a>
      </Link>
      <p className="col-span-12 sm:col-span-2 flex justify-center sm:justify-start text-lg">
        {product.price}$
      </p>

      <p className="col-span-12 sm:col-span-2 flex justify-center sm:justify-start text-lg sm:font-semibold ">
        <span className="sm:hidden ">Qty: </span>
        {product.quantity}
      </p>
      <div className="col-span-12 sm:col-span-2 flex flex-col items-center sm:flex-row  sm:justify-between ">
        <p className="text-lg font-semibold">
          <span className="sm:hidden ">Total: </span>
          {(product.quantity * product.price).toFixed(2)}$
        </p>
        <DeleteBtn callback={() => callback(product.id)} />
      </div>
    </div>
  );
}
