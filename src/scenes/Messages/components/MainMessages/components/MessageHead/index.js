import React, { Component } from "react";
import RemoveButton from "./components/RemoveButton";
import AddUserButton from "./components/AddUserButton";
import RemoveUserButton from "./components/RemoveUserButton";
import UpdateChannelNameButton from "./components/UpdateChannelNameButton";

export default class MessagesHead extends Component {
  render() {
    let { name, type, channelId } = this.props;
    return (
      <div id="messagesHead">
        <h2>
          <span
            className={type === "private" ? "fa fa-lock" : "fa fa-hashtag"}
          />{" "}
          {name}
          <sup>
            <UpdateChannelNameButton channelId={channelId} />
          </sup>
          {type !== "direct" && <RemoveButton isRight channelId={channelId} />}
          {type !== "direct" && <AddUserButton isRight channelId={channelId} />}
          {type !== "direct" && (
            <RemoveUserButton isRight channelId={channelId} />
          )}
        </h2>
        <hr />
      </div>
    );
  }
}
