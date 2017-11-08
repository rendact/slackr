import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Sidebar from "../components/Sidebar";
import MessagesWrapper from "../components/MessagesWrapper";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar />
          <MessagesWrapper />
        </Row>
      </Container>
    );
  }
}

export default App;
