import gql from "graphql-tag";

export default gql`
  mutation($input: RemoveFromUserChannelConnectionInput!) {
    removeFromUserChannelConnection(input: $input) {
      changedUserChannel {
        memberType
      }
    }
  }
`;
