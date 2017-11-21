import React, { Component } from "react";
import { Media, Tooltip } from "reactstrap";
import dummyprofile from "../images/dummy-profile.png";
import moment from "moment";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTooltipOpen: false
    };
  }

  render() {
    const { image, head, body, createdAt, id } = this.props;
    const onChatFormat = "hh:mm A";

    return (
      <Media style={{ padding: "0 12px" }} className="chatItem">
        <Media left href="#">
          <Media className="avatar" object src={image ? image : dummyprofile} />
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
          {body ? body : "text hello message"}
        </Media>
      </Media>
    );
  }
}
