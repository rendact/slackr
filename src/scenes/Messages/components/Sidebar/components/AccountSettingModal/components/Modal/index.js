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
import renderPasswordMatch from "components/reduxFormComponents/renderPasswordMatch";

class AccountModal extends Component {
  constructor(props) {
    super(props);

    this.onImageClick = this.onImageClick.bind(this);
  }
  onImageClick(e) {
    // TODO: make it in another component
  }
  render() {
    const { onSubmit, isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <form onSubmit={this.props.handleSubmit(value => {})}>
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
              label="Old Password"
              name="oldPassword"
              placeholder="enter your old password"
              for="oldPassword"
              component={renderInputText}
            />
            <Field
              name="newPassword"
              component={renderPasswordMatch}
              validate={val =>
                (val && val.match) || val ? undefined : "Password not match"}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default reduxForm({ form: "accountSettingForm" })(AccountModal);
