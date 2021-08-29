import Layout from "../components/layout";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Product from "../components/product";

export default function Home({ products }) {
  return (
    <Layout>
      <div className="">
        <h1 className="text-gray-900 text-5xl font-medium text-center mb-12">
          Shop
        </h1>
        <div className="mt-10 mb-20 flex flex-row flex-wrap justify-around lg:justify-between">
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
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
      products: data.products.slice(0, 4),
    },
  };
}
