import gql from "graphql-tag";

export default gql`
  subscription sub($filter: MessageSubscriptionFilter) {
    subscribeToMessage(mutations: [createMessage], filter: $filter) {
      edge {
        node {
          createdAt
          id
          content
          attachment {
            id
            blobUrl
            name
          }
          snippet {
            title
            lang
            code
          }
          channel {
            id
            name
            type
          }
          author {
            id
            username
            fullname
            avatar {
              blobUrl
            }
          }
        }
      }
    }
  }
`;
