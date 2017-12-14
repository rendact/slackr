import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { bindToDM } from "./queries/bindToDM";
import { toggleDMProcessing as toggleProcessing } from "scenes/Messages/components/CreateDM/actions/toggleProcessing";
import { checkDMExists } from "./queries/checkDMExists";
import { createChannel } from "scenes/Messages/components/Sidebar/queries/createChannel";
import UserListModal from "components/UserListModal";
import { getUsers } from "./queries/getUsers";
import { toggleDMUserList } from "./actions/toggleDMUserList";

class CreateDmWithData extends Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(userId) {
    const me = this;
    return e => {
      this.props.dispatch(toggleProcessing());
      e.preventDefault();
      const otherId = userId;
      const meId = localStorage.getItem("slackrUserId");
      const client = me.props.client;
      const channelName = [meId, otherId].sort().join(";");
      let channelId;

      client
        .query({
          query: checkDMExists,
          variables: { channelName: channelName }
        })
        .then(({ data: { viewer: { allChannels: { edges: channels } } } }) => {
          if (!channels[0]) {
            client
              .mutate({
                mutation: createChannel,
                variables: { input: { name: channelName, type: "direct" } }
              })
              .then(({ data }) => {
                channelId = data.createChannel.changedChannel.id;
                me.props.history.push("/messages/" + channelId);
                me.props.dispatch(toggleProcessing());
                me.props.dispatch(toggleDMUserList());
              })
              .catch(({ error }) => {
                me.props.dispatch(toggleProcessing());
                // error when creating channel
              });
          } else {
            me.props.history.push("/messages/" + channels[0].node.id);
            me.props.dispatch(toggleProcessing());
            me.props.dispatch(toggleDMUserList());
          }
        })
        .catch(error => {
          // error inside check channel exists
          me.props.dispatch(toggleProcessing());
        });
    };
  }
  render() {
    const { createDmIsOpen, users, isProcessing, dispatch } = this.props;
    const { edges: DmItems } =
      !users.loading && users.viewer
        ? users.viewer.allUsers
        : { viewer: { allUsers: { edges: null } } };
    return (
      <UserListModal
        toggle={() => {
          dispatch(toggleDMUserList());
        }}
        isOpen={createDmIsOpen}
        isLoading={users.loading}
        UserItems={DmItems}
        onClick={this.onItemClick}
        isProcessing={isProcessing}
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
})(withRouter(withApollo(withRedux)));
