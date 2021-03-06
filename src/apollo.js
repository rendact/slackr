import ApolloClient from "apollo-client/ApolloClient";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws-race";
import { createNetworkInterface } from "./custom-network-interface";
import { store } from "index";

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
      if (token) req.options.headers.Authorization = `Bearer ${token}`;
      next();
    }
  }
]);

networkInterface.useAfter([
  {
    applyAfterware({ response }, next) {
      if (response.status === 401) {
        localStorage.removeItem("slackrToken");
        localStorage.removeItem("slackrUserId");
        store.dispatch({ type: "UNAUTHORIZED_ERROR" });
      }
      next();
    }
  }
]);

const wsClient = new SubscriptionClient(websocketUrl, {
  reconnect: true,
  timeout: 20000,
  connectionParams: () => {
    return {
      Authorization: `Bearer ${localStorage.getItem("slackrUserId")}`
    };
  }
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const clientGraphql = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: {}
});

export default clientGraphql;
