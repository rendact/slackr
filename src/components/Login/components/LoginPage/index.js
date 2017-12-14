// system imports
import React, { Component } from "react";
import { Container, Row, Col, Alert, Form, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";

// project imports
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import OauthButton from "../../components/OauthButton";

class LoginPage extends Component {
  render() {
    const { isError, onSubmit, isProcess, errorMessage } = this.props;
    return (
      <Row>
        <Col md={12}>
          <h3>Login Form</h3>
          <Alert isOpen={isError} color="danger">
            {errorMessage}
          </Alert>
          <Form onSubmit={this.props.handleSubmit(onSubmit)}>
            <Field
              name="username"
              id="username"
              type="text"
              component={renderInputText}
              placeholder="Your username here"
              disabled={isProcess}
            />
            <Field
              type="password"
              component={renderInputText}
              name="password"
              id="password"
              placeholder="Type your password"
              disabled={isProcess}
            />
            <div className="form-group">
              <Button color="primary" style={{ cursor: "pointer" }}>
                  {isProcess ? (
                    <span className="fa fa-cog fa-spin fa-fw" />
                  ) : (
                    "Login"
                  )}
              </Button>
              {process.env.REACT_APP_OAUTH_TOKEN ? <OauthButton /> : null}
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default reduxForm({ form: "login" })(LoginPage);
