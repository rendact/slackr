import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import Sidebar from "../components/Sidebar";
import SidebarHead from "../components/SidebarHead";
import MessagesWrapper from "./MessagesWrapper";
import CreateChannel from "./CreateChannelWithMutation";
import { createChannelToggle } from "../actions/createChannel";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar style={{ padding: 15 }}>
            <SidebarHead title="Slackr" />{" "}
            <h2>
              <a
                href="#head"
                onClick={r => {
                  r.preventDefault();
                  this.props.dispatch(createChannelToggle());
                }}
              >
                Channels
              </a>
            </h2>
            <dl>
              <dd>#general</dd>
              <dd>#general</dd>
              <dd>#general</dd>
            </dl>
          </Sidebar>
          <MessagesWrapper className={{ position: "relative" }} />
        </Row>
        <CreateChannel />
      </Container>
    );
  }
}

export default connect()(App);
