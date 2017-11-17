import React, { Component } from "react";
import DMItem from "../components/DMItem";
import { bindToDM } from "../queries/bindToDM";
import { createChannel } from "../queries/createChannel";
import { checkDMExists } from "../queries/checkDMExists";
import { withApollo } from "react-apollo";

class DMItemWithMutation extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    const otherId = this.props.userId;
    const meId = localStorage.getItem("slackrUserId");
    const client = this.props.client;
    const channelName = otherId + ";" + meId;

    /*
    client
      .query({
        query: checkDMExists,
        variables: { meId: meId, otherId: otherId }
      })
      .then(data => {
        debugger;
      })
      .catch(error => {
        debugger;
      });
      */

    client
      .mutate({
        mutation: createChannel,
        variables: { input: { name: channelName, type: "direct" } }
      })
      .then(({ data }) => {
        client
          .mutate({
            mutation: bindToDM,
            variables: {
              meId: meId,
              otherId: otherId,
              channelId: data.createChannel.changedChannel.id
            }
          })
          .then(data => {
            debugger;
          })
          .catch(error => {
            debugger;
          });
      })
      .catch(({ error }) => {
        debugger;
      });
  }
  render() {
    const { username } = this.props;
    return <DMItem username={username} onClick={this.onClick} />;
  }
}

export default withApollo(DMItemWithMutation);
