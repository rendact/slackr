import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import MessagesWrapper from "./MessagesWrapper";
import Sidebar from "./Sidebar";
import CreateChannel from "./CreateChannelWithMutation";
import CreateDm from "./CreateDmWithData";

export default class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar />
          <MessagesWrapper match={this.props.match} />
          <CreateChannel />
          <CreateDm location={this.props.location} />
        </Row>
      </Container>
    );
  }
}
