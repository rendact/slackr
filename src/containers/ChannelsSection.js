import React, { Component } from "react";
import ChannelItem from "../components/ChannelItem";
import { createChannelToggle } from "../actions/createChannel";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { getChannels } from "../queries/getChannels";
import { channelSubscription } from "../queries/channelSubscription";

class ChannelsSection extends Component {
  constructor(props) {
    super(props);

    this.subscribeToChannels = this.subscribeToChannels.bind(this);
  }

  subscribeToChannels() {
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
    this.subscribeToChannels();
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
  render() {
    let { channels } = this.props;
    return (
      <div>
        <h4>
          <a
            href="#head"
            onClick={r => {
              r.preventDefault();
              this.props.dispatch(createChannelToggle());
            }}
          >
            Channels
          </a>
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
