import React, { Component } from "react";
import { Container } from "reactstrap";

export default props => (
  <Container style={{ margin: "0 auto", maxWidth: 500 }}>
    {props.children}
  </Container>
);
