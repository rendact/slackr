import React, { Component } from "react";
import { InputGroup, InputGroupButton, Button, Input } from "reactstrap";

export default class MessageInput extends Component {
  render() {
    return (
      <InputGroup
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 14,
          width: "100%"
        }}
      >
        <Input placeholder="Message Rendact" id="message-input" />
        <InputGroupButton>Send</InputGroupButton>
      </InputGroup>
    );
  }
}
