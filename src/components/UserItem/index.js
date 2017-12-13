import React, { Component } from "react";
import { Media } from "reactstrap";
import profile from "images/dummy-profile.png";

export default class UserItem extends Component {
  render() {
    const { username, status, image, onClick, isProcessing } = this.props;
    let style;
    if (isProcessing) {
      style = { pointerEvent: "none", opacity: "0.4" };
    } else {
      style = {};
    }
    return (
      <Media className="dm-item" onClick={onClick} style={style}>
        <Media left>
          <Media object src={image ? image : profile} />
        </Media>
        <Media className="dm-item-body" body>
          <Media heading>{username}</Media>
          {status}
        </Media>
      </Media>
    );
  }
}
