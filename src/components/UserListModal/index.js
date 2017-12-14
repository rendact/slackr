import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import UserItem from "components/UserItem";

export default class UserListModal extends Component {
  render() {
    const {
      isLoading,
      isOpen,
      toggle,
      onClick,
      UserItems,
      modalHeader,
      isProcessing
    } = this.props;
    return (
      <Modal toggle={toggle} isOpen={isOpen} size="lg">
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalBody id="dm-list">
          {isLoading ? (
            <div id="users-loading">
              <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            (UserItems &&
              UserItems.map((item, i) => (
                <UserItem
                  username={item.node.username}
                  userId={item.node.id}
                  image={item.node.avatar && item.node.avatar.blobUrl}
                  onClick={onClick(item.node.id)}
                  key={i}
                  isProcessing={isProcessing}
                />
              ))) ||
            "No user can be displayed."
          )}
        </ModalBody>
        <ModalFooter>
          Crafted by <span className="text-muted"> UpSlack team</span>
        </ModalFooter>
      </Modal>
    );
  }
}
