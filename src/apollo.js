import ApolloClient from "apollo-client/ApolloClient";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws";
import { createNetworkInterface } from "apollo-client";

// creates a subscription ready Apollo Client instance

const graphqlUrl = process.env.REACT_APP_GQLURI;
const websocketUrl = process.env.REACT_APP_GQLWS;
const networkInterface = createNetworkInterface({
  uri: graphqlUrl
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      // Easy way to add authorization headers for every request
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      const token = localStorage.getItem("slackrToken");
      if (token) req.options.headers.authorization = `Bearer ${token}`;
      next();
    }
  }
]);
const wsClient = new SubscriptionClient(websocketUrl, { reconnect: true });
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const clientGraphql = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: {}
});

export default clientGraphql;
