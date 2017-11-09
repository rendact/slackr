import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderInputGroupTextWithSend } from "./reduxFormComponents/renderInputGroupText";
import { Form } from "reactstrap";

class MessageInput extends Component {
  render() {
    return (
      <div
        id="input-wrapper"
        style={{
          margin: 15
        }}
      >
        <Form onSubmit={this.props.handleSubmit}>
          <Field
            component={renderInputGroupTextWithSend}
            name="messageContent"
            id="messageContent"
          />
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: "message" })(MessageInput);
