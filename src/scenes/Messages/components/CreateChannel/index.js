import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";

import CreateChannelModal from "./components/CreateChannelModal";
import { createChannel } from "./queries/createChannel";
import { bindUserChannel } from "./queries/bindUserChannel";
import { createChannelToggle } from "scenes/Messages/actions/createChannel";

class CreateChannel extends Component {
  constructor(props) {
    super(props);

    this.createChannelSubmit = this.createChannelSubmit.bind(this);
  }

  createChannelSubmit(val) {
    return new Promise((resolve, reject) => {
      this.props
        .createChannel({
          variables: {
            input: {
              name: val.name,
              type: val.type
            }
          }
        })
        .then(data => {
          this.props.dispatch(createChannelToggle());

          this.props
            .bindUserChannel({
              variables: {
                input: {
                  channelId: data.data.createChannel.changedChannel.id,
                  userId: localStorage.getItem("slackrUserId"),
                  memberType: "owner"
                }
              }
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  render() {
    return (
      <CreateChannelModal
        createChannelOpen={this.props.createChannelOpen}
        createChannelToggle={() => this.props.dispatch(createChannelToggle())}
        createChannelSubmit={this.createChannelSubmit}
      />
    );
  }
}
const mapStateToProps = state => state.createChannel || {};

CreateChannel = connect(mapStateToProps)(CreateChannel);

const withBinding = graphql(bindUserChannel, { name: "bindUserChannel" })(
  CreateChannel
);

export default graphql(createChannel, { name: "createChannel" })(withBinding);
