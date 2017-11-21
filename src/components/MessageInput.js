import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderInputGroupTextWithSend } from "./reduxFormComponents/renderInputGroupText";
import { Form } from "reactstrap";

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
        // by triggering this, the message body scroll to bottom
        this.props.triggerNewMessage();
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
          <Field
            component={renderInputGroupTextWithSend}
            name="messageContent"
            id="messageContent"
            isSending={isSending}
          />
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: "message" })(MessageInput);
