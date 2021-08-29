import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://reasonapps-gql-api.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
