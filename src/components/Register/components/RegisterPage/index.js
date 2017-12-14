// system imports
import React, { Component } from "react";
import { Container, Row, Col, Alert, Form, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";

// project imports
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import renderPasswordMatch from "components/reduxFormComponents/renderPasswordMatch";
import required from "utils/reduxFormValidations/required";

class LoginPage extends Component {
  render() {
    const { isError, onSubmit, submitting, errorMessage } = this.props;
    return (
        <Row>
          <Col md={12}>
            <h3>Register Form</h3>
            <Alert isOpen={isError} color="danger">
              {errorMessage}
            </Alert>
            <Form onSubmit={this.props.handleSubmit(onSubmit)}>
              <Field
                name="fullname"
                id="fullname"
                type="text"
                component={renderInputText}
                placeholder="Full Name"
                disabled={submitting}
              />
              <Field
                name="email"
                id="email"
                type="email"
                component={renderInputText}
                disabled={submitting}
                validate={[required]}
                placeholder="Email"
              />
              <Field
                type="text"
                component={renderInputText}
                id="username"
                name="username"
                placeholder="User Name"
                disabled={submitting}
                validate={[required]}
              />
              <Field
                name="password"
                component={renderPasswordMatch}
                disabled={submitting}
              />
              <Button color="primary" style={{ cursor: "pointer" }}>
                {submitting ? (
                  <span className="fa fa-cog fa-spin fa-fw" />
                ) : (
                  "Register"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
    );
  }
}

export default reduxForm({ form: "login" })(LoginPage);
