import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  FormText,
  Label
} from "reactstrap";

class CreateChannelModal extends Component {
  render() {
    let {
      createChannelOpen,
      createChannelToggle,
      createChannelSubmit,
      handleSubmit
    } = this.props;
    return (
      <Form
        onSubmit={
          createChannelSubmit
            ? handleSubmit(createChannelSubmit)
            : handleSubmit(() => {})
        }
      >
        <Modal
          isOpen={createChannelOpen}
          size="lg"
          toggle={createChannelToggle}
        >
          <ModalHeader toggle={createChannelToggle}>
            Create A Channel{" "}
            <small>Channel are where your members communicate</small>
          </ModalHeader>
          <ModalBody>
            <Label>Name</Label>
            <InputGroup>
              <InputGroupAddon>#</InputGroupAddon>
              <Input />
            </InputGroup>
            <FormText color="muted">
              names must lowercase, without period or spaces and shorter than 22
              chars
            </FormText>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}

export default reduxForm({ form: "createChannel" })(CreateChannelModal);
