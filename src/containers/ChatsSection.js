import React, { Component } from "react";
import ChatBody from "../components/ChatBody";
import ChatItem from "../components/ChatItem";
import { getMessages } from "../queries/getMessages";
import { getChannel } from "../queries/getChannel";
import { messageSubscription } from "../queries/messageSubscription";
import { graphql } from "react-apollo";

class ChatsSection extends Component {
  constructor(props) {
    super(props);
    this.subscribeToMessage = this.subscribeToMessage.bind(this);
  }

  subscribeToMessage() {
    return this.props.channel.subscribeToMore({
      document: messageSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { data: { subscribeToMessage: { edge } } } = subscriptionData;

        let newEdges = [...prev.viewer.allMessages.edges, edge];
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
    let { channel: data } = this.props;
    return (
      <ChatBody>
        {data.viewer
          ? data.viewer.allMessages.edges.map((message, idx) => (
              <ChatItem
                key={idx}
                body={message.node.content}
                head={message.node.author && message.node.author.username}
              />
            ))
          : null}
      </ChatBody>
    );
  }
}

export default graphql(getChannel, {
  name: "channel",
  options: props => {
    const id = props.match.params ? props.match.params.id : null;

    return {
      variables: { id: id }
    };
  }
})(ChatsSection);
