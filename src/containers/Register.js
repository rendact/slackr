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

export default class Register extends Component {
  render() {
    return (
      <Container style={{ margin: "0 auto", maxWidth: 500 }}>
        <Row>
          <Col md={12}>
            <h3>Register Form</h3>
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
