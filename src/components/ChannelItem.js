import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ChannelItem extends Component {
  generateChannelUrl(id) {
    return `/messages/${id}`;
  }

  render() {
    const { id, type, name } = this.props;
    return (
      <dd>
        <Link to={this.generateChannelUrl(id)}>
          <span
            className={type === "private" ? "fa fa-lock" : "fa fa-hashtag"}
          />{" "}
          {name}
        </Link>
      </dd>
    );
  }
}
