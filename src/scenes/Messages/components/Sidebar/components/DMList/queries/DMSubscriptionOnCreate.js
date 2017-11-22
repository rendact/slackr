import gql from "graphql-tag";

export const dmSubscriptionOnCreate = gql`
  subscription dmSubsOnCreate($filter: ChannelSubscriptionFilter) {
    subscribeToChannel(mutations: [createChannel], filter: $filter) {
      edge {
        node {
          id
          name
          type
          participants {
            edges {
              node {
                id
                username
              }
            }
          }
        }
      }
    }
  }
`;
