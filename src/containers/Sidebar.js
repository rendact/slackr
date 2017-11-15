import React, { Component } from "react";
import SidebarHead from "../components/SidebarHead";
import ChannelItem from "../components/ChannelItem";
import { createChannelToggle } from "../actions/createChannel";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { getChannels } from "../queries/getChannels";

class Sidebar extends Component {
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
      <div
        style={{
          background: "#303E4D",
          flex: "1 auto",
          order: 0,
          color: "#fff",
          padding: 15
        }}
      >
        <SidebarHead title="Slackr" />{" "}
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

Sidebar = graphql(getChannels, { name: "channels" })(Sidebar);
export default connect()(Sidebar);
