import React, { Component } from "react";
import ChatBody from "../components/ChatBody";
import ChatItem from "../components/ChatItem";
import { getMessages } from "../queries/getMessages";
import { graphql } from "react-apollo";

class ChatsSection extends Component {
  componentWillReceiveProps(next) {
    debugger;
  }
  render() {
    let { data } = this.props;
    let messages = data.loading ? null : data.viewer.allMessages.edges;
    return (
      <ChatBody>
        {messages
          ? messages.map(message => <ChatItem body={message.node.content} />)
          : null}
      </ChatBody>
    );
  }
}

export default graphql(getMessages)(ChatsSection);
