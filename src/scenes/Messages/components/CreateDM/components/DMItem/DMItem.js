import React, { Component } from "react";
import { Media } from "reactstrap";
import profile from "images/dummy-profile.png";

export default class DMUserItem extends Component {
  render() {
    const { username, status, image, onClick } = this.props;
    return (
      <Media className="dm-item" onClick={onClick}>
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
