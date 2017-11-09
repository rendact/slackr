import React, { Component } from "react";
import { graphql } from "react-apollo";
import MessageInput from "../components/MessageInput";
import { createMessageMtn } from "../queries/createMessageMtn";

class MessageInputWithMutation extends Component {
  constructor(props) {
    super(props);

    this.handleCreateMessage = this.handleCreateMessage.bind(this);
  }
  handleCreateMessage(val) {
    debugger;
  }
  render() {
    return <MessageInput onSubmit={this.handleCreateMessage} />;
  }
}

export default graphql(createMessageMtn, { name: "createMessage" })(
  MessageInputWithMutation
);
