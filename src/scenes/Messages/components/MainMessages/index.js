import React, { Component } from "react";
import { graphql } from "react-apollo";

import MessagesHead from "./components/MessageHead";
import ChatBody from "./components/MessageBodyWrapper";
import ChatItem from "./components/ChatItem";
import MessageInputWithMutation from "./components/ChatInput";
import ButtonJoin from "./components/ButtonJoin";
import AddUserModal from "./components/AddUserListModal";
import { getChannel } from "./queries/Channel/getChannel";
import { messageSubscription } from "./queries/Message/Subscription/onCreate";
import { avatarSubscription } from "./queries/File/Subscription/avatarSubscription";
import { subscribeToUpdateUser } from "scenes/Messages/queries/subscribeToUser";

class MessagesWrapper extends Component {
  constructor(props) {
    super(props);
    this.subscribeToMessage = this.subscribeToMessage.bind(this);
    this.subscribeToAvatar = this.subscribeToAvatar.bind(this);
    this.subscribeToUserChange = this.subscribeToUserChange.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.channel && !props.channel.loading && props.channel.getChannel) {
      if (
        !this.props.channel.getChannel ||
        props.channel.getChannel.id !== this.props.channel.getChannel.id
      ) {
        this.subscribeToMessage();
        this.subscribeToAvatar();
        this.subscribeToUserChange();
        return;
      }
    }
  }

  subscribeToAvatar() {
    return this.props.channel.subscribeToMore({
      document: avatarSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const {
          data: { subscribeToFile: { value: avatar } }
        } = subscriptionData;
        const avatarUrl = avatar.blobUrl;
        const oldEdges = prev.getChannel.messages.edges;
        const newEdges = oldEdges.map(node => {
          if (node.node.author.id === avatar.userAvatar.id) {
            return {
              node: {
                ...node.node,
                author: {
                  ...node.node.author,
                  avatar: {
                    blobUrl: avatarUrl
                  }
                }
              }
            };
          }
          return node;
        });
        return {
          getChannel: { ...prev.getChannel, messages: { edges: newEdges } }
        };
      }
    });
  }

  subscribeToUserChange() {
    /*
   * here we do subscription to user change
   */
    return this.props.channel.subscribeToMore({
      document: subscribeToUpdateUser,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const {
          data: { subscribeToMessage: { value: user } }
        } = subscriptionData;
        const oldEdges = prev.getChannel.messages.edges;
        const newEdges = oldEdges.map(edge => {
          const author = edge.node.author;
          if (author.id === user.id) {
            return {
              edge: {
                ...edge.node,
                author: {
                  ...edge.node.author,
                  fullname: user.fullname
                }
              }
            };
          }

          return edge;
        });

        return {
          getChannel: { ...prev.getChannel, messages: { edges: newEdges } }
        };
      }
    });
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
    let name, type;

    if (data && !data.loading && data.getChannel) {
      if (data.getChannel.type === "direct") {
        type = "direct";
        name = userArray.find(
          u => u.node.id !== localStorage.getItem("slackrUserId")
        ).node.username;
      } else {
        type = data.getChannel.type;
        name = data.getChannel.name;
      }
    }

    if (data && data.loading) {
      return (
        <div className="messages-wrapper" id="messages-wrapper">
          <div
            style={{
              fontSize: "larger",
              animation: "blinking 4s infinite",
              position: "fixed",
              bottom: "50%",
              left: "50%"
            }}
          >
            Retrieving data...
          </div>
        </div>
      );
    }

    return (
      (match.params.id && (
        <div style={{}} className="messages-wrapper" id="messages-wrapper">
          <MessagesHead
            name={data.getChannel && name}
            type={data.getChannel && type}
            channelId={match.params.id}
          />
          <ChatBody>
            <AddUserModal participants={data.getChannel.participants.edges} />
            {data.getChannel && data.getChannel.messages
              ? data.getChannel.messages.edges.map((message, idx) => (
                  <ChatItem
                    key={idx}
                    body={message.node.content}
                    head={message.node.author && message.node.author.fullname}
                    createdAt={message.node.createdAt}
                    id={message.node.id}
                    image={
                      message.node.author.avatar
                        ? message.node.author.avatar.blobUrl
                        : null
                    }
                  />
                ))
              : null}
          </ChatBody>
          {isMember ? (
            <MessageInputWithMutation
              channelId={match.params && match.params.id}
            />
          ) : (
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
