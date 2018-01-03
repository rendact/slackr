import React from "react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import deleteFile from "queries/File/delete";
import deleteMessage from "queries/Messages/delete";
import { createMessageMtn } from "queries/Messages/create";
import allMemberTo from "queries/Channel/allMemberTo";
import ImageShareModal from "components/ImageShareModal";
import moment from "moment";
import marked from "marked";
import ImageFullModal from "../ImageFullModal";
import myUserId from "constans/myUserId";
import classnames from "classnames";

class ChatItemImage extends React.Component {
  constructor(props) {
    super(props);
    this.onImageToggle = this.onImageToggle.bind(this);
    this.imageShareModalToggle = this.imageShareModalToggle.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onImageShareModalSubmit = this.onImageShareModalSubmit.bind(this);

    this.state = {
      isImageFullModalOpen: false,
      isImageShareModalOpen: false,
      deleteProcess: false
    };
  }

  onImageToggle() {
    this.setState(prevState => ({
      isImageFullModalOpen: !prevState.isImageFullModalOpen
    }));
  }

  imageShareModalToggle() {
    this.setState(prevState => ({
      isImageShareModalOpen: !prevState.isImageShareModalOpen
    }));
  }

  onDeleteClick(e) {
    this.setState({ deleteProcess: !this.state.deleteProcess });
    this.props
      .deleteMessage({ variables: { messageId: this.props.id } })
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
    const { title, imageUrl, caption, authorId } = this.props;
    return (
      <div>
        <div
          className={classnames("chat-item-image", {
            disabled: this.state.deleteProcess
          })}
        >
          <div
            className={classnames("actions", {
              disabled: this.state.deleteProcess
            })}
          >
            <button
              disabled={this.state.deleteProcess}
              onClick={this.imageShareModalToggle}
            >
              <span className="fa fa-share" />
            </button>

            {authorId === myUserId && (
              <button
                disabled={this.state.deleteProcess}
                onClick={this.onDeleteClick}
              >
                <span className="fa fa-trash" />
              </button>
            )}
          </div>
          <p>
            Uploaded this image: <b>{title}</b>
          </p>
          <img
            className="img-thumbnail"
            src={imageUrl}
            style={{ cursor: "zoom-in", maxWidth: 300 }}
            onClick={this.onImageToggle}
          />
          <ImageFullModal
            toggle={this.onImageToggle}
            isOpen={this.state.isImageFullModalOpen}
            imageUrl={imageUrl}
            title={title}
            caption={caption}
          />
          {caption && (
            <div>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked(
                    ' <span class="fa fa-quote-left" style=" margin-right: 5px ;" ></span>' +
                      caption,
                    { sanitize: false }
                  )
                }}
              />
            </div>
          )}
        </div>
        <ImageShareModal
          isOpen={this.state.isImageShareModalOpen}
          imageUrl={imageUrl}
          toggle={this.imageShareModalToggle}
          onCancel={e => {
            e.preventDefault();
            this.imageShareModalToggle();
          }}
          channels={this.props.channels}
          onSubmit={this.onImageShareModalSubmit}
          title={title}
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
)(ChatItemImage);
