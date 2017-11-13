import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GQLURI
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("slackrToken");

  // got error here, when no token provided. always return 401 unauthorized error.
  // so, i make checking. if there token, this will use authorization header. otherwise
  // use default headers

  if (token)
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };

  return { headers: { ...headers } };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
