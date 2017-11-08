import React, { Component } from "react";
import { Col } from "reactstrap";

export default class MessagesWrapper extends Component {
  render() {
    return (
      <Col
        md={10}
        style={{
          background: "blue",
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
        className="messages-wrapper"
        id="messages-wrapper"
      >
        {this.props.children}
      </Col>
    );
  }
}
