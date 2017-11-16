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
import ToggleButton from "./ToggleButton";

class CreateChannelModal extends Component {
  constructor(props) {
    super(props);

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      public: true
    };
  }

  handleChangeType(bool) {
    this.props.change("type", bool ? "public" : "private");
    this.setState({ public: bool });
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
            <ToggleButton
              textOn="Public"
              textOff="Private"
              labelOn="Any one can join this channel."
              labelOff="Only invited user can join this channel."
              onChange={this.handleChangeType}
            />
            <Field type="hidden" name="type" component="hidden" />
            <Field
              label="Name"
              name="name"
              addonFaName={this.state.public ? "hashtag" : "lock"}
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

export default reduxForm({
  form: "createChannel",
  initialValues: { type: "public" }
})(CreateChannelModal);
