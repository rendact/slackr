import React, { Component } from "react";
import { graphql } from "react-apollo";
import FileItem from "./components/FileItem";
import FilesTabContainer from "./components/FilesTabContainer";
import allFiles from "./queries/File/allAttachments";
import "./files-management.css";

class FilesContainer extends Component {
  render() {
    return <FilesTabContainer allFiles={this.props.allFiles} />;
  }
}

export default graphql(allFiles, { name: "allFiles" })(FilesContainer);
