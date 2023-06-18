import { ApolloClient, InMemoryCache, gql, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URL } from "../../config";


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem('token');
    // return the headers to the context so httpLink can read them

    // set header for CORS
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      }
    }
  });

  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;