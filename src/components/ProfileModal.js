import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Nav, NavItem } from "reactstrap";

export default class ProfileModal extends Component {
  render() {
    let {
      profileModalOpen,
      profileModalToggle,
      profileModalSignout,
      username
    } = this.props;
    return (
      <Modal isOpen={profileModalOpen} toggle={profileModalToggle}>
        <ModalHeader>{username}</ModalHeader>
        <ModalBody>
          <Nav vertical>
            <NavItem>
              <a href="#" className="nav-link" onClick={profileModalSignout}>
                Sign out of<strong>upSlack</strong>
              </a>
            </NavItem>
          </Nav>
        </ModalBody>
      </Modal>
    );
  }
}
