import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";

import channelNameEditingToggle from "../../actions/channelNameEditingToggle";
import UpdateChannelNameInput from "./components/UpdateChannelNameInput";
import updateChannel from "./mutations/updateChannel";

class UpdateChannelName extends Component {
  constructor(props) {
    super(props);

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCancelClick(e) {
    e.preventDefault();
    this.props.dispatch(channelNameEditingToggle());
  }

  onSubmit(val) {
    return new Promise((resolve, reject) => {
      this.props
        .updateChannel({
          variables: {
            input: {
              id: this.props.channelId,
              name: val.name
            }
          }
        })
        .then(data => {
          resolve(data);
          this.props.dispatch(channelNameEditingToggle());
        })
        .catch(error => {
          reject(error);
          this.props.dispatch(channelNameEditingToggle());
        });
    });
    //
  }

  render() {
    const { isVisible, name, spanIcon } = this.props;
    return (
      <UpdateChannelNameInput
        isVisible={isVisible}
        spanIcon={spanIcon}
        onCancelClick={this.onCancelClick}
        name={name}
        onSubmit={this.onSubmit}
        initialValues={{ name: name }}
      />
    );
  }
}

export default compose(
  connect(),
  graphql(updateChannel, { name: "updateChannel" })
)(UpdateChannelName);
