import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DMItem from "./DMItem";

export default class CreateDm extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} size="lg">
        <ModalHeader>Direct Messages</ModalHeader>
        <ModalBody id="dm-list">
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
          <DMItem />
        </ModalBody>
        <ModalFooter>
          Crafted by <span className="text-muted"> UpSlack team</span>
        </ModalFooter>
      </Modal>
    );
  }
}
