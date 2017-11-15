import React, { Component } from "react";
import { Media } from "reactstrap";
import dummyprofile from "../images/dummy-profile.png";

export default class ChatItem extends Component {
  render() {
    let { image, head, body } = this.props;
    return (
      <Media style={{ padding: "0 12px" }} className="chatItem">
        <Media left href="#">
          <Media className="avatar" object src={image ? image : dummyprofile} />
        </Media>
        <Media body className="chatBody">
          <Media heading>{head ? head : "username"}</Media>
          {body ? body : "text hello message"}
        </Media>
      </Media>
    );
  }
}
