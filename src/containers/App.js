import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Sidebar from "../components/Sidebar";
import MessagesWrapper from "../components/MessagesWrapper";
import MessageInput from "../components/MessageInput";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar />
          <MessagesWrapper className={{ position: "relative" }}>
            <MessageInput />
          </MessagesWrapper>
        </Row>
      </Container>
    );
  }
}

export default App;
