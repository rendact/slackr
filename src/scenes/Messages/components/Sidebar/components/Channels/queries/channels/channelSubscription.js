import gql from "graphql-tag";

export const channelSubscription = gql`
  subscription channelSubs($filter: ChannelSubscriptionFilter) {
    subscribeToChannel(mutations: [createChannel], filter: $filter) {
      edge {
        node {
          id
          name
          type
        }
      }
    }
  }
`;
