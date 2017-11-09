import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label
} from "reactstrap";
import { graphql } from "react-apollo";
import { loginQry } from "../queries/Login";

class Login extends Component {
  handleSubmit(val) {
    debugger;
  }
  render() {
    return (
      <Container style={{ margin: "0 auto", maxWidth: 500 }}>
        <Row>
          <Col md={12}>
            <h3>Login Form</h3>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" id="email" placeholder="Your email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" id="password" />
              </FormGroup>
              <Button>Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default graphql(loginQry, { name: "login" })(Login);
