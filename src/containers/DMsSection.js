import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import ChannelItem from "../components/ChannelItem";

class DMsSection extends Component {
  render() {
    return (
      <div>
        <h4>
          <a href="#dm">Direct Messages</a>
        </h4>
        <dl>
          <ChannelItem key="jsfalkfj" />
          <ChannelItem />
          <ChannelItem />
          <ChannelItem />
        </dl>
      </div>
    );
  }
}

export default DMsSection;
