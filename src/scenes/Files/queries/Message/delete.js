import gql from "graphql-tag";

export default gql`
  mutation($messageId: ID!) {
    deleteMessage(input: { id: $messageId }) {
      clientMutationId
    }
  }
`;
