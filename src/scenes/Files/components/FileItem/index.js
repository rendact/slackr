import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import FileItem from "./components/FileItem";
import deleteFile from "../../queries/File/delete";
import deleteMessage from "../../queries/Message/delete";

class FileItemContainer extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    this.state = {
      deleteProcess: false
    };
  }

  onDeleteClick(e) {
    this.setState({ deleteProcess: !this.state.deleteProcess });
    this.props
      .deleteFile({ variables: { fileId: this.props.fileId } })
      .then(() => {
        this.props
          .deleteMessage({ variables: { messageId: this.props.messageId } })
          .then(() => {
            this.setState({ deleteProcess: !this.state.deleteProcess });
          })
          .catch(error => {
            this.setState({ deleteProcess: !this.state.deleteProcess });
          });
      })
      .catch(error => {
        this.setState({ deleteProcess: !this.state.deleteProcess });
      });
  }

  render() {
    return (
      <FileItem
        {...this.props}
        deleteProcess={this.state.deleteProcess}
        onDeleteClick={this.onDeleteClick}
      />
    );
  }
}
export default compose(
  graphql(deleteFile, { name: "deleteFile" }),
  graphql(deleteMessage, { name: "deleteMessage" })
)(FileItemContainer);
