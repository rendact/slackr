// system imports
import React, { Component } from "react";
import { Container, Row, Col, Alert, Form, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";

// project imports
import { renderInputText } from "components/reduxFormComponents/renderInputText";

class LoginPage extends Component {
  render() {
    const { isError, onSubmit, isProcess, errorMessage } = this.props;
    return (
      <Row
        style={{
          marginBottom: 10,
          paddingBottom: 10,
          height: "inherit",
          borderBottom: "solid gray 1px"
        }}
      >
        <Col md={12}>
          <h3>Login Form</h3>
          <Alert isOpen={isError} color="danger">
            {errorMessage}
          </Alert>
          <Form onSubmit={this.props.handleSubmit(onSubmit)}>
            <Field
              label="username"
              name="username"
              for="username"
              id="username"
              type="text"
              component={renderInputText}
              placeholder="Your Username here"
              disabled={isProcess}
            />
            <Field
              label="Password"
              for="password"
              type="password"
              component={renderInputText}
              id="password"
              name="password"
              disabled={isProcess}
            />
            <Button color="primary" style={{ cursor: "pointer" }}>
              {isProcess ? (
                <span className="fa fa-cog fa-spin fa-fw" />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default reduxForm({ form: "login" })(LoginPage);
