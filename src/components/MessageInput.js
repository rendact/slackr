import React, { Component } from "react";
import { InputGroup, InputGroupButton, Button, Input } from "reactstrap";

export default class MessageInput extends Component {
  render() {
    return (
      <div
        id="input-wrapper"
        style={{
          margin: 15
        }}
      >
        <InputGroup>
          <Input placeholder="Message Rendact" id="message-input" />
          <InputGroupButton>Send</InputGroupButton>
        </InputGroup>
      </div>
    );
  }
}
