// system imports
import React, { Component } from "react";
import { Container, Row, Col, Alert, Form, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";

// project imports
import { renderInputText } from "components/reduxFormComponents/renderInputText";

class LoginPage extends Component {
  render() {
    const { isError, onSubmit, isProcess } = this.props;
    return (
      <Container style={{ margin: "0 auto", maxWidth: 500 }}>
        <Row>
          <Col md={12}>
            <h3>Login Form</h3>
            <Alert isOpen={isError} color="danger">
              Wrong username or password
            </Alert>
            <Form onSubmit={this.props.handleSubmit(onSubmit)}>
              <Field
                label="Email"
                name="email"
                for="email"
                id="email"
                type="email"
                component={renderInputText}
                placeholder="Your Email here"
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
                  <span className="fa fa-cog fa-spin  fa-fw" />
                ) : (
                  "Login"
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
