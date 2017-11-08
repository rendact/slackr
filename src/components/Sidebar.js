import React, { Component } from "react";
import { Col } from "reactstrap";

class Sidebar extends Component {
  render() {
    return (
      <Col
        md={2}
        className="sidebar"
        style={{ height: "100vh", background: "red" }}
        id="sidebar"
      >
        {this.props.children}
      </Col>
    );
  }
}

export default Sidebar;
