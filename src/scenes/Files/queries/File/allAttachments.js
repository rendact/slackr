import gql from "graphql-tag";

export default gql`
  query allFiles($userId: ID!) {
    viewer {
      allMessages(
        where: {
          attachmentId: { isNull: false }
          channel: { participants: { node: { id: { eq: $userId } } } }
        }
      ) {
        edges {
          node {
            attachment {
              blobUrl
              id
              name
            }
            author {
              username
              id
              fullname
            }
            channel {
              id
              name
              type
            }
            createdAt
          }
        }
      }
    }
  }
`;
