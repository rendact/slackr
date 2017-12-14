import React, { Component } from "react";
import ProfileItem from "./components/ProfileItem";
import { connect } from "react-redux";
import { toggleAccountSettingModal } from "scenes/Messages/components/Sidebar/actions/accountSettingModal";
import { toggleProfileModal } from "scenes/Messages/components/Sidebar/actions/profileModal";

class ProfileItemContainer extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e && e.preventDefault();
    this.props.dispatch(toggleAccountSettingModal());
    this.props.dispatch(toggleProfileModal());
  }
  render() {
    const { isOpen } = this.props;
    return <ProfileItem onClick={this.onClick} />;
  }
}

export default connect(props => {
  debugger;
})(ProfileItemContainer);
