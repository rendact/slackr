import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Sidebar from "../components/Sidebar";
import MessagesWrapper from "../components/MessagesWrapper";
import MessageInput from "../components/MessageInput";
import MessagesHead from "../components/MessagesHead";
import ChatItem from "../components/ChatItem";
import ChatBody from "../components/ChatBody";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar />
          <MessagesWrapper className={{ position: "relative" }}>
            <MessagesHead name={"rendact"} hashtag={"rendact"} />
            <ChatBody>
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
            </ChatBody>
            <MessageInput />
          </MessagesWrapper>
        </Row>
      </Container>
    );
  }
}

export default App;
