import React, { Component } from "react";
import { connect } from "react-redux";
import RemoveButton from "./components/RemoveButton";
import AddUserButton from "./components/AddUserButton";
import RemoveUserButton from "./components/RemoveUserButton";
import UpdateChannelNameInput from "./components/UpdateChannelNameInput";
import ChannelName from "./components/ChannelName";
import isChannelAdmin from "./utils/isChannelAdmin";

import channelNameEditingToggle from "./actions/channelNameEditingToggle";

class MessagesHead extends Component {
  constructor(props) {
    super(props);

    this.onChannelNameEditButtonClick = this.onChannelNameEditButtonClick.bind(
      this
    );
  }
  onChannelNameEditButtonClick(e) {
    this.props.dispatch(channelNameEditingToggle());
  }
  render() {
    let {
      participants,
      name,
      type,
      channelId,
      isChannelNameEditing
    } = this.props;

    const isAdmin = isChannelAdmin(
      localStorage.getItem("slackrUserId"),
      participants
    );

    const spanIcon = type === "private" ? "fa fa-lock" : "fa fa-hashtag";
    return (
      <div id="messagesHead">
        <h2 style={{ display: "flex", flexDirection: "row" }}>
          <UpdateChannelNameInput
            isVisible={isChannelNameEditing}
            spanIcon={spanIcon}
            name={name}
            channelId={channelId}
          />

          <ChannelName
            isVisible={!isChannelNameEditing}
            name={name}
            spanIcon={spanIcon}
            channelId={channelId}
            onChannelNameEditButtonClick={this.onChannelNameEditButtonClick}
            isChannelAdmin={isAdmin}
          />

          {isAdmin ? (
            <div style={{ width: "50%" }}>
              {type !== "direct" && (
                <RemoveButton isRight channelId={channelId} />
              )}
              {type !== "direct" && (
                <AddUserButton isRight channelId={channelId} />
              )}
              {type !== "direct" && (
                <RemoveUserButton isRight channelId={channelId} />
              )}
            </div>
          ) : null}
        </h2>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => state.messageHead || {};
export default connect(mapStateToProps)(MessagesHead);
