import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import MessageInput from "../components/MessageInput";
import { createMessageMtn } from "../queries/createMessageMtn";

class MessageInputWithMutation extends Component {
  constructor(props) {
    super(props);

    this.handleCreateMessage = this.handleCreateMessage.bind(this);
  }
  handleCreateMessage(val) {
    return new Promise((resolve, reject) => {
      this.props
        .createMessage({
          variables: {
            input: {
              content: val.messageContent,
              authorId: localStorage.getItem("slackrUserId")
            }
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  render() {
    return <MessageInput onSubmit={this.handleCreateMessage} />;
  }
}

const withRedux = connect()(MessageInputWithMutation);

export default graphql(createMessageMtn, { name: "createMessage" })(withRedux);
