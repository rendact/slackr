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
          <span
            className="fa fa-cog"
            style={{ float: "right", color: "white", paddingRight: 10 }}
          />
        </h2>
        <hr />
      </div>
    );
  }
}
