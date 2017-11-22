import React, { Component } from "react";
import RemoveButton from "./RemoveButton";

export default class MessagesHead extends Component {
  render() {
    let { name, type } = this.props;
    return (
      <div id="messagesHead">
        <h2>
          <span
            className={type === "private" ? "fa fa-lock" : "fa fa-hashtag"}
          />{" "}
          {name}
          <RemoveButton isRight />
        </h2>
        <hr />
      </div>
    );
  }
}
