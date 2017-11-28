import React, { Component } from "react";
import AvatarTab from "./components/AvatarTab";
import { graphql, compose } from "react-apollo";
import { getUser } from "scenes/Messages/components/Sidebar/queries/getUser";
import { createAvatar } from "./mutations/createAvatar";
import { updateAvatar } from "./mutations/updateAvatar";

class AvatarTabWithMutation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      requiredError: false,
      pristineError: false,
      pristine: true,
      submitting: false,
      updateSuccess: false,
      serverError: null,
      reset: false
    };

    this.onImageChange = this.onImageChange.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
  }

  onResetClick(e) {
    /* 
   * will reset to avatar provided from database, 
   * and set pristine to true
   */

    this.setState({ pristine: true, reset: true });
    return;
  }

  onUpdateClick(e) {
    if (!this.state.file) {
      return this.setState({
        serverError: null,
        requiredError: true,
        updateSuccess: false
      });
    }

    if (this.state.pristine) {
      return this.setState({
        serverError: null,
        pristineError: true,
        updateSuccess: false
      });
    }

    this.setState({
      requiredError: false,
      pristineError: false,
      submitting: true,
      updateSuccess: false,
      serverError: null
    });
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
          this.setState({
            pristine: true,
            submitting: false,
            updateSuccess: true
          });
        })
        .catch(error => {
          this.setState({ submitting: false, serverError: error.message });
        });
    } else {
      const avatar = this.props.user.getUser.avatar;
      this.props
        .updateAvatar({
          refetchQueries: [
            {
              query: getUser,
              variables: { id: localStorage.getItem("slackrUserId") }
            }
          ],
          variables: {
            input: {
              id: avatar.id,
              name: file.name,
              userAvatarId: localStorage.getItem("slackrUserId"),
              blobFieldName: "avatar",
              avatar: file
            }
          }
        })
        .then(data => {
          this.setState({
            pristine: true,
            submitting: false,
            updateSuccess: true
          });
        })
        .catch(error => {
          this.setState({ submitting: false, serverError: error.message });
        });
    }
  }

  onImageChange(file) {
    this.setState({ ...file, pristine: false, reset: false });
  }

  render() {
    const avatar = this.props.user.getUser
      ? this.props.user.getUser.avatar
        ? this.props.user.getUser.avatar.blobUrl
        : null
      : null;

    const {
      submitting,
      pristineError,
      requiredError,
      updateSuccess,
      serverError,
      reset
    } = this.state;

    return (
      <AvatarTab
        onUpdateClick={this.onUpdateClick}
        onChange={this.onImageChange}
        requiredError={requiredError}
        submitting={submitting}
        pristineError={pristineError}
        initialImage={avatar}
        updateSuccess={updateSuccess}
        serverError={serverError}
        onResetClick={this.onResetClick}
        reset={reset}
      />
    );
  }
}

const withMutation = compose(
  graphql(createAvatar, { name: "createAvatar" }),
  graphql(updateAvatar, { name: "updateAvatar" })
)(AvatarTabWithMutation);

export default graphql(getUser, {
  name: "user",
  options: { variables: { id: localStorage.getItem("slackrUserId") } }
})(withMutation);
