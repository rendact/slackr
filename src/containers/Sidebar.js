import React, { Component } from "react";
import SidebarHead from "../components/SidebarHead";
import ChannelsSection from "./ChannelsSection";
import DMsSection from "./DMsSection";
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
      profileModalOpen
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
        <DMsSection />
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
  options: {
    variables: { id: localStorage.getItem("slackrUserId") }
  },
  skip: !localStorage.getItem("slackrUserId")
})(withRedux);
