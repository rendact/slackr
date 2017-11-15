import React, { Component } from "react";
import SidebarHead from "../components/SidebarHead";
import ChannelsSection from "./ChannelsSection";

export default class Sidebar extends Component {
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
        <SidebarHead title="Slackr" /> <ChannelsSection />
      </div>
    );
  }
}
