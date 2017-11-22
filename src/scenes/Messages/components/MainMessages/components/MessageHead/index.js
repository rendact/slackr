import React, { Component } from "react";
import RemoveButton from "./components/RemoveButton";

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
          {type !== "direct" && <RemoveButton isRight channelId={channelId} />}
        </h2>
        <hr />
      </div>
    );
  }
}
