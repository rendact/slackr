import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import marked from "marked";

export default ({ imageUrl, caption, title, isOpen, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle} size="lg">
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      <img src={imageUrl} className="img img-fluid" />
      {caption && (
        <div>
          <span
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: marked(
                ' <span class="fa fa-quote-left" style=" margin-right: 5px ;" ></span>' +
                  caption,
                { sanitize: false }
              )
            }}
          />
        </div>
      )}
    </ModalBody>
    <ModalFooter>
      <button
        className="btn btn-warning"
        onClick={e => {
          e.preventDefault();
          toggle();
        }}
      >
        Close
      </button>
    </ModalFooter>
  </Modal>
);
