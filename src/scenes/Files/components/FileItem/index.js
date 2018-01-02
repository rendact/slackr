import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FileItem from "./components/FileItem";
import ImageShareModal from "../../components/ImageShareModal";
import deleteFile from "../../queries/File/delete";
import deleteMessage from "../../queries/Message/delete";

class FileItemContainer extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.imageShareModalToggle = this.imageShareModalToggle.bind(this);

    this.state = {
      deleteProcess: false,
      isImageShareModalOpen: false
    };
  }

  imageShareModalToggle() {
    this.setState(prevState => ({
      isImageShareModalOpen: !prevState.isImageShareModalOpen
    }));
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
      <div>
        <FileItem
          {...this.props}
          deleteProcess={this.state.deleteProcess}
          onDeleteClick={this.onDeleteClick}
          onShareClick={() => {
            this.imageShareModalToggle();
          }}
        />
        <ImageShareModal
          isOpen={this.state.isImageShareModalOpen}
          imageUrl={this.props.img}
          toggle={this.imageShareModalToggle}
          onCancel={() => {
            this.imageShareModalToggle();
          }}
          initialValues={{ title: this.props.title }}
        />
      </div>
    );
  }
}
export default compose(
  graphql(deleteFile, { name: "deleteFile" }),
  graphql(deleteMessage, { name: "deleteMessage" })
)(FileItemContainer);
