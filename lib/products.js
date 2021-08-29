import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getProductIds() {
  const products = await client.query({
    query: gql`
      query Product {
        products {
          slug
        }
      }
    `,
  });

  return products.data.products;
}
