import React, { Component } from "react";
import { graphql } from "react-apollo";
import FileItem from "./components/FileItem";
import FilesTabContainer from "./components/FilesTabContainer";
import allFiles from "./queries/File/allAttachments";
import subscribeToDeleteMessage from "queries/Messages/subscribeToDelete";
import subscribeToCreateMessage from "queries/Messages/subscribeToCreate";
import "./files-management.css";
import myUserId from "constans/myUserId";

class FilesContainer extends Component {
  constructor(props) {
    super(props);

    this.subscribeToMessageDelete = this.subscribeToMessageDelete.bind(this);
    this.subscribeToMessageCreate = this.subscribeToMessageCreate.bind(this);
  }

  subscribeToMessageCreate() {
    this.props.allFiles.subscribeToMore({
      document: subscribeToCreateMessage,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { viewer: { allMessages: { edges: oldEdges } } } = prev;
        const {
          data: { subscribeToMessage: { edge: newEdge } }
        } = subscriptionData;

        if (!newEdge.node.attachment) {
          return prev;
        }

        const newEdges = [newEdge, ...oldEdges];

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
  subscribeToMessageDelete() {
    this.props.allFiles.subscribeToMore({
      document: subscribeToDeleteMessage,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const {
          data: { subscribeToMessage: { value: { id: deletedMessageId } } }
        } = subscriptionData;

        const newEdges = prev.viewer.allMessages.edges.filter(
          edge => edge.node.id !== deletedMessageId
        );

        return { viewer: { allMessages: { edges: newEdges } } };
      }
    });
  }
  componentWillMount() {
    this.subscribeToMessageCreate();
  }
  render() {
    return <FilesTabContainer {...this.props} allFiles={this.props.allFiles} />;
  }
}

export default graphql(allFiles, {
  name: "allFiles",
  options: props => ({
    variables: { userId: myUserId || props.location.state.userId }
  })
})(FilesContainer);
