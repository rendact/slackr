import gql from "graphql-tag";

export const createChannel = gql`
  mutation($input: CreateChannelInput!) {
    createChannel(input: $input) {
      changedChannel {
        id
        name
      }
    }
  }
`;
