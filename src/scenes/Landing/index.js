import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

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
            <Link to="/login">
              <Button
                style={{
                  position: "absolute",
                  zIndex: 15,
                  top: "50%",
                  left: "50%",
                  margin: "-100px 0 0 -150px",
                  cursor: "pointer"
                }}
                size="lg"
              >
                go to login page
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
