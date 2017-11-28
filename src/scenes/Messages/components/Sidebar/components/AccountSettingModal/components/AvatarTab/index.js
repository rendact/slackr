import React, { Component } from "react";
import AvatarTab from "./components/AvatarTab";
import { graphql } from "react-apollo";
import { getUser } from "scenes/Messages/components/Sidebar/queries/getUser";
import { createAvatar } from "./mutations/createAvatar";

class AvatarTabWithMutation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      requiredError: false
    };

    this.onImageChange = this.onImageChange.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
  }

  onUpdateClick(e) {
    if (!this.state.file) {
      return this.setState({ requiredError: true });
    }

    this.setState({ requiredError: false });
    const file = this.state.file;
    if (!this.props.user.getUser.avatar) {
      this.props
        .createAvatar({
          refetchQueries: [
            {
              query: getUser,
              variables: { id: localStorage.getItem("slackrUserId") }
            }
          ],
          variables: {
            input: {
              name: file.name,
              userAvatarId: localStorage.getItem("slackrUserId"),
              blobFieldName: "avatar",
              avatar: file
            }
          }
        })
        .then(data => {
          debugger;
        })
        .catch(error => {
          debugger;
        });
    }
  }

  onImageChange(file) {
    this.setState({ ...file });
  }

  render() {
    const avatar = this.props.user.getUser
      ? this.props.user.getUser.avatar
        ? this.props.user.getUser.avatar.blobUrl
        : null
      : null;
    return (
      <AvatarTab
        onUpdateClick={this.onUpdateClick}
        onChange={this.onImageChange}
        requiredError={this.state.requiredError}
        initialImage={avatar}
      />
    );
  }
}

const withCreateAvatar = graphql(createAvatar, { name: "createAvatar" })(
  AvatarTabWithMutation
);

export default graphql(getUser, {
  name: "user",
  options: { variables: { id: localStorage.getItem("slackrUserId") } }
})(withCreateAvatar);
