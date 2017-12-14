import React from "react";
import UserListModal from "components/UserListModal";
import allUsersNotIn from "./queries/allUsersNotIn";
import { graphql } from "react-apollo";

class AddUserModal extends React.Component {
  render() {
    const { users } = this.props;
    const { edges: UserItems } =
      !users.loading && users.viewer
        ? users.viewer.allUsers
        : { viewer: { allUsers: { edges: null } } };
    return (
      <UserListModal
        modalHeader="Add User"
        UserItems={UserItems}
        isOpen={true}
        isLoading={users.loading}
        onClick={() => {}}
      />
    );
  }
}

export default graphql(allUsersNotIn, {
  options: props => ({
    variables: { ids: props.participants.map(p => p.node.id) }
  }),
  name: "users"
})(AddUserModal);
