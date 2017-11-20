import React, { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import CreateDm from "../components/CreateDm";
import { getUsers } from "../queries/getUsers";

class CreateDmWithData extends Component {
  render() {
    const { createDmIsOpen, users } = this.props;
    debugger;
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

const withRedux = connect(state => state.dmUserList || {})(CreateDmWithData);

export default graphql(getUsers, {
  name: "users",
  options: { variables: { id: localStorage.getItem("slackrUserId") } }
})(withRedux);
