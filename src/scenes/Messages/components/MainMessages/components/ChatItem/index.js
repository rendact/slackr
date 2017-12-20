import React, { Component } from "react";
import { Media, Tooltip } from "reactstrap";
import dummyprofile from "images/dummy-profile.png";
import moment from "moment";
import marked from "marked";
import ImageFullModal from "./components/ImageFullModal";
import { highlightAuto } from "highlightjs";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTooltipOpen: false,
      isImageFullModalOpen: false,
      isDisplaySnippetFull: false
    };

    this.onImageToggle = this.onImageToggle.bind(this);
    this.onShowMoreToggle = this.onShowMoreToggle.bind(this);
  }

  onImageToggle() {
    this.setState(prev => ({
      isImageFullModalOpen: !prev.isImageFullModalOpen
    }));
  }

  onShowMoreToggle() {
    this.setState(prev => ({
      isDisplaySnippetFull: !prev.isDisplaySnippetFull
    }));
  }

  render() {
    const {
      image,
      head,
      body,
      createdAt,
      id,
      attachment,
      snippet
    } = this.props;
    const onChatFormat = "hh:mm A";

    let chat = body && (
      <span dangerouslySetInnerHTML={{ __html: marked(body) }} />
    );

    if (snippet) {
      require("highlightjs/styles/atom-one-dark.css");
      const code = "```" + snippet.code + "```";
      let codeMarked;
      if (snippet.lang)
        codeMarked = highlightAuto(snippet.code, [snippet.lang]);
      else codeMarked = highlightAuto(snippet.code);
      chat = (
        <div>
          <p>
            Uploaded this snippet: <b>{snippet.title}</b>
          </p>
          <pre>
            <code
              className={"hljs " + codeMarked.language}
              style={{
                maxHeight: this.state.isDisplaySnippetFull ? "none" : 100,
                overflow: "hidden"
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: codeMarked.value }} />
            </code>
            <button
              onClick={this.onShowMoreToggle}
              className="btn btn-info btn-sm"
            >
              {this.state.isDisplaySnippetFull ? "Show less" : "Show more"}
            </button>
          </pre>
          {body && (
            <div>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked(
                    ' <span class="fa fa-quote-left" style=" margin-right: 5px ;" ></span>' +
                      body,
                    { sanitize: false }
                  )
                }}
              />
            </div>
          )}
        </div>
      );
    }

    if (attachment) {
      chat = (
        <div>
          <p>
            Uploaded this image: <b>{attachment.name}</b>
          </p>
          <img
            className="img-thumbnail"
            src={attachment.blobUrl}
            style={{ cursor: "zoom-in", maxWidth: 300 }}
            onClick={this.onImageToggle}
          />
          <ImageFullModal
            toggle={this.onImageToggle}
            isOpen={this.state.isImageFullModalOpen}
            imageUrl={attachment.blobUrl}
            title={attachment.name}
            caption={body}
          />
          {body && (
            <div>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked(
                    ' <span class="fa fa-quote-left" style=" margin-right: 5px ;" ></span>' +
                      body,
                    { sanitize: false }
                  )
                }}
              />
            </div>
          )}
        </div>
      );
    }

    return (
      <Media style={{ padding: "0 12px" }} className="chatItem">
        <Media left href="#">
          <Media
            className="avatar img-thumbnail"
            object
            src={image ? image : dummyprofile}
          />
        </Media>
        <Media body className="chatBody">
          <Media heading>
            {head ? head : "username"}{" "}
            <Tooltip
              placement="top"
              isOpen={this.state.dateTooltipOpen}
              target={"dateTooltip" + id}
              toggle={() =>
                this.setState({ dateTooltipOpen: !this.state.dateTooltipOpen })}
            >
              {moment(createdAt).calendar()}
            </Tooltip>
            <small
              className="text-muted"
              style={{ fontSize: "60%" }}
              id={"dateTooltip" + id}
            >
              {moment(createdAt).format(onChatFormat)}
            </small>
          </Media>
          {chat}
        </Media>
      </Media>
    );
  }
}
