import React, { Component } from "react";
import DMUserItem from "../components/DMUserItem";
import { bindToDM } from "../queries/bindToDM";
import { createChannel } from "../queries/createChannel";
import { checkDMExists } from "../queries/checkDMExists";
import { toggleDMUserList } from "../actions/toggleDMUserList";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class DMUserItemWithMutation extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    const otherId = this.props.userId;
    const meId = localStorage.getItem("slackrUserId");
    const client = this.props.client;
    const channelName = [meId, otherId].sort().join(";");
    let channelId;

    client
      .query({
        query: checkDMExists,
        variables: { channelName: channelName }
      })
      .then(({ data: { viewer: { allChannels: { edges: channels } } } }) => {
        if (!channels[0]) {
          debugger;
          client
            .mutate({
              mutation: createChannel,
              variables: { input: { name: channelName, type: "direct" } }
            })
            .then(({ data }) => {
              channelId = data.createChannel.changedChannel.id;
              client
                .mutate({
                  mutation: bindToDM,
                  variables: {
                    meId: meId,
                    otherId: otherId,
                    channelId: channelId
                  }
                })
                .then(data => {
                  this.props.history.push("/messages/" + channelId);
                  this.props.dispatch(toggleDMUserList());
                })
                .catch(error => {
                  // error in binding
                  debugger;
                });
            })
            .catch(({ error }) => {
              // error when creating channel
              debugger;
            });
        } else {
          this.props.history.push("/messages/" + channels[0].node.id);
          this.props.dispatch(toggleDMUserList());
        }
      })
      .catch(error => {
        // error inside check channel exists
        debugger;
      });
  }
  render() {
    const { username } = this.props;
    return <DMUserItem username={username} onClick={this.onClick} />;
  }
}

export default withRouter(withApollo(connect()(DMUserItemWithMutation)));
