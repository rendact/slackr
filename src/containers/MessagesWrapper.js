import React, { Component } from "react";
import { Col } from "reactstrap";
import MessagesHead from "../components/MessagesHead";
import ChatsSection from "./ChatsSection";
import MessageInputWithMutation from "./MessageInputWithMutation";

export default class MessagesWrapper extends Component {
  render() {
    return (
      <div
        style={{
          background: "blue",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          flex: "10 0px",
          order: 1,
          padding: 15
        }}
        className="messages-wrapper"
        id="messages-wrapper"
      >
        <MessagesHead name={"rendact"} hashtag={"rendact"} />
        <ChatsSection />
        <MessageInputWithMutation />
      </div>
    );
  }
}
