import gql from "graphql-tag";

export const messageSubscription = gql`
  subscription sub($filter: MessageSubscriptionFilter) {
    subscribeToMessage(mutations: [createMessage], filter: $filter) {
      edge {
        node {
          id
          content
          author {
            id
            username
          }
        }
      }
    }
  }
`;
