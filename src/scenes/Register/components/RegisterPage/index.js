// system imports
import React, { Component } from "react";
import { Container, Row, Col, Alert, Form, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";

// project imports
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import renderPasswordMatch from "components/reduxFormComponents/renderPasswordMatch";
import passwordMatch from "utils/reduxFormValidations/passwordMatch";
import required from "utils/reduxFormValidations/required";

class LoginPage extends Component {
  render() {
    const { isError, onSubmit, submitting } = this.props;
    return (
      <Container style={{ margin: "0 auto", maxWidth: 500 }}>
        <Row>
          <Col md={12}>
            <h3>Register Form</h3>
            <Alert isOpen={isError} color="danger">
              Wrong username or password
            </Alert>
            <Form onSubmit={this.props.handleSubmit(onSubmit)}>
              <Field
                label="Full Name"
                name="fullname"
                for="fullname"
                id="fullname"
                type="text"
                component={renderInputText}
                placeholder=""
                disabled={submitting}
              />
              <Field
                label="Display Name"
                name="displayname"
                for="displayname"
                id="displayname"
                type="text"
                component={renderInputText}
                placeholder=""
                disabled={submitting}
              />
              <Field
                label="Email"
                name="email"
                for="email"
                id="email"
                type="email"
                component={renderInputText}
                disabled={submitting}
                validate={[required]}
              />
              <hr />
              <p>input forms below used for login purpose</p>
              <Field
                label="Username"
                for="username"
                type="text"
                component={renderInputText}
                id="username"
                name="username"
                disabled={submitting}
                validate={[required]}
              />
              <Field
                name="password"
                component={renderPasswordMatch}
                disabled={submitting}
                validate={[passwordMatch]}
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
      </Container>
    );
  }
}

export default reduxForm({ form: "login" })(LoginPage);
