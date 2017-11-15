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
          <span>{type === "public" ? "\u0023" : "\ue567"}</span> {name}
        </Link>
      </dd>
    );
  }
}
