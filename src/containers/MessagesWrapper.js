import React, { Component } from "react";
import { Col } from "reactstrap";
import MessagesHead from "../components/MessagesHead";
import ChatsSection from "./ChatsSection";
import MessageInputWithMutation from "./MessageInputWithMutation";

export default class MessagesWrapper extends Component {
  render() {
    return (
      <Col
        md={10}
        style={{
          background: "blue",
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
        className="messages-wrapper"
        id="messages-wrapper"
      >
        <MessagesHead name={"rendact"} hashtag={"rendact"} />
        <ChatsSection />
        <MessageInputWithMutation />
      </Col>
    );
  }
}
