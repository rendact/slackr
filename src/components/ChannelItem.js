import React, { Component } from "react";

export default class ChannelItem extends Component {
  generateChannelUrl(id) {
    return `/messages/${id}`;
  }

  render() {
    const { id, type, name } = this.props;
    return (
      <dd>
        <a href={this.generateChannelUrl(id)}>
          <span>{type === "public" ? "\u0023" : "\ue567"}</span> {name}
        </a>
      </dd>
    );
  }
}
