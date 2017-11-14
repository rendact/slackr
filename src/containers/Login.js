import React, { Component } from "react";
import { Container, Row, Button, Col, Form, Alert } from "reactstrap";
import { graphql } from "react-apollo";
import { loginQry } from "../queries/Login";
import { reduxForm, Field } from "redux-form";
import { Redirect } from "react-router-dom";
import { renderInputText } from "../components/reduxFormComponents/renderInputText";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(val) {
    this.props
      .login({
        variables: { input: { username: val.email, password: val.password } }
      })
      .then(({ data: { loginUser: { token, user: { id } } } }) => {
        localStorage.setItem("slackrToken", token);
        localStorage.setItem("slackrUserId", id);
        this.setState({ success: true, error: false });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  render() {
    let { success } = this.state;
    let { from } = this.props.location.state || {
      from: { pathname: "/messages" }
    };

    if (success || localStorage.getItem("slackrToken")) {
      return <Redirect to={from} />;
    }

    return (
      <Container style={{ margin: "0 auto", maxWidth: 500 }}>
        <Row>
          <Col md={12}>
            <h3>Login Form</h3>
            <Alert isOpen={this.state.error} color="danger">
              Wrong username or password
            </Alert>
            <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
              <Field
                label="Email"
                name="email"
                for="email"
                id="email"
                type="email"
                component={renderInputText}
                placeholder="Your Email here"
              />
              <Field
                label="Password"
                for="password"
                type="password"
                component={renderInputText}
                id="password"
                name="password"
              />
              <Button>Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login = reduxForm({ form: "login" })(Login);

export default graphql(loginQry, { name: "login" })(Login);
