import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AccountModal extends Component {
  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Account Name Setting</ModalHeader>
        <ModalBody>This is the form</ModalBody>
        <ModalFooter>
          <small className="text-muted">upSlack</small>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AccountModal;
