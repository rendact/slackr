import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DMItem extends Component {
  generateChannelUrl(id) {
    return `/messages/${id}`;
  }

  render() {
    const {
      id,
      type,
      name,
      participants: { edges: participants }
    } = this.props;

    const otherNode = participants.find(
      p => localStorage.getItem("slackrUserId") !== p.node.id
    );
    return (
      <dd>
        <Link to={this.generateChannelUrl(id)}>
          <span className="fa fa-circle" style={{ color: "green" }} />{" "}
          {otherNode.node.username}
        </Link>
      </dd>
    );
  }
}
