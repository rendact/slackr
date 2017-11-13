import ApolloClient from "apollo-client";
import { split, ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";

class CustomWebSocketLink extends ApolloLink {
  constructor(client) {
    super();
    this.client = client;
  }

  request(operation, forward) {
    return this.client.request(operation);
  }
}

const token = localStorage.getItem("slackrToken");

const wsClient = new SubscriptionClient(
  "wss://us-west-2.api.scaphold.io/graphql/slack-slack-me",
  {
    reconnect: true,
    timeout: 2000
  }
);

const wsLink = new CustomWebSocketLink(wsClient);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GQLURI
});

const authLink = setContext((_, { headers }) => {
  // got error here, when no token provided. always return 401 unauthorized error.
  // so, i make checking. if there token, this will use authorization header. otherwise
  // use default headers
  const token = localStorage.getItem("slackrToken");

  if (token)
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };

  return { headers: { ...headers } };
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);
export default new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});
