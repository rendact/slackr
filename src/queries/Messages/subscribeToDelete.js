import gql from "graphql-tag";

export default gql`
  subscription {
    subscribeToMessage(mutations: [deleteMessage]) {
      value {
        id
      }
    }
  }
`;
