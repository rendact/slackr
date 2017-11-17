import React, { Component } from "react";
import { graphql } from "react-apollo";
import CreateDm from "../components/CreateDm";
import { getUsers } from "../queries/getUsers";

class CreateDmWithData extends Component {
  render() {
    const { createDmIsOpen, users } = this.props;
    const { edges: DmItems } =
      !users.loading && users.viewer
        ? users.viewer.allUsers
        : { viewer: { allUsers: { edges: null } } };
    return (
      <CreateDm
        createDmIsOpen={createDmIsOpen}
        isLoading={users.loading}
        DmItems={DmItems}
      />
    );
  }
}

export default graphql(getUsers, {
  name: "users",
  options: { variables: { id: localStorage.getItem("slackrUserId") } }
})(CreateDmWithData);
