import React, { Component } from "react";
import AccountModal from "./components/Modal";
import { connect } from "react-redux";
import { toggleAccountSettingModal } from "scenes/Messages/components/Sidebar/actions/accountSettingModal";

class AccountSettingModal extends Component {
  render() {
    const { isOpen, dispatch } = this.props;
    return (
      <AccountModal
        isOpen={isOpen}
        toggle={() => {
          dispatch(toggleAccountSettingModal());
        }}
      />
    );
  }
}

const mapStateToProps = state => state.accountSetting || {};

export default connect(mapStateToProps)(AccountSettingModal);
