import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";

import ChannelItem from "./components/ChannelItem";

import { getChannels } from "./queries/channels/getChannels";
import { channelSubscription } from "./queries/channels/channelSubscription";
import { subscribeToDeleteChannel } from "./queries/channels/subscription/delete";

import { createChannelToggle } from "scenes/Messages/actions/createChannel";
import CircleAddButton from "scenes/Messages/components/Sidebar/components/CircleAddButton";

class ChannelsSection extends Component {
  constructor(props) {
    super(props);

    this.subscribeToCreateChannels = this.subscribeToCreateChannels.bind(this);
    this.subscribeToDeleteChannel = this.subscribeToDeleteChannel.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  subscribeToDeleteChannel() {
    return this.props.channels.subscribeToMore({
      document: subscribeToDeleteChannel,
      varibales: { filter: { type: { ne: "direct" } } },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const {
          data: { subscribeToChannel: { value: { id: deletedId } } }
        } = subscriptionData;

        const prevEdges = prev.viewer.allChannels.edges;

        const newEdges = prevEdges.filter(edge => edge.node.id !== deletedId);

        return {
          viewer: { allChannels: { edges: newEdges } }
        };
      }
    });
  }

  subscribeToCreateChannels() {
    return this.props.channels.subscribeToMore({
      document: channelSubscription,
      variables: { filter: { type: { ne: "direct" } } },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { data: { subscribeToChannel: { edge } } } = subscriptionData;
        const newEdges = [...prev.viewer.allChannels.edges, edge];

        return {
          viewer: {
            allChannels: {
              edges: newEdges
            }
          }
        };
      }
    });
  }

  componentWillMount() {
    this.subscribeToCreateChannels();
    this.subscribeToDeleteChannel();
  }

  renderChannels(channels) {
    return (
      <dl>
        {channels.map(channel => (
          <ChannelItem key={channel.node.id} {...channel.node} />
        ))}
      </dl>
    );
  }

  onClick(e) {
    e.preventDefault();
    this.props.dispatch(createChannelToggle());
  }

  render() {
    let { channels } = this.props;
    if (channels.loading) {
      return (
        <div style={{ minHeight: 50 }}>
          <div
            style={{ animation: "blinking 4s infinite", fontSize: "larger" }}
          >
            Retrieving channel data...
          </div>
        </div>
      );
    }
    return (
      <div>
        <h4>
          Channels
          <CircleAddButton isRight onClick={this.onClick} />
        </h4>
        <dl>
          {!channels.loading &&
            this.renderChannels(channels.viewer.allChannels.edges)}
        </dl>
      </div>
    );
  }
}

ChannelsSection = connect()(ChannelsSection);

export default graphql(getChannels, { name: "channels" })(ChannelsSection);
