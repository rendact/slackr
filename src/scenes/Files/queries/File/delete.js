import gql from "graphql-tag";

export default gql`
  mutation($fileId: ID!) {
    deleteFile(input: { id: $fileId }) {
      clientMutationId
    }
  }
`;
