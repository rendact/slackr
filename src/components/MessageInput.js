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
      .then(() => this.props.reset())
      .catch(() => {
        debugger;
      });
  }
  render() {
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
          />
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: "message" })(MessageInput);
