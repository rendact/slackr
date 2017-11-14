import React, { Component } from "react";
import ChatBody from "../components/ChatBody";
import ChatItem from "../components/ChatItem";
import { getMessages } from "../queries/getMessages";
import { messageSubscription } from "../queries/messageSubscription";
import { graphql } from "react-apollo";

class ChatsSection extends Component {
  constructor(props) {
    super(props);
    this.subscribeToMessage = this.subscribeToMessage.bind(this);
  }

  componentWillReceiveProps(next) {
    debugger;
  }

  subscribeToMessage() {
    return this.props.messages.subscribeToMore({
      document: messageSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { data: { subscribeToMessage: { edge } } } = subscriptionData;

        let newEdges = [...prev.viewer.allMessages.edges, edge];

        debugger;
        return {
          viewer: {
            allMessages: {
              edges: newEdges
            }
          }
        };
      }
    });
  }

  componentWillMount() {
    this.subscribeToMessage();
  }

  render() {
    let { messages: data } = this.props;
    return (
      <ChatBody>
        {data.viewer
          ? data.viewer.allMessages.edges.map(message => (
              <ChatItem body={message.node.content} />
            ))
          : null}
      </ChatBody>
    );
  }
}

export default graphql(getMessages, {
  name: "messages"
})(ChatsSection);
