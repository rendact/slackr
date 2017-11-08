import React, { Component } from "react";
import { Media } from "reactstrap";

export default class ChatItem extends Component {
  render() {
    return (
      <Media>
        <Media left href="#">
          <Media object src="http://lorempixel.com/64/64" />
        </Media>
        <Media body>
          <Media heading>Head</Media>
          Body
        </Media>
      </Media>
    );
  }
}
