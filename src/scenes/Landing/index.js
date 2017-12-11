import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import AuthTab from "./components/AuthTab";

class Home extends Component {
  render() {
    return (
      <Container
        fluid
        style={{
          margin: "0 auto",
          height: "100vh",
          background: "purple",
          alignItems: "center"
        }}
      >
        <Row>
          <Col md={12}>
            <AuthTab />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
