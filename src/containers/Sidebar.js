import React, { Component } from "react";
import SidebarHead from "../components/SidebarHead";
import ChannelsSection from "./ChannelsSection";
import ProfileModal from "../components/ProfileModal";
import { graphql } from "react-apollo";
import { getUser } from "../queries/getUser";
import { connect } from "react-redux";
import { toggleProfileModal } from "../actions/profileModal";
import { withRouter } from "react-router-dom";

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

  handleSignout() {
    localStorage.removeItem("slackrToken");
    localStorage.removeItem("slackrUserId");
    window.location.reload();
  }

  render() {
    let {
      user: { loading: userLoading, getUser: user },
      profileModalOpen,
      dispatch
    } = this.props;
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
        <ChannelsSection />
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

export default graphql(getUser, { name: "user" })(withRedux);
