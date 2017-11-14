import React, { Component } from "react";

export default class ChatBody extends Component {
  render() {
    return (
      <div
        id="chat-body"
        style={{ overflowY: "scroll", background: "deepskyblue" }}
      >
        {this.props.children}
      </div>
    );
  }
}
