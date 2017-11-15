import React, { Component } from "react";

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
        </h2>
        <hr />
      </div>
    );
  }
}
