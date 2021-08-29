import useStore from "../store";

import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, description, children }) {
  const cart = useStore((state) => state.cart);
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Shop` : "Shop"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <div className="header mb-5 bg-gray-100 py-5">
        <div className="container max-w-screen-lg mx-auto flex px-2">
          <Link href="/">
            <a className="text-xl text-gray-900 hover:opacity-50">Home</a>
          </Link>
          <Link href="/products">
            <a className="text-xl text-gray-900 hover:opacity-50 ml-10">
              Products
            </a>
          </Link>
          <div className="ml-auto">
            <Link href="/cart">
              <a className="ml-10 text-gray-900 text-2xl flex hover:opacity-50 items-center">
                {cart.length > 0 && cart.length}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className=" container max-w-screen-lg mx-auto px-2">{children}</div>
    </div>
  );
}
