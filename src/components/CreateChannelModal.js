import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form
} from "reactstrap";
import { renderInputGroupAddonText } from "./reduxFormComponents/renderInputGroupAddonText";

class CreateChannelModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(val) {
    this.props
      .createChannelSubmit(val)
      .then(data => {
        this.props.reset();
      })
      .catch(error => {
        this.props.reset();
        debugger;
      });
  }
  render() {
    let { createChannelOpen, createChannelToggle, handleSubmit } = this.props;
    return (
      <Modal isOpen={createChannelOpen} size="lg" toggle={createChannelToggle}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <ModalHeader toggle={createChannelToggle}>
            Create A Channel{" "}
            <small>Channel are where your members communicate</small>
          </ModalHeader>
          <ModalBody>
            <Field
              label="Name"
              name="name"
              addon="#"
              helpText="names must lowercase, without period or spaces and shorter than 22 characters"
              component={renderInputGroupAddonText}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default reduxForm({ form: "createChannel" })(CreateChannelModal);
