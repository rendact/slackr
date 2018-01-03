import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import FileItem from "./components/FileItem";
import ImageShareModal from "components/ImageShareModal";
import deleteFile from "queries/File/delete";
import deleteMessage from "queries/Messages/delete";
import { createMessageMtn } from "queries/Messages/create";
import allMemberTo from "./queries/Channel/allMemberTo";
import myUserId from "constans/myUserId";

class FileItemContainer extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.imageShareModalToggle = this.imageShareModalToggle.bind(this);
    this.onImageShareModalSubmit = this.onImageShareModalSubmit.bind(this);

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
      .deleteMessage({ variables: { messageId: this.props.messageId } })
      .then(({ deleteMessage }) => {
        const {
          changedMessage: {
            attachment: {
              chatAttachment: { aggregations: { count: messagesInFileCount } }
            }
          }
        } = deleteMessage;

        if (messagesInFileCount === 0) {
          // check, if file still belong to message or not. if not so, delete the file
          // else dont delete the file
          this.props
            .deleteFile({ variables: { fileId: this.props.fileId } })
            .then(() => {
              this.setState({ deleteProcess: !this.state.deleteProcess });
            })
            .catch(error => {
              this.setState({ deleteProcess: !this.state.deleteProcess });
            });
          return;
        }

        this.setState({ deleteProcess: !this.state.deleteProcess });
      })
      .catch(error => {
        this.setState({ deleteProcess: !this.state.deleteProcess });
      });
  }

  onImageShareModalSubmit(val) {
    if (!val.channel) {
      throw new Error("no channel id ");
    }
    return new Promise((res, rej) => {
      this.props
        .createMessage({
          variables: {
            input: {
              channelId: val.channel,
              attachmentId: this.props.fileId,
              content: val.caption,
              authorId: myUserId
            }
          }
        })
        .then(data => {
          this.imageShareModalToggle();
          res(data);
          /*
          this.props.history.push({
            pathname: "/messages/" + val.channel,
            state: { channelId: val.channel }
          });
          */
        })
        .catch(error => {
          this.imageShareModalToggle();
          rej(error);
        });
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
          onCancel={e => {
            e.preventDefault();
            this.imageShareModalToggle();
          }}
          channels={this.props.channels}
          onSubmit={this.onImageShareModalSubmit}
          title={this.props.title}
        />
      </div>
    );
  }
}
export default compose(
  graphql(deleteFile, { name: "deleteFile" }),
  graphql(deleteMessage, { name: "deleteMessage" }),
  graphql(allMemberTo, {
    name: "channels",
    options: { variables: { userId: myUserId } }
  }),
  graphql(createMessageMtn, {
    name: "createMessage"
  }),
  withRouter
)(FileItemContainer);
