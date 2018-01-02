import React, { Component } from "react";
import { graphql } from "react-apollo";
import FileItem from "./components/FileItem";
import FilesTabContainer from "./components/FilesTabContainer";
import allFiles from "./queries/File/allAttachments";
import subscribeToDeleteMessage from "queries/Messages/subscribeToDelete";
import "./files-management.css";

class FilesContainer extends Component {
  constructor(props) {
    super(props);

    this.subscribeToMessageDelete = this.subscribeToMessageDelete();
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
  render() {
    return <FilesTabContainer allFiles={this.props.allFiles} />;
  }
}

export default graphql(allFiles, {
  name: "allFiles",
  options: { variables: { userId: localStorage.getItem("slackrUserId") } }
})(FilesContainer);
