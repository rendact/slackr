import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Form, InputGroup, InputGroupButton, FormText } from "reactstrap";
import ImageInput from "../ImageInput";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(val) {
    this.props
      .onSubmit(val)
      .then(() => {
        this.props.reset();
        //this.props.triggerNewMessage();
      })
      .catch(() => {
        debugger;
      });
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
            <ImageInput channelId={this.props.channelId} />
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
