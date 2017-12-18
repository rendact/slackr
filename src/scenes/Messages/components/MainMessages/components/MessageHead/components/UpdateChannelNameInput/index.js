import React, { Component } from "react";
import { connect } from "react-redux";

import channelNameEditingToggle from "../../actions/channelNameEditingToggle";
import UpdateChannelNameInput from "./components/UpdateChannelNameInput";

class UpdateChannelName extends Component {
  constructor(props) {
    super(props);

    this.onCancelClick = this.onCancelClick.bind(this);
  }

  onCancelClick(e) {
    e.preventDefault();
    this.props.dispatch(channelNameEditingToggle());
  }

  render() {
    const { isVisible, name, spanIcon } = this.props;
    return (
      <UpdateChannelNameInput
        isVisible={isVisible}
        spanIcon={spanIcon}
        onCancelClick={this.onCancelClick}
        name={name}
        onSubmit={() => {}}
        initialValues={{ name: name }}
      />
    );
  }
}

export default connect()(UpdateChannelName);
