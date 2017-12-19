import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {
  Form,
  InputGroup,
  InputGroupButton,
  InputGroupAddon,
  FormText
} from "reactstrap";
import ImageInputModal from "../ImageInputModal";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageAddonClick = this.onImageAddonClick.bind(this);
    this.imageInputModalToggle = this.imageInputModalToggle.bind(this);

    this.state = {
      isImageInputModalOpen: false
    };
  }
  onSubmit(val) {
    this.props
      .onSubmit(val)
      .then(() => {
        this.props.reset();
        // by triggering this, the message body scroll to bottom
        //this.props.triggerNewMessage();
      })
      .catch(() => {
        debugger;
      });
  }

  imageInputModalToggle() {
    this.setState(prevState => ({
      isImageInputModalOpen: !prevState.isImageInputModalOpen
    }));
  }

  onImageAddonClick(e) {
    this.input.click();
  }
  render() {
    const { isSending } = this.props;
    return (
      <div
        id="input-wrapper"
        style={{
          margin: 15
        }}
      >
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <InputGroup>
            <InputGroupAddon onClick={this.onImageAddonClick}>
              <span className="fa fa-file-image-o" />
              <input
                type="file"
                style={{ display: "none" }}
                ref={input => (this.input = input)}
                onChange={this.onImageInputChange}
              />
              <ImageInputModal
                isOpen={this.state.isImageInputModalOpen}
                toggle={this.imageInputModalToggle}
              />
            </InputGroupAddon>
            <Field
              className="form-control"
              disabled={isSending}
              id="messageContent"
              name="messageContent"
              component="input"
            />
            <InputGroupButton disabled={isSending} type="submit">
              Send
            </InputGroupButton>
            {isSending && (
              <FormText
                color="muted"
                style={{ marginTop: 40, position: "absolute" }}
              >
                Sending...
              </FormText>
            )}
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: "message" })(MessageInput);
