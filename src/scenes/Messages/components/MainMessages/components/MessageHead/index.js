import React, { Component } from "react";
import RemoveButton from "./components/RemoveButton";
import AddUserButton from "./components/AddUserButton";
import RemoveUserButton from "./components/RemoveUserButton";
import UpdateChannelNameInput from "./components/UpdateChannelNameInput";
import ChannelName from "./components/ChannelName";

export default class MessagesHead extends Component {
  render() {
    let { name, type, channelId } = this.props;

    const spanIcon = type === "private" ? "fa fa-lock" : "fa fa-hashtag";
    return (
      <div id="messagesHead">
        <h2 style={{ display: "flex", flexDirection: "row" }}>
          <UpdateChannelNameInput spanIcon={spanIcon} />

          <ChannelName
            isVisible
            name={name}
            spanIcon={spanIcon}
            channelId={channelId}
          />

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
        </h2>
        <hr />
      </div>
    );
  }
}
