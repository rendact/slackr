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
    // loading userList
    this.props.userList &&
      this.props.userList.then(
        ({ data: { viewer: { allUsers: { edges: userList } } } }) =>
          this.setState({ userList: userList })
      );
  }

  render() {
    const { id, name, participants: { edges: participants } } = this.props;
    const currentUserId = localStorage.getItem("slackrUserId");

    let otherNode = participants.find(p => currentUserId !== p.node.id);

    if (!otherNode) {
      // the hack :)
      // this will display other name
      const userListIdFromName = name.split(";");
      const otherId = userListIdFromName.find(id => id !== currentUserId);
      otherNode = this.state.userList.find(u => u.node.id === otherId);
    }

    const otherName = otherNode.node.fullname
      ? otherNode.node.fullname
      : otherNode.node.username;

    return (
      <dd>
        <Link to={this.generateChannelUrl(id)}>
          <span className="fa fa-circle" style={{ color: "green" }} />{" "}
          {otherName}
        </Link>
      </dd>
    );
  }
}
