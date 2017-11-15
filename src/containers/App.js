import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import MessagesWrapper from "./MessagesWrapper";
import Sidebar from "./Sidebar";
import CreateChannel from "./CreateChannelWithMutation";

export default class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar />
          <MessagesWrapper />
        </Row>
        <CreateChannel />
      </Container>
    );
  }
}
