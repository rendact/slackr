import React, { Component } from "react";
import MessagesHead from "../components/MessagesHead";
import MessageInputWithMutation from "./MessageInputWithMutation";
import ChatBody from "../components/ChatBody";
import ChatItem from "../components/ChatItem";
import ButtonJoin from "./ButtonJoinMutation";
import { getChannel } from "../queries/getChannel";
import { messageSubscription } from "../queries/messageSubscription";
import { graphql } from "react-apollo";

class MessagesWrapper extends Component {
  constructor(props) {
    super(props);
    this.subscribeToMessage = this.subscribeToMessage.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.channel && !props.channel.loading && props.channel.getChannel) {
      if (
        !this.props.channel.getChannel ||
        props.channel.getChannel.id !== this.props.channel.getChannel.id
      ) {
        this.subscribeToMessage();
        return;
      }
    }
  }

  subscribeToMessage() {
    return this.props.channel.subscribeToMore({
      document: messageSubscription,
      variables: {
        filter: {
          channelId: {
            eq: this.props.match ? this.props.match.params.id : null
          }
        }
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { data: { subscribeToMessage: { edge } } } = subscriptionData;
        const oldEdge = prev.getChannel.messages.edges;
        const newEdges = [...oldEdge, edge];

        return {
          getChannel: { ...prev.getChannel, messages: { edges: newEdges } }
        };
      }
    });
  }
  render() {
    const { match, channel: data } = this.props;
    const userArray =
      data && data.getChannel && data.getChannel.participants.edges;
    const isMember =
      userArray &&
      userArray.find(el => el.node.id === localStorage.getItem("slackrUserId"));
    return (
      (match.params.id && (
        <div style={{}} className="messages-wrapper" id="messages-wrapper">
          <MessagesHead
            name={data.getChannel && data.getChannel.name}
            type={data.getChannel && data.getChannel.type}
          />
          <ChatBody>
            {data.getChannel && data.getChannel.messages
              ? data.getChannel.messages.edges.map((message, idx) => (
                  <ChatItem
                    key={idx}
                    body={message.node.content}
                    head={message.node.author && message.node.author.username}
                  />
                ))
              : null}
          </ChatBody>
          {(userArray &&
            userArray.find(
              el => el.node.id === localStorage.getItem("slackrUserId")
            ) && (
              <MessageInputWithMutation
                channelId={match.params && match.params.id}
              />
            )) || (
            <ButtonJoin
              isVisible={!isMember}
              channelId={match.params && match.params.id}
            />
          )}
        </div>
      )) || (
        <div
          style={{
            background: "blue",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            flex: "10 0px",
            order: 1,
            padding: 15
          }}
          className="messages-wrapper"
          id="messages-wrapper"
        />
      )
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
  },
  skip: props => !props.match.params.id
})(MessagesWrapper);
