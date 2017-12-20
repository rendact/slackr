import React, { Component } from "react";
import { Media, Tooltip } from "reactstrap";
import dummyprofile from "images/dummy-profile.png";
import moment from "moment";
import marked from "marked";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTooltipOpen: false
    };
  }

  render() {
    const { image, head, body, createdAt, id, attachment } = this.props;
    const onChatFormat = "hh:mm A";

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
          {attachment ? (
            <div>
              <p>
                Uploaded this image: <b>{attachment.name}</b>
              </p>
              <img
                className="img-thumbnail"
                src={attachment.blobUrl}
                style={{ maxWidth: 300 }}
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
          ) : (
            <span dangerouslySetInnerHTML={{ __html: marked(body) }} />
          )}
        </Media>
      </Media>
    );
  }
}
