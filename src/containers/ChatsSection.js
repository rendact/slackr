import React, { Component } from "react";
import ChatBody from "../components/ChatBody";
import ChatItem from "../components/ChatItem";
import { getMessages } from "../queries/getMessages";
import { messageSubscription } from "../queries/messageSubscription";
import { graphql } from "react-apollo";

class ChatsSection extends Component {
  constructor(props) {
    super(props);

    this.subscribeToNewMessages = this.subscribeToNewMessages.bind(this);
  }

  componentWillMount() {
    this.subscribeToNewMessages();
    //    debugger;
    //   this.props.subscribeToNewMessages();
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.messages.loading && newProps.messages.allMessages) {
      // If we change channels, subscribe to the new channel
      this.subscribeToNewMessages();
    }
  }

  subscribeToNewMessages() {
    this.subscription = this.props.messages.subscribeToMore({
      document: messageSubscription,
      /*
            *    Update query specifies how the new data should be merged
            *    with our previous results. Note how the structure of the
            *    object we return here directly matches the structure of
            *    the GetPublicChannels query.
            */
      updateQuery: (prev, { subscriptionData }) => {
        debugger;
      }
    });
  }
  render() {
    let { messages: data } = this.props;
    return null;
    let messages = data ? null : data.viewer.allMessages.edges;
    return (
      <ChatBody>
        {messages
          ? messages.map(message => <ChatItem body={message.node.content} />)
          : null}
      </ChatBody>
    );
  }
}

export default graphql(getMessages, {
  name: "messages"
})(ChatsSection);
