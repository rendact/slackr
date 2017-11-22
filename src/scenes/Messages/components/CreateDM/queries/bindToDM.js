import gql from "graphql-tag";

export const bindToDM = gql`
  mutation bindToDM($meId: ID!, $otherId: ID!, $channelId: ID!) {
    me: addToUserChannelConnection(
      input: { channelId: $channelId, userId: $meId }
    ) {
      changedUserChannel {
        createdAt
      }
    }
    other: addToUserChannelConnection(
      input: { channelId: $channelId, userId: $otherId }
    ) {
      changedUserChannel {
        createdAt
      }
    }
  }
`;
