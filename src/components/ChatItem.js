import React, { Component } from "react";
import { Media } from "reactstrap";
import dummyprofile from "../images/dummy-profile.png";

export default class ChatItem extends Component {
  render() {
    return (
      <Media style={{ padding: "0 12px" }}>
        <Media left href="#">
          <Media object src={dummyprofile} />
        </Media>
        <Media body>
          <Media heading>Head</Media>
          Body
        </Media>
      </Media>
    );
  }
}
