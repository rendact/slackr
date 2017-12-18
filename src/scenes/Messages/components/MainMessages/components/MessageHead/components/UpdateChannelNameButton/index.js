import React from "react";
import { connect } from "react-redux";
import channelNameEditingToggle from "../../actions/channelNameEditingToggle";
import UpdateChannelNameButton from "./components/UpdateChannelNameButton";

class AddUserButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.dispatch(channelNameEditingToggle());
  }

  render() {
    return <UpdateChannelNameButton onClick={this.onClick} />;
  }
}

export default connect()(AddUserButtonContainer);
