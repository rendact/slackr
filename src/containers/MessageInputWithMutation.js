import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import MessageInput from "../components/MessageInput";
import { createMessageMtn } from "../queries/createMessageMtn";
import { toggleSending } from "../actions/toggleSending";

class MessageInputWithMutation extends Component {
  constructor(props) {
    super(props);

    this.handleCreateMessage = this.handleCreateMessage.bind(this);
  }
  handleCreateMessage(val) {
    return new Promise((resolve, reject) => {
      this.props.dispatch(toggleSending());
      this.props
        .createMessage({
          variables: {
            input: {
              content: val.messageContent,
              authorId: localStorage.getItem("slackrUserId"),
              channelId: this.props.channelId
            }
          }
        })
        .then(data => {
          this.props.dispatch(toggleSending());
          resolve(data);
        })
        .catch(error => {
          this.props.dispatch(toggleSending());
          reject(error);
        });
    });
  }
  render() {
    return (
      <MessageInput
        isSending={this.props.isSending}
        onSubmit={this.handleCreateMessage}
      />
    );
  }
}

const mapStateToProps = state => state.inputMessage || {};

const withRedux = connect(mapStateToProps)(MessageInputWithMutation);

export default graphql(createMessageMtn, { name: "createMessage" })(withRedux);
