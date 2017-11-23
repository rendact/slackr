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
import { reduxForm, Field } from "redux-form";
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import image from "images/dummy-profile.png";

class AccountModal extends Component {
  constructor(props) {
    super(props);

    this.onImageClick = this.onImageClick.bind(this);
  }
  onImageClick(e) {
    // TODO: make it in another component
  }
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit || (() => {}))}>
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
            <Field
              type="text"
              label="Full Name"
              placeholder="Your Full Name"
              name="fullName"
              for="fullName"
              component={renderInputText}
            />
            <Field
              type="text"
              label="Display Name"
              placeholder="The display name"
              name="displayName"
              for="displayName"
              component={renderInputText}
            />
            <Field
              type="password"
              label="Password"
              name="password"
              placeholder="enter a new password"
              for="password"
              component={renderInputText}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}

export default reduxForm({ form: "accountSettingForm" })(AccountModal);
