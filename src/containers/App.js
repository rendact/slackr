import React, { Component } from "react";
import {
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "reactstrap";
import ChatsSection from "./ChatsSection";
import Sidebar from "../components/Sidebar";
import SidebarHead from "../components/SidebarHead";
import MessagesWrapper from "./MessagesWrapper";
import MessageInputWithMutation from "./MessageInputWithMutation";
import MessagesHead from "../components/MessagesHead";
import ChatItem from "../components/ChatItem";
import ChatBody from "../components/ChatBody";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar style={{ padding: 15 }}>
            <SidebarHead title="Slackr" /> <h3>Channels</h3>
            <dl>
              <dd>#general</dd>
              <dd>#general</dd>
              <dd>#general</dd>
            </dl>
          </Sidebar>
          <MessagesWrapper className={{ position: "relative" }} />
        </Row>
        <Modal isOpen size="lg">
          <ModalHeader>
            <h2>
              Create A Channel{" "}
              <small>Channel are where your members communicate</small>
            </h2>
          </ModalHeader>
          <ModalBody>
            <Input />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default App;
