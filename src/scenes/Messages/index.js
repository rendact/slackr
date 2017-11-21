import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import MessagesWrapper from "containers/MessagesWrapper";
import CreateDm from "containers/CreateDmWithData";

import Sidebar from "./components/Sidebar";
import CreateChannel from "./components/CreateChannel";

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
