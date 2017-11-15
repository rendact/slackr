import React, { Component } from "react";
import SidebarHead from "../components/SidebarHead";
import ChannelItem from "../components/ChannelItem";
import { createChannelToggle } from "../actions/createChannel";
import { connect } from "react-redux";
import { Col } from "reactstrap";

class Sidebar extends Component {
  render() {
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
        <h2>
          <a
            href="#head"
            onClick={r => {
              r.preventDefault();
              this.props.dispatch(createChannelToggle());
            }}
          >
            Channels
          </a>
        </h2>
        <dl>
          <ChannelItem id="jflkasjflkasjf" type="public" name="hello" />
          <ChannelItem id="klfdsjalfajl" type="private" name="aku" />
          <dd>
            <a href="#dkfaj">
              <span id="status">#</span> general
            </a>
          </dd>
          <dd>#general</dd>
          <dd>#general</dd>
        </dl>
      </div>
    );
  }
}

export default connect()(Sidebar);
