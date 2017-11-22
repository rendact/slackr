import React, { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";

import CreateDm from "./components/CreateDMModal";
import { getUsers } from "./queries/getUsers";
import { toggleDMUserList } from "./actions/toggleDMUserList";

class CreateDmWithData extends Component {
  render() {
    const { createDmIsOpen, users, dispatch } = this.props;
    const { edges: DmItems } =
      !users.loading && users.viewer
        ? users.viewer.allUsers
        : { viewer: { allUsers: { edges: null } } };
    return (
      <CreateDm
        createDmToggle={() => {
          dispatch(toggleDMUserList());
        }}
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
  options: props => ({
    variables: {
      id: localStorage.getItem("slackrUserId") || props.location.state.userId
    }
  })
})(withRedux);
