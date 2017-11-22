import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

import Channels from "./components/Channels";
import SidebarHead from "./components/SidebarHead";
import ProfileModal from "./components/ProfileModal";
import DMsSection from "./components/DMList";
import { getUser } from "./queries/getUser";
import { toggleProfileModal } from "./actions/profileModal";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleToggle(e) {
    e && e.preventDefault();
    this.props.dispatch(toggleProfileModal());
  }

  handleSignout(e) {
    e && e.preventDefault();
    this.props.profileModalOpen && this.props.dispatch(toggleProfileModal());
    localStorage.removeItem("slackrToken");
    localStorage.removeItem("slackrUserId");
    this.props.history.push("/login");
  }

  render() {
    let {
      user: { loading: userLoading, getUser: user },
      profileModalOpen,
      location
    } = this.props;

    if (userLoading) {
      return (
        <div
          style={{
            background: "#303e4d",
            flex: "1 auto",
            order: 0,
            color: "#fff",
            padding: 15
          }}
        >
          <div style={{ animation: "blinking 4s infinite" }}>
            Retrieving data....
          </div>
        </div>
      );
    }

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
          onClick={this.handleToggle}
        />{" "}
        <Channels />
        <DMsSection location={location} />
        <ProfileModal
          profileModalOpen={profileModalOpen}
          profileModalToggle={this.handleToggle}
          username={!userLoading && user && user.username}
          profileModalSignout={this.handleSignout}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state.profileModal || {};
const withRedux = connect(mapStateToProps)(withRouter(Sidebar));

export default graphql(getUser, {
  name: "user",
  options: props => ({
    variables: {
      id: localStorage.getItem("slackrUserId") || props.location.state.userId
    }
  }),
  skip: props =>
    !localStorage.getItem("slackrUserId") && !props.location.state.userId
})(withRedux);
