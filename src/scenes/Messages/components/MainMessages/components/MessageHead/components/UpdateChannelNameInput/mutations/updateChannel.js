import gql from "graphql-tag";

export default gql`
  mutation($input: UpdateChannelInput!) {
    updateChannel(input: $input) {
      changedChannel {
        name
      }
    }
  }
`;
