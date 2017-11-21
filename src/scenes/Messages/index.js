import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import MessagesWrapper from "containers/MessagesWrapper";
import CreateChannel from "containers/CreateChannelWithMutation";
import CreateDm from "containers/CreateDmWithData";

import Sidebar from "./components/Sidebar";

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
