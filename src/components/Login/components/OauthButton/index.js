import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import lock from "utils/auth";

export default class OauthButton extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}
  render() {
    return (
      <Row>
        <Col md={12}>
          <Button onClick={() => lock.show()} block>
            social
          </Button>
        </Col>
      </Row>
    );
  }
}
