import gql from "graphql-tag";

export default gql`
  {
    viewer {
      allMessages(where: { attachmentId: { isNull: false } }) {
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
