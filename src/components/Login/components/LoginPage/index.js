// system imports
import React, { Component } from "react";
import { Container, Row, Col, Alert, Form, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";

// project imports
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import OauthButton from "../../components/OauthButton";

class LoginPage extends Component {
  componentWillReceiveProps(props) {
    debugger;
  }
  render() {
    const { isError, onSubmit, submitting, errorMessage } = this.props;
    return (
      <Row>
        <Col md={12}>
          <h3>Login Form</h3>
          <Alert isOpen={isError} color="danger">
            {errorMessage}
          </Alert>
          <Form onSubmit={this.props.handleSubmit}>
            <Field
              name="username"
              id="username"
              type="text"
              component={renderInputText}
              placeholder="Your username here"
              disabled={submitting}
            />
            <Field
              type="password"
              component={renderInputText}
              name="password"
              id="password"
              placeholder="Type your password"
              disabled={submitting}
            />
            <div className="form-group">
              <Button color="primary" style={{ cursor: "pointer" }}>
                  {submitting ? (
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
