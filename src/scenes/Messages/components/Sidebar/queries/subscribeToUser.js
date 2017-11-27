import gql from "graphql-tag";

export const subscribeToUpdateUser = gql`
  subscription subscribeToUpdateUser($filter: UserSubscriptionFilter) {
    subscribeToUser(mutations: [updateUser], filter: $filter) {
      value {
        displayname
        fullname
      }
    }
  }
`;
