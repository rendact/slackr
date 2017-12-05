import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";

export default class OauthButton extends Component {
  render() {
    return (
      <Row>
        <Col md={12}>
          <Button block>Social Login</Button>
        </Col>
      </Row>
    );
  }
}
