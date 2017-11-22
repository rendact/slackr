import gql from "graphql-tag";

export const createMessageMtn = gql`
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      changedMessage {
        id
        content
        author {
          id
          username
        }
      }
    }
  }
`;
