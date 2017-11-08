import React, { Component } from "react";

export default class MessagesHead extends Component {
  render() {
    let { name, hashtag } = this.props;
    return (
      <div id="messagesHead">
        <h1>
          {name} <small className="text-muted">#{hashtag}</small>
        </h1>
        <hr />
      </div>
    );
  }
}
