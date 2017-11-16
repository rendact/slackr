import React, { Component } from "react";
import SidebarHead from "../components/SidebarHead";
import ChannelsSection from "./ChannelsSection";
import { graphql } from "react-apollo";
import { getUser } from "../queries/getUser";

class Sidebar extends Component {
  render() {
    debugger;
    let { user: { loading: userLoading, getUser: user } } = this.props;
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
        <SidebarHead
          title="Slackr"
          tagline={!userLoading && user ? user.username : "username"}
        />{" "}
        <ChannelsSection />
      </div>
    );
  }
}

export default graphql(getUser, { name: "user" })(Sidebar);
