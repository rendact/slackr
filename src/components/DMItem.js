import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DMItem extends Component {
  constructor(props) {
    super(props);

    this.state = { userList: [] };
  }

  generateChannelUrl(id) {
    return `/messages/${id}`;
  }

  componentWillMount() {
    debugger;
    this.props.userList &&
      this.props.userList.then(
        ({ data: { viewer: { allUsers: { edges: userList } } } }) =>
          this.setState({ userList: userList })
      );
  }

  render() {
    const {
      id,
      type,
      name,
      participants: { edges: participants },
      userList
    } = this.props;
    const currentUserId = localStorage.getItem("slackrUserId");

    let otherNode = participants.find(p => currentUserId !== p.node.id);

    if (!otherNode) {
      // the hack :)
      const userListIdFromName = name.split(";");
      const otherId = userListIdFromName.find(id => id !== currentUserId);
      otherNode = this.state.userList.find(u => u.node.id === otherId);
    }

    return (
      <dd>
        <Link to={this.generateChannelUrl(id)}>
          <span className="fa fa-circle" style={{ color: "green" }} />{" "}
          {otherNode && otherNode.node.username}
        </Link>
      </dd>
    );
  }
}
