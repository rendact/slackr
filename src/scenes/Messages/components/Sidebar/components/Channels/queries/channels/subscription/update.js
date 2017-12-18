import gql from "graphql-tag";

export default gql`
  subscription subscribeToUpdateChannel($filter: ChannelSubscriptionFilter) {
    subscribeToChannel(mutations: [updateChannel], filter: $filter) {
      value {
        id
        name
      }
    }
  }
`;
