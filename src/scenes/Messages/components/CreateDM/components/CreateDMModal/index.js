import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import DMItem from "../../components/DMItem";

export default class CreateDm extends Component {
  render() {
    const {
      isLoading,
      createDmIsOpen,
      createDmToggle,
      createDmHeaderClick,
      DmItems
    } = this.props;
    return (
      <Modal toggle={createDmToggle} isOpen={createDmIsOpen || false} size="lg">
        <ModalHeader onClick={createDmHeaderClick}>Direct Messages</ModalHeader>
        <ModalBody id="dm-list">
          {isLoading ? (
            <div id="users-loading">
              <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            (DmItems &&
              DmItems.map((item, i) => (
                <DMItem
                  username={item.node.username}
                  userId={item.node.id}
                  key={i}
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
