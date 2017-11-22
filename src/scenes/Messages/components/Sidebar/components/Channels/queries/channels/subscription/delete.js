import gql from "graphql-tag";

export const subscribeToDeleteChannel = gql`
  subscription subscribeToDeleteChannel($filter: ChannelSubscriptionFilter) {
    subscribeToChannel(mutations: [deleteChannel], filter: $filter) {
      value {
        id
      }
    }
  }
`;
