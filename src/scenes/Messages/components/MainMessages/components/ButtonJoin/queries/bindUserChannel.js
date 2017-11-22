import gql from "graphql-tag";

export const bindUserChannel = gql`
  mutation($input: AddToUserChannelConnectionInput!) {
    addToUserChannelConnection(input: $input) {
      changedUserChannel {
        createdAt
      }
    }
  }
`;
