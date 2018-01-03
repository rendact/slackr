import React, { Component } from "react";

export default class ChatBody extends Component {
  componentDidMount() {
    document
      .getElementById("input-wrapper")
      .scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    document
      .getElementById("input-wrapper")
      .scrollIntoView({ behavior: "smooth" });
  }
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
