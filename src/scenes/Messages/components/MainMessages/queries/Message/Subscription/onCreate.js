import gql from "graphql-tag";

export const messageSubscription = gql`
  subscription sub($filter: MessageSubscriptionFilter) {
    subscribeToMessage(mutations: [createMessage], filter: $filter) {
      edge {
        node {
          createdAt
          id
          content
          attachment {
            blobUrl
            name
          }
          author {
            id
            username
            avatar {
              blobUrl
            }
          }
        }
      }
    }
  }
`;
