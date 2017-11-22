import gql from "graphql-tag";

export const deleteChannel = gql`
  mutation($id: ID!) {
    deleteChannel(input: { id: $id }) {
      changedChannel {
        id
      }
    }
  }
`;
