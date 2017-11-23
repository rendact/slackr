import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Media,
  Button
} from "reactstrap";
import image from "images/dummy-profile.png";

class AccountModal extends Component {
  constructor(props) {
    super(props);

    this.onImageClick = this.onImageClick.bind(this);
  }
  onImageClick(e) {
    debugger;
  }
  render() {
    return (
      <Modal isOpen={true} size="lg">
        <ModalHeader>Account Name Setting</ModalHeader>
        <ModalBody>
          <div>
            <Label>Profile Picture</Label>
            <Media
              onClick={this.onImageClick}
              object
              src={image}
              className="img-thumbnail"
              style={{ display: "block", width: 100, cursor: "pointer" }}
            />
            <input
              ref={input => {
                this.file = input;
              }}
              type="file"
              style={{ visibility: "hidden", height: 0, width: 0 }}
            />
          </div>
          <FormGroup>
            <Label>Full Name</Label>
            <Input type="text" placeholder="Your Full Name" />
          </FormGroup>
          <FormGroup>
            <Label>Display Name</Label>
            <Input type="text" placeholder="The display name" />
            <FormText>aka short name</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" placeholder="enter a new password" />
            <FormText>aka short name</FormText>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Submit</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AccountModal;
